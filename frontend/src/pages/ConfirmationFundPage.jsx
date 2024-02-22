import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { baseApiUrl } from '../helper';
import useAPIData from '../hooks/useAPIData';
import { useAuthContext } from '../store/AuthCtxtProvider';

export default function ConfirmationFundPage() {
  const navigate = useNavigate();

  const { idea_id } = useParams();

  const [idea, setIdea] = useAPIData(`${baseApiUrl}/funds/${idea_id}`);

  const { token } = useAuthContext();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      admin_confirmation: '',
    },
    validationSchema: Yup.object({
      admin_confirmation: Yup.boolean(),
    }),
    onSubmit: (values) => {
      sendFundUpdateData(values);
    },
  });

  function sendFundUpdateData(data) {
    axios
      .put(`${baseApiUrl}funds/${idea_id}`, data, {
        headers: { Authorization: token },
      })
      .then((resp) => {
        navigate('/funds');
        toast.success('Fund confirmed successfuly');
      })
      .catch((error) => toast.error(error.resp));
  }
  return (
    <div className="container mx-5 my-5 ">
      <h2 className="text-2xl mb-4 ">
        Confirm <span className="text-green-400">{idea.idea_name}</span> Fund
      </h2>
      <div key={idea.idea_id} className="grid grid-cols-1 gap-2 border-2 border-green-100 justify-between p-3">
        <div className="py-2">
          <img className="size-img block" src={idea.img_url} />
          <div className="text-green-400 text-sm my-2">{idea.description}</div>
        </div>

        <div className="max-w-96 mt-4 border-2 border-green-300 rounded-md p-4 flex justify-center">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="sm:col-span-3">
                <label htmlFor="admin_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm fund
                </label>
                <div className="mt-2">
                  <select
                    id="admin_confirmation"
                    name="admin_confirmation"
                    value={formik.values['admin_confirmation']}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-36 text-center"
                  >
                    <option>Pending approval</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                  {formik.touched['admin_confirmation'] && formik.errors['admin_confirmation'] && (
                    <p className="text-red-600">{formik.errors['admin_confirmation']}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-green-400 hover:bg-green-700 px-3 py-2 text-sm font-semibold text-green-950 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
