import React, { useState, useRef } from 'react';
import HTMLFlipBook from "react-pageflip";

function Book() {
  const data = [
   {
    id : 2,
    image : '/books/cover-2.jpg'
   },
   {
    id : 3,
    image : '/books/cover-3.jpg'
   },
   {
    id : 4,
    image : '/books/cover-4.jpg'
   },
   {
    id : 5,
    image : '/books/cover-5.jpg'
   },
  ];

  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = data.length + 1; // +1 for cover

  const nextPage = () => {
    bookRef.current.pageFlip().flipNext();
  };

  const prevPage = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  const goToPage = (e) => {
    const pageNumber = parseInt(e.target.value);
    bookRef.current.pageFlip().flip(pageNumber);
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <HTMLFlipBook
        width={370}
        height={500}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        ref={bookRef}
        onFlip={onFlip}
      >
        <div className="page" >
          <div className="page-content">
            <img
              src="/books/cover-1.jpg"
              alt="Pokémon Logo"
      
            />
          </div>
        </div>

        {data.map((item,i) => (
          <div className="page" key={i}>
            <div className="page-content">
              <img
                  src={item.image}
                  alt={item.image}
                />
            </div>
          </div>
        ))}
      </HTMLFlipBook>

      {/* Navigation */}
      <div className="mt-8 flex flex-col items-center space-y-3 w-full max-w-md">
        <div className="flex justify-between items-center w-full px-4">
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ◀ Previous
          </button>

          <button
            onClick={nextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next ▶
          </button>
        </div>

        <input
          type="range"
          min={0}
          max={totalPages - 1}
          value={currentPage}
          onChange={goToPage}
          className="w-full accent-blue-600"
        />

        <p className="text-sm text-gray-700">
          Page <span className="font-semibold">{currentPage + 1}</span> of {totalPages}
        </p>
      </div>
    </div>
  );
}

export default Book;
