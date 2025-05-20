import React, { useState } from 'react'
import Api from '../../api/Api';
import { toast } from 'react-toastify';

const DeleteEnum = ({type, id, setOpenDelete, name}) => {
    const [loader, setLoader] = useState(false);

    const handleDelete = async() => {
        setLoader(true);
        let request;
        try {
            switch (type) {
                case 'group':
                    request = await Api.delete(`/group/delete/${id}`);
                    break;
                case 'role':
                    request = await Api.delete(`/admin/role/delete/${id}`);
                    break;
                case 'section':
                    request = await Api.delete(`/section/delete/${id}`);
                    break;
                default:
                    request = {data: {status: false, message: 'An error occurred will processing your request'}};
                    break;
            }
            const response = request.data;
            if (response.status !== true) {
                toast.error(response.message);
                return;
            }
            toast.success(response.message);
            setTimeout(() => {
                setOpenDelete(false);
                window.location.reload();
            }, 1000);
            
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }finally{
            setLoader(false);
        }
        
    }
  return (
    <div   className='absolute top-0 left-0 flex justify-center items-center backdrop-blur-xs w-full h-full z-50 '>
        <div onClick={() => setOpenDelete(false)}  className='absolute top-0 left-0 w-full h-full bg-black opacity-50'/>
       <div className='bg-white py-2 rounded-lg shadow-2xl z-10 w-[400px]'>
            <header className="bg-[#D7DDFF] w-full flex flex-row items-center px-4 py-2 shadow-md">
                <h1 className="text-xl mx-auto text-red-500">Delete {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            </header>
            <p className='text-center mt-5 mb-2'>
                {`Are you sure you want to delete this ${type}?`}
                <br />
                <span className='font-bold'>{name}</span>
            </p>
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

export default DeleteEnum