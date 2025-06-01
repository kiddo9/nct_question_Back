import React from 'react'
import useValidation from '../../components/security/Validations';

const EmailNotify = () => {
    const { email } = useValidation();
  return (
    <div className=" h-screen pb-10 pt-20 flex mx-auto">
      <div className="rounded-[20px] max-w-[400px] w-full slideDown pt-5 transition-opacity duration-300 ease-in shadow-2xl h-fit bg-white/30 backdrop-blur-xs mx-auto">
        <header className=" w-full px-3 py-2 flex flex-row items-center bg-[#D7DDFF]">
          <h1 className="text-xl mx-auto font-bold">Email Notification</h1>
        </header>
        <div className="px-3 py-5">
          <p className="text-center text-sm font-semibold">
            An email has been sent to your inbox {email} with instructions to reset your password.
          </p>
          <p className="text-center text-xs mt-2">
            If you do not receive the email, please check your spam folder or contact support at 
            &nbsp;
            <a
              href="mailto:support@techneo.ng"
              className="text-[#6699ff] font-semibold"
            > support@techneo.ng</a>
          </p>
        </div>
      </div>
    </div>

  )
}

export default EmailNotify