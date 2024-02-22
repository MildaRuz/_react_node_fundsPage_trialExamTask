import './index.css';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import CreateNewFund from './pages/CreateNewFund';
import DonatePage from './pages/DonatePage';
import EditAndConfirmFund from './pages/EditAndConfirmFundPage';
import FundsList from './pages/FundsList';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPrivateRoute from './PrivateRoutes/AdminPrivateRoute';

export default function App() {
  return (
    <div className=" ">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/funds" element={<FundsList />} />
        <Route path="/donate-fund/:idea_id" element={<DonatePage />} />
        <Route path="/create-fund" element={<CreateNewFund />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        <Route
          path="/edit-fund/:idea_id"
          element={
            <AdminPrivateRoute>
              <EditAndConfirmFund />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
