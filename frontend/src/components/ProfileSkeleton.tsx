import { Appbar } from "./Appbar"
import { Sidebar } from "./Sidebar"

export const ProfileSkeleton = () => {

    return <div>
      <Appbar />
      <div className="grid grid-cols-12">
          <div className="col-span-4 flex flex-col mx-2 my-5">
            <div  className="ml-5 relative cursor-pointer inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 h-12 w-12">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div>
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="hidden md:block">
              <Sidebar />
            </div>
          </div>
          <div className="col-span-8 mt-10" >
              <div className="flex flex-col mx-10"> 
                <div className="text-2xl font-bold" >
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-2xl font-bold mt-2">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
              </div>
              <div className="text-xl font-semibold mt-20 mx-10">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              </div>
          </div>
      </div>
    </div>
}