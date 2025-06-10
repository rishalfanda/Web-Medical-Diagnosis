import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Model from "./components/Model";
import Result from "./components/Result";
import Admin from "./pages/admin/Admin";
import User from "./pages/user/User";
/* import "./index.css"; */
import Guest from "./pages/guest/Guest";
import Index from "./pages/Index";
import PageNotFound from "./pages/PageNotFound";
import GuestResult from "./pages/result/GuestResult";
import GlobalStyles from "./styles/GlobalStyles";
import TestPostResult from "./pages/result/TestPostResult";

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
          <Route path="/model" element={<Model />} />
          {/* route ke result dengan akses login */}
          <Route path="/result/:resultId" element={<Result />} />
          {/* Must be a Proteted Route */}

          {/* route ke form untuk guest */}
          <Route path="/guest" element={<Guest/>}/>
          {/* route ke result buat guest */}
          <Route path="/guest-result" element={<GuestResult/>}/>

          <Route path="/testPostApi" element={<TestPostResult/>}/>
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
