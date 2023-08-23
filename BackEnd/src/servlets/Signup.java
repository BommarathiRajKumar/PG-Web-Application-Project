package servlets;

import java.util.Random;

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
import java.io.PrintWriter;

@MultipartConfig
@WebServlet("/signup")
public class Signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	String url = "jdbc:mysql://localhost:3306/pg";
	String userName = "root";
	String pass = "123456789";
	
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		try {	
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
			res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
			res.setHeader("Access-Control-Allow-Credentials", "true");
			
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con = DriverManager.getConnection(url,userName,pass);
			
			String state = req.getParameter("state");
			

			
			if(state.equals("validateMobile")) {

				String mobileNumber=req.getParameter("mobileNumber");
				
				String query = "select count(*) from users where mobileNumber = ?";
			    PreparedStatement pStm = con.prepareStatement(query);
			    pStm.setString(1, mobileNumber);
			    ResultSet resultSet= pStm.executeQuery();
			    resultSet.next();
			    
			    if(resultSet.getInt(1)==0) {
			    		deleteOtpFromDataBase(mobileNumber);
				    	int otp=generateOtp();
				        insertOtpAndMobileNumberIntoDataBase(mobileNumber, otp);
					    PrintWriter out = res.getWriter();
						out.println(otp);
						res.setStatus(HttpServletResponse.SC_CREATED);
			    }else {
			    	res.setStatus(HttpServletResponse.SC_CONFLICT);
			    }
			}else if(state.equals("validateOtp")) {
				String mobileNumber=req.getParameter("mobileNumber");
				int userOtp=Integer.parseInt(req.getParameter("otp"));
				
			    PreparedStatement pstm = con.prepareStatement("select otp from otpTable where mobileNumber=?");
			    pstm.setString(1, mobileNumber);
			    ResultSet resultSet= pstm.executeQuery();
			    
			    if(resultSet.next()) {
				    if(resultSet.getInt("otp")==userOtp) {
				    	pstm=con.prepareStatement("insert into users (mobileNumber,password,ownerName, ownerImage) values(?,?,?,?)");
				    	pstm.setString(1, mobileNumber);
				    	pstm.setString(2, req.getParameter("password"));
				    	pstm.setString(3, req.getParameter("ownerName"));
				    	pstm.setBlob(4,req.getPart("ownerImage").getInputStream());
				    	pstm.executeUpdate();
				    	res.setStatus(HttpServletResponse.SC_CREATED);
				    	
				    	deleteOtpFromDataBase(mobileNumber);
				    }else {
				    	res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				    }
			    }else {
			    	res.setStatus(HttpServletResponse.SC_NO_CONTENT);
			    }
				
			}
		}catch(Exception err) {
				try {
					deleteOtpFromDataBase(req.getParameter("mobileNumber"));
				} catch (Exception e) {
					res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
				}
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}	
	}
	
	
	private void deleteOtpFromDataBase(String mobileNumber) throws Exception {
		
			String url = "jdbc:mysql://localhost:3306/pg";
			String userName = "root";
			String pass = "123456789";
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con = DriverManager.getConnection(url,userName,pass);
			
			PreparedStatement pStmt=con.prepareStatement("delete from otpTable where mobileNumber=?");
			pStmt.setString(1, mobileNumber);
			pStmt.executeUpdate();
	}
	
	
	private void insertOtpAndMobileNumberIntoDataBase(String mobileNumber, int otp) throws Exception{
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con = DriverManager.getConnection(url,userName,pass);
			
			PreparedStatement pStmt=con.prepareStatement("insert into otpTable (mobileNumber,otp) values(?,?)");
	    	pStmt.setString(1, mobileNumber);
	    	pStmt.setInt(2, otp);
	    	pStmt.executeUpdate();
	}
	
	//here this function will generate otp and retun otp.
	private int generateOtp() throws Exception{
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }
}
