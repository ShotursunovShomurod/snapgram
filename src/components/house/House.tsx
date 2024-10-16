import profileimg from "../../images/profile.png";
const profileData = Array(9).fill(0);

const House = () => {
    return (
        <div className="pt-[60px] px-[54px] mr-[465px]">
            <div>
                <div className="flex items-center gap-x-[21px] overflow-x-scroll">
                    {profileData.map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-[72px] h-[72px] rounded-full">
                                <img
                                    className="rounded-full m-[3px] border-[3px] border-[#877EFF]"
                                    src={profileimg}
                                    alt="profile"
                                />
                            </div>
                            <p className="text-white text-xs font-semibold">
                                My Story
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default House;
