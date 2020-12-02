import React, { useEffect } from 'react';
import UserCube from '../../common/userCube';
import VerticalSlider from '../../common/verticalSlider';
import HorizontalSlider from '../../common/horizontalSlider';
import { useDispatch, useSelector } from "react-redux";
import { getFavouriteGalleryUsers } from "../../../actions/lobbyActions";
import useViewport from '../../common/useViewport';

const UserSection = ({
  activeUserList, sprfvsUsers,
  faveAndSprfvsUsers, onActiveUser, activeTab
}) => {
  const dispatch = useDispatch();
  const {
    lobby: { favouriteUsers },
  } = useSelector(state => state);

  const breakpoint = 856;
  const { width } = useViewport();

  useEffect(() => {
    dispatch(getFavouriteGalleryUsers())
  }, [dispatch]);

  return (
    <div className="col-2 box-1">
      {width > breakpoint
        ? (
          <>
            {activeUserList === 1 &&
              <div style={{ overflowY: 'auto', height: '40vh' }}>
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
              </div>
            }
            {(activeUserList === 2 || activeUserList === 4) &&
              <div style={{ overflowY: 'auto', height: '40vh' }}>
                <VerticalSlider>
                  {favouriteUsers &&
                    favouriteUsers.data.map((user, index) => (
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
              </div>
            }

            {activeUserList === 3 &&
              <div style={{ overflowY: 'auto', height: '40vh' }}>
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
              </div>
            }
          </>
        ) : (
          <>
            {/* {activeUserList === 1 &&
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
            } */}
            {activeUserList === 2 &&
              <div style={{ overflowX: 'auto' }}>
                <HorizontalSlider>
                  {favouriteUsers &&
                    favouriteUsers.data.map((user, index) => (
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
              </div>
            }

            {activeUserList === 3 &&
              <div style={{ overflowX: 'auto' }}>
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
              </div>
            }
          </>
        )
      }
    </div>
  );
};

export default UserSection;
