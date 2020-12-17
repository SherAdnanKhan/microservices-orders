import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../common/avatar';

const Request = ({ userRequests, onApprovedRequest, onRejectedRequest }) => {
  return (
    <div>
      <div className="favas-row">
        {userRequests &&
          userRequests.map((user, index) => (
            <div className="favas-box" key={index}>
              <div className="favas-avatar">
                <Link to={`/studio/${user.slug}`}>
                  <Avatar
                    user={user}
                  />
                </Link>
              </div>
              <div>
                <p>{user.first_name}</p>
                <p>{user.art && user.art.name}</p>
                <p>
                  {user.art &&
                    <>
                      {user.art.parent && <> {user.art.parent.name + '/'} </>}
                      {user.art.name && <> {user.art.name} </>}
                    </>
                  }
                </p>
                <p>Faving Gallery</p>
                <p>2</p>
              </div>
              <div className="actions">
                <button
                  style={{ backgroundColor: user.feel.color_code }}
                  onClick={() => onApprovedRequest({ privacy_type_id: 3, user_id: user.id }, user)}
                >
                  Approve
                </button>
                <button
                  style={{ backgroundColor: user.feel.color_code }}
                  className="opacity"
                  onClick={() => onRejectedRequest({ privacy_type_id: 3, user_id: user.id })}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Request;
