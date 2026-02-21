import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
import Login from "./pages/LoginRegister/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";

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
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7a28ff] border-t-transparent" />
    </div>
  );
}

function App() {
  // const [loading,setLoading]=useState(true);

  return (
    // <>
    // {loading  && <VideoLoader onFinish={()=>setLoading(false)} />}

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
        useEnterprise={false}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: "head",
        }}
      >
      <Router>
        <Toaster
          containerStyle={{ zIndex: 500001 }}
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: "linear-gradient(135deg, rgba(0, 255, 200, 0.15) 0%, rgba(0, 200, 255, 0.15) 100%)",
                border: "2px solid #00FFC8",
                backdropFilter: "blur(20px)",
                color: "#00FFC8",
                fontFamily: "EuroStyle",
                boxShadow: "0 0 20px rgba(0, 255, 200, 0.5), inset 0 0 20px rgba(0, 255, 200, 0.1)",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
              },
              iconTheme: {
                primary: "#00FFC8",
                secondary: "#000000",
              },
            },
            error: {
              style: {
                background: "linear-gradient(135deg, rgba(255, 0, 150, 0.15) 0%, rgba(255, 0, 100, 0.15) 100%)",
                border: "2px solid #FF0096",
                backdropFilter: "blur(20px)",
                color: "#FF69D7",
                fontFamily: "EuroStyle",
                boxShadow: "0 0 20px rgba(255, 0, 150, 0.5), inset 0 0 20px rgba(255, 0, 150, 0.1)",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
              },
              iconTheme: {
                primary: "#FF0096",
                secondary: "#000000",
              },
            },
            loading: {
              style: {
                background: "linear-gradient(135deg, rgba(122, 40, 255, 0.15) 0%, rgba(0, 150, 255, 0.15) 100%)",
                border: "2px solid #7A28FF",
                backdropFilter: "blur(20px)",
                color: "#B8A7FF",
                fontFamily: "EuroStyle",
                boxShadow: "0 0 20px rgba(122, 40, 255, 0.5), inset 0 0 20px rgba(122, 40, 255, 0.1)",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
              },
              iconTheme: {
                primary: "#7A28FF",
                secondary: "#000000",
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

      <Background />
      <AppProvider>
        <AuthProvider>
          <Navbar />
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

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </AuthProvider>
      </AppProvider>
      </Router>
      </GoogleReCaptchaProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
