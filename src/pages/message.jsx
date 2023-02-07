import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Wrapper from "@layout/wrapper";
import SEO from "@components/seo";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import axios from "axios";
import Message from "@components/message/message";
import AddFriend from "@components/message/addFriend";
import ProfilePage from "@components/message/profile";
import SidebarChat from "@components/message/sidebarChat";
import EmptyChatRoom from "@components/message/emptyChatRoom";
import { useAuth } from "@context/authContext";

import { io } from "socket.io-client";
// import "emoji-mart/css/emoji-mart.css";
import Picker from "@emoji-mart/react";
import EmojiData from '@emoji-mart/data';
import { config } from "@utils/config";

import { IconButton } from "@material-ui/core";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { IoMdPersonAdd, IoMdAttach, IoMdSearch, IoMdSend } from "react-icons/io";
import { MdInsertEmoticon } from "react-icons/md";
import { toast } from "react-toastify";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

function MessageBox() {
  const [chatroomtiles, setChatroomtiles] = useState([]);
  const [currentchat, setCurrentchat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [amigo, setAmigo] = useState();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const scrollRef = useRef();
  const socket = useRef();
  const router = useRouter();

  const API_URL = config.API_URL

  /* Making Messages Realtime */

  useEffect(() => {
    socket.current = io(API_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [API_URL]);

  useEffect(() => {
    arrivalMessage &&
      currentchat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentchat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
  }, [user, chatroomtiles, currentchat, socket]);

  /* Fetching the Chat Tiles */
  const getChatroomtiles = async () => {
    try {
      const res = await axios.get(API_URL + "api/chatrooms/" + user?._id);
      setChatroomtiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getChatroomtiles();
  }, [user?._id, API_URL]);

  /* Fetching the Chat Tile user details */

  useEffect(() => {
    const amigoId = currentchat?.members.find((m) => m !== user?._id);
    const getAmigodetails = async () => {
      try {
        if (amigoId) {
          const response = await axios.get(API_URL + "api/users/id/" + amigoId);
          setAmigo(response.data);
        }
      } catch (err) { }
    };
    getAmigodetails();
  }, [user, currentchat, API_URL]);

  /* Fetching ChatRoom Messages */

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(API_URL + "api/messages/" + currentchat?._id);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentchat, API_URL]);

  /* Scroll to the recent message */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
  }, [messages]);

  /* Emoji Picker */

  const addEmoji = (e) => {
    let emoji = e.native;
    setNewMessage(newMessage + emoji);
  };
  const [pick, setPick] = useState(false);
  const openPicker = () => {
    setPick(!pick);
  };

  /* Posting a Message */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendingMessage = {
      chatroomId: currentchat._id,
      senderId: user._id,
      text: newMessage,
    };

    const receiverId = currentchat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await axios.post(API_URL + "api/messages/", sendingMessage);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
    setPick(false)
  };

  /* AddChat Toggle Setup */
  const [addtoggle, setAddtoggle] = useState(false);
  const addchatToggler = () => {
    if (!user) {
      toast.warn("You have to register the profile.", {
        onClose: () => router.push('/edit-profile')
      })
      return;
    }
    addtoggle === false ? setAddtoggle(true) : setAddtoggle(false);
  };

  const handleRefresh = () => {
    getChatroomtiles();
    setAddtoggle(false);
  }

  return (
    <Wrapper>
      <SEO pageTitle="Message" />
      <Header />
      <main id="main-content">
        <div className="home">
          {/* Chat Adding Card */}
          <AddFriend handleRefresh={handleRefresh} addchattoggler={() => { addchatToggler(); }} addchattoggle={addtoggle} />

          {/* Sidebar Open Menu */}
          {open
            ? ""
            : <div className="menu-open" onClick={() => { setOpen(true); }} >
              <IconButton>
                <AiOutlineMenu style={{ fontSize: 35, color: "#316af3" }} />
              </IconButton>
            </div>
          }
          {/* Add Chat Icon */}
          <div className="add-chatroom-icon" onClick={addchatToggler}>
            <IconButton>
              <IoMdPersonAdd size={30} />
            </IconButton>
          </div>

          {/* Sidebar, ChatRoom */}
          <div className="home-components">
            {/* Sidebar */}
            <div className={open ? "sidebar active" : "sidebar"}>
              <div className="sidebar-search">
                <div className="sidebar-search-container">
                  <IoMdSearch className="sidebar-searchicon" size={30} />
                  <input type="text" name="chat-search" placeholder="Search a Chat" />
                </div>
              </div>

              {/* Chatroom tiles */}

              <div className="sidebar-chatoptions">
                {chatroomtiles.map((chatroomtile) => (
                  <div
                    key={chatroomtile?._id}
                    onClick={() => { setCurrentchat(chatroomtile); setOpen(false) }} >
                    <SidebarChat chatroomtile={chatroomtile} currentUser={user} />
                  </div>
                ))}
              </div>
            </div>

            {/* Chatroom */}
            <div className="chatroom">
              {currentchat ? (
                <>
                  <div className="chatroom-header">
                    <div className="chatroom-chatinfo">
                      <img className='amigo-profilepic' src={amigo?.photo ? API_URL + "photo/" + amigo?.photo : "/images/profile/noavatar.jpg"} alt='' />

                      <div className="chatroom-chatinfo-right">
                        <div className="chatroom-chatinfo-name">
                          <p>{amigo?.firstname} {amigo?.lastname}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="chatroom-messages-container" onClick={() => { setPick(false) }}>
                    {messages.map((message) => (
                      <div key={message?._id} ref={scrollRef}>
                        <Message message={message} own={message?.senderId === user?._id} />
                      </div>
                    ))}
                  </div>
                  <div className={pick ? "emoji-picker-open" : "emoji-picker-close"} >
                    <Picker data={EmojiData} onEmojiSelect={addEmoji} emojiSize={25} />
                  </div>
                  <div className="chatroom-footer">
                    <div className="chatroom-footer-lefticons">
                      <IconButton onClick={openPicker}>
                        <MdInsertEmoticon size={25} />
                      </IconButton>
                      {/* <IconButton>
                        <IoMdAttach size={25} />
                      </IconButton> */}
                    </div>
                    <form>
                      <input className="message-input" type="text" name="message-input" placeholder="Type a message" onChange={(e) => { setNewMessage(e.target.value); }} value={newMessage} required />
                      <button className="input-button" onClick={newMessage ? handleSubmit : null} > Send a Message </button>
                    </form>
                    <div className="chatroom-footer-righticon" onClick={newMessage ? handleSubmit : null} >
                      <IconButton>
                        <IoMdSend className="send-icon" size={25} />
                      </IconButton>
                    </div>
                  </div>
                </>
              ) : (
                <EmptyChatRoom />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Wrapper>
  );
}

export default MessageBox;
