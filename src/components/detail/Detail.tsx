import { useParams } from "react-router-dom";
import { RootState } from "../../redux";
import {
    useFollowMutation,
    useUserProfileQuery,
} from "../../redux/api/user-api";
import { FiCamera } from "react-icons/fi";
import { HiOutlineTag } from "react-icons/hi";
import { BiSolidVideos } from "react-icons/bi";
import { TbPhoto } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import imggalochka from "../../images/galochka.svg";
import { useSelector } from "react-redux";
import Posts from "../posts/Posts";

type Follower = {
    _id: string;
};

const Detail = () => {
    const { username } = useParams<{ username: string }>();

    const { data, isLoading: isLoad } = useUserProfileQuery(username);

    const [followUser, { isLoading }] = useFollowMutation();
    const userState = useSelector((state: RootState) => state.auth.user);
    const handleFollow = (username: string) => followUser(username);

    return (
        <div className="pt-[50px] pb-[85px] px-4 lg:px-12">
            <div>
                <div>
                    {isLoad ? (
                        <div className="flex flex-col gap-y-3 mb-3 lg:flex-row items-start gap-x-8">
                            <div className="w-[50px] h-[50px] lg:w-[150px] lg:h-[150px] rounded-full border-2 border-[#1F1F22]"></div>
                            <div className="flex flex-col gap-y-3">
                                <div className="border-[#1F1F22] border-2 w-[200px] rounded-2xl h-[30px]"></div>
                                <div className="flex">
                                    <div className="border-[#1F1F22] border-2 w-[50px] rounded-lg h-[40px]"></div>
                                    <div className="border-[#1F1F22] border-2 w-[50px] rounded-lg h-[40px]"></div>
                                    <div className="border-[#1F1F22] border-2 w-[50px] rounded-lg h-[40px]"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row items-start gap-x-8">
                            <img
                                className="w-[50px] lg:w-[150px] lg:h-[150px] rounded-full"
                                src={data?.photo}
                                alt="img"
                            />
                            <div>
                                <div className="flex items-center gap-x-10 ">
                                    <div className="flex gap-x-[10px] items-center">
                                        <p className="text-xl lg:text-4xl font-semibold text-white mb-1">
                                            {data?.fullName}
                                        </p>
                                        <img src={imggalochka} alt="img" />
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        {data?.followers.some(
                                            (item: Follower) =>
                                                item._id === userState?._id
                                        ) ? (
                                            <button
                                                onClick={() =>
                                                    handleFollow(
                                                        "unfollow/" +
                                                            data?.username
                                                    )
                                                }
                                                className="hover:opacity-60 block text-sm text-neutral-700 font-semibold py-[10px] px-3 lg:px-5 rounded-lg bg-[#7ebeff]">
                                                {isLoading
                                                    ? "Loading..."
                                                    : " Unfollow"}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleFollow(
                                                        "follow/" +
                                                            data?.username
                                                    )
                                                }
                                                className="hover:opacity-60 block text-sm text-white font-semibold py-[10px] px-3 lg:px-5  rounded-lg bg-[#877EFF]">
                                                {isLoading
                                                    ? "Loading..."
                                                    : " Follow"}
                                            </button>
                                        )}
                                        <button className="flex items-center text-sm font-semibold text-black rounded-lg bg-[#EFEFEF] py-[10px] px-3 lg:px-5">
                                            Message
                                        </button>
                                    </div>
                                </div>
                                <p className="lg:text-lg text-[#7878A3] mb-5">
                                    @{data?.username}
                                </p>
                                <div className="flex items-center gap-x-5 lg:gap-x-10 mb-6">
                                    <div>
                                        <p className="text-[#877EFF] font-medium text-xl">
                                            {data?.posts?.length}
                                        </p>
                                        <p className="lg:text-lg text-white font-medium">
                                            Posts
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[#877EFF] font-medium text-xl">
                                            {data?.followers?.length}
                                        </p>
                                        <p className="lg:text-lg text-white font-medium">
                                            Followers
                                        </p>
                                    </div>{" "}
                                    <div>
                                        <p className="text-[#877EFF] font-medium text-xl">
                                            {data?.following?.length}
                                        </p>
                                        <p className="lg:text-lg text-white font-medium">
                                            Following
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[#EFEFEF] text-sm lg:text-base mb-10">
                                    For Developers, By Developers <br /> 💻 Web
                                    Development & Coding <br /> 🎥 YouTube -
                                    JavaScript Mastery <br /> ✉️ Business
                                    Inquiries - Email or DM
                                </p>
                                <div className="w-[60px] h-[60px] lg:w-[72px] lg:h-[72px] rounded-full mb-[69px] border-[3px] flex items-center justify-center border-[#7777A2]">
                                    <FaPlus className="text-white text-xl" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center mb-10">
                        <div className="flex items-center gap-x-[10px] py-3 px-4 lg:px-[50px] rounded-tl-lg rounded-bl-lg bg-[#101012]">
                            <TbPhoto className="text-[#877EFF]" />
                            <p className="text-[#EFEFEF]">Posts</p>
                        </div>
                        <div className="flex items-center gap-x-[10px] border-l py-3 px-4 lg:px-[50px] bg-[#101012]">
                            <BiSolidVideos className="text-[#877EFF]" />
                            <p className="text-[#EFEFEF]">Posts</p>
                        </div>
                        <div className="flex items-center gap-x-[10px] border-l py-3 px-4 lg:px-[50px] rounded-tr-lg rounded-br-lg bg-[#101012]">
                            <HiOutlineTag className="text-[#877EFF]" />
                            <p className="text-[#EFEFEF]">Posts</p>
                        </div>
                    </div>
                    <div>
                        {data?.posts?.length === 0 ? (
                            <div className="flex flex-col items-center">
                                <div className="border border-white rounded-full flex items-center justify-center p-3">
                                    <FiCamera className="text-white text-3xl" />
                                </div>
                                <p className="text-white mt-3 text-3xl">
                                    No posts yet
                                </p>
                            </div>
                        ) : (
                            <div className="">
                                <Posts data={data} userId={username} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
