<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title>Title</title>
    <link rel="stylesheet" href="css/css.css">
</head>
<body>


<div class="enter">
    <div class="logo-anime" data-anime="show">
        <img src="image/logo.png" alt="">

    </div>
    <span class="choice-text-anime" data-anime="fade">Выберите персонажа</span>
    <div class="menu">
        <div class="choice-anime" data-anime="show" id="choice-anime">
            <div class="choice">
                <div class="character" id="pumba" data-anime="fade">
                    <img src="image/pumba.png" alt="" width="150">
                    <div class="name-char">Пумба</div>
                </div>
                <div class="character" id="timon" data-anime="fade">
                    <img src="image/timon.png" alt="" width="150">
                    <div class="name-char">Тимон</div>
                </div>
            </div>
        </div>


        <div class="start-game">
            <div class="start-form">
                <input type="text" class="pl-name-animate" data-anime="fade" value="" placeholder="Введите Никнейм">
                <button disabled class="btn-enter">
                    Играть
                </button>
            </div>
        </div>


    </div>
    <div class="enter-footer">
        <div class="info-anime" data-anime="show">
            <div>
                <div class="copy">Kiryusha @ 2019</div>
                <div class="rules"><a href="#">Правила игры</a></div>
            </div>
        </div>
    </div>
</div>

<div class="rules-modal">
    <div class="modal">
        <div class="title">
            Правила игры
        </div>
        <div class="rules-text">
            <div class="text">
                fawfawr
            </div>
        </div>
        <div class="close">
            X
        </div>
    </div>
</div>

<div class="start-media">

    <div class="start-video">
        <video class="video-player"
               src="video/Timon%20_%20Pumbaa%20-%20Title%20Song%20%5BEnglish%20Version%5D.mp4"></video>
        <div class="video-stop">Нажите SPACE для продолжения</div>
    </div>

</div>

<div class="game">
    <div class="pause">
        Пауза
    </div>
    <div class="table-finish-player">

        <div class="user">
            <table>
                <tr>
                    <td>Место</td>
                    <td>Никнейм</td>
                    <td>Очки</td>
                </tr>
            </table>
        </div>

    </div>
    <div class="game-field">
        <div class="game-info">
            <div>Ник:&nbsp;
                <div class="name-info"></div>
            </div>
            <div>HP:&nbsp;
                <div class="hp-info"></div>
            </div>
            <div>
                Сьедено гусенец:&nbsp;
                <div class="caterp-info"></div>
            </div>
            <div>
                Время:&nbsp;
                <div class="time-info"></div>
            </div>
            <div>
                Растояние:&nbsp;
                <div class="distation-info"></div>
            </div>

        </div>
        <div class="game-slider">

            <div class="land"></div>
            <div class="caterpi"></div>
            <div class="hyena"></div>

            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
            <img src="image/game-end.png" class="img-background" alt="">
            <img src="image/game.png" class="img-background" alt="">
        </div>
        <div class="player">
            <img src="" class="plr" alt="">
        </div>
        <img src="image/land.png" class="new-land" alt="">
    </div>
</div>

<div class="return-game">
    Вы проиграли!
    <img src="image/cry.gif" width="250">
    <div class="return-game-btn">
        Начать сначала
    </div>
</div>

<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/game.js"></script>
<script src="js/js.js"></script>


</body>

</html>
