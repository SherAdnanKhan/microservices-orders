import React,{useState} from "react";
import { convertHexToRGBA } from "../../../utils/helperFunctions";

const Notification=({feelColor})=>{
  const [isRead,setIsRead]=useState(false);
  console.log("background color=",feelColor);

  const clearDot=()=>{
    const element=document.getElementById("dot");
    console.log("el=",element)
    if(element)
    {
      setIsRead(true)
      // element.style.display = "none";
  
    }

  }

  return(
    <div className="notification" >
      <div className="numbers">3</div>
    <i className="fa fa-bell" aria-hidden="true" />
    <div className="dropdown-content">
      <div className="header" style={{background:feelColor}} >
        <h4>Notifications</h4>
      </div>
      {/* Stroke Section Starts */}
      <div 
      className={isRead ? "notificationAlert read" 
      :"notificationAlert unRead"}
      onClick={clearDot}>
        <div className="image"> 
          <img src="/assets/images/salman.jpg" alt="image5" />
        </div>
        <div className="notificationContent">
          <h4>Salman Saleem stroked your post.</h4>
          <p>December 8, 2020</p>
        </div>
        <div className="unreadDot" id="dot"></div>
      </div>

      {/* Critiqued Section Starts  */}
      <div className="notificationAlert" >
        <div className="image">
          <img src="/assets/images/manan.jpeg" alt="image4" />
        </div>
        <div className="notificationContent">
          <h4>Abdul Manan Critiqued on your post.</h4>
          <p>December 8, 2020</p>
        </div>
        <div className="unreadDot"></div>
      </div>

      {/* Faved Section Starts  */}
      <div 
         className={isRead ? "notificationAlert read" 
         :"notificationAlert unRead"}
         onClick={clearDot}
      >
        <div className="image">
          <img src="/assets/images/salman.jpg" alt="image3" />
        </div>
        <div className="notificationContent">
          <h4>Ahad Ali faved your gallery.</h4>
          <p>December 9, 2020</p>
        </div>
        <div className="unreadDot"></div>
      </div>

      {/* Repost Section Starts */}
      <div className="notificationAlert" >
        <div className="image">
          <img src="/assets/images/salman.jpg" alt="image1" />
        </div>
        <div className="notificationContent">
          <h4>Salman Saleem resposted a post.</h4>
          <p>December 7, 2020</p>
        </div>
        <div className="unreadDot"></div>
      </div>

      {/* SPRFVS Section Starts */}
      <div className="sprfvs">
        <div className="sprfvsSection" >
          <div className="image">
            <img src="/assets/images/salman.jpg" alt="image1" />
          </div>
          <div className="sprfvsContent">
            <h4>Alizey Shah sent you sprfvs request.</h4>
            <p>December 7, 2020</p>
          </div>
          
          <div className="unreadDot"></div>
        </div>
        <div className="actionBtn">
          <button className="confirm"  style={{background:convertHexToRGBA(feelColor,1)}}>Confirm</button>
          <button className="delete"  style={{background:convertHexToRGBA(feelColor,0.7)}}>Delete</button>
        </div>
      </div>

      {/* Show more Section Starts */}
      <div className="showMore" style={{background:feelColor}}>
        <h4>Show more</h4>
      </div>
    </div>
  </div>
  )
}
export default Notification;
