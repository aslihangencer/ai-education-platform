"use client";

/**
 * Skeleton:
 * A professional loading placeholder component to enhance Perceived Performance.
 * Uses a subtle pulse animation and high-contrast accessibility tokens.
 */
export const Skeleton = ({ 
  className = "", 
  variant = "text" 
}: { 
  className?: string, 
  variant?: 'text' | 'rect' | 'circle' 
}) => {
  const baseStyles = "animate-pulse bg-slate-100 dark:bg-slate-800";
  
  const variants = {
    text: "h-4 w-full rounded-lg",
    rect: "h-32 w-full rounded-[2rem]",
    circle: "h-16 w-16 rounded-full"
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      aria-hidden="true" 
    />
  );
};

export const DashboardSkeleton = () => (
  <div className="space-y-12 w-full p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton variant="rect" />
      <Skeleton variant="rect" />
      <Skeleton variant="rect" />
    </div>
    <Skeleton variant="rect" className="h-[400px]" />
    <div className="space-y-4">
      <Skeleton variant="text" className="h-20" />
      <Skeleton variant="text" className="h-10 w-2/3" />
    </div>
  </div>
);

export default Skeleton;
