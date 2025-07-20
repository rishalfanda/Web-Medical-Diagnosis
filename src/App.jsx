import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthWrapper from "./pages/AuthWrapper"
import RoleWrapper from "./pages/RoleWrapper"
import Login from "./pages/login/Login";
import User from "./pages/user/User";
/* import "./index.css"; */
import AdminAppLayout from "./pages/admin/AdminAppLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorList from "./pages/admin/DoctorList";
import GuestForm from "./pages/guest/GuestForm";
import Index from "./pages/Index";
import PageNotFound from "./pages/PageNotFound";
import GuestResult from "./pages/result/GuestResult";
import DoctorResult from "./pages/result/Result";
import DoctorForm from "./pages/user/DoctorForm";
import GlobalStyles from "./styles/GlobalStyles";
import NewUserAppLayout from "./don't deleted/NewUserAppLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserAppLayout from "./pages/user/UserAppLayout";
import PatienList from "./pages/user/PatienList";
import Dataset from "./pages/user/dataset/Dataset";
import Citra from "./pages/user/citra/Citra";


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
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="test" element={<User/>}/>
          {/* route ke form untuk guest */}
          <Route path="/guest" element={<GuestForm/>}/>
          {/* route ke result buat guest */}
          <Route path="/guest-result" element={<GuestResult/>}/>

          {/* protected routes */}
          <Route path="/*" element={
            <AuthWrapper>
              <Routes>
                {/* route for admin */}
                <Route path="/admin" element={
                    <RoleWrapper requiredRole="admin">
                      <AdminAppLayout/>
                    </RoleWrapper>
                  }>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<AdminDashboard/>}/>
                  <Route path="doctors" element={<DoctorList />} />
                </Route>

                {/* Route for user */}
                <Route path="/user" element ={
                    <RoleWrapper requiredRole="user">
                      <UserAppLayout/>
                    </RoleWrapper>
                  }>
                  <Route index element = {<Navigate to="dashboard" />} />
                  <Route path="dashboard" element = {<UserDashboard/>}/>
                  <Route path="patients" element = {<PatienList/>} />
                  <Route path="dataset" element = {<Dataset/>} />
                  <Route path="dataset/citra/:datasetId" element = {<Citra/>}/>
                </Route>

                <Route path="/doctor-form" element={
                    <RoleWrapper requiredRole="user">
                      <DoctorForm />
                    </RoleWrapper>
                  } />
                  
                <Route path="/result/:resultId" element={
                    <RoleWrapper requiredRole="user">
                      <DoctorResult />
                    </RoleWrapper>
                  } />
              </Routes>
            </AuthWrapper>
          }/>
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
