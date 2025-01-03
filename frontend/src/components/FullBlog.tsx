import { BlogType } from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog } : {blog: BlogType } ) => {

    return <div className="flex justify-center">
        <div className="md:grid md:grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
            <div className="mb-10 md:mb-0 md:col-span-8 ">
                <div className="mb-5 md:mb-0 text-5xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    post on 2nd July 2024
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>
            </div>
            <div className="md:col-span-4 ">
                <div className="text-slate-600 text-lg">
                    Author
                </div>
                <div className="flex ">
                    <div className="pr-4 flex flex-col justify-center" >
                        <Avatar size="big" name={blog.author.name || "Anonymous"} />
                    </div>
                    <div>
                        <div className="text-xl font-bold" >
                            {blog.author.name || "Anonymous"}
                        </div>
                        <div className="pt-2 text-slate-500">
                            Turning every post into a must-read, one captivating line at a time.
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}