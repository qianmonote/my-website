import Image from "next/image";
import React from "react";
import "./index.css";

type ButtonProps = Partial<{
  children: React.ReactNode;
  type?: "primary" | "secondary" | "default";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}>

const BannerBtn: React.FC<ButtonProps> = ({
  type = "primary",
  size = "medium",
  className = "",
}) => {
  const buttonClass =
    `c-button c-button--${type} c-button--${size} ${className}`.trim();

  return (
    <div className={buttonClass} style={{ marginLeft: -20 }}>
      <Image src="/images/banner-btn.png" alt="button" width={240} height={100} />
    </div>
  );
};

export default BannerBtn;
