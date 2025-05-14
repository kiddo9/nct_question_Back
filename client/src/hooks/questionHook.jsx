import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import { toast } from "react-toastify";

const useQuestionHook = (id) => {
  const [question, setQuestions] = useState([]);
  const [getEachQuestion, setGetEachQuestion] = useState({});
  const [Loader, setLoader] = useState(false);

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
        setQuestions(response.questions);
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

  return { question, getEachQuestion, Loader };
};

export default useQuestionHook;
