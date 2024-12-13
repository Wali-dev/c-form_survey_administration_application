
import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router-dom"
const Layout = () => {
    return (
        <div className=" h-screen w-screen">
            <Navbar />
            <Outlet />

        </div>
    )
}

export default Layout