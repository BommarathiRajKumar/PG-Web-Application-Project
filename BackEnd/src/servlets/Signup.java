package servlets;

import java.util.Random;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;


import dataBase.MysqlDataBaseConnection;
import hash.Hashing;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@MultipartConfig
@WebServlet("/signup")
public class Signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) {
		try {
			
			Connection con = MysqlDataBaseConnection.getMysqlConnection();
			PreparedStatement pStm=null;
			ResultSet resultSet=null;
			
			String state = req.getParameter("state");
			String mobileNumber=req.getParameter("mobileNumber");
			

			
			if(state.equals("validateMobile")) {
	
				String query = "select count(*) from users where mobileNumber = ?";
			    pStm = con.prepareStatement(query);
			    pStm.setString(1, mobileNumber);
			    resultSet= pStm.executeQuery();
			    resultSet.next();
			    
			    if(resultSet.getInt(1)==0) {
				    	int otp=generateOtp();
				    	deleteOtpFromDataBase(mobileNumber);
				        insertOtpAndMobileNumberIntoDataBase(mobileNumber, otp);
					    res.getWriter().println(otp);
						res.setStatus(HttpServletResponse.SC_CREATED);
			    }else {
			    	res.setStatus(HttpServletResponse.SC_CONFLICT);
			    }
			    
			}else if(state.equals("validateOtp")) {
				
				int userOtp=Integer.parseInt(req.getParameter("otp"));
			    pStm = con.prepareStatement("select otp from otpTable where mobileNumber=?");
			    pStm.setString(1, mobileNumber);
			    resultSet= pStm.executeQuery();
			    
			    if(resultSet.next()) {
				    if(resultSet.getInt("otp")==userOtp) {
				    	byte[] salt =Hashing.generateSalt();
				    	
				    	pStm=con.prepareStatement("insert into users (mobileNumber,password,ownerName, ownerImage,salt) values(?,?,?,?,?)");
				    	
				    	pStm.setString(1, mobileNumber);
				    	pStm.setString(2, Hashing.bytesToHex(Hashing.hashPassword(Hashing.combineSaltAndPassword(req.getParameter("password"), salt))));
				    	pStm.setString(3, req.getParameter("ownerName"));
				    	pStm.setBlob(4,req.getPart("ownerImage").getInputStream());
				    	pStm.setBytes(5, salt);
				    	
				    	pStm.executeUpdate();
				    	res.setStatus(HttpServletResponse.SC_CREATED);
				    	deleteOtpFromDataBase(mobileNumber);
				    }else {
				    	res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				    }
			    }else {
			    	res.setStatus(HttpServletResponse.SC_NO_CONTENT);
			    }
				
			}
			resultSet.close();
			pStm.close();
			con.close();
		}catch(Exception err) {
	    	try{deleteOtpFromDataBase(req.getParameter("mobileNumber"));}catch(Exception er) {er.printStackTrace();}
			System.out.println(err);
			err.printStackTrace();
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}
	
	
	public void deleteOtpFromDataBase(String mobileNumber)throws Exception {
			Connection con = MysqlDataBaseConnection.getMysqlConnection();
			PreparedStatement pStmt=con.prepareStatement("delete from otpTable where mobileNumber=?");
			pStmt.setString(1, mobileNumber);
			pStmt.executeUpdate();
			
			pStmt.close();
			con.close();
	}
	
	
	public void insertOtpAndMobileNumberIntoDataBase(String mobileNumber, int otp) throws Exception{
			
			Connection con = MysqlDataBaseConnection.getMysqlConnection();
			PreparedStatement pStmt=con.prepareStatement("insert into otpTable (mobileNumber,otp) values(?,?)");
	    	pStmt.setString(1, mobileNumber);
	    	pStmt.setInt(2, otp);
	    	pStmt.executeUpdate();
	    	
	    	pStmt.close();
	    	con.close();
	}
	
	//here this function will generate otp and retun otp.
	public int generateOtp() throws Exception{
        Random random = new Random();
        return 100000 + random.nextInt(900000);
    }
}
