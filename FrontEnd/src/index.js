import ReactDOM from 'react-dom/client';
import App from './App';
import WellCome from './components/wellComePage';
import indexPageCss from './css/indexPage.module.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{ height: '100%', width: '100%',position:'absolute',display:'flex',justifyContent:'center',alignItems:'center'}}>
    {!sessionStorage.getItem("displayed")&&
      <div className={indexPageCss.wellComeContainer}>
        <WellCome/>
      </div>
    }
    <App /> 
  </div>   
);



/*
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
*/