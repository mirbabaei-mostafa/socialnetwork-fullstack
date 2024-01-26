import React from 'react';
import Header from '../components/header/Header';

const Home = () => {
  return (
    <div className="container flex flex-col">
      <div className="w-full h-12 bg-white shadow-md shadow-gray-600">
        <Header />
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
};

export default Home;
