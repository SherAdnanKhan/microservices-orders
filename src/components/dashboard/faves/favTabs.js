import React from 'react';

const FavTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="fav-container">
      <div className="back-icon">
        {/* <i className="fa fa-arrow-left clickable" onClick={() => history.push('/dashboard/lobby')} /> */}
      </div>
      {/* {userStudio && <p>{userStudio.user.username}</p>} */}
      <div className="actions">
        {tabs &&
          tabs.map((tab, index) => (
            <button
              className={activeTab === tab.id ? "clickable btn-active" : "clickable"}
              key={index}
              onClick={() => onTabChange(tab.id)}
              disabled={activeTab === tab.id}
            >
              {tab.value}
            </button>
          ))}
      </div>
    </div>
  );
};
export default FavTabs;