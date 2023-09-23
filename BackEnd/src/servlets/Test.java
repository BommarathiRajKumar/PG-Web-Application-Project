package servlets;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dataBase.MysqlDataBaseConnection;

public class Test {
	public static void main(String args[]) throws Exception {
		Connection con=MysqlDataBaseConnection.getMysqlConnection();
		String offSet="5";
		
			String query="SELECT * FROM hostelsDetails where stateName='tr' LIMIT 5 OFFSET "+offSet;
		
			PreparedStatement pStmt=con.prepareStatement(query);
			ResultSet resultSet=pStmt.executeQuery();
			
			while(resultSet.next()) {
				System.out.println(resultSet.getInt("hostelId"));
			}
			
		
		
	}

}
