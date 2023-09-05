package hash;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;


public class Hashing{
		public static byte[] generateSalt() {
		 	 SecureRandom random = new SecureRandom();
			 byte[] salt = new byte[16];
			 random.nextBytes(salt);
			 return salt;
		}
		
		public static byte[] combineSaltAndPassword(String password, byte[] salt) {
			 byte[] passwordBytes = password.getBytes();
			 byte[] saltedPassword = new byte[passwordBytes.length + salt.length];
			 System.arraycopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.length);
			 System.arraycopy(salt, 0, saltedPassword, passwordBytes.length, salt.length);
			 return saltedPassword;
		}
		
		public static byte[] hashPassword(byte[] saltedPassword) {
			 try {
			     MessageDigest md = MessageDigest.getInstance("SHA-256");
			     return md.digest(saltedPassword);
			 } catch (NoSuchAlgorithmException e) {
			     e.printStackTrace();
			     return null;
			 }
		}
		
		
		public static String bytesToHex(byte[] bytes) {
			 StringBuilder hexString = new StringBuilder();
			 for (byte b : bytes) {
			     hexString.append(String.format("%02x", b));
			 }
			 return hexString.toString();
		}
}
