import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import User from "./pages/user/User";
/* import "./index.css"; */
import GuestForm from "./pages/guest/GuestForm";
import Index from "./pages/Index";
import PageNotFound from "./pages/PageNotFound";
import GuestResult from "./pages/result/GuestResult";
import DoctorResult from "./pages/result/Result";
import DoctorForm from "./pages/user/DoctorForm";
import GlobalStyles from "./styles/GlobalStyles";

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

          {/* Must be a Proteted Route */}
          {/* route ke form dengan akses login */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/doctor-form" element={<DoctorForm />} />
          {/* route ke result dengan akses login */}
          <Route path="/result/:resultId" element={<DoctorResult />} />
          {/* Must be a Proteted Route */}

          {/* route ke form untuk guest */}
          <Route path="/guest" element={<GuestForm/>}/>
          {/* route ke result buat guest */}
          <Route path="/guest-result" element={<GuestResult/>}/>
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
