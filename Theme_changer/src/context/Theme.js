import {createContext, useContext} from "react"

// We can give a initial state/value to our context
// In simple terms, hum humare global varible me pehle se hi koi value de sakte hai
// jaruri nhi ki vo value kahi aur se hi aae
export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {}
 });

export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext);
}