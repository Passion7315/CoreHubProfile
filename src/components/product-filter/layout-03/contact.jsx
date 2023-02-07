import { useState } from "react";
import clsx from "clsx";
import { RiContactsFill } from "react-icons/ri";
import MessageBox from "./message-box";

const ContactWidget = ({ show }) => {
    const [messageBox, setMessageBox] = useState(false);

    return (
        <div className="nuron-expo-filter-widget widget-shortby mb--30">
            <div className="inner">
                <h5 className="widget-title tooltip-ex">
                    <span>
                        <RiContactsFill />
                    </span>
                    <span className={clsx("ml--5", show ? "widget-show" : "widget-hide")}>Contact</span>
                    {!show && (
                        <span className="tooltiptext">Contact</span>
                    )}
                </h5>
                <div className="content contact-widget">
                    <div className="nuron-form-contact-widget tooltip-ex" onClick={() => setMessageBox(true)}>
                        <i className="feather-mail" />
                        <span className={clsx("contact_info", show ? "widget-show" : "widget-hide")}>
                            Send Message
                        </span>
                        {!show && (
                            <span className="tooltiptext">Send Message</span>
                        )}
                    </div>
                    <div className="nuron-form-contact-widget tooltip-ex">
                        <i className="feather-user-plus" />
                        <span className={clsx("contact_info", show ? "widget-show" : "widget-hide")}>
                            Add Friend
                        </span>
                        {!show && (
                            <span className="tooltiptext">Add Friend</span>
                        )}
                    </div>
                    <div className="nuron-form-contact-widget tooltip-ex">
                        <i className="feather-user-check" />
                        <span className={clsx("contact_info", show ? "widget-show" : "widget-hide")}>
                            Rank User
                        </span>
                        {!show && (
                            <span className="tooltiptext">Rank User</span>
                        )}
                    </div>
                </div>
            </div>
            {
                messageBox && (
                    <MessageBox show={messageBox} onClose={() => setMessageBox(false)} />
                )
            }
        </div>
    )
};

export default ContactWidget;
