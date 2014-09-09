jQuery.require('com.nysoft.josie.core.BaseObject');

com.nysoft.josie.core.BaseObject.extend('com.nysoft.josie.ui.Canvas.Vector', {
	meta: {
		x: { type: 'number', defaultValue: 0 },
		y: { type: 'number', defaultValue: 0 }
	},
	
	add: function(vector) {
		return new com.nysoft.josie.ui.Canvas.Vector(
				this.getX()+vector.getX(),
				this.getY()+vector.getY()
				);
	},
	
	substract: function(vector) {
		return new com.nysoft.josie.ui.Canvas.Vector(
				this.getX()-vector.getX(),
				this.getY()-vector.getY()
				);
	},
	
	multiply: function(vector) {
		return new com.nysoft.josie.ui.Canvas.Vector(
				this.getX()*vector.getX(),
				this.getY()*vector.getY()
				);
	},
	
	length: function() {
		return Math.sqrt((this.getX() * this.getX()) + (this.getY() * this.getY()));
	},
	
	dotProduct: function(vector) {
		return (this.getX() * vector.getX() + this.getY() * vector.getY());
	},
	
	angle: function() {
		 return -Math.atan2(-this.getY(), this.getX());
	},
	
	rotate: function(centerVector, iDeg) {
		//substract center
		divV = this.substract(centerVector);
		//get length
		var iLength = divV.length();
		//get angle
		var iAngle = divV.angle();
		//change angle
		iAngle += jQuery.utils.deg2rad(iDeg);
		//polar to cartesian
		newVect = new com.nysoft.josie.ui.Canvas.Vector(
			iLength * Math.cos(iAngle),
			iLength * Math.sin(iAngle)
		);
		//add center and return
		return newVect.add(centerVector);
	},
	
	normalize: function() {
		var iLength = this.length();
        this.setX(this.getX() / iLength);
        this.setY(this.getY() / iLength);
	},
	
	setX: function(value) {
		if(typeof value === 'string') {
			value = parseInt(value, 10);
		}
		if(typeof value === 'number') {
			this.setProperty('x', value);
		}
	},
	
	setY: function(value) {
		if(typeof value === 'string') {
			value = parseInt(value, 10);
		}
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