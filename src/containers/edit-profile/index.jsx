import { useState, useEffect } from "react";
import Anchor from "@ui/anchor";
import Sticky from "@ui/sticky";
import axios from "axios";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import EditProfileImage from "./edit-profile-image";
import PersonalInformation from "./personal-information";
import ChangePassword from "./change-password";
import NotificationSetting from "./notification-setting";
import { config } from "@utils/config";
import { useSigningClient } from "@context/cosmwasm";
import { toast } from "react-toastify";
import { useAuth } from "@context/authContext";

const EditProfile = () => {
  const { walletAddress } = useSigningClient();
  const [image, setImage] = useState({
    photo: "",
    cover: "",
  });

  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    bio: ''
  })
  const { user, dispatch } = useAuth();

  useEffect(() => {
    if (user) {
      setProfile({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        bio: user.bio
      })
    }
  }, [user])

  const API_URL = config.API_URL;
  const handleSave = async () => {
    if (!walletAddress) {
      toast.warn("Please connect wallet");
      return;
    }
    const data = {
      firstname: profile.firstname,
      lastname: profile.lastname,
      username: profile.username,
      email: profile.email,
      bio: profile.bio,
      wallet: walletAddress,
      photo: image.photo,
      cover: image.cover
    }
    if (!profile.firstname) {
      toast.warn("Please input your first name")
      return;
    }
    if (!profile.lastname) {
      toast.warn("Please input your last name")
      return;
    }
    if (!profile.username) {
      toast.warn("Please input your user name")
      return;
    }
    try {
      const resp = await axios.post(API_URL + "api/auth/signup", data);
      if (resp.data.code === "exist") {
        toast.warn(resp.data.res);
      } else {
        toast.success(resp.data.res);
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.get(API_URL + "api/users/" + walletAddress);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="edit-profile-area rn-section-gapTop">
      <div className="container">
        <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
          <div className="col-12 d-flex justify-content-between mb--30 align-items-center">
            <h4 className="title-left">Edit Your Profile</h4>
            <button className="btn btn-primary ml--10" onClick={handleSave}>
              <i className="feather-save mr--5" /> Save
            </button>
          </div>
        </div>
        <TabContainer defaultActiveKey="nav-home">
          <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Sticky>
                <nav className="left-nav rbt-sticky-top-adjust-five">
                  <Nav className="nav nav-tabs">
                    <Nav.Link eventKey="nav-home" as="button">
                      <i className="feather-edit" />
                      Edit Profile Image
                    </Nav.Link>
                    <Nav.Link eventKey="nav-homes" as="button">
                      <i className="feather-user" />
                      Personal Information
                    </Nav.Link>
                    {/* <Nav.Link
                        eventKey="nav-profile"
                        as="button"
                    >
                        <i className="feather-unlock" />
                        Change Password
                    </Nav.Link>
                    <Nav.Link
                        eventKey="nav-contact"
                        as="button"
                    >
                        <i className="feather-bell" />
                        Notification Setting
                    </Nav.Link> */}
                  </Nav>
                </nav>
              </Sticky>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 mt_sm--30">
              <TabContent className="tab-content-edit-wrapepr">
                <TabPane eventKey="nav-home">
                  <EditProfileImage setImage={setImage} />
                </TabPane>
                <TabPane eventKey="nav-homes">
                  <PersonalInformation profile={profile} setProfile={setProfile} />
                </TabPane>
                {/* <TabPane eventKey="nav-profile">
                        <ChangePassword />
                    </TabPane>
                    <TabPane eventKey="nav-contact">
                        <NotificationSetting />
                    </TabPane> */}
              </TabContent>
            </div>
          </div>
        </TabContainer>
      </div>
    </div>
  )
};

export default EditProfile;
