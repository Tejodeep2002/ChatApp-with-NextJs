import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva("rounded-md flex items-center justify-center", {
  variants: {
    variant: {
      red: "hover:bg-red-500 ",
      pink: "hover:bg-pink-500 ",
      blue: "hover:bg-blue-500 ",
    },
    
    size: {
      base: "w-14 h-9",
      sm: "w-10 h-10",
    },
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant,

  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
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
