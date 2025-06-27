import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useQuestionGroupHook } from '../hooks/questionGroupHook';
import useClassHook from '../hooks/classHook';
import useSectionHook from '../hooks/sectionHook';
import Loader from '../components/Loader';
import CustomSelect from '../components/CustomSelect';
import { useNavigate } from 'react-router-dom';

const CBTReviewForm = () => {
    const { questionGroups, loader: groupLoader } = useQuestionGroupHook();
    const { classes, loader: classLoader } = useClassHook();
    const { sections, loader: sectionLoader } = useSectionHook();
    const nav = useNavigate()

    const [group, setGroup] = useState('')
    const [className, setClassName] = useState('')
    const [section, setSection] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!group || !className || !section) {
            toast.error('All fields are required')
            return
        } 
        const cbtQr = {group, className, section}
        localStorage.setItem('cbt-qr', JSON.stringify(cbtQr)) //for persistence on the browser
        localStorage.removeItem('cbt-question-state') //removes the previous question from storage
        nav('/admin/user/cbt-qr/start')
    }
  return (
    <div className=" pb-10 pt-20 flex justify-center self-center w-[100vw] lg:w-[calc(100vw-245px)] mx-auto">
        {groupLoader || classLoader || sectionLoader && <Loader preload={true}/>}
        <ToastContainer />
        <div className="rounded-[20px] max-w-[400px] w-full slideDown py-5 transition-opacity duration-300 ease-in shadow-lg h-fit bg-white/30 backdrop-blur-xs mx-auto">
            <header>
                <h1 className='text-2xl text-center font-bold'>Welcome to CBT Question Review</h1>
                <p className='text-lg text-center '>Fill the form below to begin</p>
            </header>
            <form className="px-3 w-[400px] flex flex-col gap-4" onSubmit={handleSubmit}>
                <CustomSelect label="Group" options={questionGroups.map((group) => group.title)} placeholder="Select Group" value={group} setValue={setGroup}/>
                <CustomSelect label="Section" options={sections.map((section) => section.section_name)} placeholder="Select Section" value={section} setValue={setSection}/>
                <CustomSelect label="Class" options={classes.map((clas) => clas.class_name)} placeholder="Select Class" value={className} setValue={setClassName}/>
                <button
                    disabled={null}
                    type="submit"
                    className="w-full disabled:bg-[#6699ff]/30 bg-[#6699ff] active:bg-[#D7DDFF]  text-white font-bold rounded-md py-2 cursor-pointer hover:shadow-2xl transition duration-300 ease-in"
                >
                    Go
                </button>
            </form>
        </div>
    </div>
  )
}

export default CBTReviewForm