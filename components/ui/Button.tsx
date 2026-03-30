'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    
    const base = "inline-flex items-center justify-center whitespace-nowrap rounded-action text-lg font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-premium";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-hover shadow-primary/20",
      secondary: "bg-secondary text-white hover:opacity-90 shadow-secondary/20",
      danger: "bg-error text-white hover:bg-red-600 shadow-error/20",
      outline: "border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 hover:border-slate-300",
      ghost: "hover:bg-slate-100 text-slate-700 hover:text-slate-900 shadow-none",
    };

    const sizes = {
      default: "h-14 px-8 py-3", 
      sm: "h-11 rounded-xl px-4 text-base",
      lg: "h-16 rounded-[1.5rem] px-10 text-xl",
      icon: "h-14 w-14",
    };

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant as keyof typeof variants] || variants.primary,
          sizes[size as keyof typeof sizes] || sizes.default,
          className
        )}
        onClick={(e) => {
           // Providing instant feedback for demo purposes
           if (props.onClick) props.onClick(e);
           else {
             console.log("Button clicked!");
           }
        }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
