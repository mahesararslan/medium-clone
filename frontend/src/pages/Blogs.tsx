import { useBlogs } from "../hooks/index";
import { BlogSkeleton, BlogCard } from "../components/BlogCard";
import { useEffect, useState } from "react";


export function Blogs () {

    // @ts-ignore
    const blogs = useBlogs();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(blogs.length > 0) {
            setLoading(false);
        }
    }, [blogs])

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
              <h1 className="text-3xl font-serif text-center bg-black text-white py-3">Blogs for you</h1>
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