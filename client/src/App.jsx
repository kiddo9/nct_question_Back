import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Nav from "./components/Nav";
import Create from "./pages/create";
import Notfound from "./components/Notfound";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Login from "./pages/Auth/Login";
import Verify from "./pages/Auth/verify";
import Auth from "./components/auth";
import { Admins } from "./pages/Admins";
import CreateAdmins from "./pages/CreateAdmins";
import Authentication from "./components/security/Authentication";
import Preview from "./pages/Preview";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function rediect() {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    rediect();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route index element={<Auth />} />
            <Route
              path="/admin/user/*"
              element={
                <>
                  <Nav />
                  {/* <Authentication> */}
                  <Routes>
                    <Route path="/dash" element={<Index />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/admins" element={<Admins />} />
                    <Route path="/create_admin" element={<CreateAdmins />} />
                    <Route path="/preview/:id" element={<Preview />} />
                    <Route path="*" element={<Notfound />} />
                  </Routes>
                  {/* </Authentication> */}
                </>
              }
            />

            <Route
              path="/auth/admin/*"
              element={
                <>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="*" element={<Notfound />} />
                  </Routes>
                </>
              }
            />

            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
