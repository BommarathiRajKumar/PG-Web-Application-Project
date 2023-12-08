import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner';
import axios from "axios";
import { AiOutlineLogin, AiFillLock} from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";

import loginPageCss from "../css/loginPage.module.css";
import {apiUrl} from './url.js';
import ServerError from "../components/serverErrorPage"
import ConnectionRefuse from "../components/connectionRefusePage";

//if you want to run any fun after return then use useEffect(Hook) fun/method
//useEffect fun/method will excute directly after the completeion of return to browser this is called life cycle.
//useEffect return only once when we not give any dependency's
//it will take two parameters one is function and second is dependency's.

const Login = () => {

    const navigate = useNavigate();
    const[loading,setLoading] = useState();
    const[credentialsErr, setCredentialsErr] = useState();
    const[connectionRefused, setconnectionRefused] =useState(false);
    const [serverErr, setServerErr] = useState(false);

    const [credentials, setCredentails] = useState({
        mobileNumber: '',
        password: ''
    });
    const {mobileNumber, password} = credentials;
    const updateHandler = e => {
        setCredentails({...credentials,[e.target.name]:e.target.value})
    }

    //const [token, setToken] = useState(localStorage.getItem('token'))
    //useState ReactHook this RactHook's always use in fun level components only don't use in class level components.
    //To use useState Hook we want to use(or)assign one var&one fun. var is for to assign the value which is given by us and fun is for to change the value of first var.
    
    useEffect(()=>{
        if(localStorage.getItem('token') !== null) {
            navigate('/profile');
        }
    },[]);

    const userCredentialsSubmitHandler = (e) => {
        e.preventDefault();
        //By using the preventDefault() we can stop the reloding of form(or)this will prevent all the default activies.

        if(credentials.mobileNumber.length > 10 || credentials.mobileNumber.length < 10 || credentials.mobileNumber==="" || credentials.password.length < 8 || isNaN(mobileNumber)){
            setCredentialsErr(true)
        }else{
            setLoading(true);
            axios.post(apiUrl+"login?", credentials, {
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header to JSON
                }
            }).then(
                //By using axios we can make an request to backend like an API call.
                function (response) {
                    if(response){
                        if(response.status === 200){
                            //localStorage.setItem('token',response.data.token)
                            localStorage.setItem('token',response.data)
                            navigate('/profile');
                        }else{
                            setServerErr(true)
                        }
                    }
                }
            ).catch((err) => {
                if(err.response){
                    if(err.response.status===500){
                        setServerErr(true)
                    }else if(err.response.status===401){
                        setCredentialsErr(true)
                    }else{
                        setServerErr(true)
                    }
                }else{
                    setconnectionRefused(true)
                }
            }).finally(
                ()=>{
                    setLoading(false)
                }
            )
        }
    }

    return( 

        <div className={loginPageCss.mainDiv}>
            <div className={loginPageCss.mainContainer}>

                {serverErr || connectionRefused ?
                    <div style={{height:'100%',width:'100%'}}>
                        {serverErr ? <ServerError/>:<ConnectionRefuse />}
                    </div>
                :
                    <div style={{width:'80%'}}>
                        <form className={loginPageCss.form} onSubmit={userCredentialsSubmitHandler} autoComplete="of">
                            <div id="home" style={{width:'100%'}}><AiFillHome size={"15px"} style={{cursor:'pointer',position:'relative',left:'10px',top:'10px'}} onClick={()=>{navigate('/')}}/></div>
                            <h3 style={{marginTop:'50px',width:'65%'}}>Well Come Back To Best PG's.</h3>
                            {credentialsErr &&<div className={loginPageCss.error}>Invalid Credentails.</div>}
                            
                            <div style={{width:'65%'}}>Mobile Number</div>
                            <input  type="text" name="mobileNumber" value={mobileNumber} className={loginPageCss.input}  onChange={updateHandler} />
                            
                            <div className={loginPageCss.passwordDiv}>
                                <span>Password</span>
                                <a onClick={()=>{navigate('/forgotPassword')}}>
                                    <AiFillLock style={{marginRight:'2px'}}/>
                                    Forgot ?
                                </a>
                            </div>

                            <input type="password" name="password" value={password} className={loginPageCss.input} onChange={updateHandler}/>
                            <button className={loginPageCss.loginBut} disabled={loading}>
                                {loading ? 
                                    <Oval color="black" height={30} width={30}/>
                                :
                                    <span><AiOutlineLogin/>&nbsp;Login</span>
                                }
                            </button>
                            
                            <div style={{ width: '65%', borderBottom: '1px dotted', display: 'flex', justifyContent: 'center'}}>
                                New User?
                            </div>

                            <button  className={loginPageCss.createActBut} onClick={()=>navigate('/signup')} disabled={loading}>Create an Account</button>
                        
                        </form>
                    </div>
                }
            </div>
        </div>
        
    )
}

export default Login;