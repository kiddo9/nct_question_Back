import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Api from '../../api/Api'

const DeleteQuestion = ({id, setOpenDelete}) => {
    const [loader, setLoader] = useState(false)
    const nav = useNavigate()
    const handleDelete = async () => {
        setLoader(true)
        {/*DELETE API GOES HERE */}
        try {
            const response = await Api.delete(`/questions/bank/delete/${id}`)
            const result = response.data
            if(result.status !== true) {
                toast.error(result.message)
                return
            }
            toast.success(result.message)  
            setTimeout(() => {
                setOpenDelete(false)
                nav('/admin/user/questions')
            }, 1000)
        } catch (error) {
            toast.error("An error occurred while deleting question");
            console.log(error);
        }finally {
            setLoader(false)
        }
    }
    
  return (
    <div   className='absolute top-0 left-0 flex justify-center items-center backdrop-blur-xs w-full h-full z-50 '>
        <div onClick={() => setOpenDelete(false)}  className='absolute top-0 left-0 w-full h-full bg-black opacity-50'/>
       <div className='bg-white py-2 rounded-lg shadow-2xl z-10 w-[400px]'>
            <header className="bg-[#D7DDFF] w-full flex flex-row items-center px-4 py-2 shadow-md">
                <h1 className="text-xl mx-auto text-red-500">Delete Question</h1>
            </header>
            <p className='text-center mt-5 mb-2'>Are you sure you want to delete this question?</p>
            <div className='flex justify-center gap-4 px-10 pb-3'>
                <button disabled={loader} onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600'>
                    {loader ? 'Deleting...' : 'Yes'}
                </button>
                <button disabled={loader} onClick={() => setOpenDelete(false)} className='bg-[#6699ff] text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-2xl'>No</button>
            </div>
       </div>
    </div>
  )
}

export default DeleteQuestion