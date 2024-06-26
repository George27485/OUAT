let currentDirection = 'down'
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


//test line for commit
canvas.width = 1120;
canvas.height = 640;

const collisionsMap = [];
for(let i = 0; i < collisions.length;i+=70){
    collisionsMap.push(collisions.slice(i,70+i))

}

class Boundary{
    static width = 16
    static height = 16
    constructor({position}){
        this.position = position
        this.width = 16
        this.height = 16
    }

    draw(){
        c.fillStyle = 'rgba(255,0,0,255)'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}



const boundaries = []
const offset = {
    x:0,
    y:0
}

const xOffset = 0; 
const yOffset = 0;  

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 132) {
            const boundaryX = j * Boundary.width + offset.x + xOffset;
            const boundaryY = i * Boundary.height + offset.y + yOffset;
            boundaries.push(new Boundary({ position: { x: boundaryX, y: boundaryY } }));
        }
    });
});


c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './imgs/ouat2.png';
console.log(image)
const playerUpImage = new Image()
playerUpImage.src = './imgs/WalkUpp.png';
const playerDownImage = new Image()
playerDownImage.src = './imgs/WalkFrontt.png';

const playerLeftImage = new Image();
playerLeftImage.src = './imgs/WalkLeftt.png';

const playerRightImage = new Image();
playerRightImage.src = './imgs/WalkRightt.png';
const idleFront = new Image()
idleFront.src = './imgs/IdleFrontt.png';
const idleRight = new Image()
idleRight.src = './imgs/IdleRight.png'
const idleBack = new Image();
idleBack.src = './imgs/IdleBackk.png'
const idleLeft = new Image();
 idleLeft.src = './imgs/IdleLeftt.png'
 const swordDown = new Image();
 swordDown.src='./imgs/SwordFront.png'
const swordRight = new Image();
swordRight.src = './imgs/SwordRightt.png'
const swordLeft = new Image();
swordLeft.src = './imgs/SwordLeftt.png'
const swordUp = new Image();
swordUp.src = './imgs/SwordUpp.png'


 
class Sprite {
    constructor({ position, image ,frames={max:1}, sprites}) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload =()=> {
        this.width = this.image.width / this.frames.max
        this.height = this.image.height
        }
        this.moving = false
        this.sprites= sprites
    }

    draw() {
        const frameWidth = this.image.width / this.frames.max;
        const frameHeight = this.image.height;

        const scaledWidth = frameWidth * 1;  
        const scaledHeight = frameHeight * 1;  

       
        if (this === player) {
            c.drawImage(
                this.image,
                this.frames.val * frameWidth,
                0,
                frameWidth,
                frameHeight,
                this.position.x,
                this.position.y,
                scaledWidth,  
                scaledHeight  
            );
        } else {
           
            c.drawImage(
                this.image,
                this.frames.val * frameWidth,
                0,
                frameWidth,
                frameHeight,
                this.position.x,
                this.position.y,
                frameWidth,
                frameHeight
            );
        }

        if (!this.moving) return;

        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }
        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}
            

            let walkingFrames = 6;
            let swordDownandUpFrames = 4;
            let deathFrames = 3
            let sworLandRFrames = 4;
            
const player = new Sprite({
    position:{
        x:canvas.width / 2 - 76 / 2,

        y:canvas.height / 2 - 23 /4/ 2
    },
   image: idleFront,
   frames: {
    max: walkingFrames,
   },
   sprites:{
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
    idleF: idleFront,
    idleR: idleRight,
    idleB: idleBack,
    idleL: idleLeft,
    swordD: swordDown,
    swordR: swordRight,
    swordL: swordLeft,
    swordU: swordUp,

   },
   
})



const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image,

});

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
    j: {
        pressed: false

    }
}


const movables = [background, ...boundaries]

