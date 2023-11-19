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
			PreparedStatement pStm = con.prepareStatement("SELECT * FROM hostelsDetails ORDER BY hostelID DESC LIMIT 5 OFFSET ?");
		    pStm.setInt(1, Integer.valueOf(req.getParameter("offSet")));
			ResultSet hostelsDetailsResultSet=null;
			
			String state = req.getParameter("state");
			
			if(state.equals("userSearch")) {
				
				 
				String share=req.getParameter("share");
				pStm = con.prepareStatement("select * from hostelsDetails where hostelType = ? and  "+share+"Cost != 'Not-Applicable'  and "+share+"Cost <= ? and stateName = ? and cityName = ? and areaName = ? ORDER BY hostelID DESC  limit 5 offset ?");
				
				pStm.setString(1, req.getParameter("hostelType"));
			    pStm.setInt(2, Integer.valueOf(req.getParameter("price")));
			    pStm.setString(3, req.getParameter("stateName"));
			    pStm.setString(4, req.getParameter("cityName"));
			    pStm.setString(5, req.getParameter("areaName"));
			    pStm.setInt(6, Integer.valueOf(req.getParameter("offSet")));
			    
			}
			hostelsDetailsResultSet = pStm.executeQuery();



				JSONObject hostelsDetails = new JSONObject();
				int i=0;
		            while (hostelsDetailsResultSet.next()) { 
		            	JSONObject singleHostelDetails = new JSONObject();
		            	
		            	singleHostelDetails.put("mobileNumber", hostelsDetailsResultSet.getString("mobileNumber"));
		            	singleHostelDetails.put("ownerName", hostelsDetailsResultSet.getString("ownerName"));
                    	singleHostelDetails.put("hostelName", hostelsDetailsResultSet.getString("hostelName"));
                    	singleHostelDetails.put("hostelType", hostelsDetailsResultSet.getString("hostelType"));
                    	singleHostelDetails.put("oneShareApplicable", hostelsDetailsResultSet.getBoolean("oneShareApplicable"));
                    	singleHostelDetails.put("oneShareCost", hostelsDetailsResultSet.getString("oneShareCost"));
                    	singleHostelDetails.put("oneShareRoomsAvailable", hostelsDetailsResultSet.getString("oneShareRoomsAvailable"));
                    	singleHostelDetails.put("twoShareApplicable", hostelsDetailsResultSet.getBoolean("twoShareApplicable"));
                    	singleHostelDetails.put("twoShareCost", hostelsDetailsResultSet.getString("twoShareCost"));
                    	singleHostelDetails.put("twoShareRoomsAvailable", hostelsDetailsResultSet.getString("twoShareRoomsAvailable"));
                    	singleHostelDetails.put("threeShareApplicable", hostelsDetailsResultSet.getBoolean("threeShareApplicable"));
                    	singleHostelDetails.put("threeShareCost", hostelsDetailsResultSet.getString("threeShareCost"));
                    	singleHostelDetails.put("threeShareRoomsAvailable", hostelsDetailsResultSet.getString("threeShareRoomsAvailable"));
                    	singleHostelDetails.put("fourShareApplicable", hostelsDetailsResultSet.getBoolean("fourShareApplicable"));
                    	singleHostelDetails.put("fourShareCost", hostelsDetailsResultSet.getString("fourShareCost"));
                    	singleHostelDetails.put("fourShareRoomsAvailable", hostelsDetailsResultSet.getString("fourShareRoomsAvailable"));
                    	singleHostelDetails.put("fiveShareApplicable", hostelsDetailsResultSet.getBoolean("fiveShareApplicable"));
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
                    	i++;
                    	
		                hostelsDetails.put(hostelsDetailsResultSet.getInt("hostelID")+"",singleHostelDetails);        
		            }
				if(state.equals("userSearch")) {

					String share=req.getParameter("share");
					pStm = con.prepareStatement("select hostelID from hostelsDetails where hostelType = ? and  "+share+"Cost != 'Not-Applicable' and "+share+"Cost <= ? and stateName = ? and cityName = ? and areaName = ? ORDER BY hostelID DESC limit 1 offset ?" );
				
					pStm.setString(1, req.getParameter("hostelType"));
				    pStm.setInt(2, Integer.valueOf(req.getParameter("price")));
				    pStm.setString(3, req.getParameter("stateName"));
				    pStm.setString(4, req.getParameter("cityName"));
				    pStm.setString(5, req.getParameter("areaName"));
				    pStm.setInt(6, Integer.valueOf(req.getParameter("offSet"))+5);
				    

				}else {
					pStm = con.prepareStatement("SELECT hostelID FROM hostelsDetails ORDER BY hostelID DESC LIMIT 1 OFFSET ?");
					pStm.setInt(1, Integer.valueOf(req.getParameter("offSet"))+5);
				}
				
				hostelsDetailsResultSet= pStm.executeQuery();
                if(hostelsDetailsResultSet.next()) {
             	   hostelsDetails.put("count",1);
                }else {
             	   hostelsDetails.put("count",0);
                }
				
			
				if(i!=0) {
					res.setContentType("application/json");
				    res.getWriter().write(hostelsDetails.toString());
				    res.setStatus(HttpServletResponse.SC_OK);
				}else {
					res.setStatus(HttpServletResponse.SC_NO_CONTENT); 
				}
				
				hostelsDetailsResultSet.close();
				pStm.close();
				con.close();
				
		}catch(Exception err) {
			System.out.println(err);
			err.printStackTrace();
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}
}