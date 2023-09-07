package servlets;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import dataBase.MysqlDataBaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/filterWord")
public class FilterWord extends HttpServlet {
	private static final long serialVersionUID = 2L;
	
	protected void doPost(HttpServletRequest req, HttpServletResponse res) {
		Connection con = null;
        PreparedStatement pStm = null;
        ResultSet DataResultSet = null;
		try {
			String word = req.getParameter("word");
			String type = req.getParameter("type");
			String stateName = req.getParameter("stateName");
			String cityName = req.getParameter("cityName");
					
			String query="SELECT DISTINCT stateName FROM hostelsDetails WHERE stateName LIKE ?";
			if(type.equals("cityName")) {
				query="SELECT DISTINCT cityName FROM hostelsDetails WHERE cityName LIKE ? and stateName=?";
			}else if(type.equals("areaName")) {
				query="SELECT DISTINCT areaName FROM hostelsDetails WHERE areaName LIKE ? and stateName=? and cityName= ?";
			}
			
			con=MysqlDataBaseConnection.getMysqlConnection();
			pStm=con.prepareStatement(query);
			pStm.setString(1, word + "%");
			if(type.equals("cityName")) {pStm.setString(2, stateName);}
			if(type.equals("areaName")) {
				pStm.setString(2, stateName);
				pStm.setString(3, cityName);
			}
			DataResultSet = pStm.executeQuery();
			
				JSONObject namesFromDataBase = new JSONObject();
				int i=0;
	            while (DataResultSet.next()) {
	            	namesFromDataBase.put("state"+(++i),DataResultSet.getString(type));
	            }
	            JSONObject responseObj = new JSONObject();
	            responseObj.put("namesFromBackEnd", namesFromDataBase);
	  

				res.setContentType("application/json");
				res.getWriter().println(responseObj.toString());
				
				if(i!=0)res.setStatus(HttpServletResponse.SC_OK);
				else res.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}catch(Exception err) {
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}finally {
			try {
				DataResultSet.close();
				pStm.close();
				con.close();
			}catch(Exception err) {
				err.printStackTrace();
			}
		}
	}
}