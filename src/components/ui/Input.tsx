import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC, InputHTMLAttributes } from "react";

const inputVariants = cva("", {
  variants: {
    variant: {
      default:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
      search:
        "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input: FC<InputProps> = ({ className,variant,...props }) => {
  return <input className={cn(inputVariants({ variant, className }))} {...props} />;
};

export default Input;
