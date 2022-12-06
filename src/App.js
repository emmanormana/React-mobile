import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

const ROLES = {
  Authorized: 5001,
  User: 3005,
  Public: 2001,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Public]} />}>
          <Route path="/" element={<Profile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Public]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Public]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route
          element={
            <RequireAuth allowedRoles={[ROLES.User, ROLES.Authorized]} />
          }
        >
          <Route path="lounge" element={<Lounge />} />
        </Route>

        <Route
          element={
            <RequireAuth allowedRoles={[ROLES.User, ROLES.Authorized]} />
          }
        >
          <Route path="profile/:id" element={<Profile />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
