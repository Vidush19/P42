class Drops{
    constructor(x,y){
        var options = {
            isStatic: false,
            friction: 0.001,
            restitution: 0.1,
            density: 1
        }
        this.rain = Bodies.circle(x,y,5,options);
        this.rain.position.x = x;
        this.rain.position.y = y;
        this.radius = 5;
        World.add(world, this.rain);
    }
    update(){
        if(this.rain.position.y > height){
            Matter.Body.setPosition(this.rain, {x:random(0,400), y:random(0,400)});
        }
    }
    showDrop(){
        ellipseMode(RADIUS);
        fill("#13699F");
        ellipse(this.rain.position.x,this.rain.position.y,this.radius,this.radius);
    }
    error(){
        console.log("Hi I am there!");
    }
}