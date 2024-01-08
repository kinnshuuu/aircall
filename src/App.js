import React from "react";

import Header from './Components/Header';
import CallDetails from './Components/CallDetails';
import Footer from './Components/Footer';
import Body from './Components/Body';
import { Routes, Route } from "react-router-dom";
import Activity from './Components/Activity'
import Archive from './Components/Archive'

const App = () => {
  return (
    <div className="flex flex-col w-[500px]   h-screen overflow-auto  m-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg ">
      <Header />
      <div className=" overflow-y-auto flex-grow ">
        <Routes>
          <Route path="/activities" element={<Activity />} />
          <Route path="/archives" element={<Archive />} />
          <Route path="/activities/:callId" element={<CallDetails />} />
          <Route path="/" element={<Body />} />
        </Routes>
      </div>
      <Footer />
    </div>

  )
}


export default App;
