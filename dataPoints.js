class DataPoints {
	constructor() {
		this.points = []
		this.centroids = []
		this.running = false
		this.created = false
	}

	show() {
		noStroke()
		// translate(width / 2, height / 2)
		for (var i = 0; i < this.points.length; i++) {
			fill(255)
			if (this.points[i].cluster > -1) {
				fill(this.centroids[this.points[i].cluster].color)
				stroke(	this.centroids[this.points[i].cluster].color.levels[0],
						this.centroids[this.points[i].cluster].color.levels[1],
						this.centroids[this.points[i].cluster].color.levels[2],
						100)
				line(	this.points[i].pos.x, 
						this.points[i].pos.y, 
						this.centroids[this.points[i].cluster].pos.x, 
						this.centroids[this.points[i].cluster].pos.y)
				noStroke();
			}
			ellipse(this.points[i].pos.x, this.points[i].pos.y, 5)
		}
		for (var i = 0; i < this.centroids.length; i++) {
			stroke(this.centroids[i].color)
			fill(0);
			ellipse(this.centroids[i].pos.x, this.centroids[i].pos.y, 10)
		}
	}

	cluster() {
		// assign each point in dataset to a cluster
		for (var i = 0; i < this.points.length; i++) {
			let min = Infinity
			for (var j = 0; j < this.centroids.length; j++) {
				let sqDist = sqrDist(this.points[i].pos, this.centroids[j].pos)
				if (sqDist < min) {
					min = sqrDist	
					this.points[i].cluster = j
				}
			}
		}
		// reassign centroid position
		for (var i = 0; i < this.centroids.length; i++) {
			let x = 0, y = 0, l = 0
			for (var j = 0; j < this.points.length; j++) {
				if (this.points[j].cluster == i) {
					// console.log(1)
					x += this.points[j].pos.x
					y += this.points[j].pos.y
					++l
				}
			}
			// console.log(x / l, y / l)
			this.centroids[i].pos = createVector(x / l, y / l);
		}
	}
}