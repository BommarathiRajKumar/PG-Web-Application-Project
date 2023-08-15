package BackEnd;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import com.mysql.jdbc.Driver;

@WebServlet("/uploadHostel")
@MultipartConfig
public class uploadHostel extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException{	    	
        try {
	        	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
				res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
				res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
				res.setHeader("Access-Control-Allow-Credentials", "true");
				
                String url = "jdbc:mysql://localhost:3306/pg";
    			String userName = "root";
    			String pass = "123456789";
    			Driver d=new Driver();
    			DriverManager.registerDriver(d);
    			Connection con = DriverManager.getConnection(url,userName,pass);
    			
    			String query = "insert into hostelsDetails(mobileNumber,ownerName, hostelName, hostelType,  oneShareCost, twoShareCost, threeShareCost, fourShareCost, fiveShareCost, wifi, laundry, hotWater, imageOne, imageTwo, imageThree, stateName, cityName, areaName, landMark) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    		    
    			PreparedStatement pStm = con.prepareStatement(query);
    		    pStm.setString(1,req.getParameter("mobileNumber"));
    		    pStm.setString(2,req.getParameter("ownerName"));
    		    pStm.setString(3,req.getParameter("hostelName"));
    		    pStm.setString(4,req.getParameter("hostelType"));
    		    pStm.setString(5,req.getParameter("oneShareCost"));
    		    pStm.setString(6,req.getParameter("twoShareCost"));
    		    pStm.setString(7,req.getParameter("threeShareCost"));
    		    pStm.setString(8,req.getParameter("fourShareCost"));
    		    pStm.setString(9,req.getParameter("fiveShareCost"));
    		    pStm.setString(10,req.getParameter("wifi"));
    		    pStm.setString(11,req.getParameter("laundry"));
    		    pStm.setString(12,req.getParameter("hotWater"));
    		    pStm.setBlob(13,req.getPart("imageOne").getInputStream());
    		    pStm.setBlob(14,req.getPart("imageTwo").getInputStream());
    		    pStm.setBlob(15,req.getPart("imageThree").getInputStream());
                pStm.setString(16, req.getParameter("stateName"));
                pStm.setString(17, req.getParameter("cityName"));
                pStm.setString(18, req.getParameter("areaName"));
                pStm.setString(19, req.getParameter("landMark"));
                
                pStm.executeUpdate();

                res.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
        	System.out.println(e);
        	res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        } 
    }
}
