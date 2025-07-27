import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import AdminInstansiSidebar from "./AdminInstansiSidebar"

function AdminInstansiAppLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <AdminInstansiSidebar/>
            <main className="ml-72 p-8">
                <AdminHeader/>
                <Outlet/>
            </main>
        </div>
    )
}

export default AdminInstansiAppLayout
