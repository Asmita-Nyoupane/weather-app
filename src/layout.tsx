import { Outlet } from "react-router-dom"
import Header from "./components/page-component/header"



const Layout = () => {
    return (
        <div>
            <Header />
            <main className="bg-background/60 min-h-screen container mx-auto px-4 py-6">
                <Outlet />
            </main>
            <footer className="border-t flex justify-center items-center py-10   backdrop-blur-md supports-[backdrop-filter]: bg-background/50">
                Made by Asmita
            </footer>
        </div>
    )
}

export default Layout
