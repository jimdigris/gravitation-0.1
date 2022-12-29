'use strict';

document.addEventListener("DOMContentLoaded", () => {                                                       // загрузка страницы
    // --- создаем фон ---
    canvaFon = new Canvas(                                                                                  // создать экземпляр холста для фона
        fonSt.canvaParent,                                                                                  // куда помещаем канву        
        fonSt.canvaId,                                                                                      // id для канвы
        fonSt.canvaWidth,                                                                                   // ширина канвы
        fonSt.canvaHeight                                                                                   // высота канвы
    );
    ctxFon = canvaFon.init();                                                                               // инициализировать холст для фона
    fon = new Fon(ctxFon);                                                                                  // создать экземпляр фона
    // --- создаем фон ---

    // --- создаем игрока ---
    canvaPlayer = new Canvas(                                                                               // создать экземпляр холста для игрока
        playerSt.canvaParent,                                                                               // куда помещаем канву 
        playerSt.canvaId,                                                                                   // id для канвы
        playerSt.canvaWidth,                                                                                // ширина канвы
        playerSt.canvaHeight                                                                                // высота канвы
    );
    ctxPlayer = canvaPlayer.init();                                                                         // инициализировать холст для игрока
    player = new Player(                                                                                    // создать экземпляр героя
        ctxPlayer,
        playerSt.weight,                                                                                    // вес игрока
        playerSt.width,                                                                                     // ширина игрока
        playerSt.height,                                                                                    // высота игрока
        playerSt.color,                                                                                     // цвет игрока
        playerSt.step,                                                                                      // размер шага передвижения
        playerSt.jumpHeight,                                                                                // высота прыжка (шагов)
        playerSt.x,                                                                                         // координаты
        playerSt.y
    );
    // --- создаем игрока ---

    // --- создаем гравитацию ---
    gravity = new Gravity();                                                                                // создать экземпляр гравитации
    // --- создаем гравитацию ---

    // --- разовая отрисовка статичных элементов ---
    fon.drawSky(fonSt.skyX, fonSt.skyY, fonSt.canvaWidth, fonSt.canvaHeight, fonSt.skyColor);               // нарисовать небо
    fon.drawLand(fonSt.landX, fonSt.landY, fonSt.canvaWidth, fonSt.canvaHeight, fonSt.landColor);           // нарисовать траву
    // --- разовая отрисовка статичных элементов ---

    addEventListener("keydown", (event) => { player.determineDirection(event); });                          // отслеживание нажатие кнопок (для игрока)
    executeLifeCycle();                                                                                     // выполнить первый жизненный цикл  
});