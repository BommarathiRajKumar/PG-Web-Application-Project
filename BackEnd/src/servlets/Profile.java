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

import jjwt.JWT;

@MultipartConfig
@WebServlet("/profile")
public class Profile extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
	@SuppressWarnings("resource")
	protected void doPost(HttpServletRequest req, HttpServletResponse res){
		Connection con=null;
		PreparedStatement pStmt=null;
		ResultSet resultSet=null;
		
		try {
			con=MysqlDataBaseConnection.getMysqlConnection();
			
			String authorizationHeader = req.getHeader("Authorization");
			String state = req.getParameter("state");
			
			if(state!=null) {
				if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
					String token = authorizationHeader.substring(7);
					if(JWT.isValid(token)) {
						String mob=JWT.getSubject(token);
						String pass=JWT.getId(token);
					
						pStmt=con.prepareStatement("select * from users where mobileNumber = ? and password = ?");
						pStmt.setString(1, mob);
						pStmt.setString(2, pass);
						resultSet= pStmt.executeQuery();
						
						if (resultSet.next()) {
							if(state.equals("profileLoad")) {
	                        
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
			                    
			                   String query="select * from hostelsDetails where mobileNumber=?";
			                   pStmt=con.prepareStatement(query);
			                   pStmt.setString(1, mob);
			                   resultSet= pStmt.executeQuery();
			                   
			                   
			                    int i=0;
			                    while (resultSet.next()) {
			                    	JSONObject singleHostelDetails = new JSONObject();
			               
			                    	singleHostelDetails.put("mobileNumber", resultSet.getString("mobileNumber"));
					            	singleHostelDetails.put("ownerName", resultSet.getString("ownerName"));
			                    	singleHostelDetails.put("hostelName", resultSet.getString("hostelName"));
			                    	singleHostelDetails.put("hostelType", resultSet.getString("hostelType"));
			                    	singleHostelDetails.put("oneShareApplicable", resultSet.getBoolean("oneShareApplicable"));
			                    	singleHostelDetails.put("oneShareCost", resultSet.getString("oneShareCost"));
			                    	singleHostelDetails.put("oneShareRoomsAvailable", resultSet.getString("oneShareRoomsAvailable"));
			                    	singleHostelDetails.put("twoShareApplicable", resultSet.getBoolean("twoShareApplicable"));
			                    	singleHostelDetails.put("twoShareCost", resultSet.getString("twoShareCost"));
			                    	singleHostelDetails.put("twoShareRoomsAvailable", resultSet.getString("twoShareRoomsAvailable"));
			                    	singleHostelDetails.put("threeShareApplicable", resultSet.getBoolean("threeShareApplicable"));
			                    	singleHostelDetails.put("threeShareCost", resultSet.getString("threeShareCost"));
			                    	singleHostelDetails.put("threeShareRoomsAvailable", resultSet.getString("threeShareRoomsAvailable"));
			                    	singleHostelDetails.put("fourShareApplicable", resultSet.getBoolean("fourShareApplicable"));
			                    	singleHostelDetails.put("fourShareCost", resultSet.getString("fourShareCost"));
			                    	singleHostelDetails.put("fourShareRoomsAvailable", resultSet.getString("fourShareRoomsAvailable"));
			                    	singleHostelDetails.put("fiveShareApplicable", resultSet.getBoolean("fiveShareApplicable"));
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
							    
							    resultSet.close();
							    pStmt.close();
							    con.close();
	
							}else if(state.equals("uploadHostel")) {
								String query="insert into hostelsDetails(mobileNumber,ownerName, hostelName, hostelType, oneShareApplicable, oneShareCost, "
		                                + "oneShareRoomsAvailable, twoShareApplicable, twoShareCost, twoShareRoomsAvailable, threeShareApplicable, threeShareCost, "
		                                + "threeShareRoomsAvailable,fourShareApplicable, fourShareCost, fourShareRoomsAvailable, fiveShareApplicable, fiveShareCost, "
		                                + "fiveShareRoomsAvailable, wifi, laundry, hotWater,imageOne, imageTwo, imageThree, stateName, cityName, areaName, landMark) "
		                                + "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		                        pStmt = con.prepareStatement(query);
		                        
		                        pStmt.setString(1,req.getParameter("mobileNumber"));
		                        pStmt.setString(2,req.getParameter("ownerName"));
		                        pStmt.setString(3,req.getParameter("hostelName"));
		                        pStmt.setString(4,req.getParameter("hostelType"));
		                        pStmt.setBoolean(5, Boolean.valueOf(req.getParameter("oneShareApplicable")));
		                        pStmt.setString(6,req.getParameter("oneShareCost"));
		                        pStmt.setString(7, req.getParameter("oneShareRoomsAvailable"));
		                        pStmt.setBoolean(8,Boolean.valueOf(req.getParameter("twoShareApplicable")));
		                        pStmt.setString(9,req.getParameter("twoShareCost"));
		                        pStmt.setString(10, req.getParameter("twoShareRoomsAvailable"));
		                        pStmt.setBoolean(11,Boolean.valueOf(req.getParameter("threeShareApplicable")));
		                        pStmt.setString(12,req.getParameter("threeShareCost"));
		                        pStmt.setString(13, req.getParameter("threeShareRoomsAvailable"));
		                        pStmt.setBoolean(14,Boolean.valueOf(req.getParameter("fourShareApplicable")));
		                        pStmt.setString(15,req.getParameter("fourShareCost"));
		                        pStmt.setString(16, req.getParameter("fourShareRoomsAvailable"));
		                        pStmt.setBoolean(17,Boolean.valueOf(req.getParameter("fiveShareApplicable")));
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
		                    }else if(state.equals("updateHostelDetails")){

		                    	String query = "UPDATE hostelsDetails SET "
		                    			+ "hostelName = ?, "
		                    			+ "hostelType = ?, "
		                    			+ "oneShareApplicable = ?, "
		                    			+ "oneShareCost = ?, "
		                    			+ "oneShareRoomsAvailable = ?, "
		                    			+ "twoShareApplicable = ?, "
		                    			+ "twoShareCost = ?, "
		                    			+ "twoShareRoomsAvailable = ?, "
		                    			+ "threeShareApplicable = ?, "
		                    			+ "threeShareCost = ?, "
		                    			+ "threeShareRoomsAvailable = ?, "
		                    			+ "fourShareApplicable = ?, "
		                    			+ "fourShareCost = ?, "
		                    			+ "fourShareRoomsAvailable = ?, "
		                    			+ "fiveShareApplicable = ?, "
		                    			+ "fiveShareCost = ?, "
		                    			+ "fiveShareRoomsAvailable = ?, "
		                    			+ "wifi = ?, "
		                    			+ "laundry = ?, "
		                    			+ "hotWater = ?, "
		                    			/*+ "imageOne = ?, "
		                    			+ "imageTwo = ?, "
		                    			+ "imageThree = ?, "*/
		                    			+ "stateName = ?, "
		                    			+ "cityName = ?, "
		                    			+ "areaName = ?, "
		                    			+ "landMark = ? "
		                    			+ "WHERE uniqueSerialNumber = ?";
		                        pStmt = con.prepareStatement(query);
		                        
		                        pStmt.setString(1,req.getParameter("hostelName"));
		                        pStmt.setString(2,req.getParameter("hostelType"));
		                        pStmt.setBoolean(3, Boolean.valueOf(req.getParameter("oneShareApplicable")));
		                        pStmt.setString(4,req.getParameter("oneShareCost"));
		                        pStmt.setString(5, req.getParameter("oneShareRoomsAvailable"));
		                        pStmt.setBoolean(6,Boolean.valueOf(req.getParameter("twoShareApplicable")));
		                        pStmt.setString(7,req.getParameter("twoShareCost"));
		                        pStmt.setString(8, req.getParameter("twoShareRoomsAvailable"));
		                        pStmt.setBoolean(9,Boolean.valueOf(req.getParameter("threeShareApplicable")));
		                        pStmt.setString(10,req.getParameter("threeShareCost"));
		                        pStmt.setString(11, req.getParameter("threeShareRoomsAvailable"));
		                        pStmt.setBoolean(12,Boolean.valueOf(req.getParameter("fourShareApplicable")));
		                        pStmt.setString(13,req.getParameter("fourShareCost"));
		                        pStmt.setString(14, req.getParameter("fourShareRoomsAvailable"));
		                        pStmt.setBoolean(15,Boolean.valueOf(req.getParameter("fiveShareApplicable")));
		                        pStmt.setString(16,req.getParameter("fiveShareCost"));
		                        pStmt.setString(17, req.getParameter("fiveShareRoomsAvailable"));
		                        pStmt.setString(18,req.getParameter("wifi"));
		                        pStmt.setString(19,req.getParameter("laundry"));
		                        pStmt.setString(20,req.getParameter("hotWater"));
		                        /*pStmt.setBlob(21,req.getPart("imageOne").getInputStream());
		                        pStmt.setBlob(22,req.getPart("imageTwo").getInputStream());
		                        pStmt.setBlob(23,req.getPart("imageThree").getInputStream());*/
		                        pStmt.setString(21, req.getParameter("stateName"));
		                        pStmt.setString(22, req.getParameter("cityName"));
		                        pStmt.setString(23, req.getParameter("areaName"));
		                        pStmt.setString(24, req.getParameter("landMark"));
		                        pStmt.setString(25, req.getParameter("id"));
		                        
		                        pStmt.executeUpdate();

		                        res.setStatus(HttpServletResponse.SC_OK);
		                    }else if(state.equals("deletePost")) {
		                    	String query="delete from hostelsDetails where uniqueSerialNumber=?";
		                    	pStmt = con.prepareStatement(query);
		                    	pStmt.setString(1, req.getParameter("id"));
		                    	pStmt.executeUpdate();

		                        res.setStatus(HttpServletResponse.SC_OK);
		                    }
							
		                } else {
		                	res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		                }
					}else {
						//session time out status Unauthorized: Invalid Token 401
						res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);	
					}
				}else {
					//Bad Request: Missing or Invalid Authorization Header 400
					res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				}
			}
		}catch(Exception err) {
			err.printStackTrace();
			System.out.println(err);
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}finally {
			try {
				if(resultSet!=null) resultSet.close();
				if(pStmt!=null) pStmt.close();
				if(con!=null) con.close();
			}catch(Exception err) {
				res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			}
		}
	}
}