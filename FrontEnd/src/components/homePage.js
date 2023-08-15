import React,{useEffect, useState} from "react"
import noDataImage from '../images/noData.jpg';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import DisplayHostelsHomePage from './displayHostelsHomePage.js';
import homePageCss from "../css/homePage.module.css"
const Home = () =>{
    const navigate = useNavigate();
    const [loginDisplay, setLoginDisplay] = useState(false);
    
    const [totalHostelsDetails, setTotalHostelsDetails] = useState();
    const[dataLen, setDataLen]=useState();
    useEffect(()=>{
        axios.post("http://localhost:8080/PG/search?state=one").then(
            function one(res){
                if(res.status===200){
                    setTotalHostelsDetails(res.data);
                    setDataLen(Object.keys(res.data).length)
                }
            }
        ).catch((err)=>{
            alert("initial server error")
        }) 
    },[])


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
    } 
    const HandlerSetUserSelectedRoomType = (data) => {
        setUserSelectedRoomType(data);
        setShowRoomsList(!showRoomsList);
    };


    const [userSelectedPrice, setUserSelectedPrice] = useState();
    const HandlerSetUserSelectedPrice = (price) =>{
        setUserSelectedPrice(price);
    }

    const [stateNames, setStateNames] = useState('');
    const [userSelectedStateName, setUserSelectedStateName] = useState();
    const [showStatesList, setShowStatesList] = useState(false);
    const Handler_setShowStatesList = () => {
        setShowStatesList(!showStatesList)
    }
    const handleStateSelect = (stateName)=>{
        setUserSelectedStateName(stateName)
        setShowStatesList(true)
        setStateNames()
        setShowStatesList(false)
    }
    const stateInputChangeHandler = (event) => {
        const letters = event.target.value;

        if (letters) {
                axios.post("http://localhost:8080/PG/filterWord?type=stateName&word="+letters).then(
                    function(response){
                        if(response.status===200){
                            setStateNames(response.data.dataFromBackEnd);
                            if((Object.keys(response.data.dataFromBackEnd).length)===0){
                                setStateNames(noResultJson);
                            }
                        }else{
                            alert("state Name 1 error.")
                        }
                    }
                ).catch((err)=>{
                    alert("state Name 2 error..")

                })
        } else {
            setStateNames();
        }
    }

    const [cityNames, setCityNames] = useState('');
    const [userSelectedCityName, setUserSelectedCityName] = useState();
    const [showCitysList, setShowCitysList] = useState(false);
    const Handler_setShowCitysList = () => {
        setShowCitysList(!showCitysList)
    }
    const handleCitySelect = (stateName)=>{
        setUserSelectedCityName(stateName)
        setShowCitysList(true)
        setCityNames()
        setShowCitysList(false)
    }
    const cityInputChangeHandler = (event) => {
        const letters = event.target.value;

        if (letters) {
                axios.post("http://localhost:8080/PG/filterWord?type=cityName&stateName="+userSelectedStateName+"&word="+letters).then(
                    function(response){
                        if(response.status===200){
                            setCityNames(response.data.dataFromBackEnd);
                            if((Object.keys(response.data.dataFromBackEnd).length)===0){
                                setCityNames(noResultJson);
                            }
                        }else{
                            alert("state Name 1 error.")
                        }
                    }
                ).catch((err)=>{
                    alert("state Name 2 error..")

                })
        } else {
            setCityNames();
        }
    }

    const [areaNames, setAreaNames] = useState('');
    const [userSelectedAreaName, setUserSelectedAreaName] = useState();
    const [showAreasList, setShowAreasList] = useState(false);
    const Handler_setShowAreasList = () => {
        setShowAreasList(!showAreasList)
    }
    const handleAreaSelect = (stateName)=>{
        setUserSelectedAreaName(stateName)
        setShowAreasList(true)
        setAreaNames()
        setShowAreasList(false)
    }
    const areaInputChangeHandler = (event) => {
        const letters = event.target.value;

        if (letters) {
                axios.post("http://localhost:8080/PG/filterWord?type=areaName&stateName="+userSelectedStateName+"&cityName="+userSelectedCityName+"&word="+letters).then(
                    function(response){
                        if(response.status===200){
                            setAreaNames(response.data.dataFromBackEnd);
                            if((Object.keys(response.data.dataFromBackEnd).length)===0){
                                setAreaNames(noResultJson);
                            }
                        }else{
                            alert("state Name 1 error.")
                        }
                    }
                ).catch((err)=>{
                    alert("state Name 2 error..")

                })
        } else {
            setAreaNames();
        }
    }



    const  noResultJson = {
        key: '-- No Result --'
    };
    const [formErr, setFormErr] = useState(false);
    const [errToPrint, setErrToPrint] = useState()

    const HandlerSearch = (e) => {
        e.preventDefault();
        const formData = new FormData()

        formData.append('state','two')
        formData.append("hostelType", userSelectedHostelType)
        formData.append('share', userSelectedRoomType)
        formData.append('price', userSelectedPrice)
        formData.append('stateName', userSelectedStateName)
        formData.append('cityName', userSelectedCityName)
        formData.append('areaName', userSelectedAreaName)


        if(userSelectedHostelType==null){
            setErrToPrint("Please select the hostelType")
            setFormErr(true);
        }else if(userSelectedRoomType==null){
            setErrToPrint("Please select the RoomType")
            setFormErr(true);
        }else if(userSelectedPrice==null || isNaN(userSelectedPrice)){
            setErrToPrint("Please enter the Proper price")
            setFormErr(true);
           
        }else if(userSelectedStateName==null || userSelectedStateName=="-- No Result --"){
            setErrToPrint("Please select the state name")
            setFormErr(true);    
        }else if(userSelectedCityName==null || userSelectedCityName=="-- No Result --"){
            setErrToPrint("Please select the city name")
            setFormErr(true);     
        }else if(userSelectedAreaName==null || userSelectedAreaName=="-- No Result --"){
            setErrToPrint("Please select the Area name")
            setFormErr(true); 
        }else{
            setErrToPrint('')
            setFormErr(false);
            setHeaderHeight(18) 

            axios.post("http://localhost:8080/PG/search", formData).then(
                function two(res){
                    if(res.status===200){
                        setTotalHostelsDetails(res.data)
                        setDataLen(Object.keys(res.data).length)
                    }
                }
            ).catch((err)=>{
                alert("error")
            })

        }

    }

    const [headerHeight, setHeaderHeight]=useState(18);
    const[buttonHeight,setButtonHeight]=useState();
    const[hostelTypeTop, setHostelTypeTop] = useState();
    const[roomTypeTop, setRoomTypeTop]=useState();
    const[amountTop, setAmountTop]=useState()
    const[mainHeight, setMainHeight]=useState()
    const[mainTop, setMainTop]=useState()

    useEffect(() => {
        if (headerHeight === 30) {
            setButtonHeight(12);
            setHostelTypeTop(12);
            setRoomTypeTop(23);
            setAmountTop(35);
            setMainHeight(70);
            setMainTop(30)
        } else {
            setButtonHeight(20);
            setHostelTypeTop(20); 
            setRoomTypeTop(45);
            setAmountTop(68);
            setMainHeight(82);
            setMainTop(18)
        }
    }, [headerHeight]);
    

    return(
        
     <div className={homePageCss.mainDiv}>
        <div>
            <header style={{ height: `${headerHeight}%` }} className={homePageCss.header}>
                <button style={{height:`${buttonHeight}%`}} className={homePageCss.pgButton} onClick={() => setLoginDisplay(true)}>PG owner?</button>
                <strong style={{color:'black',fontFamily:'sans-serif',position:'absolute', left:'1%', top:'1%'}}>Use Filters To Search Your PG.</strong>
                
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
                                <ul style={{ width:'88%', height:'60px', listStyleType: 'disc', padding: '0 15px', overflow:'scroll' }}>
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
                            <input style={{width: '24%' }} type="text" onChange={(e)=>HandlerSetUserSelectedPrice(e.target.value)} /><br/><br/>
                        </div>
                    }
                </div>

                {headerHeight==18?
                    <div>
                        {!showHostelTypeList && !showRoomsList &&
                            <div style={{color:'blue',position:'absolute', left:'1%',top:'85%', cursor:'pointer'}} onClick={()=>setHeaderHeight(30)}>more filters</div>
                        }
                    </div>
                :<div>
                    <div style={{position:'absolute', left:'1%',top:'48%', width:'100%'}}>
                        {!showHostelTypeList && !showRoomsList &&
                            <div style={{ position: 'relative', width: '55%' }}>
                                <div style={{cursor: 'pointer',padding: '0px',border: '1px solid black',display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}onClick={Handler_setShowStatesList}>
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        State Name: {userSelectedStateName || 'Not selected'}
                                    </div>
                                    <div>{showStatesList  ? '▲' : '▼'}</div>
                                </div>
                                {showStatesList&&
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: '5%', marginTop:'5%'}}>search:</span>
                                        <input style={{marginTop:'5%'}} type="text" onChange={stateInputChangeHandler} />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    {stateNames && showStatesList&&
                        <div style={{border:'1px solid black', borderRadius:'5px',position:'fixed', left:'58%',top:'5%',width:'40%', height:'24%',overflow:'auto'}}>
                            <ul style={{backgroundColor:'lightskyblue', width:'100%',height:'100%', listStyleType: 'disc', overflow:'auto',margin:'0', padding: '20px'}}>
                                <li style={{color:'red'}}>Select Your State Name:</li><br/>                                    
                                {Object.keys(stateNames).map((key) => (
                                    <li key={stateNames[key]} onClick={() => handleStateSelect(stateNames[key])} style={{color:'green', cursor: 'pointer'}}>
                                        {stateNames[key]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }

                    <div style={{position:'absolute', left:'1%',top:'61%', width:'100%', overflow:'auto'}}>
                        {!showHostelTypeList && !showRoomsList && !showStatesList &&
                            <div style={{ position: 'relative', width: '55%' }}>
                                <div style={{cursor: 'pointer',padding: '0px',border: '1px solid black',display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}onClick={Handler_setShowCitysList}>
                                    <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        City Name: {userSelectedCityName || 'Not selected'}
                                    </div>
                                    <div>{showCitysList  ? '▲' : '▼'}</div>
                                </div>
                                {showCitysList&&
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: '5%', marginTop:'5%'}}>search:</span>
                                        <input style={{marginTop:'5%'}} type="text" onChange={cityInputChangeHandler} />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                        {cityNames && showCitysList&&
                            <div style={{border:'1px solid black', borderRadius:'5px',position:'fixed', left:'58%',top:'5%',width:'40%', height:'24%',overflow:'auto'}}>
                                <ul style={{backgroundColor:'lightskyblue', width:'100%',height:'100%', listStyleType: 'disc', overflow:'auto',margin:'0', padding: '20px'}}>
                                    <li style={{color:'red'}}>Select Your City Name:</li><br/>
                                    {Object.keys(cityNames).map((key) => (
                                        <li key={cityNames[key]} onClick={() => handleCitySelect(cityNames[key])} style={{ cursor: 'pointer'}}>
                                            {cityNames[key]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }

                    <div style={{position:'absolute', left:'1%',top:'73%', width:'100%', overflow:'auto'}}>
                        {!showHostelTypeList && !showRoomsList && !showStatesList && !showCitysList &&
                            <div style={{ position: 'relative', width: '55%' }}>
                                <div style={{cursor: 'pointer',padding: '0px',border: '1px solid black',display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}onClick={Handler_setShowAreasList}>
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            Area Name: {userSelectedAreaName || 'Not selected'}
                                        </div>
                                        <div>{showAreasList  ? '▲' : '▼'}</div>
                                    </div>
                                    {showAreasList&&
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '5%', marginTop:'5%'}}>search:</span>
                                            <input style={{marginTop:'5%'}} type="text" onChange={areaInputChangeHandler} />
                                        </div>  
                                    }
                            </div>
                        }
                    </div>
                        {areaNames && showAreasList&&
                            <div style={{border:'1px solid black', borderRadius:'5px',position:'fixed', left:'58%',top:'5%',width:'40%', height:'24%',overflow:'auto'}}>
                                <ul style={{backgroundColor:'lightskyblue', width:'100%',height:'100%', listStyleType: 'disc', overflow:'auto',margin:'0', padding: '20px'}}>
                                    <li style={{color:'red'}}>Select Your Area Name:</li><br/>
                                    {Object.keys(areaNames).map((key) => (
                                        <li key={areaNames[key]} onClick={() => handleAreaSelect(areaNames[key])} style={{ cursor: 'pointer'}}>
                                            {areaNames[key]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }

                    <div style={{position:'absolute', left:'1%',top:'86%', width:'100%', overflow:'auto'}}>
                        {!showHostelTypeList && !showRoomsList && !showStatesList && !showCitysList && !showAreasList &&
                            <button style={{width: '20%'}} onClick={HandlerSearch}>search</button>
                        }
                    </div>

                    <div style={{position:'absolute', left:'25%',top:'90%', width:'100%', overflow:'auto'}}>
                        {formErr && !showHostelTypeList && !showRoomsList && !showStatesList && !showCitysList && !showAreasList &&
                            <div  style={{color: 'red'}}>{errToPrint}</div>
                        }
                    </div> 
                </div>}              
            </header>
            
            {dataLen ?
                <main style={{height:`${mainHeight}%`, top:`${mainTop}%`}} className={homePageCss.main}>  
                    <div style={{backgroundColor: 'lightgray', position: 'absolute', top: '3%',  position: 'absolute', left: '6%', right:'0',overflow: 'auto'}}>
                        <div>&nbsp;&nbsp;Hostels:</div><br/>
                        {Object.keys(totalHostelsDetails).map((key) => (
                            <DisplayHostelsHomePage key={key} data={totalHostelsDetails[key]}/> 
                        ))}
                    </div>
                </main>
            :
                <div className={homePageCss.noData}>
                    <img src={noDataImage}/><br/>
                </div>
            }    
            {loginDisplay&&
                <div style={{ backgroundColor: 'rgb(117 190 218 / 0.6)', border: '3px solid black', borderRadius: '10px' ,width: '50%', height: '20%', position: 'absolute', left: '25%', top: '50%'}}>
                    <label style={{ width: '20%', color: 'red', position: 'absolute', top: '4%', left: '88%' }} onClick={()=>setLoginDisplay(!loginDisplay)}>X</label>
                    <button style={{ width: '50%', height: '25%', position: 'absolute', top: '20%', left: '24%' }} onClick={()=>navigate('/login')}>Login</button>
                    <button style={{ width: '50%', height: '25%', position: 'absolute', top: '55%', left: '24%' }} onClick={()=>navigate('/signup')}>Signup</button>
                    <br />
                </div>
            }

        </div>
 
    </div>
    )

}
export default Home;