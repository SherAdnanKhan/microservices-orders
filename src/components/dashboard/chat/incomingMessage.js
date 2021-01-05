import React from 'react';
import { convertHexToRGBA, formatDate, formatTime } from '../../../utils/helperFunctions';
import Avatar from '../../common/avatar';
import LinkPreview from '../../common/linkPreview';
import Video from '../../common/video';

const IncomingMessage = ({ data }) => {
  return (
    <div className="message-row group">
      <div className='incoming'>
        {data.type === 4 ?
          <div className="call-info-div">
            <p> {data.message} at {`${formatDate(data.created_at)} AT ${formatTime(data.created_at)}`}</p>
          </div>
          :
          <div>
            <div className="user-message">
              <Avatar
                user={data.user}
              />
              <div
                className='text'
                style={{
                  backgroundColor: convertHexToRGBA(data.feel.color_code, 0.3),
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
                {data.type === 5 &&
                  <div className="msgVideo">
                    <Video url={data.url} />
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
            {data.created_at &&
              <p className='time'>
                {`${formatDate(data.created_at)} AT ${formatTime(data.created_at)}`}
              </p>
            }
          </div>
        }


      </div>
    </div>
  );
}

export default IncomingMessage;
