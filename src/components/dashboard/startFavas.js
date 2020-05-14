import React from 'react';
import { Link } from 'react-router-dom';

const StartFaves = () =>{

  return(
  <div className="start-favas">
    <div className="start-favas-box">
      <h3>GETTING STARTED</h3>
      <p>Welcome usman there are many other exibitions for you to see and enjoy and many other artist for you to meet</p>
      <h1>>></h1>
    </div>
    <div className="start-favas-card">
      <div className="start-favas-card-header">
         <h4>Aries</h4>
         <p>hfjksdf</p>
         <h4>Web Designer/Programmer</h4>
      </div>
      <div className="start-favas-card-body">
        <div className="start-favas-card-images">
          <div className="start-favas-card-single">
            <img src="/assets/images/pic1.png" alt="" />
          </div>
          <div className="card-images-set">
            <img src="/assets/images/pic2.png" alt="" />
            <img src="/assets/images/pic2.png" alt="" />
            <img src="/assets/images/pic2.png" alt="" />
            <img src="/assets/images/pic2.png" alt="" />
            <img src="/assets/images/pic2.png" alt="" />
          </div> 
        </div>
        <div>
          <h2>Gallery</h2>
        </div>
      </div>
      <div className="start-favas-card-footer">
       <Link to="/dashboard/lobby">
         <img style={{ width:"20%"}} src="/assets/images/catfave.png"  alt=""/>
       </Link>
       <h3>ADD TO FAV'S</h3>

      </div>
    </div>
  </div>
)
}
export default StartFaves