'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { title?: string }>(
  ({ className, title, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-premium border-2 border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-premium overflow-hidden transition-all hover:shadow-2xl",
        className
      )}
      {...props}
    >
      {title && (
        <div className="px-8 py-6 border-b-2 border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
           <h3 className="text-2xl font-black italic tracking-tight uppercase leading-none">{title}</h3>
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  )
)
Card.displayName = "Card"

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)
export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
)
export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)
export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
)

export default Card;
