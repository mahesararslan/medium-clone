import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                <TextEditor onChange={(e) => {
                    setContent(e.target.value)
                }} />
                <div className="flex items-center justify-end mt-2 space-x-2 rtl:space-x-reverse">
                    <button onClick={async () => {
                        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                            title,
                            content
                        }, {
                            headers:{
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        navigate(`/blog/${res.data.id}`)
                    }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    </div>
}

const TextEditor = ({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) => {
  return (
    <form className="mt-4">
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                />
              </svg>
              <span className="sr-only">Attach file</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.5 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
              </svg>
              <span className="sr-only">Add emoji</span>
            </button>
          </div>
        </div>
        <div className="px-4 py-2 bg-white rounded-b-lg">
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            onChange={onChange}
            id="editor"
            rows={8}
            className="pl-2 focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
      </div>
    </form>
  );
};
