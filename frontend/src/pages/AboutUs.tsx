import { motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function AboutUs() {
    
    const navigate = useNavigate();
    
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
      const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
      }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Header */}
      <header className="border-b border-black">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to={"/"} className="pt-2 md:flex md:flex-col md:justify-center">
              <div className="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="26" fill="none" viewBox="0 0 120 26" className="be bf"><path fill="#000" d="m29.57 1.404.036-.008V1.12h-7.27l-6.75 15.979-6.75-15.98H1.003v.278l.035.008c1.327.302 2 .752 2 2.374v18.993c0 1.623-.676 2.073-2.003 2.374L1 25.153v.279h5.315v-.278l-.035-.008c-1.327-.302-2-.751-2-2.374V4.88l8.67 20.552h.492l8.924-21.125V23.24c-.114 1.282-.782 1.677-1.983 1.95l-.036.009v.275h9.259V25.2l-.036-.008c-1.203-.274-1.886-.67-2-1.95l-.006-19.464h.006c0-1.622.674-2.072 2-2.374m4.23 12.582c.15-3.412 1.367-5.875 3.41-5.918.629.01 1.157.219 1.568.62.872.852 1.282 2.634 1.219 5.298zm-.092.962h10.85v-.046c-.03-2.61-.78-4.64-2.228-6.033-1.25-1.204-3.103-1.867-5.048-1.867h-.043c-1.01 0-2.248.246-3.13.693a7.3 7.3 0 0 0-2.623 2.086c-1.185 1.479-1.903 3.477-2.078 5.724a14 14 0 0 0-.04.755q-.007.292-.001.587C29.484 21.934 32.213 26 37.059 26c4.254 0 6.73-3.132 7.348-7.336l-.312-.11c-1.085 2.259-3.034 3.628-5.252 3.461-3.028-.228-5.347-3.32-5.137-7.066m23.122 6.893c-.356.85-1.099 1.319-2.094 1.319s-1.905-.689-2.552-1.939c-.694-1.342-1.06-3.24-1.06-5.487 0-4.678 1.445-7.704 3.68-7.704.937 0 1.674.468 2.026 1.284zm7.198 3.335c-1.327-.316-2-.787-2-2.492V0l-8.062 2.392v.293l.05-.004c1.111-.09 1.866.064 2.304.472.343.32.51.809.51 1.498v3.11C56.033 7.25 55.088 7 53.94 7c-2.326 0-4.453.987-5.986 2.779-1.599 1.867-2.444 4.42-2.444 7.38 0 5.287 2.584 8.84 6.43 8.84 2.25 0 4.06-1.242 4.888-3.336v2.811h7.233v-.29zM70.94 3.085c0-1.65-1.236-2.896-2.875-2.896-1.632 0-2.908 1.272-2.908 2.896s1.278 2.896 2.908 2.896c1.64 0 2.875-1.245 2.875-2.896m1.903 22.092c-1.327-.316-2-.787-2-2.492h-.006V7.055l-7.234 2.092v.284l.043.004c1.566.14 1.994.683 1.994 2.525v13.515h7.24v-.29zm18.536 0c-1.327-.316-2-.787-2-2.492V7.055L82.49 9.078v.285l.04.004c1.28.136 1.65.71 1.65 2.56v9.88c-.426.85-1.227 1.356-2.196 1.39-1.573 0-2.439-1.07-2.439-3.012V7.055l-7.234 2.092v.284l.044.004c1.565.14 1.994.683 1.994 2.525v8.362a9.4 9.4 0 0 0 .15 1.741l.13.57C75.243 24.845 76.848 26 79.362 26c2.129 0 3.996-1.328 4.818-3.405v2.885h7.233v-.291zm28.102.298v-.291l-.035-.009c-1.44-.334-2.001-.964-2.001-2.248V12.295C117.445 8.98 115.597 7 112.5 7c-2.257 0-4.16 1.314-4.893 3.36-.582-2.168-2.257-3.36-4.734-3.36-2.175 0-3.88 1.156-4.612 3.11V7.056l-7.233 2.006v.286l.043.004c1.547.138 1.994.697 1.994 2.492v13.631h6.75v-.29l-.037-.01c-1.148-.271-1.519-.767-1.519-2.04V10.95c.304-.715.917-1.562 2.127-1.562 1.504 0 2.266 1.05 2.266 3.116v12.972h6.751v-.29l-.035-.01c-1.149-.271-1.52-.767-1.52-2.04V12.294a7 7 0 0 0-.095-1.21c.322-.777.97-1.696 2.23-1.696 1.524 0 2.265 1.02 2.265 3.116v12.972z"></path></svg>
              </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/about-us" className="text-sm text-gray-600 hover:text-gray-900">
              Our story
            </a>
            <a href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="/publish" className="text-sm text-gray-600 hover:text-gray-900">
              Write
            </a>
            <a href="/signin" className="text-sm text-gray-600 hover:text-gray-900">
              Sign in
            </a>
            <Button
             onClick={() => {
              navigate('/blogs')
          }}
             variant="default" className="rounded-full bg-black text-white hover:bg-gray-800">
              Get started
            </Button>
          </nav>
          <Button variant="ghost" className="md:hidden"
            onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </Button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-amber-50 border-b shadow-xl">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <a href="/about-us" className="text-sm text-gray-600 hover:text-gray-900">
                  Our story
                </a>
                <a href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
                <a href="/publish" className="text-sm text-gray-600 hover:text-gray-900">
                  Write
                </a>
                <a href="/signin" className="text-sm text-gray-600 hover:text-gray-900">
                  Sign in
                </a>
                <Button
                  onClick={() => {
                    navigate('/blogs')
                  }}
                 variant="default" className="rounded-full bg-black text-white hover:bg-gray-800 w-full">
                  Get started
                </Button>
              </div>
            </div>
          )}
      </header>
    <motion.div 
      className="container mx-auto px-4 py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-5xl md:text-6xl font-serif mb-8 text-center"
        variants={itemVariants}
      >
        Our Story
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic. We're creating a new model for digital publishing. One that supports nuance, complexity, and vital storytelling without giving in to the incentives of advertising.
      </motion.p>
      <motion.p 
        className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Our mission is to deepen the understanding of the world through stories, ideas, and perspectives that matter. We're building a place where ideas develop, take shape, and come to life. A place where thinkers, storytellers, and experts can share big, interesting ideas.
      </motion.p>
      <motion.div 
        className="flex justify-center gap-4 flex-wrap"
        variants={itemVariants}
      >
        <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-8 h-12 text-base"
            onClick={() => {
                navigate('/blogs')
              }}
        >
          Start reading
        </Button>
        <Button className="rounded-full bg-amber-50 text-black hover:bg-amber-100 px-8 h-12 text-base border border-black"
            onClick={() => {
                navigate('/publish')
              }}
        >
          Start writing
        </Button>
      </motion.div>
    </motion.div>
    </div>
  )
}

