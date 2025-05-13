import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

export const useQuestionGroupHook = () => {
  const [questionGroups, setQuestions] = useState([]);
  const [eachQuestionGroup, setEachQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestionsGroup = async () => {
      try {
        const fetchQuestionsGroup = await Api.get("/questions/group");
        const response = fetchQuestionsGroup.data;
        if (response.status !== true) {
          toast.error("unable to fetch request");
          return;
        }
        setQuestions(response.questionGroups);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestionsGroup();
  }, []);

  useEffect(() => {
    const fetchEachQuestionsGroup = async ({ id }) => {
      try {
        const fetchEachQuestionsGroup = await Api.get("/questions/group/" + id);
        const response = fetchEachQuestionsGroup.data;
        if (response.status !== true) {
          toast.error("unable to fetch request");
          return;
        }
        setEachQuestions(response.questionGroups);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEachQuestionsGroup();
  }, []);
  return { questionGroups, eachQuestionGroup };
};
