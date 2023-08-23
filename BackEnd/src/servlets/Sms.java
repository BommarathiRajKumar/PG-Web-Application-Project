package servlets;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

public class Sms {
	public static void main(String[] args) {
        
        try {
        	String apiKey = "apiKey=" + "Njg0ZTQ3Nzk0MjRiNTQ3ODQ0NDg3OTM5Mzk0MjY1NWE=";
        	String templateId = "&template_id=" + "1107160691313669232";
        	String message = "&message=" + URLEncoder.encode("working it", "UTF-8");
        	String numbers= "&numbers=" + "7893500261";
        			
        			
            String apiURl = "https://api.textlocal.in/send/?" + apiKey + templateId + message + numbers;
            
            URL url = new URL(apiURl);
            URLConnection connection = url.openConnection();
            connection.setDoOutput(true);
        	
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            
            String line = "";
            StringBuilder sb = new StringBuilder();
            
            while((line = reader.readLine()) != null) {
            	sb.append(line).append("\n");
            	
            }
            System.out.println(sb.toString());
 
        } catch (Exception e) {
           e.printStackTrace();
        }
    }

}
