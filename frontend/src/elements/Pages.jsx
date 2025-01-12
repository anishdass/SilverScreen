import { useMovieContext } from "../contexts/MovieContext";

function Pages() {
  const { totalPages, currentPage, setCurrentPage } = useMovieContext();

  const maxPageNumbersToShow = 5;
  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <nav aria-label='...'>
      <ul className='pagination'>
        {/* First */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className='page-link'
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}>
            First
          </button>
        </li>

        {/* Previous */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className='page-link'
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
            Previous
          </button>
        </li>

        {/* Next */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}>
          <button
            className='page-link'
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </li>

        {/* Last */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}>
          <button
            className='page-link'
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}>
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pages;
