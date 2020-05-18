import React, { lazy, Suspense, useEffect, useState } from 'react';
import Header from './layout/header';
import LeftBorder from './layout/leftBorder';
import RightBorder from './layout/rightBorder';
import Footer from './layout/footer';
import { useLocation } from 'react-router-dom';
import ChangeColor from './layout/changeColor';


const Main = () => {
  const [color, setColor] = useState('red');
  const location = useLocation();
  const split = location.pathname.split('/');

  const Component = lazy(() => {
    switch (split[2]) {
      case 'lobby':
        return import('./lobby');
      case 'my-studio':
        return split[3] === 'profile'
          ? import('./profile')
          : import('./myStudio');
      case 'change-password':
        return import('./settings/changePassword');
      case 'faving':
        return import('./faving');
      case 'studio':
        return import('./studio/studio');
      case 'mz-flash':
        return import('./mzFlash');
      case 'viewpost':
        return import('./viewPost');
      case 'privacy':
        return import('./privacy');
      default:
        return import('./lobby');
    }

  });

  useEffect(() => {
    if (localStorage.color)
      setColor(JSON.parse(localStorage.getItem('color')));
  }, []);

  const handleColorChange = color => {
    setColor(color);
    localStorage.setItem('color', JSON.stringify(color));
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
