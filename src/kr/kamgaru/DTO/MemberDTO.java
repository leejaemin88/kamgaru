package kr.kamgaru.DTO;

public class MemberDTO {
	private String university;
	private String email;
	private String pwd;
	private String name;
	private String nickname;
	
	public MemberDTO(){}
	
	public MemberDTO(String university, String email, String pwd, String name,
			String nickname) {
		super();
		this.university = university;
		this.email = email;
		this.pwd = pwd;
		this.name = name;
		this.nickname = nickname;
		
		
	}

	public String getUniversity() {
		return university;
	}
	public void setUniversity(String university) {
		this.university = university;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
}
