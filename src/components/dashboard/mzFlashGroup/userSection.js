import React from 'react';
import UserCube from '../../common/userCube';

const UserSection = ({
  activeUserList, favouriteUsers, sprfvsUsers,
  faveAndSprfvsUsers, onActiveUser
}) => {
  return (
    <div className="col-2 box-1">
      <i className="fa fa-caret-up fa-3x"></i>
      {activeUserList === 1 &&
        <div className="box-css">
          <div id="demo">
            <div className="cv-carousel">
              {sprfvsUsers &&
                sprfvsUsers.map((user, index) => (
                  <div className="item" key={index} onClick={() => onActiveUser(user)}>
                    <UserCube user={user} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
      {activeUserList === 2 &&
        <div className="box-css">
          <div id="demo">
            <div className="cv-carousel">
              {favouriteUsers &&
                favouriteUsers.map((user, index) => (
                  <div className="item" key={index} onClick={() => onActiveUser(user)}>
                    <UserCube user={user} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
      {activeUserList === 3 &&
        <div className="box-css">
          <div id="demo">
            <div className="cv-carousel">
              {faveAndSprfvsUsers &&
                faveAndSprfvsUsers.map((user, index) => (
                  <div className="item" key={index} onClick={() => onActiveUser(user)}>
                    <UserCube user={user} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
      <i className="fa fa-caret-down fa-3x"></i>
    </div>
  );
};

export default UserSection;
