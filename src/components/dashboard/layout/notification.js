import React, { useState, useEffect } from "react";
import { convertHexToRGBA } from "../../../utils/helperFunctions";
import ToolTip from "react-tooltip";
import { getAllNotifications, getNotificationCount, readNotification } from "../../../actions/notificationsActions";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../actions/authActions";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../../common/loader";
import { Link } from "react-router-dom"

const Notification = ({ feelColor }) => {
  const dispatch = useDispatch();
  const { notifications, notificationCount, notificationLoader } = useSelector(state => state.notification)
  const [currentNotificationPage, setNotifcationPage] = useState(1);
  const currentUser = getCurrentUser();

  useEffect(() => {
    dispatch(getNotificationCount)
  }, [dispatch, notificationLoader, currentNotificationPage])

  const handleNotifications = () => {
    // dispatch(resetNotificationCount());
    dispatch(getAllNotifications());
  }
  const handleReadNotification = (notification) => {
    dispatch(readNotification(notification));
  }

  const fetchNextNotifications = () => {
    dispatch(getAllNotifications(currentNotificationPage + 1));
    setNotifcationPage(currentNotificationPage => currentNotificationPage + 1)
  }

  return (
    <div className="notification" onClick={handleNotifications}>
      <div
        data-tip="notifications"
        data-for="notifications"
      >
        {notificationCount > 0 &&
          <div className="numbers">{notificationCount}</div>
        }
        <i className="fa fa-bell" />
        <ToolTip id="notifications"
          position="bottom"
          backgroundColor={convertHexToRGBA(feelColor, 0.5)}
          className="tooltip-style" />
      </div>
      <div className="dropdown-content">
        <InfiniteScroll
          dataLength={notifications.data.length} //This is important field to render the next data
          next={fetchNextNotifications}
          height="87vh"
          hasMore={notifications?.next_page_url ? true : false}
          loader={
            <>
              {currentNotificationPage !== 1 && notificationLoader && <Loader />}
            </>
          }
        >
          <div className="header" style={{ background: feelColor }} >
            <h4>Notifications</h4>
          </div>
          {/* Repost  Section Starts */}
          {notifications.data.map((notification, index) => (
            notification.type === "REPOST EXHIBIT" && notification.sender_id !== currentUser.id &&
            <Link
              target="_blank"
              to={`viewpost/${notification?.notifyable?.slug}`}
            >
              < div
                key={index}
                className="notificationAlert"
                style={{ background: !notification.status && convertHexToRGBA(notification?.sender?.feel.color_code, 0.2) }}
                onClick={() => handleReadNotification(notification)}
              >
                <div className="image">
                  <img
                    src={notification?.sender?.avatars[0]?.path}
                    alt="image5"
                  />
                </div>
                <div className="notificationContent">
                  <h4>{notification?.sender?.first_name + notification?.sender?.last_name} reposted your exhibit</h4>
                  <p>{notification?.created_at}</p>
                </div>
                <div className={!notification.status && "unreadDot"}
                  style={{
                    background: !notification.status &&
                      convertHexToRGBA(notification?.sender?.feel.color_code, 1)
                  }}
                ></div>
              </div>
            </Link>
          ))}

          {/* Critiqued Section Starts  */}
          {/* <div
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
          </div> */}

          {/* Faved Section Starts  */}
          {/* <div
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
          </div> */}

          {/* SPRFVS Section Starts */}
          {/* <div className="sprfvs">
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
          </div> */}
        </InfiniteScroll>
      </div >

    </div >
  )
}
export default Notification;
