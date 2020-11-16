import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../../common/avatar';
import Spinner from '../../common/spinner';
import { Link, useRouteMatch } from "react-router-dom";
import { getGallery } from "../../../actions/galleryActions";

const GalleryFollowers = () => {
  const dispatch = useDispatch();
  const { params: { slug } } = useRouteMatch();

  const {
    loading: { loading },
    gallery: { gallery }
  } = useSelector(state => state);

  // const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(getGallery(slug));
  }, [dispatch, slug]);

  // const handleChange = ({ target: input }) => {
  //   setQuery(input.value);
  //   dispatch(getFavourites(input.value))
  // };

  return (
    <div className="favas">
      {loading && <Spinner />}
      {/* <div className="search-input">
        <input
          autoFocus
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        </div> */}
      {gallery &&
        <div className="favas-row">
          {gallery &&
            gallery.faved_users.map((user, index) => (
              <div className="favas-box" key={index}>
                <div className="favas-avatar">
                  <Link to={`/studio/${user.slug}`}>
                    <Avatar
                      user={user}
                    />
                  </Link>
                </div>
                <div className="details">
                  <p>{user?.first_name}</p>
                  <p>{user?.art?.name}</p>
                  <p>
                    {user.art &&
                      <>
                        {user.art.parent && <> {user.art.parent.name + '/'} </>}
                        {user.art.name && <> {user.art.name} </>}
                      </>
                    }
                  </p>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}
export default GalleryFollowers;