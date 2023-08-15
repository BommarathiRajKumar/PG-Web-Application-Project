import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginPageCss from "../css/loginPage.module.css";

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
    const[mob,setMob] = useState(localStorage.getItem('mobile'))
    const[pass,setPass] = useState(localStorage.getItem('password'))
    //const [token, setToken] = useState(localStorage.getItem('token'))
    //useState ReactHook this RactHook's always use in fun level components only don't use in class level components.
   //To use useState Hook we want to use(or)assign one var&one fun. var is for to assign the value which is given by us and fun is for to change the value of first var.
    const[credentialsErr, setCredentialsErr] = useState();
    const[userNotFound, setUserNotFound] =useState(false);
    const [serverErr, setServerErr] = useState(false);
    const {mobileNumber, password} = credentials;
    const updateHandler = e => {
        setCredentails({...credentials,[e.target.name]:e.target.value})
    }
    const userCredentialsSubmitHandler = e => {
        e.preventDefault();
        //By using the preventDefault() we can stop the reloding of form(or)this will prevent all the default activies.

        if(mobileNumber.length > 10 || mobileNumber.length < 10 || mobileNumber==="" || password.length < 8 || password.length > 15 || isNaN(mobileNumber)){
            setCredentialsErr(true)
            setServerErr(false)
            setUserNotFound(false)

        }else{
            axios.post("http://localhost:8080/PG/login?mobileNumber="+credentials.mobileNumber+"&password="+credentials.password).then(
                //By using axios we can make an request to backend like an API call.
                function (response) {
                    if(response){
                        if(response.status === 200){
                            //setToken(response.data.token)
                            //localStorage.setItem('token',response.data.token)
                            setServerErr(false)
                            setCredentialsErr(false)
                            setUserNotFound(false)
                            localStorage.setItem('mobile',credentials.mobileNumber)
                            localStorage.setItem('password',credentials.password)
                            setMob(credentials.mobileNumber)
                            setPass(credentials.password)
                            credentials.password='';
                            credentials.mobileNumber='';
                            navigate('/profile');
                        }else{
                            setServerErr(true)
                        }
                    }else{
                        setServerErr(true);
                    }
                }
            ).catch((err) => {
                if(err.response){
                    if(err.response.status === 401) {
                        setCredentialsErr(true)
                        setUserNotFound(false)
                        setServerErr(false)
                    }else if(err.response.status===404) {
                        setUserNotFound(true)
                        setServerErr(false)
                        setCredentialsErr(false)
                    }else if(err.response.status === 500) {
                        setServerErr(true)
                        setUserNotFound(false)
                        setCredentialsErr(false)
                    }
                }else{
                    setServerErr(true);
                }  
            })
        }
    }

    if(mob != null && pass!== null) {
        alert("your browser know your username and pasword we are redirecting you to your profile page.")
        navigate('/profile');
    }
    
    return( 
        <div>
            <form onSubmit={userCredentialsSubmitHandler} autoComplete="of">
                <h1>Well Come Back.</h1>
                
                <div>
                    {credentialsErr ?<div className={loginPageCss.error}>Invalid Credentails Please check the <br/> Mobile Number and password</div>:null}
                    {serverErr ?<div className={loginPageCss.error}>Internall Server Error <br/>please try again by refreshing the page.</div>:null}
                    {userNotFound ?<div className={loginPageCss.error}>Sorry user not found.</div>:null}<br/>
                </div>

                <div>Mobile Number</div><input type="text" name="mobileNumber" value={mobileNumber} onChange={updateHandler} /><br/><br/>
                <div className={loginPageCss.inLine}> Password</div><input type="password" name="password" value={password} onChange={updateHandler}/><br/><br/>
                <button className={loginPageCss.button}>Login</button><br/><br/><br/>   
                <div>-------------New Building Owner?-------------</div><br/><br/>
                <a href="http://localhost:3000/signup">Create an account</a>
            </form>
        </div>
    )
}


export default Login;