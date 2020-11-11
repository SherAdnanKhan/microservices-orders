import React from 'react';
import { convertHexToRGBA, formatDate, formatTime } from '../../../utils/helperFunctions';
// import { ReactTinyLink } from 'react-tiny-link';
import Avatar from '../../common/avatar';

const IncomingMessage = ({ data }) => {
  return (
    <div className="message-row group">
      <div className='incoming'>
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
            {/* {getText(data.message) && getText(data.message)} */}
            {/* {getURL(data.message) &&
              <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={getURL(data.message)}
             
              />
            } */}

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
        {data.created_at &&
          <p className='time'>
            {`${formatDate(data.created_at)} AT ${formatTime(data.created_at)}`}
          </p>
        }
      </div>
    </div>
  );
}

export default IncomingMessage;
