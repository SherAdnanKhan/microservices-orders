import React, { lazy, Suspense } from 'react';
import Header from './layout/header';
import LeftBorder from './layout/leftBorder';
import RightBorder from './layout/rightBorder';
import { useLocation } from 'react-router-dom';
import ChangeColor from './layout/changeColor';
import { useDispatch } from 'react-redux';
import { changeFeelColor } from '../../actions/colorActions';

const Main = () => {
  const location = useLocation();
  const split = location.pathname.split('/');

  const dispatch = useDispatch();

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
                ? import('./faves/sprfvsUsers')
                : split[3] === 'fave-galleries'
                  ? import('./faves/faveGalleries')
                  : split[3] === 'gallery-followers'
                    ? import('./faves/galleryFollowers')
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
            : split[3] === 'sprfvs'
              ? import('./faves/sprfvsUsers')
              : split[3] === 'fave-galleries'
                ? import('./faves/faveGalleries')
                : split[3] === 'gallery-followers'
                  ? import('./faves/galleryFollowers')
                  : import('./studio/studio')
      case 'mz-flash':
        return import('./mzFlash');
      case 'mz-flash-group':
        return import('./mzFlashGroup/mzFlashGroup');
      case 'viewpost':
        return import('./viewPost/viewPost');
      case 'privacy':
        return import('./privacy/privacy');
      case 'chat':
        return import('./chat/chat');
      case 'settings':
        return import('./layout/navBar');
      case 'feel-history':
        return import('./feelHistory');
      default:
        return import('./lobby/lobby');
    }
  });

  const handleColorChange = colorId => {
    dispatch(changeFeelColor(colorId));
  };

  return (
    <div className='frameReady'>
      <Header />
      <ChangeColor onColorChange={handleColorChange} />
      <LeftBorder />
      <RightBorder />
      <Suspense fallback={<div></div>}>
        <Component />
      </Suspense>
    </div>
  )
}

export default Main;
