package BackEnd;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;




import javax.servlet.ServletException;
import java.io.IOException;

import com.mysql.jdbc.Driver;
import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/OtpValidAndSignup")
@MultipartConfig
public class OtpValidAndSignup extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res){
		try {
			
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
			res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
			res.setHeader("Access-Control-Allow-Credentials", "true");
	
			
			String mobileNumber=req.getParameter("mobileNumber");
			int userOtp=Integer.parseInt(req.getParameter("otp"));
			
			System.out.println(mobileNumber);
			
			String url = "jdbc:mysql://localhost:3306/pg";
			String userName = "root";
			String pass = "123456789";
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con = DriverManager.getConnection(url,userName,pass);
			
		    PreparedStatement qPstm = con.prepareStatement("select otp from otp where mobileNumber="+mobileNumber);
		    ResultSet resultSet= qPstm.executeQuery();
		    resultSet.next();
		    int dataBaseOpt = resultSet.getInt(1);
		    
		    if(dataBaseOpt==userOtp) {
		    	String insertQuery="insert into users (mobileNumber,password,ownerName, ownerImage) values(?,?,?,?)";
		    	PreparedStatement pStmt1=con.prepareStatement(insertQuery);
		    	pStmt1.setString(1, mobileNumber);
		    	pStmt1.setString(2, req.getParameter("password"));
		    	pStmt1.setString(3, req.getParameter("ownerName"));
		    	pStmt1.setBlob(4,req.getPart("ownerImage").getInputStream());
		    	pStmt1.executeUpdate();
		    	res.setStatus(HttpServletResponse.SC_OK);
		    	
		    	PreparedStatement delStm=con.prepareStatement("delete from otp where mobileNumber="+mobileNumber);
		    	delStm.executeUpdate();
		    }else {
		    	res.setStatus(409);
		    }
		    con.close();
		}catch(Exception e) {
			System.out.println(e);
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		
	}
	
}
