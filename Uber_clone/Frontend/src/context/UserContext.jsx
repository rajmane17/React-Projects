/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
    const [ user, setUser ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    return (
        <>
            <userDataContext.Provider value={user}>
                {children}
            </userDataContext.Provider>
        </>
    )
}

export default UserContext
