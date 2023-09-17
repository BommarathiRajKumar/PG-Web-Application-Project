import React, {useState}from "react";
import displayHostelsHomePage from '../css/displayHostelsHomePage.module.css';

const DisplayHostelsHomePage=({data,style})=>{
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

    return(

        <div style={style} className={displayHostelsHomePage.mainDiv}>
            <img className={displayHostelsHomePage.Images} src={`data:image/jpeg;base64,${currentImage}`} alt="roomImg"/>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className={displayHostelsHomePage.changeImagesButtons} onClick={imageOneHadler}>1 </button>
                <button style={{marginLeft:'5px',marginRight:'5px'}} className={displayHostelsHomePage.changeImagesButtons} onClick={imageTwoHadler}>2 </button>
                <button className={displayHostelsHomePage.changeImagesButtons} onClick={imageThreeHadler}>3 </button>
            </div>
        
            <div className={displayHostelsHomePage.detailsContainer} onClick={()=>setShowHostelDetails(!showHostelDetails)}>
                <div className={displayHostelsHomePage.detailsButton}>
                    {showHostelDetails ? 'Hide Hostel Details' : 'Show Hostel Details'}
                </div>
                <div style={{width:'8%'}}>{showHostelDetails ? '▲' : '▼'}</div>
            </div>

            {showHostelDetails &&
                <table className={displayHostelsHomePage.table}>
                    <tbody>

                        <tr>
                            <th className={displayHostelsHomePage.th1}>Mobile: </th>
                            <td className={displayHostelsHomePage.td} colSpan="2"><span>{data.mobileNumber}</span></td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>Owner Name:</th>
                            <td className={displayHostelsHomePage.td} colSpan="2"><span>{data.ownerName}</span></td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>Hostel Name:</th>
                            <td className={displayHostelsHomePage.td} colSpan="2"><span>{data.hostelName}</span></td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>Hostel Type:</th>
                            <td className={displayHostelsHomePage.td} colSpan="2"><span>{data.hostelType}</span></td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th}>Room Type</th > <th className={displayHostelsHomePage.th}>&#8377;/Month</th> <th className={displayHostelsHomePage.th}>Available</th>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>{data.oneShareApplicable?<span>1-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>1-Share:</span>}</th>
                            <td className={displayHostelsHomePage.td}><span>{data.oneShareApplicable?data.oneShareCost:<span className={displayHostelsHomePage.lightBlack}>---</span>}</span></td>
                            <td className={displayHostelsHomePage.td}>{data.oneShareApplicable?data.oneShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsHomePage.lightBlack}>---</span>}</td>
                        </tr>

                        <tr>
                            <th className={displayHostelsHomePage.th1}>{data.twoShareApplicable?<span>2-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>2-Share:</span>}</th>
                            <td className={displayHostelsHomePage.td}><span>{data.twoShareApplicable?data.twoShareCost:<span className={displayHostelsHomePage.lightBlack}>---</span>}</span></td>
                            <td className={displayHostelsHomePage.td}>{data.twoShareApplicable?data.twoShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsHomePage.lightBlack}>---</span>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>{data.threeShareApplicable?<span>3-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>3-Share:</span>}</th>
                            <td className={displayHostelsHomePage.td}><span>{data.threeShareApplicable?data.threeShareCost:<span className={displayHostelsHomePage.lightBlack}>---</span>}</span></td>
                            <td className={displayHostelsHomePage.td}>{data.threeShareApplicable?data.threeShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsHomePage.lightBlack}>---</span>}</td>
                        </tr>
                        <tr>  
                            <th className={displayHostelsHomePage.th1}>{data.fourShareApplicable?<span>4-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>4-Share:</span>}</th>
                            <td className={displayHostelsHomePage.td}><span>{data.fourShareApplicable?data.fourShareCost:<span className={displayHostelsHomePage.lightBlack}>---</span>}</span></td>
                            <td className={displayHostelsHomePage.td}>{data.fourShareApplicable?data.fourShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsHomePage.lightBlack}>---</span>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>{data.fiveShareApplicable?<span>5-share:</span>:<span style={{color:'rgba(0, 0, 0, 0.3)'}}>5-Share:</span>}</th>
                            <td className={displayHostelsHomePage.td}><span>{data.fiveShareApplicable?data.fiveShareCost:<span className={displayHostelsHomePage.lightBlack}>---</span>}</span></td>
                            <td className={displayHostelsHomePage.td}>{data.fiveShareApplicable?data.fiveShareRoomsAvailable==="Yes"?<span style={{color:'green'}}>Yes</span>:<span style={{color:'red'}}>No</span>:<span className={displayHostelsHomePage.lightBlack}>---</span>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th} colSpan="3">Facilities</th>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>Wifi:</th>
                            <td className={displayHostelsHomePage.td} colSpan="2">{data.wifi==="Yes"?<label style={{color:'green',marginLeft:'30px'}}>Available</label>:<label style={{color:'red',marginLeft:'30px'}}>Not-Available</label>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>Laundry:</th>
                            <td className={displayHostelsHomePage.td} colSpan="2">{data.laundry==="Yes"?<label style={{color:'green',marginLeft:'30px'}}>Available</label>:<label style={{color:'red',marginLeft:'30px'}}>Not-Available</label>}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>Hot Water:</th>
                            <td className={displayHostelsHomePage.td} colSpan="2">{data.hotWater==="Yes"?<label style={{color:'green',marginLeft:'30px'}}>Available</label>:<label style={{color:'red',marginLeft:'30px'}}>Not-Available</label>}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className={displayHostelsHomePage.th1}>Location:</th>
                            <td className={displayHostelsHomePage.td} colSpan="2">{data.areaName},&nbsp;{data.cityName},&nbsp;{data.stateName},&nbsp;{data.landMark}</td>
                        </tr>

                    </tfoot>
                </table>
            }
        </div>

    )
}

export default DisplayHostelsHomePage;