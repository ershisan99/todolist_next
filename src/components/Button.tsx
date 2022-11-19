import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<Props> = ({ className, ...rest }) => {
  return (
    <div>
      <button
        className={`rounded-md border border-gray-300 bg-sky-700 px-4 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
        {...rest}
      />
    </div>
  );
};
