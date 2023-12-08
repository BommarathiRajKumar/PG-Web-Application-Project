import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

import wellCome from "../css/wellComePage.module.css";

const WellCome=()=>{
    const navigate = useNavigate();

    useEffect(()=>{
        if(!sessionStorage.getItem("displayed")){
            let d00=document.getElementById("d00");
                
            let d11 = document.getElementById("d11");
            let d12 = document.getElementById("d12");
            let d13 = document.getElementById("d13");
            let d14 = document.getElementById("d14");
            let d15 = document.getElementById("d15");
            
            let d21 = document.getElementById("d21");
            let d22 = document.getElementById("d22");
            let d23 = document.getElementById("d23");
            let d24 = document.getElementById("d24");
            let d25 = document.getElementById("d25");

            let d31 = document.getElementById("d31");
            let d32 = document.getElementById("d32");
            let d33 = document.getElementById("d33");
            let d34 = document.getElementById("d34");
            let d35 = document.getElementById("d35");
            
            let d41 = document.getElementById("d41");
            let d42 = document.getElementById("d42");
            let d43 = document.getElementById("d43");
            let d44 = document.getElementById("d44");
            let d45 = document.getElementById("d45");

            let d51 = document.getElementById("d51");
            let d52 = document.getElementById("d52");
            let d53 = document.getElementById("d53");
            let d54 = document.getElementById("d54");
            let d55 = document.getElementById("d55");

            let h = 0;
            let w = 0;

            let interval = setInterval(() => {
                if (++h <= 100 && ++w <= 100) {
                    
                    d00.innerHTML="";
                    let img=document.createElement("img");
                    img.style.zIndex="1";
                    img.style.height=`${h}%`;
                    img.style.width=`${w}%`;
                    img.setAttribute("src",logo);
                    img.style.borderRadius = "50%";
                    img.style.boxShadow="rgba(0, 0, 0, 3) 9px 9px 9px";
                    d00.appendChild(img);
                
                    d11.innerHTML="";
                    let child11 = document.createElement("div");
                    child11.style.backgroundColor = "4E5a65";
                    child11.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child11.style.height = `${h}%`;
                    child11.style.width = `${w}%`;
                    child11.style.borderRadius = "50%";
                    d11.appendChild(child11);

                    d12.innerHTML = "";
                    let child12 = document.createElement("div");
                    child12.style.backgroundColor = "yellow";
                    child12.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child12.style.height = `${h}%`;
                    child12.style.width = `${w}%`;
                    child12.style.borderRadius = "50%";
                    d12.appendChild(child12);

                    d13.innerHTML = "";
                    let child13 = document.createElement("div");
                    child13.style.backgroundColor = "brown";
                    child13.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child13.style.height = `${h}%`;
                    child13.style.width = `${w}%`;
                    child13.style.borderRadius = "50%";
                    d13.appendChild(child13);
                    
                    d14.innerHTML = "";
                    let child14 = document.createElement("div");
                    child14.style.backgroundColor = "#BC8F8F";
                    child14.style.height = `${h}%`;
                    child14.style.width = `${w}%`;
                    child14.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child14.style.borderRadius = "50%";
                    d14.appendChild(child14);
                    
                    d15.innerHTML = "";
                    let child15 = document.createElement("div");
                    child15.style.backgroundColor = "blue";
                    child15.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child15.style.height = `${h}%`;
                    child15.style.width = `${w}%`;
                    child15.style.borderRadius = "50%";
                    d15.appendChild(child15);

                    d21.innerHTML = "";
                    let child21 = document.createElement("div");
                    child21.style.backgroundColor = "#708090";
                    child21.style.height = `${h}%`;
                    child21.style.width = `${w}%`;
                    child21.style.borderRadius = "50%";
                    child21.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    d21.appendChild(child21);

                    d22.innerHTML = "";
                    let child22 = document.createElement("div");
                    child22.style.backgroundColor = "green";
                    child22.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child22.style.height = `${h}%`;
                    child22.style.width = `${w}%`;
                    child22.style.borderRadius = "50%";
                    d22.appendChild(child22);
                    
                    d23.innerHTML = "";
                    let child23 = document.createElement("div");
                    child23.style.backgroundColor = "red";
                    child23.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child23.style.height = `${h}%`;
                    child23.style.width = `${w}%`;
                    child23.style.borderRadius = "50%";
                    d23.appendChild(child23);
                    
                    d24.innerHTML = "";
                    let child24 = document.createElement("div");
                    child24.style.backgroundColor = "#40E0D0";
                    child24.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child24.style.height = `${h}%`;
                    child24.style.width = `${w}%`;
                    child24.style.borderRadius = "50%";
                    d24.appendChild(child24);
                    
                    d25.innerHTML = "";
                    let child25 = document.createElement("div");
                    child25.style.backgroundColor = "#EE82EE";
                    child25.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child25.style.height = `${h}%`;
                    child25.style.width = `${w}%`;
                    child25.style.borderRadius = "50%";
                    d25.appendChild(child25);
                    
                    d31.innerHTML = "";
                    let child31 = document.createElement("div");
                    child31.style.backgroundColor = "FFA500";
                    child31.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child31.style.height = `${h}%`;
                    child31.style.width = `${w}%`;
                    child31.style.borderRadius = "50%";
                    d31.appendChild(child31);
                    
                    d32.innerHTML = "";
                    let child32 = document.createElement("div");
                    child32.style.backgroundColor = "#9ACD32";
                    child32.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child32.style.height = `${h}%`;
                    child32.style.width = `${w}%`;
                    child32.style.borderRadius = "50%";
                    d32.appendChild(child32);
                    
                    d33.innerHTML = "";
                    let child33 = document.createElement("div");
                    child33.style.backgroundColor = "#FF1493";
                    child33.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child33.style.height = `${h}%`;
                    child33.style.width = `${w}%`;
                    child33.style.borderRadius = "50%";
                    d33.appendChild(child33);
                    
                    d34.innerHTML = "";
                    let child34 = document.createElement("div");
                    child34.style.backgroundColor = "#FFB6C1";
                    child34.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child34.style.height = `${h}%`;
                    child34.style.width = `${w}%`;
                    child34.style.borderRadius = "50%";
                    d34.appendChild(child34);

                    d35.innerHTML = "";
                    let child35 = document.createElement("div");
                    child35.style.backgroundColor = "#2F4F4F";
                    child35.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child35.style.height = `${h}%`;
                    child35.style.width = `${w}%`;
                    child35.style.borderRadius = "50%";
                    d35.appendChild(child35);
                                        
                    d41.innerHTML = "";
                    let child41 = document.createElement("div");
                    child41.style.backgroundColor = "white";
                    child41.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child41.style.height = `${h}%`;
                    child41.style.width = `${w}%`;
                    child41.style.borderRadius = "50%";
                    d41.appendChild(child41);

                    d42.innerHTML = "";
                    let child42 = document.createElement("div");
                    child42.style.backgroundColor = "#A0522D";
                    child42.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child42.style.height = `${h}%`;
                    child42.style.width = `${w}%`;
                    child42.style.borderRadius = "50%";
                    d42.appendChild(child42);

                    d43.innerHTML = "";
                    let child43 = document.createElement("div");
                    child43.style.backgroundColor = "#3CB371";
                    child43.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child43.style.height = `${h}%`;
                    child43.style.width = `${w}%`;
                    child43.style.borderRadius = "50%";
                    d43.appendChild(child43);

                    d44.innerHTML = "";
                    let child44 = document.createElement("div");
                    child44.style.backgroundColor = "#C71585";
                    child44.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child44.style.height = `${h}%`;
                    child44.style.width = `${w}%`;
                    child44.style.borderRadius = "50%";
                    d44.appendChild(child44);

                    d45.innerHTML = "";
                    let child45 = document.createElement("div");
                    child45.style.backgroundColor = "#8FBC8F";
                    child45.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child45.style.height = `${h}%`;
                    child45.style.width = `${w}%`;
                    child45.style.borderRadius = "50%";
                    d45.appendChild(child45);

                    d51.innerHTML = "";
                    let child51 = document.createElement("div");
                    child51.style.backgroundColor = "#FFA07A";
                    child51.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child51.style.height = `${h}%`;
                    child51.style.width = `${w}%`;
                    child51.style.borderRadius = "50%";
                    d51.appendChild(child51);

                    d52.innerHTML = "";
                    let child52 = document.createElement("div");
                    child52.style.backgroundColor = "DimGrey";
                    child52.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child52.style.height = `${h}%`;
                    child52.style.width = `${w}%`;
                    child52.style.borderRadius = "50%";
                    d52.appendChild(child52);
                    
                    d53.innerHTML = "";
                    let child53 = document.createElement("div");
                    child53.style.backgroundColor = "#A53A2A";
                    child53.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child53.style.height = `${h}%`;
                    child53.style.width = `${w}%`;
                    child53.style.borderRadius = "50%";
                    d53.appendChild(child53);
                                        
                    d54.innerHTML = "";
                    let child54 = document.createElement("div");
                    child54.style.backgroundColor = "#DC543C";
                    child54.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child54.style.height = `${h}%`;
                    child54.style.width = `${w}%`;
                    child54.style.borderRadius = "50%";
                    d54.appendChild(child54);

                                        
                    d55.innerHTML = "";
                    let child55 = document.createElement("div");
                    child55.style.backgroundColor = "#800080";
                    child55.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                    child55.style.height = `${h}%`;
                    child55.style.width = `${w}%`;
                    child55.style.borderRadius = "50%";
                    d55.appendChild(child55);
                } else {
                    clearInterval(interval);
                    sessionStorage.setItem('displayed',true);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
            }, 18);
        }else{
          navigate("/");
        }
    },[]);

    return(
        <div className={wellCome.mainDivWellCome}>
            <div className={wellCome.wellCome}>  
                <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div id="d00" style={{borderRadius: '50%', width: '250px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                </div>
                
                <div id="d11" style={{borderRadius: '50%', width: '80px', height: '80px', position: 'absolute', left: '2%', top: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d12" style={{borderRadius: '50%', width: '30px', height: '30px', position: 'absolute', left: '25%', top: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d13" style={{borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', left: '40%', top: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d14" style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', right: '25%', top: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d15" style={{borderRadius: '50%', width: '50px', height: '50px', position: 'absolute', right: '2%', top: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                
                <div id="d21" style={{borderRadius: '50%', width: '125px', height: '125px', position: 'absolute', left: '2%', top: '22%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d22" style={{borderRadius: '50%', width: '75px', height: '75px', position: 'absolute', left: '25%', top: '22%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d23" style={{borderRadius: '50%', width: '75px', height: '75px', position: 'absolute', left: '40%', top: '22%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d24" style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', right: '25%', top: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d25" style={{borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', right: '2%', top: '22%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                
                <div id="d31" style={{borderRadius: '50%', width: '50px', height: '50px', position: 'absolute', left: '2%', top: '42%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d32" style={{borderRadius: '50%', width: '90px', height: '90px', position: 'absolute', left: '25%', top: '42%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d33" style={{borderRadius: '50%', width: '150px', height: '150px', position: 'absolute', left: '40%', top: '42%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d34" style={{borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', right: '25%', top: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d35" style={{borderRadius: '50%', width: '150px', height: '150px', position: 'absolute', right: '2%', top: '42%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                
                <div id="d41" style={{borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', left: '2%', top: '62%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d42" style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', left: '25%', top: '62%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d43" style={{borderRadius: '50%', width: '90px', height: '90px', position: 'absolute', left: '40%', top: '62%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d44" style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', right: '25%', top: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d45" style={{borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', right: '2%', top: '62%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                
                <div id="d51" style={{borderRadius: '50%', width: '125px', height: '125px', position: 'absolute', left: '2%', top: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d52" style={{borderRadius: '50%', width: '75px', height: '75px', position: 'absolute', left: '25%', top: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d53" style={{borderRadius: '50%', width: '30px', height: '30px', position: 'absolute', left: '40%', top: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d54" style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', right: '25%', top: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
                <div id="d55" style={{borderRadius: '50%', width: '120px', height: '120px', position: 'absolute', right: '2%', top: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} />
            </div>
        </div>
    )
}

export default WellCome;