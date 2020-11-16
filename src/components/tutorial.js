import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Tutorial = ({ user }) => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);
  const [tabs] = useState([
    { id: 'tab1', value: 1 },
    { id: 'tab2', value: 2 },
    { id: 'tab3', value: 3 },
    { id: 'tab4', value: 4 },
    { id: 'tab5', value: 5 },
    { id: 'tab6', value: 6 },
    { id: 'tab7', value: 7 },
    { id: 'tab8', value: 8 },
    { id: 'tab9', value: 9 },
  ]);

  return (
    <div className='wrapper tutorialScreen'>
      <div
        className={
          activeTab === 2 || activeTab === 3 || activeTab === 4
            ? 'left-menu add-left'
            : 'left-menu'
        }
        style={{ backgroundColor: user.feel.color_code }}
      >
        <div className="icons">
          <img src="/assets/images/lobbyicon.png" alt="" />
        </div>
        <div className="icons">
          <img src="/assets/images/newstudioicon.png" alt="" />
        </div>
        <div className="icons">
          <img src="/assets/images/add.png" alt="" />
        </div>
      </div>
      <div
        className={
          activeTab === 5 || activeTab === 6 || activeTab === 7
            ? 'right-menu add-right'
            : 'right-menu'
        }
        style={{ backgroundColor: user.feel.color_code }}
      >
        <div className="icons">
          <img src="/assets/images/strqicon.png" alt="" />
        </div>
        <div className="icons">
          <img src="/assets/images/mzflash.png" alt="" />
        </div>
        <div className="icons">
          <img src="/assets/images/strokeiconem.png" alt="" />
        </div>
      </div>
      {/* <div className={activeTab === 6 ? 'botom-menu add-botom' : 'botom-menu'}>

      </div> */}
      <div className="content">
        <div className="tabs-bar">
          <ul>
            <li>
              <i
                className="fas fa-chevron-left prev-btn clickable"
                onClick={() => activeTab > 1 && setActiveTab(activeTab => activeTab - 1)}
              />
            </li>
            {tabs.map(tab => (
              <li key={tab.id}>
                <div
                  id="tab1"
                  className={activeTab === tab.value ? 'dotactive' : ''}
                  onClick={() => setActiveTab(tab.value)}
                />
              </li>
            ))}
            <li>
              <i
                className="fas fa-chevron-right next-btn clickable"
                onClick={() => activeTab < 9 && setActiveTab(activeTab => activeTab + 1)}
              />
            </li>
          </ul>
        </div>
        {activeTab === 1
          && (
            <div className="tabs1">
              <p style={{ backgroundColor: user.feel.color_code }}>
                Welcome {user?.username} Here is a Qucik Introduction to your Menus
              </p>
            </div>
          )}
        {activeTab === 2
          && (
            <div className="tabs2">
              <p style={{ backgroundColor: user.feel.color_code }}>
                <strong>Lobby:</strong>
                {' '}
                The Feed of those you are faving
              </p>
            </div>
          )}

        {activeTab === 3
          && (
            <div className="tabs3">
              <p style={{ backgroundColor: user.feel.color_code }}>
                {' '}
                <strong>Studio:</strong>
                {' '}
                  your personal page whcih includes your profile,posts etc
              </p>
            </div>
          )}
        {activeTab === 4
          && (
            <div className="tabs4">
              <p style={{ backgroundColor: user.feel.color_code }}>
                <strong>Exhibit:</strong>
                {' '}
              add a post to any of your galleries
              </p>
            </div>
          )}
        {activeTab === 5
          && (
            <div className="tabs4">
              <p style={{ backgroundColor: user.feel.color_code }}>
                <strong>StrqChat:</strong>
                {' '}
              direct artist to artist communication
              </p>
            </div>
          )}
        {activeTab === 6
          && (
            <div className="tabs5">
              <p style={{ backgroundColor: user.feel.color_code }}>
                {' '}
                <strong>MzFlash:</strong>
                {' '}
              public messaging board,
              with access to the MzFlashes of artists you are faving as well.
              </p>
            </div>
          )}
        {activeTab === 7
          && (
            <div className="tabs5">
              <p style={{ backgroundColor: user.feel.color_code }}>
                {' '}
                <strong>Stroke:</strong>
                {' '}
                  one last thing, if you like something just give it a stoke,as in brush-stroke or stroke of genious
              </p>
            </div>
          )}
        {activeTab === 8
          && (
            <div className="tabs7">
              <p style={{ backgroundColor: user.feel.color_code }}>
                Click the tabs to open them, otherwise they remain out of your
                way so that you may fully enjoy the exhibits
              </p>
            </div>
          )}
        {activeTab === 9
          && (
            <div className="tabs9">
              <button
                className="clickable"
                onClick={() => history.push('/lobby')}
                style={{ backgroundColor: user.feel.color_code }}
              >
                Enjoy Meuzm
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Tutorial;
