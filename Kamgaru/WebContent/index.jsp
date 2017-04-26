<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>캠거루</title>
	
	<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="js/underscore.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/list.index.js"></script>


	
	<link rel="stylesheet" type="text/css" href="css/common.css">
	<link rel="stylesheet" type="text/css" href="css/Index.css">
</head>
<body>
	<jsp:include page="./Common/Header1.jsp"></jsp:include>
	
	<div id="container">
	
		<section class="download">
			<h1 class="text3">캠거루 - 캠퍼스 궁금한거 여기루</h1>
			<div class="buttons">
				<a href="/download?store=playstore&lid=web_index" class="playstore">캠거루 다운로드 - Google Play</a>
				<a href="/download?store=appstore&lid=web_index" class="appstore">캠거루 다운로드 - AppStore</a>
			</div>
		</section>

		<section class="center">
			<div class="recent" data-id="2572">
				<div class="title">
					<h2><a href="/community?id=2572">동아리</a></h2>
					<p class="description">이 커뮤니티를 PICK하고 모집 공고를 확인하여 관심있는 동아리에 지원해보세요!</p>
				</div>
				
				<ol class="items">
					<div class="loading"><img src="/images/loading.svg"></div>
				</ol>
				
				<div class="buttons">
					<a href="/community?id=2572" class="button blue">모집 공고 더 보기</a>
					<a href="/community?id=2572&url=%2Fpage%2Fclub%2Flist" class="button gray">동아리 랭킹 보기</a>
				</div>
			</div>

			<div class="recent" data-id="2571">
				<div class="title">
					<h2><a href="/community?id=2571">대외활동</a></h2>
					<p class="description">이 커뮤니티를 PICK하고 인기있는 대외활동 소식을 확인해보세요!</p>
				</div>
				
				<ol class="items">
					<div class="loading"><img src="/images/loading.svg"></div>
				</ol>
				
				<div class="buttons">
					<a href="/community?id=2571" class="button blue">대외활동 더 보기</a>
					<a href="/community?id=2571&url=%2Fpage%2Factivity%2Fboard%3Ftarget%3D2%26board%3D1" class="button gray">팀원 모집 게시판</a>
					<a href="/community?id=2571&url=%2Fpage%2Factivity%2Fboard%3Ftarget%3D2%26board%3D2" class="button gray">Q&A 게시판</a>
				</div>
			</div>
      
			<div class="recent" data-id="2570">
				<div class="title">
					<h2><a href="/community?id=2570">공모전</a></h2>
					<p class="description">이 커뮤니티를 PICK하고 인기있는 공모전 소식을 확인해보세요!</p>
				</div>
				
				<ol class="items">
					<div class="loading"><img src="/images/loading.svg"></div>
				</ol>
			
				<div class="buttons">
					<a href="/community?id=2570" class="button blue">공모전 더 보기</a>
					<a href="/community?id=2570&url=%2Fpage%2Factivity%2Fboard%3Ftarget%3D1%26board%3D1" class="button gray">팀원 모집 게시판</a>
					<a href="/community?id=2570&url=%2Fpage%2Factivity%2Fboard%3Ftarget%3D1%26board%3D2" class="button gray">Q&A 게시판</a>
				</div>
			</div>
		
			<div class="recent" data-id="2605">
			
				<div class="title">
					<h2><a href="/community?id=2605">문화 정보</a></h2>
					<p class="description">이 커뮤니티를 PICK하고 영화, 공연, 전시 등 문화 정보 및 할인 혜택을 만나보세요!</p>
				</div>
				
				<ol class="items">
          			<div class="loading"><img src="/images/loading.svg"></div>
				</ol>
			
				<div class="buttons">
					<a href="/community?id=2605" class="button blue">문화 정보 더 보기</a>
				</div>
				
			</div>
		</section>
    
	<!-- 로그인/회원가입 Form -->
		<section class="leftside">

			<div class="login">
				<p class="introduction">관심있는 커뮤니티를 PICK하고<br>다른 대학생들과 대화를 나누어 보세요!</p>
				<a href="Login/Login.jsp" class="button login">로그인</a>
				<a href="Login/Join.jsp" class="button register">회원가입</a>
				<hr>
			</div>

		</section>
	</div>

	<footer> 
	<jsp:include page="./Common/Footer.jsp"></jsp:include>
	</footer>

</body>
</html>