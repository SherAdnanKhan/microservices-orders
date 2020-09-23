import React from 'react';
import { useHistory } from 'react-router-dom';
import ToolTip from "../../common/toolTip/toolTip";

const ViewPostHeader = ({ post }) => {
  const history = useHistory();

  return (
    <div
      className="veiw-post-header-bar"
      style={{ backgroundColor: post?.user.feel.color_code }}
    >
      {/* <div className="view-back-icon"> */}
      <i className="fa fa-arrow-left clickable view-back-icon"
        onClick={() => history.goBack()}
        data-for="back"
        data-tip="back"
      />
      <ToolTip position="left" id="back" />
      {/* </div> */}
      {post &&
        <p>{post.title}: {post.user.username}</p>
      }
    </div>
  )
}
export default ViewPostHeader