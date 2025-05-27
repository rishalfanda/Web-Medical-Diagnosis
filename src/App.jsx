import { BrowserRouter, Route , Routes } from "react-router-dom";
import Login from "./components/Login";
import Model from "./components/Model";
import Result from "./components/Result";
import Admin from "./pages/admin/Admin";
import User from "./pages/user/User";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/* import "./index.css"; */
import GlobalStyles from "./styles/GlobalStyles";
import Test from "./components/Test";
import Guest from "./pages/guest/Guest";
import GuestResult from "./pages/result/GuestResult";
import PageNotFound from "./pages/PageNotFound";

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
          <Route path="/" element={<Login />} />
          {/* route ke form dengan akses login */}
          <Route path="/model" element={<Model />} />
          {/* route ke form untuk guest */}
          <Route path="/guest" element={<Guest/>}/>
          {/* route ke result dengan akses login */}
          <Route path="/result/:resultId" element={<Result />} />
          {/* route ke result buat guest */}
          <Route path="/guest-result/:resultId" element={<GuestResult/>}/>
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/test" element={<Test/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
