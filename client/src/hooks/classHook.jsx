import { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

const useClassHook = () => {
  const [classes, setClasses] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function getClasses() {
      setLoader(true);
      try {
        const resquest = await Api.get("/classes");
        const response = resquest.data;

        if (response.status == true) {
          setClasses(response.classes);
          return;
        }

        toast.error(response.message);
        return
      } catch (error) {
        toast.error("something went wrong");
        console.log(error);
      }
      finally {
        setLoader(false);
      }
      
    }

    getClasses();
  }, []);
  return { classes, loader };
};

export default useClassHook;
