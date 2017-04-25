<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>캠거루 로그인</title>
	<link rel="stylesheet" type="text/css" href="../css/common.css">
	<link rel="stylesheet" type="text/css" href="../css/Login.css">
</head>
<body>

	<form id="container" method="post" data-redirect="">
		<div class="introduction">
			<div class="wrap">
				<h1>로그인</h1>
				<p><strong>캠거루</strong> 로그인을 통해<br><strong>다양한 정보</strong>와 <strong>커뮤니티</strong>를 함께 즐겨보세요!</p>
			</div>
		</div>
		<div class="form">
			<div class="wrap">
				<input type="text" name="userid" maxlength="20" class="text" placeholder="캠거루 아이디">
				<input type="password" name="password" maxlength="20" class="text" placeholder="비밀번호">
				<input type="submit" value="로그인" class="submit">
			<hr>
				<a href="/" class="find">아이디/비밀번호 찾기</a>
			<hr>
				<a href="Join.jsp" class="register">
				<span>캠거루 계정이 없으신가요?</span>
				<strong>회원가입</strong>
				</a>
			</div>
		</div>
		<input type="hidden" name="redirect">
	</form>

	<footer>
		<jsp:include page="../Common/Footer.jsp"></jsp:include>
	</footer>
	
</body>
</html>
