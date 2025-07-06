import React from "react";
import classNames from "classnames";
import Image from "next/image";
import styles from "./style.module.css";

type TProps = {
  type?: "contract" | "learnMore" | "contactEn";
  size?: "small" | "medium" | "large";
  className?: string;
  children?: React.ReactNode;
};

const CustomtBtn: React.FC<TProps> = ({
  type = "contract",
  className = "",
  children,
}) => {
  if (type === "contract") {
    return (
      <div
        className={classNames(styles.cCustomtBtn, className, {
          [styles.contractBtn]: true,
        })}
      >
        <Image
          src="/images/btn-contract-icon.svg"
          alt="button"
          width={24}
          height={24}
          style={{ marginRight: 10 }}
        />
        {children}
      </div>
    );
  }
  if (type === "learnMore") {
    return (
      <div
        className={classNames(styles.cCustomtBtn, className, {
          [styles.learnMoreBtn]: true,
        })}
      >
        {children}
      </div>
    );
  }
  if (type === "contactEn") {
    return <div className={styles.contactEnBtn} />;
  }
  return null;
};

export default CustomtBtn;
