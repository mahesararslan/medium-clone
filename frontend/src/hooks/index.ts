import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config"
import { useRecoilState, useSetRecoilState } from "recoil";
import { blogAtom, blogsAtom, nameAtom, userAtom } from "../store/atoms";

export interface BlogType {
    content: string,
    title: string,
    id: string,
    author: {
        name: string
    }
}
export const useName = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useRecoilState(nameAtom);

    useEffect(() => {
        if (!name) { // Only fetch if name is not already set
            axios.get(`${BACKEND_URL}/api/v1/user/get-user`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then((response) => {
                setName(response.data.user.name);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setLoading(false);
            });
        } else {
            setLoading(false); // If name is already set, stop loading
        }
    }, [name, setName]);

    return { loading, name };
};

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useRecoilState(userAtom);

    useEffect(()=>{
        
        if(!user) {
            axios.get(`${BACKEND_URL}/api/v1/user/get-user`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then((response) => {
                    console.log(response.data.user)
                    setUser(response.data.user)
                    setLoading(false);
                })
        }
        else {
            setLoading(false)
        }

    }, [user, setUser]);

    return {
        loading,
        user
    }

}

export const useBlog = ({id} : { id:string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useRecoilState(blogAtom);

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

    }, [blog, setBlog]);

    return {
        loading,
        blog
    }

}

export const useBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useRecoilState(blogsAtom);

    useEffect(()=>{
        
        if(blogs.length == 0) {
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
        }
        else {
            setLoading(false);
        }

    }, [blogs, setBlogs]);

    return {
        loading,
        blogs
    }
}   

export const useMyblogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(()=>{
        
        if(blogs.length == 0) {
            axios.get(`${BACKEND_URL}/api/v1/blog/get-blogs`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then((response) => {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                    setLoading(false);
                })
        }
        else {
            setLoading(false);
        }

    }, [blogs, setBlogs]);

    return {
        loading,
        blogs
    }
}   