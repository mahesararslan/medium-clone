export const FullBlogSkeleton = () => {

    return <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-10 px-10 w-full pt-200 max-w-screen-xl pt-12">
            <div className="col-span-7 my-10 mx-5">
                <div className="text-5xl font-extrabold">
                    <div className="h-10 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-slate-500 pt-2">
                    <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="pt-4">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
            <div className="col-span-4 my-10 mx-5">
                <div className="text-slate-600 text-lg">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="flex ">
                    <div className="pr-4 flex flex-col justify-center" >
                        <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
                    </div>
                    <div>
                        <div className="text-xl font-bold" >
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <div className="pt-2 text-slate-500">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}