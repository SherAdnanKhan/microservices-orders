import React from 'react';
import { Link } from 'react-router-dom';
import UserCube from '../../common/userCube';

const UserSection = ({ activeTab, favouriteUsers, sprfvsUsers, faveAndSprfvsUsers }) => {
  return (
    <div className="col-2 box-1">
      <i className="fa fa-caret-up fa-3x"></i>
      {activeTab === 1 &&
        <div className="box-css">
          <div id="demo">
            <div className="cv-carousel">
              {sprfvsUsers &&
                sprfvsUsers.map((user, index) => (
                  <div className="item" key={index}>
                    <Link to={`/dashboard/studio/${user.slug}`} key={index} >
                      <UserCube user={user} />
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
      {activeTab === 2 &&
        <div className="box-css">
          <div id="demo">
            <div className="cv-carousel">
              {favouriteUsers &&
                favouriteUsers.map((user, index) => (
                  <div className="item" key={index}>
                    <Link to={`/dashboard/studio/${user.slug}`} key={index} >
                      <UserCube user={user} />
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
      {activeTab === 3 &&
        <div className="box-css">
          <div id="demo">
            <div className="cv-carousel">
              {faveAndSprfvsUsers &&
                faveAndSprfvsUsers.map((user, index) => (
                  <div className="item" key={index}>
                    <Link to={`/dashboard/studio/${user.slug}`} key={index} >
                      <UserCube user={user} />
                    </Link>
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
