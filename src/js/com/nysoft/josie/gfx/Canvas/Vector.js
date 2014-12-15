Josie.require('com.nysoft.josie.core.ManagedObject');

com.nysoft.josie.core.ManagedObject.extend('com.nysoft.josie.gfx.Canvas.Vector', {
	meta: {
		x: { type: 'number', defaultValue: 0 },
		y: { type: 'number', defaultValue: 0 }
	},
	
	add: function(vector) {
		this.setX(this.getX()+vector.getX());
		this.setY(this.getY()+vector.getY());
		return this;
	},
	
	substract: function(vector) {
		this.setX(this.getX()-vector.getX());
		this.setY(this.getY()-vector.getY());
		return this;
	},
	
	multiply: function(vector) {
		this.setX(this.getX()*vector.getX());
		this.setY(this.getY()*vector.getY());
		return this;
	},
	
	length: function() {
		return Math.sqrt((this.getX() * this.getX()) + (this.getY() * this.getY()));
	},
	
	dotProduct: function(vector) {
		return (this.getX() * vector.getX() + this.getY() * vector.getY());
	},
	
	angle: function() {
		return -Math.atan(-this.getY() / this.getX());
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
		this.setX(iLength * Math.cos(iAngle));
		this.setY(iLength * Math.sin(iAngle));
		return this.add(centerVector);
	},
	
	normalize: function() {
		var iLength = this.length();
        this.setX(this.getX() / iLength);
        this.setY(this.getY() / iLength);
	},
	
	setX: function(value) {
		if(typeof value === 'number') {
			this.setProperty('x', value);
		}
	},
	
	setY: function(value) {
		if(typeof value === 'number') {
			this.setProperty('y', value);
		}
	},
	
	init: function(x, y) {
		if(x !== undefined && x.length) {
			if(jQuery.isPlainObject(x)) {
				this.setX(x.x);
				this.setX(x.y);
			} else {
				this.setX(x[0]);
				this.setX(x[1]);
			}
		}
		if(x !== undefined && y !== undefined) {
			this.setX(x);
			this.setY(y);
		}
	},
	
	toArray: function() {
		return [this.getX(), this.getY()];
	},
	
	toPlainObject: function() {
		return {
			x: this.getX(),
			y: this.getY()
		};
	},
	
	__toString: function() {
		return "[" + 
			this.getX() + "," + 
			this.getY() + 
		"]";
	}
});