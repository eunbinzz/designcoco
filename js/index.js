$(".slide_group").slick({
    autoplay: true, // 자동재생
    autoplaySpeed: 3000, // 간격시간
    dots: true, // 동그라미버튼
    pauseOnFocus: false, // 동그라미번호버튼 클릭시 자동실행 멈춤여부
    prevArrow: '<button class="prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button class="next"><i class="fas fa-angle-right"></i></button>',
})


$('.article1 .playstop').on('click', function () {
    // .addClass() : 클래스 추가
    // .removeClass() : 클래스 삭제
    // .hasClass() : 클래스 유무 판단(결과는 true 또는 false)
    // if ( true or false ) { true 실행문 } else { false 실행문 }
    var $ibutton = $(this).find('i')
    if ($ibutton.hasClass('fa-pause-circle')) {
        $('.slide_group').slick('slickPause')
        $ibutton.removeClass('fa-pause-circle').addClass('fa-play-circle')
    } else {
        $('.slide_group').slick('slickPlay')
        $ibutton.removeClass('fa-play-circle').addClass('fa-pause-circle')
    }
})

// .index() : 선택자의 인덱스번호를 알아냄
// p.60~61 참고
// 변수선언 : var 변수명
var num;
$('.cs_board .tabmenu > li').on('click', function () {
    $(this).addClass('active')
        .siblings().removeClass('active')
    // console.log( $(this).index() )
    // 변수에 값 저장하기 : 변수명 = 값
    // 변수는 값을 하나만 저장할 수 있음
    // 새로운 값을 저장하면 이전값은 지워짐
    num = $(this).index()
    $(this).parent().next().children()
        .eq(num).addClass('active')
        .siblings().removeClass('active')
})

$('#header .open').addClass('on')
$('#header .open').on('click', function () {
    $(this).next().addClass('on')
    $(this).removeClass('on')
    $(this).next().next().addClass('on')
})
$('#header .close').on('click', function () {
    $(this).prev().removeClass('on')
    $(this).removeClass('on')
    $(this).prev().prev().addClass('on')
    $('.depth1 > li').removeClass('on')
})

// 여기서부터 resize 이벤트 발생시 스크롤바 유무에 따른 상태제어 프로그램
var deviceSize = 1024;

function scrollOX(status) {
    $('html').css({
        overflowY: status
    })
    var htmlWidth = $('html').width()
    return htmlWidth
}
var swh = scrollOX('hidden')
var sws = scrollOX('scroll')
var swd = swh - sws
if (swd > 0) {
    deviceSize = deviceSize - swd
}

function init() {
    var ww = $(window).width()
    if (ww > deviceSize && !$('html').hasClass('pc')) {
        $('html').addClass('pc').removeClass('mobile')
        $('.search #sbox').removeClass('on')
        $('.depth1 > li').removeClass('on')
    } else if (ww <= deviceSize && !$('html').hasClass('mobile')) {
        $('html').addClass('mobile').removeClass('pc')
        $('#header .close').removeClass('on')
        $('#header #nav').removeClass('on')
        $('#header .open').addClass('on')
        $('.search #sbox').removeClass('on')
    }
}

init()

$(window).on('resize', function () {
    init()
})

// 여기까지 resize 이벤트 발생시 스크롤바 유무에 따른 상태제어 프로그램



$('.depth1 > li').hover(
    function () {
        if ($('html').hasClass('pc')) {
            $(this).addClass('on')
        }
    },
    function () {
        if ($('html').hasClass('pc')) {
            $(this).removeClass('on')
        }
    }
)
$('.depth1 > li').on('click', function (e) {
    if ($('html').hasClass('mobile')) {
        e.preventDefault()
        $(this).toggleClass('on')
        $(this).siblings().removeClass('on')
    }
})



$('.depth2 > li').on('click', function (e) {
    e.stopPropagation()
})



// 돋보기 클릭시 검색창 박스 열고닫기
$('.search label').on('click', function () {
    $(this).prev().toggleClass('on')
})

$(window).on('scroll', function () {
    var sct = $(this).scrollTop()
    if (sct >= 10 && !$('#header').hasClass('on')) {
        $('#header').addClass('on')
    } else if (sct < 10 && $('#header').hasClass('on')) {
        $('#header').removeClass('on')
    }
})
