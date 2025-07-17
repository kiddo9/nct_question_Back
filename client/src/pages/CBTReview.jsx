import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Fetching from '../components/Fetching'
import QuestionSelector from '../components/QuestionSelector'
import QuestionForReview from '../components/QuestionForReview'
import useOpt from '../hooks/opt'
import useQuestionHook from '../hooks/questionHook'
import useClassHook from '../hooks/classHook'
import useSectionHook from '../hooks/sectionHook'
import { useQuestionGroupHook } from '../hooks/questionGroupHook'
import { useNavigate } from 'react-router-dom'
import CreateHeader from '../components/CreateHeader'
import Api from '../api/Api'

const CBTReview = () => {
    const [loading, setLoading] = useState(false)
    const [activeNumber, setActiveNumber] = useState(1)
    const {getQuestion, loader: questionLoader} = useQuestionHook()
    const { questionGroups, loader: groupLoader } = useQuestionGroupHook()
    const { classes, loader: classLoader } = useClassHook()
    const { sections, loader: sectionLoader } = useSectionHook()
    const {opt, loader: optLoader} = useOpt()
    const nav = useNavigate()

    const cbtQR = JSON.parse(localStorage.getItem('cbt-qr'))
    const savedQuestions = JSON.parse(localStorage.getItem('cbt-question-state'))

    
    {/* Check if cbt qr data from local storage is null and handle redirect */}
    useEffect(() => {
      if(cbtQR === null) {
        toast.error('No CBT QR Data found. Redirecting...')
        setTimeout(() => nav('/admin/user/cbt-qr'), 3000)
      }
    }, [nav, cbtQR])

    const transformedQuestions = savedQuestions || getQuestion.map((question) => ({
      ...question,
      options: opt?.filter((option) => option?.question_bank_id == question?.id),
      group: questionGroups.find(group => group.id === question.q_group_id)?.title,
      class: classes.find(cls => cls.id === question.class_id)?.class_name,
      section: sections.find(section => section.id == question.section_id)?.section_name,
    }))

    const filteredQuestions = transformedQuestions.filter((question) => 
      cbtQR && question.group === cbtQR.group && question.class === cbtQR.className && question.section === cbtQR.section
    ).map((question, index) => ({...question, number: index+1}));

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
      setQuestions(filteredQuestions);
    }, [optLoader, questionLoader, groupLoader, classLoader, sectionLoader]);

    const handleQuestionUpdate = (type, questionNumber) => {
      switch (type) {
        case "flag":
          {/* Make that question flagged */}
          setQuestions((prevQuestions) => prevQuestions.map((question) => question.number === questionNumber ? { ...question, "active_status": 0 } : question));
          break;
        case "reviewed":
          {/* Make that question reviewed */}
          setQuestions((prevQuestions) => prevQuestions.map((question) => question.number === questionNumber ? { ...question, "active_status": 1 } : question));
          break;
        default:
          break;
      }

    }

    const saveReview = async(type) => {
      if(type == 'client'){
        localStorage.setItem('cbt-question-state', JSON.stringify(questions))
        // toast.info('Saved')
      }
      else if(type == 'server'){
        {/* API CALL GOES HERE */}
        setLoading(true)
        try {
          const request = await Api.put(`/question/bank/reviewed`,  {
            reviewedQuestions: questions.map((question) => ({
              id: question.id,
              active_status: question.active_status
            }))
          })

          const response = request.data

          if(response.status != true){
            toast.error(response.message)
            return
          }
          
          toast.info(response.message + '. Questions saved Successful')
        } catch (error) {
          console.log(error);
          toast.error('Error saving questions to the server')
        }finally{
          setLoading(false)
        }
      }
      else{
        toast.error('Invalid save type')
        return
      }
      
    }

    const finishReview = async() => {
      setLoading(true)
      try {
        {/* API CALL GOES HERE */}
        await saveReview('server')

        toast.success('Question review completed')
        setTimeout(() => {
          nav('/admin/user/cbt-qr')
        }, 2000)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
        localStorage.removeItem('cbt-question-state')
        localStorage.removeItem('cbt-qr')
      }
    }
  return (
    <div className="rounded-lg lg:px-2 py-8">
        <ToastContainer />
        <div className="flex flex-col  bg-white rounded-2xl mx-auto shadow py-2 w-[100vw] lg:w-[calc(100vw-270px)] h-[calc(100vh-160px)] ">
            <CreateHeader>
              <p className='text-lg text-center mx-auto lg:text-2xl font-bold'>{cbtQR?.group} - {cbtQR?.className} - {cbtQR?.section}</p>
            </CreateHeader>
            {
                loading || optLoader || questionLoader || groupLoader || classLoader || sectionLoader
                ? <Fetching /> 
                
                : <div className=' py-2 mt-5 flex flex-col gap-5 overflow-y-scroll '>
    
                    <div className='flex px-4 flex-wrap gap-2 items-center justify-between w-full '>
                      <span>
                        Questions: <span className='font-semibold'>{questions.length}</span>
                      </span>
                      <span>
                        Reviewed: <span className='font-semibold text-green-500'>{questions.filter((question) => question.active_status === 1).length}</span>
                      </span>
                      <span>
                        Flagged: <span className='font-semibold text-red-500'>{questions.filter((question) => question.active_status === 0).length}</span>
                      </span>
                      <span>
                        Marks: <span className='font-semibold text-[#6674BB]'>{questions.reduce((total, question) => total + question.marks, 0)}</span>
                      </span>
                    </div>

                    <div className='flex flex-col md:flex-row gap-10'>
                      <QuestionSelector 
                        questions={questions} 
                        activeNumber={activeNumber} 
                        setActiveNumber={setActiveNumber}
                      />
                      <QuestionForReview 
                        question={questions.find((question) => question.number === activeNumber)} 
                        setActiveNumber={setActiveNumber} 
                        questionUpdate={handleQuestionUpdate} 
                        totalQuestions={questions.length} 
                        save={saveReview} 
                        finish={finishReview}
                      />
                    </div>
                  </div>
            }
        </div>
    </div>
  )
}

export default CBTReview