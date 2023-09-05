 package servlets;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;


import dataBase.MysqlDataBaseConnection;

@MultipartConfig
@WebServlet("/profile")
public class Profile extends HttpServlet{
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest req, HttpServletResponse res){
		
		try {
			Connection con=MysqlDataBaseConnection.getMysqlConnection();
			PreparedStatement pStmt=null;
			ResultSet resultSet=null;
			
			String state = req.getParameter("state");
			
			
			if(state.equals("profileLoad")) {
				String mob=req.getParameter("mobile");
				String pass=req.getParameter("password");
				
				if(mob.length()==10 && pass!="") {
					pStmt=con.prepareStatement("select * from users where mobileNumber = ? and password = ?");
					pStmt.setString(1, mob);
					pStmt.setString(2, pass);
					resultSet= pStmt.executeQuery();
					
					
					if (resultSet.next()) {
						JSONObject userDetails = new JSONObject();
						JSONObject profileDetails = new JSONObject();
						JSONObject hostelsDetails = new JSONObject();
						           
						profileDetails.put("mobileNumber", resultSet.getString("mobileNumber"));
						profileDetails.put("ownerName", resultSet.getString("ownerName"));
						
					    byte[] ownerImageBytes = resultSet.getBytes("ownerImage");
	                    if (ownerImageBytes != null) {
	                        String ownerImageBase64 = java.util.Base64.getEncoder().encodeToString(ownerImageBytes);
	                        profileDetails.put("ownerImage", ownerImageBase64);
	                    }
	                    userDetails.put("profileDetails",profileDetails);
	                    
	                   pStmt=con.prepareStatement("select * from hostelsDetails where mobileNumber=?");
	                   pStmt.setString(1, mob);
	                   resultSet= pStmt.executeQuery();
	                   
	                    int i=0;
	                    while (resultSet.next()) {
	                    	JSONObject singleHostelDetails = new JSONObject();
	               
	                    	singleHostelDetails.put("mobileNumber", resultSet.getString("mobileNumber"));
			            	singleHostelDetails.put("ownerName", resultSet.getString("ownerName"));
	                    	singleHostelDetails.put("hostelName", resultSet.getString("hostelName"));
	                    	singleHostelDetails.put("hostelType", resultSet.getString("hostelType"));
	                    	singleHostelDetails.put("oneShareApplicable", resultSet.getString("oneShareApplicable"));
	                    	singleHostelDetails.put("oneShareCost", resultSet.getString("oneShareCost"));
	                    	singleHostelDetails.put("oneShareRoomsAvailable", resultSet.getString("oneShareRoomsAvailable"));
	                    	singleHostelDetails.put("twoShareApplicable", resultSet.getString("twoShareApplicable"));
	                    	singleHostelDetails.put("twoShareCost", resultSet.getString("twoShareCost"));
	                    	singleHostelDetails.put("twoShareRoomsAvailable", resultSet.getString("twoShareRoomsAvailable"));
	                    	singleHostelDetails.put("threeShareApplicable", resultSet.getString("threeShareApplicable"));
	                    	singleHostelDetails.put("threeShareCost", resultSet.getString("threeShareCost"));
	                    	singleHostelDetails.put("threeShareRoomsAvailable", resultSet.getString("threeShareRoomsAvailable"));
	                    	singleHostelDetails.put("fourShareApplicable", resultSet.getString("fourShareApplicable"));
	                    	singleHostelDetails.put("fourShareCost", resultSet.getString("fourShareCost"));
	                    	singleHostelDetails.put("fourShareRoomsAvailable", resultSet.getString("fourShareRoomsAvailable"));
	                    	singleHostelDetails.put("fiveShareApplicable", resultSet.getString("fiveShareApplicable"));
	                    	singleHostelDetails.put("fiveShareCost", resultSet.getString("fiveShareCost"));
	                    	singleHostelDetails.put("fiveShareRoomsAvailable", resultSet.getString("fiveShareRoomsAvailable"));
	                    	singleHostelDetails.put("wifi", resultSet.getString("wifi"));
	                    	singleHostelDetails.put("laundry", resultSet.getString("laundry"));
	                    	singleHostelDetails.put("hotWater", resultSet.getString("hotWater"));
	                    	singleHostelDetails.put("uniqueSerialNumber", resultSet.getString("uniqueSerialNumber"));
	                    	
	                    	byte[] imageOne = resultSet.getBytes("imageOne");
	                        if (imageOne != null) {
	                            String imageOne64 = java.util.Base64.getEncoder().encodeToString(imageOne);
	                            singleHostelDetails.put("imageOne", imageOne64);
	                        }
	                        
	                        byte[] imageTwo = resultSet.getBytes("imageTwo");
	                        if (imageTwo != null) {
	                            String imageTwo64 = java.util.Base64.getEncoder().encodeToString(imageTwo);
	                            singleHostelDetails.put("imageTwo", imageTwo64);
	                        }
	                        
	                        byte[] imageThree = resultSet.getBytes("imageThree");
	                        if (imageThree != null) {
	                            String imageThree64 = java.util.Base64.getEncoder().encodeToString(imageThree);
	                            singleHostelDetails.put("imageThree", imageThree64);
	                        }
	                   
	                    	singleHostelDetails.put("stateName", resultSet.getString("stateName"));
	                    	singleHostelDetails.put("cityName", resultSet.getString("cityName"));
	                    	singleHostelDetails.put("areaName", resultSet.getString("areaName"));
	                    	singleHostelDetails.put("landMark", resultSet.getString("landMark"));
	                    	
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
				resultSet.close();
			}else if(state.equals("uploadHostel")) {
    			pStmt = con.prepareStatement(
    					"insert into hostelsDetails(mobileNumber,ownerName, hostelName, hostelType, oneShareApplicable, oneShareCost, "
    					+ "oneShareRoomsAvailable, twoShareApplicable, twoShareCost, twoShareRoomsAvailable, threeShareApplicable, threeShareCost, "
    					+ "threeShareRoomsAvailable,fourShareApplicable, fourShareCost, fourShareRoomsAvailable, fiveShareApplicable, fiveShareCost, "
    					+ "fiveShareRoomsAvailable, wifi, laundry, hotWater,imageOne, imageTwo, imageThree, stateName, cityName, areaName, landMark) "
    					+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    			
    		    pStmt.setString(1,req.getParameter("mobileNumber"));
    		    pStmt.setString(2,req.getParameter("ownerName"));
    		    pStmt.setString(3,req.getParameter("hostelName"));
    		    pStmt.setString(4,req.getParameter("hostelType"));
    		    pStmt.setString(5, req.getParameter("oneShareApplicable"));
    		    pStmt.setString(6,req.getParameter("oneShareCost"));
    		    pStmt.setString(7, req.getParameter("oneShareRoomsAvailable"));
    		    pStmt.setString(8, req.getParameter("twoShareApplicable"));
    		    pStmt.setString(9,req.getParameter("twoShareCost"));
    		    pStmt.setString(10, req.getParameter("twoShareRoomsAvailable"));
    		    pStmt.setString(11, req.getParameter("threeShareApplicable"));
    		    pStmt.setString(12,req.getParameter("threeShareCost"));
    		    pStmt.setString(13, req.getParameter("threeShareRoomsAvailable"));
    		    pStmt.setString(14, req.getParameter("fourShareApplicable"));
    		    pStmt.setString(15,req.getParameter("fourShareCost"));
    		    pStmt.setString(16, req.getParameter("fourShareRoomsAvailable"));
    		    pStmt.setString(17, req.getParameter("fiveShareApplicable"));
    		    pStmt.setString(18,req.getParameter("fiveShareCost"));
    		    pStmt.setString(19, req.getParameter("fiveShareRoomsAvailable"));
    		    pStmt.setString(20,req.getParameter("wifi"));
    		    pStmt.setString(21,req.getParameter("laundry"));
    		    pStmt.setString(22,req.getParameter("hotWater"));
    		    pStmt.setBlob(23,req.getPart("imageOne").getInputStream());
    		    pStmt.setBlob(24,req.getPart("imageTwo").getInputStream());
    		    pStmt.setBlob(25,req.getPart("imageThree").getInputStream());
                pStmt.setString(26, req.getParameter("stateName"));
                pStmt.setString(27, req.getParameter("cityName"));
                pStmt.setString(28, req.getParameter("areaName"));
                pStmt.setString(29, req.getParameter("landMark"));
                
                pStmt.executeUpdate();

                res.setStatus(HttpServletResponse.SC_OK);
    			
			}
			pStmt.close();
			con.close();
		}catch(Exception err) {
			err.printStackTrace();
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}	
	}
}