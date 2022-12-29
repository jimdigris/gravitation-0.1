'use strict';

let canvaFon, ctxFon, fon;
let canvaPlayer, ctxPlayer, player;
let gravity;

const fonSt = {                                                                                 // стартовые настрйоки фона
    canvaParent: '.wrap',                                                                       // куда помещаем канву
    canvaId: 'canvas-fon',                                                                      // id для канвы
    canvaWidth: 800,                                                                            // ширина канвы
    canvaHeight: 600,                                                                           // высота канвы
    skyX: 0,                                                                                    // координат неба
    skyY: 0,
    skyColor: '#0d90c4',                                                                        // цвет неба
    landX: 0,                                                                                   // координаты земли
    landY: 400,
    landColor: '#0b8e32'                                                                        // цвет земли
};

const playerSt = {                                                                              // стартовые настройки игрока
    canvaParent: '.wrap',                                                                       // куда помещаем канву
    canvaId: 'canvas-player',                                                                   // id для канвы
    canvaWidth: 800,                                                                            // ширина канвы
    canvaHeight: 600,                                                                           // высота канвы
    weight: 10,                                                                                 // вес игрока
    width: 20,                                                                                  // ширина игрока
    height: 20,                                                                                 // высота игрока
    color: 'orange',                                                                            // цвет игрока
    step: 5,                                                                                    // размер шага передвижения
    jumpHeight: 30,                                                                             // высота прыжка (шагов)
    x: 40,                                                                                      // координаты игрока
    y: 340
}
