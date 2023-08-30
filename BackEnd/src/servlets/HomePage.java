package servlets;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;


import dataBase.MysqlDataBaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


@WebServlet("/home")
@MultipartConfig
public class HomePage extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) {
		
		try{
			Connection con= MysqlDataBaseConnection.getMysqlConnection();
			PreparedStatement pStm = con.prepareStatement("select * from hostelsDetails limit 50");
			ResultSet hostelsDetailsResultSet=null;
			
			String state = req.getParameter("state");
			int price=0;
				 
			if(state.equals("userSearch")) {
				String hostelType = req.getParameter("hostelType");
				price=Integer.valueOf(req.getParameter("price"));
				String share = req.getParameter("share");
				String stateName = req.getParameter("stateName");
				String cityName = req.getParameter("cityName");
				String areaName = req.getParameter("areaName");
				
				pStm = con.prepareStatement("select * from hostelsDetails where hostelType = ? and "+share+"Cost <= ? and stateName = ? and cityName = ? and areaName = ?");
				pStm.setString(1, hostelType);
			    pStm.setInt(2, price);
			    pStm.setString(3, stateName);
			    pStm.setString(4, cityName);
			    pStm.setString(5, areaName);
			}
			
				JSONObject hostelsDetails = new JSONObject();
				int i=0;
				int count=0;
				do {
					hostelsDetailsResultSet = pStm.executeQuery();
		            while (hostelsDetailsResultSet.next()) {
		            	JSONObject singleHostelDetails = new JSONObject();
		            	
		            	singleHostelDetails.put("mobileNumber", hostelsDetailsResultSet.getString("mobileNumber"));
		            	singleHostelDetails.put("ownerName", hostelsDetailsResultSet.getString("ownerName"));
                    	singleHostelDetails.put("hostelName", hostelsDetailsResultSet.getString("hostelName"));
                    	singleHostelDetails.put("hostelType", hostelsDetailsResultSet.getString("hostelType"));
                    	singleHostelDetails.put("oneShareApplicable", hostelsDetailsResultSet.getString("oneShareApplicable"));
                    	singleHostelDetails.put("oneShareCost", hostelsDetailsResultSet.getString("oneShareCost"));
                    	singleHostelDetails.put("oneShareRoomsAvailable", hostelsDetailsResultSet.getString("oneShareRoomsAvailable"));
                    	singleHostelDetails.put("twoShareApplicable", hostelsDetailsResultSet.getString("twoShareApplicable"));
                    	singleHostelDetails.put("twoShareCost", hostelsDetailsResultSet.getString("twoShareCost"));
                    	singleHostelDetails.put("twoShareRoomsAvailable", hostelsDetailsResultSet.getString("twoShareRoomsAvailable"));
                    	singleHostelDetails.put("threeShareApplicable", hostelsDetailsResultSet.getString("threeShareApplicable"));
                    	singleHostelDetails.put("threeShareCost", hostelsDetailsResultSet.getString("threeShareCost"));
                    	singleHostelDetails.put("threeShareRoomsAvailable", hostelsDetailsResultSet.getString("threeShareRoomsAvailable"));
                    	singleHostelDetails.put("fourShareApplicable", hostelsDetailsResultSet.getString("fourShareApplicable"));
                    	singleHostelDetails.put("fourShareCost", hostelsDetailsResultSet.getString("fourShareCost"));
                    	singleHostelDetails.put("fourShareRoomsAvailable", hostelsDetailsResultSet.getString("fourShareRoomsAvailable"));
                    	singleHostelDetails.put("fiveShareApplicable", hostelsDetailsResultSet.getString("fiveShareApplicable"));
                    	singleHostelDetails.put("fiveShareCost", hostelsDetailsResultSet.getString("fiveShareCost"));
                    	singleHostelDetails.put("fiveShareRoomsAvailable", hostelsDetailsResultSet.getString("fiveShareRoomsAvailable"));
                    	singleHostelDetails.put("wifi", hostelsDetailsResultSet.getString("wifi"));
                    	singleHostelDetails.put("laundry", hostelsDetailsResultSet.getString("laundry"));
                    	singleHostelDetails.put("hotWater", hostelsDetailsResultSet.getString("hotWater"));
		            	
		            	
		            	
		            	
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
		            if(state.equals("userSearch")) {
			            pStm.setInt(2, price+=500);
			            count++;
		            }
				}while(i==0 && count<=3 && state.equals("userSearch"));
			
				
				if(i!=0) {
					res.setContentType("application/json");
				    res.getWriter().println(hostelsDetails.toString());
				    res.setStatus(HttpServletResponse.SC_OK);
				}else {
					res.setStatus(HttpServletResponse.SC_NO_CONTENT); 
				}
				
				hostelsDetailsResultSet.close();
				pStm.close();
				con.close();
				
		}catch(Exception err) {
			err.printStackTrace();
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}
}