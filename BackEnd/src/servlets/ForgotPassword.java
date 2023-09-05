package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import dataBase.MysqlDataBaseConnection;
import hash.Hashing;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


@MultipartConfig
@WebServlet("/forgotPassword")
public class ForgotPassword extends HttpServlet {
	private static final long serialVersionUID = 1L;


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		StringBuilder requestBody = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
        	requestBody.append(line);
        }
        JSONObject json = new JSONObject(requestBody.toString());

		String state=request.getParameter("state");
		String mobileNumber=json.optString("mobileNumber");
		try {
			
			if(mobileNumber.length()==10) {
				Connection con=MysqlDataBaseConnection.getMysqlConnection();
				PreparedStatement pStm=null;
				ResultSet resultSet=null;
				
				
				if(state.equals("reqOtp")) {				
					pStm=con.prepareStatement("select mobileNumber from users where mobileNumber=?");
					pStm.setString(1,mobileNumber);
					resultSet=pStm.executeQuery();
					
					if(resultSet.next()) {
						if(resultSet.getString(1).equals(mobileNumber)) {
							Signup obj=new Signup();
							int otp=obj.generateOtp();
							obj.deleteOtpFromDataBase(mobileNumber);
							obj.insertOtpAndMobileNumberIntoDataBase(mobileNumber, otp);
							response.getWriter().println(otp);
							response.setStatus(HttpServletResponse.SC_CREATED);
		
			 			}
					}
		
					pStm.close();
					resultSet.close();
				}else if(state.equals("validateOtp")) {
					pStm=con.prepareStatement("select otp from otpTable where mobileNumber=?");
					pStm.setString(1, mobileNumber);
					resultSet=pStm.executeQuery();
					
					if(resultSet.next()) {
						
						if(resultSet.getInt("otp")==Integer.valueOf(json.optString("otp")) && json.optString("newPassword")!=null) {
							byte[] salt =Hashing.generateSalt();
							
							String query="update users set password=? , salt=? where mobileNumber=?";
							pStm=con.prepareStatement(query);
							pStm.setString(1,Hashing.bytesToHex(Hashing.hashPassword(Hashing.combineSaltAndPassword(json.optString("newPassword"), salt))));
							pStm.setBytes(2, salt);
							pStm.setString(3,mobileNumber);
							pStm.executeUpdate();
							response.setStatus(HttpServletResponse.SC_CREATED);
							salt=null;
							new Signup().deleteOtpFromDataBase(mobileNumber);
						}else {
							response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
						}
					}
					pStm.close();
					resultSet.close();
				}
				
				con.close();
			}
		}catch(Exception err) {
			err.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			try {
				new Signup().deleteOtpFromDataBase(mobileNumber);
			} catch (Exception e) {
				err.printStackTrace();
				response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			}
			
		}
	}

}
