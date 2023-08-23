 package servlets;

 import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.DriverManager;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.json.JSONObject;

import com.mysql.cj.jdbc.Driver;

@MultipartConfig
@WebServlet("/login")
public class Login extends HttpServlet{
	private static final long serialVersionUID = 1L;

	protected void doOptions(HttpServletRequest req, HttpServletResponse res){
		try {
	        // Handle preflight requests by setting the necessary headers.
	        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	        res.setHeader("Access-Control-Allow-Credentials", "true");
	        res.setStatus(HttpServletResponse.SC_OK);
		}catch(Exception err) {
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {        
        try {
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            res.setHeader("Access-Control-Allow-Credentials", "true");
        	
			StringBuilder requestBody = new StringBuilder();
	        BufferedReader reader = req.getReader();
	        String line;
	        while ((line = reader.readLine()) != null) {
	        	requestBody.append(line);
	        }
	        JSONObject json = new JSONObject(requestBody.toString());
	        String userMobileNumber = json.optString("mobileNumber");
	        String userPassword = json.optString("password");
	        
			
			
			String url="jdbc:mysql://localhost:3306/pg";
			String userName="root";
			String Password="123456789";
			
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con=DriverManager.getConnection(url,userName,Password);
			
			if(userMobileNumber.length()==10 && userPassword!="") {
				PreparedStatement pStmt=con.prepareStatement("select password from users where mobileNumber=?");
				pStmt.setString(1, userMobileNumber);
				ResultSet resultSet= pStmt.executeQuery();
				
				if(resultSet.next()){
					if(userPassword.equals(resultSet.getString(1))) {
				    	res.setStatus(HttpServletResponse.SC_OK);
					}else {
						res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					}
				}else {
					res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				}
			}else {
				res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			}
		}catch(Exception err) {
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}	
	}
}
