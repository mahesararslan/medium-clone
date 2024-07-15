import { Appbar } from "./Appbar"
import { BlogSkeleton } from "./BlogSkeleton"
import { Sidebar } from "./Sidebar"


export const MyBlogsSkeleton = () => {


    return <div>
      <Appbar />
      <div className="grid grid-cols-12">
          <div className="col-span-4 flex flex-col mx-2 my-5">
            <div  className="ml-5 relative cursor-pointer inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 h-12 w-12">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div>
              <Sidebar />
            </div>
          </div>
          <div className="col-span-8 mt-10" >
          <div className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
          </div>
      </div>
    </div>
}