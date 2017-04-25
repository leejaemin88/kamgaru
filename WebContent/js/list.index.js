/*
 * @ 프로젝트명 : 캠거루
 * @ 패키지명 : /WebContent/js/
 * @ 파일명 : duplicator.join.js
 * @ 작성자 : 이재민(jaeminstar@naver.com)
 * @ 작성일 : 2017.4.26
 * @ 설명 : 메인페이지 진입시 각 게시판에 최신글들 리스트로 보여줌
 */


cp.pageindex = {
  init: function () {
    cp.pageindex.loadCommunities(function (result) {
      if (!result) {
        return;
      }
      cp.pageindex.appendCommunities(result.communities);
    });
    cp.pageindex.loadClubRecruits(function (result) {
      if (!result) {
        return;
      }
      cp.pageindex.appendClubRecruits(result.recruits);
    });
    cp.pageindex.loadActivities(2, function (result) {
      if (!result) {
        return;
      }
      cp.pageindex.appendActivities(2, result.activities);
    });
    cp.pageindex.loadActivities(1, function (result) {
      if (!result) {
        return;
      }
      cp.pageindex.appendActivities(1, result.activities);
    });
    cp.pageindex.loadCultures(function (result) {
      if (!result) {
        return;
      }
      cp.pageindex.appendCultures(result.cultures);
    });
  },
  
  
  getDday: function (endDate) {
    var ddayCount = Math.floor((new Date().getTime() - new Date(endDate).getTime()) / 86400000) * -1;
    var ddayValue;
    if (ddayCount > 0) {
      ddayValue = 'D-' + ddayCount.toString();
    } else if (ddayCount === 0) {
      ddayValue = 'D-DAY';
    } else {
      ddayValue = '마감';
    }
    return {
      count: ddayCount,
      value: ddayValue
    };
  },
  
  //커뮤니티
  loadCommunities: function (callback) {
    $.ajax({
      url: 'community.json',
      type: 'POST',
      dataType: 'json',
      success: function (response) {
        if (response.status === 'success') {
          callback(response.result);
        }
      }
    });
  },
  appendCommunities: function (communities) {
	    var $myCommunities, $suggstedCommunities;
	    if (_isLogged) {
	      $('<h2></h2>').text('내 커뮤니티').appendTo(cp.el['leftside']);
	      $myCommunities = $('<ol></ol>').addClass('communities').appendTo(cp.el['leftside']);
	    }
	    $('<h2></h2>').text('커뮤니티 둘러보기').appendTo(cp.el['leftside']);
	    $suggstedCommunities = $('<ol></ol>').addClass('communities').appendTo(cp.el['leftside']);
	    _.each(communities, function (community) {
	      if ([2570, 2571, 2572, 2605].indexOf(community.id) !== -1) {
	        return;
	      }
	      var url = '/community?id=' + community.id;
	      var pickCount = cp.fn.formatNumber(community.pickCount);
	      var $li = $('<li></li>');
	      var $a = $('<a></a>').addClass('community').attr('href', url).appendTo($li);
	      var $figure = $('<figure></figure>').appendTo($a);
	      if (community.picture !== '') {
	        $('<img>').attr('src', community.picture).on('load', function () {
	          $figure.css('background-image', 'url("' + community.picture + '")');
	        });
	      }
	      $('<p></p>').addClass('name').html(community.name).appendTo($a);
	      if (community.hasNewArticle === true) {
	        $('<img>').addClass('new').attr('src', '/images/community.new.png').appendTo($a);
	      }
	      $('<hr>').appendTo($a);
	      var $details = $('<p></p>').addClass('details').appendTo($a);
	      $('<span></span>').addClass('pick').html(pickCount).appendTo($details);
	      if (community.isPicked !== true) {
	        $('<span></span>').addClass('category').html(community.categoryName).appendTo($details);
	        if (community.info !== '') {
	          $('<p></p>').addClass('description').html(community.info).appendTo($a);
	        }
	      }
	      if (community.isPicked === true) {
	        $li.appendTo($myCommunities);
	      } else {
	        if ($suggstedCommunities.find('li').length < 6) {
	          $li.appendTo($suggstedCommunities);
	        }
	      }
	    });
	    if ($myCommunities && $myCommunities.is(':empty')) {
	      $('<li></li>').addClass('empty').html('관심있는 커뮤니티를 PICK하고,<br>다른 대학생들과 대화를 나누어 보세요!').appendTo($myCommunities);
	    }
	    var $moreCommunityLi = $('<li></li>').addClass('buttons').appendTo($suggstedCommunities);
	    $('<a></a>').addClass('button').text('다른 커뮤니티 더 보기').attr('href', '/community').appendTo($moreCommunityLi);
	  },
  
  //동아리
  loadClubRecruits: function (callback) {
    $.ajax({
      url: '/find/pageclubrecruitlist',
      type: 'POST',
      dataType: 'json',
      data: {
        limit: 6
      },
      success: function (response) {
        if (response.status === 'success') {
          callback(response.result);
        }
      }
    });
  },
  appendClubRecruits: function (recruits) {
    var $recent = cp.el['recent'].filter(function () {
      return $(this).data('id') === 2572;
    });
    var $items = $recent.find('> ol.items');
    $recent.find('div.loading').remove();
    _.each(recruits, function (recruit) {
      var url = '/community?id=2572&url=%2Fpage%2Fclub%2Frecruitview%3Fid%3D' + recruit.id;
      var dday = cp.pageindex.getDday(recruit.endDate);
      var viewCount = cp.fn.formatNumber(recruit.viewCount);
      var $li = $('<li></li>');
      var $a = $('<a></a>').addClass('item').attr('href', url).appendTo($li);
      var $dday = $('<span></span>').addClass('dday').text(dday.value).appendTo($a);
      if (dday.count >= 0 && dday.count <= 10) {
        $dday.addClass('active');
      }
      var $profile = $('<p></p>').addClass('profile').appendTo($a);
      var $picture = $('<figure></figure>').addClass('picture').appendTo($profile);
      if (recruit.clubImage !== '') {
        $('<img>').attr('src', recruit.clubImage).on('load', function () {
          $picture.css('background-image', 'url("' + recruit.clubImage + '")');
        });
      }
      $('<span></span>').addClass('name').html(recruit.clubName).appendTo($profile);
      $('<hr>').appendTo($a);
      $('<span></span>').addClass('viewcount').html(viewCount).appendTo($a);
      $('<h3></h3>').html(recruit.title).appendTo($a);
      $li.appendTo($items);
    });
  },
  
  //대외활동
  loadActivities: function (target, callback) {
    $.ajax({
      url: 'activity.json',
      type: 'POST',
      dataType: 'json',
      data: {
        target: target,
        limit: 6
      },
      success: function (response) {
        if (response.status === 'success') {
          callback(response.result);
        }
      }
    });
  },
  appendActivities: function (target, activities) {
    var id = (target === 1) ? 2570 : 2571;
    var $recent = cp.el['recent'].filter(function () {
      return $(this).data('id') === id;
    });
    var $items = $recent.find('> ol.items');
    $recent.find('div.loading').remove();
    _.each(activities, function (activity) {
      var url = '/community?id=' + id + '&url=%2Fpage%2Factivity%2Fview%3Fid%3D' + activity.id;
      var dday = cp.pageindex.getDday(activity.endDate);
      var viewCount = cp.fn.formatNumber(activity.viewCount);
      var $li = $('<li></li>');
      var $a = $('<a></a>').addClass('item').attr('href', url).appendTo($li);
      var $dday = $('<span></span>').addClass('dday').text(dday.value).appendTo($a);
      if (dday.count >= 0 && dday.count <= 10) {
        $dday.addClass('active');
      }
      $('<h3></h3>').html(activity.title).appendTo($a);
      $('<hr>').appendTo($a);
      $('<span></span>').addClass('viewcount').html(viewCount).appendTo($a);
      $('<span></span>').addClass('detail').html(activity.company).appendTo($a);
      $li.appendTo($items);
    });
  },
  
  
  loadCultures: function (callback) {
    $.ajax({
      url: '/find/pageculturelist',
      type: 'POST',
      dataType: 'json',
      data: {
        limit: 6
      },
      success: function (response) {
        if (response.status === 'success') {
          callback(response.result);
        }
      }
    });
  },
  
  
  appendCultures: function (cultures) {
    var $recent = cp.el['recent'].filter(function () {
      return $(this).data('id') === 2605;
    });
    var $items = $recent.find('> ol.items');
    $recent.find('div.loading').remove();
    _.each(cultures, function (culture) {
      var url = '/community?id=2605&url=%2Fpage%2Fculture%2Fview%3Fid%3D' + culture.id;
      var categoryName = _.findWhere(cp.data.cultureCategoryNames, {id: culture.categoryId}).value;
      var viewCount = cp.fn.formatNumber(culture.viewCount);
      var detail;
      if (culture.benefit !== '') {
        detail = culture.benefit;
      } else if (culture.place !== '') {
        detail = '장소: ' + culture.place;
      } else if (culture.price > 0) {
        detail = '가격: ' + cp.fn.formatPrice(culture.price);
      } else {
        detail = '&nbsp;';
      }
      var $li = $('<li></li>');
      var $a = $('<a></a>').addClass('item').attr('href', url).appendTo($li);
      var $category = $('<span></span>').addClass('category').text(categoryName).appendTo($a);
      $('<h3></h3>').html(culture.title).appendTo($a);
      $('<hr>').appendTo($a);
      $('<span></span>').addClass('viewcount').html(viewCount).appendTo($a);
      $('<span></span>').addClass('detail').html(detail).appendTo($a);
      $li.appendTo($items);
    });
  }
};


$(document).ready(function () {
	  cp.el['#container'] = $('#container');
	  cp.el['leftside'] = cp.el['#container'].find('section.leftside');
	  cp.el['center'] = cp.el['#container'].find('section.center');
	  cp.el['recent'] = cp.el['center'].find('div.recent');
	  cp.el['cards'] = cp.el['center'].find('div.cards');
	  cp.pageindex.init();
	});

