import React from 'react'
import { Edit, Trash2, Eye} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuestionRow = ({ question, selectedRows, toggleSelectRow }) => {
    const nav = useNavigate();
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
    <tr 
    key={question.id} 
    className={`${selectedRows.includes(question.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
    >
    <td className="p-4">
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        checked={selectedRows.includes(question.id)}
        onChange={() => toggleSelectRow(question.id)}
      />
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {question.id}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      {question.group}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      {question.section}
    </td>
    <td className="px-4 py-4 text-sm text-gray-700 max-w-xs truncate">
      {question.question}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      {question.type}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      {question.difficulty}
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <StatusBadge status={question.active_status} />
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
      {new Date(question.updated_at).toUTCString()}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div className="flex justify-end space-x-2">
        <button onClick={() => nav(`/admin/user/questions/preview/${question.id}`)} className="text-blue-600 hover:text-blue-900 cursor-pointer">
          <Eye size={18} />
        </button>
        <button onClick={() => nav(`/admin/user/questions/edit/${question.id}`)} className="text-green-600 hover:text-green-900">
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

export default QuestionRow