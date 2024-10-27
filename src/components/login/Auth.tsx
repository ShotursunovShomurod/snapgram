import { useState, useEffect } from "react";
import logbg from "../../images/logbg.png";
import logoimg from "../../images/logo.svg";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import {
    useRegisterUserMutation,
    useSignInMutation,
} from "../../redux/api/user-api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { setToken, setUser } from "../../redux/slice/auth-slice";
import { IoIosCloseCircle } from "react-icons/io";

const Auth = () => {
    const [action, setAction] = useState<string>("Log in");
    const [users, { isSuccess, error, isLoading }] = useRegisterUserMutation();
    const [
        user,
        {
            isSuccess: isUserSuccess,
            error: errorlogin,
            isLoading: isLogInLoading,
        },
    ] = useSignInMutation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());
        user(data)
            .unwrap()
            .then((res: { accessToken: string; user: any }) => {
                dispatch(setToken(res.accessToken));
                dispatch(setUser(res.user));
                navigate("/");
            });
    };

    const handleSendLog = (e: any) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());
        users(data)
            .unwrap()
            .then((res: { accessToken: string; user: any }) => {
                dispatch(setToken(res.accessToken));
                dispatch(setUser(res.user));
                navigate("/");
            });
    };

    useEffect(() => {
        if (isSuccess) {
            setAction("Log In");
        }
        if (isUserSuccess) {
            navigate("/");
        }
    }, [isSuccess, isUserSuccess, navigate]);

    return (
        <section className="bg-black relative py-5 lg:py-0">
            <div className="px-2 lg:px-0">
                {error && (
                    <div
                        className={`
                        py-2 px-2 z-10 rounded-lg absolute top-5 left-1/3 bg-white flex items-center gap-x-1 w-auto`}>
                        <IoIosCloseCircle className="text-red-500 text-xl" />
                        <p>Sorry, email or Username Error</p>
                    </div>
                )}
                {errorlogin && (
                    <div
                        className={`
                         py-2 px-2 z-10 rounded-lg absolute top-5 left-1/3 bg-white flex items-center gap-x-1 w-auto`}>
                        <IoIosCloseCircle className="text-red-500 text-xl" />
                        <p>Sorry, your password or username is incorrect</p>
                    </div>
                )}
                <div className="flex">
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <div className="flex py-[150px] flex-col items-center">
                            {action !== "Sign In" && (
                                <img
                                    className="block mx-auto mb-[68px]"
                                    src={logoimg}
                                    alt="logo"
                                />
                            )}
                            <h2 className="text-white text-2xl lg:text-3xl font-bold leading-10 mb-3 text-center">
                                {action === "Sign In"
                                    ? "Create a new account"
                                    : "Log in to your account"}
                            </h2>
                            <p className="text-[#7878A3] leading-5 mb-8 text-center">
                                {action === "Sign In"
                                    ? " To use snapgram, Please enter your details."
                                    : "Welcome back! Please enter your details."}
                            </p>
                            {action === "Sign In" ? (
                                <SignUp
                                    isLoading={isLoading}
                                    action={action}
                                    setAction={setAction}
                                    handleSendLog={handleSendLog}
                                />
                            ) : (
                                <LogIn
                                    isLoading={isLogInLoading}
                                    action={action}
                                    setAction={setAction}
                                    handleSendMessage={handleSendMessage}
                                />
                            )}
                        </div>
                    </div>
                    <div className="hidden lg:block w-1/2 lg:h-screen top-0 absolute right-0">
                        <img
                            className="object-cover w-full h-full"
                            src={logbg}
                            alt="Log bg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;
