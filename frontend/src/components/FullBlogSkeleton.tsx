import { Skeleton } from "../components/ui/skeleton"

export function BlogSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-pulse">
      {/* Author info */}
      <div className="flex items-center space-x-4 mb-8">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>

      {/* Blog title */}
      <Skeleton className="h-9 w-[300px] mb-4" />

      {/* Blog subtitle */}
      <Skeleton className="h-6 w-full mb-8" />

      {/* Featured image */}
      <Skeleton className="h-64 w-full mb-8" />

      {/* Blog content */}
      <div className="space-y-4 mb-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="space-y-4 mb-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Subheading */}
      <Skeleton className="h-6 w-1/2 mb-4" />

      <div className="space-y-4 mb-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Tags */}
      <div className="flex space-x-2 mb-8">
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>

      {/* Reactions and comments */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}
