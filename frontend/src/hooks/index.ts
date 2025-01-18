import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config"
import { useRecoilState } from "recoil";
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
                    console.log("USER DATA:")
                    console.log(response.data.user)
                    setUser(response.data.user)
                    // set in recoil atom
                    
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

export const useBlog = (id: string) => {
    const [blog, setBlog] = useRecoilState(blogAtom);

    useEffect(() => {
        if (!blog) {
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                setBlog(response.data.blog);
            })
            .catch(error => {
                console.error("Error fetching blog:", error);
            });
        }
    }, [id, blog, setBlog]);

    console.log("SINGLE BLOG:", blog)
    return blog;
};

export const useBlogs = () => {
    const [blogs, setBlogs] = useRecoilState(blogsAtom);

    useEffect(()=>{
        if(!blogs.length || blogs.length === 0) {
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then((response) => {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                })
        }
    }, [blogs, setBlogs]);

    return blogs;
}   

export const useMyblogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(()=>{
        
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

    }, [blogs, setBlogs]);

    return {
        loading,
        blogs
    }
}   

