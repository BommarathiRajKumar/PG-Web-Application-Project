package BackEnd;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.mysql.jdbc.Driver;

@WebServlet("/profile")
public class Profile extends HttpServlet{
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest req, HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
		try {
			String url="jdbc:mysql://localhost:3306/pg";
			String userName="root";
			String Password="123456789";
			
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con=DriverManager.getConnection(url,userName,Password);
			
			String mob=req.getParameter("mobile");
			String pass=req.getParameter("password");
			
			if(mob.length()==10 && pass!="") {
				PreparedStatement pStmt=con.prepareStatement("select * from users where mobileNumber='"+mob+"' and password='"+pass+"'");
				ResultSet profileResultSet= pStmt.executeQuery();
				
				if (profileResultSet.next()) {
					JSONObject userDetails = new JSONObject();
					JSONObject profileDetails = new JSONObject();
					JSONObject hostelDetails = new JSONObject();
					           
					profileDetails.put("mobileNumber", profileResultSet.getString("mobileNumber"));
					profileDetails.put("ownerName", profileResultSet.getString("ownerName"));
					
				    byte[] ownerImageBytes = profileResultSet.getBytes("ownerImage");
                    if (ownerImageBytes != null) {
                        String ownerImageBase64 = java.util.Base64.getEncoder().encodeToString(ownerImageBytes);
                        profileDetails.put("ownerImage", ownerImageBase64);
                    }
                    userDetails.put("profileDetails",profileDetails);
                    
                   PreparedStatement pStmt1=con.prepareStatement("select * from hostelsDetails where mobileNumber="+mob);
                   ResultSet hostelDetailsResultSet= pStmt1.executeQuery();
                   
                    int i=0;
                    while (hostelDetailsResultSet.next()) {
                    	JSONObject toatalHostelDetails = new JSONObject();
               
                    	toatalHostelDetails.put("uniqueSerialNumber", hostelDetailsResultSet.getString("uniqueSerialNumber"));
                    	toatalHostelDetails.put("hostelName", hostelDetailsResultSet.getString("hostelName"));
                    	toatalHostelDetails.put("hostelType", hostelDetailsResultSet.getString("hostelType"));
                    	toatalHostelDetails.put("oneShareCost", hostelDetailsResultSet.getString("oneShareCost"));
                    	toatalHostelDetails.put("twoShareCost", hostelDetailsResultSet.getString("twoShareCost"));
                    	toatalHostelDetails.put("threeShareCost", hostelDetailsResultSet.getString("threeShareCost"));
                    	toatalHostelDetails.put("fourShareCost", hostelDetailsResultSet.getString("fourShareCost"));
                    	toatalHostelDetails.put("fiveShareCost", hostelDetailsResultSet.getString("fiveShareCost"));
                    	toatalHostelDetails.put("wifi", hostelDetailsResultSet.getString("wifi"));
                    	toatalHostelDetails.put("laundry", hostelDetailsResultSet.getString("laundry"));
                    	toatalHostelDetails.put("hotWater", hostelDetailsResultSet.getString("hotWater"));
                    	
                    	byte[] imageOne = hostelDetailsResultSet.getBytes("imageOne");
                        if (imageOne != null) {
                            String imageOne64 = java.util.Base64.getEncoder().encodeToString(imageOne);
                            toatalHostelDetails.put("imageOne", imageOne64);
                        }
                        
                        byte[] imageTwo = hostelDetailsResultSet.getBytes("imageTwo");
                        if (imageTwo != null) {
                            String imageTwo64 = java.util.Base64.getEncoder().encodeToString(imageTwo);
                            toatalHostelDetails.put("imageTwo", imageTwo64);
                        }
                        
                        byte[] imageThree = hostelDetailsResultSet.getBytes("imageThree");
                        if (imageThree != null) {
                            String imageThree64 = java.util.Base64.getEncoder().encodeToString(imageThree);
                            toatalHostelDetails.put("imageThree", imageThree64);
                        }
                    	
                    	toatalHostelDetails.put("stateName", hostelDetailsResultSet.getString("stateName"));
                    	toatalHostelDetails.put("cityName", hostelDetailsResultSet.getString("cityName"));
                    	toatalHostelDetails.put("areaName", hostelDetailsResultSet.getString("areaName"));
                    	toatalHostelDetails.put("landMark", hostelDetailsResultSet.getString("landMark"));
                    	
                        hostelDetails.put(("hostel"+String.valueOf(++i)),toatalHostelDetails);   
                        
                    }
                    userDetails.put("hostelDetails", hostelDetails);
                    
				    res.setContentType("application/json");
				    res.getWriter().println(userDetails.toString());
				    
				    res.setStatus(HttpServletResponse.SC_OK);
                } else {
                    res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                }			
			}else {
				res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			}
		}catch(Exception err) {
			System.out.println(err);
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}	
	}
}





