import React, { useEffect, useState } from 'react';
import { Search, Filter, Trash2, Plus } from 'lucide-react';
import AddButton from '../AddButton';
import { Link, useSearchParams } from 'react-router-dom';
import UsersTable from './UsersTable';
import UserPagination from './UserPagination';
import UserTableFilters from './UserTableFilters';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../../api/Api';
// Sample data 


// Main component
export default function Users({ getUsers, getRoles, status, loader, roleLoader }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = {
    page: searchParams.get("page") || 1, //allows for pagination via the url
    role: searchParams.get("role") || "",
    passwordSet: searchParams.get("passwordSet") || "",
    verifiedUser: searchParams.get("verifiedUser") || "",
    loggedIn: searchParams.get("loggedIn") || ""
  }

  useEffect(() => {
      if (query.page) {
        setCurrentPage(parseInt(query.page))
      }
  }, [query.page])

  // const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [numberPerPage, setNumberPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(query);
  const [showFilters, setShowFilters] = useState(false);
  const [queryFilteredUsers, setQueryFilteredUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // console.log(getUsers);
  const usersWithRoles = getUsers.map(user => ({
    ...user,
    role: getRoles.find(role => role.id == user.roles)?.roles
  }))
  // console.log(usersWithRoles);

  useEffect(() => {
    let filtered = usersWithRoles;
    // Filter users based on query parameters
    if (query.role) {
      filtered = filtered.filter(user => user.role === query.role);
    }
    if (query.passwordSet) {
      filtered = filtered.filter(user =>  query.passwordSet === 'true' 
        ?  user.password && user.password.trim() !== ''
        : !user.password || user.password.trim() == ''
      );
    }
    if (query.verifiedUser) {
      // Filter users based on email_verified status
      filtered = filtered.filter(user =>  query.verifiedUser === 'true' 
        ? user.email_verified == 1 && user.password && user.password.trim() !== ''
        : user.email_verified == 0 && (!user.password || user.password.trim() == '')
      );
    }
    if (query.loggedIn) {
      const loggedInValue = query.loggedIn === 'true'; // Convert string to boolean
      // Filter users based on logged_in status
      filtered = filtered.filter(user => user.loggedIn === Number(loggedInValue));
    }
    setQueryFilteredUsers(filtered);
  }, [getUsers, getRoles, query.role, query.passwordSet, query.verifiedUser, query.loggedIn]);

  // Filter questions based on search term
  const filteredUsers = queryFilteredUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  
  );


  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to the filtered questions
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  // const sortedUsers = [...getUsers]

  // Toggle select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === sortedUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedUsers.map(q => q.id));
    }
  };

  // Toggle select a single row
  const toggleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async() => {
    // Perform bulk delete logic
    setLoad(true);
    console.log(selectedRows)
    try {
      {/* API GOES HERE */}
      const request = await Api.delete("/admin/user/multi/delete", {
        data: {ids: selectedRows}
      })
      const response = request.data;
      if(response.status != true) {
        toast.error(response.message || "Error deleting users. Please try again.");
        return;
      }
      toast.success(response.message || "Users deleted successfully.");
      setSelectedRows([]);
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error deleting questions. Please try again.");
      console.error("Error deleting questions:", error);
    }finally {
      setLoad(false);
    }
  };

  // Status badge component


  return (
    <div className="rounded-lg lg:px-2 py-8 max-w-[100vw]  lg:w-[calc(100vw-245px)]">
      <ToastContainer/>
      <div className="flex flex-col space-y-4 bg-white rounded-2xl shadow px-10 py-6">
        {/* Header section */}
        <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 items-center">
          
            {status.map((stat) => (
              <div
                key={stat.id}
                className="flex justify-center items-center gap-2"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    stat.status === "v"
                      ? "bg-green-500"
                      : stat.status === "u"
                      ? "bg-red-500"
                      : stat.status === "a"
                      ? "bg-[#6674BB]"
                      : "bg-gray-600"
                  }`}
                ></div>
                <p
                  className={`text-sm whitespace-nowrap ${
                    stat.status === "a" &&
                    "bg-[#6674BB] text-gray-100 px-3 py-1 rounded-xl"
                  }`}
                >
                  {stat.status === "a" && `${getUsers.length}`} {stat.name}
                </p>
              </div>
            ))}
          </div>

          <Link to={'/admin/user/admins/create'}>
            <AddButton>Add User</AddButton>
          </Link>
        </div>
        
        {/* Search and filters */}
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: 1 })}}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="flex space-x-2">
            {selectedRows.length > 0 && (
              <button 
                onClick={() => setDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center space-x-1 cursor-pointer"
              >
                <Trash2 size={16} />
                <span>Delete ({selectedRows.length})</span>
              </button>
            )}
            <button onClick={() => setShowFilters(!showFilters)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm cursor-pointer px-3 py-2 rounded-md flex items-center space-x-1">
              <Filter size={16} />
              <span>
                {showFilters ? 'Collapse' : 'Expand'}
                &nbsp;Filter
              </span>
            </button>
          </div>
        </div>

        <UserTableFilters showFilters={showFilters} setShowFilters={setShowFilters} roles={getRoles} />
        
        {/* Table */}
        <div className="overflow-x-auto w-full">
          <UsersTable
            loader={loader}
            roleLoader={roleLoader}
            sortedUsers={sortedUsers} 
            selectedRows={selectedRows} 
            toggleSelectRow={toggleSelectRow} 
            toggleSelectAll={toggleSelectAll} 
            requestSort={requestSort} 
            sortConfig={sortConfig} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            numberPerPage={numberPerPage} 
          />
        </div>
        
        {/* Pagination */}
        <UserPagination getUsers={filteredUsers} sortedUsers={sortedUsers} currentPage={currentPage} setCurrentPage={setCurrentPage} numberPerPage={numberPerPage} setNumberPerPage={setNumberPerPage} />
      </div>
      {deleteModal && <MultiDeleteModal selectedRows={selectedRows} handleBulkDelete={handleBulkDelete} load={load} setDeleteModal={setDeleteModal} />}
    </div>
  );
}


const MultiDeleteModal = ({selectedRows, handleBulkDelete, load, setDeleteModal}) => {
  return (
    <div   className='absolute top-0 left-0 flex justify-center items-center backdrop-blur-xs w-full h-full z-50 '>
        <div onClick={() => setDeleteModal(false)}  className='absolute top-0 left-0 w-full h-full bg-black opacity-50'/>
       <div className='bg-white py-2 rounded-lg shadow-2xl z-10 w-[400px]'>
            <header className="bg-[#D7DDFF] w-full flex flex-row items-center px-4 py-2 shadow-md">
                <h1 className="text-xl mx-auto text-red-500">Delete User(s)</h1>
            </header>
            <p className='text-center mt-5 mb-2'>Are you sure you want to delete the user(s)?</p>
            <div className='flex justify-center gap-4 px-10 pb-3'>
                <button disabled={load} onClick={() => handleBulkDelete(selectedRows)} className='bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600'>
                    {load ? 'Deleting...' : 'Yes'}
                </button>
                <button disabled={load} onClick={() => setDeleteModal(false)} className='bg-[#6699ff] text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-2xl'>No</button>
            </div>
       </div>
    </div>
  );
}
