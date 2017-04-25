/*
 * @ 프로젝트명 : 캠거루
 * @ 패키지명 : kr.kamgaru.service.Member;
 * @ 파일명 : MemberJoinAction
 * @ 작성자 : 이재민(jaeminstar@naver.com)
 * @ 작성일 : 2017.4.25
 * @ 설명 : 회원가입 페이지에 데이터를 DB에 넣어주는 Service
 */

package kr.kamgaru.service.Member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.kamgaru.Action.Action;
import kr.kamgaru.Action.ActionForward;
import kr.kamgaru.DAO.MemberDAO;
import kr.kamgaru.DTO.MemberDTO;

public class MemberJoinAction implements Action{

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String email = request.getParameter("email");
		String pwd = request.getParameter("pwd");
		String name = request.getParameter("name");
		String nickname = request.getParameter("nickname");
		String university = request.getParameter("university");

		MemberDAO memberDAO = new MemberDAO();
		MemberDTO memberDTO = new MemberDTO(university,email, pwd, name, nickname);
		memberDAO.joinmember(memberDTO);
		
		ActionForward forward = new ActionForward();
		forward.setRedirect(false);
		forward.setPath("/Login/Login.jsp");
		
		return forward;
	}
}
