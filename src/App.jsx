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
          <Route path="/model" element={<Model />} />
          <Route path="/result/:resultId" element={<Result />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
