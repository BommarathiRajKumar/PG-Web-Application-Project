package jjwt;

import java.util.Date;
import java.util.Base64;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWT{
	static String key="RajKumarBommarathi";
	static String issuer="RajKumar";
	
	public static String generateToken(String id, String subject) throws Exception {
		
			return Jwts.builder()
					.setId(id)
					.setSubject(subject)
					.setIssuer(issuer)
					.setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis()+(10L * 24L * 60L * 60L * 1000L)))
					.signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encode(key.getBytes()))
					.compact();  
	}
	
	public static Claims getClaims(String token) throws Exception {
		return Jwts.parser()
				.setSigningKey(Base64.getEncoder().encode(key.getBytes()))
				.parseClaimsJws(token)
				.getBody();
	}
	
	public static boolean isValid(String token) throws Exception {
		return getClaims(token)
				.getExpiration()
				.after(new Date(System.currentTimeMillis()));
		
	}
	
	public static String getId(String token) throws Exception {
		return getClaims(token)
				.getId();
	}
	
	public static String getSubject(String token) throws Exception {
		return getClaims(token)
				.getSubject();
	}
	
}

