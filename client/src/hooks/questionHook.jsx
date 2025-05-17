import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

const useQuestionHook = (id) => {
  const [getQuestion, setGetQuestions] = useState([]);
  const [getEachQuestion, setGetEachQuestion] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    async function fetchQuestions() {
      try {
        const fetchQuestions = await Api.get("/questions/bank");
        const response = fetchQuestions.data;
        if (response.status !== true) {
          toast.error("unable to fetch request");
          return;
        }
        setGetQuestions(response.questions);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    setLoader(true);
    async function fetchEachQuestion() {
      if (!id) return;
      try {
        const fetchQuestions = await Api.get("/question/bank/" + id);
        const response = fetchQuestions.data;
        if (response.status !== true) {
          toast.error("unable to fetch request");
          return;
        }
        setGetEachQuestion(response.question);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }

    fetchEachQuestion();
  }, [id]);

  return { getQuestion, getEachQuestion, loader };
};

export default useQuestionHook;
