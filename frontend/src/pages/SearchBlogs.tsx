// @ts-nocheck

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent } from "../components/ui/card"
import { CalendarDays, Clock, ThumbsUp } from "lucide-react"
import { useBlogs } from "../hooks"
import { all } from "axios"
import { SearchedBlogs } from "../store/atoms"
import { set } from "react-hook-form"
import { BlogSkeleton } from "../components/BlogCard"

export function SearchPage() {
  const allBlogs = useBlogs();
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if(allBlogs.length > 0) {
      setLoading(false);      
    }
  }, [allBlogs])

  useEffect(() => {
    if(allBlogs.length === 0) return;

    const filteredBlogs = allBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.shortDescription.toLowerCase().includes(query.toLowerCase()),
    )
    console.log(filteredBlogs)
    setSearchResults(filteredBlogs)
  }, [query, loading])

  
  useEffect(() => {
    if(searchResults.length === 0) {
      return;
    }
    function extractFirstImageUrl(htmlString: string) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
      
        const imgTags = tempDiv.querySelectorAll('img');
        
        for (let img of imgTags) {
          if (img.src) {
            return img.src;
          }
        }
        return null;
    }
      
      // by using the given function, we can extract the first image url from the blog content of each blog in the searchResults array
      const blogs = searchResults.map((blog) => {
        const firstImageUrl = extractFirstImageUrl(blog.content);
        return {
          ...blog,
          image: firstImageUrl || "placeholder.svg",
        }
      }
      )
      setSearchResults(blogs);
      
}, [searchResults])

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

  if(loading || !query) {
          return <div className="flex justify-center">
                  <div>
                      <BlogSkeleton />
                      <BlogSkeleton />
                      <BlogSkeleton />
                      <BlogSkeleton />    
                      <BlogSkeleton />    
                      <BlogSkeleton />    
                  </div>    
              </div>
      }

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-serif mb-6">Search Results for "{query}"</h1>
      {searchResults.length === 0 ? (
        <p className="text-gray-600">No results found for your search. Try different keywords.</p>
      ) : (
        <div className="space-y-6">
          {searchResults.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-100 hover:bg-gray-200 transition-colors overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                      <p className="text-gray-600 mb-4">{blog.shortDescription}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(blog.createdAt))}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.ceil(blog.content.split(" ").length/200)} min read
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
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  )
}

