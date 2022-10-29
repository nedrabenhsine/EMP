import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

export default ({ children }) => {
    return (
        <>
        
                <Sidebar />
                <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                    <Navbar />

                    {children}

                </main>
          
        </>
    )
}