/* eslint-disable react/prop-types */

import { userDataContext } from "../context/UserContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const UserProtectedWrapper = ({ children }) => {

    const { user } = useContext(userDataContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
        }
    }, [token])

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper
