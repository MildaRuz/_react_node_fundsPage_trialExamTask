import '../index.css';

import axios from 'axios';
import React from 'react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useAPIData from '../hooks/useAPIData';
import { useAuthContext } from '../store/AuthCtxtProvider';

const fundsUrl = 'http://localhost:3000/api/funds';

export default function FundsList() {
  const [fundsList, setFundsList] = useAPIData(fundsUrl);
  const [filterValue, setFilterValue] = useState('');

  const { isUserAdmin, token, isUserLoggedIn } = useAuthContext();

  const navigate = useNavigate();

  function handleDelete(id) {
    const currentUrl = `${fundsUrl}/${id}`;
    axios
      .delete(currentUrl, {
        headers: { Authorization: token },
      })
      .then((ats) => {
        // console.log('ats ===', ats);
        console.log('list', fundsList);
        console.log('ats.data ===', ats.data);
        setFundsList(fundsList.filter((fund) => fund.idea_id !== id));
        navigate('/funds', { replace: true });
        toast.success(`Fund is deleted`);
      })
      .catch((error) => {
        console.warn('handleDelete ivyko klaida:', error);
        console.warn('handleDelete ivyko klaida:', error.response);
      });
  }

  function handleDonate(id) {
    navigate(`/donate-fund/${id}`);
  }

  function handleEdit(id) {
    navigate(`/edit-fund/${id}`);
  }

  // const filteredFunds = useMemo(() => {
  //   return fundsList.filter(
  //     (fund) =>
  //       fund.title.toLowerCase().includes(filterValue.toLowerCase()) ||
  //       fund.author.toLowerCase().includes(filterValue.toLowerCase()) ||
  //       fund.description.toLowerCase().includes(filterValue.toLowerCase()) ||
  //       fund.year.toString().includes(filterValue.toString())
  //   );
  // }, [fundsList, filterValue]);

  // const handleFilterChange = (event) => {
  //   setFilterValue(event.target.value);
  // };

  return (
    <div className="container mx-auto max-w-[1200px] mx-5 my-5">
      <h1 className="text-4xl mb-4 text-center">Very Nice Funds List</h1>
      {/* <div className="mt-5 mb-5">
        <label htmlFor="filter" className="block text-m font-medium leading-6 text-gray-900">
          Search for a fund
        </label>
        <input
          id="filter"
          name="filter"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
          type="text"
          onChange={handleFilterChange}
        />
      </div> */}
      <div className="grid grid-cols-3 gap-4 border-2 border-green-500 p-4">
        {fundsList.map((fund) => (
          <div key={fund.idea_id} className="grid grid-cols-1 gap-2 border-2 border-green-100 justify-between p-3">
            <div className="">
              <img className="block mx-auto" src={fund.img_url} />
              {isUserAdmin && (
                <div className="py-2">
                  {fund.admin_confirmation === 1 ? (
                    <span className="text-green-600 font-bold">Confirmed</span>
                  ) : (
                    <span className="text-red-600 font-bold">Pending approval</span>
                  )}
                </div>
              )}
              <div className="text-green-400 font-bold">{fund.idea_name}</div>
              <div className="py-2">by {fund.author_name}</div>
              <div className="text-sm">Raise funds: {fund.rise_funds}</div>
              <div className="text-sm py-2 min-h-16">Description: {fund.description}</div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDonate(fund.idea_id)}
                  className="bg-green-400 hover:bg-green-700 text-green-950 font-bold py-2 px-4 rounded-md"
                >
                  Donate
                </button>
              </div>

              {isUserAdmin && (
                <>
                  <button
                    onClick={() => handleEdit(fund.idea_id)}
                    className="bg-green-400 hover:bg-green-700 text-green-950 font-bold mt-2 py-2 px-4 rounded-md mr-2"
                  >
                    Confirm or Edit fund
                  </button>

                  <button
                    onClick={() => handleDelete(fund.idea_id)}
                    className="bg-red-400 hover:bg-red-700 text-red-950 font-bold mt-2 py-2 px-3 rounded-md"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
