import React, { Ref, forwardRef } from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Gutter: React.FC<Props> = (props) => {
  const { className, children } = props;

  return (
    <div
      className={[
        className,
        "max-w-[1920px] px-4  md:px-32 lg:px-[160px] mx-auto",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};
