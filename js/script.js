$(document).ready(function() {

  // slick_slider
  if (typeof $.fn.slick !== 'undefined' && $('.slick_slider').length) {
    $('.slick_slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: false,
    });
  }



  // header 스크롤 숨김/표시
  if ($('body').attr('data-header-scroll') === 'true') {
    let lastScrollTop = 0;
    const header = $('header');
    const main = $('main');
    const scrollThreshold = 10; // 최소 스크롤 거리

    main.on('scroll', function() {
      const scrollTop = $(this).scrollTop();
      // 스크롤이 최상단에 있으면 항상 표시
      if (scrollTop <= 0) {
        header.removeClass('hide');
        lastScrollTop = scrollTop;
        return;
      }
      
      // 스크롤 방향 감지
      if (Math.abs(scrollTop - lastScrollTop) < scrollThreshold) {
        return; // 최소 스크롤 거리 미만이면 무시
      }
      
      if (scrollTop > lastScrollTop) {
        header.addClass('hide');
      } else {
        header.removeClass('hide');
      }

      lastScrollTop = scrollTop;
    });
  }



  // board 탭 기능
  const board = $('.board');
  if (board.length) {
    // 탭 버튼 클릭 이벤트
    board.find('.tab_dep01 button').on('click', function() {
      const $button = $(this);
      const $li = $button.closest('li');
      const $ul = $li.closest('ul');
      
      // 같은 레벨의 다른 탭 active 제거
      $ul.find('li').removeClass('active');
      // 클릭한 탭 active 추가
      $li.addClass('active');
      
      // 현재 선택된 탭의 data-tab-value 값 가져오기
      const dep01Value = board.find('.tab_dep01 li.active').data('tab-value');
      
      // 모든 tabConWrap 숨기기
      board.find('.tabConWrap').removeClass('active');
      // 해당하는 tabConWrap만 표시
      board.find('.tabConWrap[data-tab="' + dep01Value + '"]').addClass('active');
    });
  }



  //메뉴
  const menuList = $('#menuList');
  if (menuList.length) {
    menuList.find('.depth_01 > .fullDown_item, .depth_02 > li').each(function() {
      const $li = $(this);
      if ($li.children('.depth_02_wrap, .depth_03').length > 0) {
        $li.find('> a').addClass('dep');
      }
    });

    //depth_01의 a 클릭 이벤트
    menuList.find('.depth_01 > .fullDown_item > a').on('click', function(e) {
      e.preventDefault();
      const $li = $(this).closest('.fullDown_item');
      
      menuList.find('.depth_01 > .fullDown_item').removeClass('active');
      $li.addClass('active');
    });

    //depth_02의 a 클릭 이벤트
    menuList.find('.depth_02 > li > a.fullDown_link').on('click', function(e) {
      e.preventDefault();
      const $depth01Li = $(this).closest('.fullDown_item');
      
      menuList.find('.depth_01 > .fullDown_item').removeClass('active');
      $depth01Li.addClass('active');
    });
  }



  // 아코디언
  const accordion = $('dl.accordion');
  if (accordion.length) {
    accordion.on('click', function(e) {
      // 컨텐츠(dd) 영역 클릭은 토글 제외 (내용 클릭 시 접힘 방지)
      if ($(e.target).closest('dd').length) {
        return;
      }

      const $accordion = $(this);
      const $dd = $accordion.find('dd');
      
      if ($accordion.hasClass('active')) {
        
        // 닫기
        $dd.css('max-height', '0');
        $accordion.removeClass('active');
      } else {

        // 열기 - 실제 높이 계산
        $dd.css('max-height', 'none');
        const height = $dd.outerHeight();
        $dd.css('max-height', '0');
        $accordion.addClass('active');
        setTimeout(function() {
          $dd.css('max-height', height + 'px');
        }, 10);
      }
    });
  }



  // 교직원메뉴 - 메세지 전송 모달
  const $messageModal = $('.messageModal');
  if ($messageModal.length) {
    const openButtonSelector = '#messageModalOpen';

    const closeMessageModal = function() {
      $messageModal.removeClass('show');
    };

    $(document).on('click', openButtonSelector, function() {
      $messageModal.addClass('show');
    });

    $(document).on('click', '.messageModal .cancel, .messageModal .modalClose', function() {
      closeMessageModal();
    });
  }



  // 교직원메뉴 - 교직원 연락처 모달
  const $contactModal = $('.contactModal');
  if ($contactModal.length) {
    const openContactSelector = '.contactWrap > .contactList a.contactInfo';

    const closeContactModal = function() {
      $contactModal.removeClass('show');
    };

    // 열기: 리스트의 각 a 클릭
    $(document).on('click', openContactSelector, function(e) {
      e.preventDefault();
      $contactModal.addClass('show');
    });

    // 닫기: close 버튼
    $(document).on('click', '.contactModal .modalClose', function() {
      closeContactModal();
    });
  }
  


  // mealWrap 탭 기능
  const mealWrap = $('.mealWrap');
  if (mealWrap.length) {
    // 탭 버튼 클릭 이벤트
    mealWrap.find('.tab_st1 a, .tab_st2 a').on('click', function(e) {
      e.preventDefault();
      const $a = $(this);
      const $li = $a.closest('li');
      const $ul = $li.closest('ul');
      
      // 같은 레벨의 다른 탭 on 제거
      $ul.find('li').removeClass('on');
      // 클릭한 탭 on 추가
      $li.addClass('on');
      
      // 현재 선택된 탭의 data-tab-value 값 가져오기
      const tabSt1Value = mealWrap.find('.tab_st1 li.on').data('tab-value');
      const tabSt2Value = mealWrap.find('.tab_st2 li.on').data('tab-value');
      
      // 값이 없으면 종료
      if (!tabSt1Value || !tabSt2Value) {
        return;
      }
      
      // 탭 조합에 맞는 data-tab 값 생성
      const tabKey = tabSt1Value + '-' + tabSt2Value;
      
      // 모든 tabConWrap 숨기기
      mealWrap.find('.tabConWrap').removeClass('on');
      // 해당하는 tabConWrap만 표시
      const $targetTab = mealWrap.find('.tabConWrap[data-tab="' + tabKey + '"]');
      if ($targetTab.length) {
        $targetTab.addClass('on');
      }
    });
  }


  
  // tab_st2.scroll - 좌/우 스크롤 힌트(그라데이션)
  const tabSt2Scroll = $('.tab_st2.scroll');
  if (tabSt2Scroll.length) {
    const threshold = 2; // 오차/소수점 대비

    const updateScrollHint = function($wrap) {
      const $ul = $wrap.children('ul').first();
      const el = $ul.get(0);
      if (!el) {
        return;
      }

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= threshold) {
        $wrap.removeClass('has-left has-right');
        return;
      }

      const left = el.scrollLeft;
      $wrap.toggleClass('has-left', left > threshold);
      $wrap.toggleClass('has-right', left < maxScroll - threshold);
    };

    // 각 ul 스크롤에 반응
    tabSt2Scroll.each(function() {
      const $wrap = $(this);
      const $ul = $wrap.children('ul').first();
      if (!$ul.length) {
        return;
      }

      let ticking = false;
      const schedule = function() {
        if (ticking) {
          return;
        }
        ticking = true;
        window.requestAnimationFrame(function() {
          ticking = false;
          updateScrollHint($wrap);
        });
      };

      $ul.on('scroll', schedule);

      // 초기(로드/레이아웃 안정화 이후) 상태 반영
      updateScrollHint($wrap);
      setTimeout(function() {
        updateScrollHint($wrap);
      }, 0);
    });

    // 리사이즈 시 전체 갱신
    let resizeTicking = false;
    $(window).on('resize', function() {
      if (resizeTicking) {
        return;
      }
      resizeTicking = true;
      window.requestAnimationFrame(function() {
        resizeTicking = false;
        tabSt2Scroll.each(function() {
          updateScrollHint($(this));
        });
      });
    });
  }


  
  // meal_txt 내부의 <br> 태그 처리
  const mealTxt = $('.meal_txt');
  if (mealTxt.length) {
    mealTxt.each(function() {
      const $mealTxt = $(this);
      let html = $mealTxt.html();
      
      // <strong> 태그 바로 앞의 <br> 태그(들)를 공백으로 변경
      html = html.replace(/(<br\s*\/?>\s*)+(<strong[^>]*>)/gi, ' <strong>');
      // <strong> 태그 바로 뒤의 <br> 태그(들)를 공백으로 변경
      html = html.replace(/(<\/strong>)(\s*<br\s*\/?>\s*)+/gi, '</strong> ');
      
      // 나머지 <br> 태그를 쉼표로 변경
      html = html.replace(/<br\s*\/?>/gi, ', ');
      
      // 쉼표와 공백 정리 (연속된 쉼표 공백 제거, 앞뒤 공백 제거)
      html = html.replace(/,\s*,+/g, ',');
      html = html.replace(/^\s+|\s+$/g, '');
      html = html.replace(/,\s*$/g, '');
      
      $mealTxt.html(html);
    });
  }
});
