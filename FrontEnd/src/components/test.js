import React from 'react';
import { useNavigate } from 'react-router-dom';
import serverErr from '../images/serverErr.png'

const Test=()=> {
    const navigate = useNavigate();
  return(

      <div style={{ textAlign: 'center', position:'fixed',height:'100%',width:'100%'}}>
        <h1 style={{position:'relative',left:'1%', top:'10%'}}>Please try again later.</h1>
        <h3 style={{position:'relative',left:'2%', top:'10%'}}>Internl Server Error</h3>
        <h1 style={{position:'relative',left:'1%', top:'10%'}}>500</h1>
        <img style={{position:'relative',left:'2%',top:'9%', width:'100%', height:'50%'}}  src={serverErr}/>
        <button style={{position:'absolute',top:'1%',left:'1%', width:'20%', height:'4%', backgroundColor:'white',color:'blue', cursor:'pointer',border:'1px solid grey'}} onClick={()=>navigate('/')}>Home</button>
      </div>
    
  )
}

export default Test;
