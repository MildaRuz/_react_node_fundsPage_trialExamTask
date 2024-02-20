import './index.css';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import CreateNewFund from './pages/CreateNewFund';
import EditFund from './pages/EditFundPage';
import FundsList from './pages/FundsList';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <div className=" ">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/funds" element={<FundsList />} />
        <Route path="/create-fund" element={<CreateNewFund />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/edit-fund/:idea_id" element={<EditFund />} />
      </Routes>
    </div>
  );
}
