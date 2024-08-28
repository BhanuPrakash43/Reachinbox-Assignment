import axios from "axios";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function ReplyMail({ threadId, onClose, replyData, setReplyData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleSendReply = async () => {
    setIsLoading(true);
    setAlertInfo({ show: false, message: "", type: "" });

    const token = localStorage.getItem("token");
    if (!token) {
      setAlertInfo({
        show: true,
        message: "Authentication token not found. Please log in again.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`,
        {
          to: replyData.to,
          from: replyData.from,
          subject: replyData.subject,
          body: replyData.body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response);

      if (response.status === 200) {
        if (response.data && response.data.success) {
          setAlertInfo({
            show: true,
            message: "Reply sent successfully!",
            type: "success",
          });
          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          throw new Error(response.data?.message || "Failed to send reply");
        }
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      setAlertInfo({
        show: true,
        message:
          error.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-400/25 fixed top-0 left-0 flex justify-center items-center h-full w-full z-20">
      <div className="bg-[#141517] w-1/2 h-3/4 rounded-lg border border-[#41464B] relative">
        {alertInfo.show && (
          <div
            className={`absolute top-0 left-0 right-0 p-4 text-white ${
              alertInfo.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {alertInfo.message}
          </div>
        )}
        <div className="flex justify-between items-center px-4 bg-[#23272C] rounded-t-lg py-4 border-b border-[#41464B]">
          <div className="pl-4 text-xl">Reply</div>
          <div onClick={onClose}>
            <RxCross2 className="text-xl cursor-pointer" />
          </div>
        </div>

        <div className="flex text-md py-3.5 border-b border-[#41464B] pl-8">
          <label htmlFor="to" className="text-[#BAB9BD]">
            To:
          </label>
          <input
            className="bg-transparent ml-4 w-full focus:outline-none"
            placeholder="Recipient's Email"
            name="to"
            id="to"
            value={replyData.to}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex text-md py-3.5 border-b border-[#41464B] pl-8">
          <label htmlFor="from" className="text-[#BAB9BD]">
            From:
          </label>
          <input
            className="bg-transparent ml-4 w-full focus:outline-none"
            placeholder="Your Email"
            name="from"
            id="from"
            value={replyData.from}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex text-md py-3.5 border-b border-[#41464B] pl-8">
          <label htmlFor="subject" className="text-[#BAB9BD]">
            Subject:
          </label>
          <input
            className="bg-transparent ml-4 w-full focus:outline-none"
            placeholder="Subject"
            name="subject"
            id="subject"
            value={replyData.subject}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex text-md py-3.5 pl-8 h-2/5">
          <label htmlFor="body" className="text-[#BAB9BD]">
            Message:
          </label>
          <textarea
            className="bg-transparent ml-4 w-full h-full focus:outline-none"
            placeholder="Write your reply here..."
            name="body"
            id="body"
            value={replyData.body}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md m-4 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSendReply}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReplyMail;
