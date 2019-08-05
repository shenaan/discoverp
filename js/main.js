/* Init object fit polyfill */
/* To make it work, add 'font-family: 'object-fit: cover;';' to image */
if (window.objectFitImages) {
  window.objectFitImages();
}

$(document).ready(function () {
  var menuItem, exhibition, search, book; /// for menu animation
  let exploreSlider, exploreSliderSettings;  //explore homepage carousel
  let generalSliderSettings, discoverSliderSettings; //for general template page slider and homepage 'discover worlds slider;
  let controller = new ScrollMagic.Controller();
  let resizeId; // for resize timer

  function disableScrolling() {
    if ($(document).height() > $(window).height()) {
      var scrollTop = $('html').scrollTop() ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
      $('html')
        .addClass('disable-scrolling')
        .css('top', -scrollTop);
    }
  }

  function enableScrolling() {
    var scrollTop = parseInt($('html').css('top'));
    $('html').removeClass('disable-scrolling');
    $('html,body').scrollTop(-scrollTop);
  }

  function isMobile() {
    if ($('.is-mobile').css('display') === 'block') {
      return true;
    } else {
      return false;
    }
  }

  controller.scrollTo(function (target) {
    TweenMax.to(window, 0.7, {
      scrollTo: {
        y: target,
        autoKill: true
      },
      ease: Power2.easeOut
    });
  });

  $('.scroll-link').on('click', e => {
    $('html,body').animate(
      {
        scrollTo: $(e.currentTarget.href).offset().top
      },
      1000
    );
  });

  ///  HEADER
  //reseting header
  function headerReset() {
    enableScrolling();
    // $('body, html').removeClass('no-scroll');
    $('.page-menu__overlay').removeClass('is-visible');
    $('.page-menu').removeClass('is-active');
  }

  menuItem = $('.page-nav__list-item');
  exhibition = $('.page-menu__exhibition');
  search = $('.page-menu__search');
  book = $('.page-menu__book');

  function menuOpenAnimation() {
    var tl = new TimelineMax({
      repeat: 0,
      // delay: 0.1,
      ease: Expo.easeOut
    });
    menuItem.each(function (i, el) {
      var $this = $(this);
      tl.staggerFromTo(
        $this,
        0.195,
        {x: 100, opacity: 0},
        {x: 0, opacity: 1},
        '-=0.03'
      );
    });
    if (isMobile()) {
      tl.staggerFromTo(
        search,
        0.19,
        {x: 100, opacity: 0},
        {x: 0, opacity: 1},
        '-=0.05'
      )
        .staggerFromTo(
          book,
          0.19,
          {x: 100, opacity: 0},
          {x: 0, opacity: 1},
          '-=0.05'
        )
        .staggerFromTo(
          exhibition,
          0.19,
          {x: 100, opacity: 0},
          {x: 0, opacity: 1},
          '-=0.05'
        );
    } else {
      tl.staggerFromTo(
        book,
        0.19,
        {x: 100, opacity: 0},
        {x: 0, opacity: 1},
        '-=0.05'
      )
        .staggerFromTo(
          exhibition,
          0.19,
          {x: 100, opacity: 0},
          {x: 0, opacity: 1},
          '-=0.05'
        )
        .staggerFromTo(
          search,
          0.19,
          {x: 100, opacity: 0},
          {x: 0, opacity: 1},
          '-=0.05'
        );
    }

    $('.page-menu').addClass('was-animated');
  }

  function menuResetAnimation() {
    var tl = new TimelineMax({
      repeat: 0,
      ease: Expo.easeOut
    });
    menuItem.each(function (i, el) {
      var $this = $(this);
      tl.set($this, {x: 0, opacity: 1});
    });
    tl.set(exhibition, {x: 0, opacity: 1});
    tl.set(search, {x: 0, opacity: 1});
    tl.set(book, {x: 0, opacity: 1});
    $('.page-menu').removeClass('was-animated');
  }

  $('.header__hamburger').on('click', function (e) {
    e.stopPropagation();

    if ($('html').hasClass('disable-scrolling')) {
      enableScrolling();
    } else {
      disableScrolling();
    }

    // $('body, html').toggleClass('no-scroll');
    setTimeout(function () {
      $('.page-menu__overlay').toggleClass('is-visible');
      $('.page-menu').toggleClass('is-active');

      if ($('.page-menu').hasClass('was-animated')) {
        menuResetAnimation();
      } else {
        menuOpenAnimation();
      }
    }, 300);
  });

  $(document).on('click', function (e) {
    if (!e) e = window.event;
    if ($('.page-menu').hasClass('is-active')) {
      if (!$(e.target).closest('.page-menu.is-active').length) {
        headerReset();
        menuResetAnimation();
      }
    }
  });

  $('.page-nav__list-link').on('click', function (e) {
    if (isMobile()) {
      e.preventDefault();
      $('.page-nav__dropdown')
        .addClass('is-hidden')
        .slideUp();
      $(this)
        .parent()
        .siblings('.page-nav__list-item')
        .removeClass('is-active');
      $(this)
        .parent()
        .toggleClass('is-active');

      if (
        $(this)
          .parent()
          .hasClass('is-active')
      ) {
        $(this)
          .parent()
          .find('.page-nav__dropdown')
          .slideDown()
          .removeClass('is-hidden');
      } else {
        $(this)
          .parent()
          .find('.page-nav__dropdown')
          .addClass('is-hidden')
          .slideUp();
      }
    }
  });
  /// End HEADER

  /// HOMEPAGE tabs
  $('.how-tab__link').on('click', function (e) {
    e.preventDefault();
    var $this = $(this),
      href = $this.attr('href'),
      parent = $this.parent(),
      tab = $('.how-tab__item');

    if (isMobile()) {
      if (parent.hasClass('is-active')) {
        parent.removeClass('is-active');
        tab.removeClass('is-active');
      } else {
        parent.siblings('.how-tab__link-item').removeClass('is-active');
        parent.addClass('is-active');
        tab.removeClass('is-active');
        $this
          .parents('.homepage-how')
          .find('.how-tab__item' + href)
          .addClass('is-active');
      }
    } else {
      parent.siblings('.how-tab__link-item').removeClass('is-active');
      parent.addClass('is-active');
      tab.removeClass('is-active');
      $this
        .parents('.homepage-how')
        .find('.how-tab__item' + href)
        .addClass('is-active');
    }
  });

  /// WORK tab
  $('.tab-work__slider').slick({
    mobileFirst: true,
    dots: false,
    arrows: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
          arrows: false
        }
      }
    ]
  });

  /// BUILD tab
  function buildTabAnimation() {
    var colDefault = $('.tab-build__default'),
      calendar = $('.page__calendar__wrap'),
      tabFooter = $('.how-tab__item-footer'),
      tabEvents = $('.tab-build__events');
    if (colDefault.hasClass('was-animated')) {
      return;
    } else {
      colDefault
        .addClass('was-animated')
        .addClass('is-removed')
        .addClass('is-terminated');
      calendar.addClass('was-animated');
      tabFooter.removeClass('is-hidden');
      tabEvents.addClass('is-added');
      setTimeout(function () {
        tabEvents.addClass('is-visible');
      }, 0);
    }
  }

  /// DATEPICKER jquery ui
  $(document).on('change', '.page__calendar', function () {
    var date = $(this).val(); ///mm-dd-yyyy
    var table = $('.tab-build__events-table');
    var tableActive = $('.tab-build__events').find(
      '.tab-build__events-table[data-date="' + date + '"]'
    );
    var tableDefault = $('.tab-build__events-table.is-default');
    buildTabAnimation();
    if (tableActive.length === 0) {
      table.removeClass('is-active');
      tableDefault.addClass('is-active');
    } else {
      table.removeClass('is-active');
      tableDefault.removeClass('is-active');
      tableActive.addClass('is-active');
    }
  });
  /// End HOMEPAGE tabs

  //Homepage Explore slider
  exploreSlider = $('.explore__carousel');
  exploreSliderSettings = {
    dots: false,
    arrows: false,
    adaptiveHeight: false,
    mobileFirst: true,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1023,
        settings: "unslick"
      }
    ]
  };

  exploreSlider.slick(exploreSliderSettings);

  function exploreSliderInit() {
    if ($(window).width() > 1024) {
      if (exploreSlider.hasClass('slick-initialized')) {
        exploreSlider.slick('unslick');
      }
      return
    }

    if (!exploreSlider.hasClass('slick-initialized')) {
      return exploreSlider.slick(exploreSliderSettings);
    }
  }

  //Discover section caption text
  $('.discover__img').on('click', function () {
    let $this = $(this),
      img = $('.discover__img'),
      data = $this.attr('data-caption'),
      caption = $('.discover__caption');
    img.removeClass('discover__img--top');
    $this.addClass('discover__img--top');
    caption.hide();
    $('.discover__inner-caption').find('.discover__caption' + '.' + data).show();
  });


  /* General page */
  /* Quote Slider */
  $('.quote-slider__container').slick({
    arrows: true,
    prevArrow: $('.quote-slider').find('.arrow-slider--prev'),
    nextArrow: $('.quote-slider').find('.arrow-slider--next')
  });

  /* Gallery slider */
  function changeCaption(dataCaption){  //for slider with caption change
    let caption = $('.worlds__caption'),
      captionActive = $('.worlds__caption-wrap').find('.worlds__caption' + '.' + dataCaption);

    caption.hide();
    captionActive.show();
  }

  generalSliderSettings = {
    infinite: false,
    prevArrow: $('.gallery-slider').find('.arrow-slider--prev'),
    nextArrow: $('.gallery-slider').find('.arrow-slider--next'),
    mobileFirst: true,
    speed: 150,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          centerMode: true,
          variableWidth: true
        }
      }
    ]
  };
  discoverSliderSettings = {
    infinite: false,
    prevArrow: $('.gallery-slider').find('.arrow-slider--prev'),
    nextArrow: $('.gallery-slider').find('.arrow-slider--next'),
    mobileFirst: true,
    speed: 150,
    responsive: [
      {
        breakpoint: 320,
        settings: {
          centerMode: true,
          variableWidth: true
        }
      }
    ]
  };

  function  handleSliderAnimation(carousel){
    $(carousel).on('afterChange init', function (event, slick, direction, index, slider, slide) {
      // remove all prev/next
      slick.$slides.removeClass('slick-prev slick-next');

      // find current slide
      for (var i = 0; i < slick.$slides.length; i++) {
        var $slide = $(slick.$slides[i]);
        if ($slide.hasClass('slick-current')) {
          // update DOM siblings
          $slide.prev().addClass('slick-prev');
          $slide.next().addClass('slick-next');
          break;
        }
      }

      //for gallery slider with caption change
      let attr =  $(this).find('.slick-current').attr('data-caption');
      if(typeof attr !== typeof undefined && attr !== false){
        changeCaption(attr);
      }
    })
      .on('beforeChange', function (event, slick) {
        // optional, but cleaner maybe
        // remove all prev/next
        slick.$slides.removeClass('slick-prev slick-next');
      });
  }

  handleSliderAnimation('.gallery-slider__container');
  handleSliderAnimation('.worlds-slider__container');

  $('.gallery-slider__container').slick(generalSliderSettings);
  $('.worlds-slider__container').slick(discoverSliderSettings);
  /* End general page */


  //function calls
  exploreSliderInit();

  /* Trigger resize once */
  $(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
  });

  function doneResizing() {}

  $(window).resize(function () {
    headerReset();
    exploreSliderInit();
  });

  $(window).on('orientationchange', function () {
    headerReset();
  });
});

$(window).on('load', function () {
  setTimeout(function () {
    $('.popup-exhibition').addClass('is-visible');
  }, 500);
});
