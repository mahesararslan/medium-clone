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


export function Sidebar() {
    const navigate = useNavigate();
  
    return (                                     
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
    );
  }
  