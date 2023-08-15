import React, {useState}from "react";
import displayHostelsProfilePageCss from '../css/displayHostelsProfilePage.module.css';


const DisplayHostelsProfilePage=({data})=>{
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
        <div className={displayHostelsProfilePageCss.mainDiv}>
            <div className={displayHostelsProfilePageCss.hostelConatiner}>
                <br/>             
                <img className={displayHostelsProfilePageCss.Image}
                    src={`data:image/jpeg;base64,${currentImage}`}
                    alt="image one"
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className={displayHostelsProfilePageCss.changeImagesButtons} onClick={imageOneHadler}>1 </button>
                    <button className={displayHostelsProfilePageCss.changeImagesButtons} onClick={imageTwoHadler}>2 </button>
                    <button className={displayHostelsProfilePageCss.changeImagesButtons} onClick={imageThreeHadler}>3 </button>
                </div>
                <br/>


                            
                    <div style={{cursor: 'pointer',padding: '2px',border: '1px solid black',display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}onClick={()=>setShowHostelDetails(!showHostelDetails)}>
                        <div style={{width:'100%',borderRadius: '6px', display: 'flex', justifyContent: 'center',backgroundColor: 'green', padding: '6px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Show Hostel Details
                        </div>
                        <div>{showHostelDetails ? '▲' : '▼'}</div>
                    </div>
               
                {showHostelDetails &&
                <table>
                    <tbody>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>Hostel Name:</th>
                            <td colSpan="2">{data.hostelName}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>Hostel Type:</th>
                            <td colSpan="2">{data.hostelType}</td>
                        </tr>
                        <tr>
                            <th colSpan="3">Cost Per Month</th>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>1-Share:</th>
                            <td colSpan="2">&#8377;{data.oneShareCost}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>2-Share:</th>
                            <td colSpan="2">&#8377;{data.twoShareCost}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>3-Share:</th>
                            <td colSpan="2">&#8377;{data.threeShareCost}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>4-Share:</th>
                            <td colSpan="2">&#8377;{data.fourShareCost}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>5-Share:</th>
                            <td colSpan="2">&#8377;{data.fiveShareCost}</td>
                        </tr>
                        <tr>
                            <th colSpan="3">Facilities</th>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>Wifi:</th>
                            <td colSpan="2">{data.wifi}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>Laundry:</th>
                            <td colSpan="2">{data.laundry}</td>
                        </tr>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>Hot Water:</th>
                            <td colSpan="2">{data.hotWater}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className={displayHostelsProfilePageCss.th1}>Location:</th>
                            <td colSpan="2">{data.areaName},&nbsp;{data.cityName},&nbsp;{data.stateName},&nbsp;{data.landMark}</td>
                        </tr>

                    </tfoot>
                </table>
                }
            </div>
        </div>
    )
}
export default DisplayHostelsProfilePage;