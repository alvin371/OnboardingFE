import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './page/index'
import About from './page/about'
import Foods from './page/foods'
import axios from 'axios';


axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/foods" element={<Foods />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
