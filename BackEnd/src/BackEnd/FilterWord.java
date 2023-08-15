package BackEnd;

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

@WebServlet("/filterWord")
public class FilterWord extends HttpServlet {
	private static final long serialVersionUID = 2L;
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) {
		try {
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	        res.setHeader("Access-Control-Allow-Credentials", "true");
			
			String url="jdbc:mysql://localhost:3306/pg";
			String userName="root";
			String password="123456789";
			
			String word = req.getParameter("word");
			String type = req.getParameter("type");
			String stateName = req.getParameter("stateName");
			String cityName = req.getParameter("cityName");
			
			
			
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			Connection con=DriverManager.getConnection(url,userName,password);
			
			String query = "SELECT DISTINCT " + type + " FROM hostelsDetails WHERE " + type + " LIKE ?";
			
			if(type.equals("cityName")) {
				query = "SELECT DISTINCT " + type + " FROM hostelsDetails WHERE " + type + " LIKE ? and stateName='" + stateName + "'";

			}else if(type.equals("areaName")) {
				query = "SELECT DISTINCT " + type + " FROM hostelsDetails WHERE " + type + " LIKE ? and stateName='" + stateName + "' and cityName='" + cityName + "'";
				

			}
			
			PreparedStatement pStm = con.prepareStatement(query);
			pStm.setString(1, word + "%");
	


			ResultSet DataResultSet = pStm.executeQuery();
			
				JSONObject dataBaseData = new JSONObject();
				int i=0;
	            while (DataResultSet.next()) {
	            	dataBaseData.put("state"+(++i),DataResultSet.getString(type));
	            }
	            JSONObject responseObj = new JSONObject();
	            responseObj.put("dataFromBackEnd", dataBaseData);
	  

				res.setContentType("application/json");
				res.getWriter().println(responseObj.toString());
				res.setStatus(HttpServletResponse.SC_OK);
			    
				res.setStatus(HttpServletResponse.SC_OK);
			
		}catch(Exception err) {
			System.out.println(err);
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}
}