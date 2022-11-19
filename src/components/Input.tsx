import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: FC<Props> = ({ className, ...rest }) => {
  return (
    <div>
      <input
        className={` w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
        {...rest}
      />
    </div>
  );
};
