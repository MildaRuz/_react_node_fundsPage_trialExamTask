import './index.css';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import CreateNewFund from './pages/CreateNewFund';
import FundsList from './pages/FundsList';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div className=" ">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/funds" element={<FundsList />} />
        <Route path="/create-fund" element={<CreateNewFund />} />
      </Routes>
    </div>
  );
}
