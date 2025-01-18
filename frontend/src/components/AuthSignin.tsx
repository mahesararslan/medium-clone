import { Link, useNavigate } from "react-router-dom"
import { LabelledInput } from "./LabelledInput"
import { useState } from "react"
import { SigninInput } from "@mahesararslan/medium-app-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export function AuthSignin() {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email:"",
        password:""
    });

    async function sendRequest() {
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        }
        catch (e) {
            console.log("Error", e);
            // alert the user that the request failed.
        }
    }

    return <div className="h-screen flex justify-center flex-col" >
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an Account
                    </div>
                    <div className="text-slate-500">
                        Don't have an Account?
                        <Link className="pl-2 underline" to={"/signup"} >
                            Sign up
                        </Link> 
                    </div>
                </div>
                <div className="pt-8">
                    <LabelledInput label="Username" placeholder="xyz@gmail.com" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />
                    <button onClick={sendRequest} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Sign in
                    </button>
                    <GoogleLogin
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
                    />;
                </div>
            </div>
        </div>
    </div>
}