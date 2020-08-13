import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../common/avatar';

const SPRFVS = ({ sprfvsUsers }) => {
  return (
    <div>
      <div className="favas-row">
        {Array.isArray(sprfvsUsers) && sprfvsUsers.length === 0 &&
          <p>No Super Favourite User Exists</p>
        }
        {sprfvsUsers &&
          sprfvsUsers.map((user, index) => (
            <div className="favas-box" key={index}>
              <div className="favas-avatar">
                <Link to={`/dashboard/studio/${user.slug}`}  >
                  <Avatar avatars={user && user.avatars} feelColor={user && user.feel.color_code} />
                </Link>
              </div>
              <div>
                <p>{user && user.first_name}</p>
                <p>{user && user.art && user.art.name}</p>
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

export default SPRFVS;
