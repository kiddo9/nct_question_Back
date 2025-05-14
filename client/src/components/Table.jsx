import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import useQuestionHook from "../hooks/questionHook";
import { useQuestionGroupHook } from "../hooks/questionGroupHook";
import useSectionHook from "../hooks/sectionHook";
import TLoader from "./Loader";

const Table = () => {
  const [Table, setTable] = useState([]);
  const { question, Loader } = useQuestionHook();
  const { questionGroups } = useQuestionGroupHook(null);
  const { section } = useSectionHook();
  const perPage = 10;

  useEffect(() => {
    if (question.length > 0) {
      setTable(question.slice(0, perPage));
    }
  }, [question, perPage]);
  return (
    <>
      {Loader && <TLoader />}

      <div className="md:px-4 overflow-x-scroll Scroll md:overflow-x-hidden">
        <table className="w-[200%] sm:w-full border border-[#6699ff] shadow-lg">
          <thead>
            <tr className="bg-[#6699ff] text-white">
              <th className="py-5">S/N</th>
              <th className="py-2">Group</th>
              <th className={``}>Quater</th>
              <th>Question</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border-0">
            {Table.map((data, index) => (
              <tr
                className="text-left border-b mx-3 mt-3 border-b-gray-300"
                key={data.id}
              >
                <td className="text-center w-20 text-md font-medium">
                  {index + 1}
                </td>
                <td className="px-2 py-10  text-center">
                  {questionGroups.map((groups) => {
                    if (data.q_group_id === groups.id) {
                      return <p key={groups.id}>{groups.title}</p>;
                    }
                  })}
                </td>
                <td className="text-center w-20 xl:w-44">
                  {section.map((sect) => {
                    if (data.section_id === sect.id) {
                      return <p key={sect.id}>{sect.section_name}</p>;
                    }
                  })}
                </td>
                <td className="w-96 lg:w-[70%] xl:w-[60%] px-10 text-left">
                  {data.question}
                </td>
                <td className="text-center">{data.type}</td>
                <td className="px-3">
                  <a href={`/admin/user/preview/${data.id}`}>
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
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        data={question}
        itemsPerPage={perPage}
        onPageChange={(pageData) => setTable(pageData)}
      />
    </>
  );
};

export default Table;
