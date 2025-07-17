import { Activity, BrainCog, Calendar, FileText, Home, LogOut, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

function UserNav() {
  return (
    <nav className="space-y-2">
      <NavLink
        to="/user/dashboard"
        className={({ isActive }) =>
          `flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
              : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500"
          }`
        }
      >
        <Home className="mr-3 h-5 w-5" />
        <span className="font-medium">Dashboard</span>
      </NavLink>

      <NavLink
        to="/user/patients"
        className={({ isActive }) =>
          `flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
            isActive
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
          }`
        }
      >
        <Users className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Patients</span>
      </NavLink>

      <NavLink
        to="/user/dataset"
        className={({ isActive }) =>
          `flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
            isActive
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
              : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500"
          }`
        }
      >
        <BrainCog className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Dataset</span>
      </NavLink>

      {/* <NavLink
        to="/user/schedule"
        className={({ isActive }) =>
          `flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
            isActive
              ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white"
              : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-500"
          }`
        }
      >
        <Calendar className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Schedule</span>
      </NavLink>

      <NavLink
        to="/user/reports"
        className={({ isActive }) =>
          `flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
            isActive
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
              : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500"
          }`
        }
      >
        <FileText className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Reports</span>
      </NavLink> */}

      {/* Logout */}
      <div className="absolute bottom-6 left-6 right-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
              isActive
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                : "text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500"
            }`
          }
        >
          <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default UserNav;
