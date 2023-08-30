import React, {useState}from "react";
import displayHostelsPage from '../css/displayHostelsPage.module.css';



const DisplayHostelsPage=({data})=>{
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

    const [showHostelDetails, setShowHostelDetails]=useState(false)
    return(
        <div className={displayHostelsPage.mainDiv}>
            <div className={displayHostelsPage.hostelConatiner}>
                <br/>             
                <img className={displayHostelsPage.Image}
                    src={`data:image/jpeg;base64,${currentImage}`} alt="roomImg"
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className={displayHostelsPage.changeImagesButtons} onClick={imageOneHadler}>1 </button>
                    <button className={displayHostelsPage.changeImagesButtons} onClick={imageTwoHadler}>2 </button>
                    <button className={displayHostelsPage.changeImagesButtons} onClick={imageThreeHadler}>3 </button>
                </div>
                <br/>


                            
                    <div style={{cursor: 'pointer',padding: '2px',border: '1px solid black',display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}onClick={()=>setShowHostelDetails(!showHostelDetails)}>
                        <div style={{width:'100%',borderRadius: '6px', display: 'flex', justifyContent: 'center',backgroundColor: '#25D366', padding: '6px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Show Hostel Details
                        </div>
                        <div style={{width:'8%'}}>{showHostelDetails ? '▲' : '▼'}</div>
                    </div>
               
                {showHostelDetails &&
                <table>
                    <tbody>

                        <tr>
                            <th className={displayHostelsPage.th1}>Mobile:</th>
                            <td colSpan="2">{data.mobileNumber}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>Owner Name:</th>
                            <td colSpan="2">{data.ownerName}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>Hostel Name:</th>
                            <td colSpan="2">{data.hostelName}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>Hostel Type:</th>
                            <td colSpan="2">{data.hostelType}</td>
                        </tr>
                        <tr>
                            <th>Room Type</th> <th>&#8377;/Month</th> <th>Available</th>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>{data.oneShareApplicable==="No"?<span className={displayHostelsPage.lightBlack}>1-Share:</span>:<span>1-share:</span>}</th>
                            <td><span>{data.oneShareApplicable=="No"?<span className={displayHostelsPage.lightBlack}>---</span>:data.oneShareCost}</span></td>
                            <td>{data.oneShareRoomsAvailable==="Not-Applicable"?<span className={displayHostelsPage.lightBlack}>---</span>:data.oneShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>{data.twoShareApplicable==="No"?<span style={{color:'rgba(0, 0, 0, 0.3)'}}>2-Share:</span>:<span>2-share:</span>}</th>
                            <td><span>{data.twoShareApplicable=="No"?<span className={displayHostelsPage.lightBlack}>---</span>:data.twoShareCost}</span></td>
                            <td>{data.twoShareRoomsAvailable==="Not-Applicable"?<span className={displayHostelsPage.lightBlack}>---</span>:data.twoShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>{data.threeShareApplicable==="No"?<span className={displayHostelsPage.lightBlack}>3-Share:</span>:<span>3-share:</span>}</th>
                            <td><span>{data.threeShareApplicable=="No"?<span className={displayHostelsPage.lightBlack}>---</span>:data.threeShareCost}</span></td>
                            <td>{data.threeShareRoomsAvailable==="Not-Applicable"?<span className={displayHostelsPage.lightBlack}>---</span>:data.threeShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>}</td>
                        </tr>
                        <tr>
                            
                            <th className={displayHostelsPage.th1}>{data.fourShareApplicable==="No"?<span className={displayHostelsPage.lightBlack}>4-Share:</span>:<span>4-share:</span>}</th>
                            <td><span>{data.fourShareApplicable=="No"?<span className={displayHostelsPage.lightBlack}>---</span >:data.fourShareCost}</span></td>
                            <td>{data.fourShareRoomsAvailable==="Not-Applicable"?<span className={displayHostelsPage.lightBlack}>---</span>:data.fourShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>{data.fiveShareApplicable==="No"?<span className={displayHostelsPage.lightBlack}>5-Share:</span>:<span>5-share:</span>}</th>
                            <td><span>{data.fiveShareApplicable==="No"?<span className={displayHostelsPage.lightBlack}>---</span>:data.fiveShareCost}</span></td>
                            <td>{data.fiveShareRoomsAvailable==="Not-Applicable"?<span className={displayHostelsPage.lightBlack}>---</span>:data.fiveShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>}</td>

                        </tr>
                        <tr>
                            <th colSpan="3">Facilities</th>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>Wifi:</th>
                            <td colSpan="2">{data.wifi==="Yes"?<label style={{color:'green'}}>Yes</label>:<label style={{color:'red'}}>No</label>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>Laundry:</th>
                            <td colSpan="2">{data.laundry==="Yes"?<label style={{color:'green'}}>YES</label>:<label style={{color:'red'}}>No</label>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsPage.th1}>Hot Water:</th>
                            <td colSpan="2">{data.hotWater==="Yes"?<label  style={{color:'green'}}>Yes</label>:<label style={{color:'red'}}>No</label>}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className={displayHostelsPage.th1}>Location:</th>
                            <td colSpan="2">{data.areaName},&nbsp;{data.cityName},&nbsp;{data.stateName},&nbsp;{data.landMark}</td>
                        </tr>

                    </tfoot>
                </table>
                }
            </div>
        </div>
    )
}
export default DisplayHostelsPage;