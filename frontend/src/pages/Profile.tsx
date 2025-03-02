import { motion } from "framer-motion"
import { CalendarDays, BookOpen, Clock, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import ProfileSkeleton from "../components/ProfileSkeleton"

interface User {
  id: string;
  email: string;
  name: string;
  password: string | null;
  image: string;
  bio: string | null;
  createdAt: string; 
}

interface Blog {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  createdAt: string;
  image?: string;
  _count: {
    likes: number;
    comments: number;
  };
  readTime: number;
}


export function Profile() {

  const [user, setUser] = useState<User>({} as User);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/get-user`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setUser(res.data.user);
      setLoading(false);
    }

    fetchUser();
  },[]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/get-blogs`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setBlogs(res.data.blogs);
    }

    fetchBlogs();
  },[])

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
      
      // extract first image url from the blog content of each blog
      blogs.forEach(blog => {
        const firstImageUrl = extractFirstImageUrl(blog.content);
        blog.image = firstImageUrl || "placeholder.svg";
      })
      
}, [blogs])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if(loading) {
    return <ProfileSkeleton />
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <motion.div className="max-w-2xl mx-auto text-center mb-16" variants={itemVariants}>
        <Avatar className="w-32 h-32 mx-auto mb-6"> 
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-serif mb-2">{user.name}</h1>
        {user.bio && <p className="text-lg text-gray-600 mb-5">{user.bio}</p>}
        <div className="text-gray-600 space-y-2">
          <p>{user.email}</p>
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Member since {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(user.createdAt))}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {blogs.length} blogs posted
            </span>
          </div>
        </div>
      </motion.div>

      {/* Blog Posts */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-serif mb-8">Published Stories</h2>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <motion.div key={blog.id} variants={itemVariants}>
              <Card className="bg-gray-100 hover:bg-gray-200 transition-colors overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                      <p className="text-gray-600 mb-4">{blog.shortDescription}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(user.createdAt))}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {blog.readTime} mins read
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {blog._count.likes} likes
                        </span>
                      </div>
                    </div>
                    <div className="md:w-1/3">
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
