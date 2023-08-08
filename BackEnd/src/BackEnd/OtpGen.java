package BackEnd;
import java.util.Random;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

import javax.servlet.ServletException;
import java.io.IOException;

import com.mysql.jdbc.Driver;
import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.io.PrintWriter;

@WebServlet("/otpGen")
public class OtpGen extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		try {
			
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
			res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
			res.setHeader("Access-Control-Allow-Credentials", "true");
			
			String mobileNumber=req.getParameter("mobileNumber");
			
			String url = "jdbc:mysql://localhost:3306/pg";
			String userName = "root";
			String pass = "123456789";
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con = DriverManager.getConnection(url,userName,pass);
			
			String query = "select count(*) from users where mobileNumber = ?";
		    PreparedStatement pStm = con.prepareStatement(query);
		    pStm.setString(1, mobileNumber);
		    ResultSet resultSet= pStm.executeQuery();
		    resultSet.next();
		    int count = resultSet.getInt(1);
		    
		    if(count<=0) {
		    	int otp=generateOTP();
		    	
		    	String insertOtpQuery="insert into otp (mobileNumber,otp) values(?,?)";
		    	PreparedStatement pStm1 = con.prepareStatement(insertOtpQuery);
		    	pStm1.setString(1, mobileNumber);
		    	pStm1.setInt(2, otp);
		    	pStm1.executeUpdate();
		    	
		    	PrintWriter out = res.getWriter();

		        out.println(otp);
		    	res.setStatus(HttpServletResponse.SC_OK);
		    }else {
		    	res.setStatus(409);
		    }
		    con.close();
		}catch(Exception e) {
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		
	}
	//here this function will generate otp and retun otp.
	private int generateOTP() {
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }
}
