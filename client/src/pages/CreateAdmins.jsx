import React, { useState } from "react";
import CreateHeader from "../components/CreateHeader";
import CustomSelect from "../components/CustomSelect";
import { z } from "zod";
import Api from "../api/Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const CreateAdmins = () => {
  const roles = [
    { id: 1, label: "UI/UX", value: "ui-ux" },
    { id: 2, label: "Developer", value: "developer" },
    { id: 3, label: "Cloud Computing", value: "cloud-computing" },
    { id: 4, label: "Data Analyst", value: "data-analyst" },
    { id: 5, label: "Data Scientist", value: "data-scientist" },
    { id: 6, label: "Digital Marketing", value: "digital-marketing" },
    { id: 7, label: "Cyber Security", value: "cyber-security" },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();
  // const [password, setPassword] = useState('')

  const credentials = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .email({ required_error: "Email is required", message: "Invalid email" }),
    role: z.string().min(1, { message: "Role is required" }),
    // password: z.string().min(8, {message: "Password must be at least 8 characters long"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"}),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = credentials.safeParse({ name, email, role });

    if (result.success) {
      setLoader(true);
      try {
        const request = await Api.post("/admin/create", { name, email, role });
        const response = request.data;

        if (response.status !== true) {
          toast.error(response.message);
          return;
        }

        toast.success(response.message);
        setTimeout(() => {
          nav("/admin/user/admins");
        }, 2000);
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      } finally {
        setLoader(false);
      }
    } else {
      result.error.issues.map((issue) => toast.error(issue.message));
    }
  };
  return (
    <div className="rounded-lg lg:px-2 py-8 ">
      <ToastContainer />
      {loader && <Loader preload={true} />}
      <div className="flex flex-col space-y-4 bg-white rounded-2xl shadow py-2 mx-auto w-[97vw] lg:w-[calc(100vw-245px)]">
        <CreateHeader>Create New Admin User</CreateHeader>
        <div className="px-4">
          <h2>Enter User Details</h2>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-4 w-full flex flex-col justify-between pb-10 h-[60vh]"
          >
            <div className="grid grid-cols-2 gap-10 ">
              <fieldset className="mb-4 flex flex-col gap-2">
                <label className="text-sm" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="rounded-lg px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                />
              </fieldset>
              <fieldset className="mb-4 flex flex-col gap-2">
                <label className="text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="rounded-lg px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="3lMw1@example.com"
                />
              </fieldset>
              {/* <fieldset className="mb-4 flex flex-col gap-2">
                <label className="text-sm" htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-lg px-4 py-2 outline-none border-2 border-gray-300 focus:border-[#D7DDFF]" type="text" id="password" name="name" placeholder="Enter 8 digit password"/>
                <span className="text-[#6674BB] text-xs">Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character</span>
              </fieldset> */}
              <CustomSelect
                label="Role"
                options={roles}
                placeholder={"Select Role"}
                value={role}
                setValue={setRole}
              />
            </div>
            <button
              type="submit"
              className="border-2 border-[#6674BB] mx-auto text-[#6674BB] hover:bg-[#6674BB] hover:text-white px-4 py-2 rounded-lg transition duration-300 ease-in cursor-pointer hover:shadow-2xl"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmins;
