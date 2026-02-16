import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSignOutAlt, FaDownload, FaCopy, FaClipboardCheck, FaQrcode 
} from "react-icons/fa";
import Background from "@/pages/Background";

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock User - Replace with AuthContext data later
  const user = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    college: "CEG, Anna University",
    dept: "Computer Science",
    year: "3",
    state: "Tamil Nadu",
    city: "Chennai",
    kid: "K260001", // K! ID
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=K260001",
    isCegian: true
  };

  const handleLogoutClick = () => {
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 bg-black font-sans pb-12">
      <Background />

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron' }}>
            User <span className="text-purple-500">Profile</span>
          </h1>
        </div>

        {/* Main Profile Card */}
        <div className="rounded-[15px] p-8 border-[0.5px] border-white/40 bg-white/[0.02] backdrop-blur-xl shadow-2xl">
          
          {/* K! ID Header Section */}
          <div className="mb-8 border-b border-white/10 pb-6">
            <KidID id={user.kid} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* Left Info Column */}
            <div className="space-y-4">
              <ProfileField label="Full Name" value={`${user.firstname} ${user.lastname}`} />
              <ProfileField label="Email Address" value={user.email} />
              <ProfileField label="Mobile Number" value={user.phone} />
              {user.isCegian ? (
                 <ProfileField label="College" value="CEG, Anna University" />
              ) : (
                 <ProfileField label="College" value={user.college} />
              )}
            </div>

            {/* Right Info Column */}
            <div className="space-y-4">
              <ProfileField label="Department" value={user.dept} />
              <ProfileField label="Year of Study" value={`${user.year} Year`} />
              {!user.isCegian && (
                <>
                  <ProfileField label="State" value={user.state} />
                  <ProfileField label="City" value={user.city} />
                </>
              )}
              
              {/* QR Section */}
              <div className="pt-2">
                <label className="text-white text-[11px] font-bold uppercase tracking-wider ml-2 mb-2 block">Your QR Pass</label>
                <div className="flex items-center gap-4 bg-[#1A0B2E]/40 border-[0.5px] border-white/40 rounded-[15px] p-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
                  <img src={user.qr} alt="K! ID QR" className="w-20 h-20 rounded-lg border border-purple-500/50" />
                  <div className="flex flex-col gap-2 w-full">
                    <a 
                      href={user.qr} 
                      download="K26_ID_QR.png"
                      className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-600 text-white text-[10px] font-bold py-2 rounded-lg transition-all"
                    >
                      <FaDownload size={12} /> DOWNLOAD QR
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <p className="text-gray-400 text-xs italic">Verify your details. Contact helpdesk for corrections.</p>
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 bg-transparent border border-[#D81B60] text-[#D81B60] hover:bg-[#D81B60] hover:text-white px-8 py-2.5 rounded-[12px] font-bold text-xs transition-all uppercase tracking-widest"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="w-full">
    <label className="text-white text-[10px] font-bold uppercase tracking-wider ml-2 mb-1 block opacity-60">{label}</label>
    <div className="w-full bg-[#1A0B2E]/40 border-[0.5px] border-white/20 rounded-[15px] px-5 py-2.5 text-white text-sm shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]">
      {value}
    </div>
  </div>
);

const KidID = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Kurukshetra ID</label>
      <div 
        onClick={handleCopy}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <span className="text-2xl md:text-4xl font-bold text-white tracking-widest group-hover:text-purple-400 transition-colors">
          {id}
        </span>
        {copied ? (
          <FaClipboardCheck className="text-green-400 text-xl" />
        ) : (
          <FaCopy className="text-white/30 group-hover:text-white transition-all text-lg" />
        )}
      </div>
      {copied && <span className="text-green-400 text-[10px] font-bold uppercase mt-1">Copied to clipboard</span>}
    </div>
  );
};

export default Profile;