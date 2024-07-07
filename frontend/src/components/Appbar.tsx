import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";


export function Appbar() {

    return <div  className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"} className="flex flex-col justify-center">
            <div className="flex justify-center">
                <div><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 496 496" xmlSpace="preserve"><path style={{ fill: "#6A8DA0" }} d="M248.84,280h-1.688l-61.08-232H0v64h19.064C26.904,112,40,120.032,40,126.768v243.784C40,377.28,26.904,384,19.064,384H0v64h152v-64h-40V128h1.784l85.736,320h67.248l86.872-320H352v256h-32v64h176v-64h-19.616c-7.272,0-20.384-6.72-20.384-13.456V126.768c0-6.736,13.112-14.768,20.384-14.768H496V48H310.496L248.84,280z"/><g><path style={{ fill: "#45687F" }} d="M112,150.416C88,145.8,56,139.848,40,132.8v237.752C40,377.28,26.904,384,19.064,384H0v64h152v-64h-40V150.416z"/><path style={{ fill: "#45687F" }} d="M456,370.544V132.8c-32,9.544-64,17.04-104,22V384h-32v64h176v-64h-19.616C469.112,384,456,377.28,456,370.544z"/><path style={{ fill: "#45687F" }} d="M280.824,161.56L248.84,280h-1.688l-31.68-118.44c-33.536-1.256-64.608-2.72-94.736-7.584L199.52,448h67.248l78.696-290.008C324.328,160.528,303.424,160.704,280.824,161.56z"/></g><path d="M112,231.112c-24-6.496-56-14.856-72-24.792v164.224C40,377.28,26.904,384,19.064,384H0v64h152v-64h-40V231.112z"/><path d="M257.568,247.32L248.84,280h-1.688l-8.64-32.68c-33.16-0.504-64.376-1.368-94.584-6.816L199.52,448h67.248l55.416-204.216C301.152,246.392,279.84,246.984,257.568,247.32z"/><path d="M456,370.544V206.312c-24,13.424-64,23.976-104,30.952V384h-32v64h176v-64h-19.616C469.112,384,456,377.28,456,370.544z"/></svg></div>
                <div className="font-bold font-serif" >EDIUM</div>
            </div>
        </Link>
        <div>
            <Link to={"/publish"}>
                <button type="button" className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    New
                </button>
            </Link>
            <Avatar size={"big"} name="harkirat" />
        </div>
    </div>
}