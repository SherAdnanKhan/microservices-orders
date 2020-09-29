import React from 'react';
import UserCube from '../../common/userCube';
import VerticalSlider from '../../common/verticalSlider';
import HorizontalSlider from '../../common/horizontalSlider';

const UserSection = ({
  activeUserList, favouriteUsers, sprfvsUsers,
  faveAndSprfvsUsers, onActiveUser
}) => {

  return (
    <div className="col-2 box-1">
      {activeUserList === 1 &&
        <VerticalSlider>
          {sprfvsUsers &&
            sprfvsUsers.map((user, index) => (
              <div
                className={index === 0 ? 'item active' : 'item'}
                key={index}
                onClick={() => onActiveUser(user)}
              >
                <div className="cube">
                  <UserCube user={user} />
                </div>
              </div>
            ))
          }
        </VerticalSlider>
      }
      {(activeUserList === 2 || activeUserList === 4) &&
        <VerticalSlider>
          {favouriteUsers &&
            favouriteUsers.map((user, index) => (
              <div
                className={index === 0 ? 'item active' : 'item'}
                key={index}
                onClick={() => onActiveUser(user)}
              >
                <div className="cube">
                  <UserCube user={user} />
                </div>
              </div>
            ))
          }
        </VerticalSlider>
      }

      {activeUserList === 3 &&
        <VerticalSlider>
          {faveAndSprfvsUsers &&
            faveAndSprfvsUsers.map((user, index) => (
              <div
                className={index === 0 ? 'item active' : 'item'}
                key={index}
                onClick={() => onActiveUser(user)}
              >
                <div className="cube">
                  <UserCube user={user} />
                </div>
              </div>
            ))
          }
        </VerticalSlider>
      }
      {activeUserList === 1 &&
        <HorizontalSlider>
          {sprfvsUsers &&
            sprfvsUsers.map((user, index) => (
              <div
                className="item"
                key={index}
                onClick={() => onActiveUser(user)}
              >
                <UserCube user={user} />
              </div>
            ))
          }
        </HorizontalSlider>
      }
      {(activeUserList === 2 || activeUserList === 4) &&
        <HorizontalSlider>
          {favouriteUsers &&
            favouriteUsers.map((user, index) => (
              <div
                className="item"
                key={index}
                onClick={() => onActiveUser(user)}
              >
                <UserCube user={user} />
              </div>
            ))
          }
        </HorizontalSlider>
      }

      {activeUserList === 3 &&
        <HorizontalSlider>
          {faveAndSprfvsUsers &&
            faveAndSprfvsUsers.map((user, index) => (
              <div
                className="item"
                key={index}
                onClick={() => onActiveUser(user)}
              >
                <UserCube user={user} />
              </div>
            ))
          }
        </HorizontalSlider>
      }
    </div>
  );
};

export default UserSection;
