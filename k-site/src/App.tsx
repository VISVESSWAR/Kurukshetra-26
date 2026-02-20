import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/technovation/Background";
import MagicBento from "@/components/MagicBento";
import EventsNew from "./pages/EventsNew";
import Events from "./pages/Events";

// Lazy-loaded pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const Contact = lazy(() => import("@/pages/Contact"));
const Accommodation = lazy(() => import("@/pages/Accommodation"));
const Sponsors = lazy(() => import("@/pages/Sponsors"));
const Terms = lazy(() => import("@/pages/Terms"));
const Technovation = lazy(() => import("@/pages/Technovation"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const WorkshopsList = lazy(() => import("@/pages/Workshop"));
const WorkshopsDetails = lazy(() => import("@/pages/WorkshopDetails"));


import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile"; // Import the new Profile page
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
// import Login from "./pages/Login";

//loader
// import VideoLoader from "@/components/Loader/VideoLoader";

const COMING_SOON_PATHS = ["/guest-lectures"] as const;
// const LOADER2_PATHS = ["/events","/workshops","/contact","/accommodation","/sponsors","/technovation"] as const;

// const UNSTOP_URL =
//   "https://unstop.com/college-fests/kurukshetra-2026-anna-university-ceg-tech-forum-436664";

// /** Redirects to an external URL on mount. */
// function ExternalRedirect({ url }: { url: string }) {
//   useEffect(() => {
//     window.location.href = url;
//   }, [url]);
//   return null;
// }

/** Minimal loading fallback while lazy chunks load. */
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
    </div>
  );
}

function App() {
  // const [loading,setLoading]=useState(true);

  return (
    // <>
    // {loading  && <VideoLoader onFinish={()=>setLoading(false)} />}

    <Router>
      <Toaster
        containerStyle={{ zIndex: 500001 }}
        toastOptions={{
           duration: 2000, 
          success: {
            style: {
              background: "rgb(22, 101, 52, 0.80)",
              border: "1px solid rgb(76, 175, 80)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontFamily: "EuroStyle",
            },
          },
          error: {
            style: {
              background: "rgb(159, 18, 57, 0.80)",
              border: "1px solid rgb(244, 67, 54)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontFamily: "EuroStyle",
            },
          },
          loading: {
            style: {
              background: "rgb(124, 45, 18, 0.80)",
              border: "1px solid rgb(124, 45, 18)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontFamily: "EuroStyle",
            },
          },
        }}
      />
      <MagicBento
        className="z-2"
        textAutoHide
        enableStars
        enableSpotlight
        enableBorderGlow
        clickEffect
        spotlightRadius={100}
        particleCount={12}
        glowColor="132, 0, 255"
      />

      <Navbar />
      <Background />
      <AppProvider>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/technovation" element={<Technovation />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventName" element={<EventsNew />} />

              {COMING_SOON_PATHS.map((path) => (
                <Route key={path} path={path} element={<ComingSoon />} />
              ))}

              <Route path="/workshops" element={<WorkshopsList />} />
              <Route path="/workshops/:slug" element={<WorkshopsDetails />} />

              <Route path="/register" element={<Register />} />

              {/* Forgot Password Page */}
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Profile Page */}
              <Route path="/profile" element={<Profile />} />

              {/* Login Page Placeholder */}
              <Route
                path="/login"
                element={
                  <div className="text-white flex h-screen items-center justify-center">
                    Login Page coming soon...
                  </div>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </AppProvider>

      <Footer />
    </Router>
    // </>
  );
}

export default App;
