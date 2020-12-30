import React from 'react';
import { convertHexToRGBA, formatDate, formatTime } from '../../../utils/helperFunctions';
import LinkPreview from '../../common/linkPreview';
import MessageOptions from './messageOptions';

const OutgoingMessage = ({ data, conversation, index, messagesLength, onDeleteMessage, feelColor }) => {
  return (
    <div
      className="message-row group"
    >

      <div className='outgoing'>
        <div className="messageDots clickable">
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          <MessageOptions
            onDeleteMessage={() => onDeleteMessage(data.id)}
            feelColor={feelColor}
          />
        </div>
        <div className="user-message">
          {conversation?.participants.length === 2 &&
            <div className={index === messagesLength - 1 ? 'send-icon high' : 'send-icon'}>
              {data.messages_logs.length > 0
                ? data.messages_logs[0].status === 1
                  ? <img
                    alt=""
                    src={`/assets/images/${data.messages_logs[0].feel.color}.png`}
                    style={{
                      opacity: "1",
                      boxShadow: `0 0 20px ${data.messages_logs[0].feel.color}`
                    }} />
                  : <img
                    alt=""
                    src={`/assets/images/${data.messages_logs[0].feel.color}.png`}
                    style={{ opacity: "0.3" }} />
                : <img src="/assets/images/avatarblack.png" alt="" />
              }
            </div>
          }
          <div className="text"
            style={{
              backgroundColor: convertHexToRGBA(data.feel.color_code, .6),
              borderColor: data.feel.color_code,
              boxShadow: `1px 1px 10px ${data.feel.color_code}, -1px -1px 10px ${data.feel.color_code}`
            }}
          >
            {data.message}
            {data.web_url &&
              <LinkPreview
                url={data.web_url}
                metas={data.metas}
              />
            }
            {data.type === 1 &&
              <div className="msgImg">
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={data.url}
                    alt=""
                  />
                </a>
              </div>
            }
            {data.type === 2 &&
              <div className="msgVideo">
                <video width="320" height="240" controls>
                  <source src={data.url} type="video/mp4" />
                  <source src={data.url} type="video/ogg" />
                  <source src={data.url} type="video/mov" />
                  <source src={data.url} type="video/mpeg" />
                  Your browser does not support the video tag.
              </video>
              </div>
            }
            {data.type === 3 &&
              <div className="msgDocument">
                <i className="fas fa-file-alt"></i>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  Document
                                    </a>
              </div>
            }
          </div>
        </div>
        {conversation?.participants.length > 2 &&
          <div className={index === messagesLength - 1 ? 'send-icon high' : 'send-icon'}>
            {data?.messages_logs?.map(log => (
              <>
                {log.status === 1 &&
                  <img alt=""
                    src={`/assets/images/${log.feel.color}.png`}
                  />
                }
              </>
            ))}
          </div>
        }
        {data.created_at &&
          <p className='time'>
            {data.created_at === 'now'
              ? 'now'
              : `${formatDate(data.created_at)} AT ${formatTime(data.created_at)}`
            }
          </p>
        }
      </div>
    </div>
  );
}

export default OutgoingMessage;
