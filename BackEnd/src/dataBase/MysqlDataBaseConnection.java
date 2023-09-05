package dataBase;

import com.mysql.cj.jdbc.Driver;
import java.sql.DriverManager;
import java.sql.Connection;

public class MysqlDataBaseConnection{
	
	public static Connection getMysqlConnection() throws Exception{
	
			/*String url="jdbc:mysql://localhost:3306/bestpgsi_pg";
			String userName="bestpgsi_admin";
			String password="RootSystem@14312345";*/
			
			String url="jdbc:mysql://localhost:3306/pg";
			String userName="root";
			String password="123456789";
			
			Driver d=new Driver();
			DriverManager.registerDriver(d);
			
			return DriverManager.getConnection(url,userName,password);
	}
} 