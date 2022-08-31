var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth -25;
canvas.height = window.innerHeight - 25;
var ctx = canvas.getContext("2d");
var mouse = {
    x: undefined,
    y: undefined
}
const MAX_RADIUS = 40;
const MIN_RADIUS = 2;
var colorArray = ["#348888", "#22BABB", "#9EF8EE", "#FA7F08", "#F24405"];
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth - 25;
    canvas.height = window.innerHeight - 25;
    init();
});
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.MIN_RADIUS = radius;
    this.strokColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.fillColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.shadowColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.shadowColor = this.shadowColor;
        ctx.fillStyle = this.fillColor;
        ctx.fill();
    },
    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        // interactivity
        if((mouse.x - this.x < 50 && mouse.x - this.x > -50) && (mouse.y - this.y < 50 && mouse.y - this.y > -50)){
            if(this.radius < MAX_RADIUS){
                this.radius +=1;
            }
        }else if(this.radius > this.MIN_RADIUS){
            this.radius -= 1;
        }
        this.draw();
    }
}

var circleArray = [];
function init(){
    circleArray = [];
    for (let i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (window.innerWidth - radius * 2) + radius;
        var y = Math.random() * (window.innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 4;
        var dy = (Math.random() - 0.5) * 4;
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }
}
init();
animate();