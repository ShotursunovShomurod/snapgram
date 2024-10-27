import { useSelector } from "react-redux";
import { useFollowMutation, useGetUsersQuery } from "../../redux/api/user-api";
import { User } from "../../types";
import { RootState } from "../../redux";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";

const People = () => {
    const { data, isLoading } = useGetUsersQuery({ limit: 100 });
    const [followUser] = useFollowMutation();
    const userState = useSelector((state: RootState) => state.auth.user);
    const handleFollow = (username: string) => followUser(username);
    const users = data?.map((e: User) => (
        <div
            className="flex flex-col items-center rounded-[30px] border-[3px] border-[#101012] py-3 lg:py-10"
            key={e._id}>
            <Link to={`/users/${e.username}`}>
                <img
                    className="w-[90px] h-[90px] rounded-full"
                    src={
                        e?.photo?.length > 32
                            ? e?.photo
                            : import.meta.env.VITE_APP_BASE_URL + e?.photo
                    }
                    alt="img"
                />
            </Link>
            <Link
                to={`/users/${e.username}`}
                className="text-white text-center text-base lg:text-2xl font-bold mt-6 mb-2">
                {e.fullName}
            </Link>
            <p className="text-xs lg:text-lg font-medium text-[#7878A3] pb-5">
                @{e.username}
            </p>
            {e.followers.some((item) => item._id === userState?._id) ? (
                <button
                    onClick={() => handleFollow("unfollow/" + e.username)}
                    className="hover:opacity-60 block text-sm text-neutral-700 font-semibold py-[10px] px-3 lg:px-[20px] rounded-lg bg-[#7ebeff]">
                    Unfollow
                </button>
            ) : (
                <button
                    onClick={() => handleFollow("follow/" + e.username)}
                    className="hover:opacity-60 block text-sm text-white font-semibold py-[10px] px-3 lg:px-[20px] rounded-lg bg-[#877EFF]">
                    Follow
                </button>
            )}
        </div>
    ));

    return (
        <div className="lg:pl-[50px] pb-[85px] lg:pb-0 px-4 lg:pr-[50px] pt-[30px]">
            <h2 className="text-xl lg:text-4xl text-white font-bold mb-[25px] flex items-center gap-x-[10px]">
                <BsPeople /> All Users
            </h2>
            {isLoading ? (
                <div className="grid grid-cols-2 min-[900px]:grid-cols-3 gap-3 lg:gap-10">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div
                            key={index}
                            className="flex gap-y-3 flex-col items-center rounded-[30px] border-2 border-[#1F1F22] py-3 lg:py-10">
                            <div className="w-[60px] h-[60px] xl:w-[90px] xl:h-[90px] rounded-full border-2 border-[#1F1F22]"></div>
                            <div className="w-[150px] xl:w-[200px] h-[40px] rounded-2xl border-2 border-[#1F1F22]"></div>
                            <div className="w-[100px] xl:w-[150px] h-[30px] rounded-2xl border-2 border-[#1F1F22]"></div>
                            <div className="w-[40px] xl:w-[80px] h-[50px] rounded-2xl border-2 border-[#1F1F22]"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 min-[900px]:grid-cols-3 gap-3 lg:gap-10">
                    {users}
                </div>
            )}
        </div>
    );
};

export default People;
