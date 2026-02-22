import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";
import CegianForm from "./CegianForm";
import OtherForm from "./OtherForm";


interface RegisterFormsProps {
  verifiedEmail?: string;
}

const RegisterForms = ({ verifiedEmail }: RegisterFormsProps) => {
  const [active, setActive] = useState("cegian");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("user") && (location.state || params.get("email"))) {
      // verifiedEmail is set from props
    }
  }, [location.state]);

  return (
    <div className="w-full max-w-4xl rounded-xl border border-white/20 bg-slate-950/50 lg:px-8 px-4 py-12 backdrop-blur-md text-white">
            <h2 className="z-10 mt-8 mb-6 font-euroStyle font-semibold uppercase text-white [text-shadow:5px_5px_5px_rgba(122,40,255,0.3)] md:text-4xl text-3xl text-center">
              Register for K! 26
            </h2>
            <Tabs
              defaultValue="cegian"
              className="mx-auto mb-1 w-full"
              value={active}
              onValueChange={setActive}
            >
              <TabsList className="grid min-w-[250px] grid-cols-2 rounded-lg bg-white/5 font-euroStyle font-medium border border-white/20 dark:bg-white/5">
                <TabsTrigger
                  value="cegian"
                  className="px-2 lg:text-lg text-sm leading-relaxed min-h-[48px] rounded-md flex items-center justify-center box-border overflow-visible transform -translate-y-2 -translate-x-1 dark:data-[state=active]:bg-[#7a28ff] dark:data-[state=active]:text-white dark:data-[state=active]:shadow-[0_0_12px_rgba(122,40,255,0.5)]"
                >
                  CEGian
                </TabsTrigger>
                <TabsTrigger
                  value="non-cegian"
                  className="px-2 lg:text-lg text-sm leading-relaxed min-h-[48px] rounded-md flex items-center justify-center box-border overflow-visible transform -translate-y-2 translate-x-1 dark:data-[state=active]:bg-[#7a28ff] dark:data-[state=active]:text-white dark:data-[state=active]:shadow-[0_0_12px_rgba(122,40,255,0.5)]"
                >
                  External Participant
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cegian" className="mt-6 lg:min-w-[300px]">
                <CegianForm verifiedEmail={verifiedEmail} />
              </TabsContent>
              <TabsContent value="non-cegian" className="mt-6 lg:min-w-[300px]">
                <OtherForm verifiedEmail={verifiedEmail} />
              </TabsContent>
            </Tabs>
            <div className="flex items-end justify-center pb-10 font-novaSquare md:pb-0">
              <span className="text-xs tracking-wider opacity-70 text-gray-300">
                Already have an account?
              </span>
              <Link
                to={"/login"}
                className="relative ml-3 cursor-pointer text-sm text-white font-medium transition-colors duration-300 hover:text-gray-200
after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full
after:scale-x-0 after:origin-left after:bg-white
after:transition-transform after:duration-300
hover:after:scale-x-100"
              >
                Login
              </Link>
            </div>
          </div>
    );
};

export default RegisterForms;
