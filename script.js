function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	ellipseMode(CENTER)
	data = new DataPoints()
}

let data;

function draw() {
	background(51);
	let x = 50, y = 50
	while(x < width) {
		stroke(255, 50);
		strokeWeight(1)
		line(x, 0, x, height);
		x += 50;
	}
	while(y < height) {
		stroke(255, 50);
		strokeWeight(1)
		line(0, y, width, y);
		y += 50;
	}
	if (data.running) {
		data.cluster();
		
	}
	data.show();
}

function sqrDist(a, b) {
	return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
}

function mousePressed() {
	if (mouseY > 100) {
		data.points.push({pos: createVector(mouseX, mouseY), cluster: -1});
	}
}

function reset() {
	data = new DataPoints();
}

function recolor() {
	for (var i = 0; i < data.centroids.length; i++) {
		data.centroids[i].color = color(random(255), random(255), random(255))
	}
}

function addRandom() {
	for (var i = 0; i < 100; i++) {
		data.points.push({
			pos: createVector(random(width), random(100, height)),
			cluster: -1
		})	
	}
}

function shuffl() {
	if (!data.created) {
		let c = document.getElementById('centroids').value
		data.centroids = [];
		for (let i = 0; i < c; i++) {
			data.centroids.push({
				pos: createVector(random(width), random(100, height)),
				cluster: i,
				color: color(random(255), random(255), random(255))
			});
		}
		data.created = true
	} else {
		for (let i = 0; i < data.centroids.length; i++) {
			data.centroids[i].pos =  createVector(random(width), random(100, height))
		}	
	}

}

function begin() {
	data.running = true;
}