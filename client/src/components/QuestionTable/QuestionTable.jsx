import React, { useEffect, useState } from "react";
import QuestionRow from "./QuestionRow";
import Loader from "../Loader";

const QuestionTable = ({
  sortedQuestions,
  selectedRows,
  toggleSelectRow,
  toggleSelectAll,
  requestSort,
  sortConfig,
  currentPage,
  numberPerPage,
  loader,
  groupLoader,
}) => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    const timeoutId = setTimeout(() => {
      console.log("Timeout executed");
      // Add any other logic you want to execute after the timeout here
      setLoad(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="p-4 w-8">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={
                selectedRows.length === sortedQuestions.length &&
                sortedQuestions.length > 0
              }
              onChange={toggleSelectAll}
            />
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("id")}
          >
            <div className="flex items-center space-x-1">
              <span>ID</span>
              {sortConfig.key === "id" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </div>
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("group")}
          >
            <div className="flex items-center space-x-1">
              <span>Group</span>
              {sortConfig.key === "group" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </div>
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("quarter")}
          >
            <div className="flex items-center space-x-1">
              <span>Quarter</span>
              {sortConfig.key === "quarter" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </div>
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("question")}
          >
            <div className="flex items-center space-x-1">
              <span>Question</span>
              {sortConfig.key === "question" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </div>
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("type")}
          >
            <div className="flex items-center space-x-1">
              <span>Type</span>
              {sortConfig.key === "type" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </div>
          </th>
          {/* <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("difficulty")}
          >
            <div className="flex items-center space-x-1">
              <span>Difficulty</span>
              {sortConfig.key === "difficulty" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </div>
          </th> */}
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("status")}
          >
            <div className="flex items-center space-x-1">
              <span>Status</span>
              {sortConfig.key === "status" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </div>
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort("lastUpdated")}
          >
            <div className="flex items-center space-x-1">
              <span>Last Updated</span>
              {sortConfig.key === "lastUpdated" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </div>
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 w-full">
        {loader || groupLoader || load ? (
          <Loader />
        ) : (
          sortedQuestions
            .slice(
              (currentPage - 1) * numberPerPage,
              currentPage * numberPerPage
            )
            .map((question, index) => (
              <QuestionRow
                key={question.id}
                question={question}
                index={index}
                selectedRows={selectedRows}
                toggleSelectRow={toggleSelectRow}
                currentPage={currentPage}
                numberPerPage={numberPerPage}
              />
            ))
        )}
        {!loader && !groupLoader && !load && sortedQuestions.length <= 0 && (
          <tr>
            <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
              No questions found. Try adjusting your search or filters.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default QuestionTable;
