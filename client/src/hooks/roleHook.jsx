import React, { useEffect, useState } from 'react'
import Api from '../api/Api';
import { toast } from 'react-toastify';

const useRoleHook = () => {
    const [loader, setLoader] = useState(false);
    const [getRoles, setGetRoles] = useState([]);

    useEffect(() => {
        setLoader(true);
        const fetchRoles = async() => {
            try {
                const result = await Api.get("/admin/roles")
                const response = result.data;
                if (response.status !== true) {
                    toast.error(response.message);
                    return;
                }
                setGetRoles(response.roles);
            } catch (error) {
                console.log(error);
            }finally{
                setLoader(false);
            }
            
        }
        fetchRoles();
    }, [])
    
  return { getRoles, loader}
}

export default useRoleHook