import React from 'react'

const QuestionSelector = ({questions, activeNumber, setActiveNumber, save}) => {
  const handleNumberClick = async(num) => {
    await save('client')
    setActiveNumber(num)
    
  }
  return (
    <div className='rounded-xl flex flex-col items-center p-4 ml-4 h-fit bg-[#D7DDFF]/10 min-w-[320px] shadow-lg hover:shadow-xl transition-all border-2 border-black/30'>
        <p className='mb-2 font-semibold text-black self-start'>Questions</p>
        <div className='flex flex-wrap gap-2 md:grid g md:grid-cols-5 md:gap-4 overflow-y-scroll max-h-[calc(100vh-656px)] md:max-h-[calc(100vh-450px)] Scroll transition-all '>
            
            {questions.map((question) => (
            <button 
                id={question.number} 
                onClick={() => handleNumberClick(question.number)} 
                key={question.number} 
                className={`
                    ${activeNumber === question.number ? 
                    'bg-[#7291CA] text-white' : 
                    'bg-[#D7DDFF]/30 text-black'
                    }
                    ${question["active_status"] == 1 ? 'border-2 border-green-500' : ''}
                    ${question["active_status"] == 0 ? 'border-2 border-red-500' : ''}      
                    text-sm flex justify-center items-center w-[40px] h-[40px] rounded-full cursor-pointer hover:bg-[#D7DDFF] hover:text-white hover:scale-110 active:scale-100 transition-all`}>
                {question.number}
            </button>
            ))}

        </div>
    </div>
    
  )
}

export default QuestionSelector