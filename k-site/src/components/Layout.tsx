import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Background from "@/pages/Background";

interface LayoutProps {
  Form: React.ComponentType<any>;
  backPath?: string;
}

const Layout: React.FC<LayoutProps> = ({ Form, backPath }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 bg-black font-sans pb-12">
      {/* The futuristic background you already have */}
      <Background />

      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center">
        {/* Futuristic Page Header */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-white tracking-widest mb-10 uppercase" style={{ fontFamily: 'Orbitron' }}>
          KURUKSHETRA <span className="text-purple-500">2026</span>
        </h1>

        <div className="w-full relative">
           {/* Back Button - Positioned top left of the form area */}
          {backPath && (
            <button 
              onClick={() => navigate(backPath)}
              className="absolute -top-10 left-2 flex items-center gap-2 text-[#D81B60] font-bold text-xs uppercase hover:underline transition-all"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {/* This renders the Form component you pass into it */}
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Layout;