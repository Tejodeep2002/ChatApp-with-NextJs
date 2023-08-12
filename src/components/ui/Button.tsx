import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva("w-14 h-9  rounded-md", {
  variants: {
    variant: {
      default: "bg-white border border-black hover:bg-red-500 ",
      small:
        "w-10 h-10 bg-transparent hover:bg-red-500 flex items-center justify-center",
      circular: "border-black hover:rounded-md hover:bg-gray-400 dark:bg-black",
      transperant: "w-fit p-2 bg-transparent hover:bg-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      {children}
    </button>
  );
};

export interface CircularButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const CircularButton: FC<CircularButtonProps> = ({ children }) => {
  return (
    <button className=" border-black rounded-md hover:bg-gray-400 dark:bg-black">
      {children}
    </button>
  );
};
