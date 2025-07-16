import { useGetUsers } from "../../hooks/user/useGetUsers";
import UserNav from "./UserNav";

function UserSidebar() {
    const { isPending, users } = useGetUsers();
    const doctorUser = users?.[1];
    const avatarUser = doctorUser?.avatar;
    const nameDoctor = doctorUser?.name;

    if (isPending) return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    )
    
    return (
        <aside className="fixed left-0 top-0 h-full w-72 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 shadow-2xl z-10">
            <div className="p-6">
            {/* Doctor Profile */}
            <div className="text-center mb-8">
                <div className="relative inline-block">
                <img
                    src={avatarUser}
                    alt="Doctor Profile"
                    className="w-20 h-20 rounded-full border-4 border-blue-500/30 shadow-lg mx-auto"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                </div>
                <h3 className="font-bold text-lg text-white mt-3">{nameDoctor}</h3>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full mt-1">
                Medical Doctor
                </span>
            </div>

            {/* Navigation */}
            <UserNav/>
            </div>      
        </aside>
    )
}

export default UserSidebar
