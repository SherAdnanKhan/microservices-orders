import React from 'react';
import Header from './layout/header';
import LeftBorder from './layout/leftBorder';
import RightBorder from './layout/rightBorder';
import { Route, Switch } from 'react-router-dom';
import ChangeColor from './layout/changeColor';
import { useDispatch } from 'react-redux';
import { changeFeelColor } from '../../actions/colorActions';
import Lobby from './lobby/lobby';
import ChangePassword from './settings/changePassword';
import Faving from './faves/faving';
import FaveBy from './faves/faveBy';
import SprfvsUser from './faves/sprfvsUsers';
import FaveGalleries from './faves/faveGalleries';
import GalleryFollowers from './faves/galleryFollowers';
import MyStudio from './myStudio/myStudio';
import Studio from './studio/studio';
import MzFlash from './mzFlash';
import MzFlashGroup from './mzFlashGroup/mzFlashGroup';
import Privacy from './privacy/privacy';
import Chat from './chat/chat';
import FeelHistory from './feelHistory';
import MyVault from './vault/myVault';
import Footer from './layout/footer';

const Main = () => {
  const dispatch = useDispatch();

  const handleColorChange = colorId => {
    dispatch(changeFeelColor(colorId));
  };

  return (
    <div className='frameReady'>
      <Header />
      <ChangeColor onColorChange={handleColorChange} />
      <LeftBorder />
      <RightBorder />
      <Footer />
      <Switch>
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/change-password" component={ChangePassword} />

        <Route exact path="/my-studio/fave-galleries/:id" component={FaveGalleries} />
        <Route exact path="/my-studio/gallery-followers/:slug" component={GalleryFollowers} />
        <Route exact path="/my-studio/sprfvs/:slug" component={SprfvsUser} />
        <Route exact path="/my-studio/fave" component={Faving} />
        <Route exact path="/my-studio/fave-by" component={FaveBy} />
        <Route exact path="/my-studio" component={MyStudio} />

        <Route exact path="/studio/gallery-followers/:slug" component={GalleryFollowers} />
        <Route exact path="/studio/fave-galleries/:id" component={FaveGalleries} />
        <Route exact path="/studio/sprfvs/:slug" component={SprfvsUser} />
        <Route exact path="/studio/fave" component={Main} />
        <Route exact path="/studio/fave-by" component={Main} />
        <Route exact path="/studio/:slug" component={Studio} />

        <Route exact path="/mz-flash/:slug" component={MzFlash} />
        <Route exact path="/mz-flash-group" component={MzFlashGroup} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/chat/:slug?" component={Chat} />
        <Route exact path="/feel-history" component={FeelHistory} />
        <Route exact path="/my-vaults" component={MyVault} />
      </Switch>
    </div>
  )
}

export default Main;
