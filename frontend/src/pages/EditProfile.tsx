import { useState } from "react";
import { Appbar } from "../components/Appbar"
import { LabelledInput } from "../components/LabelledInput";

import { useUser } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Sidebar } from "../components/Sidebar";

export const EditProfile = () => {
    const {loading, user} : { loading: any, user: any} = useUser();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function updateName() {
        
        if(name.trim().length > 1) {
            try {
                const response = await axios.put(`${BACKEND_URL}/api/v1/user/update-user`, {
                    name: name
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                if(response) {
                    alert("User Information Updated")
                }
            }
            catch (e) {
                console.log("Error", e);
                // alert the user that the request failed.
            }
        }
        else {
            alert("Name should contain atleast 2 characters")
        }
    }

    async function updatePassword() {

        if(password.trim().length > 5) {
            try {
                const response = await axios.put(`${BACKEND_URL}/api/v1/user/update-user`, {
                    password: password
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                if(response) {
                    alert("User Information Updated")
                }
            }
            catch (e) {
                console.log("Error", e);
                // alert the user that the request failed.
            }
        }
        else {
            alert("Password should contain atleast 6 characters")
        }
        
    }

    if(loading) {
        return <div>
            Loading...
        </div>
    }

    return <div>
      <Appbar />
      <div className="grid grid-cols-12">
          <div className="col-span-4 flex flex-col mx-2 my-5">
            <div  className="ml-5 relative cursor-pointer inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 h-12 w-12">
                <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">{user.name[0].toUpperCase()}</span>
            </div>
            <div>
              <Sidebar />
            </div>
          </div>
          <div className="col-span-8 mt-10" >
            <div className="flex flex-col justify-center pt-8 pl-8 max-w-md">
                    <LabelledInput label="Name" placeholder="John Doe" onChange={(e) => {
                        setName(e.target.value)
                    }} />
                    <button onClick={updateName} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Update Name
                    </button>
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <button onClick={updatePassword} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Update Password
                    </button>
            </div>
          </div>
      </div>
    </div>
}