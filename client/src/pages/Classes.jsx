import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';
import { CircleDot, CircleX, Edit } from 'lucide-react';
import Fetching from '../components/Fetching';
import DeleteEnum from '../components/DeleteModals/DeleteEnum';
import CreateClasses from '../components/CreateModals/CreateClasses';
import useClassHook from '../hooks/classHook';
import EditClasses from '../components/EditModals/EditClasses';
import { useAuth } from '../components/security/Authentication';
import useUserHook from '../hooks/userHook';

const Classes = () => {
    const { classes, loader: classLoader } = useClassHook();
    const {users: getUsers, loader: userLoader} = useUserHook();
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState(null);
    const [editMark, setEditMark] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteName, setDeleteName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    // console.log(classes);
    
    const handleDelete = (id, name) => {
        setOpenDelete(true);
        setDeleteName(name);
        setDeleteId(id);
    };

    const handleEdit = (id, name, mark) => {
        setOpenEdit(true);
        setEditId(id);
        setEditName(name);
        setEditMark(mark);
    };

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }, []);

    useEffect(() => {
      if (getUsers.length > 0) {
        setUsers(getUsers);
      }
    }, [getUsers, userLoader]);
    

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
                    { user.role == 'admin'  && <AddButton>Add Class</AddButton> }
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
            {classLoader || userLoader || loading ? <Fetching/> :
              <div className=' overflow-y-scroll max-h-[calc(100vh-285px)]'>
                
                {
                    classes.map((clas) => (
                        <div key={clas.id} className='py-3 border-t-2 border-gray-300 grid grid-cols-6 gap-10 w-full items-center justify-items-center px-5'>
                            <span className=' text-sm text-black justify-self-start'>{clas.id}</span>
                            <p className=' text-sm text-black justify-self-start'>{clas.class_name}</p>
                            <span className='text-sm'>{clas.pass_mark}</span>
                            <StatusBadge status={clas.active_status} />
                            <p className=' text-sm  text-black justify-self-end'>{users?.find(user => user.id == 2).name}</p>
                            <div className='flex justify-end items-center gap-2 justify-self-end'>
                                { user.role != 'admin' && <CircleDot className='text-blue-600' size={18} /> }
                                { user.role == 'admin' && <Edit onClick={() => handleEdit(clas.id, clas.class_name, clas.pass_mark)} className='cursor-pointer text-green-600 hover:text-green-900' size={18} /> }
                                { user.role == 'admin' && <CircleX onClick={() => handleDelete(clas.id, clas.class_name)} className='cursor-pointer stroke-[#989898] hover:stroke-[#6674BB] ' /> } 
                            </div>
                                             
                        </div>
                    ))
                    
                }
              </div>
          }
        </div>
        {openCreate && <CreateClasses setOpenCreate={setOpenCreate} />}
        {openDelete && <DeleteEnum type='class' id={deleteId} setOpenDelete={setOpenDelete} name={deleteName} />} 
        {openEdit && <EditClasses setOpenEdit={setOpenEdit} id={editId} name={editName} mark={editMark} setName={setEditName} setMark={setEditMark} />}
    </div>
  )
}

export default Classes