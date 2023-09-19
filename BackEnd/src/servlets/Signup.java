package servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import javax.servlet.ServletRequest;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;


import dataBase.MysqlDataBaseConnection;
import dataBase.Operations;

import java.io.BufferedReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import hash.Hashing;

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
			
			if(state!=null) {
				
				if(state.equals("validateMobile")) {
		
					String query = "select count(*) from users where mobileNumber = ?";
				    pStm = con.prepareStatement(query);
				    pStm.setString(1, mobileNumber);
				    resultSet= pStm.executeQuery();
				    resultSet.next();
				    
				    if(resultSet.getInt(1)==0) {
					    	int otp=Operations.generateOtp();
					    	Operations.deleteOtpFromDataBase(mobileNumber);
					    	Operations.insertOtpAndMobileNumberIntoDataBase(mobileNumber, otp);
						    res.getWriter().println(otp);
							res.setStatus(HttpServletResponse.SC_CREATED);
				    }else {
				    	res.setStatus(HttpServletResponse.SC_CONFLICT);
				    }
				    
				}else if(state.equals("validateOtp")) {
					
				    System.out.println("0");
				    System.out.println(req.getParameter("otp"));

				    System.out.println(req.getParameter("ownerName"));
				    
				    System.out.println(req.getParameter("password"));
					
					
				    pStm = con.prepareStatement("select otp from otpTable where mobileNumber=?");
				    pStm.setString(1, mobileNumber);
				    resultSet= pStm.executeQuery();
				    
				    if(resultSet.next()) {
				    	
					    if(resultSet.getInt("otp")==Integer.parseInt(req.getParameter("otp"))) {
					    	byte[] salt =Hashing.generateSalt();
					    	pStm=con.prepareStatement("insert into users (mobileNumber,password,ownerName, ownerImage,salt) values(?,?,?,?,?)");
					    	
					    	pStm.setString(1, mobileNumber);
					    	pStm.setString(2, Hashing.bytesToHex(Hashing.hashPassword(Hashing.combineSaltAndPassword(req.getParameter("password"), salt))));
					    	pStm.setString(3, req.getParameter("ownerName"));
					    	pStm.setBlob(4,req.getPart("ownerImage").getInputStream());
					    	pStm.setBytes(5, salt);
					    	pStm.executeUpdate();
					    	res.setStatus(HttpServletResponse.SC_CREATED);
					    	Operations.deleteOtpFromDataBase(mobileNumber);
					    	
					    }else {
					    	res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					    }
				    }else {
				    	res.setStatus(HttpServletResponse.SC_NO_CONTENT);
				    }
					
				}
				if(resultSet!=null)resultSet.close();
				if(pStm!=null)pStm.close();
				con.close();
			}
		}catch(Exception err) {
			err.printStackTrace();
			System.out.println(err);
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	    	try{
	    		Operations.deleteOtpFromDataBase(req.getParameter("mobileNumber"));
	    	}catch(Exception er) {
	    		er.printStackTrace();
	    		System.out.println(err);
	    		res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	    	}
		}
	}
	
}