import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { BACKEND_URL } from '../config'

const schema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

type FormData = z.infer<typeof schema>

export function Signup() {
    const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    // Here you would typically send the data to your backend
    console.log(data)
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, data)
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
        <h1 className="text-4xl font-serif mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
            <Input id="fullName" type="text" {...register('fullName')} className="w-full rounded-full" />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>
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
          <button type="submit" className="w-full rounded-full py-3 bg-black text-white hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 w-full flex justify-center border-t border-gray-300 pt-4">
          <GoogleLogin
            width={380} 
            shape='pill'
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
          Already have an account?{' '}
          <Link to="/signin" className="text-black font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}




// import { Quote } from "../components/Quote";
// import { AuthSignup } from "../components/AuthSignup";


// export function Signup () {

//     return <div>
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//             <div>
//                 <AuthSignup />
//             </div>
//             <div className="lg:block" >
//                 <Quote />
//             </div>
//         </div>
//     </div>
// }