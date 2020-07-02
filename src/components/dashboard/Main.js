import React, { lazy, Suspense, useEffect, useState, useContext } from 'react';
import Header from './layout/header';
import LeftBorder from './layout/leftBorder';
import RightBorder from './layout/rightBorder';
import Footer from './layout/footer';
import { useLocation } from 'react-router-dom';
import ChangeColor from './layout/changeColor';
import { useDispatch } from 'react-redux';
import { changeFeelColor } from '../../actions/colorActions';
import UserContext from '../../context/userContext';


const Main = () => {
  const [color, setColor] = useState('red');
  const location = useLocation();
  const split = location.pathname.split('/');

  const dispatch = useDispatch();
  const user = useContext(UserContext);

  const Component = lazy(() => {
    switch (split[2]) {
      case 'lobby':
        return import('./lobby/lobby');
      case 'my-studio':
        return split[3] === 'profile'
          ? import('./profile')
          : split[3] === 'fave'
            ? import('./faves/faving')
            : split[3] === 'fave-by'
              ? import('./faves/faveBy')
              : split[3] === 'sprfvs'
                ? import('./myStudio/sprfvsUsers')
                : import('./myStudio/myStudio')
      case 'change-password':
        return import('./settings/changePassword');
      case 'fave':
        return import('./faves/faving');
      case 'fave-by':
        return import('./faves/faveBy');
      case 'studio':
        return split[3] === 'fave'
          ? import('./faves/faving')
          : split[3] === 'fave-by'
            ? import('./faves/faveBy')
            : import('./studio/studio');
      case 'mz-flash':
        return import('./mzFlash');
      case 'mz-flash-group':
        return import('./mzFlashGroup/mzFlashGroup');
      case 'viewpost':
        return import('./viewPost/viewPost');
      case 'privacy':
        return import('./privacy/privacy');
      case 'chat':
        return import('./chatBox');
      case 'group-chat':
        return import('./chatBox');
      case 'conversations':
        return import('./conversation');
      case 'settings':
        return import('./layout/navBar');
      case 'feel-history':
        return import('./feelHistory');
      default:
        return import('./lobby/lobby');
    }
  });

  useEffect(() => {
    setColor(user.feel_color);
  }, [user]);

  const handleColorChange = color => {
    dispatch(changeFeelColor(color, () => {
      setColor(color);
    }));
  };

  return (
    <div className={`frameReady ${color}`}>
      <Header />
      <ChangeColor onColorChange={handleColorChange} />
      <LeftBorder />
      <RightBorder />
      <Suspense fallback={<div></div>}>
        <Component />
      </Suspense>
      <Footer />
    </div>
  )
}

export default Main;
