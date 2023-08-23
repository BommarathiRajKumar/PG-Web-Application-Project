import {useEffect, useState} from 'react';
import profilePageCss from '../css/profilePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DisplayHostelsPage from './displayHostelsPage.js';
import noDataImage from '../images/noData.jpg';
import { Oval } from 'react-loader-spinner';
import ServerError from './serverErrorPage';
import ConnectionRefuse from './connectionRefusePage'


const Profile = ()=>{
    const navigate= useNavigate();
    const [loading, setLoading] = useState();
    const [serverErr, setServerErr] = useState(false);
    const [connectionRefuseErr, setConnectionRefuseErr] = useState(false);
    const [hostelType, setHostelType] = useState('');
    const [wifi, setWifi] = useState('');
    const [laundry, setLaundry] = useState('');
    const [hotWater, setHotWater] = useState('');
    const [imageOne, setImageOne]= useState('')
    const [imageTwo, setImageTwo]= useState('')
    const [imageThree, setImageThree]= useState('')
    const [addHostelControl, setAddHostelControl] = useState(true)
    const[mob,setMob] = useState(localStorage.getItem('mobile'))
    const[pass,setPass] = useState(localStorage.getItem('password'))
    const [userData,setUserData] = useState();
    const [totalHostelsCount, setTotalHostelsCount] = useState()
    const [formErr, setFormErr]=useState(false)
    const[err,setErr]=useState();
    

    const [hostelsDetails, setHostelDetails] = useState({
        hostelName: "",
        oneShareCost: "",
        twoShareCost: "",
        threeShareCost: "",
        fourShareCost: "",
        fiveShareCost: "",
        hostelAddress: "",
        stateName: "",
        cityName: "",
        areaName: "",
        landMark: ""
    });
    const hostelDetailsUpdateHandler = (e) => {
        setHostelDetails({...hostelsDetails,[e.target.name]:e.target.value})   
    }
    const hostelTypeHandler = (e) =>{
        setHostelType(e.target.value)
    }
    const wifiHandler = (e) =>{
        setWifi(e.target.value)
    }
    const laundryHandler = (e) => {
        setLaundry(e.target.value)
    }
    const hotWaterHandler = (e) => {
        setHotWater(e.target.value)
    }
    const handleSubmitOne = (e) => {
        setImageOne(e.target.files[0])
    }
    const handleSubmitTwo = (e) => {
        setImageTwo(e.target.files[0])
    }
    const handleSubmitThree = (e) => {
        setImageThree(e.target.files[0])
    }
    const sendHostelDeatils = e => { 
        const formData = new FormData()
       
        formData.append("state","uploadHostel")
        formData.append("mobileNumber",userData.profileDetails.mobileNumber)
        formData.append("ownerName",userData.profileDetails.ownerName)
        formData.append('hostelName',hostelsDetails.hostelName)
        formData.append('hostelType',hostelType)
        formData.append('oneShareCost',hostelsDetails.oneShareCost)
        formData.append('twoShareCost',hostelsDetails.twoShareCost)
        formData.append('threeShareCost',hostelsDetails.threeShareCost)
        formData.append('fourShareCost',hostelsDetails.fourShareCost)
        formData.append('fiveShareCost',hostelsDetails.fiveShareCost)
        formData.append('wifi',wifi)
        formData.append('laundry',laundry)
        formData.append('hotWater', hotWater)
        formData.append('imageOne',imageOne)
        formData.append('imageTwo',imageTwo)
        formData.append('imageThree',imageThree)
        formData.append('stateName',hostelsDetails.stateName)
        formData.append('cityName', hostelsDetails.cityName)
        formData.append('areaName', hostelsDetails.areaName)
        formData.append('landMark', hostelsDetails.landMark)

        if(isNaN(hostelsDetails.oneShareCost)){
            e.preventDefault();
            setFormErr(true)
            setErr("Invalid input at 1-Share room cost/month")
        }else if(isNaN(hostelsDetails.twoShareCost)){
            e.preventDefault();
            setFormErr(true)
            setErr("Invalid input at 2-Share room cost/month")
        }else if(isNaN(hostelsDetails.threeShareCost)){
            e.preventDefault();
            setFormErr(true)
            setErr("Invalid input at '3-Share room cost/month'")    
        }else if(isNaN(hostelsDetails.fourShareCost)){
            e.preventDefault(); 
            setFormErr(true)
            setErr("Invalid input at '4-Share room cost/month'")    
        }else if(isNaN(hostelsDetails.fiveShareCost)){
            e.preventDefault();
            setFormErr(true)
            setErr("Invalid input at '5-Share room cost/month'")    
        }else{
            setFormErr(false)
            axios.post("http://localhost:9090/BackEnd/profile", formData).then(
               async function (res) {
                    if(res.status === 200) {
                        alert("Hostel Uploaded sucessfully.")
                        setAddHostelControl(!addHostelControl)           
                    }else{
                        alert("internal server error please refresh page and try again.")
                    }
                }
            ).catch(() => {
                alert("internal server error please refresh page and try again.")
            })
        }
    }

    const logOut = (e) => {
        localStorage.removeItem('mobile')
        localStorage.removeItem('password')
        setMob(null)
        setPass(null)
        navigate('/login')
    }

    const HandlerToremoveConfidentialLocalData = () =>{
        localStorage.removeItem('mobile')
        localStorage.removeItem('password')
        setMob(null)
        setPass(null)
        setServerErr(true)
    }

    useEffect(()=>{
        setLoading(true);
        setServerErr(false);
        setConnectionRefuseErr(false);

        const formData = new FormData();
        formData.append("state", "profileLoad")
        formData.append("mobile", mob);
        formData.append("password", pass);

        axios.post("http://localhost:9090/BackEnd/profile?", formData).then(
            response => {
                if(response.status===200){
                    setUserData(response.data)
                    setTotalHostelsCount(Object.keys(response.data.hostelsDetails).length)
                }else{
                    HandlerToremoveConfidentialLocalData();
                    setServerErr(true)
                }
            }
        ).catch((err)=>{
            if(err.response){
                if(err.response.status===401){
                    logOut();
                }else{
                    HandlerToremoveConfidentialLocalData();
                    setServerErr(true)
                }
            }else{
                HandlerToremoveConfidentialLocalData();
                setConnectionRefuseErr(true);
            }
        }).finally(()=>{
            setLoading(false);
        })
    },[])


    return(
 
        <div className={profilePageCss.mainDiv}>
            <div className={profilePageCss.mainContainer}>
                {serverErr || connectionRefuseErr ?
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
                        {serverErr && <ServerError/>}
                        {connectionRefuseErr && <ConnectionRefuse/>}
                    </div>
                
                :
                    <div style={{width:'100%',height:'100%'}}>
                        <header className={profilePageCss.header}>
                            {userData && 
                                <div style={{width:'100%',height:'100%',display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
                                    <img
                                        className={profilePageCss.profilePhoto}
                                        src={`data:image/jpeg;base64,${userData.profileDetails.ownerImage}`}
                                        alt="profile"
                                    />
                                    <div style={{fontSize:'75%', marginBottom:'1%'}}>{userData.profileDetails.ownerName}</div>
                                    <div style={{fontSize:'75%'}}>{userData.profileDetails.mobileNumber}</div>
                                    <button style={{fontSize:'75%',width:'40%',height:'13%', marginTop:'1%',marginBottom:'1%'}} onClick={()=>setAddHostelControl(!addHostelControl)}>Add New Hostle?</button>
                                    <button style={{fontSize:'75%',width:'40%',height:'13%', marginBottom:'2%'}} onClick={logOut}>Log out</button>
                                </div>
                            }
                        </header>
                        <main className={profilePageCss.main}>
                            {addHostelControl ?
                                <div style={{width:'100%',height:'100%'}}>
                                    {loading?
                                        <div className={profilePageCss.loaderContainer}>
                                            <div className={profilePageCss.loader}>
                                                <Oval color="#00BFFF" height={60} width={60} />
                                                <div style={{marginTop:'8%'}}>
                                                    Please wait, Data is loading...
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        <div style={{width:'100%',height:'100%'}}>
                                            {totalHostelsCount>0 ?
                                                <div style={{position:'relative',width:'95%',left:'5%',top:'30px'}}>
                                                    <div>&nbsp;&nbsp;Your Hostels:</div><br/>
                                                    {Object.keys(userData.hostelsDetails).map((key) => (
                                                        <DisplayHostelsPage key={key} data={userData.hostelsDetails[key]}/>
                                                    ))}
                                                </div>
                                            :
                                                <div style={{backgroundColor:'white',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                        <img src={noDataImage}/><br/>
                                                        <div style={{color:'#B2BEB5'}}>Click Above "Add New Hostel?" Button.</div>
                                                    </div>
                                                </div>
                                            }
                                        </div> 
                                    }
                                </div>
                            :
                                <div className={profilePageCss.addNewHostelFormDiv}>
                                <form className={profilePageCss.addNewHostelForm}>
                                <div style={{fontSize:'75%',height:'100%',width:'100%',marginLeft:'3%', marginTop:'4%'}}> 
                                    <div>Hostel Name</div>
                                    <input type='text' name="hostelName" value={hostelsDetails.hostelName} onChange={hostelDetailsUpdateHandler}/><br/><br/>

                                    <div className={profilePageCss.shareDiv}>1-Share room &#8377;/month :</div>
                                    <input className={profilePageCss.shareInput}  type='text' name="oneShareCost" value={hostelsDetails.oneShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                        
                                    <div  className={profilePageCss.shareDiv}>2-Share room &#8377;/month :</div>
                                    <input className={profilePageCss.shareInput} type='text' name="twoShareCost" value={hostelsDetails.twoShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                        
                                    <div className={profilePageCss.shareDiv}>3-Share room &#8377;/month :</div>
                                    <input className={profilePageCss.shareInput} type='text' name="threeShareCost" value={hostelsDetails.threeShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                        
                                    <div className={profilePageCss.shareDiv}>4-Share room &#8377;/month :</div>
                                    <input className={profilePageCss.shareInput} type='text' name="fourShareCost" value={hostelsDetails.fourShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                        
                                    <div className={profilePageCss.shareDiv}>5-Share room &#8377;/month :</div>
                                    <input className={profilePageCss.shareInput} type='text' name="fiveShareCost" value={hostelsDetails.fiveShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>

                                    <div>Please upload the sample images of hostel rooms.</div>
                                    <input type='file' name='imageOne' onChange={handleSubmitOne}/><br/><br/>
                                    <input type='file' name='imageTwo' onChange={handleSubmitTwo}/><br/><br/>
                                    <input type='file' name='imageThree' onChange={handleSubmitThree}/><br/><br/>

                                    <div style={{marginBottom:'2%'}}>Hostel Address:</div>
                                    <div>State Name</div>
                                    <input style={{marginBottom:'3%'}} type='text' name="stateName" value={hostelsDetails.stateName} onChange={hostelDetailsUpdateHandler}/>
                                    <div>City Name</div>
                                    <input style={{marginBottom:'3%'}} type='text' name="cityName" value={hostelsDetails.cityName} onChange={hostelDetailsUpdateHandler}/>
                                    <div>Area Name</div>
                                    <input style={{marginBottom:'3%'}} type='text' name="areaName" value={hostelsDetails.areaName} onChange={hostelDetailsUpdateHandler}/>
                                    <div>Land Mark</div>
                                    <textarea style={{width: '80%', height: '8%', overflow: 'auto'}} type='text' name="landMark" value={hostelsDetails.LandMark} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                        
                                    <div>Hostel type:</div>
                                    <div>
                                        Girls
                                        <input style={{position:'relative',left:'4%', width:'20%'}} type="checkbox" value="Girls Hostel" checked={hostelType === 'Girls Hostel'} onChange={hostelTypeHandler}/>
                                    </div>
                                    <div>
                                        Boys
                                        <input style={{position:'relative',left:'4%', width:'21%'}} type="checkbox" value="Boys Hostel" checked={hostelType === 'Boys Hostel'} onChange={hostelTypeHandler}/>
                                    </div><br/>
                                    <div>wifi Available:</div>
                                    <div>
                                        Yes
                                        <input style={{position:'relative',left:'2.3%',height:'20%', width:'28%'}} type="checkbox" value="yes" checked={wifi === "yes"} onChange={wifiHandler}/>
                                    </div>
                                    <div>
                                        No
                                        <input style={{position:'relative',left:'2%', width:'30%'}} type="checkbox" value="no" checked={wifi === "no"} onChange={wifiHandler}/>
                                    </div><br/>

                                    <div>laundry Available:</div>
                                    <div>
                                        Yes
                                        <input style={{position:'relative',left:'1.5%', width:'30%'}} type="checkbox" value="yes" checked={laundry === "yes"} onChange={laundryHandler}/>
                                    </div>
                                    <div>
                                        No
                                        <input style={{position:'relative',left:'1%', width:'32%'}} type="checkbox" value="no" checked={laundry === "no"} onChange={laundryHandler}/>
                                    </div><br/>

                                    <div>HotWater Available:</div>
                                    <div>
                                        Yes
                                        <input style={{position:'relative',left:'1.5%', width:'30%'}} type="checkbox" value="yes" checked={hotWater === "yes"} onChange={hotWaterHandler}/>
                                    </div>
                                    <div>
                                        No
                                        <input style={{position:'relative',left:'1%', width:'32%'}} type="checkbox" value="no" checked={hotWater === "no"} onChange={hotWaterHandler}/>
                                    </div><br/>
                                    {formErr&&<div style={{color: 'red', position:'relative', left:'4%'}}>{err}</div>}<br/>
                                    <button style={{ height:'5%', marginLeft:'5%'}} onClick={sendHostelDeatils}>Add Hostel</button><br/><br/>
                                    <button style={{ height:'5%', marginLeft:'5%'}} onClick={()=>setAddHostelControl(!addHostelControl)}>cancel</button><br/><br/>
                                    </div>
                                </form>   
                                </div>

                            }
                        </main>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;
