import React, { useState, useEffect, useReducer, Reducer } from 'react'
import { message } from 'antd'

type AjaxTablePagination = Partial<{
  total: number
  realPageSize: number
  pageSize: number
  current: number
  showQuickJumper: boolean
  showSizeChanger: boolean
  pageSizeOptions: number[]
  showTotal: (total, range) => React.ReactNode
}>

const DEFAULT_STATE = {
  searchData: {},
  pagination: {
    pageSize: 50,
    current: 1,
    showQuickJumper: false,
    showSizeChanger: false,
    pageSizeOptions: [50, 100, 200]
    // showTotal: (total, range) => {
    //   return `共 ${total} 条数据，当前显示 ${range[0]} - ${range[1]} 条`
    // }
  }
}


function reducer<T>(state: AjaxTableState<T>, action: AjaxTableAction): AjaxTableState<T> {
  switch (action.type) {
    case 'submit':
      return {
        lazyLock: false,
        pagination: { ...state.pagination, current: 1 },
        searchData: { ...state.searchData, ...action.data }
      }
    case 'changePage':
      return {
        ...state,
        lazyLock: false,
        pagination: { ...state.pagination, ...action.data }
      }
    case 'changSearchData':
      return {
        ...state,
        lazyLock: false,
        searchData: { ...state.searchData, ...action.data }
      }
  }
}

type AjaxTableAction = Partial<{
  type: string
  data: Record<string, any>
}>

type AjaxTableState<P extends AjaxTableSearchData> = Partial<{
  /**
   * 是否处于lazyLoad锁定中
   */
  lazyLock: boolean
  pagination: AjaxTablePagination
  searchData: P
}>

type AjaxTableProps = Partial<{
  /**
   * 初始化时是否请求数据
   * 默认：false ; 初始化时请求, 触发 useEffect 即执行请求。
   * true: 初始化时不请求，触发 submit 才加载。
   */
  lazyLoad: boolean
  /**
   * 默认每页数据量:15
   */
  defaultPageSize: number
  /**
   * 初始化时的搜索数据, 仅首次请求会放入。
   * 后续被清空后，无法找回
   */
  defaultSearchData: Record<string, any>
  /**
   * 发送 {data:{...searchData}} 结构
   */
  requestType: 'json'
  /**
   * ajax 调用类型
   */
  ajaxType: string
  /**
   * 显示切换pageSize: 默认 false，不显示
   *
   */
  showSizeChanger: boolean
  /**
   * pageSize可选项:默认 [50, 100, 200]
   */
  pageSizeOptions: number[]

  /**
   * 多排模式:默认false，单排， true 多排。
   * 需要 antd 4.24.6。 4.18.9 不支持多排。
   * columns 需要同时设置  sorter: { multiple: number } 开启多排
   */
  sortMultiple: boolean
}>

export interface AjaxTableCallBack<T, P extends Record<any, any>> {
  dataList: T[]
  setDataList: (list: T[]) => void
  /**
   * 排序信息, 多排时，才有值。
   */
  sortFields: { field: string; order: string }[]
  pagination: AjaxTablePagination
  loading: boolean
  setLoading: (data: boolean) => void
  setPagination: (data: AjaxTablePagination) => void
  searchData: P
  setSearchData: (data: P) => void
  submit: (data) => void
  tableProps: {
    dataSource: T[]
    loading: boolean
    pagination: AjaxTablePagination
    onChange: (pagination, filters, sorter) => void
  }
  reload: (autoJump: boolean) => void
}

export type AjaxTableSearchData = Partial<{
  [key: string]: any
}>

