var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// (x,y,width,height)
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 102, 1.0)';
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);

// // Line
// //move.to = x and y coordinates
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);//specifies where the line is going to
// c.lineTo(400, 300);
// c.strokeStyle ="#fa34a3"
// c.stroke();

// //Arc / Circle
// // c.beginPath();
// // c.arc(300, 300, 30, 0, Math.PI* 2, false);
// // c.strokeStyle = 'blue';
// // c.stroke(); 

// //create multiple circles using a 4 loop
// for (var i=0; i < 10; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;

//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI* 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
// }

//to get x & y values of the mouse
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

//color for the circles
var colorArray = ['#D31E30', '#005A6D', '#00A199', '#DCC8A6', '#DDE0DF'];

//EventListener--> function that is repeatedly fired as long as the event is happening on the screen 
//returning the x & y coordinates of the objects (circles)
window.addEventListener('mousemove', function() {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    })
    //whenver the browser is resized
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})


//creating another circle - using object  oriented JS  
//"this" is for all the extra circles  
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;

        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx; //velocity
        this.y += this.dy;

        //interactivity
        //determine distance between circle and mouse positioning
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }

}

var circleArray = [];

function init() {

    circleArray = [];
    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 6 + 1; //randomize circles radius
        var x = Math.random() * (innerWidth - radius * 4) + radius;
        var y = Math.random() * (innerHeight - radius * 4) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }




    // c.beginPath();
    // c.arc(x, y, 30, 0, Math.PI * 2, false);
    // c.strokeStyle = 'blue';
    // c.stroke();

    // if (x + radius > innerWidth || x - radius < 0) {
    //     dx = -dx;
    // }
    // if (y + radius > innerHeight || y - radius < 0) {
    //     dy = -dy;
    // }

    // x += dx; //velocity
    // y += dy;

}
init();
animate();