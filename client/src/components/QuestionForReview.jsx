import { BadgeCheck, Edit, Flag, Trash, Trash2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const QuestionForReview = ({question, setActiveNumber, questionUpdate, totalQuestions, save, finish}) => {
    

    const handleRadioChange = (e) => {
        questionUpdate(e.target.id, question?.number)
    }

    



  return (
    <div className='md:w-[calc(100vw-300px)] px-4 md:p-0 relative'>
        <div className='flex sm:flex-row flex-col justify-between gap-5'>
            <header className='flex gap-5'>
                <p className='font-semibold' >Q {question?.number}:</p>
                <div className=' h-fit'>
                    {question?.question}
                </div>
            </header>
            <Actions question={question} setActiveNumber={setActiveNumber} handleRadioChange={handleRadioChange} totalQuestions={totalQuestions} save={save}/>
        </div>

        <div>
            <p className='mt-10 mb-2 font-semibold'>Options: </p>
              {
                question?.type == "M" ?
                <div className='flex flex-col md:grid grid-cols-2 gap-5'>
                  {question?.options?.map((option, index) => {
                    return (
                      <div key={index} className={`${option?.status == 1 ? "border-2 border-[#0AC511] text-[#0AC511]" : "border-none text-black"} px-4 py-4 bg-[#D7DDFF] rounded-2xl text-sm flex gap-5 items-center shadow-lg`}>
                        <span className={`${option?.status == 1 ? "bg-[#0AC511] text-white" : "bg-[#7291CA] text-black"}  text-sm flex justify-center items-center min-w-[36px] min-h-[36px] rounded-full`}>
                          {index == 0? 'A' : index == 1? 'B' : index == 2? 'C' : 'D'}
                        </span>
                        {option?.title}
                      </div>
                    )
                  })}
                </div>

                : question?.type == "T" ?
                <div className='flex flex-col md:grid grid-cols-2 gap-5'>
                  <div className={`${question?.trueFalse == 'T' ? "border-2 border-[#0AC511] text-[#0AC511]" : "border-none text-black"} px-4 py-4 bg-[#D7DDFF] rounded-2xl text-sm flex gap-5 items-center`}>
                    <span className={`${question?.trueFalse == 'T' ? "bg-[#0AC511] text-white" : "bg-[#7291CA] text-black"}  text-sm flex justify-center items-center min-w-[36px] min-h-[36px] rounded-full`}>
                          A
                    </span>
                    True
                  </div>
                  <div className={`${question?.trueFalse == 'F' ? "border-2 border-[#0AC511] text-[#0AC511]" : "border-none text-black"} px-4 py-4 bg-[#D7DDFF] rounded-2xl text-sm flex gap-5 items-center`}>
                    <span className={`${question?.trueFalse == 'F' ? "bg-[#0AC511] text-white" : "bg-[#7291CA] text-black"}  text-sm flex justify-center items-center min-w-[36px] min-h-[36px] rounded-full`}>
                        B
                    </span>
                    False
                  </div>
                </div>

                : null
              }
        </div>
        
        <div className='flex justify-end mt-10'>
            <button 
              onClick={finish}
              className="border-2 border-[#6674BB] hover:bg-[#6674BB]/50 active:scale-90 text-white bg-[#6674BB] hover:text-white px-3 py-2 rounded-lg transition-all ease-in cursor-pointer w-[120px]">
                Finish
            </button>
        </div>

                

              
    </div>
  )
}

export default QuestionForReview

const Actions = ({question, setActiveNumber, handleRadioChange, totalQuestions, save}) => {
  const nav = useNavigate();

  const handleEdit = () => {
      localStorage.removeItem('cbt-question-state')
      {/* Save to db */}
      nav(`/admin/user/questions/edit/${question?.id}?review=reviewing`);
  }

  const handlePrevious = () => {
      {/* Save the current question state */}
      save();
      question?.number > 1 && setActiveNumber(question?.number - 1);
  }

  const handleNext = () => {
      {/* Save the current question state */}
      save();
      question?.number < totalQuestions && setActiveNumber(question?.number + 1);
  }
  return (
    <div className='flex flex-col gap-5 self-start border-2 border-black/30 px-3 py-3 rounded-xl sm:w-fit w-full'>
      <div className='flex sm:flex-row flex-col gap-2 items-center'>
          <button
              disabled={question?.number == 1}
              onClick={handlePrevious}
              className="border-2 border-[#6674BB]  text-[#6674BB] hover:bg-[#6674BB] hover:text-white disabled:cursor-not-allowed disabled:hover:bg-[#6674BB]/30 disabled:hover:shadow-none px-3 py-2 rounded-lg transition duration-300 ease-in cursor-pointer hover:shadow-2xl w-full sm:w-[120px]"
          >
              &lt; Previous
          </button>
          <button
              disabled={question?.number >= totalQuestions}
              onClick={handleNext}
              className="border-2 border-[#6674BB]  text-[#6674BB] hover:bg-[#6674BB] hover:text-white disabled:cursor-not-allowed disabled:hover:bg-[#6674BB]/30 disabled:hover:shadow-none px-3 py-2 rounded-lg transition duration-300 ease-in cursor-pointer hover:shadow-2xl w-full sm:w-[120px]"
          >
              Next &gt;
          </button>
      </div>
      <div className='flex justify-between items-center'>
        <form className='flex flex-col gap-2'>
          <fieldset className='flex gap-2 item-center'>
              <input id='reviewed'  checked={question && question["active_status"] == 1} onChange={(e) => handleRadioChange(e)} className='w-4 h-4 rounded-lg border-2 border-[#6674BB] outline-none' name='status'  type="radio" />
              <span className='text-sm flex gap-2 text-green-500'>
                  <BadgeCheck className='w-4 h-4'/>
                  Mark as reviewed
              </span>
          </fieldset> 
          <fieldset className='flex gap-2 item-center'>
              <input id='flag' checked={question && question["active_status"] == 0} onChange={(e) => handleRadioChange(e)} className='w-4 h-4 rounded-lg border-2 border-[#6674BB] outline-none' name='status'  type="radio" />
              <span className='text-sm flex gap-2 text-red-500'>
                  <Flag className='w-4 h-4' />
                  Flag
              </span>
          </fieldset> 
        </form>
        <div className='flex flex-col justify-center items-center'>
          <Edit size={20} className=' text-[#6674BB] cursor-pointer' onClick={handleEdit}/>
          <span className='text-black/70 text-sm'>Edit</span>
        </div>
      </div>
      
    </div> 
  )
}