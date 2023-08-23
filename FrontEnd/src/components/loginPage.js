import { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginPageCss from "../css/loginPage.module.css";
import ServerError from "../components/serverErrorPage"
import ConnectionRefuse from "../components/connectionRefusePage";

    //if you want to run any fun after return then use useEffect(Hook) fun/method
    //useEffect fun/method will excute directly after the completeion of return to browser this is called life cycle.
    //useEffect return only once when we not give any dependency's
    //it will take two parameters one is function and second is dependency's.

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentails] = useState({
        mobileNumber: '',
        password: ''
    })
    const updateHandler = e => {
        setCredentails({...credentials,[e.target.name]:e.target.value})
    }
    //const [token, setToken] = useState(localStorage.getItem('token'))
    //useState ReactHook this RactHook's always use in fun level components only don't use in class level components.
   //To use useState Hook we want to use(or)assign one var&one fun. var is for to assign the value which is given by us and fun is for to change the value of first var.
    const[credentialsErr, setCredentialsErr] = useState();
    const[connectionRefused, setconnectionRefused] =useState(false);
    const [serverErr, setServerErr] = useState(false);
    const {mobileNumber, password} = credentials;



    const userCredentialsSubmitHandler = e => {
        e.preventDefault();
        //By using the preventDefault() we can stop the reloding of form(or)this will prevent all the default activies.

        if(credentials.mobileNumber.length > 10 || credentials.mobileNumber.length < 10 || credentials.mobileNumber==="" || credentials.password.length < 8 || isNaN(mobileNumber)){
            setCredentialsErr(true)
        }else{
            axios.post("http://localhost:9090/BackEnd/login?", credentials, {
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header to JSON
                },
            }).then(
                //By using axios we can make an request to backend like an API call.
                function (response) {
                    if(response){
                        if(response.status === 200){
                            //setToken(response.data.token)
                            //localStorage.setItem('token',response.data.token)
                            localStorage.setItem('mobile',credentials.mobileNumber)
                            localStorage.setItem('password',credentials.password)
                            navigate('/profile');
                        }else{
                            setServerErr(true)
                        }
                    }
                }
            ).catch((err) => {
                if(err.response){
                    if(err.response.status==500){
                        setServerErr(true)
                    }else if(err.response.status===401){
                        setCredentialsErr(true)
                    }else{
                        setServerErr(true)
                    }
                }else{
                    setconnectionRefused(true)
                }
            }).finally(()=>{
                credentials.password=null;
                credentials.mobileNumber=null;
            })
        }
    }

   useEffect(()=>{
    if(localStorage.getItem('mobile') != null && localStorage.getItem('password')!== null) {
        alert("your browser know your credentials we are redirecting tp profile")
        navigate('/profile');
    }

   },[]) 
    
    return( 
        <div className={loginPageCss.mainDiv}>
            <div className={loginPageCss.mainContainer}>
                {serverErr || connectionRefused ?
                    <div>
                        {serverErr && <ServerError/>}
                        {connectionRefused && <ConnectionRefuse />}
                    </div>
                :
                    <form className={loginPageCss.form} onSubmit={userCredentialsSubmitHandler} autoComplete="of">
                        
                        <div style={{position:'absolute',height:'100%', width:'100%'}}>
                            <h1>Well Come Back.</h1>
                            
                            <div>
                                {credentialsErr ?<div className={loginPageCss.error}>Invalid Credentails Please check the <br/>Mobile Number and password.</div>:null}
                            </div>

                            <div>Mobile Number</div><input type="text" name="mobileNumber" value={mobileNumber} onChange={updateHandler} /><br/><br/>
                            <div className={loginPageCss.inLine}> Password</div><input type="password" name="password" value={password} onChange={updateHandler}/><br/><br/>
                            <button className={loginPageCss.button}>Login</button><br/><br/><br/>   
                            <div style={{width:'80%', display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <div>--------------New Building Owner?-----------</div><br/><br/>
                            </div>
                            <a href="http://localhost:3000/signup">Create an account</a>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}


export default Login;