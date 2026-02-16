// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";

// import Home from "@/pages/Home";
// import NotFound from "@/pages/NotFound";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Contact from "@/pages/Contact";
// import ComingSoon from "@/pages/ComingSoon";

// const comingSoonPaths = [
//   "/accommodation",
//   "/login",
//   "/register",
//   "/guest-lectures",
// ];

// // External redirect component
// const ExternalRedirect = ({ url }: { url: string }) => {
//   useEffect(() => {
//     window.location.href = url;
//   }, [url]);
//   return null;
// };

// function App() {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         {/* Visible pages */}
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Pages redirected to ComingSoon */}
//         {comingSoonPaths.map((path) => (
//           <Route key={path} path={path} element={<ComingSoon />} />
//         ))}

//         {/* External redirects to Unstop */}
//         <Route
//           path="/events"
//           element={
//             <ExternalRedirect url="https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664" />
//           }
//         />
//         <Route
//           path="/workshops"
//           element={
//             <ExternalRedirect url="https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664" />
//           }
//         />
//         <Route
//           path="/technovation"
//           element={
//             <ExternalRedirect url="https://unstop.com/p/technovation-kurukshetra-2026-anna-university-ceg-tech-forum-1628748?utm_medium=Share&utm_source=vhcnzgkj55361&utm_campaign=Competitions" />
//           }
//         />

//         {/* Catch all - NotFound */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;



// import Register from "./pages/Register";

// function App() {
//   return <Register />;
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile"; // Import the new Profile page
// import Login from "./pages/Login"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/register" />} />
        
        {/* Registration Page */}
        <Route path="/register" element={<Register />} />
        
        {/* Forgot Password Page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Login Page Placeholder */}
        <Route path="/login" element={<div className="text-white flex h-screen items-center justify-center">Login Page coming soon...</div>} />
        
        {/* 404 Fallback - Redirects to register if page not found */}
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;