import React,{useEffect, useState, useRef} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { Oval } from 'react-loader-spinner';

import {apiUrl} from './url.js';
import DisplayHostelsHomePage from './displayHostelsHomePage.js';
import noDataImage from '../images/noData.jpg';
import homePageCss from "../css/homePage.module.css";

import ConnectionRefuse from '../components/connectionRefusePage';
import ServerError from '../components/serverErrorPage';

import {AiFillCaretLeft} from "react-icons/ai";
import {AiFillCaretRight} from "react-icons/ai";



import {FiPlus} from "react-icons/fi";
import {FiX} from "react-icons/fi";
import {FiUser} from "react-icons/fi";
import {FiSearch} from "react-icons/fi";





const Home = () =>{
    const navigate = useNavigate();
    
    
    const [totalHostelsDetailsHomePage, setTotalHostelsDetailsHomePage] = useState();
    const [totalHostelsDetailsHomePageUserSearch, setTotalHostelsDetailsHomePageUserSearch] = useState();





    const [loading, setLoading] = useState(false);
    const[userLoading,setUserLoading]=useState(false);
    const[userSearchLoading,setUserSearchLoading]=useState(false)
    const [loginDisplay, setLoginDisplay] = useState(false);
    


    const [formErr, setFormErr] = useState(false);
    const [errToPrint, setErrToPrint] = useState();


    
    const[headerHeight, setHeaderHeight]=useState(23);
    const[contentDivHeight,setContentDivHeight]=useState(77);
    const[height,setHeight]=useState(false)


    const[offSet,setOffSet]=useState(0);
    const[count,setCount]=useState();

    
    const[userSearchActivated,setUserSearchActivated]=useState(false);

    const[offSetUserSearch,setOffSetUserSearch]=useState(0);
    const[pageUserSearch,setPageUserSearch]=useState(1);
    const[countUserSearch,setCountUserSearch]=useState();
    

    const [connectionRefuseError, setConnectionRefuseError]=useState(false);
    const [serverError, setServerError]=useState(false);
    
    
    useEffect(() => {
        HandlerToLoadHostels();
    }, []);

    const HandlerToLoadHostels=(event)=>{
        if(event==="user"){
            setUserLoading(true)
            setOffSet(offSet+5)
        }else{
            setLoading(true);
            setOffSet(offSet+5)
        }
        setServerError(false);
        setConnectionRefuseError(false);

        axios.post(apiUrl+"home?state=one&offSet="+offSet)
            .then(res => {
                if (res.status === 200) {
                    /*Object.keys(res.data).forEach((key) => {
                        setTotalHostelsDetailsHomePage((prevHostelDetails) => ({
                          ...prevHostelDetails,
                          [key]: res.data[key],
                        }));
                    });*/

                    setTotalHostelsDetailsHomePage(prevHostelDetails => {
                        const updatedHostelDetails = { ...prevHostelDetails };
                        Object.keys(res.data).forEach(key => {
                          if (!(key in updatedHostelDetails)) {
                            updatedHostelDetails[key] = res.data[key];
                          }
                        });
                        return updatedHostelDetails;
                    });

                    setCount(res.data.count)
                } else if(res.status ===204){
                    setCount(0)
                }else{
                    alert("Please do refresh and try after some time.");
                }
            })
            .catch(err => {
                if (err.response) {
                    if(err.response.status === 500) {
                        setServerError(true);
                    }
                } else {
                    setConnectionRefuseError(true);
                }
            })
            .finally(() => {
                if(event==="user"){
                    setUserLoading(false)
                }else{
                    setLoading(false);
                }
            }
        );
    }


    const [userSelectedHostelType, setUserSelectedHostelType] = useState();
    const [showHostelTypeList, setShowHostelTypeList] = useState(false);
    const Handler_setShowHostelTypeList = () => {
        setShowHostelTypeList(!showHostelTypeList)
    }
    const handleHostelTypeSelect = (data) =>{
        setUserSelectedHostelType(data)
        setShowHostelTypeList(!showHostelTypeList)
        setFormErr(false);
        setOffSetUserSearch(0);
        setTotalHostelsDetailsHomePageUserSearch({});
    }



    const [userSelectedRoomType, setUserSelectedRoomType] = useState();
    const [showRoomsList, setShowRoomsList] = useState(false);
    const Handler_setShowRoomsList = () => {
        setShowRoomsList(!showRoomsList)
        if(!showRoomsList){ 
            setHeaderHeight(35)
            setContentDivHeight(65)
        }else{
            setHeaderHeight(23)
            setContentDivHeight(77)
        }
        if(height){
            setHeaderHeight(35)
            setContentDivHeight(65)

        }
    } 
    const HandlerSetUserSelectedRoomType = (data) => {
        setUserSelectedRoomType(data);
        setShowRoomsList(!showRoomsList);
        setFormErr(false);
        if(!height){
        setHeaderHeight(23)
        setContentDivHeight(77);
        }

        setOffSetUserSearch(0);
        setTotalHostelsDetailsHomePageUserSearch({});

    };



    const [userSelectedPrice, setUserSelectedPrice] = useState();
    const HandlerSetUserSelectedPrice = (price) =>{
        setUserSelectedPrice(price);
        setFormErr(false);
        setOffSetUserSearch(0);
        setTotalHostelsDetailsHomePageUserSearch({});
    }


    const  noResultJson = {
        key: 'No Result'
    };  
    const[stateNamesLoading,setStateNamesLoading] = useState(false)
    const [stateNames, setStateNames] = useState('');
    const [userSelectedStateName, setUserSelectedStateName] = useState(null);
    const [showStatesList, setShowStatesList] = useState(false);
    const[state,setState]=useState(false)
    const handleStateSelect = (stateName)=>{
        setUserSelectedStateName(stateName)
        setShowStatesList(false)
        setFormErr(false);
        setState(true)

        setOffSetUserSearch(0);
        setTotalHostelsDetailsHomePageUserSearch({});
    }
    const stateInputChangeHandler = (event) => {
        setStateNamesLoading(true)
        setUserSelectedStateName(event.target.value)

        setShowStatesList(true)
        setShowCitysList(false)
        setShowAreasList(false)

        setConnectionRefuseError(false);
        setServerError(false);
        const letters = event.target.value;
        
        if (letters) {
            axios.post(apiUrl+"filterWord?type=stateName&word="+letters)
                .then(res => {
                    if (res.status === 200) {
                        setStateNames(res.data.namesFromBackEnd);
                    } else {
                        alert("Please do refresh and try after some time.");
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 404) {
                            setStateNames(noResultJson);
                        }else if(err.response.status === 500) {
                            setServerError(true);
                        }
                    } 
                    else {
                        setConnectionRefuseError(true);
                    }
                })
                .finally(() => {
                    setStateNamesLoading(false);
                }
            );
        }else{
            setStateNames(noResultJson);
            setShowStatesList(false)

        }
    }


    
    const[cityNamesLoading,setCityNamesLoading] = useState(false)
    const [cityNames, setCityNames] = useState('');
    const [userSelectedCityName, setUserSelectedCityName] = useState(null);
    const [showCitysList, setShowCitysList] = useState(false);
    const[city,setCity]=useState(false)
    const handleCitySelect = (cityName)=>{
        setUserSelectedCityName(cityName)
        setShowCitysList(false)
        setFormErr(false);
        setCity(true)
        setOffSetUserSearch(0);
        setTotalHostelsDetailsHomePageUserSearch({});
    }
    const cityInputChangeHandler = (event) => {
        setCityNamesLoading(true);
        setUserSelectedCityName(event.target.value)
        setShowStatesList(false)
        setShowCitysList(true)
        setShowAreasList(false)

        setFormErr(false)

        setConnectionRefuseError(false);
        setServerError(false);
        const letters = event.target.value;
        
        if(state){
            if (letters) {
                axios.post(apiUrl+"filterWord?type=cityName&stateName="+userSelectedStateName+"&word="+letters)
                    .then(res => {
                        if (res.status === 200) {
                            setCityNames(res.data.namesFromBackEnd);
                            
                        } else {
                            alert("Please do refresh and try after some time.");
                        }
                    })
                    .catch(err => {
                        if (err.response) {
                            if (err.response.status === 404) {
                                setCityNames(noResultJson)
                            }else if(err.response.status === 500) {
                                setServerError(true);
                            }
                        } else {
                            setConnectionRefuseError(true);
                        }
                    })
                    .finally(() => {
                        setCityNamesLoading(false);
                    }
                );
            }else{
                setCityNames(noResultJson)
                setShowCitysList(false)
            }
        }else{
            setShowCitysList(false);
            setErrToPrint("First select state name.");
            setFormErr(true);
        }
    }

    

    const[areaNamesLoading,setAreaNamesLoading] = useState(false)
    const [areaNames, setAreaNames] = useState('');
    const [userSelectedAreaName, setUserSelectedAreaName] = useState(null);
    const [showAreasList, setShowAreasList] = useState(false); 
    const handleAreaSelect = (areaName)=>{
        setUserSelectedAreaName(areaName)
        setShowAreasList(false)
        setFormErr(false);
        setOffSetUserSearch(0);
        setTotalHostelsDetailsHomePageUserSearch({});
    }
    const areaInputChangeHandler = (event) => {
        setAreaNamesLoading(true);
        setUserSelectedAreaName(event.target.value)
        setShowStatesList(false)
        setShowCitysList(false)
        setShowAreasList(true)
        setFormErr(false);

        setConnectionRefuseError(false);
        setServerError(false);
        const letters = event.target.value;

        console.log(userSelectedStateName)

        if(state && city){
            if (letters) {
                axios.post(apiUrl+"filterWord?type=areaName&stateName="+userSelectedStateName+"&cityName="+userSelectedCityName+"&word="+letters)
                    .then(res => {
                        if (res.status === 200) {
                            setAreaNames(res.data.namesFromBackEnd);
                        } else {
                            alert("Please do refresh and try after some time.");
                        }
                    })
                    .catch(err => {
                        if (err.response) {
                            if (err.response.status === 404) {
                                setAreaNames(noResultJson);
                            }else if(err.response.status === 500) {
                                setServerError(true);
                            }
                        } else {
                            setConnectionRefuseError(true);
                        }
                    })
                    .finally(() => {
                        setAreaNamesLoading(false);
                    }
                );
            }else{
                setAreaNames(noResultJson);
                setShowAreasList(false);

            }
        }else{
            setShowAreasList(false)
            setErrToPrint("First select state & city name.");
            setFormErr(true);
        }
    }


