import React from 'react'
import { useSearchParams } from 'react-router-dom';


const QuestionPagination = ( { questions, sortedQuestions, currentPage, numberPerPage, setNumberPerPage }) => {
  const [_, setSearchParams] = useSearchParams();
  const changePage = (page) => {
    setSearchParams({ page });
  }
  return (
    <div className="flex gap-2 flex-wrap items-center justify-between">
          <div className="text-sm text-gray-700">
            <span className="font-medium">{questions.length}</span> results
          </div>
          <div className="flex space-x-2">
            <select className='bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md' value={numberPerPage} onChange={(e) => {
                setNumberPerPage(parseInt(e.target.value))
                changePage(1)
            }} name="numberPerPage" id="">
              <option value="6">6</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            {sortedQuestions.length > numberPerPage && (
            <>
              <button disabled={currentPage <= 1} onClick={() => changePage(currentPage - 1)} className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md">
                Previous
              </button>
              
              {Array.from({ length: Math.ceil(sortedQuestions.length / numberPerPage) }, (_, index) => (
                (index + 1 < currentPage + 3 && index + 1 > currentPage - 3 ) ?
                <button
                  key={index}
                  className={`px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md ${
                    currentPage === index + 1 ? "bg-[#6674BB] text-white" : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
                : (index + 1 == Math.ceil(sortedQuestions.length / numberPerPage) || index + 1 == 1) &&
                <>
                  {currentPage <= Math.ceil(sortedQuestions.length / numberPerPage) -4 && index + 1 == Math.ceil(sortedQuestions.length / numberPerPage) && (<span>...</span>)}
                  <button
                    key={index}
                    className={`px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md ${
                      currentPage === index + 1 ? "bg-[#6674BB] text-white" : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                  {currentPage > 4 && index + 1 == 1 &&  (<span>...</span>)}
                </>
              ))}
              
              <button disabled={currentPage >= Math.ceil(sortedQuestions.length / numberPerPage)} onClick={() => changePage(currentPage + 1)} className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium rounded-md">
                Next
              </button>
            </>
            )}
          </div>
        </div>
  )
}

export default QuestionPagination