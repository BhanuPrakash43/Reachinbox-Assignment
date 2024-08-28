import React, { useEffect, useState } from "react";
import axios from "axios";
import ReplyMail from "./ReplyMail";
import DeletePopup from "./DeletePopup";

const SelectedMail = ({ selectedThread }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedMail, setSelectedMail] = useState([]);
  const [replyData, setReplyData] = useState({
    to: "",
    from: "",
    subject: "",
    body: "",
  });

  const togglePopUp = () => {
    setShowPopup(!showPopup);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${selectedThread}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowDelete(false);
      setSelectedMail([]);
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  const onReply = (mail) => {
    setReplyData({
      to: mail.fromEmail,
      from: localStorage.getItem("userEmail"),
      subject: `Re: ${mail.subject}`,
      body: "",
    });
    setShowPopup(true);
  };

  const onDelete = () => {
    setShowDelete(true);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && (event.key === "d" || event.key === "D")) {
        setShowDelete(!showDelete);
      }

      if (event.ctrlKey && (event.key === "r" || event.key === "R")) {
        setShowPopup(!showPopup);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showDelete, showPopup]);

  useEffect(() => {
    const fetchMail = async () => {
      if (selectedThread) {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${selectedThread}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Fetched Mail Data:", res.data.data);
          setSelectedMail(res.data.data || []);
        } catch (error) {
          console.error("Error fetching mail:", error);
        }
      }
    };
    fetchMail();
  }, [selectedThread]);

  return (
    <div className="h-full overflow-y-scroll no-scrollbar">
      <div>
        {selectedMail && selectedMail.length > 0 ? (
          selectedMail.map((mail) => (
            <Mail
              key={mail.id}
              {...mail}
              onReply={() => onReply(mail)}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>

      <div className="mx-8">
        {showPopup && (
          <ReplyMail
            threadId={selectedThread}
            onClose={() => setShowPopup(false)}
            replyData={replyData}
            setReplyData={setReplyData}
          />
        )}
      </div>

      {showDelete && (
        <DeletePopup
          onCancel={() => setShowDelete(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

const Mail = ({ fromEmail, toEmail, subject, body, onReply, onDelete }) => {
  return (
    <div className="dark:bg-[#141517] bg-white border dark:border-[#343A40] mx-8 rounded-md my-10">
      <div className="p-4">
        <div className="flex justify-between py-4">
          <div className="space-y-2">
            <div className="font-bold dark:text-white text-black">
              {subject}
            </div>
            <div className="dark:text-[#AEAEAE] text-black font-medium">
              From: {fromEmail}
            </div>
            <div className="dark:text-[#AEAEAE] text-black font-medium">
              To: {toEmail}
            </div>
          </div>
          <div>
            <button
              className="border-2 border-[#d6cfcf6e] dark:border-[#ffffff6a] rounded-md px-5 py-2 mx-1 text-[#545254f7] dark:text-[#ffffffb3]"
              onClick={onReply}
            >
              Reply
            </button>
            <button
              className="border-2 border-[#d6cfcf6e] dark:border-[#ffffff6a] rounded-md px-5 py-2 mx-1 text-[#545254f7] dark:text-[#ffffffb3]"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <div
          className="dark:text-white text-black border-2 dark:border-[#383838b5] border-[#0000001c] rounded-md py-4 px-4"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};

export default SelectedMail;
