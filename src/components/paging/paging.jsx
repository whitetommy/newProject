import React from "react";
import Pagination from "react-js-pagination";
import styles from "./paging.module.css";

const Paging = ({ page, count, setPage }) => {
  return (
    <div>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={setPage}
        innerClass={`${styles.pagination} pagination`} // 여기서 커스텀 스타일 적용
        itemClass={styles.pageItem} // 수정됨
        linkClass={styles.pageLink} // 수정됨
        activeClass={styles.activePageItem} // 수정됨
        activeLinkClass={styles.active}
      />
    </div>
  );
};

export default Paging;
