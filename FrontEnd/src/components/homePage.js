import React from "react"
import homePageCss from "../css/homePage.module.css"
const Home = () =>{
    return(
        
     <div className={homePageCss.mainDiv}>
        <header>
            <label>Building owner's.</label>
            <a style={{top: '30px'}} href="http://localhost:3000/login">Login</a><br/>
            <a style={{top: '58px'}} href="http://localhost:3000/signup">Signup</a>
        </header>
        <div className={homePageCss.content}>
            
        </div>
        <footer>
    
        </footer>  
     </div>

    
    )

}
export default Home;