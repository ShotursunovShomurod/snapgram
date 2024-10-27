import { Suspense } from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#09090A] text-white">
            <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-4 h-4 bg-[#877EFF] rounded-full"></div>
                <div className="w-4 h-4 bg-[#877EFF] rounded-full"></div>
                <div className="w-4 h-4 bg-[#877EFF] rounded-full"></div>
            </div>
            <p className="ml-3 text-lg font-semibold">Loading...</p>
        </div>
    );
};

const SuspenseComponent = ({ children }: { children: JSX.Element }) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export { Loading, SuspenseComponent };
