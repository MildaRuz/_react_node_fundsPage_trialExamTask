import '../App.css';

import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { baseApiUrl } from '../helper';
import useAPIData from '../hooks/useAPIData';
import { useAuthContext } from '../store/AuthCtxtProvider';

export default function DonatePage() {
  const navigate = useNavigate();

  const { idea_id } = useParams();

  const { token } = useAuthContext();

  const [fundsList, setFundsList] = useAPIData(`${baseApiUrl}funds/${idea_id}`);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      author_name: fundsList.author_name ?? '',
      donation_sum: '',
    },
    validationSchema: Yup.object({
      author_name: Yup.string().min(3).max(128).required('Author is required field'),
      donation_sum: Yup.string().min(1).required('Donation sum is required'),
    }),
    onSubmit: (values) => {
      sendFundData(values);
    },
  });

  function sendFundData(data) {
    axios
      .post(`${baseApiUrl}funds/donated`, data, {
        headers: { Authorization: token },
      })
      .then((resp) => {
        navigate('/funds');
        toast.success('Donated successfuly');
      })
      .catch((error) => toast.error(error.resp));
  }
  return (
    <div className="container mx-5 my-5 ">
      <h1 className="text-4xl mb-4 ">
        You will donate for <span className="text-green-400">{fundsList.idea_name}</span> fund
      </h1>
      <div key={fundsList.idea_id} className="grid grid-cols-1 gap-2 border-2 border-green-100 justify-between p-3">
        <div className="py-2">
          <img className="size-img block" src={fundsList.img_url} />
          <div className="text-green-400 my-2">{fundsList.description}</div>
        </div>

        <div className="max-w-96 mt-4 border-2 border-green-300 rounded-md p-4 flex justify-center">
          <form onSubmit={formik.handleSubmit}>
            <div className="sm:col-span-3">
              <label htmlFor="author_name" className="block text-sm font-medium leading-6 text-gray-900">
                Author Name
              </label>
              <div className="mt-2">
                <input
                  id="author_name"
                  name="author_name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.author}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['author_name'] && formik.errors['author_name'] && (
                  <p className="text-red-600">{formik.errors['author_name']}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="donation_sum" className="block text-sm font-medium leading-6 text-gray-900">
                Donation sum
              </label>
              <div className="mt-2">
                <input
                  id="donation_sum"
                  name="donation_sum"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  value={formik.values.donation_sum}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></input>
                {formik.touched['donation_sum'] && formik.errors['donation_sum'] && (
                  <p className="text-red-600">{formik.errors['donation_sum']}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-green-400 hover:bg-green-700 px-3 py-2 text-sm font-semibold text-green-950 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Donate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
