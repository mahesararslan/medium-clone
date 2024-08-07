import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks/index";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { SearchedBlogs } from "../store/atoms";
import { useRecoilValue } from "recoil";


export function Blogs () {

    // @ts-ignore
    const {loading, blogs} = useBlogs();

    // Add loading skeleton.
    if(loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />    
                    <BlogSkeleton />    
                    <BlogSkeleton />    
                </div>    
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map((blog: any) => (
                <BlogCard
                id={blog.id} // Ensure each blog has a unique identifier
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate="4 July 2024"
                />
                ))}
            </div>
        </div>
    </div> 

}