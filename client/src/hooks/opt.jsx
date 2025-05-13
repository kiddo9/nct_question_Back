import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

const useOpt = () => {
  const [opt, setOpt] = useState([]);

  useEffect(() => {
    async function fetchOpt() {
      try {
        const fetchOpt = await Api.get("/opt");
        const response = fetchOpt.data;
        if (response.status !== true) {
          toast.error("unable to fetch request");
          return;
        }
        setOpt(response.opt);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOpt();
  }, []);

  return { opt };
};

export default useOpt;
