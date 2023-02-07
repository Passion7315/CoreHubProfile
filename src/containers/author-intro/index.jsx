import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import { ImageType } from "@utils/types";
import ShareDropdown from "@components/share-dropdown";
import ShareModal from "@components/modals/share-modal";
import { SlArrowUp, SlArrowDown } from 'react-icons/sl';
import Anchor from "@ui/anchor";
import { useAuth } from "@context/authContext";
import { config } from "@utils/config";

const AuthorIntroArea = ({ className, space, data }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isBanner, setIsBanner] = useState(true);
    const { user } = useAuth();
    const API_URL = config.API_URL;
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
    const handleBanner = (e) => {
        setIsBanner(false);
    }
    return (
        <>
            <ShareModal
                show={isShareModalOpen}
                handleModal={shareModalHandler}
            />
            <div
                className={clsx("rn-author-bg-area", isBanner ? "author-show-banner" : "author-hide-banner")}
                onMouseLeave={handleBanner}
            >
                {
                    isBanner ? (
                        <button className="btn-chevron author-bg-up animated rubberBand duration-2 infinite" onClick={() => setIsBanner(false)}>
                            <SlArrowUp size={22} />
                        </button>
                    ) : (
                        <button className="btn-chevron author-bg-down animated rubberBand duration-2 infinite" onClick={() => setIsBanner(true)}>
                            <SlArrowDown size={22} />
                        </button>
                    )
                }
                <div className={clsx("author-bg-area")}>
                    <Image
                        loader={() => user?.cover ? API_URL + "photo/" + user?.cover : "/images/profile/cover-01.jpg"}
                        src={user?.cover ? API_URL + "photo/" + user?.cover : "/images/profile/cover-01.jpg"}
                        alt="Slider BG"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        priority
                    />
                </div>
                <div className="container">
                    <div className={clsx("user-thumbnail", isBanner ? "thumbnail-show-banner" : "thumbnail-hide-banner")}>
                        <Image
                            loader={() => user?.photo ? API_URL + "photo/" + user?.photo : "/images/profile/profile-01.png"}
                            src={user?.photo ? API_URL + "photo/" + user?.photo : "/images/profile/profile-01.png"}
                            alt={data.image?.alt || data.name}
                            width="100%"
                            height="100%"
                            layout="fill"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

AuthorIntroArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        name: PropTypes.string,
        twitter: PropTypes.string,
        followers: PropTypes.string,
        following: PropTypes.string,
        image: ImageType,
    }),
};
AuthorIntroArea.defaultProps = {
    space: 1,
};

export default AuthorIntroArea;
