import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";
import { useQuestionGroupHook } from "../hooks/questionGroupHook";
import useSectionHook from "../hooks/sectionHook";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";
import useQuestionHook from "../hooks/questionHook";

const Edit = ({ id }) => {
  const [group, setGroup] = useState("");
  const [quater, setQuater] = useState([]);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [mark, setMark] = useState("");
  const [GroupId, setGroupId] = useState("");
  const [QuaterId, setQuaterId] = useState("");
  const [numberOfOptions, setNumberOfOptions] = useState(); // number of options
  const navigate = useNavigate();
  // boolean for dropdown group

  const [dropGroup, setDropGroup] = useState(false);
  const [dropQuater, setDropQuater] = useState(false);

  const [searchGroup, setSearchGroup] = useState("");

  //set loader
  const [loader, setLoader] = useState(false);
  const { questionGroups } = useQuestionGroupHook();
  const { getEachQuestion } = useQuestionHook(id);
  const { section } = useSectionHook();

  const handleChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  useEffect(() => {
    if (numberOfOptions <= 0) {
      if (options.length > 0) setOptions([]);
      toast.error("Cannot enter number of options less than or equal to 0.");
      return;
    }

    if (isNaN(numberOfOptions)) {
      setOptions([]);
    }

    // Add empty strings until length matches numberOfOptions
    if (options.length < numberOfOptions) {
      setOptions((prev) => [
        ...prev,
        ...Array(numberOfOptions - prev.length).fill(""),
      ]);
    }

    // Remove excess options if numberOfOptions was reduced
    if (options.length > numberOfOptions) {
      setOptions((prev) => prev.slice(0, numberOfOptions));
    }
  }, [numberOfOptions, options.length]);

  const handleQuestionCreation = async () => {
    setLoader(true);

    if (!GroupId || !QuaterId || !question || !mark || !answer) {
      toast.error("fill all fields");
      setLoader(false);
      return;
    }
    try {
      const values = {
        GroupId,
        QuaterId,
        question,
        numberOfOptions,
        mark,
        options,
        answer,
        type,
      };

      const sendData = await Api.post("/cquestions", values);
      const response = sendData.data;

      if (response.status == true) {
        setLoader(false);
        toast.success(response.message);
        setTimeout(() => {
          navigate(`/admin/user/preview/${response.Id}`);
        }, 2000);
        return;
      }

      toast.error(response.message);
    } catch (error) {
      console.error(error);
      toast.error("internal error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className=" md:px-24">
      <ToastContainer />
      {loader && <Loader preload={true} />}
      <div className="mt-18 bg-white absolute left-10 px-5 md:px-10 right-10 rounded-xl  mx-auto overflow-y-scroll pb-6 h-[40rem] ">
        <header className="px-5 flex gap-6 flex-wrap items-center justify-between py-6">
          <h1 className="text-2xl font-medium">
            <i>Edit Question</i>
          </h1>
        </header>

        <div className="mx-3 flex flex-col md:gap-5">
          <div className="md:flex gap-10">
            <div className="md:w-full">
              <label htmlFor="group" className="text-lg font-medium">
                Group
              </label>
              <select
                name=""
                id=""
                className="border-[#6699ff] w-full border-2 cursor-pointer rounded-xl px-5 py-3 "
                value={getEachQuestion.q_group_id}
              >
                <input
                  type="text"
                  className="border-2 border-gray-300 w-[95%] mt-4 flex mx-auto py-2 px-4 rounded-xl"
                  onChange={(e) => {
                    setSearchGroup(e.target.value);
                  }}
                />

                {questionGroups
                  .filter((items) => {
                    return items.title.toLowerCase().includes(searchGroup);
                  })
                  .map((group) => (
                    <option
                      className={`${
                        GroupId == group.id
                          ? "bg-[#6699ff] shadow-2xl shadow-gray-500 text-white rounded-lg"
                          : ""
                      } cursor-pointer px-3 hover:bg-[#6699ff] hover:text-white duration-300 hover:shadow-2xl ease-in-out hover:rounded-lg py-2`}
                      onClick={() => {
                        setGroup(group.title);
                        setDropGroup(!dropGroup);
                        setGroupId(group.id);
                        setSearchGroup("");
                      }}
                      key={group.id}
                      value={group.id}
                    >
                      {group.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-5 md:mt-0 md:w-full flex flex-col">
              <label htmlFor="quater" className="text-lg font-medium">
                Quater
              </label>
              <select
                name=""
                id=""
                className="mt-2 border-[#6699ff] w-full border-2 cursor-pointer rounded-xl px-5 py-3 "
              >
                <input
                  type="text"
                  className="border-2 border-gray-300 w-[95%] mt-4 flex mx-auto py-2 px-4 rounded-xl"
                  onChange={(e) => {
                    setSearchGroup(e.target.value);
                  }}
                />

                {section
                  .filter((items) => {
                    return items.section_name
                      .toLowerCase()
                      .includes(searchGroup);
                  })
                  .map((group) => (
                    <option
                      className={`${
                        QuaterId == group.id ||
                        getEachQuestion.section_id == group.id
                          ? "bg-[#6699ff] shadow-2xl shadow-gray-500 text-white rounded-lg"
                          : ""
                      } cursor-pointer px-3 hover:bg-[#6699ff] hover:text-white duration-300 hover:shadow-2xl ease-in-out hover:rounded-lg py-2`}
                      onClick={() => {
                        setQuater(group.section_name);
                        setDropQuater(!dropQuater);
                        setSearchGroup("");
                        setQuaterId(group.id);
                      }}
                      key={group.id}
                    >
                      {group.section_name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mt-5 md:mt-0">
            <label htmlFor="question" className="text-lg font-medium">
              Question
            </label>
            <textarea
              name="question"
              id="question"
              type="text"
              className="border-2 border-[#6699ff] w-full mt-2 h-60 flex mx-auto py-2 px-4 rounded-xl"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              value={getEachQuestion.question}
            ></textarea>
          </div>

          <div className="md:flex gap-10">
            <div className="mt-5 md:mt-0 md:w-full">
              <label htmlFor="question" className="text-lg font-medium">
                Marks
              </label>
              <input
                name="question"
                id="question"
                value={getEachQuestion.marks}
                type="text"
                className="border-2 border-[#6699ff] w-full mt-2 flex mx-auto py-2 px-4 rounded-xl"
                onChange={(e) => {
                  setMark(e.target.value);
                }}
              />
            </div>

            <div className="md:w-full">
              <div className="mt-5 md:mt-0">
                <label htmlFor="quater" className="text-lg font-medium">
                  Type
                </label>
                <select
                  name=""
                  id=""
                  className="border-[#6699ff] border-2 cursor-pointer px-5 py-3 flex  w-full justify-between"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>select type</option>
                  <option value="M">Multi choice</option>
                  <option
                    value="T"
                    onClick={() => {
                      setOptions([]);
                      setNumberOfOptions("");
                      setAnswer("");
                    }}
                  >
                    True or False
                  </option>
                  <option value="F">Fill the blanks</option>
                </select>
              </div>

              <div className="md:w-full">
                {type == "M" ||
                  (type == "T" && (
                    <label htmlFor="option" className="text-lg font-medium">
                      <p className="mt-5">Options</p>
                    </label>
                  ))}
                {type == "M" && (
                  <div>
                    <div className="flex flex-col mt-3">
                      <label htmlFor="">Number of options</label>
                      <input
                        type="number"
                        onChange={(e) => {
                          setNumberOfOptions(parseInt(e.target.value));
                        }}
                        className="border-[#6699ff] border-2 cursor-pointer px-5 py-2 flex  w-full justify-between"
                      />
                    </div>
                    <div className="flex flex-col gap-2 shadow-2xl px-3 mt-5 pb-3">
                      {options.map((option, index) => (
                        <div key={index} className="mt-5 md:mt-0 flex flex-col">
                          <label
                            htmlFor={`option-${index}`}
                            className="text-lg font-medium"
                          >
                            Option {index + 1}
                          </label>

                          <div
                            key={index}
                            className="flex flex-row-reverse items-center gap-3"
                          >
                            <label
                              htmlFor={`option-${index}`}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="answer"
                                value={index}
                                checked={answer === option}
                                onChange={() => setAnswer(option)} // Sets the selected option
                                className="accent-[#6699ff] w-5 h-5"
                              />
                            </label>
                            <input
                              id={`option-${index}`}
                              type="text" // Display option only if selected
                              onChange={(e) =>
                                handleChange(index, e.target.value)
                              } // Update input value for selected option
                              className="border-2 border-[#6699ff] w-full mt-2 flex mx-auto py-2 px-4 rounded-xl"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {type == "T" && (
                  <div className="flex flex-col gap-2 shadow-2xl px-3 mt-5 pb-3 rounded-lg bg-white">
                    <label className="text-lg font-semibold mt-4">Answer</label>
                    <div className="mt-4 space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="trueFalseAnswer"
                          value="T"
                          checked={answer === "T"}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="accent-green-600 w-5 h-5"
                        />
                        <span className="text-gray-800">True</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="trueFalseAnswer"
                          value="F"
                          checked={answer === "F"}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="accent-red-600 w-5 h-5"
                        />
                        <span className="text-gray-800">False</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleQuestionCreation()}
            type="submit"
            className="bg-[#6699ff] py-2 text-center mt-10 flex justify-center items-center gap-4 text-white cursor-pointer"
          >
            Upload{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
