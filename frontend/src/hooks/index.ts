import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config"

export interface BlogType {
    content: string,
    title: string,
    id: string,
    author: {
        name: string
    }
}

export const useBlog = ({id} : { id:string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response.data.blog)
                setBlog(response.data.blog)
                setLoading(false);
            })

    }, []);

    return {
        loading,
        blog
    }

}

export const useBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response.data.blogs)
                setBlogs(response.data.blogs)
                setLoading(false);
            })

    }, []);

    return {
        loading,
        blogs
    }
}   