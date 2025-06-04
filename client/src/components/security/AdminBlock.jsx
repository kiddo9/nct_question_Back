import React from 'react'
import { useAuth } from './Authentication';
import { LockKeyhole } from 'lucide-react';

const useAdminBlock = () => {
    const { user } = useAuth();

    const message = (
        <div className="flex flex-col items-center max-w-[100vw]  lg:w-[calc(100vw-245px)] justify-center h-[calc(100vh-100px)]">
            <LockKeyhole className="w-16 h-16 text-black mb-4" />
            <h1 className="text-2xl mx-auto text-center font-bold text-red-500">Access Denied</h1>
            <div className="text-center text-gray-500">
              You do not have permission to access this page. Please contact your administrator.
            </div>
        </div>
    ) 

    if (!user || !user.role || user.role.roles != "admin") {
        return { message, blocked: true };
    } else {
        return { message: null, blocked: false };
    }
}

export default useAdminBlock