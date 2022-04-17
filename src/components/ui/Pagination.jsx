import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../store/postSlice";
import "./Pagination.css";

const Pagination = () => {
  // redux
  const dispatch = useDispatch();
  const { page, pages } = useSelector((state) => state.post);

  let middlePagination;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => dispatch(changePage(idx + 1))}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;

    middlePagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <button
            key={startValue + idx + 1}
            disabled={page === startValue + idx + 1}
            onClick={() => dispatch(changePage(startValue + idx + 1))}
          >
            {startValue + idx + 1}
          </button>
        ))}

        <button>...</button>
        <button onClick={() => dispatch(changePage(pages))}>{pages}</button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button onClick={() => dispatch(changePage(1))}>1</button>
            <button>...</button>
            <button onClick={() => dispatch(changePage(startValue))}>
              {startValue}
            </button>
            {[...Array(5)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => dispatch(changePage(startValue + idx + 1))}
              >
                {startValue + idx + 1}
              </button>
            ))}

            <button>...</button>
            <button onClick={() => dispatch(changePage(pages))}>{pages}</button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <button onClick={() => dispatch(changePage(1))}>1</button>
            <button>...</button>
            <button onClick={() => dispatch(changePage(startValue))}>
              {startValue}
            </button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={
                  pages < startValue + idx + 1 ? { display: "none" } : null
                }
                onClick={() => dispatch(changePage(startValue + idx + 1))}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <div className="pagination">
        <button
          className="pagination__prev"
          onClick={() => dispatch(changePage(page - 1))}
          disabled={page === 1}
        >
          &#171;
        </button>
        {middlePagination}
        <button
          className="pagination__next"
          onClick={() => dispatch(changePage(page + 1))}
          disabled={page === pages}
        >
          &#187;
        </button>
      </div>
    )
  );
};

export default Pagination;
