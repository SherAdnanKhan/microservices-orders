import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../../common/avatar';
import Spinner from '../../common/spinner';
import { Link } from "react-router-dom";
import { getUserFavGelleries } from "../../../actions/galleryActions";
import UserContext from "../../../context/userContext";

const FaveGalleries = () => {
  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const {
    loading: { loading },
    gallery: { userFavGalleries }
  } = useSelector(state => state);

  // const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(getUserFavGelleries(currentUser.id));
  }, [dispatch, currentUser.id]);

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
      {userFavGalleries &&
        <div className="favas-row">
          {userFavGalleries &&
            userFavGalleries.fav_galleries.map((gallery, index) => (
              <div className="favas-box" key={index}>
                <div className="favas-avatar">
                  <Link to={`/dashboard/studio/${gallery.user.slug}`}  >
                    <Avatar avatars={gallery?.user?.avatars} feelColor={gallery?.user?.feel_color} />
                  </Link>
                </div>
                <div className="details">
                  <p>{gallery?.user?.first_name}</p>
                  <p>{gallery?.user?.art?.name}</p>
                  <p>
                    {gallery?.user.art &&
                      <>
                        {gallery?.user.art.parent && <> {gallery?.user.art.parent.name + '/'} </>}
                        {gallery?.user.art.name && <> {gallery?.user.art.name} </>}
                      </>
                    }
                  </p>
                  <p>{gallery?.title}</p>
                  <div className="gallery-cover">
                    <img src={gallery?.image?.path} alt="" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}
export default FaveGalleries;