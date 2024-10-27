import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logo.svg";
import { RiHome3Line } from "react-icons/ri";
import { TbLibraryPhoto, TbLogout2 } from "react-icons/tb";
import { HiOutlineSaveAs } from "react-icons/hi";
import { TfiVideoClapper } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import {
    IoChatbubbleEllipsesOutline,
    IoSettingsOutline,
} from "react-icons/io5";
import { MdCreateNewFolder, MdOutlineClose } from "react-icons/md";
import { useProfileQuery } from "../../redux/api/user-api";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { logout } from "../../redux/slice/auth-slice";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Home = () => {
    const { data: prodata } = useProfileQuery({});
    const userState = useSelector((state: RootState) => state.auth.user);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout());
    };

    const [display, setDisplay] = useState(false);

    return (
        <div className="container mx-auto">
            <div className="w-[266px] z-10 lg:fixed left-0 bg-[#09090A] top-0 lg:min-h-screen pt-7 pb-8 px-6 border-r border-[#1F1F22]">
                <div className="flex items-center lg:flex-col lg:border-none z-30 justify-between fixed lg:static top-0 px-3 border-b border-b-[#1F1F22] left-0 w-full bg-[#09090A]">
                    <Link to={"/"}>
                        <img src={logo} alt="Logo" />
                    </Link>
                    <div className="flex items-center gap-x-2">
                        <div className="last__box">
                            <NavLink className="" to={"/profile"}>
                                <div className="flex items-center gap-x-[11px] py-3 lg:py-6">
                                    <img
                                        className="w-[30px] h-[30px] lg:w-[54px] lg:h-[54px] rounded-full"
                                        src={
                                            import.meta.env.VITE_APP_BASE_URL +
                                            userState?.photo
                                        }
                                        alt="User img"
                                    />
                                    <div>
                                        <h3 className="text-lg text-white font-bold hidden lg:block">
                                            {userState?.fullName}
                                        </h3>
                                        <p className="text-sm text-[#7878A3] hidden lg:block">
                                            @{prodata?.username}
                                        </p>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        {display === false ? (
                            <button
                                onClick={() => setDisplay(true)}
                                className="text-[#877EFF] text-xl lg:hidden">
                                <RxHamburgerMenu />
                            </button>
                        ) : (
                            <button
                                onClick={() => setDisplay(false)}
                                className="text-[#877EFF] text-xl lg:hidden">
                                <MdOutlineClose />
                            </button>
                        )}
                    </div>
                </div>
                <ul className="flex lg:flex-col gap-y-3 lg:gap-y-2 justify-between py-3 z-30 px-5 lg:px-0 bg-[#18141A] lg:bg-[#09090A] list_box lg:mb-10 lg:static fixed bottom-0 w-full left-0">
                    <li>
                        <NavLink
                            className="flex-col lg:flex-row px-2 lg:px-4 py-1 lg:py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/"}>
                            <RiHome3Line className="text-lg min-[800px]:text-xl lg:text-2xl text-[#877EFF] link__icon" />{" "}
                            <p className="text-[10px] lg:text-lg">Home</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex-col lg:flex-row px-2 lg:px-4 py-1 lg:py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/explore"}>
                            <TbLibraryPhoto className="text-lg min-[800px]:text-xl lg:text-2xl text-[#877EFF] link__icon" />{" "}
                            <p className="text-[10px] lg:text-lg"> Explore</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex-col lg:flex-row px-2 lg:px-4 py-1 lg:py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/people"}>
                            <BsPeople className="text-lg min-[800px]:text-xl lg:text-2xl text-[#877EFF] link__icon" />{" "}
                            <p className="text-[10px] lg:text-lg">People</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex-col lg:flex-row px-2 lg:px-4 py-1 lg:py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/saved"}>
                            <HiOutlineSaveAs className="min-[800px]:text-xl text-lg lg:text-2xl text-[#877EFF] link__icon" />{" "}
                            <p className="text-[10px] lg:text-lg"> Saved</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex-col lg:flex-row px-2 lg:px-4 py-1 lg:py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/reels"}>
                            <TfiVideoClapper className="min-[800px]:text-xl text-lg lg:text-2xl text-[#877EFF] link__icon" />{" "}
                            <p className="text-[10px] lg:text-lg">Reels</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex-col lg:flex-row px-2 lg:px-4 py-1 lg:py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/chats"}>
                            <IoChatbubbleEllipsesOutline className="text-lg min-[800px]:text-xl lg:text-2xl text-[#877EFF] link__icon" />{" "}
                            <p className="text-[10px] lg:text-lg"> Chats</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="flex-col lg:flex-row px-2 lg:px-4 py-1 lg:py-2 w-full rounded-lg hover:bg-[#877EFF] home_nav text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/create"}>
                            <MdCreateNewFolder className="text-lg min-[800px]:text-xl lg:text-2xl text-[#877EFF] link__icon" />{" "}
                            <p className="text-[10px] lg:text-lg">Create</p>
                        </NavLink>
                    </li>
                </ul>
                {display === true ? (
                    <div className="list_box z-30 fixed lg:static lg: p-4 right-0 top-[55px] bg-[#18141A] flex flex-col gap-y-2">
                        <button
                            onClick={() => handleLogOut()}
                            className="px-4 py-2 w-full rounded-lg text-lg hover:bg-neutral-300 hover:text-red-500 home_btn text-[#EFEFEF] font-medium flex items-center gap-x-4">
                            <TbLogout2 className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Logout
                        </button>
                        <NavLink
                            onClick={() => setDisplay(false)}
                            className="px-4 py-2 w-full home_nav hover:bg-[#877EFF] rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/settings"}>
                            <IoSettingsOutline className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Settings
                        </NavLink>
                    </div>
                ) : (
                    <div className="list_box hidden fixed lg:static p-4 right-0 top-[55px] lg:bg-[#09090A] bg-[#18141A] lg:flex flex-col gap-y-2">
                        <button
                            onClick={() => handleLogOut()}
                            className="px-4 py-2 w-full rounded-lg text-lg hover:bg-neutral-300 hover:text-red-500 home_btn text-[#EFEFEF] font-medium flex items-center gap-x-4">
                            <TbLogout2 className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Logout
                        </button>
                        <NavLink
                            onClick={() => setDisplay(false)}
                            className="px-4 py-2 w-full home_nav hover:bg-[#877EFF] rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/settings"}>
                            <IoSettingsOutline className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Settings
                        </NavLink>
                    </div>
                )}
            </div>
            <div className="lg:ml-[266px] mx-auto container w-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
