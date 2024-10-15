import { lazy, LazyExoticComponent } from "react";
import { useRoutes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../utils";
import Auths from "../pages/Auths";

const About: LazyExoticComponent<any> = lazy(
    () => import("../pages/about/About")
);
const Company: LazyExoticComponent<any> = lazy(
    () => import("../pages/company/Company")
);
const Detail: LazyExoticComponent<any> = lazy(
    () => import("../pages/detail/Detail")
);
const Layout: LazyExoticComponent<any> = lazy(
    () => import("../pages/layout/Layout")
);
const Auth: LazyExoticComponent<any> = lazy(
    () => import("../components/login/Auth")
);

const Home: LazyExoticComponent<any> = lazy(() => import("../pages/home/Home"));

const Routers = () => {
    return useRoutes([
        {
            path: "/",
            element: (
                <Suspense>
                    <Layout />
                </Suspense>
            ),
            children: [
                {
                    path: "/login",
                    element: (
                        <Suspense>
                            <Auth />
                        </Suspense>
                    ),
                },
                {
                    path: "/",
                    element: (
                        <Suspense>
                            <Auths />
                        </Suspense>
                    ),
                },
                {
                    path: "/home",
                    element: (
                        <Suspense>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: "/about",
                    element: (
                        <Suspense>
                            <About />
                        </Suspense>
                    ),
                    children: [
                        {
                            path: "company",
                            element: (
                                <Suspense>
                                    <Company />
                                </Suspense>
                            ),
                        },
                    ],
                },
                {
                    path: "/product/:id",
                    element: (
                        <Suspense>
                            <Detail />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: (
                <Suspense>
                    <h2>404</h2>
                </Suspense>
            ),
        },
    ]);
};

export default Routers;
