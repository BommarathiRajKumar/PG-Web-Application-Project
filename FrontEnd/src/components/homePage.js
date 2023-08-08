import React,{useEffect, useState} from "react"
import axios from "axios";
import DisplayHostels from './displayHostels.js';
import homePageCss from "../css/homePage.module.css"
const Home = () =>{
    const [totalHostelsDetails, setTotalHostelsDetails] = useState();
    const [data, setData] = useState({
        state:'two',
        hostelType: '',
        share: '',
        price: '',
        stateName: '',
        cityName: '',
        areaName: ''
    })
    const updateHandler = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const s=(()=>{
        axios.post("http://localhost:8080/PG/search?state=one").then(
            function one(res){
                if(res.status===200){
                    setTotalHostelsDetails(res.data);
                }
            }
        ).catch((err)=>{
            alert("initial server error")
            
        })
    }, []);
    
    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData()

        formData.append("hostelType",data.hostelType)
        formData.append('share',data.share)
        formData.append('price',data.price)
        formData.append('stateName',data.stateName)
        formData.append('cityName',data.cityName)
        formData.append('areaName',data.areaName)

        axios.post("http://localhost:8080/PG/search", formData).then(
            function two(res){
                if(res.status===200){
                    setTotalHostelsDetails(res.data)
                    console.log(res.data);
                }
            }
        ).catch((err)=>{
            alert("error")
        })

    }
    return(
        
     <div className={homePageCss.mainDiv}>
        <header>
                <button style={{position:'absolute', top:'3%', right:'1%', width:'33%', height:'20%'}}>Hostel owner?</button>
            

            {false ? <form>
                <input type="text" placeholder="hostel Type" name="hostelType" value={data.hostelType} onChange={updateHandler} /><br/><br/>
                <input type="text" placeholder="oneShare" name="share" value={data.share} onChange={updateHandler} /><br/><br/>
                <input type="text" placeholder="price" name="price" value={data.price} onChange={updateHandler} /><br/><br/> 
                <input type="text" placeholder="state name" name="stateName" value={data.stateName} onChange={updateHandler} /><br/><br/>
                <input type="text" placeholder="city name" name="cityName" value={data.cityName} onChange={updateHandler} /><br/><br/>
                <input type="text" placeholder="area name" name="areaName" value={data.areaName} onChange={updateHandler} /><br/><br/>
                <button onClick={submit}>button</button>
            </form>:<div></div>}

        </header>
        <div className={homePageCss.content}>   
         

            {totalHostelsDetails !== undefined &&
                <div style={{ position: 'absolute', left: '10%' }}>
                    {Object.keys(totalHostelsDetails).map((key) => (
                        <DisplayHostels key={key} data={totalHostelsDetails[key]} />
                    ))}
                </div>
            }
        </div>
        <footer>
    
        </footer> 

        <div style={{ backgroundColor: 'white', border: '3px solid black', borderRadius: '10px' ,width: '50%', height: '20%', position: 'absolute', left: '50%', top: '50%'}}>
                <label style={{ width: '20%', color: 'red', position: 'absolute', top: '3%', right: '0%' }}>X</label>
                <button style={{ width: '50%', height: '25%', position: 'absolute', top: '20%', left: '20%' }}>Login</button>
                <button style={{ width: '50%', height: '25%', position: 'absolute', top: '55%', left: '20%' }}>Signup</button>
                <br />
        </div>
        
     </div>
    )

}
export default Home;