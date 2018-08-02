$(document).ready(function () {
    setTimeout(function(){
        $('.text-loading').addClass('d-none');
        $('.loading-img').addClass('d-none');
    }, 2100);
    setTimeout(function(){
        for(let i = 50; i >= 0; i=i-0.5){
            setTimeout(function(){
                let vh = `${i}vh`;
                if(i > 0){
                    $('#loading-top').attr('style', `height:${vh}`);
                    $('#loading-bottom').attr('style', `height:${vh}`);
                }
                if(i === 0){
                    setTimeout(function(){
                        $('#--js-loading').remove();
                        window.addEventListener("load", dots(
                            '--js-header',
                            80,
                            .5,
                            100,
                            'rgba(255,255,255,0.1)'
                        ));
                    },500);
                    $('body').removeClass('uk-overflow-hidden');
                }
            }, 1000);
        }
    }, 1000);
})


window.addEventListener("load", dots('cnv'));

function dots(id, isAmount = 20, isSpeedMax = 0.3, isLine = 90, isColor = 'rgba(255,255,255,0.2)') {
  var amount = isAmount; // количество точек
  var speedMax = isSpeedMax; // максимальная скорость точек
  var line = isLine; // размер лини между точками
  var color_config = isColor;

  (function() {
    var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
    window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  container = document.getElementById(id); // находим холст по ID
  container.width = window.innerWidth; // ширина элемента canvas = ширина окна
  container.height = window.innerHeight - 10; // высота элемента canvas = высота окна
  var w = container.width; // записываем размер окна в переменную
  var h = container.height; // записываем размер окна в переменную
  context = container.getContext('2d'); // получаем конткест

function Dot(w, h, speedMax) { // конструктор объекта(точки)
    this.x = getRandomInt(0, w);
    this.y = getRandomInt(0, h);
    this.speed = getRandomInt(1, speedMax) / 0.5;
    this.dx = getRandomInt(-this.speed, this.speed);
    this.dy = getRandomInt(-this.speed, this.speed);
    this.rad = getRandomInt(1, 3);
  }

  var dots = new Array; // создаем массив

  for (var i = 0; i < amount; i++) { // добавляем в массив объекты(точки) через конструктор
    dots.push(new Dot(w, h, speedMax)); 
  }

  function drawline() { // рисуем линии между точками
    dots.forEach(function(item, i, arr) { // перебираем массив объектов
      dots.forEach(function(item2, i2, arr2) { // еще раз перебираем массив объектов
        if(item.x > item2.x - line && item.x < item2.x + line && item.y > item2.y - line && item.y < item2.y + line ) { // на line расстояние
          context.strokeStyle = color_config; // цвет линии
          context.beginPath();
          context.moveTo( item.x, item.y );
          context.lineTo( item2.x, item2.y );
          context.stroke();
        }
      });
    });
  }

  function drawDots() { // рисуем точки
    dots.forEach(function(item, i, arr) {
      if(item.x >= w) item.dx = -item.speed; // ограничиваем полет
      if(item.x <= 0) item.dx = item.speed;
      if(item.y >= h) item.dy = -item.speed;
      if(item.y <= 0) item.dy = item.speed;
      item.x += item.dx;
      item.y += item.dy;
      context.fillStyle = color_config; // цвет точки
      context.beginPath();
      context.arc(item.x, item.y, item.rad, 0, Math.PI * 2);
      context.fill();
    });
  }
		
  function draw() { // рисуем холст
    requestAnimationFrame(draw);
    context.clearRect(0, 0, w, h); // чистим холст
    drawDots();
    drawline();
  }

  draw();

  function getRandomInt(min, max) { // рандом для точек
    var rand = min + Math.random() * (max + 1 - min);
    //rand = Math.floor(rand); // округляем рандомное число
    return rand;
  }
  window.addEventListener("resize",function(){ // если размер окна меняется - меняем размер холста
    container.width = window.innerWidth;
    container.height = window.innerHeight - 10;
  });
}

function _log(val) {
    console.log(val);
}