import React from 'react';
import { Link } from 'react-router-dom';


const LinkPreview = ({ metas, url }) => {
  const handleOpenUrl = () => {
    window.open(url);
  }

  return (
    <>

      {metas
        ? (
          <>
            {!metas.title && !metas.image && !metas.description && !metas.favicon
              ? (
                <>{url}</>
              ) : (
                <div className="linkPreview clickable" onClick={handleOpenUrl}>
                  {metas?.image &&
                    <div className="image">
                      <img
                        src={metas?.image}
                        className="img"
                        alt=""
                      />
                    </div>
                  }
                  <div className="title">
                    <h4> {metas?.title} </h4>
                    <p> {metas?.description}</p>
                  </div>
                  <div className="linkIcon">
                    <div className="icon">
                      {(metas?.favicon || metas?.image) &&
                        <img
                          src={metas?.favicon || metas?.image || ''}
                          className="iconImg"
                          alt=""
                        />
                      }
                    </div>
                    <div className="link">
                      <Link to={metas?.url}>{metas?.url}</Link>
                    </div>
                  </div>
                </div>
              )
            }
          </>
        ) : (
          <>{url}</>
        )
      }

    </>
  );
};

export default LinkPreview;
