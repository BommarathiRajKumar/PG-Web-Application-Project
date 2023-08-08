package BackEnd;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.mysql.cj.jdbc.Driver;

@WebServlet("/login")
public class Login extends HttpServlet{
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest req, HttpServletResponse res){
		
		
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
		try {
			
			String userMobileNumber=req.getParameter("mobileNumber");
			String userPassword=req.getParameter("password");
			
			String url="jdbc:mysql://localhost:3306/pg";
			String userName="root";
			String Password="123456789";
			
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con=DriverManager.getConnection(url,userName,Password);
			
			if(userMobileNumber.length()==10 && userPassword!="") {
				PreparedStatement pStmt=con.prepareStatement("select password from users where mobileNumber="+userMobileNumber);
				ResultSet resultSet= pStmt.executeQuery();
				
				if(resultSet.next()){
					String dbPassword=resultSet.getString(1);
					if(dbPassword.equals(userPassword)) {
				    	res.setStatus(HttpServletResponse.SC_OK);
					}else {
						res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					}
				}else {
					res.setStatus(HttpServletResponse.SC_NOT_FOUND);
				}
			}else {
				res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			}
		}catch(Exception err) {
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}	
	}
}





/*app.post("/login", async(req, resp) => {
try{
    const mobileNumber = req.body.credentials.mobileNumber
    const password = req.body.credentials.password
    //const {mobileNumber, password} = req.body;
    user_details.findOne({_id: mobileNumber}, async (err, userDetails) =>{
        if(err){
            console.log(err)
            return resp.status(500).send("server error")
        }else if(userDetails == null || userDetails.password !== password){
            return resp.status(401).send("InvalidCredentails")
        }else if(userDetails.password == password){
            let payload ={
                user:{
                    id: userDetails._id
                }
            }
            jwt.sign(payload, 'jwtSecurtyKey', {expiresIn:30000},
            (err, token) =>{
                if(err) throw err;
                return resp.status(200).json({token})
            });
        }
    });
}catch(err){
    console.log(err);
    return resp.status(500).send("server error")

} 
})*/


