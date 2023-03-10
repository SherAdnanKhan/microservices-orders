import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../../common/avatar';
import Spinner from '../../common/spinner';
import { Link, useRouteMatch } from "react-router-dom";
import { getUserFavGelleries } from "../../../actions/galleryActions";

const FaveGalleries = () => {
  const dispatch = useDispatch();
  const { params: { id } } = useRouteMatch();

  const {
    loading: { loading },
    gallery: { userFavGalleries },
    feelColor: { feelColor }
  } = useSelector(state => state);

  // const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(getUserFavGelleries(id));
  }, [dispatch, id]);

  // const handleChange = ({ target: input }) => {
  //   setQuery(input.value);
  //   dispatch(getFavourites(input.value))
  // };\

  return (
    <div className="favas">
      <div className="faves-heading"
        style={{ backgroundColor: feelColor }}
      >
        <p className="faves-text">Faves</p>
      </div>
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
                  <Link to={`/studio/${gallery.user.slug}`}>
                    <Avatar
                      user={gallery?.user}
                    />
                  </Link>
                </div>
                <div className="details">
                  {/* <p>{gallery?.user?.first_name}</p>
                  <p>{gallery?.user?.art?.name}</p> */}
                  {/* <p>
                    {gallery.user.art &&
                      <>
                        {gallery?.user.art.parent && <> {gallery?.user.art.parent.name + '/'} </>}
                        {gallery?.user.art.name && <> {gallery?.user.art.name} </>}
                      </>
                    }
                  </p> */}
                  <Link
                    to={`/studio/${gallery?.user?.slug}/?gallery=${gallery?.id}`}
                  >
                    {gallery?.title}
                  </Link>
                  <Link
                    to={`/studio/${gallery?.user?.slug}/?gallery=${gallery?.id}`}
                  >
                    <div className="gallery-cover">
                      <img src={gallery?.image?.path} alt="" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}
export default FaveGalleries;