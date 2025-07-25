import { BrainCog, Home, LogOut, Map, Stethoscope } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function AdminNav() {
    const navigate = useNavigate()

    const handleLogout = useAuthStore((state) => state.handleLogout);

    return (
        <nav className="space-y-2">
            <NavLink
                to="/superadmin/dashboard"
                className={({ isActive }) =>
                `flex items-center p-3 rounded-xl transition-all duration-300 group ${
                isActive
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                : "text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500"
                }`
            }
            >
                <Home className="mr-3 h-5 w-5" />
                <span className="font-medium">Dashboard</span>
            </NavLink>

            <NavLink
                to="/superadmin/doctors"
                className={({ isActive }) =>
                `flex items-center p-3 rounded-xl transition-all duration-300 group ${
                isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    : "text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600"
                }`
                }
            >
                <Stethoscope className="mr-3 h-5 w-5" />
                <span className="font-medium">Tenaga Kesehatan</span>
            </NavLink>

            <NavLink
                to="/superadmin/dataset"
                className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
                    isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                    : "text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500"
                }`
                }
            >
                <BrainCog className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Dataset</span>
            </NavLink>

            <NavLink
                to="/superadmin/instansi"
                className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
                    isActive
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                    : "text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-600"
                }`
                }
            >
                <Map className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Instansi</span>
            </NavLink>

            {/* <a
                href="#"
                className="flex items-center p-3 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 rounded-xl transition-all duration-300 group"
                >
                <Heart className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Patients</span>
                </a>
                <a
                href="#"
                className="flex items-center p-3 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 rounded-xl transition-all duration-300 group"
                >
                <BarChart3 className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Analytics</span>
                </a>
                <a
                href="#"
                className="flex items-center p-3 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-600 rounded-xl transition-all duration-300 group"
                >
                <Calendar className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Schedules</span>
                </a> */}
            
            <div className="absolute bottom-6 left-6 right-6">
                <NavLink 
                    to="#"  
                    onClick={async (e) => {
                        e.preventDefault();
                        await handleLogout();
                        navigate("/");
                    }}
                    className="flex items-center w-full p-3 text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 rounded-xl transition-all duration-300 group"
                >
                    <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Logout</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default AdminNav
