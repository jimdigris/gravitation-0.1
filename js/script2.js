'use strict';

(function () {
    class Canvas {                                                                      // класс для Холстов
        #element = null;                                                                // холст
        #context = null;                                                                // контекст

        constructor(parent, id, width, height) {
            this.parent = parent;                                                       // родительский элемент
            this.id = id;                                                               // идентификатор
            this.width = width;                                                         // ширина
            this.height = height;                                                       // высота
        }

        #createCanvas() {                                                               // создать холст
            let parent = document.querySelector(`${this.parent}`);                      // получить родительский элемент
            let element = document.createElement('canvas');                             // создать элемент холста
            element.setAttribute('id', this.id);                                        // присвоить id      
            element.setAttribute('width', this.width);                                  // задать ширину     
            element.setAttribute('height', this.height);                                // задать высоту     
            parent.prepend(element);                                                    // добавить в родителя
        }
        #receiveCanvas() { this.#element = document.querySelector(`${this.id}`); }      // получить холст
        #defineCanvas() { this.#context = this.#element.getContext("2d"); }             // определить контекст    

        draw() {                                                                        // отрисовать холст
            this.#createCanvas();                                                       // создать холст
            this.#receiveCanvas();                                                      // получить холст
            this.#defineCanvas();                                                       // определить контекст
            return this.#context;
        }
    }

    class Background {                                                                  // класс для фона
        drawSky(x, y, width, height, color) {                                           // отрисовать небо
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
        }

        drawLand(x, y, width, height, color) {                                          // отрисовать землю
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
        }
    }

    class Hero {                                                                        // класс для Героя
        constructor(weight, width, height, color, x, y) {
            this.weight = weight;                                                       // масса
            this.width = width;                                                         // ширина
            this.height = height;                                                       // высота
            this.color = color;                                                         // цвет
            this.x = x;                                                                 // координаты
            this.y = y;
        }

        draw() {                                                                        // отрисовать героя
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Gravity {                                                                     // класс для Гравитации
        #g = 9.8;                                                                       // ускорение свободного падения 

        impact(obj) {
            if (obj.y <= canva.height * 0.8 - obj.height) {
                let f = obj.weight / this.#g;
                obj.y += f;
            }

            if (obj.y > canva.height * 0.8 - obj.height) { obj.y = canva.height * 0.8 - obj.height; }
        }
    }

    // ! -----------------------------------------------------------

    let canva, ctx, background, hero, hero2, hero3, gravity;

    // ! -----------------------------------------------------------

    document.addEventListener("DOMContentLoaded", () => {                                           // загрузка страницы
        canva = new Canvas('.wrap', 'canvas', 800, 600);                                            // создать экземпляр холста для фона
        ctx = canva.draw();                                                                         // отрисовать холст для фона

        background = new Background();                                                              // создать экземпляр фона
        background.drawSky(0, 0, canva.width, canva.height * 0.8, '#0d90c4');                       // нарисовать небо
        background.drawLand(0, canva.height * 0.8, canva.width, canva.height * 0.2, '#0b8e32');     // нарисовать траву 

        hero = new Hero(10, 20, 20, 'orange', 40, 60);                                              // создать экземпляр героя
        hero.draw();                                                                                // отрисовать героя

        hero2 = new Hero(15, 30, 30, 'red', 240, 60);                                               // создать экземпляр героя №2
        hero2.draw();                                                                               // отрисовать героя №2

        hero3 = new Hero(20, 40, 40, 'yellow', 540, 60);                                            // создать экземпляр героя №3
        hero3.draw();                                                                               // отрисовать героя №3

        gravity = new Gravity();                                                                    // создать экземпляр гравитации

        executeLifeCycle();                                                                         // выполнить первый жизненный цикл                                       
    });

    // ! -----------------------------------------------------------    

    function executeLifeCycle() {                                                                   // выполнить жизненный цикл

        gravity.impact(hero);                                                                       // взаимодействие гравитации на героя
        gravity.impact(hero2);                                                                      // взаимодействие гравитации на героя №2
        gravity.impact(hero3);                                                                      // взаимодействие гравитации на героя №3

        ctx.clearRect(0, 0, canva.width, canva.height);                                             // очистка холста  
        background.drawSky(0, 0, canva.width, canva.height * 0.8, '#0d90c4');                       // нарисовать небо
        background.drawLand(0, canva.height * 0.8, canva.width, canva.height * 0.2, '#0b8e32');     // нарисовать траву  

        hero.draw();                                                                                // отрисовать героя         
        hero2.draw();                                                                               // отрисовать героя №2         
        hero3.draw();                                                                               // отрисовать героя №3         

        window.requestAnimationFrame(executeLifeCycle);                                             // выполнить жизненный цикл
    }
})();