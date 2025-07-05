import React, { useEffect, useState } from "react";
import CreateHeader from "../components/CreateHeader";
import CustomSelect from "../components/CustomSelect";
import {z} from "zod"
import { ToastContainer, toast } from "react-toastify";
import { useQuestionGroupHook } from "../hooks/questionGroupHook";
import useSectionHook from "../hooks/sectionHook";
import { useNavigate, useParams } from "react-router-dom";
import useQuestionHook from "../hooks/questionHook";
import useOpt from "../hooks/opt";
import Loader from "../components/Loader";
import Api from "../api/Api";
import Fetching from "../components/Fetching";
import useClassHook from "../hooks/classHook";

const EditQuestions = () => {
  const { id } = useParams();
  const { opt, loader: optLoader } = useOpt();
  const { getEachQuestion, loader: questionLoader } = useQuestionHook(id);
  const { questionGroups, loader: groupLoader } = useQuestionGroupHook();
  const { classes, loader: classLoader } = useClassHook();
  const { sections, loader: sectionLoader } = useSectionHook();
  const nav = useNavigate();

  
  const fullQuestion = {
    ...getEachQuestion,
    group: questionGroups?.find((group) => group?.id == getEachQuestion?.q_group_id),
    class: classes?.find((clas) => clas?.id == getEachQuestion?.class_id),
    section: sections?.find((section) => section?.id == getEachQuestion?.section_id),
    options: opt?.filter((option) => {
      return (option?.question_bank_id == getEachQuestion?.id)
    }),
  }
  

  // console.log(fullQuestion)
  

  const [group, setGroup] = useState('')
  const [className, setClassName] = useState('')
  const [section, setSection] = useState('')
  const [question, setQuestion] = useState('')
  const [mark, setMark] = useState('')
  const [type, setType] = useState('')
  const [typeOpen, setTypeOpen] = useState(false) //for the custom select component
  const [numberOfOptions, setNumberOfOptions] = useState('')
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState('')
  const [manual, setManual] = useState(false)
  const [loader, setLoader] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setGroup(fullQuestion?.group?.title)
    setClassName(fullQuestion?.class?.class_name)
    setSection(fullQuestion?.section?.section_name)
    setQuestion(fullQuestion?.question)
    setMark(String(fullQuestion?.marks))
    setType(fullQuestion?.type)
    setNumberOfOptions(String(fullQuestion?.options?.length))
    setOptions(type== "T" ? [{label: 'True', value: 'T'}, {label: 'False', value: 'F'}] : fullQuestion?.options.map((option) => ({label: option?.title, value: option?.title})))
    setAnswer(type == "T" ? fullQuestion?.trueFalse : fullQuestion?.options?.find((option) => option?.status == 1)?.title)
  }, [questionLoader, groupLoader, sectionLoader, optLoader, classLoader])

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const questionSchema = z.object({
    group: z.string().trim().min(1, {message: "Group is required"}),
    className: z.string().trim().min(1, {message: "Class is required"}), 
    section: z.string().trim().min(1, {message: "Section is required"}),
    question: z.string().trim().min(1, {message: "Question is required"}),
    mark: z.string().trim().min(1, {message: "Mark is required"}),
    type: z.string().trim().min(1, {message: "Type is required"}),
    numberOfOptions: z.string().trim().min(1, {message: "Number of options is required"}),
    options: z.array(z.object({label: z.string().trim().min(1, {message: "All labels are required"}), value: z.string().trim().min(1, {message: "All values are required"})})).min(2, {message: "At least two options are required"}),
    answer: z.string().trim().min(1, {message: "Answer is required"}),
  })

  const handleSubmit = async(e) => {
    setLoader(true)
    e.preventDefault()
    const result = questionSchema.safeParse({group, className, section, question, mark, type, numberOfOptions, options, answer})

    if(type == "M" && options.length != Number(numberOfOptions)){
      return toast.error('Number of options provided does not match the number of options in the question')
    }

    if(result.success) {
      {/* API CALL GOES HERE */}
      const updateQuestion = { //data to update question database
        ...fullQuestion,
        q_group_id: questionGroups?.find((gr) => gr?.title == group)?.id,
        class_id: classes?.find((clas) => clas?.class_name == className)?.id,
        options,
        section_id: sections?.find((sec) => sec?.section_name == section)?.id,
        trueFalse: type == "T" ? answer : null,
        marks: mark,
      }
      {/* Data to Update Options Database */}
      // const updateOptions =type == "M" && updateQuestion.options.map((option, i) => ({...option, status: options[i]?.value == answer ? 1 : 0, title: options[i]?.value, question_bank_id: updateQuestion?.id}))
      try {
        const request = await Api.put(`/question/bank/update`, {
          id: updateQuestion.id,
          type: type,
          question: question,
          mark: mark,
          options: options.map((option) => option.value),
          numberOfOptions: numberOfOptions,
          QuaterId: updateQuestion.section_id,
          answer: answer,
          GroupId: updateQuestion.q_group_id,
          ClassId: updateQuestion.class_id,
        })
        const response = request.data;
        if(response.status != true) {
          toast.error(response.message)
        }
        toast.success(response.message)
        setTimeout(() => {
          nav(`/admin/user/questions/preview/${updateQuestion.id}`);
        }, 1000);
      } catch (error) {
        toast.error('Something went wrong')
        console.log(error)
      }finally{
        setLoader(false)
      }

      // console.log(updateQuestion)
      // console.log(updateOptions)
      // console.log(result.data)
    }
    else{
      setLoader(false)
      return result.error.issues.map((issue) => toast.error(issue.message))
    }
    

  }

  const switchType = (q_type) => {
    switch (q_type) {
      case "M":
        return 'Multiple Choice'
      case "T":
        return 'True/False'
      default:
        return ''
    }
  }

  {/* Generate True Or False Options */}
  const generateTrueFalseOptions = () => {
    return [
      {
        label: 'True',
        value: 'T'
      },
      {
        label: 'False',
        value: 'F'
      } 
  ]
  }
  // if(loader || groupLoader || sectionLoader) return <Loader />

  {/* Generate Multiple Choice Options */}
  const generateMultipleChoiceOptions = (number) => {
    if(!number) return ''
    return Array.from({ length: Number(number) }, (_, index) => ({
      label: `Option ${index + 1}`,
      value: ''
    }))
  }

  {/* Update the Options when nubmer of options changes */}
  useEffect(() => {
    
    if(type === 'T' || numberOfOptions != options.length){
      setAnswer('')
      if(type === 'M') {
        setOptions(generateMultipleChoiceOptions(numberOfOptions))
      } else if(type === 'T') {
        setOptions(generateTrueFalseOptions())
      }
    }
    
  }, [manual, numberOfOptions])
  
  return (
    <div className="rounded-lg lg:px-2 py-8">
      {loader && <Loader preload={true}/>}
      <ToastContainer/>
      <div className="flex flex-col space-y-4 bg-white rounded-2xl mx-auto shadow py-2 w-[100vw] lg:w-[calc(100vw-245px)]">
        <CreateHeader>Edit Question</CreateHeader>
        {
          groupLoader || sectionLoader || optLoader || questionLoader || classLoader || loading ? <Fetching /> 
          :
          <div className="px-4 overflow-y-scroll max-h-[calc(100vh-232px)]">
            <h2>Review and edit the fields below</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="mt-4 w-full flex flex-col justify-between pb-5 h-fit">
              <div className="md:grid flex flex-col grid-cols-2 gap-10 ">
                <CustomSelect label="Group" options={questionGroups.map((group) => group.title)} placeholder="Select Group" value={group} setValue={setGroup}/>
                <CustomSelect label="Section" options={sections.map((section) => section.section_name)} placeholder="Select Section" value={section} setValue={setSection}/>
                <CustomSelect label="Class" options={classes.map((clas) => clas.class_name)} placeholder="Select Class" value={className} setValue={setClassName}/>
                <fieldset className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm" htmlFor="question">Question</label>
                  <textarea onChange={(e) => setQuestion(e.target.value)} value={question} className="rounded-lg px-4 py-2 resize-none h-[20vh] outline-none border-2 border-gray-300 focus:border-[#D7DDFF]" id="question" name="question" placeholder="Enter Question"></textarea>
                </fieldset>
                <fieldset className="mb-4 flex flex-col gap-2">
                  <label className="text-sm" htmlFor="mark">Mark</label>
                  <input onChange={(e) => setMark(e.target.value < 0 ? 0 : e.target.value)} value={mark} className="rounded-lg px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]" type="number" id="mark" name="mark"/>
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <label className="text-sm" htmlFor="type">Type</label>
                  {/* Custom Select Component for Consistency */}
                  <div  className="cursor-pointer relative rounded-lg px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]" name="role" id="role">
                      <p type='button' onClick={() => {setTypeOpen(!typeOpen); }} className={`${type ? 'text-black' : 'text-gray-500'} w-full`}>{switchType(type) || 'Select Question Type'}</p>
                      {typeOpen && (
                          <ul className="absolute z-10 w-full left-0 max-h-[300px] overflow-y-scroll top-12 rounded-lg flex flex-col gap-2 bg-white border-2 border-gray-300 shadow-xl">
                              <li><p onClick={() => {setType('M'); setTypeOpen(false); setNumberOfOptions(''); setManual(!manual);}} className='hover:bg-[#D7DDFF] px-4 py-2 transition duration-200 ease-in' >Multiple Choice</p></li>
                              <li><p onClick={() => {setType('T'); setNumberOfOptions('2'); setTypeOpen(false);  setManual(!manual);}} className='hover:bg-[#D7DDFF] px-4 py-2 transition duration-200 ease-in' >True/False</p></li>
                          </ul>
                      )}
                  </div>
                  {/* Multiple Choice Options */}
                  {
                    type === 'M' && (
                      <>
                        <CustomSelect label="Number of Options" options={['2', '3', '4', '5', '6']} placeholder="Select Number of Options" value={numberOfOptions} setValue={setNumberOfOptions}/>
                        {
                          options != [] && options.length > 0 && options.map((option, index) => (
                            <fieldset key={index} className="mb-4 flex gap-2">
                              <input checked={option.value === answer} onChange={(e) => setAnswer(e.target.value)} type="radio" id={option.label} name="option" key={index} value={option.value} />
                              <input value={option.value} onChange={(e) => setOptions(options.map((option, i) => i === index ? {...option, value: e.target.value} : option))} type="text" placeholder={`Option ${index + 1}`} className="px-4 py-2 rounded-lg outline-none border-2 border-gray-300 focus:border-[#D7DDFF]" />
                            </fieldset>
                        ))}
                      </>
                    )
                  }
                  {/* True/False Options */}
                  {
                    type === 'T' && (
                      <div className="mb-4">
                        <p>Choose Correct Option</p>
                        {options.length && options.length > 0 && options?.map((option, index) => (
                          <fieldset key={index} className="mb-4 flex gap-2">
                            <input checked={option?.value == answer} onChange={(e) => setAnswer(e.target.value)} type="radio" id={option?.label} name="option" key={index} value={option?.value} />
                            <label htmlFor={option?.label}>{option?.label}</label>
                          </fieldset>
                        ))}
                      </div>
                    )
                  }
                </fieldset>
              </div>
              <button type="submit" className="border-2 border-[#6674BB] mt-5 mx-auto text-[#6674BB] hover:bg-[#6674BB] hover:text-white px-4 py-2 rounded-lg transition duration-300 ease-in cursor-pointer hover:shadow-2xl">
                {loader ? 'Editing...' : 'Edit Question'}
              </button>
            </form>
          </div>
        }
      </div>
    </div>
  )
};

export default EditQuestions;
