$(document).ready(function () {
    var menuItem, exhibition, search;  /// for menu Animation
    var controller = new ScrollMagic.Controller();

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

    ///  HEADER
    //reseting header
    function headerReset() {
        // $('body, html').removeClass('no-scroll');
        $('.page-menu__overlay').removeClass('is-visible');
        $('.page-menu').removeClass('is-active');
    }

    menuItem = $('.page-nav__list-item');
    exhibition = $('.page-menu__exhibition');
    search = $('.page-menu__search');

    function menuOpenAnimation() {
        var tl = new TimelineMax({
            repeat: 0,
            // delay: 0.1,
            ease: Expo.easeOut
        });
        menuItem.each(function (i, el) {
            var $this = $(this);
            tl.staggerFromTo($this, 0.25, {x: 100, opacity: 0}, {x: 0, opacity: 1}, '-=0.03');
        });
        tl.staggerFromTo(exhibition, 0.2, {x: 100, opacity: 0}, {x: 0, opacity: 1}, '-=0.05');
        tl.staggerFromTo(search, 0.2, {x: 100, opacity: 0}, {x: 0, opacity: 1}, '-=0.05');
        $('.page-menu').addClass('was-animated');
    }

    function menuCloseAnimation() {
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
        $('.page-menu').removeClass('was-animated');
    }

    $('.header__hamburger').on('click', function (e) {
        e.stopPropagation();
        // $('body, html').toggleClass('no-scroll');
        setTimeout(function () {
            $('.page-menu__overlay').toggleClass('is-visible');
            $('.page-menu').toggleClass('is-active');

            if ($('.page-menu').hasClass('was-animated')) {
                menuCloseAnimation();
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
                menuCloseAnimation();
            }
        }
    });
    ///  HEADER

    /// HOMEPAGE tabs
    $('.how-tab__link').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            href = $this.attr('href'),
            parent = $this.parent();
       parent.siblings('.how-tab__link-item').removeClass('is-active');
       parent.addClass('is-active');
       $('.how-tab__item').removeClass('is-active');
       $this.parents('.homepage-how').find('.how-tab__item' + href).addClass('is-active');
    });
    /// HOMEPAGE tabs


    function buildTabAnimation(){
        var colDefault = $('.tab-build__col-default');
        if (colDefault.hasClass('was-animated')){
            return
        }else{
            colDefault.addClass('was-animated');
            setTimeout(function () {
                colDefault.hide();
            },100)
        }
    }
    /// DATEPICKER jquery ui
    $(document).on('change', '.page__calendar', function(){
        console.log($(this))
        buildTabAnimation();

    });

    $(window).resize(function () {
        headerReset();
    });

    $(window).on('orientationchange', function () {
        headerReset();
    });

});

$(window).on('load', function () {
    setTimeout(function () {
        $('.popup-exhibition').addClass('is-visible');
    }, 300);
});
