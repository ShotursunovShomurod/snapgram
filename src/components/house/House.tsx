import { useSelector } from "react-redux";
import profileimg from "../../images/profile.png";
import { useFollowMutation, useGetUsersQuery } from "../../redux/api/user-api";
const profileData = Array(9).fill(0);
import { User } from "../../types";
import { RootState } from "../../redux";
import { FcLike } from "react-icons/fc";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { useGetPostsQuery } from "../../redux/api/file-api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import {
    useToggleLikeMutation,
    usePostCommentMutation,
} from "../../redux/api/likecommit-api";
import { GoHeart } from "react-icons/go";
import { TbSend } from "react-icons/tb";
import { useState } from "react";

interface PostType {
    _id: string;
    caption: string;
    content_alt: string;
    createdAt: string;
    content: [
        {
            url: string;
            type: "IMAGE" | "VIDEO";
        }
    ];
    likes_count: number;
    comments_count: number;
    shares_count: number;
    location: string;
    likes: string[];
    comments: string[];
    owner: {
        photo: string;
    };
}

interface CommentInputProps {
    id: string;
    refetch?: () => void;
}

const House: React.FC<CommentInputProps> = ({ id, refetch }) => {
    const { data: proData, isLoading: isProLoading } = useGetPostsQuery({});
    const [toggleLike] = useToggleLikeMutation({});
    const [postCommit, { isLoading: isCommLoading }] = usePostCommentMutation();
    const [message, setMessage] = useState<string>("");
    console.log(proData);

    const handleCommentChange = (value: string) => {
        setMessage(value);
    };

    const postComment = (e: any) => {
        e.preventDefault();
        postCommit({ id, body: { message } }).then(() => {
            if (typeof refetch === "function") {
                refetch();
            } else {
                console.error("refetch is not a function:", refetch);
            }
            setMessage("");
        });
    };

    const handleLike = (_id: string) => toggleLike(_id);

    const proPosts = proData?.posts?.map((e: PostType) => (
        <div key={e._id}>
            <div className="flex text-sm lg:text-base items-center gap-x-5 mt-5">
                <p>{e?.content_alt}</p>
                <p className="text-[#5C5C7B]">#{e?.location}</p>
            </div>
            <div className="flex flex-col  items-center">
                <div className="w-[280px] 2xl:w-[600px] min-[1280px]:w-[400px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] lg:w-[600px]">
                    <Swiper
                        pagination={{
                            type: "fraction",
                        }}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper w-[280px] 2xl:w-[600px] min-[1280px]:w-[400px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] lg:w-[600px]">
                        {e?.content?.map((i, inx) => (
                            <SwiperSlide
                                className="w-full lg:w-[600px]"
                                key={inx}>
                                <div>
                                    {i.type === "IMAGE" && (
                                        <img
                                            className="rounded-3xl 2xl:w-[600px] min-[1280px]:w-[400px] w-[280px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] h-[200px] lg:w-[600px] 2xl:h-[250px] lg:h-[400px] object-cover my-[30px]"
                                            src={i.url}
                                            alt=""
                                        />
                                    )}
                                    {i.type === "VIDEO" && (
                                        <video
                                            className="rounded-3xl 2xl:w-[600px] min-[1280px]:w-[400px] w-[280px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] h-[200px] lg:w-[600px] lg:h-[400px] 2xl:h-[250px] object-cover my-[30px]"
                                            src={i.url}
                                            controls></video>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex items-start w-full gap-x-[30px]">
                    <div className="flex items-center gap-x-2">
                        <button
                            onClick={() => handleLike(e?._id)}
                            className="flex active:scale-125 items-center gap-x-[6px]">
                            {e?.likes?.length >= 1 ? (
                                <FcLike className="text-xl " />
                            ) : (
                                <GoHeart className="text-xl " />
                            )}
                        </button>
                        <p>{e?.likes?.length}</p>
                    </div>
                    <p className="flex items-center gap-x-[6px]">
                        <IoChatbubbleEllipsesOutline className="text-xl text-[#877EFF]" />
                        {e?.comments?.length}
                    </p>
                    <p className="flex items-center gap-x-[6px]">
                        <RiShareForwardLine className="text-xl text-[#877EFF]" />
                        32.1 k
                    </p>
                </div>
                <div className="flex items-center mt-8 w-full">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={
                            e?.owner?.photo.length >= 40
                                ? e?.owner?.photo
                                : import.meta.env.VITE_APP_BASE_URL +
                                  e?.owner?.photo
                        }
                        alt=""
                    />
                    <form className="flex items-center w-full h-11 bg-[#101012] px-4 rounded-lg">
                        <input
                            value={message}
                            onChange={(e) =>
                                handleCommentChange(e.target.value)
                            }
                            required
                            className="w-full h-full bg-transparent"
                            type="text"
                            name="message"
                            id=""
                            placeholder="Write your comment..."
                        />
                        <button
                            className={`${
                                isCommLoading && "cursor-wait"
                            } cursor-pointer`}
                            disabled={!message}
                            onClick={postComment}>
                            <TbSend className="text-[#877EFFEF] " />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ));

    const { data, isLoading } = useGetUsersQuery({ limit: 8 });
    const [followUser] = useFollowMutation();
    const userState = useSelector((state: RootState) => state.auth.user);
    const handleFollow = (username: string) => followUser(username);
    const userList: JSX.Element[] = data?.map(
        (user: User): JSX.Element => (
            <div
                className="border border-[#1F1F22] rounded-[20px] py-6 px-[35px] flex flex-col items-center"
                key={user._id}>
                <div className="flex flex-col items-center">
                    <Link to={`/users/${user?.username}`}>
                        <img
                            className="w-[54px] h-[54px] rounded-full"
                            src={
                                user.photo.length >= 40
                                    ? user.photo
                                    : import.meta.env.VITE_APP_BASE_URL +
                                      user.photo
                            }
                            alt="User img"
                        />
                    </Link>
                    <Link
                        to={`/users/${user?.username}`}
                        className="text-sm font-semibold text-white mb-[2px] mt-[10px] text-center overflow-hidden whitespace-nowrap text-ellipsis">
                        {user.fullName}
                    </Link>
                    <p className="text-[10px] font-medium text-[#7878A3] text-center mb-3">
                        Followed by Doniyor
                    </p>
                    {user.followers.some(
                        (item) => item._id === userState?._id
                    ) ? (
                        <button
                            onClick={() =>
                                handleFollow("unfollow/" + user.username)
                            }
                            className="hover:opacity-60 block text-xs text-neutral-700 font-semibold py-[6px] px-[18px] rounded-lg bg-[#7ebeff]">
                            Unfollow
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                handleFollow("follow/" + user.username)
                            }
                            className="hover:opacity-60 block text-xs text-white font-semibold py-[6px] px-[18px] rounded-lg bg-[#877EFF]">
                            Follow
                        </button>
                    )}
                </div>
            </div>
        )
    );
    return (
        <div className="flex justify-between items-start">
            <div className="pt-5 px-3 lg:pt-[60px] w-full lg:w-[705px] 2xl:px-[54px]">
                <div className="">
                    <div className="flex items-center overflow-hidden gap-x-[21px]">
                        {profileData.map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center">
                                <div className="w-[50px] h-[50px] lg:w-[72px]  lg:h-[72px] rounded-full">
                                    <img
                                        className="rounded-full m-[3px] border-[3px] border-[#877EFF]"
                                        src={profileimg}
                                        alt="profile"
                                    />
                                </div>
                                <p className="text-white text-[9px] lg:text-xs font-semibold">
                                    My Story
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="">
                    <h2 className="text-lg lg:text-[30px] font-bold text-white py-10">
                        Home Feed
                    </h2>
                    <div className="text-white lg:px-7 2xl:py-8">
                        <div>
                            <div className="flex items-center gap-x-[10px]">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={
                                        import.meta.env.VITE_APP_BASE_URL +
                                        userState?.photo
                                    }
                                    alt="img"
                                />
                                <div>
                                    <p className="text-lg font-bold">
                                        {userState?.username}
                                    </p>
                                    <p className="text-sm text-[#7878A3]">
                                        {userState?.fullName}
                                    </p>
                                </div>
                            </div>
                            {isProLoading ? (
                                <div className="flex flex-col w-[420px] 2xl:w-auto items-center">
                                    <div>
                                        <div className="rounded-3xl 2xl:w-[600px] min-[1280px]:w-[400px] w-[280px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] h-[200px] lg:w-[600px] lg:h-[400px] 2xl:h-[250px] object-cover my-[30px] border-2 border-[#1F1F22]"></div>
                                        <div className="flex gap-x-4">
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="rounded-3xl 2xl:w-[600px] min-[1280px]:w-[400px] w-[280px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] h-[200px] lg:w-[600px] lg:h-[400px] 2xl:h-[250px] object-cover my-[30px] border-2 border-[#1F1F22]"></div>
                                        <div className="flex gap-x-4">
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="rounded-3xl 2xl:w-[600px] min-[1280px]:w-[400px] w-[280px] min-[420px]:w-[380px] min-[540px]:w-[450px] min-[620px]:w-[550px] min-[800px]:w-[600px] min-[540px]:h-[300px] h-[200px] lg:w-[600px] lg:h-[400px] 2xl:h-[250px] object-cover my-[30px] border-2 border-[#1F1F22]"></div>
                                        <div className="flex gap-x-4">
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                            <div className="w-16 h-7 rounded-lg border-2 border-[#1F1F22]"></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center min-[480px]:w-[420px] pb-20 2xl:w-auto items-center">
                                    {proPosts}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[465px] hidden min-[1280px]:block fixed top-0 right-0 z-10 min-h-screen bg-[#09090A] border-l border-[#1F1F22]">
                <div className="pt-12 pl-6 w-[465px] pr-[37px] pb-10">
                    <h2 className="text-white text-2xl font-bold mb-10">
                        Top Creators
                    </h2>
                    {isLoading ? (
                        <div className="grid grid-cols-2 gap-6">
                            {Array.from({ length: 8 }, (_, index) => (
                                <div
                                    key={index}
                                    className="border border-[#1F1F22] rounded-[20px] py-6 px-[35px] flex flex-col items-center">
                                    <div className="w-[54px] h-[54px] rounded-full border border-[#1F1F22]"></div>
                                    <div className="mb-[6px] mt-[10px] border border-[#1F1F22] w-[80px] h-5 rounded-2xl"></div>
                                    <div className="mb-[10px] border border-[#1F1F22] w-[100px] h-3 rounded-2xl"></div>
                                    <div className="mb-[2px] border border-[#1F1F22] w-[74px] h-7 rounded-2xl"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-6">{userList}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default House;
