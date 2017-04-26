package kr.kamgaru.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import kr.kamgaru.DTO.GroupIndexDTO;

public class IndexListDAO {
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
	
	//1. 동아리 Index list 출력
	public ArrayList<GroupIndexDTO> Groupindexlist() throws SQLException{
		ArrayList<GroupIndexDTO> groupindexdtolist = new ArrayList<>();
		try {	
			conn = ds.getConnection();
			String sql = "select * from (select ROWNUM rn, groupname,title,contents,enddate,image,hit from (select * from grouplist where flag=1 order by boardid desc)) where rn Between 1 and 5";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()){
				
				GroupIndexDTO groupindexdto = new GroupIndexDTO();
				groupindexdto.setGroupname(rs.getString("groupname"));
				groupindexdto.setTitle(rs.getString("title"));
				groupindexdto.setContents(rs.getString("title"));
				groupindexdto.setEnddate(rs.getString("enddate"));
				groupindexdto.setImage(rs.getString("image"));
				groupindexdto.setHit(rs.getString("hit"));
				groupindexdtolist.add(groupindexdto);
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally{
			if (pstmt != null)
				pstmt.close();
			if (conn != null)
				conn.close();
		}
		return groupindexdtolist;
	}
	
}












