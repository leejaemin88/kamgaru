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

    cp.pageindex.loadClubRecruits(function (result) {
      if (!result) {
        return;
      }
      cp.pageindex.appendClubRecruits(result.recruits);
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

  
  //동아리
  loadClubRecruits: function (callback) {
    $.ajax({
      url: 'GroupIndex',
      type: 'POST',
      dataType: 'json',
      data: {
        limit: 6
      },
      success: function (response) {
          callback(response);
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
  

  

  
  

};




$(document).ready(function () {
	  cp.el['#container'] = $('#container');
	  cp.el['leftside'] = cp.el['#container'].find('section.leftside');
	  cp.el['center'] = cp.el['#container'].find('section.center');
	  cp.el['recent'] = cp.el['center'].find('div.recent');
	  cp.el['cards'] = cp.el['center'].find('div.cards');
	  cp.pageindex.init();
	});

