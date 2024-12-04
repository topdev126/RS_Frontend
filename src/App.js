import { Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assect/scss/style.scss";
import "./assect/css/materialdesignicons.min.css";
import ScrollTop from "./components/scrollTop";
import IndexTwo from "./pages/home";
import AdminSidebar from "./pages/admin/admin";
import List from "./pages/list";
import PropertyDetailsTwo from "./pages/property-detail";
import AboutUs from "./pages/aboutus";
import Pricing from "./pages/pricing";
import Faqs from "./pages/faqs";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Blogs from "./pages/blogs";
import BlogDetail from "./pages/blog-detail";
import ContactUs from "./pages/contactus";
import Profile from "./pages/profile";
import AuthLogin from "./pages/auth/login";
import ResetPassword from "./pages/auth/auth-re-password";
import Signup from "./pages/auth/signup";
import Comingsoon from "./pages/Special/comingsoon";
import Maintenance from "./pages/Special/maintenance";
import Error from "./pages/Special/error";

function App() {
  return (
    <>
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-reset-password" element={<ResetPassword />} />
        <Route path="/comingsoon" element={<Comingsoon />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/admin" element={<AdminSidebar />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ScrollTop />
    </>
  );
}

export default App;
