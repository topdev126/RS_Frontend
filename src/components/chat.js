import React, { useEffect, useRef, useState } from "react";
import { BsFillSendFill, BsImage } from "react-icons/bs";
import { useSelector } from "react-redux";
import { socket } from "./socketConnection";
import { MdDelete } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chat = ({ conversationInfo }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [messageText, setMessageText] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");
  const [IsSendingError, setSendingError] = useState(false);
  const scrollRef = useRef();
  const [socketMessages, setSocketMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_SERVER_URL;

  const {
    trackConversation,
    setTrackConversation,
    conversations,
    setConversation,
  } = conversationInfo;
  const { chatCreator, chatPartner, _id } = trackConversation.conversation;

  //----- Load User Messages
  useEffect(() => {
    (async () => {
      try {
        setMessageLoading(true);
        const res = await fetch(
          `${apiUrl}/api/message?sender=${trackConversation.sender}&receiver=${trackConversation.receiver}`
        );
        const getMessages = await res.json();

        if (getMessages.success === false) {
          setMessageLoading(false);
          console.log(getMessages.message);
        } else {
          setMessageLoading(false);
          setSocketMessages([]);
          setMessageText(getMessages);
        }
      } catch (error) {
        setMessageLoading(false);
        console.log(error);
      }
    })();
  }, [trackConversation]);

  //====== Join Sockets Room Here =======//
  useEffect(() => {
    socket.emit("join_room", trackConversation.chatId);
  }, [trackConversation]);

  //----- Get Message from socket
  useEffect(() => {
    socket.on("receive_message", (socketMsg) => {
      setSocketMessages([
        ...socketMessages,
        {
          message: socketMsg.message,
          type: "received",
          chatId: socketMsg.chatId,
        },
      ]);
    });
  });

  //====== Send Message To Socket ========//
  const sendMessageTOSocket = () => {

    socket.emit("send_message", {
      chatId: trackConversation.chatId,
      message: typedMessage,
      from: currentUser._id,
      to: trackConversation.conversationActive,
    });

    setSocketMessages([
      ...socketMessages,
      {
        message: typedMessage,
        type: "send",
        chatId: trackConversation.chatId,
      },
    ]);

    setTypedMessage("");
  };

  // Handle Message Sending //
  const handleSendMsg = async (e) => {
    e.preventDefault();
    sendMessageTOSocket();
    try {
      const sendMsgToDB = await fetch(`${apiUrl}/api/message/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: currentUser._id,
          receiver: trackConversation.conversationActive,
          message: typedMessage,
        }),
      });
      const response = await sendMsgToDB.json();
      //===checking Message request success or not ===//
      if (response.success === false) {
        setSendingError(true);
      } else {
        setSendingError(false);
      }
    } catch (error) {
      setSendingError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socketMessages, messageText]);


  const handleConversationDelete = async () => {
    try {
      const deleteChat = await fetch(
        `${apiUrl}/api/conversation/delete/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteChat.ok) {
        const restConversation = conversations.filter(
          (conversation) => conversation._id !== _id
        );
        setConversation(restConversation);
        setTrackConversation({
          ...trackConversation,
          conversationActive: "",
        });
      } else {
        const errorRes = await deleteChat.json();
        toast.error(errorRes.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {messageLoading ? (
        <div className="w-100">
          <p className="text-center mt-5 fw-bold text-dark">
            Messages Loading...
          </p>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between bg-white shadow-sm align-items-center px-4 py-3 border-bottom">
            <div className="d-flex align-items-center">
              <img
                className="rounded-circle border border-primary"
                src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                alt="user image"
                style={{ height: "40px", width: "40px" }}
              />
              <p className="ms-2 text-dark fw-bold text-truncate">
                {chatPartner._id === currentUser._id
                  ? chatCreator.username
                  : chatPartner.username}
              </p>
            </div>

            <div>
              <button
                onClick={handleConversationDelete}
                className="btn btn-link text-danger"
              >
                <span className="d-flex align-items-center">
                  <MdDelete className="text-danger" />
                  Delete
                </span>
              </button>
            </div>
          </div>

          <div className="container">
            <div
              className="container overflow-auto px-4 py-0"
              style={{
                flexGrow: 1,
                height: "calc(96vh - 200px)",
                overflowY: "auto",
              }}
            >
              {messageText.map((msg, index) =>
                msg.sender === currentUser._id ? (
                  <div
                    key={index}
                    className="d-flex justify-content-end w-100 flex-column"
                  >
                    <div className="d-flex align-items-center gap-2 mt-2 justify-content-end">
                      <p
                        ref={scrollRef}
                        className="text-lg font-normal bg-primary text-white py-1 px-2 rounded"
                      >
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="d-flex justify-content-start w-100 flex-column"
                  >
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <img
                        className="rounded-circle"
                        src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                        // src={
                        //   chatPartner._id === currentUser._id
                        //     ? chatCreator.avatar
                        //     : chatPartner.avatar
                        // }
                        alt="chat partner image"
                        style={{ height: "30px", width: "30px" }}
                      />
                      <p
                        ref={scrollRef}
                        className="text-lg font-normal bg-info text-white py-1 px-2 rounded"
                      >
                        {msg.message}
                      </p>
                    </div>
                  </div>
                )
              )}

              {socketMessages.length !== 0 &&
                socketMessages.map(
                  (msg, index) =>
                    msg.chatId === trackConversation.chatId && (
                      <div key={index}>
                        {msg.type === "send" ? (
                          <div className="d-flex justify-content-end w-100 flex-column">
                            <div className="mt-2 d-flex align-items-center gap-2 mt-2 justify-content-end">
                              <p
                                ref={scrollRef}
                                className="text-lg font-normal bg-primary text-white py-1 px-2 rounded"
                              >
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-start w-100 flex-column">
                            <div className="d-flex align-items-center gap-2 mt-2">
                              <img
                                className="rounded-circle"
                                // src={
                                //   chatPartner._id === currentUser._id
                                //     ? chatCreator.avatar
                                //     : chatPartner.avatar
                                // }
                                alt="chat partner image"
                                src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                                style={{ height: "40px", width: "40px" }}                                
                              />
                              <p className="text-lg font-normal bg-info text-white py-1 px-2 rounded">
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                )}

              {IsSendingError && (
                <p className="text-danger fw-semibold">
                  Message sending failed!
                </p>
              )}
            </div>

            <form
              onSubmit={handleSendMsg}
              className="bg-secondary "
              // style={{width:"-webkit-fill-available"}}
            >
              <div className="d-flex align-items-center gap-2 px-4 py-3">
                <div className="textbar_container">
                  <BsImage />
                </div>
                <div className="input_container w-100">
                  <input
                    onChange={(e) => setTypedMessage(e.target.value)}
                    value={typedMessage}
                    type="text"
                    placeholder="Aa"
                    className="vw-50 px-4 py-2 rounded-3 border-0 placeholder-secondary bg-light w-100"
                  />
                </div>
                <div className="send_btn">
                  <button type="submit" className="btn btn-link p-2">
                    <BsFillSendFill className="text-primary" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Chat;
