import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
// import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { GoogleLogin } from '@react-oauth/google'

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

type FormData = z.infer<typeof schema>

export function Signin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    // Here you would typically send the data to your backend
    console.log(data)
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, data)
    if (res.status === 200) {
      const jwt = res.data.jwt
      localStorage.setItem("token", jwt)
      navigate("/blogs")
    }
    setIsLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-10 bg-amber-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="max-w-md mx-auto bg-gray-50 p-8 rounded-lg shadow-md"
        variants={itemVariants}
      >
        <h1 className="text-4xl font-serif mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input id="email" type="email" {...register('email')} className="w-full rounded-full" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <Input id="password" type="password" {...register('password')} className="w-full rounded-full" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 w-full flex justify-center border-t border-gray-300 pt-4">
          <GoogleLogin
            width={380} 
            shape='pill'
                        // @ts-ignore
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                        onSuccess={credentialResponse => {
                            if (credentialResponse.credential) {
                                const decodedCredential = jwtDecode(credentialResponse.credential);
                                async function sendGoogleRequest() {
                                    try {
                                        const response = await axios.post(`${BACKEND_URL}/api/v1/user/google-signin`, { // @ts-ignore
                                            email: decodedCredential.email, // @ts-ignore
                                            name: decodedCredential.name, // @ts-ignore
                                            picture: decodedCredential.picture
                                        });
                                        const jwt = response.data.jwt;
                                        localStorage.setItem("token", jwt);
                                        navigate("/blogs");
                                    } catch (e) {
                                        console.log("Error", e);
                                    }
                                }

                                sendGoogleRequest();
                            } else {
                                console.log('Credential is undefined');
                            }
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-black font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}


// import { Quote } from "../components/Quote";
// import { AuthSignin } from "../components/AuthSignin";


// export function Signin () {

//     return <div>
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//             <div>
//                 <AuthSignin />
//             </div>
//             <div className="lg:block" >
//                 <Quote />
//             </div>
//         </div>
//     </div>
// }