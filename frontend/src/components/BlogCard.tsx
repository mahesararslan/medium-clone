import { useEffect, useState } from 'react'
import { CalendarDays, Clock, HeartIcon, MessageCircleIcon, ThumbsUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Avatar as Avatarr, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { Skeleton } from "../components/ui/skeleton"
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { Link, useNavigate } from 'react-router-dom'

interface BlogProps {
  blog: {
    id: string
    title: string
    shortDescription: string
    content: string
    createdAt: string
    liked ?: boolean
    author: {
      id: string  
      name: string
      image?: string
    }
    _count: {
        likes: number
        comments: number
    }
  }
}

export function BlogCard({ blog }: BlogProps) {
  const [likes, setLikes] = useState(blog._count.likes || 0)
  const [isLiked, setIsLiked] = useState(blog.liked || false)
  const [image, setImage] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
          if (!blog.content) return;
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
            
            const firstImageUrl = extractFirstImageUrl(blog.content);
            setImage(firstImageUrl || "placeholder.svg");
            
      }, [blog.content])

  const handleLike = async () => {
    if (isLiked) {
      setLikes(prev => prev - 1)
      setIsLiked(!isLiked)
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog/like`,{    
            blogId: blog.id,
            like: false,
            authorId: blog.author.id,
        }, {
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })

        if(res.status !== 200) {
            setLikes(prev => prev + 1)
        }
    } else {
      setLikes(prev => prev + 1)
      setIsLiked(!isLiked)
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog/like`,{
            blogId: blog.id,
            like: true,
            authorId: blog.author.id,
        }, {
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })

        if(res.status !== 200) {
            setLikes(prev => prev - 1)
        }
    }
  }

  return (
    <article className="py-8 border-b last:border-b-0 bg-gray-100 border-2 border-gray-100 p-10 rounded-xl hover:bg-gray-200 m-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-3">
            <Link to={`/account/${blog.author.id}`} >
              <Avatarr className="h-8 w-8">
                <AvatarImage src={blog.author.image} alt={blog.author.name} />
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  {blog.author.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatarr>
              </Link>
              <Link to={`/account/${blog.author.id}`} > <span className="font-medium hover:underline">{blog.author.name}</span></Link>
              <span className="text-gray-500">·</span>
              <time className="text-gray-500">
                {new Date(blog.createdAt).toLocaleString('default', { month: 'short', day: 'numeric' })}
              </time>
            </div>

            {/* Content */}
            <Link to={`/blog/${blog.id}`} className="space-y-2">
              <h2 className="text-xl font-bold font-serif hover:underline cursor-pointer">
                {blog.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {blog.shortDescription}
              </p>
              <div className="pt-2 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(blog.createdAt))}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.ceil(blog.content.split(" ").length/200)} min read
                        </span>
                      </div>
            </Link>

            {/* Engagement */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-red-500"
                  onClick={handleLike}
                >
                  <HeartIcon
                    className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </Button>
                <span className="text-sm text-gray-500">{likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"
                    onClick={() => {navigate(`/blog/${blog.id}`)}}
                >
                  <MessageCircleIcon className="h-5 w-5" />
                </Button>
                <span className="text-sm text-gray-500">{blog._count.comments || 0}</span>
              </div>
            </div>
          </div>

          {/* Blog Image */}
          <div className="md:w-1/3 flex justify-center items-center">
            <img
              src={image || "placeholder.svg"}
              alt={blog.title}
              className="w-full h-[1/3] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export function BlogSkeleton() {
  return (
    <article className="py-8 px-4 bg-gray-50 rounded-lg transition-all duration-300 w-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4 order-2 lg:order-1">
            {/* Author Info Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Engagement Skeleton */}
            <div className="flex items-center gap-4 pt-4 order-3 lg:order-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>

          {/* Blog Image Skeleton */}
          <div className="lg:w-1/3 order-1 lg:order-2">
            <Skeleton className="w-full aspect-[4/3] rounded-lg" />
          </div>
        </div>
      </div>
    </article>
  )
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

