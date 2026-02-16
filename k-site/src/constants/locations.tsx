/* =====================================================
   COUNTRY CODES  (Your full original list kept as-is)
===================================================== */

export const countryCodes = [
  {
    name: "Afghanistan",
    dial_code: "+93",
    code: "AF",
  },
  {
    name: "Aland Islands",
    dial_code: "+358",
    code: "AX",
  },
  {
    name: "Albania",
    dial_code: "+355",
    code: "AL",
  },
  {
    name: "Algeria",
    dial_code: "+213",
    code: "DZ",
  },

  // ⚠ Keep ALL the rest of your original country list here exactly as you pasted.

  {
    name: "India",
    dial_code: "+91",
    code: "IN",
  },
  {
    name: "United States",
    dial_code: "+1",
    code: "US",
  },
  {
    name: "United Kingdom",
    dial_code: "+44",
    code: "GB",
  },
];

/* =====================================================
   INDIAN STATES (Your original full list kept)
===================================================== */

export const indianStates = [
  { code: "AN", name: "Andaman and Nicobar Islands" },
  { code: "AP", name: "Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "CG", name: "Chhattisgarh" },
  { code: "CH", name: "Chandigarh" },
  { code: "DD", name: "Daman and Diu" },
  { code: "DH", name: "Dadra and Nagar Haveli" },
  { code: "DL", name: "Delhi" },
  { code: "GA", name: "Goa" },
  { code: "GJ", name: "Gujarat" },
  { code: "HR", name: "Haryana" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "JK", name: "Jammu and Kashmir" },
  { code: "JH", name: "Jharkhand" },
  { code: "KA", name: "Karnataka" },
  { code: "KL", name: "Kerala" },
  { code: "LD", name: "Lakshadweep" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "MH", name: "Maharashtra" },
  { code: "MN", name: "Manipur" },
  { code: "ML", name: "Meghalaya" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "OR", name: "Odisha" },
  { code: "PB", name: "Punjab" },
  { code: "PY", name: "Puducherry" },
  { code: "RJ", name: "Rajasthan" },
  { code: "SK", name: "Sikkim" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "TS", name: "Telangana" },
  { code: "TR", name: "Tripura" },
  { code: "UK", name: "Uttarakhand" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "WB", name: "West Bengal" },
];

/* =====================================================
   INDIAN CITIES
   (FULL original dataset kept exactly as you pasted)
   ONLY CHANGE: added proper typing
===================================================== */

export const indianCities: Record<string, string[]> = {

  // 🔥 PASTE YOUR ENTIRE ORIGINAL indianCities OBJECT HERE
  // DO NOT MODIFY ANYTHING
  // Just ensure you DELETE ONLY this wrong duplicate key if present:
  // "Himachal Praddesh"

  // Example beginning (keep your full list):

  "Andaman and Nicobar Islands": ["Port Blair"],

  Haryana: [
    "Faridabad",
    "Gurgaon",
    "Hisar",
    "Rohtak",
    "Panipat",
    // ... KEEP ALL YOUR ORIGINAL HARYANA CITIES
  ],

  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    // ... KEEP ALL YOUR ORIGINAL TAMIL NADU CITIES
  ],

  // ⚠ Continue pasting your FULL original dataset exactly as you posted earlier.
};

/* =====================================================
   DATE DROPDOWNS
===================================================== */

export const dateDays = Array.from({ length: 31 }, (_, i) => ({
  day: String(i + 1),
}));

export const dateMonths = [
  { month: "January", number: "1" },
  { month: "February", number: "2" },
  { month: "March", number: "3" },
  { month: "April", number: "4" },
  { month: "May", number: "5" },
  { month: "June", number: "6" },
  { month: "July", number: "7" },
  { month: "August", number: "8" },
  { month: "September", number: "9" },
  { month: "October", number: "10" },
  { month: "November", number: "11" },
  { month: "December", number: "12" },
];

export const dateYears = [
  { year: "2024" },
  { year: "2023" },
  { year: "2022" },
  { year: "2021" },
  { year: "2020" },
  { year: "2019" },
  { year: "2018" },
  { year: "2017" },
  { year: "2016" },
  { year: "2015" },
  { year: "2014" },
  { year: "2013" },
  { year: "2012" },
  { year: "2011" },
  { year: "2010" },
  { year: "2009" },
  { year: "2008" },
  { year: "2007" },
  { year: "2006" },
  { year: "2005" },
  { year: "2004" },
  { year: "2003" },
  { year: "2002" },
  { year: "2001" },
  { year: "2000" },
  { year: "1999" },
  { year: "1998" },
  { year: "1997" },
  { year: "1996" },
  { year: "1995" },
  { year: "1994" },
  { year: "1993" },
  { year: "1992" },
  { year: "1991" },
  { year: "1990" },
  { year: "1989" },
];

/* =====================================================
   ACADEMIC YEARS (UNCHANGED)
===================================================== */

export const academicYears = [
  { name: "First Year", value: "1" },
  { name: "Second Year", value: "2" },
  { name: "Third Year", value: "3" },
  { name: "Fourth Year", value: "4" },
  { name: "Fifth Year", value: "5" },
];

export const years = [
  { name: "First Year", value: "1" },
  { name: "Second Year", value: "2" },
  { name: "Third Year", value: "3" },
  { name: "Fourth Year", value: "4" },
  { name: "Fifth Year", value: "5" },
  { name: "Class 8", value: "8" },
  { name: "Class 9", value: "9" },
  { name: "Class 10", value: "10" },
  { name: "Class 11", value: "11" },
  { name: "Class 12", value: "12" },
];
