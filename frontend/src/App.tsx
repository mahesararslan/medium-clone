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
import { SearchPage } from "./pages/SearchBlogs"
import LandingPage from "./pages/LandingPage"
import AboutUs from "./pages/AboutUs"
import PrivacyPolicy from "./pages/PrivatePolicy"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import { AccountPage } from "./pages/AccountPage"

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/publish" element={<Publish />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-blogs" element={<MyBlogs />} />
                <Route path="/account/:id" element={<AccountPage />} />
                <Route path="/edit-profile" element={<EditProfile />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
