import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AllMailList from "./AllMailList";
import SelectedMail from "./SelectedMail";

function Home() {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://hiring.reachinbox.xyz/api/v1/onebox/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadMail = useCallback((threadId) => {
    setSelectedThread(threadId);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#ECEFF3] dark:bg-black dark:text-white text-[#5B5F66] flex h-screen w-full justify-center items-center">
        Loading ...
      </div>
    );
  }

  return (
    <div className="bg-[#ECEFF3] dark:bg-black text-white pt-16 flex w-full h-screen">
      <div className="w-2/6 ml-6">
        <AllMailList data={datas} loadMail={loadMail} />
      </div>

      <div className="w-3/5">
        {selectedThread && <SelectedMail selectedThread={selectedThread} />}
      </div>
    </div>
  );
}

export default Home;