function useAjaxTable<T, P extends AjaxTableSearchData>(
  /**
   * 请求的URL
   */
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
  const [search, dispatch] = useReducer<Reducer<AjaxTableState<P>, any>>(reducer, {
    /**
     * 触发过dispatch 后，lazyLock 永远为 false
     * 仅当 lazyLoad 为true 时，且未触发触发过dispatch 时  lazyLock为true
     */
    lazyLock: lazyLoad,
    pagination: {
      ...DEFAULT_STATE.pagination,
      pageSize: defaultPageSize,
      showSizeChanger,
      pageSizeOptions
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    searchData: { ...DEFAULT_STATE.searchData, ...defaultSearchData } as P
  })

  const [dataList, setDataList] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [sortFields, setSortFields] = useState([])

  const submit = (data = {}) => {
    dispatch({
      type: 'submit',
      data
    })
  }
  const pagination = search.pagination
  const searchData = search.searchData
  // const { current, pageSize } = pagination;
  const setSearchData = (data = {}) => {
    dispatch({
      type: 'changSearchData',
      data
    })
  }

  const setPagination = (data = {}) => {
    dispatch({
      type: 'changePage',
      data
    })
  }

  useEffect(() => {
    // 还在 lazyLock 锁定中。
    if (search.lazyLock) {
      return
    }

    setLoading(true)
    let data: any = {
      pageSize: pagination.pageSize,
      curPage: pagination.current - 1,
      ...searchData
    }

    let config = {}
    if (ajaxType === 'post' && requestType === 'json') {
      data = { data: data }
      config = { requestType }
    }
    axios[ajaxType](url, data, config)
      .then(({ flag, data, msg }) => {
        if (flag === 1) {
          setDataList(data?.list || [])
          setPagination({
            realPageSize: pagination.pageSize,
            total: data.totalCount,
            curPage: pagination.current - 1
          })
        }
      })
      .catch((error) => {
        message.error(error?.message || error?.msg)
        asyncThrowError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [pagination.current, pagination.pageSize, searchData, url, search.lazyLock])

  const tableProps = {
    dataSource: dataList,
    loading,
    pagination,
    onChange: (pagination, filters, sorter) => {
      setPagination(pagination)
      if (sortMultiple) {
        let newSorts = Array.isArray(sorter) ? sorter : [sorter]
        newSorts = newSorts
          ?.filter((el) => el.field)
          ?.filter((el) => el.order)
          ?.map((el) => {
            return {
              ...el,
              filedKey: el.field,
              filedName: el?.column?.title,
              order: el.order === 'ascend' ? 'asc' : 'desc'
            }
          })

        setSortFields(newSorts)
        setSearchData({
          fields: [],
          sortFields: newSorts?.map((el) => {
            return {
              field: el.field,
              order: el.order
            }
          })
        })
      } else {
        setSearchData({
          fields: [],
          otherInfo_sortColumn: sorter.field,
          otherInfo_sortType: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : ''
        })
      }
    }
  }

  /**
   * 标识是否需要检查页码
   */
  const [checkCurrent, setCheckCurrent] = useState(false)

  const reload = (autoJump = false) => {
    setCheckCurrent(autoJump)
    setSearchData({})
  }

  useEffect(() => {
    // 是否执行过刷新
    if (!checkCurrent) return
    if (dataList?.length > 0) {
      // 当前页有内容
      setCheckCurrent(false)
      return
    } else {
      // 无内容,只执行一次
      setCheckCurrent(false)
      if (pagination.current > 1) {
        setPagination({
          current: pagination.current - 1
        })
      }
    }
  }, [dataList])

  useEffect(() => {
    fix_scroll()
  }, [tableProps.dataSource])

  useEffect(() => {
    // 解决antd table sticky 横向滚动条 不动态变化的问题
    window.addEventListener('wheel', fix_scroll)
    return () => {
      window.removeEventListener('wheel', fix_scroll)
    }
  }, [])

  return {
    dataList,
    setDataList,
    pagination,
    loading,
    setLoading,
    setPagination,
    searchData,
    setSearchData,
    submit,
    sortFields,
    tableProps,
    reload
  }
}

export default useAjaxTable
