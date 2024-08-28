import React from "react";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa";
import { TbReload } from "react-icons/tb";

function AllMailList({ data, loadMail }) {
  async function reloadHandler() {
    const token = localStorage.getItem("token");
    await axios.get("https://hiring.reachinbox.xyz/api/v1/onebox/reset", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("clicked");
  }

  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return null;
  }

  return (
    <div className="border-r-2 bg-[#FAFAFA] dark:bg-black dark:dark:border-[#33383F] border-[#E0E0E0] h-full">
      <div className="px-4 pt-4 mb-5 flex justify-between">
        <div className="px-4 ">
          <div className="text-2xl py-3 text-[#4285F4] font-semibold flex items-center">
            All Inbox(s){" "}
            <FaAngleDown className="ml-2 font-normal mt-1 cursor-pointer" />
          </div>
          <div className="dark:text-white text-black font-bold">
            {data.length}/25{" "}
            <span className="text-[#7F7F7F] font-normal">Inboxes selected</span>
          </div>
        </div>
        <div
          className="p-3 mt-3 dark:bg-[#25262B] bg-white border border-gray-200 dark:border-gray-800 mr-4 rounded-xl h-min cursor-pointer"
          onClick={reloadHandler}
        >
          <TbReload className="text-black dark:text-white" />
        </div>
      </div>

      <div>
        {data.map((email) => (
          <Mail
            key={email.id}
            fromEmail={email.fromEmail}
            subject={email.subject}
            threadId={email.threadId}
            loadMail={loadMail}
          />
        ))}
      </div>
    </div>
  );
}

function Mail({ toEmail, fromEmail, subject, body, threadId, loadMail }) {
  const trimSubject = (subject, wordCount) => {
    const words = subject.split(" ");
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(" ") + " ...";
    }
    return subject;
  };

  const handleMailClick = () => {
    loadMail(threadId);
  };

  return (
    <div
      className="border-2 mb-4 rounded-md pt-5 pl-5 dark:border-[#ffffff25] border-[#8b8b8b64] mx-8 py-4 cursor-pointer overflow-y-scroll no-scrollbar"
      onClick={handleMailClick}
    >
      <div>
        <div className="flex justify-between">
          <div className="dark:text-white text-black text-lg font-normal">
            {fromEmail}
          </div>
          <div className="dark:text-[#FCFCFC66] text-[#919EAB] font-thin pr-3">
            Mar 7
          </div>
        </div>
        <div className="py-2 dark:text-[#E1E0E0] text-gray-600 font-normal">
          {trimSubject(subject, 7)}
        </div>
      </div>
    </div>
  );
}

export default AllMailList;
