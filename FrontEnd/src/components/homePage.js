import React,{useEffect, useState} from "react"
import noDataImage from '../images/noData.jpg';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import DisplayHostelsPage from './displayHostelsPage.js';
import homePageCss from "../css/homePage.module.css"
import { Oval } from 'react-loader-spinner';
import ConnectionRefuse from '../components/connectionRefusePage'
import ServerError from '../components/serverErrorPage'

const Home = () =>{
    const navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [loginDisplay, setLoginDisplay] = useState(false);
    const [connectionRefuseError, setConnectionRefuseError]=useState(false);
    const [serverError, setServerError]=useState(false);
    const[noDataFound, setNoDataFound]=useState(false);
    
    const [totalHostelsDetails, setTotalHostelsDetails] = useState();
    useEffect(() => {
        setLoading(true);
        setServerError(false);
        setNoDataFound(false);
        setConnectionRefuseError(false);

        axios.post("https://www.bestpgs.in/BackEnd/home?state=one")
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
    }


    const [userSelectedRoomType, setUserSelectedRoomType] = useState();
    const [showRoomsList, setShowRoomsList] = useState(false);
    const Handler_setShowRoomsList = () => {
        setShowRoomsList(!showRoomsList)
        setHeaderHeight(30)
    } 
    const HandlerSetUserSelectedRoomType = (data) => {
        setUserSelectedRoomType(data);
        setShowRoomsList(!showRoomsList);
    };


    const [userSelectedPrice, setUserSelectedPrice] = useState();
    const HandlerSetUserSelectedPrice = (price) =>{
        setUserSelectedPrice(price);
    }


    const  noResultJson = {
        key: '-- No Result --'
    };
    
    const[stateNamesLoading,setStateNamesLoading] = useState(false)
    const [stateNames, setStateNames] = useState('');
    const [userSelectedStateName, setUserSelectedStateName] = useState(null);
    const [showStatesList, setShowStatesList] = useState(false);
    
    const handleStateSelect = (stateName)=>{
        setUserSelectedStateName(stateName)
        setShowStatesList(false)
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
            axios.post("https://www.bestpgs.in/BackEnd/filterWord?type=stateName&word="+letters)
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
                            alert("working")
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
            axios.post("https://www.bestpgs.in/BackEnd/filterWord?type=cityName&stateName="+userSelectedStateName+"&word="+letters)
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
            axios.post("https://www.bestpgs.in/BackEnd/filterWord?type=areaName&stateName="+userSelectedStateName+"&cityName="+userSelectedCityName+"&word="+letters)
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


    const [formErr, setFormErr] = useState(false);
    const [errToPrint, setErrToPrint] = useState()

    const HandlerSearch = (e) => {
        e.preventDefault();

        if(userSelectedHostelType==null){
            setErrToPrint("Please select the hostelType.")
            setFormErr(true);
        }else if(userSelectedRoomType==null){
            setErrToPrint("Please select the RoomType.")
            setFormErr(true);
        }else if(userSelectedPrice==null || isNaN(userSelectedPrice)){
            setErrToPrint("Please enter the Proper Rs/month.")
            setFormErr(true);
           
        }else if(userSelectedStateName===null || userSelectedStateName==="-- No Result --"){
            setErrToPrint("Please select the state name.")
            setFormErr(true);    
        }else if(userSelectedCityName===null || userSelectedCityName==="-- No Result --"){
            setErrToPrint("Please select the city name.")
            setFormErr(true);     
        }else if(userSelectedAreaName===null || userSelectedAreaName==="-- No Result --"){
            setErrToPrint("Please select the Area name.")
            setFormErr(true); 
        }else{
            const formData = new FormData()

            formData.append('state','userSearch')
            formData.append("hostelType", userSelectedHostelType)
            formData.append('share', userSelectedRoomType)
            formData.append('price', userSelectedPrice)
            formData.append('stateName', userSelectedStateName)
            formData.append('cityName', userSelectedCityName)
            formData.append('areaName', userSelectedAreaName)
            
            setErrToPrint('')
            setFormErr(false)
            setHeaderHeight(18)
            setLoading(true);

            setConnectionRefuseError(false);
            setServerError(false);
            setNoDataFound(false);

            axios.post("https://www.bestpgs.in/BackEnd/home?", formData)
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

    const [headerHeight, setHeaderHeight]=useState(18);
    const[buttonHeight,setButtonHeight]=useState();
    const[hostelTypeTop, setHostelTypeTop] = useState();
    const[roomTypeTop, setRoomTypeTop]=useState();
    const[amountTop, setAmountTop]=useState()
    const[mainHeight, setMainHeight]=useState()

    useEffect(() => {
        if (headerHeight === 30) {
            setButtonHeight(12);
            setHostelTypeTop(12);
            setRoomTypeTop(23);
            setAmountTop(35);
            setMainHeight(70);
        } else {
            setButtonHeight(20);
            setHostelTypeTop(20); 
            setRoomTypeTop(45);
            setAmountTop(68);
            setMainHeight(82);
        }
    }, [headerHeight]);
    

    return(
        
        <div className={homePageCss.mainDiv}>
            <div className={homePageCss.mainContainer}>               
                <header style={{ height: `${headerHeight}%` }} className={homePageCss.header}>
                    <button style={{height:`${buttonHeight}%`}} className={homePageCss.pgButton} onClick={() => setLoginDisplay(true)}>PG owner?</button>
                    <strong style={{color:'black',fontFamily:'sans-serif',position:'absolute', left:'1%', top:'1%'}}>Filters to find desired hostel.</strong>
                    
                    <div style={{position:'absolute', left:'1%',top:`${hostelTypeTop}%`, width:'100%'}}>
                            <div style={{ position: 'relative', width: '55%'}}>
                                <div style={{cursor: 'pointer',padding: '0px',border: '1px solid black',display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}onClick={Handler_setShowHostelTypeList}>
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Hostel Type: {userSelectedHostelType || 'Not Selected'}
                                    </div>
                                    <div>{showHostelTypeList ? '▲' : '▼'}</div>
                                </div>
                                    
                                {showHostelTypeList&&
                                    <ul style={{ width:'88%', height:'60px', listStyleType: 'disc', padding: '0 15px'}}>
                                        <li onClick={() => handleHostelTypeSelect('Girls Hostel')} style={{ cursor: 'pointer', background: userSelectedHostelType === 'Girls Hostel' ? 'grey' : 'none' }}>
                                            Girls Hostel.
                                        </li>
                                        <li onClick={() => handleHostelTypeSelect('Boys Hostel')} style={{ cursor: 'pointer', background: userSelectedHostelType === 'Boys Hostel' ? 'grey' : 'none' }}>
                                            Boys Hostel.
                                        </li>
                                    </ul>
                                }
                            </div>
                    </div>

                    <div style={{position:'absolute', left:'1%',top:`${roomTypeTop}%`, width:'100%'}}>
                        {!showHostelTypeList &&
                            <div style={{ position: 'relative', width: '55%' }}>
                                <div style={{cursor: 'pointer',padding: '0px',border: '1px solid black',display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}onClick={Handler_setShowRoomsList}>
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Room Type: {userSelectedRoomType || 'Not Selected'}
                                    </div>
                                    <div>{showRoomsList ? '▲' : '▼'}</div>
                                </div>
                                
                                {showRoomsList&&
                                    <ul style={{marginLeft:'5%', width:'88%', height:'60px', listStyleType: 'disc', padding: '0 15px', overflow:'auto' }}>
                                        <li onClick={() => HandlerSetUserSelectedRoomType('oneShare')} style={{ cursor: 'pointer', background: userSelectedRoomType === 'oneShare' ? 'grey' : 'none' }}>
                                            oneShare
                                        </li>
                                        <li onClick={() => HandlerSetUserSelectedRoomType('twoShare')} style={{ cursor: 'pointer', background: userSelectedRoomType === 'twoShare' ? 'grey' : 'none' }}>
                                            twoShare
                                        </li>
                                        <li onClick={() => HandlerSetUserSelectedRoomType('threeShare')} style={{ cursor: 'pointer', background: userSelectedRoomType === 'threeShare' ? 'grey' : 'none' }}>
                                            threeShare
                                        </li>
                                        <li onClick={() => HandlerSetUserSelectedRoomType('fourShare')} style={{ cursor: 'pointer', background: userSelectedRoomType === 'fourShare' ? 'grey' : 'none' }}>
                                            fourShare
                                        </li>
                                        <li onClick={() => HandlerSetUserSelectedRoomType('fiveShare')} style={{ cursor: 'pointer', background: userSelectedRoomType === 'fiveShare' ? 'grey' : 'none' }}>
                                            fiveShare
                                        </li>
                                    </ul>
                                }
                            </div>
                        }
                    </div>

                    <div style={{position:'absolute', left:'1%',top:`${amountTop}%`, width:'100%'}}>
                        {!showHostelTypeList && !showRoomsList &&
                            <div>
                                <label>Enter &#8377;/month: </label>
                                <input style={{width: '24%' }} type="text" value={userSelectedPrice} onChange={(e)=>HandlerSetUserSelectedPrice(e.target.value)} /><br/><br/>
                            </div>
                        }
                    </div>

                    {headerHeight===18?
                        <div>
                            {!showHostelTypeList && !showRoomsList &&
                                <div style={{color:'blue',position:'absolute', left:'1%',top:'85%', cursor:'pointer'}} onClick={()=>setHeaderHeight(30)}>more filters</div>
                            }
                        </div>
                    :
                        <div>
                        {!showHostelTypeList && !showRoomsList &&
                        <div>
                            <div style={{position:'absolute',marginTop:'4%', left:'1%',top:'40%', width:'100%'}}>
                                <label style={{ marginTop:'5%'}}>State Name:</label>
                                <input value={userSelectedStateName} placeholder={'Not selected'} style={{width:'30%'}} type="text" onClick={stateInputChangeHandler} onChange={stateInputChangeHandler} />
                            </div>
                            {showStatesList&&
                                <div style={{position:'absolute',left:'57%',top:'18%',width:'43%',height:'100%'}}>
                                    {stateNamesLoading?
                                        <div style={{position:'relative', left:'31%', top:'25%'}}>
                                            <Oval  color="#00BFFF" height={40} width={40} />
                                            loading...
                                        </div>
                                    :
                                            <ul style={{position:'relative',marginTop:'0',border:'3px solid black',backgroundColor:'white', width:'67%',height:'78%', listStyleType: 'disc',overflow:'auto'}}>
                                                <li style={{position:'relative',left:'-20px',color:'red',marginBottom:'5%',marginTop:'5%'}}>Select State Name:</li>                                
                                                {Object.keys(stateNames).map((key) => (
                                                    <li key={stateNames[key]} onClick={() => handleStateSelect(stateNames[key])} style={{position:'relative',left:'-20px',color:'black', cursor: 'pointer'}}>
                                                        {stateNames[key]}
                                                    </li>
                                                ))}
                                            </ul>
                                    
                                    }
                                </div>
                            }

                            <div style={{position:'absolute',marginTop:'4%', left:'1%',top:'53%', width:'100%'}}>
                                <label style={{ marginTop:'5%'}}>City Name:</label>
                                <input value={userSelectedCityName} placeholder={'Not selected'} style={{width:'30%'}} type="text" onClick={cityInputChangeHandler} onChange={cityInputChangeHandler} />
                            </div>
                            {showCitysList&&
                                <div style={{position:'absolute',left:'57%',top:'18%',width:'43%',height:'100%'}}>
                                    {cityNamesLoading?
                                        <div style={{position:'relative', left:'31%', top:'25%'}}>
                                            <Oval  color="#00BFFF" height={40} width={40} />
                                            loading...
                                        </div>
                                    :
                                            <ul style={{position:'relative',marginTop:'0',border:'3px solid black',backgroundColor:'white', width:'67%',height:'78%', listStyleType: 'disc',overflow:'auto'}}>
                                                <li style={{position:'relative',left:'-20px',color:'red',marginBottom:'5%',marginTop:'5%'}}>Select city Name:</li>                                
                                                {Object.keys(cityNames).map((key) => (
                                                    <li key={cityNames[key]} onClick={() => handleCitySelect(cityNames[key])} style={{position:'relative',left:'-20px',color:'black', cursor: 'pointer'}}>
                                                        {cityNames[key]}
                                                    </li>
                                                ))}
                                            </ul>
                                    
                                    }
                                </div>
                            }

                            <div style={{position:'absolute',marginTop:'4%', left:'1%',top:'63%', width:'100%'}}>
                                <label style={{ marginTop:'5%'}}>Area Name:</label>
                                <input value={userSelectedAreaName} placeholder={'Not selected'} style={{width:'30%'}} type="text" onClick={areaInputChangeHandler} onChange={areaInputChangeHandler} />
                            </div>
                            {showAreasList&&
                                <div style={{position:'absolute',left:'57%',top:'18%',width:'43%',height:'100%'}}>
                                    {areaNamesLoading?
                                        <div style={{position:'relative', left:'31%', top:'25%'}}>
                                            <Oval  color="#00BFFF" height={40} width={40} />
                                            loading...
                                        </div>
                                    :
                                            <ul style={{position:'relative',marginTop:'0',border:'3px solid black',backgroundColor:'white', width:'67%',height:'78%', listStyleType: 'disc',overflow:'auto'}}>
                                                <li style={{position:'relative',left:'-20px',color:'red',marginBottom:'5%',marginTop:'5%'}}>Select Area Name:</li>                                
                                                {Object.keys(areaNames).map((key) => (
                                                    <li key={areaNames[key]} onClick={() => handleAreaSelect(areaNames[key])} style={{position:'relative',left:'-20px',color:'black', cursor: 'pointer'}}>
                                                        {areaNames[key]}
                                                    </li>
                                                ))}
                                            </ul>
                                    
                                    }
                                </div>
                            }
                                
                            <div style={{position:'absolute', left:'1%',top:'86%', width:'100%', overflow:'auto'}}>
                                <button style={{backgroundColor:'#25D366', width: '20%'}} onClick={HandlerSearch}>search</button>
                            </div>

                            <div style={{position:'absolute', left:'25%',top:'90%', width:'100%', overflow:'auto'}}>
                                {formErr && !showStatesList && !showCitysList && !showAreasList && <div  style={{color: 'red'}}>{errToPrint}</div>}
                            </div> 
                        </div>
                        }
                        </div>
                    }              
                </header>
                <main style={{height:`${mainHeight}%`}} className={homePageCss.main}>
                    { serverError || connectionRefuseError ?
                        <div style={{height:'100%', width:'100%'}}>
                            {serverError ? <ServerError/>:<ConnectionRefuse />}
                        </div>
                    :
                        <div style={{height:'100%', width:'100%'}}>
                            {loading?
                                <div  className={homePageCss.Containerloader}>
                                    <div className={homePageCss.loader}>
                                        <Oval color="#00BFFF" height={60} width={60} />
                                        <div style={{marginTop:'8%'}}>
                                            Please wait, Data is loading...
                                        </div>
                                    </div>
                                </div>
                            
                            :
                                <div style={{width:'100%',height:'100%'}}>
                                    {noDataFound?
                                        <div style={{backgroundColor:'white',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                <img src={noDataImage} alt="noDataImg"/><br/>
                                                <div style={{color:'#B2BEB5'}}>Please do Change Filters Options.</div>
                                            </div>
                                        </div>
                                    :
                                        <div>
                                            {totalHostelsDetails&&
                                                <div style={{position: 'absolute', top: '3%', left: '6%', right:'0',overflow: 'auto'}}>
                                                    <div>&nbsp;&nbsp;Hostels:</div><br/>
                                                        {Object.keys(totalHostelsDetails).map((key) => (
                                                            <DisplayHostelsPage key={key} data={totalHostelsDetails[key]}/> 
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }
                                </div> 
                            }
                        </div>
                    }
                        
                </main>    
                {loginDisplay&&
                    <div style={{ backgroundColor: '#317773', border: '3px solid black', borderRadius: '10px' ,width: '50%', height: '20%', position: 'absolute', left: '25%', top: '45%'}}>
                        <label style={{ width: '20%', color: 'red', position: 'absolute', top: '4%', left: '88%' }} onClick={()=>setLoginDisplay(!loginDisplay)}>X</label>
                        <button style={{backgroundColor:'#25D366', width: '50%', height: '25%', position: 'absolute', top: '20%', left: '24%' }} onClick={()=>navigate('/login')}>Login</button>
                        <button style={{backgroundColor:'#25D366', width: '50%', height: '25%', position: 'absolute', top: '55%', left: '24%' }} onClick={()=>navigate('/signup')}>Signup</button>
                        <br/>
                    </div>
                }
            </div>
 
        </div>
    )
}
export default Home;