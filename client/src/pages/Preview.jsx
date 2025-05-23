import React, { useEffect, useState } from 'react'
import useQuestionHook from '../hooks/questionHook'
import { useNavigate, useParams } from 'react-router-dom';
import useOpt from '../hooks/opt';
import { useQuestionGroupHook } from '../hooks/questionGroupHook';
import useSectionHook from '../hooks/sectionHook';
import { ToastContainer } from 'react-toastify';
import { Edit, Trash2 } from 'lucide-react';
import DeleteQuestion from '../components/DeleteModals/DeleteQuestion';
import Fetching from '../components/Fetching';

const Preview = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { opt, loader: optLoader } = useOpt();
  const { getEachQuestion, loader: questionLoader } = useQuestionHook(id);
  const { questionGroups, loader: groupLoader } = useQuestionGroupHook();
  const { sections, loader: sectionLoader } = useSectionHook();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const fullQuestion = {
    ...getEachQuestion,
    group: questionGroups?.find((group) => group?.id == getEachQuestion?.q_group_id),
    section: sections?.find((section) => section?.id == getEachQuestion?.section_id),
    options: opt?.filter((option) => {
      return (option?.question_bank_id == getEachQuestion?.id) 
    }),
  }




  return (
    <div className="rounded-lg lg:px-2 py-8">
      
      <ToastContainer />
      <div className="flex flex-col space-y-4 bg-white rounded-2xl mx-auto shadow py-2 w-[100vw] lg:w-[calc(100vw-245px)]">
        <header className="bg-[#D7DDFF] w-full flex flex-wrap justify-center flex-row items-center px-4 py-2">
          <img onClick={() => nav(-1)} className="cursor-pointer" src="/back-arrow.svg" alt="back arrow" />
          <h1 className="text-xl mx-auto">Preview Question</h1>
          <div className='flex gap-8'>
            <span onClick={() => nav(`/admin/user/questions/edit/${id}`)} className='flex items-center text-lg gap-2 text-[#7291CA] hover:text-[#6674BB] cursor-pointer'>
              <Edit  size={15} />
              Edit
            </span>
            <span onClick={() => setOpenDelete(true)} className='flex items-center text-lg gap-2 text-[#FF0000]/70 hover:text-[#FF0000] cursor-pointer'>

              <Trash2  size={15} />
              Delete
            </span>
          </div>
        </header>
        {
          questionLoader || optLoader || groupLoader || sectionLoader || loading
          ? <Fetching /> 
           
          : <div className='px-4 py-2 flex flex-col '>
              <div className='flex flex-wrap gap-2 items-center justify-between w-full'>
                <span>
                  Group: {fullQuestion?.group?.title}
                </span>
                <span>
                  Section: {fullQuestion?.section?.section_name}
                </span>
                <span>
                  Question Type: {fullQuestion?.type == "M" ? "Multiple Choice" : "True/False"}
                </span>
                <span>
                  Marks: {fullQuestion?.marks}
                </span>
              </div>

              <div className='mt-10 mb-10 '>
                <p className='mb-2'>Question {fullQuestion?.id}:</p>
                <div className='border-2 border-black/30 px-5 py-3 rounded-xl'>
                  {fullQuestion?.question}
                </div>
              </div>
              

              <p className='mb-2'>Options: </p>
              {
                fullQuestion?.type == "M" ?
                <div className='flex flex-col md:grid grid-cols-2 gap-5'>
                  {fullQuestion?.options?.map((option, index) => {
                    return (
                      <div key={index} className={`${option?.status == 1 ? "bg-[#0AC511] text-white" : "bg-[#7291CA] text-white"} px-4 py-4 rounded-2xl text-sm`}>
                        {option?.title}
                      </div>
                    )
                  })}
                </div>

                : fullQuestion?.type == "T" ?
                <div className='flex flex-col md:grid grid-cols-2 gap-5'>
                  <div className={`${fullQuestion?.trueFalse == 'T' ? "bg-[#0AC511] text-white" : "bg-[#7291CA] text-white"} px-4 py-4 rounded-2xl text-sm`}>
                    True
                  </div>
                  <div className={`${fullQuestion?.trueFalse == 'F' ? "bg-[#0AC511] text-white" : "bg-[#7291CA] text-white"} px-4 py-4 rounded-2xl text-sm`}>
                    False
                  </div>
                </div>

                : null
              }
              

              <button
                  onClick={() => nav("/admin/user/questions")}
                  type="submit"
                  className="mt-10  border-2 border-[#6674BB] mx-auto text-[#6674BB] hover:bg-[#6674BB] hover:text-white px-5 py-2 rounded-lg transition duration-300 ease-in cursor-pointer hover:shadow-2xl"
                >
                  Done
              </button>
              
            </div>
        }
        
      </div>
        
      {openDelete && <DeleteQuestion id={id} setOpenDelete={setOpenDelete} />}
    </div>
  )
}

export default Preview