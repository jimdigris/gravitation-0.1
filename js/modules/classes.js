'use strict';

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
        parent.append(element);                                                     // добавить в родителя
    }
    #receiveCanvas() { this.#element = document.querySelector(`#${this.id}`); }     // получить холст
    #defineCanvas() { this.#context = this.#element.getContext("2d"); }             // определить контекст    

    init() {                                                                        // инициализировать холст
        this.#createCanvas();                                                       // создать холст
        this.#receiveCanvas();                                                      // получить холст
        this.#defineCanvas();                                                       // определить контекст
        return this.#context;
    }
}

class Fon {                                                                         // класс для фона
    constructor(ctx) {
        this.ctx = ctx;                                                             // получить контекст (свой слой) для отрисовки
    }

    drawSky(x, y, width, height, color) {                                           // отрисовать небо
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawLand(x, y, width, height, color) {                                          // отрисовать землю
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
}

class Player {                                                                      // класс для Игрока
    direction = null;

    constructor(ctx, weight, width, height, color, step, jumpHeight, x, y) {
        this.ctx = ctx;                                                             // получить контекст (свой слой) для отрисовки
        this.weight = weight;                                                       // масса
        this.width = width;                                                         // ширина
        this.height = height;                                                       // высота
        this.color = color;                                                         // цвет
        this.step = step;                                                           // размер шага передвижения
        this.jumpHeight = jumpHeight;                                               // высота прыжка (шагов)
        this.x = x;                                                                 // координаты
        this.y = y;
    }

    draw() {                                                                        // отрисовать игрока
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    determineDirection(event) {                                                     // определить направление движения
        switch (event.code) {
            case 'KeyW': this.direction = 'up'; break;
            case 'KeyS': this.direction = 'down'; break;
            case 'KeyA': this.direction = 'left'; break;
            case 'KeyD': this.direction = 'right'; break;
        }
    }

    performMovement(landY) {                                                                                // изменение координат при движении
        switch (this.direction) {
            case 'up':                                                                                      // игрок подпрыгивает
                if (this.y + this.height == landY) { this.y -= this.step * this.jumpHeight; break; }        // подпрыгивать можно только с земли
                break;
            case 'down': this.y += this.step; break;
            case 'left': this.x -= this.step; break;
            case 'right': this.x += this.step; break;
        }
        this.direction = null;                                                                              // сбросить направление (прошлое нажатие кн)
    }
}

class Gravity {                                                                     // класс для Гравитации
    #g = 9.8;                                                                       // ускорение свободного падения 

    impact(obj, landY) {                                                            // воздействие гравитации на объект
        if (obj.y + obj.height < landY) {                                           // если нижняя точка игрока не на земле
            let f = obj.weight / this.#g;                                           // рассчитаем скорость притяжения
            obj.y += f;                                                             // выполним притяжение
        }
        if (obj.y + obj.height > landY) { obj.y = landY - obj.height; }             // чтобы игрок не проваливался ниже границы земли
    }
}