const[noDataFound,setNoDataFond]=useState()
    const HandlerSearch = (e) => {
        setShowStatesList(false)
        setShowCitysList(false)
        setShowAreasList(false)

        if(userSelectedHostelType==null){
            setErrToPrint("Please select the hostelType.")
            setFormErr(true);
        }else if(userSelectedRoomType==null){
            setErrToPrint("Please select the RoomType.")
            setFormErr(true);
        }else if(userSelectedPrice==null || isNaN(userSelectedPrice)){
            setErrToPrint("Please enter the Proper Rs/month.")
            setFormErr(true);
           
        }else if(userSelectedStateName===null){
            setErrToPrint("Please select the state name.")
            setFormErr(true);    
        }else if(userSelectedCityName===null){
            setErrToPrint("Please select the city name.")
            setFormErr(true);     
        }else if(userSelectedAreaName===null){
            setErrToPrint("Please select the Area name.")
            setFormErr(true); 
        }else{

            setNoDataFond(false)

            setShowFilters(false)

            const formData = new FormData();
            formData.append('state','userSearch');
            formData.append("hostelType", userSelectedHostelType)
            formData.append('share', userSelectedRoomType)
            formData.append('price', userSelectedPrice)
            formData.append('stateName', userSelectedStateName)
            formData.append('cityName', userSelectedCityName)
            formData.append('areaName', userSelectedAreaName)

            setUserSearchActivated(true)

            

            if(e==='user'){
                setOffSetUserSearch(offSetUserSearch+5);
                setUserSearchLoading(true)
            }else{
                setOffSetUserSearch(offSetUserSearch+5);
                setLoading(true)
            }


            setLoading(true);
            HandlerToSetDefaultHeight();
            setFormErr(false)
            setErrToPrint('')
            setConnectionRefuseError(false);
            setServerError(false);

            axios.post(apiUrl+"home?offSet="+offSetUserSearch, formData)
                .then(res => {
                    if (res.status === 200) {
                        /*Object.keys(res.data).forEach((key) => {
                            setTotalHostelsDetailsHomePageUserSearch((prevHostelDetails) => ({
                              ...prevHostelDetails,
                              [key]: res.data[key],
                            }));
                        });*/

                        setTotalHostelsDetailsHomePageUserSearch(prevHostelDetails => {
                            const updatedHostelDetails = { ...prevHostelDetails };
                            Object.keys(res.data).forEach(key => {
                              if (!(key in updatedHostelDetails)) {
                                updatedHostelDetails[key] = res.data[key];
                              }
                            });
                            return updatedHostelDetails;
                        });
                        setCountUserSearch(res.data.count)
                    } else if(res.status ===204){
                        setNoDataFond(true);
                    }else{
                        alert("Please do refresh and try after some time.");
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if(err.response.status === 500) {
                            setServerError(true);
                        }
                    } else {
                        setConnectionRefuseError(true);
                    }
                })
                .finally(() => {
                    if(e==='user'){
                        setUserSearchLoading(false)
                    }else{
                        setLoading(false)
                    }
                }
            )
        }
    }



    const setMoreFiltersHeights =()=>{
        setHeaderHeight(35);
        setContentDivHeight(65)
        setHeight(true)
    }

    const HandlerToSetDefaultHeight=()=>{
        if(!formErr){
            setHeaderHeight(23);
            setContentDivHeight(77);
        }
    }

    const searchCancelHandler=()=>{
        setUserSelectedHostelType();
        setUserSelectedRoomType();
        setUserSelectedPrice('');
        setUserSelectedStateName();
        setUserSelectedCityName();
        setUserSelectedAreaName();
        setHeaderHeight(23);
        setContentDivHeight(77)
        setShowStatesList(false)
        setShowCitysList(false)
        setShowAreasList(false)
        setUserSearchActivated(false)
        HandlerToLoadHostels();
        setNoDataFond(false);
        setOffSetUserSearch(0);
        setTotalHostelsDetailsHomePageUserSearch({});
        setShowFilters(false)
    }

    const containerRef = useRef(null);
    const[firstHeight, setFirstHeight]=useState();

    useEffect(() => {
        if (containerRef.current) {
          setFirstHeight(document.getElementById('your-container-id').scrollHeight);
        }
    },[]);
 
    useEffect(() => {
        if (containerRef.current) {
          const container = document.getElementById('your-container-id');
          const scrollPosition = container.scrollHeight-firstHeight*4;
          
          container.scrollTo({
            top: scrollPosition,
            behavior: 'smooth', 
          });
        }
    }, [totalHostelsDetailsHomePage,totalHostelsDetailsHomePageUserSearch]);