function rectangularCollision({ rectangle1, rectangle2, padding = 0 }) {
    return (
        rectangle1.position.x + rectangle1.width - padding >= rectangle2.position.x &&
        rectangle1.position.x + padding <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + padding <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height - padding >= rectangle2.position.y
    );
}
function animate() {
    
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });
    player.draw();

    
    let movingUp = true; 
    let movingDown = true;
    let movingLeft = true; 
    let movingRight = true;

    player.moving = true;

    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up




        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3 
                        },
                    },
                    
                  padding: 0
                })
            ) {
                console.log('Colliding with top boundary');
                movingUp = false;
                break;
            }
        }

        if (movingUp) {
            movables.forEach((movable) => {
                movable.position.y += 3;
            });
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        player.image = player.sprites.left;
        player.moving = true;
    
       
    

    
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y,
                        },
                    },
                 
                })
            ) {
                console.log('Colliding with left boundary');
                movingLeft = false;
                break;
            }
        }

        if (movingLeft) {
            movables.forEach((movable) => {
                movable.position.x += 3;
            });
        }
    } else if (keys.s.pressed && lastKey === 's') {
       
        player.moving = true
        player.image = player.sprites.down




        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3,
                        },
                    },
                    
                })
            ) {
                console.log('Colliding with bottom boundary');
                movingDown = false;
                break;
            }
        }

        if (movingDown) {
            movables.forEach((movable) => {
                movable.position.y -= 3;
            });
        }
    } else if (keys.d.pressed && lastKey === 'd') {
       
        
            player.image = player.sprites.right;
            player.moving = true;
            




        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y,
                        },
                    },
                    
                })
            ) {
                console.log('Colliding with right boundary');
                movingRight = false;
                break;
            }
        }

        if (movingRight) {
            movables.forEach((movable) => {
                movable.position.x -= 3;
            });
        }
    }

    /*if(keys.j.pressed && currentDirection === 'down'){
       player.frames.max = swordDownandUpFrames;
        player.image = player.sprites.swordD;
        player.moving = true;
       

        
        
        setTimeout(() => {
            player.frames.max = walkingFrames;
            player.image = player.sprites.idleF;
           
        }, 500); 
    }

    if(keys.j.pressed && currentDirection === 'right'){
        player.frames.max = sworLandRFrames;
        player.image = player.sprites.swordR;
        player.moving = true;
  
        setTimeout(() => {
            player.frames.max = walkingFrames;
            player.image = player.sprites.idleR;
           
        }, 500); 
    }

    if(keys.j.pressed && currentDirection === 'left'){
        player.frames.max = sworLandRFrames;
        player.image = player.sprites.swordL;
        player.moving = true;
  
        setTimeout(() => {
            player.frames.max = walkingFrames;
            player.image = player.sprites.idleL;
           
        }, 500); 
    }

    if(keys.j.pressed && currentDirection === 'up'){
        player.frames.max = swordDownandUpFrames;
        player.image = player.sprites.swordU;
        player.moving = true;
  
        setTimeout(() => {
            player.frames.max = walkingFrames;
            player.image = player.sprites.idleB;
           
        }, 500); 
    } */
    }



   

animate();

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            currentDirection = 'up'
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true
            currentDirection = 'left'
            lastKey = 'a'
            break;
        case 's':
            keys.s.pressed = true;
            currentDirection = 'down'
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true;
            currentDirection = 'right'
            lastKey = 'd'
            break;
            case 'j':
                keys.j.pressed = true;
                lastKey = 'j'
                break;
            
    }
});

    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = false;
                player.image = player.sprites.idleB
                currentDirection = 'up'
                break;
            case 'a':
                keys.a.pressed = false
                player.image = player.sprites.idleL
                currentDirection = 'left'
                break;
            case 's':
                keys.s.pressed = false;
                player.image = player.sprites.idleF
                currentDirection = 'down'
                break;
            case 'd':
                keys.d.pressed = false;
                player.image = player.sprites.idleR
                currentDirection = 'right'
                break;
             case 'j':
                keys.j.pressed = false;
               
             break;
                
        }
});
