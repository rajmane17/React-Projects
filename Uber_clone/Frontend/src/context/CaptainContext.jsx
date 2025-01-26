/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {useState} from 'react'
import { createContext, useContext } from 'react'

export const CaptainDataContext = createContext();

function CaptainContext({children}) {
    const [captainData, setCaptainData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const value = {
        captainData,
        setCaptainData,
        isLoading,
        setIsLoading,
        error,
        setError
    }
  return (
    <>
      <CaptainDataContext.Provider value={{captainData, setCaptainData}}>
        {children}
      </CaptainDataContext.Provider>
    </>
  )
}

export default CaptainContext
