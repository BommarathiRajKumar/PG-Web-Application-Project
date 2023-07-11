import { useState} from "react";
import axios from "axios";
import loginPageCss from "../css/loginPage.module.css";
 
    //if you want to run any fun after return then use useEffect(Hook) fun/method
    //useEffect fun/method will excute directly after the completeion of return to browser this is called life cycle.
    //useEffect return only once when we not give any dependency's
    //it will take two parameters one is function and second is dependency's.


const Login = () => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    //useState ReactHook this RactHook's always use in fun level components only don't use in class level components.
   //To use useState Hook we want to use(or)assign one var&one fun. var is for to assign the value which is given by us and fun is for to change the value of first var.
    const[credentialsErr, setCredentialsErr] = useState();
    const [serverErr, setServerErr] = useState(false);
    const [credentials, setCredentails] = useState({
        mobileNumber: '',
        password: ''
    })
    const {mobileNumber, password} = credentials;
    const updateHandler = e => {
        setCredentails({...credentials,[e.target.name]:e.target.value})
    }
    const userCredentialsSubmitHandler = e => {
        e.preventDefault();
        //By using the preventDefault() we can stop the reloding of form(or)this will prevent all the default activies.
        
        axios.post("http://localhost:9000/login", {credentials}).then(
            //By using axios we can make an request to backend like an API call.
            function (response) {
            if(response.status === 200){
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
            }else{
                setServerErr(true)
            }
        }).catch((err) => {
            if(err.response.status === 401){
                setCredentialsErr(true)
            }else if(err.response.status === 500){
                setServerErr(true)
            }
            
        })
    }

    if(token !== null){
        return <useNavigate to="/profile" />
    }
    
    return( 
        <div>
            <form onSubmit={userCredentialsSubmitHandler} autoComplete="of">
                <h1>Well Come Back.</h1>
                
                <div>
                    {credentialsErr ?<div className={loginPageCss.error}>Invalid Credentails Please check the <br/> Mobile Number and password</div>:null}
                    {serverErr ?<div className={loginPageCss.error}>Internall Server Error <br/>please try again after some time.</div>:null}<br/>
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