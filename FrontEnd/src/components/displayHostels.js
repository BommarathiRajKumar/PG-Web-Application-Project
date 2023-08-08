import React, {useState}from "react";
import profileHostelsPageCss from '../css/profileHostelsPage.module.css';


function DisplayHostels({data}){
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
        <div className={profileHostelsPageCss.mainDiv}>
            <div className={profileHostelsPageCss.hostelConatiner}>
                <br/>             
                <img className={profileHostelsPageCss.Image}
                    src={`data:image/jpeg;base64,${currentImage}`}
                    alt="image one"
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className={profileHostelsPageCss.changeImagesButtons} onClick={imageOneHadler}>1 </button>
                    <button className={profileHostelsPageCss.changeImagesButtons} onClick={imageTwoHadler}>2 </button>
                    <button className={profileHostelsPageCss.changeImagesButtons} onClick={imageThreeHadler}>3 </button>
                </div>
                <br/>
                <div style={{  display: 'flex', justifyContent: 'center',backgroundColor: 'red', padding: '6px 0' }}>Hostel Information</div>
                <table>
                    <tbody>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>Hostel Name:</th>
                            <td colSpan="2">{data.hostelName}</td>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>Hostel Type:</th>
                            <td colSpan="2">{data.hostelType}</td>
                        </tr>
                        <tr>
                            <th colSpan="3">Cost Per Month</th>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>1-Share:</th>
                            <td colSpan="2">&#8377;{data.oneShareCost}</td>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>2-Share:</th>
                            <td colSpan="2">&#8377;{data.twoShareCost}</td>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>3-Share:</th>
                            <td colSpan="2">&#8377;{data.threeShareCost}</td>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>4-Share:</th>
                            <td colSpan="2">&#8377;{data.fourShareCost}</td>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>5-Share:</th>
                            <td colSpan="2">&#8377;{data.fiveShareCost}</td>
                        </tr>
                        <tr>
                            <th colSpan="3">Facilities</th>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>Wifi:</th>
                            <td colSpan="2">{data.wifi}</td>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>Laundry:</th>
                            <td colSpan="2">{data.laundry}</td>
                        </tr>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>Hot Water:</th>
                            <td colSpan="2">{data.hotWater}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className={profileHostelsPageCss.th1}>Location:</th>
                            <td colSpan="2">{data.areaName},&nbsp;{data.cityName},&nbsp;{data.stateName},&nbsp;{data.landMark}</td>
                        </tr>

                    </tfoot>
                </table>
            </div>
        </div>
    )
}
export default DisplayHostels;