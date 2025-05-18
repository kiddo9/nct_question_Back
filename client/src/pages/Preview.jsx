import { useParams } from "react-router-dom";
import useOpt from "../hooks/opt";
import useQuestionHook from "../hooks/questionHook";
import BackButton from "../components/BackButton";
import Edit from "../components/Edit";
import React, { use, useEffect, useState } from "react";
import Warning from "../components/Warning";
import { useQuestionGroupHook } from "../hooks/questionGroupHook";
import useSectionHook from "../hooks/sectionHook";
import PLoader from "./../components/Loader";

const Preview = () => {
  const { id } = useParams();
  console.log(id);
  const { opt } = useOpt();
  const { getEachQuestion, loader } = useQuestionHook(id);
  const { questionGroups } = useQuestionGroupHook();
  const { sections } = useSectionHook();
  const [open, setOpen] = React.useState(false);
  const [Delete, setDelete] = useState(false);



  return (
    <div className=" fixed z-50 bg-white inset-0 overflow-y-auto">
      {loader && <PLoader />}
      <div
        className={`fixed ${
          Delete == true ? "translate-y-0" : "-translate-y-[100%]"
        } inset-0 z-50 bg-[#000000a4] transition-all duration-[0.5s] ease-in-out`}
      >
        <Warning
          Decline={() => {
            setDelete(false);
          }}
        />
      </div>
      <header className="px-5 flex gap-6 flex-wrap items-center justify-between py-6">
        <h1 className="text-2xl font-medium">
          <i>Question Preview</i>
        </h1>

        <BackButton path={"/admin/user/dash"} />
      </header>

      <div className="mt-5 px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex gap-2 text-2xl items-center">
            <label htmlFor="" className="text-xl">
              Group:
            </label>
            <p>
              {questionGroups.map((groups) => {
                if (getEachQuestion.q_group_id == groups.id) {
                  return <p>{groups.title}</p>;
                }
              })}
            </p>
          </div>
          <div className="flex gap-2 text-2xl items-center">
            <label htmlFor="" className="text-xl">
              section:
            </label>
            {sections.map((sec) => {
              if (getEachQuestion.section_id == sec.id) {
                return <p>{sec.section_name}</p>;
              }
            })}
          </div>
          <div className="flex gap-2 text-2xl items-center">
            <label htmlFor="" className="text-xl">
              Type:
            </label>
            <p>{getEachQuestion.type}</p>
          </div>

          <div className="flex gap-2 text-2xl items-center">
            <label htmlFor="" className="text-xl">
              mark:
            </label>
            <p>{getEachQuestion.marks}</p>
          </div>
        </div>
        <p className="mt-10">.Question {getEachQuestion.id}:</p>
        <p className="mt-3 border-2 py-6 px-3 rounded-xl border-[#6699ff]">
          {getEachQuestion.question}
        </p>
        <p className="mt-10 text-2xl">options</p>
        <div className="mt-7 flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {opt.map((option) => {
            if (getEachQuestion.id == option.question_bank_id) {
              return (
                <div className="flex gap-4 items-center">
                  <p
                    className={`${
                      option.status == 1 ? "bg-green-500 " : "bg-[#6699ff]"
                    } px-4 py-3 shadow-2xl shadow-gray-500 text-white rounded-lg w-full`}
                  >
                    {option.title}
                  </p>
                </div>
              );
            }
          })}

          {getEachQuestion.type == "T" && (
            <div className="grid gap-4 md:grid-cols-2">
              {getEachQuestion.trueFalse == "T" ? "" : ""}
              <p
                className={`${
                  getEachQuestion.trueFalse == "T"
                    ? "bg-green-500"
                    : "bg-[#6699ff]"
                }  px-4 py-3 shadow-2xl shadow-gray-500 text-white rounded-lg w-full`}
              >
                True
              </p>
              <p
                className={`${
                  getEachQuestion.trueFalse !== "T"
                    ? "bg-green-500"
                    : "bg-[#6699ff]"
                }  px-4 py-3 shadow-2xl shadow-gray-500 text-white rounded-lg w-full`}
              >
                False
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-5 left-0 right-0 mb-4 justify-between md:absolute bottom-5 px-5 mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 bg-green-500 text-white w-44 h-9 rounded-md py-1 px-1 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 bg-red-500 text-white w-44 h-9 rounded-md py-1 px-1 cursor-pointer"
          onClick={() => setDelete(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>

      <div
        className={`fixed ${
          open == true ? "translate-y-0" : "-translate-y-[100%]"
        } inset-0 z-50 bg-[#000000a4] transition-all duration-[0.5s] ease-in-out`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 float-end  mr-8 mt-3 items-center gap-2 hover:bg-red-600 transition duration-300 ease-in-out hover:drop-shadow-2xl  cursor-pointer bg-red-500 text-white w-8 px-1 py-1 h-8 rounded-lg"
          onClick={() => setOpen(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        {/* <Edit id={id} /> */}
      </div>
    </div>
  );
};

export default Preview;
