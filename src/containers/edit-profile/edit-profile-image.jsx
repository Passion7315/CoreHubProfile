/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { config } from "@utils/config";
import { useAuth } from "@context/authContext";

const EditProfileImage = ({ setImage }) => {
  const [selectedImage, setSelectedImage] = useState({
    photo: "",
    cover: "",
  });
  const { user } = useAuth();
  const API_URL = config.API_URL;

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
      try {
        const form = new FormData();
        form.append(e.target.name, e.target.files[0])
        const res = await axios.post(API_URL + "api/auth/" + e.target.name, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        setImage((prev) => ({
          ...prev,
          [e.target.name]: res.data
        }))
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="nuron-information">
      <div className="profile-change row g-5">
        <div className="profile-left col-lg-4">
          <div className="profile-image mb--30">
            <h6 className="title">Profile Picture</h6>
            <div className="img-wrap">
              {
                user?.photo ? (
                  <img
                    src={API_URL + "photo/" + user?.photo}
                    alt="Profile-NFT"
                    data-black-overlay="6"
                  />
                ) : selectedImage?.photo ? (
                  <img
                    src={URL.createObjectURL(
                      selectedImage.photo
                    )}
                    alt=""
                    data-black-overlay="6"
                  />
                ) : (
                  <Image
                    id="rbtinput1"
                    src="/images/profile/profile-01.png"
                    alt="Profile-NFT"
                    layout="fill"
                  />
                )
              }
            </div>
          </div>
          <div className="button-area">
            <div className="brows-file-wrapper">
              <input
                name="photo"
                id="fatima"
                type="file"
                onChange={imageChange}
              />
              <label htmlFor="fatima" title="No File Choosen">
                <span className="text-center color-white">
                  Upload Profile
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="profile-left right col-lg-8">
          <div className="profile-image mb--30">
            <h6 className="title">Cover Picture</h6>
            <div className="img-wrap">
              {
                user?.cover ? (
                  <img
                    src={API_URL + "photo/" + user?.cover}
                    alt="Profile-NFT"
                    data-black-overlay="6"
                  />
                ) : selectedImage?.cover ? (
                  <img
                    src={URL.createObjectURL(
                      selectedImage.cover
                    )}
                    alt=""
                    data-black-overlay="6"
                  />
                ) : (
                  <Image
                    id="rbtinput2"
                    src="/images/profile/cover-01.jpg"
                    alt="Profile-NFT"
                    layout="fill"
                  />
                )
              }
            </div>
          </div>
          <div className="button-area">
            <div className="brows-file-wrapper">
              <input
                name="cover"
                id="nipa"
                type="file"
                onChange={imageChange}
              />
              <label htmlFor="nipa" title="No File Choosen">
                <span className="text-center color-white">
                  Upload Cover
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileImage;
