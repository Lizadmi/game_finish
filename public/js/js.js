// startGame(); //- test
//анимация запуска начального экрана
const $anime_enter = () => {
    let $i = 0;

    let si = setInterval(() => {
        if ($i >= $elem.length) {
            clearInterval(si);
        }
        let $e = $("." + $elem[$i]);
        switch ($e.data("anime")) {
            case "show":
                $e.show(time.show);
                break;
            case "fade":
                $e.fadeIn(time.fade);
                break;
        }
        $i++;
    }, time.enter);
};
//выбор персонажа
$('.character').click(function () {
    char = $(this).attr('id');
    $('.start-game').css('display', 'block');

    /*скрываем ненужного перса*/
    char = (char == "pumba") ? "timon" : "pumba";
    $('[id="' + char + '"]').hide();
    char = (char == "pumba") ? "timon" : "pumba";
});

/**
 * анимация главного входа игры
 */

$('.enter').animate({
    top: '+=50%',
    left: '+=50%',
    width: '+=500px',
    height: '+=600px',
}, {
    duration: time.enter,
    easing: 'swing',
    complete: function () {
        $anime_enter();
        $('.pl-name-animate').val('');
        $('.btn-enter').prop('disabled', true)
    }
});

$('.rules').click(() => {
    anime_rules();
});

function anime_rules() {
    $('.rules-modal').css('display', 'flex');
    $('.modal').animate({
        top: '+=110%'
    }, {
        duration: time.modal
    });
}

$('.close').click(() => {
    $('.modal').animate({
        top: '-=110%'
    }, {
        duration: time.modal,//1000
        complete: function () {
            $('.rules-modal').css('display', 'none');

        }
    });
});
// активация/деактивация кнопки старта
$('.pl-name-animate').on('input', function () {
    //получаем текст никнейма пользователя
    var nick = $(this).val();
    //подсчитываем количество символов введеных пользователем
    if (nick.length > 1) {
        $('.btn-enter')
            .removeAttr('disabled')//активация кнопки если нет никнейма
            .css('cursor', 'pointer');//меняем курсор
        nameP = nick
    } else {
        $('.btn-enter')
            .prop('disabled', true)//деактивируем кнопку если есть логин более 1 символа
            .css('cursor', 'default');//меняем курсор
    }
});

//событие кнопки входа в игру
$('.btn-enter').click(function () {
    //скрыть все элементы меню входа для плавной анимации
    $(".enter > div, .enter > label").hide("fast");
    let time = setTimeout(() => {
        console.log("time stop");
        if (video.show) {
            startGame();
            video.show = false;
        }
    }, 10000);
    //убираем с экрана фрейм с входов в игру
    $('.enter').animate({
        'top': '-=100%',
        'left': '+=90%',
        'width': '-=500px',
        'height': '-=600px',
    }, {
        duration: 1000,
        complete: function () {
            //убираем вход
            $('.enter').css('display', 'none');
            //показываем блок с роликом
            $('.start-media')
                .css('display', 'block');
            $('.video-player')
                .show(500)
                .trigger('play');
            video.show = true;
            $(document).one('keypress', (event) => {
                if (event.keyCode == 32) {
                    clearTimeout(time);
                    startGame();
                }
            })
        }
    })
});

//конец игры
function finishGame() {

    pause = true;
    let time = $(".time-info").text().split(":");
    let point = Number(1000 - Number(time[0] * 60) + Number(time[1]) + Number(countCaterp) * 10);
    console.dir(point);
    $('.game-field').animate({
        width: '0',
        height: '0'
    }, {
        duration: 1000,
        complete: function () {
            $('.table-finish-player').animate({
                width: '500px',
                height: '600px'
            }, {
                duration: 1000,
            });
            //запрос результата в базе
            $.ajax({
                method: 'POST',
                url: 'connect.php',
                dataType: 'JSON',
                data: {
                    name: nameP,
                    point: point
                },
                success: function (data) {
                    console.dir(data);
                    let user = false;
                    $('.user table').append("<tr><td> Место </td><td> Никнейм </td><td> Очки </td></tr>");
                    for (let i = 0; i < data["all10"].length; i++) {
                        let d1 = data["all10"][i];

                        console.dir(d1["nickname"] != nameP);

                        if (d1["nickname"] != nameP) {
                            $('.user table').append("<tr><td>" + d1["place"] + "</td><td>" + d1["nickname"] + "</td><td>" + d1["point"] + "</td></tr>");
                        } else {
                            if (i == 9 && !user) {

                            }
                            user = true;
                            $('.user table').append("<tr style='color:red; font-weight: bolder;'><td>" + d1["place"] + "</td><td>" + d1["nickname"] + "</td><td>" + d1["point"] + "</td></tr>");
                        }
                    }

                    $(".table-finish-player").show();
                }
            });

        }
    });
}
$(".new-game-btn").on("click", function () {
    console.dir("123");
    $(".table-finish-player").hide();
    $(".game").hide();
    returnGame = true;
    checkNewGame = true;
    varNull();
    $('.enter').animate({
        top: '+=100%',
        left: '-=90%',
        width: '+=500px',
        height: '+=600px',
    }, {
        duration: time.enter,
        complete: function () {
            checkNewGame = false;
            $anime_enter();
            $(".enter > div, .enter > label").show();
            $(".character").show();
            $(".start-game").hide();
            $('.enter').css("display", "flex");
            $('.pl-name-animate').val('');
            $('.btn-enter').prop('disabled', true);
            $('.user table').empty();
        }
    });
})
//смерть перса
function endGame() {
    pause = true;
    $('.game-field').animate({
        width: '0',
        height: '0'
    }, {
        duration: 1000,
        complete: function () {
            $('.return-game').css({
                display: 'flex'
            }).animate({
                width: '250px',
                height: '200px'
            }, {
                duration: 1000,
                complete: function () {
                    $(".return-game-btn").css("display", "block");
                }
            })
        }
    });
    $(".return-game-btn").on('click', function () {
        $('.game-field').animate({
            width: '800px',
            height: '600px'
        }, {
            duration: 1000,
            start: function () {
                $('.return-game').animate({
                    width: '0',
                    height: '0'
                }, {}).css({
                    display: 'none'
                });
                varNull();
            }
        })
    })
}

//сброс настроек
function varNull() {
    console.log(returnGame);

    if (!returnGame) return;
    returnGame = false;
    console.dir("СМЕЕЕРТЬ");

    for (let i = 0; i < timer_game.length; i++) {
        clearInterval(timer_game[i]);
    }
    $('.new-land').css({display: 'none'});
    $('.game-slider').css('left', '');
    $('.hyena').empty();
    $('.caterpi').empty();
    $('.land').empty();
    moveInFrame = 400;
    paddleX = (moveInFrame - playerWidth) / 2;
    distanceCharY = 550;
    change = false;
    changeID = null;
    countHp = 100;
    countCaterp = 0;
    countTimes = 0;
    distationToFinish = 0;
    timer_game = [];
    cordHyena = 1;
    moveHyena = true;
    PlayerAnimate = false;
    pause = false;
    if (!checkNewGame) startGame();

}