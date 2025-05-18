import { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

const useSectionHook = () => {
  const [sections, setSections] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function getSections() {
      setLoader(true);
      try {
        const resquest = await Api.get("/sections");
        const response = resquest.data;

        if (response.status == true) {
          setSections(response.sections);
          return;
        }

        toast.error(response.message);
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoader(false);
      }
      
    }

    getSections();
  }, []);
  return { sections, loader };
};

export default useSectionHook;
