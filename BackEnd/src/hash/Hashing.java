package hash;

import java.security.MessageDigest;
import java.security.SecureRandom;


public class Hashing{
		public static byte[] generateSalt() throws Exception {
		 	 SecureRandom random = new SecureRandom();
			 byte[] salt = new byte[16];
			 random.nextBytes(salt);
			 return salt;
		}
		
		public static byte[] combineSaltAndPassword(String password, byte[] salt) throws Exception {
			 byte[] passwordBytes = password.getBytes();
			 byte[] saltedPassword = new byte[passwordBytes.length + salt.length];
			 System.arraycopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.length);
			 System.arraycopy(salt, 0, saltedPassword, passwordBytes.length, salt.length);
			 return saltedPassword;
		}
		
		public static byte[] hashPassword(byte[] saltedPassword) throws Exception {
			     MessageDigest md = MessageDigest.getInstance("SHA-256");
			     return md.digest(saltedPassword);
			 
		}
		
		
		public static String bytesToHex(byte[] bytes) throws Exception {
			 StringBuilder hexString = new StringBuilder();
			 for (byte b : bytes) {
			     hexString.append(String.format("%02x", b));
			 }
			 return hexString.toString();
		}
}
