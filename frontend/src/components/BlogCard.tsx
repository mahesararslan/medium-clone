import { useEffect, useState } from 'react'
import { HeartIcon, MessageCircleIcon } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Avatar as Avatarr, AvatarImage, AvatarFallback } from '../components/ui/avatar'

interface BlogProps {
  blog: {
    id: string
    title: string
    shortDescription: string
    content: string
    createdAt: string
    author: {
      name: string
      image?: string
    }
    likes: number
    comments: number
  }
}

export function BlogCard({ blog }: BlogProps) {
  const [likes, setLikes] = useState(blog.likes || 0)
  const [comments, setComments] = useState(blog.comments || 0)
  const [isLiked, setIsLiked] = useState(false)
  const [image, setImage] = useState("")

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
            setImage(firstImageUrl || "placeholder.svg");
            
      }, [blog.content])

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1)
    } else {
      setLikes(prev => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <article className="py-8 border-b last:border-b-0 bg-gray-100 border-2 border-gray-100 p-10 rounded-xl cursor-pointer hover:bg-gray-200 m-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <Avatarr className="h-8 w-8">
                <AvatarImage src={blog.author.image} alt={blog.author.name} />
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  {blog.author.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatarr>
              <span className="font-medium">{blog.author.name}</span>
              <span className="text-gray-500">·</span>
              <time className="text-gray-500">
                {new Date(blog.createdAt).toLocaleString('default', { month: 'short', day: 'numeric' })}
              </time>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold font-serif hover:underline cursor-pointer">
                {blog.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {blog.shortDescription}
              </p>
            </div>

            {/* Engagement */}
            <div className="flex items-center gap-4 pt-4">
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
                <Button variant="ghost" size="icon">
                  <MessageCircleIcon className="h-5 w-5" />
                </Button>
                <span className="text-sm text-gray-500">{comments}</span>
              </div>
            </div>
          </div>

          {/* Blog Image */}
          <div className="md:w-1/3 flex justify-center items-center">
            <img
              src={image || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-[1/3] object-cover rounded-lg"
            />
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

