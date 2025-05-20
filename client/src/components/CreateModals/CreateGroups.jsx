import React, { useState } from 'react'
import Api from '../../api/Api'
import { toast } from 'react-toastify'

const CreateGroups = ({setOpenCreate}) => {
    const [loader, setLoader] = useState()
    const [numberOfGroups, setNumberOfGroups] = useState(1)

    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault();
        const formData = new FormData(e.target);
        const groups = []
        for (let i = 0; i < numberOfGroups; i++) {
            const group = formData.get(`group${i+1}`)
            groups.push(group)
        }
        {/*CREATE API GOES HERE */}
        try {
            const request = await Api.post('/create/groups', {group: groups})
            const response = request.data
            if (response.status !== true) {
                toast.error(response.message)
                return
            }
            toast.success(response.message)
            
            // console.log(groups);
            setTimeout(() => {
                setOpenCreate(false)
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
        <div onClick={() => setOpenCreate(false)}  className='absolute top-0 left-0 w-full h-full bg-black opacity-50'/>
        <div className='bg-white py-2 rounded-lg shadow-2xl z-10 w-[600px]'>
            <header className="bg-[#D7DDFF] w-full  flex flex-row items-center px-4 py-2 shadow-md">
                <h1 className="text-xl mx-auto">Create Groups</h1>
            </header>
            <div className='px-5 max-h-[40vh] overflow-y-scroll'>
                <p className='mt-5 mb-2'>Fill the form to create groups.</p>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <fieldset className="mb-4 flex flex-col gap-2">
                        <label className="text-sm" htmlFor="number">
                            Number of Groups
                        </label>
                        <input
                            onChange={(e) => setNumberOfGroups(e.target.value)}
                            value={numberOfGroups}
                            className="rounded-lg w-[150px] px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                            type="number"
                            id="number"
                            name="name"
                            placeholder="Enter number of groups"
                            required
                        />
                    </fieldset>
                    {
                        Array.from({ length: Number(numberOfGroups) }, (_, index) => (
                            <fieldset className="mb-4 flex flex-col gap-2" key={index}>
                                <label className="text-sm" htmlFor={`group${index + 1}`}>
                                    Group {index + 1}
                                </label>
                                <input
                                    className="rounded-lg w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                                    type="text"
                                    id={`group${index + 1}`}
                                    name={`group${index + 1}`}
                                    placeholder={`Enter group ${index + 1}`}
                                    required
                                />
                            </fieldset>
                        ))
                    }
                    <button
                        type="submit"
                        className="border-2 border-[#6674BB] mb-5 mx-auto text-[#6674BB] hover:bg-[#6674BB] hover:text-white px-4 py-2 rounded-lg transition duration-300 ease-in cursor-pointer hover:shadow-2xl"
                    >
                        {loader ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
            

       </div>
    </div>
  )
}

export default CreateGroups