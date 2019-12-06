////////////
// startGame(); //- test

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
        top: '+=115%'
    }, {
        duration: time.modal
    });
}

$('.close').click(() => {
    $('.modal').animate({
        top: '-=115%'
    }, {
        duration: time.modal,//1000
        complete: function () {
            $('.rules-modal').css('display', 'none');

        }
    });
});

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

//начало игры


//отрисовка сцены


/////////Анимация гусениц
// let checkCaterpiTransform = false;

/////////


//создание платформ
function generate_land() {

    let slider = $('.game-slider');
    let land = $('.land');
    let caterpi = $('.caterpi');
    let hyena = $(".hyena");

    let baseLeft = 700;
    let baseBottom = 90;
    let baseFrame = 5880;
    let baseImg = 500;
    let baseWidth = 588;
    let stepFrame = Math.round(baseFrame / baseWidth);
    // console.dir(baseBottom+randomInteger(-100,100));

    for (let i = 0; i < stepFrame; i++) {
        let bottom = baseBottom + randomInteger(baseBottom, baseBottom - 60);
        let distance = randomInteger(40, 50);
        let distanceHyena = randomInteger(500, 750);

        //добавление платформ для гусениц в игре
        land.append($("<img class='land-frame' id='land" + i + "'>").attr("src", "image/land-vector.png").css({
            // left: baseLeft + baseImg * i,
            // bottom: bottom
            left: baseLeft + baseImg * i + distance + "px",
            bottom: bottom + "px"
        }));

        //добавление гусениц в игре
        caterpi.append($("<img class='caterpi-frame' id='caterpi" + i + "'>").attr("src", "image/caterpillar.png").css({
            left: baseLeft + baseImg * i + distance + 28 + "px",
            bottom: bottom + 35 + "px",
            width: "30px"
        }));

        //расчет расстояния клеток у гиен
        let wh = baseLeft + distanceHyena * i;

        if (wh < 5500) {//ограничить появление клеток у гиен
            hyena.append(
                $("<div class='hyena-room' id='room" + i + "'>").css({
                    left: baseLeft + distanceHyena * i + "px"
                })
            );

            $('.hyena-room#room' + i).append($("<img class='nps-hyena' id='nps-hyena" + i + "'>").attr('src', 'image/HyenaRun.gif').css({}));
        }
    }


}


//движение гиены в клетке


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
                    for (let i = 0; i < data["all10"].length; i++) {
                        let d1 = data["all10"][i];

                        console.dir(d1["nickname"] != name);

                        if (d1["nickname"] != name) {
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
            })
        }
    })

}


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
                    $(".return-game-btn").css("display","block");
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
                })
            },
            complete: function () {
                varNull();
                startGame();
            }
        })
    })
}

