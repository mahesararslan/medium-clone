import { useState, useEffect, useRef } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  InboxIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link,useNavigate } from "react-router-dom";


const OpenSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle closing when clicking outside of the sidebar
  useEffect(() => {
    const handleClickOutside = (event: any) => { // @ts-ignore
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);  // Close the sidebar
      }
    };

    // Attach event listener to the whole document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div>
      {/* Toggle button */}
      <button
        type="button"
        aria-controls="default-sidebar"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <div> {/* @ts-ignore */}
        <Card className="h-[calc(100vh-2rem)] w-full p-4 shadow-xl shadow-blue-gray-900/5">  {/* @ts-ignore */}                                                          
        <List> {/* @ts-ignore */}
          <ListItem className="mb-5 mt-4"> {/* @ts-ignore */}
            <ListItemPrefix className="mr-2" > 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

            </ListItemPrefix>
            <Link to="/blogs">Home</Link>
          </ListItem> {/* @ts-ignore */}
          <ListItem className="mb-5"> {/* @ts-ignore */}
            <ListItemPrefix className="mr-2" > 
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/my-blogs">My Blogs</Link>
          </ListItem> {/* @ts-ignore */}
          <ListItem className="mb-5"> {/* @ts-ignore */}
            <ListItemPrefix className="mr-2" >
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/edit-profile">Edit</Link>
          </ListItem> {/* @ts-ignore */}
          <ListItem onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
            }} className="mb-5"> {/* @ts-ignore */}
            <ListItemPrefix className="mr-2" >
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      </div>
        </div>
      </aside>
    </div>
  );
};

export default OpenSidebar;
