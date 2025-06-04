import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Loader from '../components/Loader'
import AddButton from '../components/AddButton'
import { Link } from 'react-router-dom'
import { CircleX } from 'lucide-react'
import CreateRoles from '../components/CreateModals/CreateRoles'
import useSectionHook from '../hooks/sectionHook'
import CreateSections from '../components/CreateModals/CreateSections'
import DeleteEnum from '../components/DeleteModals/DeleteEnum'
import Fetching from '../components/Fetching'
import { useAuth } from '../components/security/Authentication'

const Sections = () => {
    const { sections, loader: sectionLoader } = useSectionHook()
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteName, setDeleteName] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    
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
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
            {statusText}
          </span>
        );
      };
  return (
    <div className="rounded-lg lg:px-2 py-8">
        <ToastContainer />
        <div className="flex flex-col  bg-white rounded-2xl mx-auto shadow py-2 w-[100vw]  lg:w-[calc(100vw-270px)] ">
            <div className="flex justify-end  gap-2 items-center px-5 py-3 shadow-md">
                {/* <div className='cursor-pointer flex justify-center rounded-md bg-[#6674BB] px-2 py-2 text-white'>
                    <img src="/edit.svg" alt="edit" width={25} height={25} />
                </div> */}
                
                <Link to={''} onClick={() => setOpenCreate(true)}>
                    { user && user.role && user.role.roles == 'admin'  && <AddButton>Add Section</AddButton> }
                </Link>
            </div>
            {sectionLoader || loading ? <Fetching/> :
              <div className=' overflow-y-scroll max-h-[calc(100vh-232px)]'>
              {
                  sections.map((section) => (
                      <div key={section.id} className='py-4 border-t-2 border-gray-300 flex justify-between items-center px-5'>
                          <h1 className='md:text-lg text-[16px]  text-black'>{section.section_name}</h1>
                          <div className='flex gap-10 items-center'>
                              <StatusBadge status={section.active_status} />
                              { user && user.role && user.role.roles == 'admin'  && <CircleX onClick={() => handleDelete(section.id, section.section_name)} className='cursor-pointer stroke-[#989898] hover:stroke-[#6674BB]' />}
                          </div>
                                              
                      </div>
                  ))
                
              }
              </div>
          }
        </div>
        {openCreate && <CreateSections setOpenCreate={setOpenCreate} />}
        {openDelete && <DeleteEnum type='section' id={deleteId} setOpenDelete={setOpenDelete} name={deleteName} />} 
    </div>
  )
}


export default Sections