Josie.require('com.nysoft.josie.core.ManagedObject');

com.nysoft.josie.core.ManagedObject.extend('com.nysoft.josie.gfx.Canvas.Vector', {

	setProperties: function() {
		debugger;
	},

	add: function(vector) {
		this.x = this.x+vector.getX();
		this.y = this.y+vector.getY();
		return this;
	},

	substract: function(vector) {
		this.x = this.x-vector.getX();
		this.y = this.y-vector.getY();
		return this;
	},

	multiply: function(vector) {
		this.x = this.x*vector.getX();
		this.y = this.y*vector.getY();
		return this;
	},

	length: function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	},

	dotProduct: function(vector) {
		return (this.x * vector.getX() + this.y * vector.getY());
	},

	angle: function() {
		return -Math.atan(-this.y / this.x);
	},

	rotate: function(centerVector, iDeg) {
		//substract center
		this.substract(centerVector);
		//get length
		var iLength = this.length();
		//get angle
		var iAngle = this.angle();
		//change angle
		iAngle += Josie.utils.deg2rad(iDeg);
		//polar to cartesian
		this.x = iLength * Math.cos(iAngle);
		this.y = iLength * Math.sin(iAngle);
		return this.add(centerVector);
	},

	normalize: function() {
		var iLength = this.length();
		this.x = this.x / iLength;
		this.y = this.y / iLength;
	},

	getX: function() {
		return this.x;
	},

	setX: function(value) {
		if(typeof value === 'number') {
			this.x = value;
		}
	},

	getY: function() {
		return this.y;
	},

	setY: function(value) {
		if(typeof value === 'number') {
			this.y = value;
		}
	},

	init: function(x, y) {
		if(x !== undefined && x.length) {
			if(jQuery.isPlainObject(x)) {
				this.setX(x.x);
				this.setY(x.y);
			} else {
				this.setX(x[0]);
				this.setY(x[1]);
			}
		}
		if(x !== undefined && y !== undefined) {
			this.setX(x);
			this.setY(y);
		}
	},

	toArray: function() {
		return [this.x, this.y];
	},

	toPlainObject: function() {
		return {
			x: this.x,
			y: this.y
		};
	},

	__toString: function() {
		return "[" +
			this.x + "," +
			this.y +
			"]";
	}

});