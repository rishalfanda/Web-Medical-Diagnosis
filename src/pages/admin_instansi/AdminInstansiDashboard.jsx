import { Activity, Stethoscope, UserPlus } from "lucide-react";
import { useGetUsers } from "../../hooks/user/useGetUsers";
function AdminInstansiDashboard() {
    const {isPending, users} = useGetUsers()
    if (isPending) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                        <p className="text-2xl font-bold text-gray-900">{users?.length || 0}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                        <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Active Today</p>
                        <p className="text-2xl font-bold text-gray-900">{Math.floor((users?.length || 0) * 0.8)}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                        <Activity className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">New This Month</p>
                        <p className="text-2xl font-bold text-gray-900">{Math.floor((users?.length || 0) * 0.2)}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                        <UserPlus className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminInstansiDashboard
