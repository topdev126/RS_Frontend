import React, { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons"; // Message icon
import { toast } from "react-toastify";

const ContactForm = ({ type, person, permission }) => {
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const { currentUser } = useSelector((state) => state.user);
  const [sending, setSending] = useState(false);
  const [messageSendSuccess, setMessageSendSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMsg = async (e) => {
    e.preventDefault();

    if (!message) {
      toast.warning("Please write a message before sending.");
      return;
    }
    const conversationApiData = {
      creatorId: currentUser._id,
      participantId: person.id,
    };

    try {
      setSending(true);
      // Create conversation
      const res = await fetch(`${apiUrl}/api/conversation/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(conversationApiData),
      });
      // const json = await res.json();

      // if (!res.ok) {
      //   throw new Error("Failed to create conversation. Try again.");
      // }

      // Send message
      const resMsg = await fetch(`${apiUrl}/api/message/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: currentUser._id,
          receiver: person.id,
          message,
        }),
      });
      const msgJson = await resMsg.json();

      if (!resMsg.ok) {
        throw new Error("Failed to send message. Try again.");
      }
      toast.success("Message sent successfully!");
      setMessageSendSuccess(true);
      setMessage("");
    } catch (error) {
      toast.error(error.message || "An error occurred. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-4 rounded-3 shadow mb-4">
      <h5 className="text-center mb-3">{type} Information</h5>
      <form onSubmit={handleSendMsg}>
        <div className="row align-items-center">
          <div className="col-md-4 text-center">
            {type !== "Agent" && (
              <img
                src={`data:${person.contentType};base64,${btoa(
                  new Uint8Array(person.photo).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt={`${type} Photo`}
                className="img-fluid rounded-circle mb-3"
                style={{ width: "70px", height: "70px" }}
              />
            )}
            {type === "Agent" && (
              <img
                src={person.photo}
                alt={`${type} Photo`}
                className="img-fluid rounded-circle mb-3"
                style={{ width: "70px", height: "70px" }}
              />
            )}
          </div>
          <div className="col-md-8">
            <h5 className="mb-1">{person.username}</h5>
            <strong>Phone:</strong> {person.phone}
          </div>
        </div>
        {type !== "Agent" && (
          <textarea
            id="message"
            placeholder="Write your message..."
            name="message"
            className="form-control rounded-3 border border-primary shadow-sm p-3 mt-3"
            rows="4"
            style={{
              resize: "none",
              backgroundColor: "#f8f9fa",
              fontSize: "1rem",
              color: "#495057",
              height: "5rem",
            }}
            value={message}
            onChange={handleChange}
          />
        )}
        <div className="d-flex mt-3">
          {type !== "Agent" && (
            <button
              type="submit"
              className="btn btn-primary w-100 me-2 d-flex align-items-center justify-content-center fs-6"
              disabled={sending || !message}
            >
              <FontAwesomeIcon icon={faComment} className="me-2" />
              {sending ? "Sending..." : "Send"}
            </button>
          )}
          <Link
            to={`https://api.whatsapp.com/send?phone=${person.phone}&text=Hello`}
            className="btn btn-success w-100 d-flex align-items-center justify-content-center fs-6"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
            Call
          </Link>
        </div>
      </form>
    </div>
  );
};
const ContactDetail = ({ permission, currentItem, contactPerson }) => {
  const ContactPerson = contactPerson
    ? {
        id: contactPerson._id,
        username: contactPerson.username,
        email: contactPerson.email,
        phone: contactPerson.phone || "+65 xxxxxxx",
        photo: contactPerson.avatar.data || "",
        contentType: contactPerson.contentType || "",
        avatar: contactPerson.avatar || "",
      }
    : {
        id: "#",
        username: "No ContactPerson Available",
        email: "",
        phone: "",
        photo: "",
        contentType: "",
        avatar: "",
      };
  const agent = {
    username: currentItem.agent_name,
    phone: currentItem.agent_phone,
    photo: currentItem.agent_photo,
    contentType: "",
  };

  return (
    <>
      {permission === 2 && (
        <>
          <ContactForm type="Agent" person={agent} permission={permission} />
          <ContactForm
            type="Sales Person"
            person={ContactPerson}
            permission={permission}
          />
        </>
      )}
      {permission === 1 && (
        <>
          <ContactForm type="Agent" person={agent} permission={permission} />
          <ContactForm
            type="Admin Person"
            person={ContactPerson}
            permission={permission}
          />
        </>
      )}
      {permission === 0 && (
        <>
          <ContactForm
            type="Sales Person"
            person={ContactPerson}
            permission={permission}
          />
        </>
      )}
    </>
  );
};

export default ContactDetail;
