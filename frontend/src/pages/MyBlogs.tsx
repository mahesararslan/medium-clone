import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard";
import { MyBlogsSkeleton } from "../components/MyBlogsSkeleton";
import OpenSidebar from "../components/ResponsiveSidebar.tsx";
import { Sidebar } from "../components/Sidebar.tsx"
import { useMyblogs, useUser } from "../hooks";

export const MyBlogs = () => {
    const {user} : { loading: any, user: any} = useUser();
    const {loading, blogs} : { loading: any, blogs: any} = useMyblogs();


    if(loading) {
        return <div>
            <MyBlogsSkeleton />
        </div>
    }

    return <div>
      <Appbar />
      <div className="grid grid-cols-12">
          <div className="col-span-4 flex flex-col mx-2 my-5">
            <div  className="ml-5 relative cursor-pointer inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 h-12 w-12">
                <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">{user.name[0].toUpperCase()}</span>
            </div>
            <div className=" md:hidden">
              <OpenSidebar />
            </div>
            <div className="hidden md:block">
              <Sidebar />
            </div>
          </div>
          <div className="col-span-8 mt-10" >
          <div className="flex justify-center">
            <div>
                {blogs.map((blog: any) => (
                <BlogCard
                id={blog.id} // Ensure each blog has a unique identifier
                authorName={user.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate="4 July 2024"
                />
                ))}
            </div>
        </div>
          </div>
      </div>
    </div>
}