import React from "react";

const Pagination = (props) => {
  let tabPages = [];
  for (let index = 1; index <= props.pages; index++) {
    tabPages.push(<div onClick={() => props.onPageChange(index)} className={index === props.page ? 'pagination-button active' : 'pagination-button'} key={index}>{index}</div>);
  }
  return (
    <div className="pagination pagination-responsive">
      {tabPages}
    </div>
  )

}
export default Pagination;