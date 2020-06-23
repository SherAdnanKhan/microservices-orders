import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../common/avatar';

const Invited = ({ invitedUsers }) => {
  return (
    <div>
      <div className="favas-row">
        {invitedUsers &&
          invitedUsers.map((user, index) => (
            <div className="favas-box" key={index}>
              <div className="favas-avatar">
                <Link to={`/dashboard/studio/${user.slug}`}  >
                  <Avatar avatars={user && user.avatars} feelColor={user && user.feel_color} />
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Invited;
