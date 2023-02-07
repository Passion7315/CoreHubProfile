import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";

const PersonalInformation = ({ profile, setProfile }) => {
  const inputChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <div className="nuron-information">
      <div className="profile-form-wrapper">
        <div className="input-two-wrapper mb--15">
          <div className="first-name half-wid">
            <label htmlFor="contact-name" className="form-label">
              First Name *
            </label>
            <input
              name="firstname"
              id="contact-name"
              type="text"
              placeholder="Input your first name"
              value={profile?.firstname}
              onChange={inputChange}
            />
          </div>
          <div className="last-name half-wid">
            <label htmlFor="contact-name-last" className="form-label">
              Last Name *
            </label>
            <input
              name="lastname"
              id="contact-name-last"
              type="text"
              placeholder="Input your last name"
              value={profile?.lastname}
              onChange={inputChange}
            />
          </div>
        </div>
        <div className="input-two-wrapper mb--15">
          <div className="user-name half-wid">
            <label htmlFor="contact-name-last" className="form-label">
              User Name *
            </label>
            <input
              name="username"
              id="contact-name-last"
              type="text"
              placeholder="Input your message name"
              value={profile?.username}
              onChange={inputChange}
            />
          </div>
          <div className="email-area half-wid">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              name="email"
              id="Email"
              type="email"
              placeholder="Input your email"
              value={profile?.email}
              onChange={inputChange}
            />
          </div>
        </div>
      </div>
      <div className="edit-bio-area">
        <label htmlFor="Discription" className="form-label">
          Description
        </label>
        <textarea
          id="Discription"
          name="bio"
          placeholder="Enter your bio"
          value={profile?.bio}
          onChange={inputChange}
        >
        </textarea>
      </div>
      {/* <div className="input-two-wrapper mt--15">
            <div className="half-wid role-area">
                <label htmlFor="Role" className="form-label mb--10">
                    Your Role
                </label>
                <input
                    name="Role"
                    id="Role"
                    type="text"
                    value="Front-end Developer"
                    onChange={(e) => e}
                />
            </div>
            <div className="half-wid gender">
                <NiceSelect
                    options={[
                        { value: "male", text: "male" },
                        { value: "female", text: "female" },
                    ]}
                    placeholder="Select Your Gender"
                    className="profile-edit-select"
                    onChange={(e) => e}
                />
            </div>
        </div>

        <div className="input-two-wrapper mt--15">
            <div className="half-wid currency">
                <NiceSelect
                    options={[
                        { value: "($)USD", text: "($)USD" },
                        { value: "wETH", text: "wETH" },
                        { value: "BIT Coin", text: "BIT Coin" },
                    ]}
                    placeholder="Currency"
                    className="profile-edit-select"
                    onChange={(e) => e}
                />
            </div>
            <div className="half-wid phone-number">
                <label htmlFor="PhoneNumber" className="form-label mb--10">
                    Phone Number
                </label>
                <input
                    name="contact-name"
                    id="PhoneNumber"
                    type="text"
                    value="+880100000000"
                    onChange={(e) => e}
                />
            </div>
        </div>
        <div className="input-two-wrapper mt--15">
            <div className="half-wid currency">
                <NiceSelect
                    options={[
                        { value: "United State", text: "United State" },
                        { value: "Katar", text: "Katar" },
                        { value: "Canada", text: "Canada" },
                    ]}
                    placeholder="Location"
                    className="profile-edit-select"
                    onChange={(e) => e}
                />
            </div>
            <div className="half-wid phone-number">
                <label htmlFor="PhoneNumber" className="form-label mb--10">
                    Address
                </label>
                <input
                    name="contact-name"
                    id="PhoneNumber"
                    type="text"
                    value="USA Cidni"
                    onChange={(e) => e}
                />
            </div>
        </div> 
        <div className="button-area save-btn-edit">
          <Button className="mr--15" color="primary-alta" size="medium">
            Cancel
          </Button>
          <Button size="medium">Save</Button>
        </div> */}
    </div>
  )
};

export default PersonalInformation;
