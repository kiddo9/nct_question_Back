import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Fetching from '../components/Fetching'
import QuestionSelector from '../components/QuestionSelector'
import QuestionForReview from '../components/QuestionForReview'
import { mockQuestions } from '../assets/constants'

const CBTReview = () => {
    const [loading, setLoading] = useState(false)
    const [activeNumber, setActiveNumber] = useState(1)

    const transformedQuestions = mockQuestions.map((question, index) => ({
      ...question,
      number: index + 1
    }))
  return (
    <div className="rounded-lg lg:px-2 py-8">
        <ToastContainer />
        <div className="flex flex-col  bg-white rounded-2xl mx-auto shadow py-2 w-[100vw]  lg:w-[calc(100vw-270px)] h-[calc(100vh-160px)] ">
            {
                loading
                ? <Fetching /> 
                
                : <div className='px-4 py-2 flex flex-col gap-10'>
                    <div className='flex flex-wrap gap-2 items-center justify-between w-full'>
                      <span>
                        Questions:
                      </span>
                      <span>
                        Reviewed:
                      </span>
                      <span>
                        Flagged:
                      </span>
                      <span>
                        Filter By:
                      </span>
                      <span>
                        Marks: 
                      </span>
                    </div>

                    <div className='flex justify-between'>
                      <QuestionSelector questions={transformedQuestions} activeNumber={activeNumber} setActiveNumber={setActiveNumber}/>
                      <QuestionForReview/>
                    </div>
                  </div>
            }
        </div>
    </div>
  )
}

export default CBTReview