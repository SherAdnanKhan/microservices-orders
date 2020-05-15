import React from 'react';
import { Link } from 'react-router-dom';

const StartFaves = () =>{

  return(
    <div class="wrapper fav-page">
      <div class="f-text-box">
        <h3 class="f-title">GETTING STARTED</h3>
        <p class="f-paragrah">Welcome usman there are many other exibitions for you to see and enjoy and many other artist for you to meet</p>
        <h1>>></h1>
      </div>
    <div class="f-image-box">
      <div class="f-header">
        <h4>Aries</h4>
        <p>hfjksdf</p>
        <h4>Web Designer/Programmer</h4>
      </div>
      <div class="f-gallery-box">
        <div class="f-img-box">
          <div class="main-img">
            <img src="/assets/images/pic1 (1).png" alt="avatar" />
          </div>
          <div class="other-img">
            <img src="/assets/images/pic1 (1).png" alt="avatar" />
            <img src="/assets/images/pic1 (1).png" alt="avatar" />
            <img src="/assets/images/pic1 (1).png" alt="avatar" />
            <img src="/assets/images/pic1 (1).png" alt="avatar" />
          </div>
        </div>
        <h2>Gallery</h2>
      </div>
      <div class="f-footer">
        <Link to="/dashboard/lobby">
          <img style={{ display: 'flex',justifyContent: 'center', margin: 'auto'}} 
               src="/assets/images/catfave.png" 
               alt="avatar" 
          />
        </Link>
        <h3 class="f-footer-text">ADD TO FAV'S</h3>
      </div>
    </div>
  </div>

)
}
export default StartFaves