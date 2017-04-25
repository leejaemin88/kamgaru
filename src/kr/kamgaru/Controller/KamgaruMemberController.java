/*
 * @ 프로젝트명 : 캠거루
 * @ 패키지명 : kr.kamgaru.Controller;
 * @ 파일명 : KamgaruMemberController
 * @ 작성자 : 이재민(jaeminstar@naver.com)
 * @ 작성일 : 2017.4.25
 * @ 설명 : 회원관련 페이지 Controller
 */
package kr.kamgaru.Controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.kamgaru.Action.Action;
import kr.kamgaru.Action.ActionForward;

import kr.kamgaru.service.Member.MemberJoinAction;


@WebServlet("*.min")
public class KamgaruMemberController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public KamgaruMemberController() {
		super();
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doProcess(request, response);
	
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {	
		doProcess(request, response);
		
	}

	private void doProcess(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String requestURI = request.getRequestURI();
		String contextPath = request.getContextPath();
		String cmdURI = requestURI.substring(contextPath.length());

		ActionForward forward = new ActionForward();
		Action action = null;
		System.out.println("들어온주소 : " + cmdURI);
		
		//1. 회원가입
		if (cmdURI.equals("/Login/Joinok.min")) {
			action = new MemberJoinAction();
			System.out.println("회원가입요청");
			try {
				forward = action.execute(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		
		if (forward != null) {
			if (forward.isRedirect()) {
				response.sendRedirect(forward.getPath());
			} else {
				RequestDispatcher dis = request.getRequestDispatcher(forward.getPath());
				dis.forward(request, response);
			}
		}
	}
}
