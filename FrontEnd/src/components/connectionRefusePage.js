import React from 'react';
import unavailableImg from '../images/unavilable.jpg'

const ConnectionRefuse=()=> {
  return(

    <div style={{backgroundColor: 'white', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img style={{width: '50%'}} src={unavailableImg} />
        <div style={{fontSize:'130%',marginBottom:'3%'}}>This page is temporarily unavailable.</div>
        <div style={{fontSize:'120%',marginBottom:'3%'}}>Please try again soon.</div>
      </div>
    </div>

    
  )
}

export default ConnectionRefuse;
