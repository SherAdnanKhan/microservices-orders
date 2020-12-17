import React, { useState, useEffect } from "react";
import { convertHexToRGBA } from "../../../../utils/helperFunctions";
import ToolTip from "react-tooltip";
import {
  approveNotificationRequest,
  rejectNotificationRequest,
  getAllNotifications,
  getNotificationCount,
  readNotification
} from "../../../../actions/notificationsActions";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../../../common/loader";
import { useHistory } from "react-router-dom"
import NotificationType from "./notificationType";

const Notification = ({ feelColor }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { notifications, notificationCount, notificationLoader } = useSelector(state => state.notification)
  const [currentNotificationPage, setNotifcationPage] = useState(1);

  useEffect(() => {
    dispatch(getNotificationCount)
  }, [dispatch])

  const handleNotifications = () => {
    dispatch(getAllNotifications());
  }

  const handleReadNotification = (notification, link) => {
    !notification.status && dispatch(readNotification(notification?.id));
    link && history.push(link);
  }

  const fetchNextNotifications = () => {
    dispatch(getAllNotifications(currentNotificationPage + 1));
    setNotifcationPage(currentNotificationPage => currentNotificationPage + 1)
  }

  const handleApprovedRequest = (request, notification, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(approveNotificationRequest(request, notification));
  }

  const handleRejectedRequest = (request, notification, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(rejectNotificationRequest(request, notification));
  }

  return (
    <div className="notification">
      <div
        onClick={handleNotifications}
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
          {notifications?.data?.map((notification) => (
            <NotificationType
              key={notification.id}
              notification={notification}
              onApprovedRequest={handleApprovedRequest}
              onRejectedRequest={handleRejectedRequest}
              onReadNotification={handleReadNotification}
              feelColor={feelColor}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}
export default Notification;
