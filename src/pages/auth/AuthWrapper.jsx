import { Children, useEffect } from "react";
import useAuthStore from "../../store/authStore";


const AuthWrapper = ({ children }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser(); // only fetch if store is empty
    }
  }, [])

  if (loading) return <div>Loading...</div>

  return children
}

export default AuthWrapper