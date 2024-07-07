import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";



export function Blog () {

    const { id } = useParams()
    const {loading, blog} = useBlog({ id: id || "" });

    // Add loading skeleton.
    if(loading || !blog) {
        return <div>
            <Appbar />  
            <FullBlogSkeleton />
        </div>
    }

    return <div>
         <Appbar />  
        <FullBlog /* @ts-ignore */ 
        blog={blog} />
    </div> 

}