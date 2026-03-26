import React, {  useState, type HTMLAttributes } from "react";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { countryCodes } from "@/constants/locations";

interface CountryCode {
  name: string;
  dial_code: string;
  code: string;
}

interface PhoneCodeProps extends HTMLAttributes<HTMLDivElement> {
  countryName: string;
  setCountry: (name: string) => void;
}

const PhoneCode = React.forwardRef<HTMLDivElement, PhoneCodeProps>(
  ({ countryName, setCountry, className }, ref) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const getDialCode = (name: string): string => {
      const country = (countryCodes as CountryCode[]).find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      return country?.dial_code || "+91";
    };

    const dialCode = getDialCode(countryName);

    const filteredCountries = (countryCodes as CountryCode[]).filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCountrySelect = (country: CountryCode) => {
      setCountry(country.name);
      setOpen(false);
      setSearchQuery("");
    };

    return (
      <div ref={ref} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between px-2 py-1"
        >
          <span className="text-sm">{dialCode}</span>
          <LuChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </button>

        {open && (
          <div className="absolute z-50 top-full left-0 mt-1 w-56 rounded-md border border-slate-300 bg-slate-800 shadow-lg dark:border-slate-600">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border-b border-slate-600 bg-slate-800 text-white text-sm rounded-t-md focus:outline-none"
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="px-3 py-2 text-slate-400 text-sm">
                  Not found.
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm flex items-center hover:bg-slate-700",
                      countryName.toLowerCase() === country.name.toLowerCase()
                        ? "bg-slate-700"
                        : ""
                    )}
                  >
                    <LuCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        countryName.toLowerCase() === country.name.toLowerCase()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.name}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

PhoneCode.displayName = "PhoneCode";

export { PhoneCode };
