import React from 'react'
import { Edit, Trash2, Eye} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserRow = ({ user, selectedRows, toggleSelectRow }) => {
    const nav = useNavigate();
    // console.log(user);
    const StatusBadge = ({ status }) => {
        let bgColor = '';
        let statusText = '';
        
        if(status) {
          bgColor = 'bg-green-100 text-green-800';
          statusText = 'Verified';
        } else {
          bgColor = 'bg-red-100 text-red-800';
          statusText = 'Unverified';
        }
        
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
            {statusText}
          </span>
        );
      };

      const TrueFalseBadge = ({ status }) => {
        let bgColor = '';
        let statusText = '';
        
        if(status) {
          bgColor = 'bg-blue-100 text-blue-800';
          statusText = 'Yes';
        } else {
          bgColor = 'bg-yellow-100 text-yellow-800';
          statusText = 'No';
        }
        
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
            {statusText}
          </span>
        );
      };

      const PassWordSetBadge = ({ status }) => {
        let bgColor = '';
        let statusText = '';
        
        if(status) {
          bgColor = 'bg-green-100 text-green-800';
          statusText = 'Yes';
        } else {
          bgColor = 'bg-gray-100 text-gray-800';
          statusText = 'No';
        }
        
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
            {statusText}
          </span>
        );
      };

  return (
    <tr 
    key={user.id} 
    className={`${selectedRows.includes(user.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
    >
    <td className="p-4">
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        checked={selectedRows.includes(user.id)}
        onChange={() => toggleSelectRow(user.id)}
      />
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {user.id}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      {user.name}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      {user.role}
    </td>
    <td className="px-4 py-4 text-sm text-gray-700 max-w-xs truncate">
      {user.email}
      
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      <TrueFalseBadge status={user.loggedIn} />
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      <PassWordSetBadge status={user.password && String(user.password).trim() !== ''} />
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <StatusBadge status={(user.password && String(user.password).trim() !== '') && user.email_verified == 1} />
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      {new Date(user.createdAt).toUTCString()}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div className="flex justify-end space-x-2">
        <button className="text-blue-600 hover:text-blue-900">
          <Eye size={18} />
        </button>
        <button onClick={() => nav(`/admin/user/admins/edit/${user.id}`)} className="text-green-600 hover:text-green-900">
          <Edit size={18} />
        </button>
        <button className="text-red-600 hover:text-red-900">
          <Trash2 size={18} />
        </button>
      </div>
    </td>
  </tr>
  )
}

export default UserRow