package BackEnd;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

public class SendOtp {

	public static void main(String[] args) throws Exception{
		// TODO Auto-generated method stub
		String message = "Junk";		
		String phone = "7893500261";
		String username = "kumar";
		String password = "raj123";
		String address = "http://0.0.0.0";
		String port = "8000";
		
		URL url = new URL(
				address+":"+port+"/SendSMS?username="+username+"&password="+password+"&phone="+phone+"&message="+URLEncoder.encode(message,"UTF-8"));
		
		URLConnection connection = url.openConnection();
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		String inputLine;
		while((inputLine = bufferedReader.readLine()) !=null){
			System.out.println(inputLine);
		}
		bufferedReader.close();
		

	}

}