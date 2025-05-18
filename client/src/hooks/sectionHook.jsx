import { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

const useSectionHook = () => {
  const [sections, setSections] = useState([]);
  useEffect(() => {
    async function getSections() {
      const resquest = await Api.get("/sections");
      const response = resquest.data;

      if (response.status == true) {
        setSections(response.sections);
        return;
      }

      toast.error(response.message);
    }

    getSections();
  }, []);
  return { sections };
};

export default useSectionHook;
