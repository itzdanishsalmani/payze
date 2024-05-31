import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Root() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/signin");
    }, []);
    return (
        <div>
            
        </div>
    )
}