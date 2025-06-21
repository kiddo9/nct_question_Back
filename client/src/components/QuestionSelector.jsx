import React from 'react'

const QuestionSelector = ({questions, activeNumber, setActiveNumber}) => {
  return (
    <div className=' border-[#7291CA] grid grid-cols-5 gap-4  border-2 rounded-lg p-2 overflow-y-scroll max-h-[calc(100vh-270px)] Scroll transition-all'>

            {questions.slice(0,100).map((question) => (
            <button onClick={() => setActiveNumber(question.number)} key={question.number} className={`${activeNumber === question.number ? 'bg-[#7291CA] text-white' : 'bg-white text-[#7291CA]'} border-2 border-[#7291CA] text-sm flex justify-center items-center w-[32px] h-[32px] rounded-full cursor-pointer`}>
                {question.number}
            </button>
            ))}

    </div>
  )
}

export default QuestionSelector