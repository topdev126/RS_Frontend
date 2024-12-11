import React, { useEffect, useState } from "react";
import Chat from "../components/chat";
import { useDispatch, useSelector } from "react-redux";
import Conversations, { activeChatId } from "../components/conversations";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import Navbar from "../components/navbar";

const Message = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [conversations, setConversation] = useState([]);
  const [conversationLoading, setConversationLoading] = useState(true);
  const [error, setError] = useState(false);
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const [trackConversation, setTrackConversation] = useState({
    sender: "",
    receiver: "",
    conversationActive: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //============ Making null active chat ID For notification ============//
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/message") {
      activeChatId.value.chatId = "";
    }
  }, []);
  console.log("=============0000", currentUser);

  // Load Current user Conversations
  useEffect(() => {
    (async () => {
      try {
        setConversationLoading(true);
        const res = await fetch(
          `${apiUrl}/api/conversation/${currentUser._id}`
        );
        const getConversations = await res.json();

        if (getConversations.success === false) {
          setConversationLoading(false);
          toast.error(getConversations.message, {
            autoClose: 5000,
          });
          setError(true);
          dispatch(signoutSuccess());
        } else {
          setConversationLoading(false);
          setConversation(getConversations);
        }
      } catch (error) {
        navigate("/login");
        setConversationLoading(false);
        toast.info("Please login ...", {
          autoClose: 5000,
        });
        setError(true);
        console.log(error);
      }
    })();
  }, []);

  console.log("sssssss", conversations);

  return (
    <>
      <Navbar
        navClass="defaultscroll sticky"
        logolight={true}
        menuClass="navigation-menu nav-left nav-light"
      />
      <ToastContainer />
      <section className="container-fluid" style={{ marginTop: "70px" }}>
        <div class="row justify-content-center">
          <div class="">
            <div id="errorMessage" className="text-center">
              {error ? (
                <div className="alert alert-danger p-4 rounded shadow-sm">
                  <p className="h5 mb-3">
                    Your session has expired. Please log in again to continue.
                  </p>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate("/login")}
                  >
                    <span className="me-2">Login</span>
                    <i className="bi bi-box-arrow-in-right"></i>
                  </button>
                </div>
              ) : (
                <div>
                  {conversations.length === 0 ? (
                    <div className="alert alert-light text-center p-5 rounded shadow-sm">
                      <h4 className="mb-3">Hey welcome! 😄</h4>
                      <p className="mb-0">
                        This is a blank canvas waiting for your first
                        conversation.
                      </p>
                    </div>
                  ) : (
                    <div
                      className="row g-4"
                      style={{ height: "95vh", overflow: "hidden" }}
                    >
                      <div
                        className="col-lg-3 col-md-6 d-flex flex-column"
                        style={{ height: "100%" }}
                      >
                        <div className="bg-light p-4 rounded shadow-sm h-100 overflow-auto">
                          {conversationLoading ? (
                            <div className="text-center">
                              <p className="fw-bold">Conversation Loading...</p>
                            </div>
                          ) : (
                            <>
                              {/* <h5 className="border-bottom pb-3 mb-4">
                                Chats...
                              </h5> */}
                              {conversations.map((conversation) => (
                                <Conversations
                                  conversationInfo={{
                                    conversation,
                                    trackConversation,
                                    setTrackConversation,
                                  }}
                                  key={conversation._id}
                                />
                              ))}
                            </>
                          )}
                        </div>
                      </div>

                      <div
                        className="col-lg-9 col-md-6 d-flex flex-column"
                        style={{ height: "100%" }}
                      >
                        <div className="bg-light p-4 rounded shadow-sm h-100">
                          {trackConversation.conversationActive ? (
                            <div className="overflow-hidden h-100 d-flex flex-column">
                              <Chat
                                conversationInfo={{
                                  trackConversation,
                                  setTrackConversation,
                                  conversations,
                                  setConversation,
                                }}
                              />
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="fs-4">
                                No Conversation is Selected 🤨
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Message;
