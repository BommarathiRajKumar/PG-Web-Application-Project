package servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.mysql.jdbc.Driver;

@MultipartConfig
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
			
			String state = req.getParameter("state");
			
			if(state.equals("profileLoad")) {
				String mob=req.getParameter("mobile");
				String pass=req.getParameter("password");
				
				if(mob.length()==10 && pass!="") {
					PreparedStatement pStmt=con.prepareStatement("select * from users where mobileNumber = ? and password = ?");
					pStmt.setString(1, mob);
					pStmt.setString(2, pass);
					ResultSet profileResultSet= pStmt.executeQuery();
					
					
					if (profileResultSet.next()) {
						JSONObject userDetails = new JSONObject();
						JSONObject profileDetails = new JSONObject();
						JSONObject hostelsDetails = new JSONObject();
						           
						profileDetails.put("mobileNumber", profileResultSet.getString("mobileNumber"));
						profileDetails.put("ownerName", profileResultSet.getString("ownerName"));
						
					    byte[] ownerImageBytes = profileResultSet.getBytes("ownerImage");
	                    if (ownerImageBytes != null) {
	                        String ownerImageBase64 = java.util.Base64.getEncoder().encodeToString(ownerImageBytes);
	                        profileDetails.put("ownerImage", ownerImageBase64);
	                    }
	                    userDetails.put("profileDetails",profileDetails);
	                    
	                   PreparedStatement pStmt1=con.prepareStatement("select * from hostelsDetails where mobileNumber=?");
	                   pStmt1.setString(1, mob);
	                   ResultSet hostelsDetailsResultSet= pStmt1.executeQuery();
	                   
	                   mob="";
	                   pass="";
	                   
	                    int i=0;
	                    while (hostelsDetailsResultSet.next()) {
	                    	JSONObject singleHostelDetails = new JSONObject();
	               
	                    	singleHostelDetails.put("mobileNumber", hostelsDetailsResultSet.getString("mobileNumber"));
			            	singleHostelDetails.put("ownerName", hostelsDetailsResultSet.getString("ownerName"));
	                    	singleHostelDetails.put("hostelName", hostelsDetailsResultSet.getString("hostelName"));
	                    	singleHostelDetails.put("hostelType", hostelsDetailsResultSet.getString("hostelType"));
	                    	singleHostelDetails.put("oneShareCost", hostelsDetailsResultSet.getString("oneShareCost"));
	                    	singleHostelDetails.put("twoShareCost", hostelsDetailsResultSet.getString("twoShareCost"));
	                    	singleHostelDetails.put("threeShareCost", hostelsDetailsResultSet.getString("threeShareCost"));
	                    	singleHostelDetails.put("fourShareCost", hostelsDetailsResultSet.getString("fourShareCost"));
	                    	singleHostelDetails.put("fiveShareCost", hostelsDetailsResultSet.getString("fiveShareCost"));
	                    	singleHostelDetails.put("wifi", hostelsDetailsResultSet.getString("wifi"));
	                    	singleHostelDetails.put("laundry", hostelsDetailsResultSet.getString("laundry"));
	                    	singleHostelDetails.put("hotWater", hostelsDetailsResultSet.getString("hotWater"));
	                    	singleHostelDetails.put("uniqueSerialNumber", hostelsDetailsResultSet.getString("uniqueSerialNumber"));
	                    	
	                    	byte[] imageOne = hostelsDetailsResultSet.getBytes("imageOne");
	                        if (imageOne != null) {
	                            String imageOne64 = java.util.Base64.getEncoder().encodeToString(imageOne);
	                            singleHostelDetails.put("imageOne", imageOne64);
	                        }
	                        
	                        byte[] imageTwo = hostelsDetailsResultSet.getBytes("imageTwo");
	                        if (imageTwo != null) {
	                            String imageTwo64 = java.util.Base64.getEncoder().encodeToString(imageTwo);
	                            singleHostelDetails.put("imageTwo", imageTwo64);
	                        }
	                        
	                        byte[] imageThree = hostelsDetailsResultSet.getBytes("imageThree");
	                        if (imageThree != null) {
	                            String imageThree64 = java.util.Base64.getEncoder().encodeToString(imageThree);
	                            singleHostelDetails.put("imageThree", imageThree64);
	                        }
	                   
	                    	singleHostelDetails.put("stateName", hostelsDetailsResultSet.getString("stateName"));
	                    	singleHostelDetails.put("cityName", hostelsDetailsResultSet.getString("cityName"));
	                    	singleHostelDetails.put("areaName", hostelsDetailsResultSet.getString("areaName"));
	                    	singleHostelDetails.put("landMark", hostelsDetailsResultSet.getString("landMark"));
	                    	
	                        hostelsDetails.put(("hostel"+String.valueOf(++i)),singleHostelDetails);   
	                        
	                    }
	                    userDetails.put("hostelsDetails", hostelsDetails); 
	                    

	                    res.setContentType("application/json");
					    res.getWriter().println(userDetails.toString());
	                    
					    res.setStatus(HttpServletResponse.SC_OK);
					    	
	                } else {
	                	res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	                }	
				}else {
					res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				}	
			}else if(state.equals("uploadHostel")) {
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
			}
		}catch(Exception err) {
			System.out.println(err);
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}	
	}
}