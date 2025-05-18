import React, { useEffect, useState } from 'react';
import { Search, Filter, Trash2, Plus } from 'lucide-react';
import QuestionPagination from './QuestionPagination';
import QuestionTable from './QuestionTable';
import useQuestionHook from '../../hooks/questionHook';
import { useQuestionGroupHook } from '../../hooks/questionGroupHook';
import AddButton from '../AddButton';
import useSectionHook from '../../hooks/sectionHook';
import { Link } from 'react-router-dom';
// Sample data 


// Main component
export default function QuestionBank() {
  const { getQuestion, loader } = useQuestionHook()
  const { questionGroups, loader: groupLoader } = useQuestionGroupHook()
  const { sections, loader: sectionLoader } = useSectionHook()

  

  const questionsWithGroup = getQuestion.map(question => ({
    ...question,
    group: questionGroups.find(group => group.id === question.q_group_id)?.title,
    section: sections.find(section => section.id == question.section_id)?.section_name
  }))

  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [numberPerPage, setNumberPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter questions based on search term
  const filteredQuestions = questions.filter(question => 
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.type.toLowerCase().includes(searchTerm.toLowerCase())
  
  );

  useEffect(() => {
    setQuestions(questionsWithGroup);
    // console.log(questionsWithGroup);
  }, [loader, groupLoader]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to the filtered questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Toggle select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === sortedQuestions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedQuestions.map(q => q.id));
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
  const handleBulkDelete = () => {
    setQuestions(questions.filter(question => !selectedRows.includes(question.id)));
    setSelectedRows([]);
  };

  // Status badge component


  return (
    <div className="rounded-lg lg:px-2 py-8 max-w-[100vw]  lg:w-[calc(100vw-245px)]">
      <div className="flex flex-col space-y-4 bg-white rounded-2xl shadow px-10 py-6">
        {/* Header section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-(--primary-color)">Question Bank</h2>
          <Link to={'/admin/user/questions/create'}>
            <AddButton>Add Question</AddButton>
          </Link>
        </div>
        
        {/* Search and filters */}
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="flex space-x-2">
            {selectedRows.length > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center space-x-1"
              >
                <Trash2 size={16} />
                <span>Delete ({selectedRows.length})</span>
              </button>
            )}
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md flex items-center space-x-1">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto w-full">
          <QuestionTable 
            loader={loader}
            groupLoader={groupLoader}
            sectionLoader={sectionLoader}
            sortedQuestions={sortedQuestions} 
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
        <QuestionPagination questions={questionsWithGroup} sortedQuestions={sortedQuestions} currentPage={currentPage} setCurrentPage={setCurrentPage} numberPerPage={numberPerPage} setNumberPerPage={setNumberPerPage} />
      </div>
    </div>
  );
}
