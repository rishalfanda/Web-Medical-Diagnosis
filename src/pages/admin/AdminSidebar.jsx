import { useGetUsers } from "../../hooks/user/useGetUsers";
import useAuthStore from "../../store/authStore";
import AdminNav from "./AdmiNav";

function AdminSidebar() {
  const {isPending, users} = useGetUsers()
  const currentUser = useAuthStore((state) => state.currentUser);
  console.log(currentUser)
  console.log(users)
  
  const firstUser = users?.[6];
  const avatarAdmin = firstUser?.avatar;
  const nameAdmin = firstUser?.name;
  if (isPending) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

    return (
        <aside className="fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl z-10">
            <div className="p-6">
            {/* Admin Profile */}
            <div className="text-center mb-8">
                <div className="relative inline-block">
                <img
                    src={avatarAdmin}
                    alt="Admin Profile"
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg mx-auto"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mt-3">{nameAdmin}</h3>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                Administrator
                </span>
            </div>
            <AdminNav/>
        </div>
      </aside>
    )
}

export default AdminSidebar
