import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col px-4 lg:px-0 items-center justify-center min-h-screen">
            <div>
                <p className="text-orange-500 text-5xl lg:text-7xl font-extralight mb-8">
                    COMING SOON
                </p>
                <p className="text-white font-extralight mb-8">
                    This page is still under construction. <br />
                    Stay tuned for updates! <br />
                    If you have any questions, feel free to contact us.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="text-orange-500 py-2 px-3 rounded-full border border-orange-500">
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default ComingSoon;
