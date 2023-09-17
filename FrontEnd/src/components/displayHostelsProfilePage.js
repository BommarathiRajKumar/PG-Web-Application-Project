import React, {useState}from "react";
import axios from "axios";
import displayHostelsProfilePage from '../css/displayHostelsProfilePage.module.css';
import { apiUrl } from "./url";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import   {AiFillPicture} from "react-icons/ai";
import {AiOutlineMore} from "react-icons/ai";
import {AiFillEdit} from "react-icons/ai";
import   {AiFillDelete} from "react-icons/ai";

import {AiOutlineUser} from "react-icons/ai";



import profilePageCss from '../css/profilePage.module.css';

const DisplayHostelsProfilePage=({data,style,refresh})=>{

    const [showFormErr, setShowFormErr]=useState(false)
    const[err,setErr]=useState();

    const [hostelDetails, setHostelDetails] = useState({
        state:"updateHostelDetails",
        id: data.uniqueSerialNumber,
        mobileNumber: data.mobileNumber,
        ownerName: data.ownerName,
        hostelName: data.hostelName,
        hostelType: data.hostelType,
        oneShareApplicable:data.oneShareApplicable,
        oneShareCost: data.oneShareCost,
        oneShareRoomsAvailable: data.oneShareRoomsAvailable,
        twoShareApplicable: data.twoShareApplicable,
        twoShareCost: data.twoShareCost,
        twoShareRoomsAvailable:data.twoShareRoomsAvailable,
        threeShareApplicable:data.threeShareApplicable,
        threeShareCost: data.threeShareCost,
        threeShareRoomsAvailable: data.threeShareRoomsAvailable,
        fourShareApplicable:data.fourShareApplicable,
        fourShareCost: data.fourShareCost,
        fourShareRoomsAvailable: data.fourShareRoomsAvailable,
        fiveShareApplicable: data.fiveShareApplicable,
        fiveShareCost: data.fiveShareCost,
        fiveShareRoomsAvailable: data.fiveShareRoomsAvailable,
        wifi:data.wifi,
        laundry:data.laundry,
        hotWater:data.hotWater,
        imageOne:data.imageOne,
        imageTwo:data.imageTwo,
        imageThree:data.imageThree,
        stateName: data.stateName,
        cityName: data.cityName,
        areaName: data.areaName,
        landMark: data.landMark
    });

    const hostelDetailsUpdateHandler = (e) => {
        if(e.target.name==="imageOne"){
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.files[0]})
        }else if(e.target.name==="imageTwo"){
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.files[0]})
        }else if(e.target.name==="imageThree"){
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.files[0]})
        }else if(e.target.name==="oneShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.oneShareApplicable)})
        }else if(e.target.name==="twoShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.twoShareApplicable)})
        }else if(e.target.name==="threeShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.threeShareApplicable)})
        }else if(e.target.name==="fourShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.fourShareApplicable)})
        }else if(e.target.name==="fiveShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.fiveShareApplicable)})
        }else{
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.value})
        }   
    }













    const navigate=useNavigate();
    const [showHostelDetails, setShowHostelDetails]=useState(false);
    const [currentImage, setCurrentImage] = useState(data.imageOne);
    const imageOneHadler = ()=>{
        setCurrentImage(data.imageOne);
    }
    const imageTwoHadler = ()=>{
        setCurrentImage(data.imageTwo);
    }
    const imageThreeHadler = ()=>{
        setCurrentImage(data.imageThree);
    }
    const[aioutlinemore,setAiOutlineMore]=useState(false);
    const[editPost,setEditPost]=useState(false);
    const[deleteLoading,setDeleteLoading]=useState(false);
    const[updateLoading, setUpdateLoading]=useState(false);



    const HandlerToUpdatePost=(e)=>{
        e.preventDefault();

        let updatedValues={};
        
        if(!hostelDetails.oneShareApplicable){
            updatedValues.oneShareCost="Not-Applicable";
            updatedValues.oneShareRoomsAvailable="Not-Applicable";
        }
        if(!hostelDetails.twoShareApplicable){
            updatedValues.twoShareCost="Not-Applicable";
            updatedValues.twoShareRoomsAvailable="Not-Applicable";
        }
        if(!hostelDetails.threeShareApplicable){
            updatedValues.threeShareCost="Not-Applicable";
            updatedValues.threeShareRoomsAvailable="Not-Applicable";
        }
        if(!hostelDetails.fourShareApplicable){
            updatedValues.fourShareCost="Not-Applicable";
            updatedValues.fourShareRoomsAvailable="Not-Applicable";
        }
        if(!hostelDetails.fiveShareApplicable){
            updatedValues.fiveShareCost="Not-Applicable";
            updatedValues.fiveShareRoomsAvailable="Not-Applicable";
        }
        let updatedHostelDetails ={
            ...hostelDetails,
            ...updatedValues
        }

        if(updatedHostelDetails.hostelName.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'Hostel Name'.");

        }else if (hostelDetails.oneShareApplicable && updatedHostelDetails.oneShareCost.trim()==="") {
            setShowFormErr(true);
            setErr("1-Share room Rs/month cannot be empty.");
        } else if (hostelDetails.oneShareApplicable && isNaN(updatedHostelDetails.oneShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at 1-Share room Rs/month.");
        }else if(hostelDetails.oneShareApplicable && updatedHostelDetails.oneShareRoomsAvailable==="Not-Applicable"){
            setShowFormErr(true);
            setErr("please select 1-share room's availability 'Yes' or 'No'.")

        }else if(hostelDetails.twoShareApplicable && updatedHostelDetails.twoShareCost.trim()===""){
            setShowFormErr(true);
            setErr("2-Share room Rs/month cannot be empty.");
        }else if (hostelDetails.twoShareApplicable && isNaN(updatedHostelDetails.twoShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at 2-Share room Rs/month.");
        }else if(hostelDetails.twoShareApplicable && updatedHostelDetails.twoShareRoomsAvailable==="Not-Applicable"){
            setShowFormErr(true);
            setErr("please select 2-share room's availability 'Yes' or 'No'.")

        }else if(hostelDetails.threeShareApplicable && updatedHostelDetails.threeShareCost.trim()===""){
            setShowFormErr(true);
            setErr("3-share room Rs/month cannot be empty.")
        }else if (hostelDetails.threeShareApplicable && isNaN(updatedHostelDetails.threeShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at '3-Share room Rs/month");
        }else if(hostelDetails.threeShareApplicable && updatedHostelDetails.threeShareRoomsAvailable==="Not-Applicable"){
            setShowFormErr(true);
            setErr("please select 3-share room's availability 'Yes' or 'No'.")
        }else if(hostelDetails.fourShareApplicable && updatedHostelDetails.fourShareCost.trim()===""){
            setShowFormErr(true);
            setErr("4-share room Rs/month cannot be empty.")
        }else if (hostelDetails.fourShareApplicable && isNaN(updatedHostelDetails.fourShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at '4-Share room Rs/month");
        }else if(hostelDetails.fourShareApplicable && updatedHostelDetails.fourShareRoomsAvailable==="Not-Applicable"){
            setShowFormErr(true);
            setErr("please select 4-share room's availability 'Yes' or 'No'.")
        }else if(hostelDetails.fiveShareApplicable && updatedHostelDetails.fiveShareCost.trim()===""){
            setShowFormErr(true);
            setErr("5-share room Rs/month cannot be empty.")
        }else if (hostelDetails.fiveShareApplicable && isNaN(updatedHostelDetails.fiveShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at '5-Share room Rs/month");
        }else if(hostelDetails.fiveShareApplicable && updatedHostelDetails.fiveShareApplicable==="Not-Applicable"){
            setShowFormErr(true);
            setErr("please select 5-share room's availability 'Yes' or 'No'.")
        }else if(updatedHostelDetails.imageOne===""){
            setShowFormErr(true);
            setErr("please choose 'hostel room Image One'.")
        }else if(updatedHostelDetails.imageTwo===""){
            setShowFormErr(true);
            setErr("please choose 'hostel room Image Two'.")
        }else if(updatedHostelDetails.imageThree===""){
            setShowFormErr(true);
            setErr("please choose 'hostel room Image Three'.")
        }else if(updatedHostelDetails.stateName.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'State Name'.")
        }else if(updatedHostelDetails.cityName.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'City Name'.")
        }else if(updatedHostelDetails.areaName.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'Area Name'.")
        }else if(updatedHostelDetails.landMark.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'Land Mark'.")
        }else if(updatedHostelDetails.hostelType===""){
            setShowFormErr(true);
            setErr("please select Hoste type 'Girls or Boys'.")
        }else if(updatedHostelDetails.wifi===""){
            setShowFormErr(true);
            setErr("please select Wifi Available 'Yes or No'.")
        }else if(updatedHostelDetails.laundry===""){
            setShowFormErr(true);
            setErr("please select Laundry Available 'Yes or No'.")
        }else if(updatedHostelDetails.hotWater===""){
            setShowFormErr(true);
            setErr("please select Hotwater Available 'Yes or No'.")
        }else {
            setShowFormErr(false);
            setUpdateLoading(true);

            axios.post(apiUrl+"profile?",updatedHostelDetails,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(
                    response => {
                        if(response){
                            if(response.status===200){
                                alert("updated successfully.");
                                refresh();
                            }else{
                                alert("your session expired do login again and update Hostel Details.")
                                logOut();
                            }
                        }else{
                            alert("Internal error please try again by refreshing the page.");
                        }
                    }
            ).catch(
                (err)=>{
                    if(err.response){
                        if(err.response.status===500){
                            alert("Internal server error, please login again  and update Hostel Details.");
                            logOut()
                        }else if(err.response.status===400){
                            alert("Bad Request do login again and update Hostel Details.");
                            logOut();
                        }else{
                            alert("your session expired do login again and update Hostel Details.")
                            logOut();
                        }
                    }else{
                        alert("Internal error please try again by refreshing the page.");
                    }
                }
            ).finally (
                () => setUpdateLoading(false)
            )
        }  
    }

    const HandlerCancel =()=>{
        setHostelDetails((prevHostelDetails)=>({
            ...prevHostelDetails,
            state:"updateHostelDetails",
            id: data.uniqueSerialNumber,
            mobileNumber: data.mobileNumber,
            ownerName: data.ownerName,
            hostelName: data.hostelName,
            hostelType: data.hostelType,
            oneShareApplicable:data.oneShareApplicable,
            oneShareCost: data.oneShareCost,
            oneShareRoomsAvailable: data.oneShareRoomsAvailable,
            twoShareApplicable: data.twoShareApplicable,
            twoShareCost: data.twoShareCost,
            twoShareRoomsAvailable:data.twoShareRoomsAvailable,
            threeShareApplicable:data.threeShareApplicable,
            threeShareCost: data.threeShareCost,
            threeShareRoomsAvailable: data.threeShareRoomsAvailable,
            fourShareApplicable:data.fourShareApplicable,
            fourShareCost: data.fourShareCost,
            fourShareRoomsAvailable: data.fourShareRoomsAvailable,
            fiveShareApplicable: data.fiveShareApplicable,
            fiveShareCost: data.fiveShareCost,
            fiveShareRoomsAvailable: data.fiveShareRoomsAvailable,
            wifi:data.wifi,
            laundry:data.laundry,
            hotWater:data.hotWater,
            imageOne:data.imageOne,
            imageTwo:data.imageTwo,
            imageThree:data.imageThree,
            stateName: data.stateName,
            cityName: data.cityName,
            areaName: data.areaName,
            landMark: data.landMark
        }));
        setEditPost(!editPost);
        setAiOutlineMore(!aioutlinemore);
    }

    const HandlerToDeletePost=()=>{
        setDeleteLoading(true)

        axios.post(apiUrl+"profile?state=deletePost&id="+data.uniqueSerialNumber, {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }).then(
            response => {
                if(response){
                    if(response.status===200){
                        alert("Post Deleted succefully");
                        refresh();
                    }else{
                        alert("your session expired do login again.")
                        logOut();
                    }
                }else{
                    alert("Internal error please try again by refreshing the page.");
                }
            }
        ).catch((err)=>{
            if(err.response){
                if(err.response.status===500){
                    alert("internal server error please try again some time.")
                }else if(err.response.status===400){
                    alert("Bad Request do login again.");
                    logOut();
                }else{
                    alert("your session expired do login again.")
                    logOut()
                }
            }else{
                alert("Internal error please try again by refreshing the page.");
            }
        }).finally(()=>{
            setDeleteLoading(false);
        })


    }


    const logOut=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }



    return(

        <div style={style} className={displayHostelsProfilePage.mainDiv}>
            {!editPost?
                <div className={displayHostelsProfilePage.hostelContainer}>
                    <div style={{ position: 'relative' ,width:'95%', marginTop:'5px',marginBottom:'10px'}}>
                        <AiOutlineMore size={'23px'} color={aioutlinemore?"red":"black"}  onClick={()=>{setAiOutlineMore(!aioutlinemore)}} style={{cursor:'pointer', position: 'absolute', top: 0, right: 0 }}/>
                        {aioutlinemore&&
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',justifyContent:'center',borderRadius:'8px',backgroundColor:'#317773',boxShadow:'rgba(0, 0, 0, 0.6) 0px 5px 15px',height:'120px',width:'150px', position: 'absolute',top:'21px',right:'13px'}}>
                                <button style={{marginBottom:'6px'}}  className={displayHostelsProfilePage.editAndDeleteButton} onClick={()=>{setEditPost(!editPost)}}><span><AiFillEdit /><label style={{cursor:'pointer',marginLeft:'6px'}}>Edit</label></span></button>
                                <button style={{marginTop:'6px'}}  className={displayHostelsProfilePage.editAndDeleteButton} onClick={HandlerToDeletePost} disabled={deleteLoading}>{deleteLoading?<Oval width={20} height={20}/>:<span><AiFillDelete /><label style={{cursor:'pointer',marginLeft:'6px'}}>Delete</label></span>}</button>
                            </div>
                        }
                    </div>

                    <img className={displayHostelsProfilePage.Images} src={`data:image/jpeg;base64,${currentImage}`} alt="roomImg"/>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className={displayHostelsProfilePage.changeImagesButtons} onClick={imageOneHadler}>1 </button>
                        <button style={{marginLeft:'5px',marginRight:'5px'}} className={displayHostelsProfilePage.changeImagesButtons} onClick={imageTwoHadler}>2 </button>
                        <button className={displayHostelsProfilePage.changeImagesButtons} onClick={imageThreeHadler}>3 </button>
                    </div>
                
                    <div className={displayHostelsProfilePage.detailsContainer} onClick={()=>setShowHostelDetails(!showHostelDetails)}>
                        <div className={displayHostelsProfilePage.detailsButton}>
                            {showHostelDetails ? 'Hide Hostel Details' : 'Show Hostel Details'}
                        </div>
                        <div style={{width:'8%'}}>{showHostelDetails ? '▲' : '▼'}</div>
                    </div>

                    {showHostelDetails &&
                        <table className={displayHostelsProfilePage.table}>
                            <tbody>

                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>Mobile: </th>
                                    <td className={displayHostelsProfilePage.td} colSpan="2"><span>{data.mobileNumber}</span></td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>Owner Name:</th>
                                    <td className={displayHostelsProfilePage.td} colSpan="2"><span>{data.ownerName}</span></td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>Hostel Name:</th>
                                    <td className={displayHostelsProfilePage.td} colSpan="2"><span>{data.hostelName}</span></td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>Hostel Type:</th>
                                    <td className={displayHostelsProfilePage.td} colSpan="2"><span>{data.hostelType}</span></td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th}>Room Type</th > <th className={displayHostelsProfilePage.th}>&#8377;/Month</th> <th className={displayHostelsProfilePage.th}>Available</th>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>{data.oneShareApplicable?<span>1-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>1-Share:</span>}</th>
                                    <td className={displayHostelsProfilePage.td}><span>{data.oneShareApplicable?data.oneShareCost:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</span></td>
                                    <td className={displayHostelsProfilePage.td}>{data.oneShareApplicable?data.oneShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</td>
                                </tr>

                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>{data.twoShareApplicable?<span>2-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>2-Share:</span>}</th>
                                    <td className={displayHostelsProfilePage.td}><span>{data.twoShareApplicable?data.twoShareCost:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</span></td>
                                    <td className={displayHostelsProfilePage.td}>{data.twoShareApplicable?data.twoShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>{data.threeShareApplicable?<span>3-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>3-Share:</span>}</th>
                                    <td className={displayHostelsProfilePage.td}><span>{data.threeShareApplicable?data.threeShareCost:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</span></td>
                                    <td className={displayHostelsProfilePage.td}>{data.threeShareApplicable?data.threeShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</td>
                                </tr>
                                <tr>  
                                    <th className={displayHostelsProfilePage.th1}>{data.fourShareApplicable?<span>4-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>4-Share:</span>}</th>
                                    <td className={displayHostelsProfilePage.td}><span>{data.fourShareApplicable?data.fourShareCost:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</span></td>
                                    <td className={displayHostelsProfilePage.td}>{data.fourShareApplicable?data.fourShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>{data.fiveShareApplicable?<span>5-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>5-Share:</span>}</th>
                                    <td className={displayHostelsProfilePage.td}><span>{data.fiveShareApplicable?data.fiveShareCost:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</span></td>
                                    <td className={displayHostelsProfilePage.td}>{data.fiveShareApplicable?data.fiveShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsProfilePage.lightBlack}>---</span>}</td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th} colSpan="3">Facilities</th>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>Wifi:</th>
                                    <td className={displayHostelsProfilePage.td} colSpan="2">{data.wifi==="Yes"?<label style={{color:'green',marginLeft:'30px'}}>Available</label>:<label style={{color:'red',marginLeft:'30px'}}>Not-Available</label>}</td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>Laundry:</th>
                                    <td className={displayHostelsProfilePage.td} colSpan="2">{data.laundry==="Yes"?<label style={{color:'green',marginLeft:'30px'}}>Available</label>:<label style={{color:'red',marginLeft:'30px'}}>Not-Available</label>}</td>
                                </tr>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>Hot Water:</th>
                                    <td className={displayHostelsProfilePage.td} colSpan="2">{data.hotWater==="Yes"?<label style={{color:'green',marginLeft:'30px'}}>Available</label>:<label style={{color:'red',marginLeft:'30px'}}>Not-Available</label>}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className={displayHostelsProfilePage.th1}>Location:</th>
                                    <td className={displayHostelsProfilePage.td} colSpan="2">{data.areaName},&nbsp;{data.cityName},&nbsp;{data.stateName},&nbsp;{data.landMark}</td>
                                </tr>

                            </tfoot>
                        </table>
                    }
                </div>
            :
                <div className={profilePageCss.addNewHostelFormDiv}>
                <form className={profilePageCss.addNewHostelForm}>
                    <div style={{fontSize:'75%',height:'100%',width:'100%',marginLeft:'3%', marginTop:'4%'}}> 
                        <div>Hostel Name.<label style={{color:'red'}}>*</label></div>
                        <input type='text' name="hostelName" value={hostelDetails.hostelName} onChange={hostelDetailsUpdateHandler}/><br/><br/>

                        <div style={{marginBottom:'4%'}}>
                            <div className={profilePageCss.oneShareDiv}>
                                <label>1-Share rooms:</label>
                                <input type="checkbox" name="oneShareApplicable" onClick={hostelDetailsUpdateHandler} checked={hostelDetails.oneShareApplicable===true}  style={{ width: '5%', height: '5%' }} />
                                <label>Applicable</label>
                            </div>

                            {hostelDetails.oneShareApplicable&&
                                <div className={profilePageCss.secShareDiv}>
                                    <label> &#8377;/month :</label>
                                    <input style={{width:'15%'}}  type='text' name="oneShareCost" value={hostelDetails.oneShareCost=="Not-Applicable"?"":hostelDetails.oneShareCost} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                    <label style={{marginLeft:'3%'}}>Yes</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="oneShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.oneShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'3%'}}>No</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="oneShareRoomsAvailable" value={"No"} checked={hostelDetails.oneShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                    
                                </div>
                            }
                        </div>



                        <div style={{marginBottom:'4%'}}>
                            <div className={profilePageCss.oneShareDiv}>
                                <label>2-Share rooms:</label>
                                <input type="checkbox" name="twoShareApplicable" onClick={hostelDetailsUpdateHandler} checked={hostelDetails.twoShareApplicable===true} style={{ width: '5%', height: '5%' }}/>
                                <label>Applicable</label>
                            </div>

                            {hostelDetails.twoShareApplicable&&
                                <div className={profilePageCss.secShareDiv}>
                                    <label> &#8377;/month :</label>
                                    <input style={{width:'15%'}}  type='text' name="twoShareCost" value={hostelDetails.twoShareCost=="Not-Applicable"?"":hostelDetails.twoShareCost} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                    <label style={{marginLeft:'3%'}}>Yes</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="twoShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.twoShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'3%'}}>No</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="twoShareRoomsAvailable" value={"No"} checked={hostelDetails.twoShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                </div>
                            }
                        </div>

                        <div style={{marginBottom:'4%'}}>
                            <div className={profilePageCss.oneShareDiv}>
                                <label>3-Share rooms:</label>
                                <input type="checkbox" name="threeShareApplicable" onClick={hostelDetailsUpdateHandler} style={{ width: '5%', height: '5%' }} checked={hostelDetails.threeShareApplicable===true} />
                                <label>Applicable</label>
                            </div>
                        
                            {hostelDetails.threeShareApplicable&&
                                <div className={profilePageCss.secShareDiv}>
                                    <label> &#8377;/month :</label>
                                    <input style={{width:'15%'}}  type='text' name="threeShareCost" value={hostelDetails.threeShareCost=="Not-Applicable"?"":hostelDetails.threeShareCost} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                    <label style={{marginLeft:'3%'}}>Yes</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="threeShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.threeShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'3%'}}>No</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="threeShareRoomsAvailable" value={"No"} checked={hostelDetails.threeShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                    
                                </div>
                            }
                        </div>

                        <div style={{marginBottom:'4%'}}>
                            <div className={profilePageCss.oneShareDiv}>
                                <label>4-Share rooms:</label>
                                <input type="checkbox" name="fourShareApplicable" onClick={hostelDetailsUpdateHandler} style={{ width: '5%', height: '5%' }} checked={hostelDetails.fourShareApplicable===true}/>
                                <label>Applicable</label>
                            </div>
                        
                            {hostelDetails.fourShareApplicable&&
                                <div className={profilePageCss.secShareDiv}>
                                    <label> &#8377;/month :</label>
                                    <input style={{width:'15%'}}  type='text' name="fourShareCost" value={hostelDetails.fourShareCost=="Not-Applicable"?"":hostelDetails.fourShareCost} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                    <label style={{marginLeft:'3%'}}>Yes</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="fourShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.fourShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'3%'}}>No</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="fourShareRoomsAvailable" value={"No"} checked={hostelDetails.fourShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                    
                                </div>
                            }
                        </div>

                        <div style={{marginBottom:'4%'}}>
                            <div className={profilePageCss.oneShareDiv}>
                                <label>5-Share rooms:</label>
                                <input type="checkbox" name="fiveShareApplicable" onClick={hostelDetailsUpdateHandler} style={{ width: '5%', height: '5%' }} checked={hostelDetails.fiveShareApplicable===true} />
                                <label>Applicable</label>
                            </div>

                            {hostelDetails.fiveShareApplicable&&
                                <div className={profilePageCss.secShareDiv}>
                                    <label> &#8377;/month :</label>
                                    <input style={{width:'15%'}}  type='text' name="fiveShareCost" value={hostelDetails.fiveShareCost=="Not-Applicable"?"":hostelDetails.fiveShareCost} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                    <label style={{marginLeft:'3%'}}>Yes</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="fiveShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.fiveShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                    <label style={{marginLeft:'3%'}}>No</label>
                                    <input type='checkbox' style={{ width: '5%', height: '5%' }} name="fiveShareRoomsAvailable" value={"No"} checked={hostelDetails.fiveShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                </div>
                            }
                        </div>

                        <div style={{marginTop:'5%',marginBottom:'3%'}}>Please upload the sample images of hostel rooms.<label style={{color:'red'}}>*</label></div>

                        <input  id="imageOne" name='imageOne' type='file' style={{display:'none'}}  accept="image/*" onChange={hostelDetailsUpdateHandler}/>
                        <label for="imageOne"  className={profilePageCss.label}><AiFillPicture/>&nbsp;&nbsp;&nbsp;{hostelDetails.imageOne.name || "Choose Image One"}</label><br/>

                        
                        <input  id="imageTwo" name='imageTwo' type='file' style={{display:'none'}}  accept="image/*" onChange={hostelDetailsUpdateHandler}/>
                        <label for="imageTwo"  className={profilePageCss.label}><AiFillPicture/>&nbsp;&nbsp;&nbsp;{hostelDetails.imageTwo.name || "Choose Image Two"}</label><br/>

                        
                        <input  id="imageThree" name='imageThree' type='file' style={{display:'none'}}  accept="image/*" onChange={hostelDetailsUpdateHandler}/>
                        <label for="imageThree"  className={profilePageCss.label}><AiFillPicture/>&nbsp;&nbsp;&nbsp;{hostelDetails.imageThree.name || "Choose Image Three"}</label><br/>


                        <div style={{marginTop:'5%',marginBottom:'2%'}}>Hostel Address:</div>
                        <div>State Name.<label style={{color:'red'}}>*</label></div>
                        <input style={{marginBottom:'3%'}} type='text' name="stateName" value={hostelDetails.stateName} onChange={hostelDetailsUpdateHandler}/>
                        <div>City Name.<label style={{color:'red'}}>*</label></div>
                        <input style={{marginBottom:'3%'}} type='text' name="cityName" value={hostelDetails.cityName} onChange={hostelDetailsUpdateHandler}/>
                        <div>Area Name.<label style={{color:'red'}}>*</label></div>
                        <input style={{marginBottom:'3%'}} type='text' name="areaName" value={hostelDetails.areaName} onChange={hostelDetailsUpdateHandler}/>
                        <div>Land Mark.<label style={{color:'red'}}>*</label></div>
                        <textarea style={{width: '280px', height: '80px', overflow: 'auto',resize: 'none'}} type='text' name="landMark" value={hostelDetails.landMark} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                            
                        <div style={{marginTop:'5%'}}>Hostel type.<label style={{color:'red'}}>*</label></div>
                        <div className={profilePageCss.facilitiesDivs}>
                            <label>Girls</label>
                            <input style={{ width: '5%', height: '5%' }} type="checkbox" name="hostelType" value={"Girls Hostel"} checked={hostelDetails.hostelType === 'Girls Hostel'} onChange={hostelDetailsUpdateHandler}/>
                            <label style={{marginLeft:'3%'}}>Boys</label>
                            <input style={{ width: '5%', height: '5%' }} type="checkbox" name="hostelType" value={"Boys Hostel"} checked={hostelDetails.hostelType === 'Boys Hostel'} onChange={hostelDetailsUpdateHandler}/>
                        </div>


                        <div>wifi Available.<label style={{color:'red'}}>*</label></div>
                        <div className={profilePageCss.facilitiesDivs}>
                            <label>Yes</label>
                            <input style={{ width: '5%', height: '5%' }} type="checkbox" name="wifi" value={"Yes"} checked={hostelDetails.wifi === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                            <label style={{marginLeft:'3%'}}>No</label>
                            <input style={{ width: '5%', height: '5%' }} type="checkbox" name="wifi" value={"No"} checked={hostelDetails.wifi === "No"} onChange={hostelDetailsUpdateHandler}/>
                        </div>

                        <div>laundry Available.<label style={{color:'red'}}>*</label></div>
                        <div className={profilePageCss.facilitiesDivs}>
                            <label>Yes</label>
                            <input style={{ width: '5%', height: '5%' }} type="checkbox" name="laundry" value={"Yes"} checked={hostelDetails.laundry === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                            <label style={{marginLeft:'3%'}}>No</label>
                            <input style={{ width: '5%', height: '5%' }} type="checkbox" name="laundry" value={"No"} checked={hostelDetails.laundry === "No"} onChange={hostelDetailsUpdateHandler}/>
                        </div><br/>

                        <div>HotWater Available.<label style={{color:'red'}}>*</label></div>
                        <div className={profilePageCss.facilitiesDivs}>
                            <label>Yes</label>
                            <input style={{ width: '5%', height: '5%' }} type="checkbox" name="hotWater" value={"Yes"} checked={hostelDetails.hotWater === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                            <label style={{marginLeft:'3%'}}>No</label>
                            <input style={{ width: '5%', height: '5%' }} type="checkbox" name="hotWater" value={"No"} checked={hostelDetails.hotWater === "No"} onChange={hostelDetailsUpdateHandler}/>
                        </div>

                        
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            {showFormErr&&<label style={{color: 'red',marginBottom:'3%',fontSize:'105%'}}>{err}</label>}
                        </div> 

                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <button className={profilePageCss.formButtons} onClick={HandlerToUpdatePost} disabled={updateLoading}>{updateLoading?<Oval width={20} height={20}/>:<span style={{height:'100%',display:'flex',justifyContent:'center',justifyItems:'center'}}>Update</span>}</button>
                            <button className={profilePageCss.formButtons} style={{marginTop:'10px', marginBottom:'10px'}} onClick={HandlerCancel}><span style={{height:'100%',display:'flex',justifyContent:'center',justifyItems:'center'}}>Cancel</span></button>
                        </div>
                    </div>
                </form>   
                </div>

            }
        </div>
    )
}

export default DisplayHostelsProfilePage;