'use client';

export default function TableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4 w-full">
          <div className="skeleton h-6 w-10/12 bg-white/10 rounded-full"></div>
          <div className="skeleton h-4 w-8/12 bg-white/10 rounded-full"></div>
          <div className="skeleton h-4 w-full bg-white/10 rounded-full"></div>
          <div className="skeleton h-4 w-full bg-white/10 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}
