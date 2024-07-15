import { useRecoilValue } from "recoil"
import { SearchedBlogs } from "../store/atoms"
import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";


export const SearchBlogs = () => {
    const blogs = useRecoilValue(SearchedBlogs);

    if(blogs.length == 0) {
        return <div>
            <Appbar />
            <div className="flex flex-col items-center justify-center mt-20">
                <div>
                    <h1 className="text-5xl font-bold">No Blogs found</h1>
                </div>
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-slate-600" > Try Searching For something else!</h2>
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