import React, { useState } from 'react'
import Api from '../api/Api';
import { toast } from 'react-toastify';

const DBDump = () => {
    const [loader, setLoader] = useState(false);
    const [lastQuestionIndexId, setLastQuestionIndexId] = useState('');    
    const [lastQuestionOptionIndexId, setLastQuestionOptionIndexId] = useState('');
    const handleDump = async (e) => {
        e.preventDefault();
        setLoader(true);
        if(!lastQuestionIndexId || !lastQuestionOptionIndexId){
          toast.error("enter question index and option index");
          setLoader(false);
          return
        };
        if(isNaN(lastQuestionIndexId) || isNaN(lastQuestionOptionIndexId)){
          toast.error("invalid question index or option index");
          setLoader(false);
          return
        }
        try {
          const request = await Api.post("/db/dump/data", {
            lastQuestionIndexId,
            lastQuestionOptionIndexId
          });
          const response = request.data;
    
          if (response.status == true) {
            toast.success(response.message);
            setLastQuestionIndexId('');
            setLastQuestionOptionIndexId('');
            return;
          }
    
          toast.error(response.message);
        } catch (error) {
          console.log(error);
          toast.error("unable to logout. check your network connection");
        } finally {
          setLoader(false);
        }
      }
  return (
    <form className='flex flex-col' >
            <div className='flex space-x-2 items-center'>
              <div className='flex flex-col'>
                {/* <label className='text-xs' htmlFor="qindex">Question</label> */}
                <input value={lastQuestionIndexId} onChange={(e) => setLastQuestionIndexId(e.target.value)} className="rounded-lg w-[60px] outline-none border-2 text-gray-400 bg-black/2 border-gray-300 focus:border-[#D7DDFF] text-xs h-[30px] px-2" type="text" id='qindex' placeholder="Question index" />
                
              </div>
              <span className='text-gray-400'>:</span>
              <div className='flex flex-col'>
               {/* <label  className='text-xs' htmlFor="opindex">Option</label> */}
                <input value={lastQuestionOptionIndexId} onChange={(e) => setLastQuestionOptionIndexId(e.target.value)} className="rounded-lg w-[60px]  outline-none border-2 text-gray-400 bg-black/2 border-gray-300 focus:border-[#D7DDFF] text-xs h-[30px] px-2" type="text" id='opindex' placeholder="Option index" />
                
              </div>
              <button disabled={loader} onClick={handleDump} className='bg-[#6674BB] text-white px-2 py-1 text-sm rounded-lg cursor-pointer hover:shadow-2xl' type="submit">{loader ? 'Dumping...' : 'Dump'}</button>
            </div>
            
    </form>
  )
}

export default DBDump