import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import { toast } from "react-toastify";
import { useState } from "react";

const useValidation = () => {
  const [load, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const token = query.get("vt");
  const nav = useNavigate();

  useEffect(() => {
    async function validate() {
      ``;
      setLoader(true);
      try {
        const requestTo = await Api.get(`/validate?vt=${token}`);
        const response = requestTo.data;

        if (response.status !== true) {
          nav("/auth/admin/login");
          return;
        }

        setEmail(response.cred.email);
        setId(response.cred.id);
        setType(response.cred.type);
        toast.success(response.message);
      } catch (error) {
        console.log(error);
        nav("/auth/admin/login");
      } finally {
        setLoader(false);
      }
    }

    validate();
  }, [token, nav]);
  return { load, email, id, type, token };
};

export default useValidation;
