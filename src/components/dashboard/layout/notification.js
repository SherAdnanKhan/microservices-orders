import React, { useState } from "react";
import { convertHexToRGBA } from "../../../utils/helperFunctions";
import ToolTip from "react-tooltip";

const Notification = ({ feelColor }) => {
  const [isRead, setIsRead] = useState(false);
  return (
    <div className="notification">
      <div
        data-tip="notifications"
        data-for="notifications"
      >
        <div className="numbers">3</div>
        <i className="fa fa-bell" />
        <ToolTip id="notifications"
          position="bottom"
          backgroundColor={convertHexToRGBA(feelColor, 0.5)}
          className="tooltip-style" />
      </div>
      <div className="dropdown-content">
        <div className="header" style={{ background: feelColor }} >
          <h4>Notifications</h4>
        </div>
        {/* Stroke Section Starts */}
        <div
          className="notificationAlert"
          style={{ background: !isRead && convertHexToRGBA(feelColor, 0.2) }}
          onClick={() => setIsRead(true)}>
          <div className="image">
            <img
              src="/assets/images/salman.jpg"
              alt="image5"
            />
          </div>
          <div className="notificationContent">
            <h4>Salman Saleem stroked your post.</h4>
            <p>Decemember 8, 2020</p>
          </div>
          <div className={!isRead && "unreadDot"}
            style={{
              background: !isRead &&
                convertHexToRGBA(feelColor, 1)
            }}
          ></div>
        </div>

        {/* Critiqued Section Starts  */}
        <div
          className="notificationAlert"
          style={{ background: !isRead && convertHexToRGBA(feelColor, 0.2) }}
          onClick={() => setIsRead(true)}>
          <div className="image">
            <img src="/assets/images/manan.jpeg" alt="image4" />
          </div>
          <div className="notificationContent">
            <h4>Abdul Manan Critiqued on your post.</h4>
            <p>December 8, 2020</p>
          </div>
          <div className={!isRead && "unreadDot"}
            style={{
              background: !isRead &&
                convertHexToRGBA(feelColor, 1)
            }}
          ></div>
        </div>

        {/* Faved Section Starts  */}
        <div
          className={isRead ? "notificationAlert"
            : "notificationAlert unRead"}
        >
          <div className="image">
            <img src="/assets/images/salman.jpg" alt="image3" />
          </div>
          <div className="notificationContent">
            <h4>Ahad Ali faved your gallery.</h4>
            <p>December 6, 2020</p>
          </div>
          <div className={isRead && "unreadDot"}
            style={{
              background: isRead &&
                convertHexToRGBA(feelColor, 1)
            }}></div>
        </div>

        {/* Repost Section Starts */}
        <div
          className="notificationAlert"
          style={{
            background: !isRead &&
              convertHexToRGBA(feelColor, 0.2)
          }}>
          <div className="image">
            <img src="/assets/images/salman.jpg" alt="image1" />
          </div>
          <div className="notificationContent">
            <h4>Salman Saleem resposted a post.</h4>
            <p>November 29, 2020</p>
          </div>
          <div className={!isRead && "unreadDot"}
            style={{
              background: !isRead &&
                convertHexToRGBA(feelColor, 1)
            }}
          ></div>
        </div>

        {/* SPRFVS Section Starts */}
        <div className="sprfvs">
          <div className="sprfvsSection" >
            <div className="image">
              <img src="/assets/images/salman.jpg" alt="image1" />
            </div>
            <div className="sprfvsContent">
              <h4>Alizey Shah sent you sprfvs request.</h4>
              <p>November 24 , 2020</p>
            </div>

            <div className="unreadDot"></div>
          </div>
          <div className="actionBtn">
            <button
              className="confirm"
              style={{ background: convertHexToRGBA(feelColor, 1) }}
            >Approve</button>
            <button
              className="delete"
              style={{ background: convertHexToRGBA(feelColor, 0.7) }}
            >Reject</button>
          </div>
        </div>

        {/* Show more Section Starts */}
        <div className="showMore" style={{ background: feelColor }}>
          <h4>Show more</h4>
        </div>
      </div>
    </div >
  )
}
export default Notification;
