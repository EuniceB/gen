var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx, dy;
let xDest, yDest;
let ballRadius = 5;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHumans();
}

function drawHumans(){
	for(var key in families){
		let family = families[key];
		if(family.mom){
			drawHuman(family.mom);
		}
		if(family.dad){
			drawHuman(family.dad);
		}
		if(family.children.length>0){
			for(let c of family.children){
				drawHuman(c);
			}
		}
	}
}

function drawHuman(human){
	if(human.isChild()){
		ballRadius = 5;
	}else{
		ballRadius = 10;
	}
	ctx.beginPath();
	ctx.arc(human.x, human.y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = human.eyeColor=="BLUE"?"#99ccff":human.eyeColor=="BROWN"?"#996633":"#339966";
	ctx.fill();
	ctx.closePath();
	if(human.x==human.xDest && human.y==human.yDest){
		determineNextDestination(human);
		console.log("Next destination: ("+human.xDest+","+human.yDest+")");
	}
	let nextStep = determineNextStep(human);
	dx = nextStep.x;
	dy = nextStep.y;
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    	dx = -dx;
	}
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
	    dy = -dy;
	}
	human.x += dx;
	human.y += dy;
}

function determineNextDestination(human){
	human.xDest = Math.floor(Math.random() * (canvas.width + 1));
	human.yDest = Math.floor(Math.random() * (canvas.height + 1));
}

function determineNextStep(human){
	let nextX, nextY;
	if(human.xDest>human.x){
		nextX = Math.round(Math.random());
	}else if(human.xDest<human.x){
		nextX = Math.round(Math.random()*-1);
	}else{
		nextX = null;
	}

	if(human.yDest>human.y){
		nextY = Math.round(Math.random());
	}else if(human.yDest<human.y){
		nextY = Math.round(Math.random()*-1);
	}else{
		nextY = null;
	}
	return {x: nextX, y: nextY}
}

	
setInterval(draw, 20);