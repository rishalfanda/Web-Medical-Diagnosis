import { Navigate } from "react-router-dom"
import useAuthStore from "../../store/authStore";


const RoleWrapper = ({ requiredRole, children }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);

  if (loading) return <div>Loading...</div>;

  if (!currentUser || role !== requiredRole) {
    if (["user", "admin"].includes(role) ) {
      return <Navigate to={"/" + role} replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleWrapper;