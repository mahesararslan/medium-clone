import { useBlogs } from "../hooks/index";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { BlogCard } from "../components/BlogCard";


export function Blogs () {

    // @ts-ignore
    const {loading, blogs} = useBlogs();

    // Add loading skeleton.
    if(loading) {
        return <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />    
                    <BlogSkeleton />    
                    <BlogSkeleton />    
                </div>    
            </div>
    }

    return (
        <div className="min-h-screen bg-white">
          <div className="max-w-screen-xl mx-auto">
            <header className="py-8 px-4">
              <h1 className="text-3xl font-serif">Your Stories</h1>
            </header>
            <div className="divide-y divide-gray-200">
              {blogs.map(blog => (
                // @ts-ignore
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      )

}