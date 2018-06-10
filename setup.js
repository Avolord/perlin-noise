Animation(false);
function setup() {
	initPerlinNoise(hash_table(256));
	let stepsize = 0.01;
	let size = 1;
	let d = 10;
	for(let i=0;i<size;i+=stepsize) {
		for(let z=0;z<size;z+=stepsize) {
			let color = map(noise2D(i,z),-1,1,0,255);
			//let size = map(noise2D(i,0),-1,1,-50,50);
			Canvas.Rectangle(i/stepsize*d,z/stepsize*d,d,d,"fill",Math.floor(color));
			//Canvas.Dot(i/stepsize*d,400-size*d,"black");
		}
	}
}

function draw() {
}

function NoLoop() {
	Animation(false);
}
function Loop() {
	Animation(true);
}
function reload() {
	location.reload();
}


//Framerate
var before,now,fps;
before=Date.now();
fps=0;
requestAnimationFrame(
    function loop(){
        now=Date.now();
        fps=Math.round(1000/(now-before));
        before=now;
        requestAnimationFrame(loop);
				if(fps < 58) {
        document.getElementById("Count").innerHTML = fps;
			} else {
				document.getElementById("Count").innerHTML = 60;
			}
    }
 );
