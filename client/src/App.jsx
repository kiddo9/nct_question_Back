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
import AuthenticationProvider, { useAuth } from "./components/security/Authentication";
import Preview from "./pages/Preview";
import PasswordRest from "./pages/Auth/PasswordRest";
import VerifyEmailButton from "./pages/Auth/VerifyEmailButton";
import EditQuestion from "./pages/EditQuestion";
import EditAdmins from "./pages/EditAdmin";
import Roles from "./pages/Roles";
import Groups from "./pages/Groups";
import Sections from "./pages/Sections";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EmailNotify from "./pages/Auth/EmailNotify";
import Classes from "./pages/Classes";

function App() {
  useAuth()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth />} />
          <Route
            path="/admin/user/*"
            element={
              <>
                <AuthenticationProvider>
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
                      <Route path="/classes" element={<Classes />} />
                      <Route path="/cbt-qr" element={<Sections />} />
                      <Route path="/cbt-sim" element={<Sections />} />
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
                </AuthenticationProvider>
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
                  <Route path="/email-notify" element={<EmailNotify />} />
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
