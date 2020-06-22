import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeelHistory } from '../../actions/userActions';
import { formatDate } from '../../utils/helperFunctions';
import Pagination from '../common/paginatiion';

const FeelHistory = () => {
  const dispatch = useDispatch();
  const { user: { feelHistory } } = useSelector(state => state);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getFeelHistory(page));

  }, [dispatch, page]);

  const handlePageChange = (page_number) => {
    console.log(page_number);
    setPage(page_number);
    dispatch(getFeelHistory(page_number));
  }



  return (
    <div className={`feel-history-page`}>
      <table>
        <thead>
          <tr>
            <th>Feel Color</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {
            feelHistory &&
            feelHistory.user_feel_list.data.map((feel_history, index) => (
              <tr key={index}>
                <td>{feel_history.feel}</td>
                <td>{formatDate(feel_history.created_at)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination pages={5} page={page} onPageChange={handlePageChange} />
    </div>
  );
}

export default FeelHistory;
