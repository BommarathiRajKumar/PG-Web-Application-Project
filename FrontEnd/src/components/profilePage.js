import {useEffect, useState} from 'react';
import profilePageCss from '../css/profilePage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DisplayHostels from './displayHostels.js';
import noDataImage from '../images/noData.jpg';
import { Oval } from 'react-loader-spinner';


const Profile = ()=>{
    const [isLoading, setIsLoading] = useState(true);
    const [fetch, setFetch] = useState(true);
    const navigate = useNavigate();
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
    

    const [hostelDetails, setHostelDetails] = useState({
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
        setHostelDetails({...hostelDetails,[e.target.name]:e.target.value})   
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
    const addHostelControlHandlerFalse = () => {
        setAddHostelControl(false)
    }
    const addHostelControlHandlerTrue = () => {
        setAddHostelControl(true)
    }
    const sendHostelDeatils = e => { 
        const formData = new FormData()
        
        formData.append("mobileNumber",mob)
        formData.append('hostelName',hostelDetails.hostelName)
        formData.append('hostelType',hostelType)
        formData.append('oneShareCost',hostelDetails.oneShareCost)
        formData.append('twoShareCost',hostelDetails.twoShareCost)
        formData.append('threeShareCost',hostelDetails.threeShareCost)
        formData.append('fourShareCost',hostelDetails.fourShareCost)
        formData.append('fiveShareCost',hostelDetails.fiveShareCost)
        formData.append('wifi',wifi)
        formData.append('laundry',laundry)
        formData.append('hotWater', hotWater)
        formData.append('imageOne',imageOne)
        formData.append('imageTwo',imageTwo)
        formData.append('imageThree',imageThree)
        formData.append('stateName',hostelDetails.stateName)
        formData.append('cityName', hostelDetails.cityName)
        formData.append('areaName', hostelDetails.areaName)
        formData.append('landMark', hostelDetails.landMark)

        axios.post("http://localhost:8080/PG/uploadHostel", formData).then(
            function (res) {
                if(res.status === 200) {
                    setFetch(true)   
                }else{
                    alert("internal server error")
                }
            }
        ).catch((err) => {
            alert("internall server Error");
        })
    }

    const logOut = (e) => {
        localStorage.removeItem('mobile')
        localStorage.removeItem('password')
        setMob(null)
        setPass(null)
        setFetch(false)
        window.location.href = '/login';
    }

    if(fetch){
        axios.post("http://localhost:8080/PG/profile?mobile="+mob+"&password="+pass).then(
            response => {
                if(response.status===200){
                    setUserData(response.data);
                    setTotalHostelsCount(Object.keys(response.data.hostelDetails).length)
                    setIsLoading(false)
                    setFetch(false)
                }
            }
        ).catch((err)=>{
            alert(err)
            logOut();
            
        })
    }

    return(
        <div className={profilePageCss.mainDiv}>
            {isLoading ? 
                <div className={profilePageCss.loaderContainer}>
                    <div  className={profilePageCss.loader}>
                        <Oval  color="#00BFFF" height={60} width={60} />
                        <br/>
                        Please wait, Data is loading...
                    </div>
                </div>
            :
            <div>
                {addHostelControl?
                    <div>
                        <div className={profilePageCss.profileContainer}>
                            {userData && (
                                <img
                                    className={profilePageCss.profilePhoto}
                                    src={`data:image/jpeg;base64,${userData.profileDetails.ownerImage}`} // Display the ownerImage using data URL
                                    alt="profile"
                                />
                            )}
                            {userData&&<div>{userData.profileDetails.mobileNumber}</div>}
                            <button onClick={addHostelControlHandlerFalse} className={profilePageCss.addHstl}>Add New Hostle?</button>
                            <button onClick={logOut}>Log out</button>
                        </div>
                        <br/>
                        {totalHostelsCount>0 ?
                            <div style={{position:'absolute', left:'10%'}}>
                                {Object.keys(userData.hostelDetails).map((key) => (
                                    <DisplayHostels key={key} data={userData.hostelDetails[key]}/>
                                ))}
                            </div>
                        :
                            <div className={profilePageCss.noData}>
                                <img src={noDataImage}/><br/>
                                Click Above "Add New Hostel?".
                            </div>
                        }
                    </div>
                :
                <div className={profilePageCss.newHostelFormContainer}>
                    <form onSubmit={sendHostelDeatils} className={profilePageCss.addNewHostelForm}>
                        <div>Hostel Name</div>
                        <input type='text' name="hostelName" value={hostelDetails.hostelName} onChange={hostelDetailsUpdateHandler}/><br/><br/>

                        <div>One Share room cost per month</div>
                        <input type='text' name="oneShareCost" value={hostelDetails.oneShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                            
                        <div>Two Share room cost per month</div>
                        <input type='text' name="twoShareCost" value={hostelDetails.twoShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                            
                        <div>Three Share room cost per month</div>
                        <input type='text' name="threeShareCost" value={hostelDetails.threeShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                            
                        <div>Four Share room cost per month</div>
                        <input type='text' name="fourShareCost" value={hostelDetails.fourShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                            
                        <div>Five Share room cost per month</div>
                        <input type='text' name="fiveShareCost" value={hostelDetails.fiveShareCost} onChange={hostelDetailsUpdateHandler}/><br/><br/>

                        <div>Please upload the sample images of hostel rooms</div>
                        <input type='file' name='imageOne' onChange={handleSubmitOne}/><br/><br/>
                        <input type='file' name='imageTwo' onChange={handleSubmitTwo}/><br/><br/>
                        <input type='file' name='imageThree' onChange={handleSubmitThree}/><br/><br/>

                        <div>Hostel Address</div>
                        <div>Sate Name</div>
                        <input type='text' name="stateName" value={hostelDetails.stateName} onChange={hostelDetailsUpdateHandler}/>
                        <div>City Name</div>
                        <input type='text' name="cityName" value={hostelDetails.cityName} onChange={hostelDetailsUpdateHandler}/>
                        <div>Area Name</div>
                        <input type='text' name="areaName" value={hostelDetails.areaName} onChange={hostelDetailsUpdateHandler}/>
                        <div>Land Mark</div>
                        <textarea type='text' name="landMark" value={hostelDetails.LandMark} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                            
                        <div>Hostel type</div>
                        <div>
                            Girls
                            <input type="checkbox" value="Girls Hostel" checked={hostelType === 'Girls Hostel'} onChange={hostelTypeHandler}/>
                        </div>
                        <div>
                            Boys
                            <input type="checkbox" value="Boys Hostel" checked={hostelType === 'Boys Hostel'} onChange={hostelTypeHandler}/>
                        </div><br/>
                        <div>wifi Available</div>
                        <div>
                            Yes
                            <input type="checkbox" value="yes" checked={wifi === "yes"} onChange={wifiHandler}/>
                        </div>
                        <div>
                            No
                            <input type="checkbox" value="no" checked={wifi === "no"} onChange={wifiHandler}/>
                        </div><br/>

                        <div>laundry Available</div>
                        <div>
                            Yes
                            <input type="checkbox" value="yes" checked={laundry === "yes"} onChange={laundryHandler}/>
                        </div>
                        <div>
                            No
                            <input type="checkbox" value="no" checked={laundry === "no"} onChange={laundryHandler}/>
                        </div><br/>

                        <div>HotWater Available</div>
                        <div>
                            Yes
                            <input type="checkbox" value="yes" checked={hotWater === "yes"} onChange={hotWaterHandler}/>
                        </div>
                        <div>
                            No
                            <input type="checkbox" value="no" checked={hotWater === "no"} onChange={hotWaterHandler}/>
                        </div><br/>
                        <button>Add</button><br/><br/>
                        <button onClick={addHostelControlHandlerTrue}>cancel</button><br/><br/>
                    </form>
                </div>}
            </div>}
        </div>
    )
}

export default Profile;