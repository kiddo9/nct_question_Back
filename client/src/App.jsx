import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Nav from "./components/Nav";
import Create from "./pages/create";
import Notfound from "./components/Notfound";
import Loader from "./components/Loader";
import Login from "./pages/Auth/Login";
import Verify from "./pages/Auth/verify";
import Auth from "./components/auth";
import { Admins } from "./pages/Admins";
import CreateAdmins from "./pages/CreateAdmins";
import Authentication from "./components/security/Authentication";
import Preview from "./pages/Preview";
import { Suspense } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Auth />} />
            <Route
              path="/admin/user/*"
              element={
                <>
                  <Authentication>
                    <Nav>
                      <Routes>
                        <Route path="/dash" element={<Index />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/admins" element={<Admins />} />
                        <Route path="/section" element={<Admins />} />
                        <Route path="/roles" element={<Admins />} />
                        <Route path="/groups" element={<Admins />} />
                        <Route
                          path="/create_admin"
                          element={<CreateAdmins />}
                        />
                        <Route path="/preview/:id" element={<Preview />} />
                        <Route path="*" element={<Notfound />} />
                      </Routes>
                    </Nav>
                  </Authentication>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
