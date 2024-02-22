import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { baseApiUrl } from '../helper';
import useAPIData from '../hooks/useAPIData';
import { useAuthContext } from '../store/AuthCtxtProvider';

export default function EditAndConfirmFund() {
  const navigate = useNavigate();

  const { idea_id } = useParams();

  const [idea, setIdea] = useAPIData(`${baseApiUrl}/funds/${idea_id}`);

  console.log('idea=====', idea);

  const { token } = useAuthContext();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      img_url: idea.img_url ?? '',
      idea_name: idea.idea_name ?? '',
      author_name: idea.author_name ?? '',
      description: idea.description ?? '',
      rise_funds: idea.rise_funds ?? '',
      admin_confirmation: idea.admin_confirmation ?? false,
    },
    validationSchema: Yup.object({
      img_url: Yup.string().min(3).max(255),
      idea_name: Yup.string().min(3).max(255).required('Idea name is required field'),
      author_name: Yup.string().min(3).max(128).required('Author is required field'),
      description: Yup.string().min(10),
      rise_funds: Yup.string().min(2).required('Rising fund is required field'),
      admin_confirmation: Yup.boolean(),
    }),
    onSubmit: (values) => {
      values = { ...values, admin_confirmation: !!values.admin_confirmation };
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
        toast.success('Fund edited or confirmed successfuly');
      })
      .catch((error) => toast.error(error.resp.data));
  }

  return (
    <div className="container mx-5 my-5 ">
      <h1 className="text-3xl mb-4 ">
        Edit and Confirm <span className="text-green-400">{idea.idea_name}</span> Fund
      </h1>
      <div className="grid grid-cols-1 gap-2 border-2 border-green-100 justify-between p-3">
        <div className="py-2">
          <img className="size-img block" src={idea.img_url} />
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
                    value={formik.values.admin_confirmation}
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
              <div className="sm:col-span-3">
                <label htmlFor="img_url" className="block text-sm font-medium leading-6 text-gray-900">
                  Fund image url
                </label>
                <div className="mt-2">
                  <input
                    type="img_url"
                    name="img_url"
                    id="img_url"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                    value={formik.values.img_url}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  ></input>
                  {formik.touched['img_url'] && formik.errors['img_url'] && (
                    <p className="text-red-600">{formik.errors['img_url']}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="sm:col-span-3">
                <label htmlFor="idea_name" className="block text-sm font-medium leading-6 text-gray-900">
                  Your idea title
                </label>
                <div className="mt-2">
                  <input
                    type="idea_name"
                    name="idea_name"
                    id="idea_name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                    value={formik.values.idea_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  ></input>
                  {formik.touched['idea_name'] && formik.errors['idea_name'] && (
                    <p className="text-red-600">{formik.errors['idea_name']}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="author_name" className="block text-sm font-medium leading-6 text-gray-900">
                  Author Name
                </label>
                <div className="mt-2">
                  <input
                    id="author_name"
                    name="author_name"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                    value={formik.values.author_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  ></input>
                  {formik.touched['author_name'] && formik.errors['author_name'] && (
                    <p className="text-red-600">{formik.errors['author_name']}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="rise_funds" className="block text-sm font-medium leading-6 text-gray-900">
                  Your raising fund
                </label>
                <div className="mt-2">
                  <input
                    id="rise_funds"
                    name="rise_funds"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                    value={formik.values.rise_funds}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  ></input>
                  {formik.touched['rise_funds'] && formik.errors['rise_funds'] && (
                    <p className="text-red-600">{formik.errors['rise_funds']}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                    value={formik.values['description']}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  ></textarea>
                  {formik.touched['description'] && formik.errors['description'] && (
                    <p className="text-red-600">{formik.errors['description']}</p>
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
