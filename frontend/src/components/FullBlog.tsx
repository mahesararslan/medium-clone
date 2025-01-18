import { useEffect } from "react";
import { BlogType } from "../hooks"
import parse from 'html-react-parser';

export const FullBlog = ({ blog } : {blog: BlogType } ) => {

    useEffect(() => {
        function extractFirstImageUrl(htmlString: string) {
            // Create a temporary DOM element
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
          
            // Find the first image tag
            const imgTag = tempDiv.querySelector('img');
          
            // Return the src attribute of the image
            return imgTag ? imgTag.src : null;
          }
          
          const firstImageUrl = extractFirstImageUrl(blog.content);
          console.log(firstImageUrl);  // Output: http://res.cloudinary.com/de6vbbce4/image/upload/v1737182647/xbgzni0nhv9y6w6uaimz.png
          
    })

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
                    {parse(blog.content)}
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

export function Avatar({ name,size="small" } : { name: string, size?:"big" | "small" }) {

    return <div  className={`relative cursor-pointer inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "h-6 w-6" : "h-10 w-10" }`}>
        <span className={`${size === "small" ? "text-xs" : "text-md font-semibold"} text-gray-600 dark:text-gray-300`}>{name?.charAt(0).toUpperCase()}</span>
    </div>
    
}

export function Circle() {

    return <div className="h-1 w-1 rounded-full bg-slate-400">
        
    </div>
}