package kr.kamgaru.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import kr.kamgaru.DTO.MemberDTO;

public class MemberDAO {
	static DataSource ds;
	Connection conn;
	PreparedStatement pstmt;
	ResultSet rs;

	static {
		InitialContext ctx;
		try {
			ctx = new InitialContext();
			Context envCtx = (Context) ctx.lookup("java:comp/env");
			ds = (DataSource) envCtx.lookup("/jdbc/oracle");
		} catch (NamingException e) {
			System.out.println("lookup Fail : " + e.getMessage());
		}
	}
	//1. 회원가입
	public void joinmember(MemberDTO dto) throws Exception{
		try {
			conn = ds.getConnection();
			String sql = "insert into memberinfo(memcode,nickname,pwd,name,email,university) values(membercode.nextval,?,?,?,?,?)";
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, dto.getNickname());
			pstmt.setString(2, dto.getPwd());
			pstmt.setString(3, dto.getName());
			pstmt.setString(4, dto.getEmail());
			pstmt.setString(5, dto.getUniversity());
			pstmt.executeUpdate();
			
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally {
			if (pstmt != null)
				pstmt.close();
			if (conn != null)
				conn.close();
		}
		return;
	}
	
	//2.이메일 중복검사
	public int emailduplicationcheck(String email) throws Exception{
		int rowcount = 0;
		try {
			conn = ds.getConnection();
			String sql = "select memcode from memberinfo where email=?";
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, email);
			rowcount=pstmt.executeUpdate();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally{
			if (pstmt != null)
				pstmt.close();
			if (conn != null)
				conn.close();
		}
		return rowcount;
	}
	
	//3.닉네임 중복검사
	public int nicknameduplicationcheck(String nickname) throws Exception{
		int rowcount = 0;
		try {
			conn = ds.getConnection();
			String sql = "select memcode from memberinfo where nickname=?";
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, nickname);
			rowcount=pstmt.executeUpdate();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally{
			if (pstmt != null)
				pstmt.close();
			if (conn != null)
				conn.close();
		}
		return rowcount;
	}
	
	
	
	
}