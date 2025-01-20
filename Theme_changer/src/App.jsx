/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/Theme'
import Card from './components/Card';
import ThemeBtn from './components/ThemeBtn';

function App() {
  const [themeMode, setthemeMode] = useState("light");
  function lightTheme() {
    setthemeMode("light");
  }
  function darkTheme() {
    setthemeMode("dark");
  }

  // It does the actual work of changing themes
  useEffect(()=> {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode])

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>

  )
}

export default App
