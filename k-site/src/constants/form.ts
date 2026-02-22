export const dateMonths = [
  { number: 1, month: "January" },
  { number: 2, month: "February" },
  { number: 3, month: "March" },
  { number: 4, month: "April" },
  { number: 5, month: "May" },
  { number: 6, month: "June" },
  { number: 7, month: "July" },
  { number: 8, month: "August" },
  { number: 9, month: "September" },
  { number: 10, month: "October" },
  { number: 11, month: "November" },
  { number: 12, month: "December" },
];

const currentYear = new Date().getFullYear();
export const dateYears = Array.from({ length: 100 }, (_, i) => ({
  year: currentYear - i,
}));

export const cegYears = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year" },
];

export const years = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" }, 
  { value: "5", label: "5th Year" },
  { value: "diploma", label: "Diploma" },
  { value: "postgrad", label: "Postgraduate" },
];
