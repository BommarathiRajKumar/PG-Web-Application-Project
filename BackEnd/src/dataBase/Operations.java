package dataBase;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Random;


public class Operations{
	
	public static void deleteOtpFromDataBase(String mobileNumber)throws Exception {
		Connection con = MysqlDataBaseConnection.getMysqlConnection();
		PreparedStatement pStmt=con.prepareStatement("delete from otpTable where mobileNumber=?");
		pStmt.setString(1, mobileNumber);
		pStmt.executeUpdate();
		
		pStmt.close();
		con.close();
	}


	public static void insertOtpAndMobileNumberIntoDataBase(String mobileNumber, int otp) throws Exception{
		Connection con = MysqlDataBaseConnection.getMysqlConnection();
		PreparedStatement pStmt=con.prepareStatement("insert into otpTable (mobileNumber,otp) values(?,?)");
    	pStmt.setString(1, mobileNumber);
    	pStmt.setInt(2, otp);
    	pStmt.executeUpdate();
    	
    	pStmt.close();
    	con.close();
	}

	//here this function will generate otp and retun otp.
	public static int generateOtp() throws Exception{
		Random random = new Random();
		return 100000 + random.nextInt(900000);
	}
}
