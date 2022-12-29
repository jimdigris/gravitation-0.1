
'use strict';

function executeLifeCycle() {                                                                                   // цикл
    // --- рассчеты ---
    player.performMovement(fonSt.landY);                                                                        // изменение координат игрока при движении
    gravity.impact(player, fonSt.landY);                                                                        // взаимодействие гравитации на героя

    // --- рассчеты ---

    ctxPlayer.clearRect(0, 0, playerSt.canvaWidth, playerSt.canvaHeight);                                       // очистка холста 

    // --- отрисовка ---
    player.draw();                                                                                              // нарисовать героя
    // --- отрисовка ---

    window.requestAnimationFrame(executeLifeCycle);                                                             // выполнить сл виток цикла
}
