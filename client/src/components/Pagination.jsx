import { useState } from "react";

const Pagination = ({ data, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    onPageChange(currentData);
  };
  return (
    <div className={`flex justify-center mt-8`}>
      <ul className="flex gap-4 mb-3">
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`border px-1 py-1 rounded-lg text-center cursor-pointer border-[#6699ff] w-7 ${
              currentPage === index + 1 ? "bg-[#6699ff] text-white" : ""
            }`}
            onClick={() => handlePageChange(index + 1)} // Pass the correct page number
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
