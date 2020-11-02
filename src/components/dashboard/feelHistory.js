import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeelHistory } from '../../actions/userActions';
import { formatDateTime } from '../../utils/helperFunctions';
import Pagination from '../common/paginatiion';

const FeelHistory = () => {
  const dispatch = useDispatch();
  const { user: { feelHistory } } = useSelector(state => state);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getFeelHistory(page));

  }, [dispatch, page]);

  const handlePageChange = (page_number) => {
    setPage(page_number);
    dispatch(getFeelHistory(page_number));
  }

  let tablePagination = "";
  if (feelHistory && feelHistory?.user_feel_list) {
    let pages = Math.ceil(parseInt(feelHistory?.user_feel_list?.total / parseInt(feelHistory?.user_feel_list?.per_page)))
    tablePagination = <Pagination pages={pages + 1} page={page} onPageChange={handlePageChange} />
  }

  return (
    <div className={`feel-history-page`}>
      <table>
        <thead>
          <tr>
            <th>Feel Color</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {
            feelHistory &&
            feelHistory?.user_feel_list?.data?.map((feel_history, index) => (
              <tr key={index}>
                <td>{feel_history.feel.color}</td>
                <td>{formatDateTime(feel_history.created_at)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {tablePagination}
    </div>
  );
}

export default FeelHistory;
