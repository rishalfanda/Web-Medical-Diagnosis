import { Children, useEffect } from "react";
import useAuthStore from "../../store/authStore";


const AuthWrapper = ({ children }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const loading = useAuthStore((state) => state.loading);

  const role = useAuthStore((state) => state.role)

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser(); // only fetch if store is empty
    }
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  )

  return children
}

export default AuthWrapper