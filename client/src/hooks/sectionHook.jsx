import { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

const useSectionHook = () => {
  const [section, setSection] = useState([]);
  useEffect(() => {
    async function getSections() {
      const resquest = await Api.get("/sections");
      const response = resquest.data;

      if (response.status == true) {
        setSection(response.sections);
        return;
      }

      toast.error("unable to fetch data");
    }

    getSections();
  });
  return { section };
};

export default useSectionHook;
