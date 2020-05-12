import React, { lazy, Suspense, useEffect, useState } from 'react';
import Header from './layout/header';
import LeftBorder from './layout/leftBorder';
import RightBorder from './layout/rightBorder';
import Footer from './layout/footer';
import { useLocation } from 'react-router-dom';


const Main = () => {
  const [color, setColor] = useState('red');
  const location = useLocation();
  const split = location.pathname.split('/');

  const Component = lazy(() => {
    switch (split[2]) {
      case 'lobby':
        return import('./lobby');
      case 'exibition':
        return import('./addExibition');
      case 'change-password':
        return import('./settings/changePassword');
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
      <Header onColorChange={handleColorChange} />
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
