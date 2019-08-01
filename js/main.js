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
        $('.page-menu').removeClass('was-animated');
    }

    $('.header__hamburger').on('click', function (e) {
        e.stopPropagation();
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

    /// WORK tab
    $('.tab-work__slider').slick({
        mobileFirst: true,
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        responsive: [
            {
                breakpoint: 1024,
                settings:
                    {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false,
                    arrows: false
                }
            },
        ]
    });

    /// BUILD tab
    function buildTabAnimation() {
        var colDefault = $('.tab-build__default');
        if (colDefault.hasClass('was-animated')) {
            return;
        } else {
            colDefault.addClass('was-animated').addClass('is-removed');
            $('.how-tab__item-footer').removeClass('is-hidden');
            $('.tab-build__events').addClass('is-visible');
        }
    }
    /// DATEPICKER jquery ui
    $(document).on('change', '.page__calendar', function () {
        var date = $(this).val();  ///mm-dd-yyyy
        var table = $('.tab-build__events-table');
        var tableActive = $('.tab-build__events').find('.tab-build__events-table[data-date="' + date + '"]');
        var tableDefault = $('.tab-build__events-table.is-default');
        buildTabAnimation();
        if (tableActive.length === 0){
            table.removeClass('is-active');
            tableDefault.addClass('is-active');
        }else{
            table.removeClass('is-active');
            tableDefault.removeClass('is-active');
            tableActive.addClass('is-active');
        }
    });
    /// HOMEPAGE tabs

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
