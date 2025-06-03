import React, { useEffect, useState } from "react";
import CreateHeader from "../components/CreateHeader";
import CustomSelect from "../components/CustomSelect";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useQuestionGroupHook } from "../hooks/questionGroupHook";
import useSectionHook from "../hooks/sectionHook";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useClassHook from "../hooks/classHook";

const CreateQuestions = () => {
  const [group, setGroup] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [question, setQuestion] = useState("");
  const [mark, setMark] = useState("");
  const [type, setType] = useState("");
  const [typeOpen, setTypeOpen] = useState(false); //for the custom select component
  const [numberOfOptions, setNumberOfOptions] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);

  const { questionGroups } = useQuestionGroupHook();
  const { classes } = useClassHook()
  const { sections } = useSectionHook();
  const nav = useNavigate();

  const questionSchema = z.object({
    group: z.string().trim().min(1, { message: "Group is required" }),
    className: z.string().trim().min(1, { message: "Class is required" }),
    section: z.string().trim().min(1, { message: "Section is required" }),
    question: z.string().trim().min(1, { message: "Question is required" }),
    mark: z.string().trim().min(1, { message: "Mark is required" }),
    type: z.string().trim().min(1, { message: "Type is required" }),
    numberOfOptions: z.string().trim().min(1, {message: "Number of options is required"}),
    options: z.array(z.object({label: z.string(), value: z.string()})).min(2, {message: "At least two options are required"}),
    answer: z.string().trim().min(1, { message: "Answer is required" }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = questionSchema.safeParse({
      group,
      className,
      section,
      question,
      mark,
      type,
      numberOfOptions,
      options,
      answer,
    });

    if (result.success) {
      setLoader(true);
      try {
        const requestTo = await Api.post("/create/questions", {
          type,
          question,
          mark,
          options: options.map((option) => option.value),
          numberOfOptions,
          QuaterId: sections?.find((sec) => sec?.section_name == section)?.id,
          answer,
          GroupId: questionGroups?.find((gr) => gr?.title == group)?.id,
          ClassId: classes?.find((cls) => cls?.class_name == className)?.id,
        });

        const response = requestTo.data;

        if (response.status == true) {
          toast.success(response.message);
          setTimeout(() => {
            nav(`/admin/user/questions/preview/${response.Id}`);
          }, 1000);
          return;
        }

        toast.error(response.message);
      } catch (error) {
        console.log(error);
        toast.error("An error occured will processing your request");
      } finally {
        setLoader(false);
        setGroup("");
        setClassName("");
        setSection("");
        setQuestion("");
        setMark("");
        setType("");
        setNumberOfOptions("");
        setOptions([]);
        setAnswer("");
      }
    } else {
      return result.error.issues.map((issue) => toast.error(issue.message));
    }
    if (options.length != Number(numberOfOptions)) {
      return toast.error(
        "Number of options provided does not match the number of options in the question"
      );
    }
  };

  const switchType = (q_type) => {
    switch (q_type) {
      case "M":
        return "Multiple Choice";
      case "T":
        return "True/False";
      default:
        return "";
    }
  };

  {
    /* Generate True Or False Options */
  }
  const generateTrueFalseOptions = () => {
    return [
      {
        label: "True",
        value: "T",
      },
      {
        label: "False",
        value: "F",
      },
    ];
  };

  {
    /* Generate Multiple Choice Options */
  }
  const generateMultipleChoiceOptions = (number) => {
    if (!number) return "";
    return Array.from({ length: Number(number) }, (_, index) => ({
      label: `Option ${index + 1}`,
      value: "",
    }));
  };

  {
    /* Update the Options when nubmer of options changes */
  }
  useEffect(() => {
    setAnswer("");
    if (type === "M") {
      setOptions(generateMultipleChoiceOptions(numberOfOptions));
    } else if (type === "T") {
      setOptions(generateTrueFalseOptions());
    }
  }, [type, numberOfOptions]);
  return (
    <div className="rounded-lg lg:px-2 py-8">
      {loader && <Loader />}
      <ToastContainer />
      <div className="flex flex-col space-y-4 bg-white rounded-2xl mx-auto shadow py-2 w-[100vw] lg:w-[calc(100vw-245px)]">
        <CreateHeader>Create New Question</CreateHeader>
        <div className="px-4 overflow-y-scroll max-h-[calc(100vh-232px)]">
          <h2>Fill in the fields below</h2>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-4 w-full flex flex-col justify-between pb-5 h-fit"
          >
            <div className="md:grid flex flex-col grid-cols-2 gap-10 ">
              <CustomSelect
                label="Group"
                options={questionGroups.map((group) => group.title)}
                placeholder="Select Group"
                value={group}
                setValue={setGroup}
              />
              <CustomSelect
                label="Section"
                options={sections.map((section) => section.section_name)}
                placeholder="Select Section"
                value={section}
                setValue={setSection}
              />
              <CustomSelect
                label="Class"
                options={classes.map((clas) => clas.class_name)}
                placeholder="Select Class"
                value={className}
                setValue={setClassName}
              />
              <fieldset className="flex flex-col gap-2 col-span-2">
                <label className="text-sm" htmlFor="question">
                  Question
                </label>
                <textarea
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  className="rounded-lg px-4 py-2 resize-none h-[20vh] outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                  id="question"
                  name="question"
                  placeholder="Enter Question"
                ></textarea>
              </fieldset>
              <fieldset className="mb-4 flex flex-col gap-2">
                <label className="text-sm" htmlFor="mark">
                  Mark
                </label>
                <input
                  onChange={(e) =>
                    setMark(e.target.value <= 0 ? 0 : e.target.value)
                  }
                  value={mark}
                  className="rounded-lg px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                  type="number"
                  id="mark"
                  name="mark"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="type">
                  Type
                </label>
                {/* Custom Select Component for Consistency */}
                <div
                  className="cursor-pointer relative rounded-lg px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                  name="role"
                  id="role"
                >
                  <p
                    type="button"
                    onClick={() => {
                      setTypeOpen(!typeOpen);
                    }}
                    className={`${
                      type ? "text-black" : "text-gray-500"
                    } w-full`}
                  >
                    {switchType(type) || "Select Question Type"}
                  </p>
                  {typeOpen && (
                    <ul className="absolute z-10 w-full left-0 max-h-[300px] overflow-y-scroll top-12 rounded-lg flex flex-col gap-2 bg-white border-2 border-gray-300 shadow-xl">
                      <li>
                        <p
                          onClick={() => {
                            setType("M");
                            setTypeOpen(false);
                            setNumberOfOptions("");
                          }}
                          className="hover:bg-[#D7DDFF] px-4 py-2 transition duration-200 ease-in"
                        >
                          Multiple Choice
                        </p>
                      </li>
                      <li>
                        <p
                          onClick={() => {
                            setType("T");
                            setNumberOfOptions("2");
                            setTypeOpen(false);
                          }}
                          className="hover:bg-[#D7DDFF] px-4 py-2 transition duration-200 ease-in"
                        >
                          True/False
                        </p>
                      </li>
                    </ul>
                  )}
                </div>
                {/* Multiple Choice Options */}
                {type === "M" && (
                  <>
                    <CustomSelect
                      label="Number of Options"
                      options={["2", "3", "4", "5", "6"]}
                      placeholder="Select Number of Options"
                      value={numberOfOptions}
                      setValue={setNumberOfOptions}
                    />
                    {options.length &&
                      options.length > 0 &&
                      options.map((option, index) => (
                        <fieldset className="mb-4 flex gap-2">
                          <input
                            checked={option.value === answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            type="radio"
                            id={option.label}
                            name="option"
                            key={index}
                            value={option.value}
                          />
                          <input
                            value={option.value}
                            onChange={(e) =>
                              setOptions(
                                options.map((option, i) =>
                                  i === index
                                    ? { ...option, value: e.target.value }
                                    : option
                                )
                              )
                            }
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            className="px-4 py-2 rounded-lg outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                          />
                        </fieldset>
                      ))}
                  </>
                )}
                {/* True/False Options */}
                {type === "T" && (
                  <div className="mb-4">
                    <p>Choose Correct Option</p>
                    {options.length &&
                      options.length > 0 &&
                      options.map((option, index) => (
                        <fieldset className="mb-4 flex gap-2">
                          <input
                            checked={option.value === answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            type="radio"
                            id={option.label}
                            name="option"
                            key={index}
                            value={option.value}
                          />
                          <label htmlFor={option.label}>{option.label}</label>
                        </fieldset>
                      ))}
                  </div>
                )}
              </fieldset>
            </div>
            <button
              type="submit"
              className="border-2 border-[#6674BB] mt-5 mx-auto text-[#6674BB] hover:bg-[#6674BB] hover:text-white px-4 py-2 rounded-lg transition duration-300 ease-in cursor-pointer hover:shadow-2xl"
            >
              {loader ? "Uploading..." : "Upload Question"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestions;
