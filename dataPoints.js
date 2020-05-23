class DataPoints {
	constructor() {
		this.points = []
		this.centroids = []
		this.running = false
		this.created = false
	}

	show() {
		noStroke()
		for (var i = 0; i < this.points.length; i++) {
			fill(255)
			if (this.points[i].cluster > -1) {
				fill(this.centroids[this.points[i].cluster].color)
				stroke(	this.centroids[this.points[i].cluster].color )
				line(	this.points[i].pos.x, 
						this.points[i].pos.y, 
						this.centroids[this.points[i].cluster].pos.x, 
						this.centroids[this.points[i].cluster].pos.y)
			}
			noStroke();
			ellipse(this.points[i].pos.x, this.points[i].pos.y, 5)
		}
		for (var i = 0; i < this.centroids.length; i++) {
			stroke(this.centroids[i].color)
			fill(0);
			ellipse(this.centroids[i].pos.x, this.centroids[i].pos.y, 10)
		}
	}

	cluster() {
		for (let i = 0; i < this.points.length; i++) {
			let minimum = Infinity
			for (let j = 0; j < this.centroids.length; j++) {
				let sqDist = sqrDist(this.points[i].pos, this.centroids[j].pos)
				console.log(j, sqDist, minimum)
				if (sqDist < minimum) {
					minimum = sqDist	
					this.points[i].cluster = this.centroids[j].cluster
				}
			}
		}
		for (var i = 0; i < this.centroids.length; i++) {
			let x = 0, y = 0, l = 0
			for (var j = 0; j < this.points.length; j++) {
				if (this.points[j].cluster == i) {
					x += this.points[j].pos.x
					y += this.points[j].pos.y
					++l
				}
			}
			this.centroids[i].pos = createVector(x / l, y / l);
		}
	}
}