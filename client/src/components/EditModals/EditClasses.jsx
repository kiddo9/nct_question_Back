import React from 'react'
import Loader from '../Loader';
import Api from '../../api/Api';
import { toast } from 'react-toastify';

const EditClasses = ({setOpenEdit, id, name, mark, setName, setMark}) => {
    const [loader, setLoader] = React.useState(false);

    const handleUpdate = async () => {
        setLoader(true)
        try {
            const request = await Api.put('/classes/update', {
                id: id,
                class_name: name,
                mark: mark
            })
            const response = request.data
            if (response.status !== true) {
                toast.error(response.message)
                return
            }
            toast.success(response.message)
            // console.log(sections);
            setTimeout(() => {
                setOpenEdit(false)
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('something went wrong')
            console.log(error);
            
        }finally{
            setLoader(false)
        }
    }
  return (
    <div   className='absolute top-0 left-0 flex justify-center items-center backdrop-blur-xs w-full h-full z-50 '>
            {loader && <Loader preload={loader} />}
            <div onClick={() => setOpenEdit(false)}  className='absolute top-0 left-0 w-full h-full bg-black opacity-50'/>
            <div className='bg-white py-2 rounded-lg shadow-2xl z-10 w-[600px]'>
                <header className="bg-[#D7DDFF] w-full  flex flex-row items-center px-4 py-2 shadow-md">
                    <h1 className="text-xl mx-auto">Create Classes</h1>
                </header>
                <div className='px-5 max-h-[40vh] overflow-y-scroll'>
                    <p className='mt-5 mb-2'>Fill the form to create classes.</p>
                    <div className='flex items-center gap-4'>
                        <fieldset className="mb-4 flex flex-col sm:min-w-[300px] gap-2">
                            <label className="text-sm" htmlFor={`class`}>
                                Class
                            </label>
                            <input
                                className="rounded-lg w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id={`class`}
                                name={`class`}
                                placeholder={`Enter class name`}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-4 flex flex-col gap-2">
                        <label className="text-sm" htmlFor={`mark-class`}>
                            Marks for Class
                        </label>
                        <input
                            className="rounded-lg w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                            type="number"
                            id={`mark-class`}
                            name={`mark-class`}
                            value={mark}
                            onChange={(e) => setMark(e.target.value)}
                            placeholder={`Enter mark`}
                            required
                        />
                        </fieldset>
                    </div>
                    <button
                        onClick={handleUpdate}
                        disabled={loader}
                        type="submit"
                        className="border-2 border-[#6674BB] mb-5 mx-auto text-[#6674BB] hover:bg-[#6674BB] hover:text-white px-4 py-2 rounded-lg transition duration-300 ease-in cursor-pointer hover:shadow-2xl"
                    >
                        {loader ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
    </div>
  )
}

export default EditClasses