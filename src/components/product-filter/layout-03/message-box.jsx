import { useState } from "react";
import { MdClose } from "react-icons/md";
import { TbBrandTelegram } from "react-icons/tb";

const MessageBox = ({ show, onClose }) => {
    return (
        <div className={`message-box-widget widget-shortby ${show ? 'fadeInUp' : 'fadeOutDown'}`}>
            <div className="inner">
                <div className='d-flex justify-content-between widget-title'>
                    <h5>Send Message</h5>
                    <div className='modal_close' onClick={onClose}>
                        <MdClose size={"25px"} />
                    </div>
                </div>
                <div className="content">
                    <div className="rnform-group">
                        <input type="text" placeholder="Address" />
                    </div>
                    <div className="rnform-group">
                        <textarea className='message-textarea' placeholder="Description" />
                    </div>
                    <div className="rnform-group">
                        <button className='rnform-submit'>Send <TbBrandTelegram /></button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MessageBox;
