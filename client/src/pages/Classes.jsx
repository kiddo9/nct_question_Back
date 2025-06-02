import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';
import { CircleX, Edit } from 'lucide-react';
import Fetching from '../components/Fetching';
import DeleteEnum from '../components/DeleteModals/DeleteEnum';
import CreateClasses from '../components/CreateModals/CreateClasses';
import useClassHook from '../hooks/classHook';

const Classes = () => {
    const { classes, loader: classLoader } = useClassHook();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteName, setDeleteName] = useState(null);
    const [loading, setLoading] = useState(false);
    // console.log(classes);
    
    const handleDelete = (id, name) => {
        setOpenDelete(true);
        setDeleteName(name);
        setDeleteId(id);
    };

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }, []);
    

    const StatusBadge = ({ status }) => {
        let bgColor = '';
        let statusText = '';
        
        switch(status) {
          case 1:
            bgColor = 'bg-green-100 text-green-800';
            statusText = 'Active';
            break;
          case 0:
            bgColor = 'bg-yellow-100 text-yellow-800';
            statusText = 'Inactive';
            break;
          case -1:
            bgColor = 'bg-gray-100 text-gray-800';
            statusText = 'Deleted';
            break;
          default:
            bgColor = 'bg-blue-100 text-blue-800';
            statusText = 'Unknown';
        }
        
        return (
          <span className={`ml-4 px-2 py-1 text-xs font-medium rounded-full justify-self-center   ${bgColor}`}>
            {statusText}
          </span>
        );
      };
  return (
    <div className="rounded-lg lg:px-2 py-8">
        <ToastContainer />
        <div className="flex flex-col  bg-white rounded-2xl mx-auto shadow py-2 w-[100vw]  lg:w-[calc(100vw-270px)] ">
            <div className="flex justify-end  gap-2 items-center px-5 py-3">
                {/* <div className='cursor-pointer flex justify-center rounded-md bg-[#6674BB] px-2 py-2 text-white'>
                    <img src="/edit.svg" alt="edit" width={25} height={25} />
                </div> */}
                
                <Link to={''} onClick={() => setOpenCreate(true)}>
                    <AddButton>Add Class</AddButton>
                </Link>
            </div>
            <div className='py-2 border-t-2 border-gray-300 bg-gray-100 grid grid-cols-6 gap-10 w-full items-center justify-items-center px-5 shadow-md'>
                    <h1 className='text-sm  text-black/50 font-semibold justify-self-start'>ID</h1>
                    <h1 className='text-sm  text-black/50 font-semibold justify-self-start'>CLASS</h1>
                    <h1 className='text-sm  text-black/50 font-semibold '>MARKS</h1>
                    <h1 className='text-sm  text-black/50 font-semibold  justify-self-center'>STATUS</h1>
                    <h1 className='text-sm  text-black/50 font-semibold  justify-self-end'>UPDATED BY</h1>
                    <h1 className='text-sm  text-black/50 font-semibold  justify-self-end'>ACTIONS</h1>
            </div>
            {classLoader || loading ? <Fetching/> :
              <div className=' overflow-y-scroll max-h-[calc(100vh-285px)]'>
                
                {
                    classes.map((clas) => (
                        <div key={clas.id} className='py-3 border-t-2 border-gray-300 grid grid-cols-6 gap-10 w-full items-center justify-items-center px-5'>
                            <span className=' text-sm text-black justify-self-start'>{clas.id}</span>
                            <p className=' text-sm text-black justify-self-start'>{clas.class_name}</p>
                            <span className='text-sm'>{clas.pass_mark}</span>
                            <StatusBadge status={clas.active_status} />
                            <p className=' text-sm  text-black justify-self-end'>{clas.updated_by}</p>
                            <div className='flex justify-end items-center gap-2 justify-self-end'>
                                <Edit className='cursor-pointer text-green-600 hover:text-green-900' size={18} />
                                <CircleX onClick={() => handleDelete(clas.id, clas.class_name)} className='cursor-pointer stroke-[#989898] hover:stroke-[#6674BB] ' />  
                            </div>
                                             
                        </div>
                    ))
                    
                }
              </div>
          }
        </div>
        {openCreate && <CreateClasses setOpenCreate={setOpenCreate} />}
        {openDelete && <DeleteEnum type='class' id={deleteId} setOpenDelete={setOpenDelete} name={deleteName} />} 
    </div>
  )
}

export default Classes