const [reachedBottom, setReachedBottom] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop + container.clientHeight+10 >= container.scrollHeight && count>0 || countUserSearch>0) {
      if (!reachedBottom) {
        if(userSearchActivated){
            HandlerSearch('user')
        }else{
            HandlerToLoadHostels('user')
        }
        setReachedBottom(true); 
      }
    } else {
      setReachedBottom(false);
    }
  };

  const[show,setShow]=useState(false);
  const[showFilters,setShowFilters]=useState(false);

    return(

        <div className={homePageCss.mainDiv}>
            <div className={homePageCss.mainContainer}>

                {showFilters&&
                    <header className={homePageCss.headerDiv}>
                        <h2 style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'-10px'}}>Filters</h2>

                        <h3 style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Find your desired hostels.</h3>
                        
                        <div style={{marginLeft:'8px'}}>
                            <div style={{marginBottom:'10px'}}>
                                <label>Hostel Type:</label>
                                <div style={{marginLeft:'13px',display:'flex',justifyContent:'flex-start'}}>
                                    <input
                                        type='checkbox'
                                        style={{height: '14px', width: '14px',cursor:'pointer'}}
                                        checked={userSelectedHostelType === "Boys Hostel"}
                                        onClick={() => handleHostelTypeSelect('Boys Hostel')}
                                    />
                                    Girls
                                </div>
                                <div style={{marginLeft:'10px',display:'flex',justifyContent:'flex-start'}}>
                                    <input
                                        type='checkbox'
                                        style={{marginLeft:'6px',height: '14px', width: '14px' ,cursor:'pointer'}}
                                        checked={userSelectedHostelType === "Girls Hostel"}
                                        onClick={() => handleHostelTypeSelect('Girls Hostel')}
                                    />
                                    Boys
                                </div>
                            </div>

                            <div style={{marginBottom:'10px'}}>
                                <label>Room Type:</label>
                            
                                <table style={{display:'flex',flexDirection:'column',marginLeft:'10px'}}>
                                    <tr>
                                        <td>
                                            <input
                                                type='checkbox'
                                                style={{height: '14px', width: '14px' ,cursor:'pointer'}}
                                                checked={userSelectedRoomType === "oneShare"}
                                                onClick={() => HandlerSetUserSelectedRoomType('oneShare')}
                                            />
                                        </td>
                                        <td>
                                            1-share
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type='checkbox'
                                                style={{ height: '14px', width: '14px' ,cursor:'pointer'}}
                                                checked={userSelectedRoomType === "twoShare"}
                                                onClick={() => HandlerSetUserSelectedRoomType('twoShare')}
                                            />
                                        </td>
                                        <td>
                                            2-share
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type='checkbox'
                                                style={{ height: '14px', width: '14px' ,cursor:'pointer'}}
                                                checked={userSelectedRoomType === "threeShare"}
                                                onClick={() => HandlerSetUserSelectedRoomType('threeShare')}
                                            />
                                        </td>
                                        <td>
                                            3-share
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type='checkbox'
                                                style={{ height: '14px', width: '14px' ,cursor:'pointer'}}
                                                checked={userSelectedRoomType === "fourShare"}
                                                onClick={() => HandlerSetUserSelectedRoomType('fourShare')}
                                            />
                                        </td>
                                        <td>
                                            4-share
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type='checkbox'
                                                style={{ height: '14px', width: '14px' ,cursor:'pointer'}}
                                                checked={userSelectedRoomType === "fiveShare"}
                                                onClick={() => HandlerSetUserSelectedRoomType('fiveShare')}
                                            />   
                                        </td>
                                        <td>
                                            5-share
                                        </td>
                                    </tr>
                                </table>
                            
                            </div>

                            <div style={{marginBottom:'10px'}}>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    {userSelectedRoomType}  &#8377;/month:
                                    <input className={homePageCss.filtersIn}  value={userSelectedPrice} placeholder={'Rs.'} type="text" onChange={(e)=>HandlerSetUserSelectedPrice(e.target.value)} />
                                </div>
                            </div>

                            <div style={{marginBottom:'10px',display:'flex',flexDirection:'column'}}>
                                <label>State Name:</label>
                                <input className={homePageCss.filtersIn} value={userSelectedStateName} placeholder={'Not Selected'} type="text" onClick={()=>{setShowCitysList(false);setShowAreasList(false)}} onChange={stateInputChangeHandler} />
                                {showStatesList&&
                                    <div className={homePageCss.scaListShowTd}>
                                        <label style={{fontSize:'small', color: '#800000',marginLeft:'10px'}}>Select State Name:</label>
                                        <ul >
                                            {Object.keys(stateNames).map((key) => (
                                                <li className={homePageCss.scaListShowLi} key={stateNames[key]} onClick={() =>stateNames[key]!=="No Result" && handleStateSelect(stateNames[key])} >
                                                    {stateNames[key]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>

                            <div style={{marginBottom:'10px',display:'flex',flexDirection:'column'}}>
                                <label>City Name: </label>
                                <input className={homePageCss.filtersIn} value={userSelectedCityName} placeholder={'Not Selected'} type="text" onClick={()=>{setShowStatesList(false);setShowAreasList(false)}} onChange={cityInputChangeHandler} />
                            
                                {showCitysList&&
                                    <div className={homePageCss.scaListShowTd}>
                                        <label style={{fontSize:'small', color: '#800000',marginLeft:'10px'}}>Select City Name:</label>
                                        <ul >
                                            {Object.keys(cityNames).map((key) => (
                                                <li className={homePageCss.scaListShowLi} key={cityNames[key]} onClick={() =>cityNames[key]!=="No Result" && handleCitySelect(cityNames[key])} >
                                                    {cityNames[key]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>

                            <div style={{marginBottom:'10px',display:'flex',flexDirection:'column'}}>
                                <label>Area Name:</label>
                                <input className={homePageCss.filtersIn} value={userSelectedAreaName} placeholder={'Not Selected'} type="text" onClick={()=>{setShowStatesList(false);setShowCitysList(false)}} onChange={areaInputChangeHandler} />
                            
                                {showAreasList&&
                                    <div className={homePageCss.scaListShowTd}>
                                        <label style={{fontSize:'small', color: '#800000',marginLeft:'10px'}}>Select Area Name:</label>
                                        <ul >
                                            {Object.keys(areaNames).map((key) => (
                                                <li className={homePageCss.scaListShowLi} key={areaNames[key]} onClick={() =>areaNames[key]!=="No Result" && handleAreaSelect(areaNames[key])} >
                                                    {areaNames[key]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>

                            <div style={{marginTop:'20px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                {formErr && <div  style={{color: 'maroon',marginBottom:'10px'}}>{errToPrint}</div>}
                                <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
                                    <button style={{marginBottom:'15px'}} className={homePageCss.pgAndSearchButton} onClick={HandlerSearch}>Search</button>
                                    <button  className={homePageCss.cancelButton} onClick={searchCancelHandler}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </header>
                }
                

                <div style={{backgroundColor:'white',height:'94%',width:'100%' }}>
                    {loginDisplay &&
                        <div  className={homePageCss.loginDisplay} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
                            <label className={homePageCss.cross} onClick={()=>setLoginDisplay(!loginDisplay)}>X</label>
                            
                            <button className={homePageCss.loginAndSignupButton} onClick={() => navigate('/login')}>Login</button>
                            <button style={{marginTop:'8px'}} className={homePageCss.loginAndSignupButton} onClick={() => navigate('/signup')}>Signup</button>
                        </div>
                    } 
                    { serverError || connectionRefuseError ?
                        <div style={{width:'100%',height:'100%'}}>
                            {serverError ? <ServerError/>:<ConnectionRefuse />}
                        </div>
                    :
                        <div style={{width:'100%',height:'100%'}}>
                            {loading && !userLoading && !userSearchLoading ?
                                <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    <Oval color="#00BFFF" height={60} width={60} />
                                    <div style={{marginTop:'8%'}}>
                                        Please wait, Data is loading...
                                    </div>
                                </div>
                            :
                                <div style={{width:'100%',height:'100%'}}>
                                    {noDataFound ?
                                        <div style={{height:'100%',display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
                                            <img src={noDataImage} alt="noDataImg"/>
                                            <div style={{color:'#B2BEB5',marginBottom:'8px'}}>Please do Change Filters Options.</div>
                                            <div style={{color:'#B2BEB5',marginBottom:'8px'}}>Or</div>
                                            <div onClick={searchCancelHandler} style={{color:'blue',cursor:'pointer',marginBottom:'8px'}}>'Click Here'<label style={{color:'#B2BEB5',marginLeft:'8px'}}>to go home Page.</label></div>
                                        </div>
                                    :
                                        <div id="your-container-id" ref={containerRef} onScroll={()=>{userSearchActivated?countUserSearch>0&& handleScroll():count>0 && handleScroll()}} style={{scrollBehavior:'smooth',backgroundColor: ' #E2D1F9',width:'100%',height:'100%',overflow:'auto',display:'flex', justifyContent:'center',alignItems:'center'}}>
                                            {totalHostelsDetailsHomePage&&
                                                <div  style={{width:'88%', height:'100%'}}>
                                                    {userSearchActivated?
                                                        <div>
                                                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                                                <label onClick={searchCancelHandler} style={{color:'blue',cursor:'pointer'}}>'Click Here'</label> <label style={{marginLeft:'10px'}}>To Exit from Search Result.</label>
                                                                <h2 style={{marginTop:'10px'}}>Search Result:</h2>
                                                            </div>
                                                            {Object.keys(totalHostelsDetailsHomePageUserSearch)
                                                                .filter(key => key !== "count")
                                                                .sort((a, b) => b.localeCompare(a))
                                                                .map((key) => (
                                                                    <DisplayHostelsHomePage style={{ marginBottom: '40px' }} key={key} data={totalHostelsDetailsHomePageUserSearch[key]}/>
                                                                )
                                                            )}
                                                            <div  style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                {countUserSearch>0?<button onClick={() => {HandlerSearch('user')}} disabled={userSearchLoading}>{userSearchLoading?<Oval width={15} height={15}/>:"load more"}</button>:<label>Results End</label>}
                                                            </div>
                                                        </div>
                                                    :
                                                        <div>
                                                            <h2 style={{marginTop:'20px',marginBottom:'20px',}}>Hostels:</h2>
                                                            {Object.keys(totalHostelsDetailsHomePage)
                                                                .filter(key => key !== "count")
                                                                .sort((a, b) => b.localeCompare(a))
                                                                .map((key) => (
                                                                    <DisplayHostelsHomePage style={{ marginBottom: '40px' }} key={key} data={totalHostelsDetailsHomePage[key]}/>
                                                                )
                                                            )}
                                                            <div  style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                {count>0?<Oval color="black" width={25} height={25}/>:<label>Results End</label>}
                                                            </div>
                                                        </div>
                                                    }
                                                    <br/>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
                <footer className={homePageCss.footer}>
                    {show&&
                        <div className={homePageCss.profilePicContainer}>
                            <FiUser size={15} onClick={()=>{setLoginDisplay(!loginDisplay)}}/>
                        </div>
                    }

                    <div style={{marginLeft:'30px',marginRight:'30px'}} className={homePageCss.profilePicContainer}>
                        {show?
                            <FiX size={15} onClick={()=>{setShow(!show)}}/>
                        :
                            <FiPlus size={15} onClick={()=>{setShow(!show)}} />
                        }
                    </div>
                    {show&&
                        <div className={homePageCss.profilePicContainer}>
                            <FiSearch size={15} onClick={()=>{setShowFilters(!showFilters)}} />
                        </div>   
                    }            
                </footer> 
            </div>
        </div>

    )
}

export default Home;
