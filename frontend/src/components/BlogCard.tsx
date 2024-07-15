import { Link } from "react-router-dom"

interface BlogCardInterface {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id: string
}


export function BlogCard ({authorName, title, content, publishedDate, id} : BlogCardInterface) {

    return <Link to={`/blog/${id}`} >
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex"> 
                <div className="flex">
                    <Avatar name={authorName} />
                </div>
                <div className="flex justify-center flex-col font-extralight pl-2 text-md" > {authorName} </div>
                <div className="flex justify-center flex-col pl-2"> <Circle/> </div>
                <div className="flex justify-center flex-col font-thin pl-2 text-slate-500 text-sm" >{publishedDate}</div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-light">
                {content.length > 100 ? content.slice(0,100) + "...." : content}
            </div>
            <div className="text-slate-400 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
            <div>

            </div>
        </div>
    </Link> 
}

export function Avatar({ name,size="small" } : { name: string, size?:"big" | "small" }) {

    return <div  className={`relative cursor-pointer inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "h-6 w-6" : "h-10 w-10" }`}>
        <span className={`${size === "small" ? "text-xs" : "text-md font-semibold"} text-gray-600 dark:text-gray-300`}>{name[0].toUpperCase()}</span>
    </div>
    
}

export function Circle() {

    return <div className="h-1 w-1 rounded-full bg-slate-400">
        
    </div>
}