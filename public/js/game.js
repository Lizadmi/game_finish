var
    char,//выбор персонажа
    nameP,//никнейм пользователя
    time = {
        enter: 600,
        show: 400,
        fade: 400,
        modal: 1000,
    },
    $elem = [
        'logo-anime',
        'choice-anime',
        'choice-text-anime',
        'info-anime'
    ],
    video = {
        show: false
    },
    leftPressed = false,
    rightPressed = false,
    jumpPressed = true,
    downPressed = false,
    jumpCount = 0,
    jumpLength = 50,
    jumpHeight = 0,
    playerHeight = 70,
    playerWidth = 70,
    moveInFrame = 400,
    speedMoveChar = 4,
    paddleX = (moveInFrame - playerWidth) / 2,
    rightSlider = false,
    leftSlider = false,
    distanceCharY = 550,
    change = false,
    changeID = null,
    countHp = 100,
    countCaterp = 0,
    countTimes = 0,
    distationToFinish = 0,
    timer_game = [],
    pause = false,
    cordHyena = 1,
    moveHyena = true,
    PlayerAnimate = false,
    checkCaterpiTransform = false,
    returnGame = false;






//dssddsdsd


