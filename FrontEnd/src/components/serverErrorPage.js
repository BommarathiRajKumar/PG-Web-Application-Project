import React from 'react';
import serverErr from '../images/serverErr.png'

const ServerError=()=> {
  return(
    <div style={{backgroundColor: 'white', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img style={{width: '70%'}} src={serverErr} alt="serverErrImg"/>
        <div style={{fontSize:'100%',marginBottom:'3%'}}>Please try again later.</div>
        <div style={{fontSize:'120%',marginBottom:'3%'}}>Internl Server Error</div>
        <div style={{fontSize:'150%', color:'red'}}>500</div>
      </div>
    </div> 
  )
}

export default ServerError;
