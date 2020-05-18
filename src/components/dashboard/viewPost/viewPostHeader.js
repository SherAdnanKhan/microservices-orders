import React from 'react';
import { useHistory } from 'react-router-dom';

const ViewPostHeader = ({ post }) =>{
  const history = useHistory();

  return(
    <div className="veiw-post-header-bar">
      {/* <div className="view-back-icon"> */}
        <i className="fa fa-arrow-left clickable view-back-icon" onClick={() => history.push('/dashboard/lobby')} />
      {/* </div> */}
  {post && post.post && <p>{post.post.title}: {post && post.post && post.post.user && post.post.user.username}</p>}
  </div>
  )
}
export default ViewPostHeader