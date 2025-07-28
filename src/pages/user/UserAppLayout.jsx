import { Outlet } from "react-router-dom"
import UserSidebar from "./UserSidebar"
import UserHeader from "./UserHeader"

function UserAppLayout() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <UserSidebar/>
            <main className="ml-72 p-8">
                <UserHeader/>
                <Outlet/>
            </main>
        </div>
    )
}

export default UserAppLayout
