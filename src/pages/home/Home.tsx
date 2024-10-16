import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logo.svg";
import { RiHome3Line } from "react-icons/ri";
import { TbLibraryPhoto } from "react-icons/tb";
import { HiOutlineSaveAs } from "react-icons/hi";
import { TfiVideoClapper } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import {
    useFollowMutation,
    useGetUsersQuery,
    useProfileQuery,
} from "../../redux/api/user-api";
import { User } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const Home = () => {
    const { data } = useGetUsersQuery({ limit: 8 });
    const { data: prodata } = useProfileQuery({});
    const userState = useSelector((state: RootState) => state.auth.user);

    const [followUser] = useFollowMutation();

    const handleFollow = (username: string) => followUser(username);

    const userList: JSX.Element[] = data?.map(
        (user: User): JSX.Element => (
            <div
                className="border border-[#1F1F22] rounded-[20px] py-6 px-[35px] flex flex-col items-center"
                key={user._id}>
                <img
                    className="w-[54px] h-[54px] rounded-full"
                    src={import.meta.env.VITE_APP_BASE_URL + user.photo}
                    alt="User img"
                />
                <h3 className="text-sm font-semibold text-white mb-[2px] mt-[10px] text-center overflow-hidden whitespace-nowrap text-ellipsis">
                    {user.fullName}
                </h3>
                <p className="text-[10px] font-medium text-[#7878A3] text-center mb-3">
                    Followed by jsmastery
                </p>
                {user.followers.some((item) => item._id === userState?._id) ? (
                    <button
                        onClick={() =>
                            handleFollow("unfollow/" + user.username)
                        }
                        className="hover:opacity-60 block text-xs text-neutral-700 font-semibold py-[6px] px-[18px] rounded-lg bg-[#7ebeff]">
                        Unfollow
                    </button>
                ) : (
                    <button
                        onClick={() => handleFollow("follow/" + user.username)}
                        className="hover:opacity-60 block text-xs text-white font-semibold py-[6px] px-[18px] rounded-lg bg-[#877EFF]">
                        Follow
                    </button>
                )}
            </div>
        )
    );
    return (
        <div className="container mx-auto">
            <div className="w-[266px] fixed left-0 bg-[#09090A] top-0 min-h-screen pt-12 pb-8 px-6 border-r border-[#1F1F22]">
                <Link to={"/"}>
                    <img src={logo} alt="Logo" />
                </Link>
                <div>
                    <div className="flex items-center gap-x-[11px] py-11">
                        <img
                            className="w-[54px] h-[54px] rounded-full"
                            src={
                                import.meta.env.VITE_APP_BASE_URL +
                                userState?.photo
                            }
                            alt="User img"
                        />
                        <div>
                            <h3 className="text-lg text-white font-bold">
                                {userState?.fullName}
                            </h3>
                            <p className="text-sm text-[#7878A3]">
                                @{prodata?.username}
                            </p>
                        </div>
                    </div>
                </div>
                <ul className="flex flex-col gap-y-6 list_box">
                    <li>
                        <NavLink
                            className="p-4 w-full rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/"}>
                            <RiHome3Line className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="p-4 w-full rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/explore"}>
                            <TbLibraryPhoto className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Explore
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="p-4 w-full rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/people"}>
                            <BsPeople className="text-2xl text-[#877EFF] link__icon" />{" "}
                            People
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="p-4 w-full rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/saved"}>
                            <HiOutlineSaveAs className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Saved
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="p-4 w-full rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/reels"}>
                            <TfiVideoClapper className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Reels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="p-4 w-full rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/chats"}>
                            <IoChatbubbleEllipsesOutline className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Chats
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="p-4 w-full rounded-lg text-lg text-[#EFEFEF] font-medium flex items-center gap-x-4"
                            to={"/create"}>
                            <MdCreateNewFolder className="text-2xl text-[#877EFF] link__icon" />{" "}
                            Create Post
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="ml-[266px] mx-auto container w-auto">
                <Outlet />
            </div>
            <div className="w-[465px] fixed right-0 top-0 min-h-screen bg-[#09090A] border-l border-[#1F1F22]">
                <div className="pt-12 pl-6 pr-[37px]">
                    <h2 className="text-white text-2xl font-bold mb-10">
                        Top Creators
                    </h2>
                    <div className="grid grid-cols-2 gap-6">{userList}</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
