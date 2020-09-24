import React from 'react';
import { useSelector } from 'react-redux';

const FavTabs = ({ tabs, activeTab, onTabChange }) => {
  const { feelColor } = useSelector(state => state.feelColor);

  return (
    <div
      className="fav-container"
      style={{ backgroundColor: feelColor }}
    >
      <div className="back-icon">
      </div>
      <div className="actions">
        {tabs &&
          tabs.map((tab, index) => (
            <button
              style={{backgroundColor:feelColor}}
              className={activeTab === tab.id &&'btn-active'}
              key={index}
              onClick={() => onTabChange(tab.id)}
              disabled={activeTab === tab.id ?true: false}
            >
              {tab.value}
            </button>
          ))}
      </div>
    </div>
  );
};
export default FavTabs;