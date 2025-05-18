import React from 'react'

const QuestionPagination = ( { questions, sortedQuestions, currentPage, setCurrentPage, numberPerPage, setNumberPerPage }) => {
  return (
    <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            <span className="font-medium">{questions.length}</span> results
          </div>
          <div className="flex space-x-2">
            <select className='bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md' value={numberPerPage} onChange={(e) => {
                setNumberPerPage(parseInt(e.target.value))
                setCurrentPage(1)
            }} name="numberPerPage" id="">
              <option value="6">6</option>
              <option value="10">10</option>
            </select>
            {sortedQuestions.length > numberPerPage && (
            <>
              <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)} className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md">
                Previous
              </button>
              {Array.from({ length: Math.ceil(questions.length / numberPerPage) }, (_, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md ${
                    currentPage === index + 1 ? "bg-[#6674BB] text-white" : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button disabled={currentPage >= Math.ceil(questions.length / numberPerPage)} onClick={() => setCurrentPage(currentPage + 1)} className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md">
                Next
              </button>
            </>
            )}
          </div>
        </div>
  )
}

export default QuestionPagination