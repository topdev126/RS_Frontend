import { Route, Routes, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assect/scss/style.scss";
import "./assect/css/materialdesignicons.min.css";
import ScrollTop from "./components/scrollTop";
import IndexTwo from "./pages/home";
import AdminSidebar from "./pages/admin/admin";
import PropertyDetailsTwo from "./pages/property-detail";
import AboutUs from "./pages/aboutus";
import Message from "./pages/message";
import Pricing from "./pages/pricing";
import Faqs from "./pages/faqs";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Blogs from "./pages/blogs";
import BlogDetail from "./pages/blog-detail";
import ContactUs from "./pages/contactus";
import Profile from "./pages/profile";
import Favorite from "./pages/favorite";
import AuthLogin from "./pages/auth/login";
import ResetPassword from "./pages/auth/auth-re-password";
import Signup from "./pages/auth/signup";
import Comingsoon from "./pages/Special/comingsoon";
import Maintenance from "./pages/Special/maintenance";
import Error from "./pages/Special/error";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import SocketConnection from './components/socketConnection'
function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <SocketConnection />
      <ToastContainer
        position="top-right" // Change position: "top-left", "bottom-right", etc.
        autoClose={5000} // Auto-dismiss after 5 seconds
        hideProgressBar={false} // Show/hide the progress bar
        newestOnTop={true} // New notifications appear on top
        closeOnClick // Close the toast on click
        rtl={false} // Support for right-to-left languages
        pauseOnFocusLoss // Pause auto-dismiss on focus loss
        draggable // Allow drag to dismiss
        pauseOnHover // Pause auto-dismiss on hover
        theme="light" // "light", "dark", or "colored"
      />
      <Routes>
        <Route
          path="/"
          element={<IndexTwo param={{ val: "", val1: 0, val2: 0 }} />}
        />
        <Route
          path="/index-two"
          element={<IndexTwo param={{ val: "", val1: 0, val2: 0 }} />}
        />
        <Route
          path="/rent"
          element={<IndexTwo param={{ val: "rent", val1: 0, val2: 0 }} />}
        />
        <Route
          path="/sale"
          element={<IndexTwo param={{ val: "sale", val1: 0, val2: 1 }} />}
        />
        <Route
          path="/commercial"
          element={<IndexTwo param={{ val: "commercial", val1: 0, val2: 0 }} />}
        />
        <Route
          path="/residential"
          element={
            <IndexTwo param={{ val: "residential", val1: 1, val2: 0 }} />
          }
        />
        <Route path="/detail" element={<PropertyDetailsTwo />} />
        <Route path="/detail/:idb/:id" element={<PropertyDetailsTwo />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
        <Route path="/blog-detail/:id" element={<BlogDetail />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/favorite"
          element={currentUser ? <Favorite /> : <Navigate to="/" replace />}
        />
        <Route path="/message" element={currentUser ? <Message /> : <Navigate to="/" replace />} />
        <Route path="/login" element={currentUser ? <Navigate to="/" replace />: <AuthLogin />} /> 
        <Route path="/signup" element={currentUser ? <Navigate to="/" replace />: <Signup />} /> 
        <Route path="/auth-reset-password" element={<ResetPassword />} />
        <Route path="/comingsoon" element={<Comingsoon />} />
        <Route path="/maintenance" element={<Maintenance />} />
        {/* <Route path="/admin" element={<AdminSidebar />} /> */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ScrollTop />
    </>
  );
}

export default App;
