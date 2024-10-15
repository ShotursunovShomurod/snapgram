import { Navigate, Outlet } from "react-router-dom";

const Auths = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default Auths;
