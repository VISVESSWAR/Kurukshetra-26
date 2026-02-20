import { createContext, useContext, useReducer, useState, type ReactNode } from "react";
import PropTypes from "prop-types";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface AppContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  captchaToken: string | null;
  refreshCaptcha: () => Promise<void>;
  toggleCaptchaBadge: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

AppProvider.propTypes = {
  children: PropTypes.element,
};


const initialState = {
  captchaToken: null,
};

function reducer(state: { captchaToken: string | null }, action: { type: string; payload?: string }): { captchaToken: string | null } {
  switch (action.type) {
    case "captcha/fetched":
      return { ...state, captchaToken: action.payload || null };
    default:
      console.log("Unknown action type provied");
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [{ captchaToken }, dispatch] = useReducer(reducer, initialState);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(true);

  async function refreshCaptcha() {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("homepage");
    dispatch({ type: "captcha/fetched", payload: token });
  }

  const toggleCaptchaBadge = (show: boolean) => {
    const badge = document.getElementsByClassName("grecaptcha-badge")[0] as HTMLElement;
    if (badge) {
      badge.style.visibility = show ? "visible" : "hidden";
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        captchaToken,
        refreshCaptcha,
        toggleCaptchaBadge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useAuth is used outside of AuthProvider");
  return context;
}
