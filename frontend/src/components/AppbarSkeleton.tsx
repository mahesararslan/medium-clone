
export const AppbarSkeleton = () => {

    return <div  className="border-b flex justify-between px-10 py-4">
    <div className="flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
    </div>
    <div>
        <div>
            <button type="button" className="mr-4 focus:outline-none text-white bg-gray-200 ">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </button>
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
    </div>
</div>
}