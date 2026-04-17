import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />{" "}
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/bookings/:bookingId" element={<Booking />} />
            <Route path="/checkin/:bookingId" element={<Checkin />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
