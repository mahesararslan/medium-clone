import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function Authentication() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin");
            return; 
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function(response) {
            if (response.data.blogs) {
                navigate("/blogs");
            } else {
                navigate("/signin");
            }
        })
        .catch(function(error) {
            console.log("Error:", error);
            navigate("/signin"); // Navigate to signin page on error
        });
    }, []);

    return <div></div>;
}
