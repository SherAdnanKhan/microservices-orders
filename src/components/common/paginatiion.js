import React from "react";

const Pagination = (props) => {
  console.log(props);
  let tabPages = [];
  for (let index = 1; index <= props.pages; index++) {
    tabPages.push(<div key={index}>{index}</div>);
  }
  return (
    <div className="pagination pagination-responsive">
      {tabPages}
    </div>
  )

}
export default Pagination;