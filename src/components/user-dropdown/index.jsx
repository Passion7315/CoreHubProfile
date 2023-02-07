import Image from "next/image";
import Anchor from "@ui/anchor";
import { useAuth } from "@context/authContext";
import { config } from "@utils/config";

const UserDropdown = () => {
  const { user } = useAuth();
  const API_URL = config.API_URL;
  return (
    <div className="icon-box">
      <Anchor path="/author">
        {
          user?.photo ? (
            <img
              src={API_URL + "photo/" + user?.photo}
              alt="Profile"
              data-black-overlay="6"
              width={38}
              height={38}
            />
          ) : (
            <Image
              src="/images/profile/profile-01.png"
              alt="Images"
              layout="fixed"
              width={38}
              height={38}
            />
          )
        }

      </Anchor>
      <div className="rn-dropdown">
        <div className="rn-inner-top">
          <h4 className="title">
            <Anchor path="/product">{user?.firstname} {user?.lastname}</Anchor>
          </h4>
        </div>
        <div className="rn-product-inner">
          <ul className="product-list mb--0">
            <li className="single-product-list">
              <div className="thumbnail">
                <Anchor path="/product">
                  <Image
                    src="/images/portfolio/portfolio-07.jpg"
                    alt="Nft Product Images"
                    layout="fixed"
                    width={50}
                    height={50}
                  />
                </Anchor>
              </div>
              <div className="content">
                <h6 className="title">
                  <Anchor path="/product">Balance</Anchor>
                </h6>
                <span className="price">25 CORE</span>
              </div>
              <div className="button" />
            </li>
          </ul>
        </div>
        <ul className="list-inner">
          <li>
            <Anchor path="/create">Create</Anchor>
          </li>
          <li>
            <Anchor path="/author">My Profile</Anchor>
          </li>
          <li>
            <Anchor path="/edit-profile">Edit Profile</Anchor>
          </li>
          {/* <li>
                <button type="button" onClick={logout}>
                    Sign Out
                </button>
            </li> */}
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
