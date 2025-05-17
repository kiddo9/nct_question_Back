import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

export const useQuestionGroupHook = (id) => {
  const [questionGroups, setQuestions] = useState([]);
  const [eachQuestionGroup, setEachQuestions] = useState({});
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    const fetchQuestionsGroup = async () => {
      try {
        const fetchQuestionsGroup = await Api.get("/questions/group");
        const response = fetchQuestionsGroup.data;
        if (response.status == true) {
          setQuestions(response.questionGroups);
          return;
        }
        toast.error(response.message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchQuestionsGroup();
  }, []);

  useEffect(() => {
    const fetchEachQuestionsGroup = async () => {
      if (!id) return;
      try {
        const fetchEachQuestionsGroup = await Api.get("/questions/group/" + id);
        const response = fetchEachQuestionsGroup.data;
        if (response.status !== true) {
          //toast.error(response.message);
          return;
        }
        setEachQuestions(response.questionGroups);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEachQuestionsGroup();
  }, [id]);
  return { questionGroups, eachQuestionGroup, loader };
};
