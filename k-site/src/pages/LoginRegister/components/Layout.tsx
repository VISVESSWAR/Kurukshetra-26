import React, { type ComponentType, type ReactNode } from "react";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  Form: ComponentType<{ children?: ReactNode }>;
  backPath?: string;
  children?: ReactNode;
}

const Layout = ({ Form, backPath: _, children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        {children || <Form />}
      </div>
    </div>
  );
};

export default Layout;
