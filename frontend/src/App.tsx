 import { BrowserRouter, Route, Routes } from "react-router-dom"
 import { Signup } from "./pages/Signup"
 import { Signin } from "./pages/Signin"
 import { Blog } from "./pages/Blog"
 import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/publish"
import { Profile } from "./pages/Profile"
import { MyBlogs } from "./pages/MyBlogs"
import { EditProfile } from "./pages/EditProfile"
import { RecoilRoot } from "recoil"
import { SearchBlogs } from "./pages/SearchBlogs"
import { Auth } from "./pages/Auth"

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/search" element={<SearchBlogs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
