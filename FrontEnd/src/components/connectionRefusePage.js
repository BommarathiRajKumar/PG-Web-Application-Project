import React from 'react';
import unavailableImg from '../images/unavilable.jpg'

const ConnectionRefuse=()=> {
  return(
    <div style={{backgroundColor: 'white', width: '100%', height: '100%', display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
      <img style={{width: '50%'}} src={unavailableImg}  alt='unavailable img'/>
      <div style={{fontSize:'130%',marginBottom:'3%'}}>Temporarily unavailable.</div>
      <div style={{fontSize:'120%',marginBottom:'3%'}}>Please try again soon.</div>
    </div>   
  )
}

export default ConnectionRefuse;
