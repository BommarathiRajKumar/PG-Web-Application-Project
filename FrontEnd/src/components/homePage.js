import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { Oval } from 'react-loader-spinner';

import {apiUrl} from './url.js';
import DisplayHostelsHomePage from './displayHostelsHomePage.js';
import noDataImage from '../images/noData.jpg';
import homePageCss from "../css/homePage.module.css";

import ConnectionRefuse from '../components/connectionRefusePage';
import ServerError from '../components/serverErrorPage';



const Home = () =>{
    const navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [loginDisplay, setLoginDisplay] = useState(false);
    
    const [totalHostelsDetails, setTotalHostelsDetails] = useState();
    const[noDataFound, setNoDataFound]=useState(false);

    const [formErr, setFormErr] = useState(false);
    const [errToPrint, setErrToPrint] = useState();

    
    const[headerHeight, setHeaderHeight]=useState(23);
    const[contentDivHeight,setContentDivHeight]=useState(77);
    const[height,setHeight]=useState(false)

    const [connectionRefuseError, setConnectionRefuseError]=useState(false);
    const [serverError, setServerError]=useState(false);
    
    useEffect(() => {
        setLoading(true);
        setServerError(false);
        setNoDataFound(false);
        setConnectionRefuseError(false);

        axios.post(apiUrl+"home?state=one")
            .then(res => {
                if (res.status === 200) {
                    setTotalHostelsDetails(res.data);
                } else if(res.status ===204){
                    setNoDataFound(true);
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
                setLoading(false);
            }
        );
    }, []);


    const [userSelectedHostelType, setUserSelectedHostelType] = useState();
    const [showHostelTypeList, setShowHostelTypeList] = useState(false);
    const Handler_setShowHostelTypeList = () => {
        setShowHostelTypeList(!showHostelTypeList)
    }
    const handleHostelTypeSelect = (data) =>{
        setUserSelectedHostelType(data)
        setShowHostelTypeList(!showHostelTypeList)
        setFormErr(false);
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

    };



    const [userSelectedPrice, setUserSelectedPrice] = useState();
    const HandlerSetUserSelectedPrice = (price) =>{
        setUserSelectedPrice(price);
        setFormErr(false);
    }


    const  noResultJson = {
        key: 'No Result'
    };  
    const[stateNamesLoading,setStateNamesLoading] = useState(false)
    const [stateNames, setStateNames] = useState('');
    const [userSelectedStateName, setUserSelectedStateName] = useState(null);
    const [showStatesList, setShowStatesList] = useState(false);
    const handleStateSelect = (stateName)=>{
        setUserSelectedStateName(stateName)
        setShowStatesList(false)
        setFormErr(false);
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
    const handleCitySelect = (cityName)=>{
        setUserSelectedCityName(cityName)
        setShowCitysList(false)
        setFormErr(false);
    }
    const cityInputChangeHandler = (event) => {
        setCityNamesLoading(true);
        setUserSelectedCityName(event.target.value)
        setShowStatesList(false)
        setShowCitysList(true)
        setShowAreasList(false)

        setConnectionRefuseError(false);
        setServerError(false);
        const letters = event.target.value;
        

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
    }

    

    const[areaNamesLoading,setAreaNamesLoading] = useState(false)
    const [areaNames, setAreaNames] = useState('');
    const [userSelectedAreaName, setUserSelectedAreaName] = useState(null);
    const [showAreasList, setShowAreasList] = useState(false); 
    const handleAreaSelect = (areaName)=>{
        setUserSelectedAreaName(areaName)
        setShowAreasList(false)
        setFormErr(false);
    }
    const areaInputChangeHandler = (event) => {
        setAreaNamesLoading(true);
        setUserSelectedAreaName(event.target.value)
        setShowStatesList(false)
        setShowCitysList(false)
        setShowAreasList(true)

        setConnectionRefuseError(false);
        setServerError(false);
        const letters = event.target.value;

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
    }



    const HandlerSearch = (e) => {
        e.preventDefault();
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
            const formData = new FormData();
            formData.append('state','userSearch');
            formData.append("hostelType", userSelectedHostelType)
            formData.append('share', userSelectedRoomType)
            formData.append('price', userSelectedPrice)
            formData.append('stateName', userSelectedStateName)
            formData.append('cityName', userSelectedCityName)
            formData.append('areaName', userSelectedAreaName)

            setLoading(true);
            HandlerToSetDefaultHeight();
            setFormErr(false)
            setErrToPrint('')
            setConnectionRefuseError(false);
            setServerError(false);
            setNoDataFound(false);

            axios.post(apiUrl+"home?", formData)
                .then(res => {
                    if (res.status === 200) {
                        setTotalHostelsDetails(res.data);
                    } else if(res.status===204){
                        setNoDataFound(true);
                    }else {
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
                    setLoading(false);
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
    }


    return(

        <div className={homePageCss.mainDiv}>
            <div className={homePageCss.mainContainer}>
                <header style={{backgroundColor: '#3177877', height: `${headerHeight}%`, width: '100%',overflow:'auto'}}>
                    <table style={{position:'relative',width:'100%',height:'100%'}}>
                        <thead>
                            <tr>
                                <th style={{textAlign: 'left',color:'black'}}>Use Filters to find desired hostel.</th>
                                <th style={{textAlign: 'right'}}><button className={homePageCss.pgAndSearchButton} onClick={() => setLoginDisplay(true)}>PG owner</button></th>
                            </tr>
                        </thead>

                        <tbody >
                            <tr>
                                <td  style={{width:'65%'}}>
                                    <div style={{cursor: 'pointer',border: '1px solid black',display: 'flex',justifyContent: 'space-between'}}onClick={Handler_setShowHostelTypeList}>
                                        <div>Hostel Type: {userSelectedHostelType || 'Not Selected'}</div>
                                        <div>{showHostelTypeList ? '▲' : '▼'}</div>
                                    </div>
                                    {showHostelTypeList&&
                                        <ul style={{padding: '0 15px'}}>
                                            <li onClick={() => handleHostelTypeSelect('Girls Hostel')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedHostelType === 'Girls Hostel' ? 'grey' : 'none' }}>
                                                Girls Hostel.
                                            </li>
                                            <li onClick={() => handleHostelTypeSelect('Boys Hostel')} style={{ cursor: 'pointer', background: userSelectedHostelType === 'Boys Hostel' ? 'grey' : 'none' }}>
                                                Boys Hostel.
                                            </li>
                                        </ul>
                                    }  
                                </td>
                                {showStatesList || showCitysList || showAreasList ?
                                    <td rowspan="7" className={homePageCss.scaListShowTd}> 
                                        {showStatesList && 
                                            <div style={{ height: '100%', overflow: 'auto' }}>
                                                {stateNamesLoading ? 
                                                    <div style={{height:'100%',width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Oval color="#00BFFF" height={35} width={35} />
                                                    </div>
                                                : 
                                                    <ul>
                                                        <label style={{fontSize:'small', color: '#800000', position: 'relative', left: '-20px' }}>Select State Name:</label><br/><br/>
                                                        {Object.keys(stateNames).map((key) => (
                                                            <li className={homePageCss.scaListShowLi} key={stateNames[key]} onClick={() =>stateNames[key]!=="No Result"&&handleStateSelect(stateNames[key])} >
                                                                {stateNames[key]}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                        }
                                        {showCitysList && 
                                            <div style={{ height: '100%', overflow: 'auto' }}>
                                                {cityNamesLoading ? 
                                                    <div style={{height:'100%',width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Oval color="#00BFFF" height={35} width={35} />
                                                    </div>
                                                : 
                                                    <ul>
                                                        <label style={{fontSize:'small', color: '#800000', position: 'relative', left: '-20px' }}>Select City Name:</label><br/><br/>
                                                        {Object.keys(cityNames).map((key) => (
                                                            <li className={homePageCss.scaListShowLi} key={cityNames[key]} onClick={() => cityNames[key]!=="No Result"&&handleCitySelect(cityNames[key])}>
                                                                {cityNames[key]}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                        }
                                        {showAreasList && 
                                            <div style={{ height: '100%', overflow: 'auto' }}>
                                                {areaNamesLoading ? 
                                                    <div style={{height:'100%',width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Oval color="#00BFFF" height={35} width={35} />
                                                    </div>
                                                : 
                                                    <ul>
                                                        <label style={{fontSize:'small', color: '#800000', position: 'relative', left: '-20px' }}>Select Area Name:</label><br/><br/>
                                                        {Object.keys(areaNames).map((key) => (
                                                            <li className={homePageCss.scaListShowLi} key={areaNames[key]} onClick={() =>areaNames[key]!=="No Result"&&handleAreaSelect(areaNames[key])}>
                                                                {areaNames[key]}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                        }
                                    </td>
                                :
                                    null
                                }
                            </tr>

                        {!showHostelTypeList && 
                            <tr>
                                <td>
                                        <div>
                                            <div style={{marginTop:'2px',cursor: 'pointer',border: '1px solid black',display: 'flex',justifyContent: 'space-between'}}onClick={Handler_setShowRoomsList}>
                                                <div>Room Type: {userSelectedRoomType || 'Not Selected'}</div>
                                                <div>{showRoomsList ? '▲' : '▼'}</div>
                                            </div>
                                            {showRoomsList&&
                                                <ul style={{padding: '0 15px'}}>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('oneShare')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedRoomType === 'oneShare' ? 'grey' : 'none' }}>
                                                        oneShare
                                                    </li>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('twoShare')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedRoomType === 'twoShare' ? 'grey' : 'none' }}>
                                                        twoShare
                                                    </li>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('threeShare')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedRoomType === 'threeShare' ? 'grey' : 'none' }}>
                                                        threeShare
                                                    </li>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('fourShare')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedRoomType === 'fourShare' ? 'grey' : 'none' }}>
                                                        fourShare
                                                    </li>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('fiveShare')} style={{cursor: 'pointer', background: userSelectedRoomType === 'fiveShare' ? 'grey' : 'none' }}>
                                                        fiveShare
                                                    </li>
                                                </ul>
                                            }
                                        </div>
                                    
                                </td>
                            </tr>
                        }

                        
                        {!showHostelTypeList && !showRoomsList&&
                            <tr>
                                <td>
                                        <div>Enter &#8377;/month:
                                            <input className={homePageCss.ammountIn}  value={userSelectedPrice} placeholder={'Rs.'} type="text" onChange={(e)=>HandlerSetUserSelectedPrice(e.target.value)} />
                                        </div>
                                    
                                </td>
                            </tr>
                        }


                        {!showHostelTypeList && !showRoomsList&& headerHeight===23 &&
                            <tr>
                                <td>
                                    <div style={{color:'darkblue',cursor:'pointer'}} onClick={setMoreFiltersHeights}>More filters</div>
                                </td>
                            </tr>
                        }

                        {!showHostelTypeList && !showRoomsList&& headerHeight===35 &&
                            <tr>
                                <td>
                                    
                                        <div>
                                            <label>State Name:</label>
                                            <input className={homePageCss.filtersIn} value={userSelectedStateName} placeholder={'Not Selected'} type="text" onClick={stateInputChangeHandler} onChange={stateInputChangeHandler} />
                                        </div>
                                    
                                </td>
                            </tr>
                        }

                        {!showHostelTypeList && !showRoomsList&& headerHeight===35 &&
                            <tr>
                                <td>
                
                                    <div >
                                        <label>City Name:</label>
                                        <input style={{marginLeft:'6px'}} className={homePageCss.filtersIn} value={userSelectedCityName} placeholder={'Not Selected'} type="text" onClick={cityInputChangeHandler} onChange={cityInputChangeHandler} />
                                    </div>
                                    
                                </td>
                            </tr>
                        }

                        {!showHostelTypeList && !showRoomsList&& headerHeight===35 &&
                            <tr>
                                <td>
                                    <div>
                                        <label>Area Name:</label>
                                        <input className={homePageCss.filtersIn} value={userSelectedAreaName} placeholder={'Not Selected'} type="text" onClick={areaInputChangeHandler} onChange={areaInputChangeHandler} />
                                    </div>
                                </td>
                            </tr>
                        }

                        {!showHostelTypeList && !showRoomsList&& headerHeight===35 &&
                            <tr>
                                <td>
                                    <button style={{marginBottom:'10px'}} className={homePageCss.pgAndSearchButton} onClick={HandlerSearch}>Search</button>
                                    <button style={{marginBottom:'10px',marginLeft:'18px'}} className={homePageCss.cancelButton} onClick={searchCancelHandler}>Cancel</button>
                                    {formErr && !showStatesList && !showCitysList && !showAreasList && <div  style={{color: '#8B0000'}}>{errToPrint}</div>}
                                </td>
                            </tr>
                        }

                        </tbody>
                    </table>
    
                </header>

                <div style={{backgroundColor:'white',height: `${contentDivHeight}%`,width:'100%' }}>
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
                            {loading?
                                <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    <Oval color="#00BFFF" height={60} width={60} />
                                    <div style={{marginTop:'8%'}}>
                                        Please wait, Data is loading...
                                    </div>
                                </div>
                            :
                                <div style={{width:'100%',height:'100%'}}>
                                    {noDataFound?
                                        <div style={{height:'100%',display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
                                            <img src={noDataImage} alt="noDataImg"/>
                                            <div style={{color:'#B2BEB5'}}>Please do Change Filters Options.</div>
                                        </div>
                                    :
                                        <div style={{backgroundColor: ' #E2D1F9',width:'100%',height:'100%',overflow:'auto',display:'flex', justifyContent:'center',alignItems:'center'}}>
                                            {totalHostelsDetails&&
                                                
                                                <div style={{width:'88%', height:'100%'}}>
                                                    <div style={{marginTop:'10%',marginBottom:'10%'}}>Hostels:</div>
                                                    {Object.keys(totalHostelsDetails).map((key) => (
                                                        <DisplayHostelsHomePage style={{marginBottom:'40px'}} key={key} data={totalHostelsDetails[key]}/> 
                                                    ))}
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
            </div>
        </div>

    )
}

export default Home;
