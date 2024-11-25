import { Outlet } from "react-router-dom"
import Header from "./components/page-component/header"
import { Toaster } from "react-hot-toast"



const Layout = () => {
    return (
        <div>
            <Header />
            <Toaster />
            <main className="bg-background/50 min-h-screen container mx-auto px-4 py-6">
                <Outlet />
            </main>
            <footer className="border-t flex justify-center items-center py-10   backdrop-blur-md supports-[backdrop-filter]: bg-background/50">
                <p>&copy; {new Date().getFullYear()} Masuam. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Layout
