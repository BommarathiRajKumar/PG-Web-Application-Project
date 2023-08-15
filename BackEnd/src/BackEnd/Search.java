package BackEnd;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.mysql.cj.jdbc.Driver;
import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/search")
@MultipartConfig
public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) {
		try {
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	        res.setHeader("Access-Control-Allow-Credentials", "true");
			
			String url="jdbc:mysql://localhost:3306/pg";
			String userName="root";
			String password="123456789";
			
			String state = req.getParameter("state");
			String hostelType = req.getParameter("hostelType");
			String share = req.getParameter("share");
			String price = req.getParameter("price");
			String stateName = req.getParameter("stateName");
			String cityName = req.getParameter("cityName");
			String areaName = req.getParameter("areaName");
			
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con=DriverManager.getConnection(url,userName,password);
			
			String query = "select * from hostelsDetails limit 50";
			PreparedStatement pStm = con.prepareStatement(query);
			
			if(state.equals("two")) {
				query = "select * from hostelsDetails where hostelType = ? and "+share+"Cost <= ? and stateName = ? and cityName = ? and areaName = ?";
				pStm = con.prepareStatement(query);
				pStm.setString(1, hostelType);
			    pStm.setInt(2, Integer.valueOf(price));
			    pStm.setString(3, stateName);
			    pStm.setString(4, cityName);
			    pStm.setString(5, areaName);
			}
				JSONObject hostelsDetails = new JSONObject();
				int i=0;
				boolean flag=false;
				int count=0;
				while(i==0 && count<=5) {
					if(flag) {
						int update = Integer.valueOf(price);
						update+=500;
						pStm.setInt(2, update);
					}
					if(count>=5) {
						query = "select * from hostelsDetails where hostelType = ? and stateName = ? and cityName = ? and areaName = ?";
						pStm = con.prepareStatement(query);
						pStm.setString(1, hostelType);
					    pStm.setString(2, stateName);
					    pStm.setString(3, cityName);
					    pStm.setString(4, areaName);
					}
					flag=true;
					count++;
					ResultSet hostelsDetailsResultSet = pStm.executeQuery();
			
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
				}
				
		  
			    res.setContentType("application/json");
			    res.getWriter().println(hostelsDetails.toString());
			    
				res.setStatus(HttpServletResponse.SC_OK);
			
		}catch(Exception err) {
			System.out.println(err);
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}
}