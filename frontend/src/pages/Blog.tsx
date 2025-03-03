// @ts-nocheck
import { useEffect, useState } from 'react'
import { HeartIcon, MessageCircleIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Link, useParams } from 'react-router-dom'
import { useBlog } from '../hooks'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { set } from 'react-hook-form'
import { FullBlog } from '../components/FullBlog'
import { BlogSkeleton } from '../components/FullBlogSkeleton'

export function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [likes, setLikes] = useState(blog?._count.likes);
  const [isLiked, setIsLiked] = useState(blog?.liked);
  const [comments, setComments] = useState(blog?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        setBlog(response.data.blog);
        const resComments = response.data.blog.comments.reverse();
        setComments(resComments);
        setLikes(blog._count.likes);
        setIsLiked(blog.liked);
    })
    .catch(error => {
        console.error("Error fetching blog:", error);
    });
}, [id]);

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

        console.log(res.data);

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
  const handleCommentSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (!newComment) {
      return;
    }

    const res = await axios.post(`${BACKEND_URL}/api/v1/blog/comment`,{
        blogId: blog.id,
        content: newComment.trim(),
        authorId: blog.author.id
        }, {
          headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }); 
    // @ts-ignore
    setComments([res.data.comment, ...comments]);
    setNewComment('');
    setIsSubmitting(false);
    // window.location.reload();
  };

  if (!blog) {
    return <BlogSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-serif mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4">
            <Link to={`/account/${blog.author.id}`} >
              <Avatar className="h-12 w-12">
                <AvatarImage src={blog.author.image} alt={blog.author.name} />
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  {blog.author.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
            <Link to={`/account/${blog.author.id}`} ><p className="font-medium hover:underline">{blog.author.name}</p></Link>
              <time className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleString('default', { month: 'short', day: 'numeric' })}
              </time>
            </div>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <HeartIcon className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
            {likes} Likes
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <MessageCircleIcon className="h-5 w-5" />
            {comments.length} Comments
          </Button>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mb-8 pb-5">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3 rounded-xl hover:shadow-md focus:border-2 focus:border-black"
            />
            <Button 
              type="submit" 
              className={`bg-green-500 hover:bg-green-600 hover:scale-110 rounded-xl text-white float-right ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </Button>

          </form>
          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-xl shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Link to={`/account/${comment.author.id}`} >
                  <Avatar className="h-8 w-8 bg-green-400 text-white">
                    <AvatarImage src={comment.author.image} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  </Link>
                  <Link to={`/account/${comment.author.id}`} ><span className="font-medium hover:underline">{comment.author.name}</span></Link>
                  <time className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString('default', { month: 'short', day: 'numeric' })}
                  </time>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
