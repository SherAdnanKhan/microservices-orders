import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../services/httpService';

const LinkPreview = ({ url }) => {
  const [data, setData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  const getScrappedData = useCallback(async () => {
    try {
      const response = await http.get(`metas?url=${url}`);
      setData(response.data);
      setHasLoaded(true);
    } catch (ex) {
      setHasLoaded(true);
    }
  }, [url]);

  useEffect(() => {
    getScrappedData();
  }, [getScrappedData]);

  const handleOpenUrl = () => {
    window.open(url);
  }

  return (
    <>
      {hasLoaded &&
        <>
          {!data.title && !data.image && !data.description && !data.favicon
            ? (
              <>{url}</>
            ) : (
              <div className="linkPreview clickable" onClick={handleOpenUrl}>
                {data?.image &&
                  <div className="image">
                    <img
                      src={data?.image}
                      className="img"
                      alt=""
                    />
                  </div>
                }
                <div className="title">
                  <h4> {data?.title} </h4>
                  <p> {data?.description}</p>
                </div>
                <div className="linkIcon">
                  <div className="icon">
                    {data?.favicon
                      ? <img src={data?.favicon} className="iconImg" alt="" />
                      : <img src={data?.image} className="iconImg" alt="" />
                    }
                  </div>
                  <div className="link">
                    <Link to={data?.url}>{data?.url}</Link>
                  </div>
                </div>
              </div>
            )
          }
        </>
      }
      {!hasLoaded && <> {url} </>}
    </>
  );
};

export default LinkPreview;
