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
                <Link to={`/dashboard/studio/${user.slug}`}  >
                  <Avatar avatars={user?.avatars} feelColor={user?.feel_color} />
                </Link>
              </div>
              <div>
                <p>{user?.first_name}</p>
                <p>{user?.art?.name}</p>
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
                  onClick={() => onApprovedRequest({ privacy_type_id: 3, user_id: user.id })}
                >
                  Approve
                  </button>
                <button
                  className="btn-reject"
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
