import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import User from "./pages/user/User";
/* import "./index.css"; */
import AdminAppLayout from "./pages/admin/AdminAppLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorList from "./pages/admin/DoctorList";
import InstansiDoctorList from "./pages/admin_instansi/InstansiDoctorList";
import GuestForm from "./pages/guest/GuestForm";
import Index from "./pages/Index";
import PageNotFound from "./pages/PageNotFound";
import GuestResult from "./pages/result/GuestResult";
import DoctorResult from "./pages/result/Result";
import Citra from "./pages/user/citra/Citra";
import Dataset from "./pages/user/dataset/Dataset";
import DoctorForm from "./pages/user/DoctorForm";
import PatienList from "./pages/user/PatienList";
import UserAppLayout from "./pages/user/UserAppLayout";
import UserDashboard from "./pages/user/UserDashboard";
import GlobalStyles from "./styles/GlobalStyles";
import AuthWrapper from "./pages/auth/AuthWrapper";
import RoleWrapper from "./pages/auth/RoleWrapper";
import Instansi from "./pages/admin/instansi/Instansi";
import AdminInstansiDashboard from "./pages/admin_instansi/AdminInstansiDashboard";
import AdminInstansiAppLayout from "./pages/admin_instansi/AdminInstansiAppLayout";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /* refetch for 0s */
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
<Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<User />} />
          <Route path="/guest" element={<GuestForm />} />
          <Route path="/guest-result" element={<GuestResult />} />

          {/* Superadmin routes */}
          <Route
            path="/superadmin/*"
            element={
              <AuthWrapper>
                <RoleWrapper requiredRole="superadmin">
                  <AdminAppLayout />
                </RoleWrapper>
              </AuthWrapper>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="dataset" element={<Dataset />} />
            <Route path="dataset/citra/:datasetId" element={<Citra />} />
            <Route path="instansi" element={<Instansi />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Admin instansi routes */}
          <Route
            path="/admin/*"
            element={
              <AuthWrapper>
                <RoleWrapper requiredRole="admin">
                  <AdminInstansiAppLayout />
                </RoleWrapper>
              </AuthWrapper>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminInstansiDashboard />} />
            <Route path="doctors" element={<InstansiDoctorList />} />
            <Route path="dataset" element={<Dataset />} />
            <Route path="dataset/citra/:datasetId" element={<Citra />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* User routes */}
          <Route
            path="/user/*"
            element={
              <AuthWrapper>
                <RoleWrapper requiredRole="user">
                  <UserAppLayout />
                </RoleWrapper>
              </AuthWrapper>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="patients" element={<PatienList />} />
            <Route path="dataset" element={<Dataset />} />
            <Route path="dataset/citra/:datasetId" element={<Citra />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Dokter form dan hasil */}
          <Route
            path="/doctor-form"
            element={
              <AuthWrapper>
                <RoleWrapper requiredRole="user">
                  <DoctorForm />
                </RoleWrapper>
              </AuthWrapper>
            }
          />
          <Route
            path="/result/:resultId"
            element={
              <AuthWrapper>
                <RoleWrapper requiredRole="user">
                  <DoctorResult />
                </RoleWrapper>
              </AuthWrapper>
            }
          />

          {/* Not Found Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;