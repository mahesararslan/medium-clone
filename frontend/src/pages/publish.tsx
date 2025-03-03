import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import "../App.css";

export const Publish = () => {
    
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");


    return <div className="App">
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full m-10 lg:m-0">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />

                <textarea onChange={(e) => {
                    setDescription(e.target.value)
                }} className="mt-5 bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Short description" />
                
                <TextEditor content={content} setContent={setContent} />
                
                <div className="flex items-center justify-end mt-2 space-x-2 rtl:space-x-reverse">
                    <button onClick={async () => {
                        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                            title,
                            description,
                            content
                        }, {
                            headers:{
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        navigate(`/blog/${res.data.id}`)
                    }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-500 hover:bg-green-600 hover:scale-110 rounded-xl focus:ring-4 focus:ring-green-200 my-5">
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    </div>
}
