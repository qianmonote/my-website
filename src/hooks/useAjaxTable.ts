import React, { useState, useEffect, useReducer } from 'react'
import { message } from 'antd'
import axios from '../common/axios'

interface TableResponse<T> {
  list: T[]
  totalCount: number
}

interface ApiResponse<T> {
  flag: 0 | 1;
  data?: T;
  error?: {
    message?: string;
    details?: unknown;
  };
}

type AjaxTablePagination = {
  total?: number
  realPageSize?: number
  pageSize?: number
  current?: number
  showQuickJumper?: boolean
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
}

interface TableColumn {
  title?: string
}

interface SortField {
  field: string
  order: 'ascend' | 'descend'
  filedKey: string
  filedName?: string
  column?: TableColumn
}

type SearchData = Record<string, string | number | boolean | null>

const DEFAULT_STATE = {
  searchData: {},
  pagination: {
    pageSize: 50,
    current: 1,
    showQuickJumper: false,
    showSizeChanger: false,
    pageSizeOptions: [50, 100, 200]
  }
}

type ActionType = 'submit' | 'changePage' | 'changSearchData'

interface AjaxTableAction<T extends SearchData> {
  type: ActionType
  data?: Partial<T> | AjaxTablePagination
}

interface AjaxTableState<P extends SearchData> {
  lazyLock: boolean
  pagination: AjaxTablePagination
  searchData: P
}

function reducer<T extends SearchData>(state: AjaxTableState<T>, action: AjaxTableAction<T>): AjaxTableState<T> {
  switch (action.type) {
    case 'submit':
      return {
        lazyLock: false,
        pagination: { ...state.pagination, current: 1 },
        searchData: { ...state.searchData, ...(action.data as Partial<T>) }
      }
    case 'changePage':
      return {
        ...state,
        lazyLock: false,
        pagination: { ...state.pagination, ...(action.data as AjaxTablePagination) }
      }
    case 'changSearchData':
      return {
        ...state,
        lazyLock: false,
        searchData: { ...state.searchData, ...(action.data as Partial<T>) }
      }
    default:
      return state
  }
}

interface AjaxTableProps {
  lazyLoad?: boolean
  defaultPageSize?: number
  defaultSearchData?: SearchData
  requestType?: 'json'
  ajaxType?: 'get' | 'post'
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  sortMultiple?: boolean
}

export interface AjaxTableCallBack<T, P extends SearchData> {
  dataList: T[]
  setDataList: (list: T[]) => void
  sortFields: SortField[]
  pagination: AjaxTablePagination
  loading: boolean
  setLoading: (data: boolean) => void
  setPagination: (data: AjaxTablePagination) => void
  searchData: P
  setSearchData: (data: Partial<P>) => void
  submit: (data: Partial<P>) => void
  tableProps: {
    dataSource: T[]
    loading: boolean
    pagination: AjaxTablePagination
    onChange: (pagination: AjaxTablePagination, filters: Record<string, (string | number)[] | null>, sorter: SortField | SortField[]) => void
  }
  reload: (autoJump: boolean) => void
}

function useAjaxTable<T, P extends SearchData>(
  url: string,
  {
    pageSizeOptions = DEFAULT_STATE.pagination.pageSizeOptions,
    showSizeChanger = DEFAULT_STATE.pagination.showSizeChanger,
    lazyLoad = false,
    defaultPageSize = DEFAULT_STATE.pagination.pageSize,
    defaultSearchData = {},
    ajaxType = 'post',
    requestType,
    sortMultiple = false
  }: AjaxTableProps = {}
): AjaxTableCallBack<T, P> {
  const [state, dispatch] = useReducer(reducer<P>, {
    lazyLock: lazyLoad,
    pagination: {
      ...DEFAULT_STATE.pagination,
      pageSize: defaultPageSize,
      showSizeChanger,
      pageSizeOptions
    },
    searchData: { ...DEFAULT_STATE.searchData, ...defaultSearchData } as P
  });

  const [dataList, setDataList] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortFields, setSortFields] = useState<SortField[]>([]);

  const submit = (data: Partial<P> = {}) => {
    dispatch({
      type: 'submit',
      data
    });
  };

  const { pagination, searchData } = state;

  const setSearchData = (data: Partial<P> = {}) => {
    dispatch({
      type: 'changSearchData',
      data
    });
  };

  const setPagination = (data: Partial<AjaxTablePagination> = {}) => {
    dispatch({
      type: 'changePage',
      data
    });
  };

  useEffect(() => {
    if (state.lazyLock) {
      return;
    }

    setLoading(true);
    let data: Record<string, unknown> = {
      pageSize: pagination.pageSize,
      curPage: pagination.current ? pagination.current - 1 : 0,
      ...searchData
    };

    let config = {};
    if (ajaxType === 'post' && requestType === 'json') {
      data = { data };
      config = { requestType };
    }

    axios[ajaxType]<ApiResponse<TableResponse<T>>>(url, data, config)
      .then((response) => {
        if (response.flag === 1 && response.data) {
          setDataList(response.data.list || []);
          setPagination({
            realPageSize: pagination.pageSize,
            total: response.data.totalCount,
            current: pagination.current
          });
        } else {
          message.error(response.error?.message || '获取数据失败');
        }
      })
      .catch((error) => {
        message.error(error?.message || '请求失败');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [state.lazyLock, pagination.current, pagination.pageSize, searchData, url, ajaxType, requestType]);

  const tableProps = {
    dataSource: dataList,
    loading,
    pagination,
    onChange: (pagination: AjaxTablePagination, filters: Record<string, (string | number)[] | null>, sorter: SortField | SortField[]) => {
      setPagination(pagination);
      if (sortMultiple) {
        const newSorts = Array.isArray(sorter) ? sorter : [sorter];
        const validSorts = newSorts
          .filter((el) => el.field && el.order)
          .map((el) => ({
            ...el,
            filedKey: el.field,
            filedName: el.column?.title,
            order: el.order
          } as SortField));
        setSortFields(validSorts);
      }
    }
  };

  const reload = (autoJump = false) => {
    if (autoJump) {
      setPagination({ current: 1 });
    } else {
      submit();
    }
  };

  return {
    dataList,
    setDataList,
    sortFields,
    pagination,
    loading,
    setLoading,
    setPagination,
    searchData,
    setSearchData,
    submit,
    tableProps,
    reload
  };
}

export default useAjaxTable;
