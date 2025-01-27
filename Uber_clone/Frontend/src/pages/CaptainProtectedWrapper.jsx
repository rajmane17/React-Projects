import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const CaptainProtectedWrapper = ({ children }) => {
    const { setCaptainData } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const captainToken = localStorage.getItem("captainToken");

        if (!captainToken) {
            navigate("/captain-login");
            return;
        }

        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captain/captain-profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${captainToken}`
                        }
                    }
                );

                if (response.status === 200) {
                    setCaptainData(response.data.captain);
                }
            } catch (err) {
                console.error('Profile fetch error:', err);
                localStorage.removeItem("captainToken");
                navigate("/captain-login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptainProfile();
    }, [navigate, setCaptainData]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    return children;
};

export default CaptainProtectedWrapper;