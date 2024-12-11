import { useDispatch, useSelector } from "react-redux";
import { signal } from "@preact/signals-react";
import { notifySignal } from "./socketConnection";
import { setNotification } from "../redux/notifications/notificationSlice";

export const activeChatId = signal({
  chatId: "",
});

const Conversations = ({ conversationInfo }) => {
  const { conversation, trackConversation, setTrackConversation } =
    conversationInfo;
  const dispatch = useDispatch();
  let notifications = notifySignal.value.notifications;

  const { currentUser } = useSelector((state) => state.user);
  const { notificationsDB } = useSelector((state) => state.notification);

  const isNotify = notificationsDB.some(
    (notify) => notify.chatId === conversation._id
  );
  const apiUrl = process.env.REACT_APP_SERVER_URL;

  const handleNotificationClick = (conversationId) => {
    const notificationIndex = notifications.some(
      (notify) => notify.chatId === conversationId
    );

    if (notificationIndex) {
      const restNotifications = notifications.filter(
        (notify) => notify.chatId !== conversationId
      );
      notifySignal.value.notifications = restNotifications;
      dispatch(setNotification(restNotifications));
    }
  };

  //===== Delete Notification From DB========//
  const notifyDeleteFromDB = async (notify_from) => {
    const isNotifyExistDB = notifications.some(
      (notify) => notify.from === notify_from
    );
    if (isNotifyExistDB) {
      try {
        const dltNotify = await fetch(
          `${apiUrl}/api/notification/delete/${notify_from}`,
          {
            method: "DELETE",
          }
        );
        const res = await dltNotify.json();
        if (res.success === false) {
          console.log(res.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div style={{ cursor: "pointer" }}>
      {conversation.participantId &&
      conversation.participantId === currentUser._id ? (
        // When current user is in participant role
        <>
          <div
            onClick={() => (
              setTrackConversation({
                ...trackConversation,
                conversationActive: conversation.chatCreator._id,
                sender: conversation.chatPartner._id,
                receiver: conversation.chatCreator._id,
                conversation,
                chatId: conversation._id,
              }),
              notifyDeleteFromDB(conversation.chatCreator._id),
              handleNotificationClick(conversation._id),
              (activeChatId.value.chatId = conversation._id)
            )}
            className={`d-flex align-items-center justify-content-center justify-content-sm-start gap-2 p-2 p-sm-3 cursor-pointer rounded transition-all ${
              trackConversation.conversationActive ===
              conversation.chatCreator._id
                ? "bg-primary text-white"
                : "bg-light text-primary"
            }`}
          >
            <div className="position-relative rounded-circle">
              <img
                className="rounded-circle border border-primary"
                style={{ height: "40px", width: "40px" }}
                // src={conversation.chatCreator.avatar}
                src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                alt="user image"
              />
              <div
                className="position-absolute bottom-0 end-0 rounded-circle bg-success border border-light"
                style={{ height: "10px", width: "10px" }}
              ></div>
            </div>
            <p className="d-none d-sm-block mb-0 fw-semibold text-truncate">
              {conversation.chatCreator.username}
            </p>
            {isNotify && (
              <p className="d-none d-md-block bg-danger px-1 rounded text-white text-uppercase text-xs small">
                New
              </p>
            )}
            {isNotify && <p className="text-danger d-md-none fw-bold">!</p>}
          </div>
        </>
      ) : (
        // When current user is in creator role
        <>
          <div
            onClick={() => (
              setTrackConversation({
                ...trackConversation,
                conversationActive: conversation.chatPartner._id,
                sender: conversation.chatCreator._id,
                receiver: conversation.chatPartner._id,
                conversation,
                chatId: conversation._id,
              }),
              notifyDeleteFromDB(conversation.chatPartner._id),
              handleNotificationClick(conversation._id),
              (activeChatId.value.chatId = conversation._id)
            )}
            className={`d-flex align-items-center justify-content-center justify-content-sm-start gap-2 p-2 p-sm-3 cursor-pointer rounded transition-all ${
              trackConversation.conversationActive ===
              conversation.chatPartner._id
                ? "bg-primary text-white"
                : "bg-light text-primary"
            }`}
          >
            <div className="position-relative rounded-circle">
              <img
                className="rounded-circle border border-primary"
                style={{ height: "40px", width: "40px" }}
                src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                alt="user image"
              />
              <div
                className="position-absolute bottom-0 end-0 rounded-circle bg-success border border-light"
                style={{ height: "10px", width: "10px" }}
              ></div>
            </div>
            <p className="d-none d-sm-block mb-0 fw-semibold text-truncate">
              {conversation.chatPartner.username}
            </p>
            {isNotify && (
              <p className="d-none d-md-block bg-danger px-1 rounded text-white text-uppercase text-xs small">
                New
              </p>
            )}
            {isNotify && <p className="text-danger d-md-none fw-bold">!</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Conversations;
