import Register from "./components/Register";
import Login from "./components/Login";

import Layout from "./components/Layout";

import Missing from "./components/Missing";
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
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* we want to protect these routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.Public, ROLES.User, ROLES.Authorized]}
            />
          }
        >
          <Route path="/" element={<Profile />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.Public, ROLES.User, ROLES.Authorized]}
            />
          }
        >
          <Route path="profile/:id" element={<Profile />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
