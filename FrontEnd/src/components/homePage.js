import React,{useEffect, useState, useRef} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { Oval } from 'react-loader-spinner';
import {FiPlus,FiX,FiUser,FiSearch} from "react-icons/fi";

import {apiUrl} from './url.js';
import DisplayHostelsHomePage from './displayHostelsHomePage.js';
import noDataImage from '../images/noData.jpg';
import homePageCss from "../css/homePage.module.css";
import ConnectionRefuse from '../components/connectionRefusePage';
import ServerError from '../components/serverErrorPage';


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
    const[offSet,setOffSet]=useState(0);
    const[count,setCount]=useState();
    const[userSearchActivated,setUserSearchActivated]=useState(false);
    const[offSetUserSearch,setOffSetUserSearch]=useState(0);
    const[countUserSearch,setCountUserSearch]=useState();
    const [connectionRefuseError, setConnectionRefuseError]=useState(false);
    const [serverError, setServerError]=useState(false);

    const[show,setShow]=useState(false)

    const[showFilters,setShowFilters]=useState(false);

    const [stateNames, setStateNames] = useState('');
    const [showStatesList, setShowStatesList] = useState(false);
    
    const [cityNames, setCityNames] = useState('');
    const[showCitysList,setShowCitysList]=useState(false);

    const [areaNames, setAreaNames] = useState('');
    const[showAreasList,setShowAreasList]=useState(false);

    
    const[noDataFound,setNoDataFond]=useState()
    const[reset,setReset]=useState(false);

    const[SearchDeatils,setSearchDeatils]=useState({
        state:"userSearch",
        hostelType:null,
        share:null,
        price:null,
        stateName:null,
        cityName:null, 
        areaName:null
    })
    const HandlerToSetDetailsForSearch=(event,state)=>{
        if(state==="stateName"){
            setSearchDeatils({...SearchDeatils,[state]:event})
            setShowStatesList(false)
            document.getElementById("stateId").value="";
            setStateNames({key:"No Result"})
        }else if(state==="cityName"){
            setSearchDeatils({...SearchDeatils,[state]:event})
            setShowCitysList(false)
            document.getElementById("cityId").value="";
            setCityNames({key:"No Result"})
        }else if(state==="areaName"){
            setSearchDeatils({...SearchDeatils,[state]:event})
            setShowAreasList(false)
            document.getElementById("areaId").value="";
            setAreaNames({key:"No Result"})
        }else{
            setSearchDeatils({...SearchDeatils,[event.target.name]:event.target.value})
        }
        setOffSetUserSearch(0);
        setReset(true);
    }
    
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
                    setTotalHostelsDetailsHomePage(prevHostelDetails => {
                        const updatedHostelDetails = { ...prevHostelDetails };
                        Object.keys(res.data).forEach(key => {
                          if (!(key in updatedHostelDetails) && key!="count") {
                            updatedHostelDetails[key] = res.data[key];
                          }
                        });
                        return updatedHostelDetails;
                    });
                    setCount(res.data.count)
                    HandlerToSetFirstHeight();
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

    const HandlerSearch = (e) => {

        if(SearchDeatils.hostelType==null){
            setErrToPrint("Please select the hostelType.")
            setFormErr(true);
        }else if(SearchDeatils.share==null){
            setErrToPrint("Please select the RoomType.")
            setFormErr(true);
        }else if(SearchDeatils.price==null || isNaN(SearchDeatils.price)){
            setErrToPrint("Please enter the Proper Rs/month.")
            setFormErr(true);
        }else if(SearchDeatils.stateName===null){
            setErrToPrint("Please select the state name.")
            setFormErr(true);    
        }else if(SearchDeatils.cityName===null){
            setErrToPrint("Please select the city name.")
            setFormErr(true);     
        }else if(SearchDeatils.areaName===null){
            setErrToPrint("Please select the Area name.")
            setFormErr(true); 
        }else{
            setNoDataFond(false)
            setUserSearchActivated(true)
            setFormErr(false)
            setErrToPrint('')
            setConnectionRefuseError(false);
            setServerError(false);

            setOffSetUserSearch(offSetUserSearch+5);
            if(e==='user'){
                setUserSearchLoading(true)
                if(reset){
                    setTotalHostelsDetailsHomePageUserSearch({});
                    setReset(false);
                }
            }else{
                setLoading(true)
            }

            axios.post(apiUrl+"home?"+
                "state=userSearch"+
                "&share="+SearchDeatils.share+
                "&hostelType="+SearchDeatils.hostelType+
                "&price="+SearchDeatils.price+
                "&stateName="+SearchDeatils.stateName+
                "&cityName="+SearchDeatils.cityName+
                "&areaName="+SearchDeatils.areaName+
                "&offSet="+offSetUserSearch
            ).then(res => {
                if (res.status === 200) {
                    setTotalHostelsDetailsHomePageUserSearch(prevHostelDetails => {
                        const updatedHostelDetails = { ...prevHostelDetails };
                        Object.keys(res.data).forEach(key => {
                            if (!(key in updatedHostelDetails) && key!="count") {
                            updatedHostelDetails[key] = res.data[key];
                            }
                        });
                        return updatedHostelDetails;
                    });
                    setCountUserSearch(res.data.count)
                    console.log(res.data.count)
                    HandlerToSetFirstHeight();
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
                setShowFilters(false);
                if(e==='user'){
                    setUserSearchLoading(false)
                }else{
                    setLoading(false)
                }
            })
        }
    }

    const searchCancelHandler=()=>{  
        setShowFilters(false);
        setUserSearchActivated(false);
        setNoDataFond(false);
        setOffSetUserSearch(0);
        HandlerToSetFirstHeight();
        setTotalHostelsDetailsHomePageUserSearch({});
    }
 
    const stateInputChangeHandler = (event) => {
        setFormErr(false);
        setConnectionRefuseError(false);
        setServerError(false);
        const letters = event.target.value;
        setShowStatesList(true);
        setShowCitysList(false);
        setShowAreasList(false);
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
                            setStateNames({key:"No Result"});
                        }else if(err.response.status === 500) {
                            setServerError(true);
                        }
                    }else {
                        setConnectionRefuseError(true);
                    }
                }
            )
        }else{
            setStateNames({key:"No Result"})
        }
    }

    const[showLocErr,setShowLocErr]=useState(false);
    const[showAreaErr,setShowAreaErr]=useState(false);
    const[areaErr,setAreaErr]=useState();

    const cityInputChangeHandler = (event) => {
        setShowLocErr(false)
        setConnectionRefuseError(false);
        setServerError(false);
        const letters = event.target.value;

        if(SearchDeatils.stateName===null){
            setShowLocErr(true);
            return;
        }
        setShowStatesList(false);
        setShowCitysList(true);
        setShowAreasList(false)
        if (letters) {
            axios.post(apiUrl+"filterWord?type=cityName&stateName="+SearchDeatils.stateName+"&word="+letters)
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
                            setCityNames({key:"No Result"})
                        }else if(err.response.status === 500) {
                            setServerError(true);
                        }
                    } else {
                        setConnectionRefuseError(true);
                    }
                }
            )  
        }else{
            setCityNames({key:"No Result"})
        }
    }

    const areaInputChangeHandler = (event) => {
        setShowAreaErr(false)
        setConnectionRefuseError(false);
        setServerError(false);
        const letters = event.target.value;
        if(SearchDeatils.stateName===null){
            setAreaErr("First select state.");
            setShowAreaErr(true);
            return;
        }else if(SearchDeatils.cityName===null){
            setAreaErr("First select City.");
            setShowAreaErr(true);
            return;
        }
        setShowStatesList(false);
        setShowCitysList(false);
        setShowAreasList(true);
        if (letters) {
            axios.post(apiUrl+"filterWord?type=areaName&stateName="+SearchDeatils.stateName+"&cityName="+SearchDeatils.cityName+"&word="+letters)
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
                            setAreaNames({key:"No Result"});
                        }else if(err.response.status === 500) {
                            setServerError(true);
                        }
                    } else {
                        setConnectionRefuseError(true);
                    }
                }
            )
        }else{
            setAreaNames({key:"No Result"});
        }
    }

    const containerRef = useRef(null);
    const[firstHeight, setFirstHeight]=useState(0);

    const HandlerToSetFirstHeight=()=>{
        if (containerRef.current) {
            const container = document.getElementById('your-container-id');
            setFirstHeight(container.scrollHeight);
        }
    }

    useEffect(() => {
        if (containerRef.current) {
          const container = document.getElementById('your-container-id');
          const scrollPosition = firstHeight;
          
          container.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }
    }, [firstHeight]);

    const [reachedBottom, setReachedBottom] = useState(false);
    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop + container.clientHeight+10 >= container.scrollHeight && count>0 || countUserSearch>0) {
            if (!reachedBottom) {
                if(userSearchActivated){
                    HandlerSearch('user');
                }else{
                    HandlerToLoadHostels('user');
                }
                setReachedBottom(true); 
            }
        }else {
            setReachedBottom(false);
        }
    };

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
                                <div style={{marginLeft:'8px',display:'flex',justifyContent:'flex-start'}}>
                                    <input
                                        name='hostelType'
                                        value={'Girls Hostel'}
                                        type='checkbox'
                                        style={{marginLeft:'6px',height: '14px', width: '14px' ,cursor:'pointer'}}
                                        checked={SearchDeatils.hostelType === "Girls Hostel"}
                                        onClick={HandlerToSetDetailsForSearch}
                                    />
                                    &nbsp;Girls
                                </div>
                                <div style={{marginLeft:'10px',display:'flex',justifyContent:'flex-start'}}>
                                    <input
                                        name="hostelType"
                                        value={'Boys Hostel'}
                                        type='checkbox'
                                        style={{height: '14px', width: '14px',cursor:'pointer'}}
                                        checked={SearchDeatils.hostelType === "Boys Hostel"}
                                        onClick={HandlerToSetDetailsForSearch}
                                    />
                                    &nbsp;Boys
                                </div>
                            </div>

                            <div style={{marginBottom:'10px'}}>
                                <label>Room Type:</label>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginLeft:'10px'}}>

                                            <label style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                <input
                                                    name="share"
                                                    value={'oneShare'}
                                                    type='checkbox'
                                                    style={{height: '14px', width: '14px' ,cursor:'pointer'}}
                                                    checked={SearchDeatils.share === "oneShare"}
                                                    onClick={HandlerToSetDetailsForSearch}
                                                />
                                                &nbsp;1-share
                                            </label>

                                            <label style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                <input
                                                    name="share"
                                                    value={'twoShare'}
                                                    type='checkbox'
                                                    style={{ height: '14px', width: '14px' ,cursor:'pointer'}}
                                                    checked={SearchDeatils.share === "twoShare"}
                                                    onClick={HandlerToSetDetailsForSearch}
                                                />
                                                &nbsp;2-share
                                            </label>

                                            <label style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                <input
                                                    name="share"
                                                    value={"threeShare"}
                                                    type='checkbox'
                                                    style={{ height: '14px', width: '14px' ,cursor:'pointer'}}
                                                    checked={SearchDeatils.share === "threeShare"}
                                                    onClick={HandlerToSetDetailsForSearch}
                                                />
                                                &nbsp;3-share
                                            </label>

                                            <label style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                <input
                                                    name="share"
                                                    value={'fourShare'}
                                                    type='checkbox'
                                                    style={{ height: '14px', width: '14px' ,cursor:'pointer'}}
                                                    checked={SearchDeatils.share === "fourShare"}
                                                    onClick={HandlerToSetDetailsForSearch}
                                                />
                                                &nbsp;4-share
                                            </label>

                                            <label style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                <input
                                                    name="share"
                                                    value={'fiveShare'}
                                                    type='checkbox'
                                                    style={{ height: '14px', width: '14px' ,cursor:'pointer'}}
                                                    checked={SearchDeatils.share === "fiveShare"}
                                                    onClick={HandlerToSetDetailsForSearch}
                                                />
                                                &nbsp;5-share
                                            </label>
                                    </div>
                            
                            </div>

                            <div style={{marginBottom:'10px'}}>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    {SearchDeatils.share}  &#8377;/month:
                                    <input type="number" name="price"  value={SearchDeatils.price} placeholder={'Rs.'} className={homePageCss.filtersIn} onChange={HandlerToSetDetailsForSearch} />
                                </div>
                            </div>

                            <div style={{marginBottom:'10px',display:'flex',flexDirection:'column'}}>
                                <label>State:&nbsp;{SearchDeatils.stateName || "--Not Selected--"}</label>
                                    <input id="stateId" type="search" placeholder="search" className={homePageCss.filtersIn} onChange={stateInputChangeHandler} />

                                {showStatesList&&
                                    <div className={homePageCss.scaListShowTd}>
                                        <label style={{fontSize:'small', color: '#800000',marginLeft:'10px'}}>Select State Name:</label>
                                        <ul >
                                            {Object.keys(stateNames).map((key) => (
                                                <li key={stateNames[key]} className={homePageCss.scaListShowLi} onClick={()=>{if(stateNames[key]!=="No Result"){HandlerToSetDetailsForSearch(stateNames[key],"stateName")}}}>
                                                    {stateNames[key]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>

                            <div style={{marginBottom:'10px',display:'flex',flexDirection:'column'}}>
                                <label>City:&nbsp;{showLocErr?<label style={{color:'maroon'}}>First select state</label>:SearchDeatils.cityName || "--Not Selected--"}</label>
                                <input id="cityId" type="search" placeholder="search" className={homePageCss.filtersIn} onChange={cityInputChangeHandler} />
                                
                                {showCitysList&&
                                    <div className={homePageCss.scaListShowTd}>
                                        <label style={{fontSize:'small', color: '#800000',marginLeft:'10px'}}>Select City Name:</label>
                                        <ul >
                                            {Object.keys(cityNames).map((key) => (
                                                <li key={cityNames[key]} className={homePageCss.scaListShowLi} onClick={()=>{if(cityNames[key]!=="No Result"){HandlerToSetDetailsForSearch(cityNames[key],"cityName")}}}>
                                                    {cityNames[key]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>

                            <div style={{marginBottom:'10px',display:'flex',flexDirection:'column'}}>
                                <label>Area:&nbsp;{showAreaErr?<label style={{color:'maroon'}}>{areaErr}</label>:SearchDeatils.areaName || "--Not Selected--"}</label>
                                <input id="areaId" type="search" placeholder="search" className={homePageCss.filtersIn} onChange={areaInputChangeHandler} />
                                   
                                {showAreasList&&
                                    <div className={homePageCss.scaListShowTd}>
                                        <label style={{fontSize:'small', color: '#800000',marginLeft:'10px'}}>Select Area Name:</label>
                                        <ul >
                                            {Object.keys(areaNames).map((key) => (
                                                <li name="areaName" className={homePageCss.scaListShowLi} key={areaNames[key]} onClick={()=>{if(areaNames[key]!=="No Result"){HandlerToSetDetailsForSearch(areaNames[key],"areaName")}}}>
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
                                    <button style={{marginBottom:'15px'}} className={homePageCss.pgAndSearchButton} onClick={HandlerSearch} disabled={loading}>Search</button>
                                    <button  className={homePageCss.cancelButton} onClick={searchCancelHandler}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </header>
                }

                <div style={{backgroundColor:'white',height:'94%',width:'100%' }}>
                    {loginDisplay &&
                        <div  className={homePageCss.loginDisplay} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                            <label className={homePageCss.cross} onClick={()=>setLoginDisplay(!loginDisplay)}>X</label>
                            
                            <button className={homePageCss.loginAndSignupButton} onClick={() => navigate('/login')}>Login</button>
                            <button style={{marginTop:'12px'}} className={homePageCss.loginAndSignupButton} onClick={() => navigate('/signup')}>Signup</button>
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
                                    {noDataFound && userSearchActivated ?
                                        <div style={{height:'100%',display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
                                            <img src={noDataImage} alt="noDataImg"/>
                                            <div onClick={()=>{setShowFilters(true)}} style={{color:'blue',cursor:'pointer',marginBottom:'8px'}}>'Click'<label style={{color:'#B2BEB5',marginLeft:'8px'}}>to Change Filters Options.</label></div>
                                            <div style={{color:'#B2BEB5',marginBottom:'8px'}}>Or</div>
                                            <div onClick={searchCancelHandler} style={{color:'blue',cursor:'pointer',marginBottom:'8px'}}>'Click'<label style={{color:'#B2BEB5',marginLeft:'8px'}}>to go home Page.</label></div>
                                        </div>
                                    :
                                        <div id="your-container-id" ref={containerRef} onScroll={()=>{userSearchActivated?countUserSearch===1&& handleScroll():count===1&& handleScroll()}} style={{scrollBehavior:'smooth',backgroundColor: ' #E2D1F9',width:'100%',height:'100%',overflow:'auto',display:'flex', justifyContent:'center',alignItems:'center'}} className={homePageCss.hostelsContainer}>
                                            {totalHostelsDetailsHomePage&&
                                                <div  style={{width:'88%', height:'100%'}}>
                                                    {userSearchActivated?
                                                        <div>
                                                            <div style={{marginTop:'20px',marginBottom:'20px'}}>
                                                                <label onClick={searchCancelHandler} style={{color:'blue',cursor:'pointer'}}>'Click Here'</label> <label style={{marginLeft:'10px'}}>To Exit from Search Result.</label>
                                                                <h2 style={{marginTop:'10px'}}>Search Result:</h2>
                                                            </div>
                                                            {Object.keys(totalHostelsDetailsHomePageUserSearch).map(key => (
                                                                <DisplayHostelsHomePage
                                                                    style={{ marginBottom: '40px' }}
                                                                    key={key}
                                                                    data={totalHostelsDetailsHomePageUserSearch[key]}
                                                                />
                                                                )).reverse()
                                                            }
                                                            <div  style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                {countUserSearch===1?<Oval color="black" width={33} height={33}/>:<label>Results End</label>}
                                                            </div>
                                                        </div>
                                                    :
                                                        <div>
                                                            <h2 style={{marginTop:'20px',marginBottom:'20px',}}>Hostels:</h2>
                                                            {Object.keys(totalHostelsDetailsHomePage).map(key => (
                                                                <DisplayHostelsHomePage
                                                                    style={{ marginBottom: '40px' }}
                                                                    key={key}
                                                                    data={totalHostelsDetailsHomePage[key]}
                                                                />
                                                                )).reverse()
                                                            }
                                                            <div  style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                {count===1?<Oval color="black" width={33} height={33}/>:<label>Results End</label>}
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
