import { useEffect } from "react";

const WellCome=()=>{

    useEffect(()=>{
            
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

        let interval1 = setInterval(() => {

            if (++h <= 100 && ++w <= 100) {

                d00.style.boxShadow="rgba(0, 0, 0, 0.6) 0px 5px 15px";
                d00.style.height=`${h}%`;
                d00.style.width=`${w}%`;
                d00.style.fontSize=`${h*2}%`;
                d00.textContent="HostelsHub.in";
                d00.style.zIndex="1";
            
                d11.style.width=`${w}%`;
                d11.style.height=`${h}%`;

                d12.style.height = `${h}%`;
                d12.style.width = `${w}%`;

                d13.style.height = `${h}%`;
                d13.style.width = `${w}%`;
                
                d14.style.height = `${h}%`;
                d14.style.width = `${w}%`;
                
                d15.style.height = `${h}%`;
                d15.style.width = `${w}%`;

                d21.style.height = `${h}%`;
                d21.style.width = `${w}%`;

                d22.style.height = `${h}%`;
                d22.style.width = `${w}%`;
                
                d23.style.height = `${h}%`;
                d23.style.width = `${w}%`;
                
                d24.style.height = `${h}%`;
                d24.style.width = `${w}%`;
                
                d25.style.height = `${h}%`;
                d25.style.width = `${w}%`;
                
                d31.style.height = `${h}%`;
                d31.style.width = `${w}%`;

                d32.style.height = `${h}%`;
                d32.style.width = `${w}%`;
                
                d33.style.height = `${h}%`;
                d33.style.width = `${w}%`;
                
                d34.style.height = `${h}%`;
                d34.style.width = `${w}%`;

                d35.style.height = `${h}%`;
                d35.style.width = `${w}%`;
                                    
                d41.style.height = `${h}%`;
                d41.style.width = `${w}%`;

                d42.style.height = `${h}%`;
                d42.style.width = `${w}%`;

                d43.style.height = `${h}%`;
                d43.style.width = `${w}%`;

                d44.style.height = `${h}%`;
                d44.style.width = `${w}%`;

                d45.style.height = `${h}%`;
                d45.style.width = `${w}%`;

                d51.style.height = `${h}%`;
                d51.style.width = `${w}%`;

                d52.style.height = `${h}%`;
                d52.style.width = `${w}%`;
                
                d53.style.height = `${h}%`;
                d53.style.width = `${w}%`;
                                    
                d54.style.height = `${h}%`;
                d54.style.width = `${w}%`;
            
                d55.style.height = `${h}%`;
                d55.style.width = `${w}%`;
            } else {
                clearInterval(interval1);

                let interval2=setTimeout(()=>{

                    let r=0;
                    let wh=100;
                    let parent=document.getElementById("parent");
                    let child=document.getElementById("child");
                    let interval3=setInterval(()=>{
                        if(--wh>=0){
                            child.style.borderRadius=`${++r}%`
                            child.style.width=`${wh}%`;
                            child.style.height=`${wh}%`;
                        }else{
                            parent.style.width=`0%`;
                            parent.style.height=`0%`;
                            sessionStorage.setItem('displayed',true);
                            clearInterval(interval3);
                        }
                    },15)

                    clearInterval(interval2);
                }, 1200);
            }
        }, 15);
    },[]);

    return(
        <div id="parent" style={{width:'100%',height:'100%',overflow:'hidden',position:'absolute',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div id="child" style={{borderRadius:'0%', backgroundColor:'#E2D1F9',width:'100%',height:'100%',overflow:'hidden',position:'absolute', zIndex:'1'}}>

                <div style={{height:'100%',width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{borderRadius: '50%', width: '250px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <label id="d00" style={{backgroundColor:"#53ad7a",borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center'}} />
                    </div>
                </div>

                <div style={{borderRadius: '50%', width: '70px', height: '70px', position: 'absolute', left: '2%', top: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d11" style={{backgroundColor:"#5F9EA0",borderRadius:'50%',}} />
                </div>
                <div style={{borderRadius: '50%', width: '20px', height: '20px', position: 'absolute', left: '25%', top: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d12" style={{backgroundColor:"yellow",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '90px', height: '90px', position: 'absolute', left: '40%', top: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d13" style={{backgroundColor:"brown",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', right: '25%', top: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d14" style={{backgroundColor:"#BC8F8F",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '50px', height: '50px', position: 'absolute', right: '2%', top: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d15" style={{backgroundColor:"blue",borderRadius:'50%'}}/>
                </div>
                


                <div style={{borderRadius: '50%', width: '90px', height: '90px', position: 'absolute', left: '2%', top: '22%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d21" style={{backgroundColor:"#708090",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '55px', height: '55px', position: 'absolute', left: '35%', top: '22%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d22" style={{backgroundColor:"green",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '75px', height: '75px', position: 'absolute', left: '50%', top: '22%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d23" style={{backgroundColor:"red",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', right: '25%', top: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d24" style={{backgroundColor:"#ADFF2F",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '80px', height: '80px', position: 'absolute', right: '2%', top: '22%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d25" style={{backgroundColor:"#EE82EE",borderRadius:'50%'}}/>
                </div>



                <div style={{borderRadius: '50%', width: '50px', height: '50px', position: 'absolute', left: '2%', top: '42%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d31" style={{backgroundColor:"hsl(197, 71%, 73%)",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '90px', height: '90px', position: 'absolute', left: '25%', top: '42%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d32" style={{backgroundColor:"#9ACD32",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '120px', height: '120px', position: 'absolute', left: '40%', top: '42%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d33" style={{backgroundColor:"#FF1493",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', right: '25%', top: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d34" style={{backgroundColor:"#FFB6C1",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '130px', height: '130px', position: 'absolute', right: '2%', top: '42%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d35" style={{backgroundColor:"#B8860B",borderRadius:'50%'}}/>
                </div>



                <div style={{borderRadius: '50%', width: '85px', height: '85px', position: 'absolute', left: '2%', top: '62%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d41" style={{backgroundColor:"#F6D18A",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', left: '25%', top: '62%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d42" style={{backgroundColor:"#A0522D",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '90px', height: '90px', position: 'absolute', left: '40%', top: '62%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d43" style={{backgroundColor:"gold",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', right: '25%', top: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d44" style={{backgroundColor:"#C71585",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '80px', height: '80px', position: 'absolute', right: '2%', top: '62%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d45" style={{backgroundColor:"#8FBC8F",borderRadius:'50%'}}/>
                </div>



                <div style={{borderRadius: '50%', width: '105px', height: '105px', position: 'absolute', left: '2%', top: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d51" style={{backgroundColor:"#FFA07A",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '75px', height: '75px', position: 'absolute', left: '25%', top: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d52" style={{backgroundColor:"DimGrey",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '30px', height: '30px', position: 'absolute', left: '40%', top: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d53" style={{backgroundColor:"lightblue",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '25px', height: '25px', position: 'absolute', right: '25%', top: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d54" style={{backgroundColor:"#CD5C5C",borderRadius:'50%'}}/>
                </div>
                <div style={{borderRadius: '50%', width: '100px', height: '100px', position: 'absolute', right: '2%', top: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <label id="d55" style={{backgroundColor:"#800080",borderRadius:'50%'}}/>
                </div>
            </div>
        </div>
    )
}

export default WellCome;