import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '@context/authContext';
import { AiOutlineClose } from "react-icons/ai";
import { config } from '@utils/config'
import { toast } from 'react-toastify';
import { useAuth } from '@context/authContext';

function AddFriend({ handleRefresh, addchattoggler, addchattoggle }) {

    const [amigousername, setAmigoUsername] = useState()
    const { user } = useAuth();

    const API_URL = config.API_URL

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${API_URL}api/users/?username=${amigousername}`)
            setAmigoUsername("")
            if (!response.data) {
                toast.error("Not found the user")
                return;
            }
            const data = {
                senderId: user._id,
                receiverId: response.data._id
            }
            await axios.post(API_URL + 'api/chatrooms', data)
            handleRefresh();
        }
        catch (err) {
            console.log(err)
            toast.error("The user already exist")
        }
    }

    return (
        <div className='add-amigo-background'>
            <div className={addchattoggle ? "add-amigo-open" : "add-amigo-close"}>
                <div className="close-div" >
                    <span onClick={addchattoggler}>
                        <AiOutlineClose size={20} />
                    </span>
                </div>
                <form>
                    <img className='add-amigo-img' src='/images/profile/addfriend.png' alt=''></img>
                    <input type="text" placeholder="Enter Username of Amigo" value={amigousername} onChange={(e) => { setAmigoUsername(e.target.value) }} required />
                    <button onClick={handleSubmit}>ADD AMIGO</button>
                </form>
            </div>
        </div>
    )
}

export default AddFriend
