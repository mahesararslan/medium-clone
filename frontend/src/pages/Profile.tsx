import { useUser } from "../hooks";
import { Appbar } from "../components/Appbar";
import { Sidebar } from "../components/Sidebar";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import OpenSidebar from "../components/ResponsiveSidebar";



export const Profile = () => {
    const {loading, user} : { loading: any, user: any} = useUser();

    if(loading) {
        return <div>
            <ProfileSkeleton />
        </div>
    }

    return <div>
      <Appbar />
      <div className="grid grid-cols-12">
          <div className="col-span-2 md:col-span-4 flex flex-col mx-2 my-5">
            <div  className="ml-5 relative cursor-pointer inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 h-12 w-12">
                <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">{user.name ? user.name[0].toUpperCase() : "A"}</span>
            </div>
            <div className="md:hidden">
              <OpenSidebar />
            </div>
            <div className="hidden md:block">
              <Sidebar />
            </div>
          </div>
          <div className="col-span-8 mt-10" >
              <div className="flex flex-col mx-10"> 
                <div className="text-2xl font-bold" >
                  Username: {user.email}
                </div>
                <div className="text-2xl font-bold mt-2">
                  Name: {user.name ? user.name : "John Doe"}
                </div>
              </div>
              <div className="text-xl font-semibold mt-20 mx-10">
                Bio: Hi there! I'm {user.name ? user.name : "John Doe"}, a passionate writer and avid reader. With a background in journalism and a love for storytelling, I created this blog to share my thoughts on everything from current events to personal growth. When I'm not writing, you can find me exploring new coffee shops, hiking local trails, or immersed in a good book. Join me on this journey as I navigate the ups and downs of life, one blog post at a time. Let's connect, learn, and grow together!
              </div>
          </div>
      </div>
    </div>
}
