import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../../../actions/authActions';
import { convertHexToRGBA } from '../../../../utils/helperFunctions';

const NotificationType = ({
  notification, onApprovedRequest,
  onRejectedRequest, onReadNotification,
  feelColor
}) => {
  const getNotificationText = notification => {
    switch (notification.type) {
      case "REPOST EXHIBIT":
        return `${notification?.sender?.username} reposted your exhibit.`;
      case "CRITIQES":
        return `${notification?.sender?.username} commented on your exhibit.`;
      case "GALLERY FAVED":
        return `${notification?.sender?.username} faved your gallery.`;
      case "SPRFVS APPROVED":
        return `${notification?.sender?.username} approved your SPRFVS request.`;
      case "SPRFVS INVITE":
        return notification.status
          ? `You have approved or rejected SPRFVS request sent by ${notification?.sender?.username}`
          : `${notification?.sender?.username} sent you SPRFVS request.`;
      case "REPOST FEED":
        return `${notification?.sender?.username} reposted your feed.`;
      case "STROKE FEED":
        return `${notification?.sender?.username} stroked your feed.`;
      case "COMMENT FEED":
        return `${notification?.sender?.username} commented on your feed.`;
      case "STROKE EXHIBIT":
        return `${notification?.sender?.username} stroked your exhibit`;
      default:
        return '';
    }
  }

  const getNotificationLink = notification => {
    const currentUser = getCurrentUser();

    switch (notification.type) {
      case "REPOST EXHIBIT":
        return `/viewpost/${notification?.notifyable?.slug}`;
      case "CRITIQES":
        return `/viewpost/${notification?.notifyable?.slug}`;
      case "GALLERY FAVED":
        return `/studio/${notification?.sender?.slug}`;
      case "SPRFVS APPROVED":
        return `/my-studio/sprfvs/${currentUser?.slug}`;
      case "SPRFVS INVITE":
        return `/my-studio/sprfvs/${currentUser?.slug}`;
      case "STROKE EXHIBIT":
        return `/viewpost/${notification?.notifyable?.slug}`;
      default:
        return '';
    }
  }

  const handleRead = (notification, e) => {
    e.preventDefault();

    const link = getNotificationLink(notification);
    onReadNotification(notification, link)
  }

  return (
    <Link
      to="#"
      onClick={(e) => handleRead(notification, e)}
    >
      {notification?.type === "SPRFVS INVITE"
        ? (
          <div className="sprfvs">
            <div className="sprfvsSection" >
              <div className="image">
                <img
                  src={notification?.sender?.avatars[0]?.path}
                  alt="image5"
                />
              </div>
              <div className="sprfvsContent">
                <h4>{getNotificationText(notification)}</h4>
                <p>{notification?.created_at}</p>
              </div>
              <div className="unreadDot"></div>
            </div>
            {!notification.status &&
              <div className="actionBtn">
                <button
                  className="confirm"
                  style={{ background: convertHexToRGBA(feelColor, 1) }}
                  onClick={(e) => onApprovedRequest(
                    { privacy_type_id: 3, user_id: notification?.sender.id },
                    notification,
                    e
                  )}
                >
                  Approve
              </button>
                <button
                  className="delete"
                  style={{ background: convertHexToRGBA(feelColor, 0.7) }}
                  onClick={(e) => onRejectedRequest(
                    { privacy_type_id: 3, user_id: notification?.sender.id },
                    notification,
                    e
                  )}
                >
                  Reject
              </button>
              </div>
            }
          </div>
        ) : (
          <div className="singleNotification">
            <div
              className="notificationAlert"
              style={{
                background: !notification.status
                  && convertHexToRGBA(notification?.sender?.feel.color_code, 0.2)
              }}
            >
              <div className="image">
                <img
                  src={notification?.sender?.avatars[0]?.path}
                  alt="image5"
                />
              </div>
              <div className="notificationContent">
                <h4>{getNotificationText(notification)}</h4>
                <p>{notification?.created_at}</p>
              </div>
              <div
                className={!notification.status ? "unreadDot" : ""}
                style={{
                  background: !notification.status &&
                    convertHexToRGBA(notification?.sender?.feel.color_code, 1)
                }}
              >
              </div>
            </div>
          </div>
        )
      }
    </Link>
  );
};

export default NotificationType;
