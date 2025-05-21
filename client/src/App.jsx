import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Nav from "./components/Nav";
import CreateQuestions from "./pages/CreateQuestions";
import Notfound from "./components/Notfound";
import Login from "./pages/Auth/Login";
import Verify from "./pages/Auth/verify";
import Auth from "./components/auth";
import { Admins } from "./pages/Admins";
import CreateAdmins from "./pages/CreateAdmins";
import Authentication from "./components/security/Authentication";
import Preview from "./pages/Preview";
import PasswordRest from "./pages/Auth/PasswordRest";
import VerifyEmailButton from "./pages/Auth/VerifyEmailButton";
import EditQuestion from "./pages/EditQuestion";
import EditAdmins from "./pages/EditAdmin";
import Roles from "./pages/Roles";
import Groups from "./pages/Groups";
import Sections from "./pages/Sections";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth />} />
          <Route
            path="/admin/user/*"
            element={
              <>
                <Authentication>
                  <Nav>
                    {/* <Suspense fallback={<Loader />}> */}
                    <Routes>
                      <Route path="/questions" element={<Index />} />
                      <Route
                        path="/questions/create"
                        element={<CreateQuestions />}
                      />
                      <Route path="/admins" element={<Admins />} />
                      <Route path="/admins/create" element={<CreateAdmins />} />
                      <Route path="/section" element={<Sections />} />
                      <Route path="/roles" element={<Roles />} />
                      <Route path="/groups" element={<Groups />} />
                      <Route path="/create_admin" element={<CreateAdmins />} />
                      <Route
                        path="/questions/preview/:id"
                        element={<Preview />}
                      />
                      <Route
                        path="/questions/edit/:id"
                        element={<EditQuestion />}
                      />
                      <Route path="/admins/edit/:id" element={<EditAdmins />} />
                      <Route path="*" element={<Notfound />} />
                    </Routes>
                    {/* </Suspense> */}
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
                  <Route path="/reset" element={<PasswordRest />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<Notfound />} />
                </Routes>
              </>
            }
          />
          <Route path="/email/verify" element={<VerifyEmailButton />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
