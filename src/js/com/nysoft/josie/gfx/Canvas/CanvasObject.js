Josie.require('com.nysoft.josie.core.BaseObject');
Josie.require('com.nysoft.josie.gfx.Canvas.Vector');

com.nysoft.josie.core.ManagedObject.extend('com.nysoft.josie.gfx.Canvas.CanvasObject', {
	meta: {
		id: 'string',
		vector: { type: 'com.nysoft.josie.gfx.Canvas.Vector', defaultValue: new com.nysoft.josie.gfx.Canvas.Vector(0, 0) },
        x: 'number',
        y: 'number',
		rotation: { type: 'number', defaultValue: 0 },
		rotationPoint: { type: 'com.nysoft.josie.gfx.Canvas.Vector', defaultValue: null }
	},

    getX: function() {
        return this.getVector().getX();
    },

    getY: function() {
        return this.getVector().getY();
    },

    setX: function(value) {
        if(typeof value === 'number') {
            this.getVector().setX(value);
        }
    },

    setY: function(value) {
        if(typeof value === 'number') {
            this.getVector().setY(value);
        }
    },
	
	addRotation: function(value) {
		if(typeof value == 'number') {
			this.setProperty('rotation', this.getProperty('rotation') + value);
		}
	},

	substractRotation: function(value) {
		if(typeof value == 'number') {
			this.setProperty('rotation', this.getProperty('rotation') - value);
		}
	},
	
	moveToVector: function(canvas) {
		var oVector = this.getVector();
		canvas.getContext().moveTo(oVector.getX(), oVector.getY());
	},
	
	applyRotation: function(oContext, width, height) {
		var oRotationPoint = this.getRotationPoint(),
			oVector = this.getVector(),
			tx = 0,
			ty = 0;
		
		if(oRotationPoint) {
			tx = oRotationPoint.getX();
			ty = oRotationPoint.getY();
		} else {
			tx = oVector.getX()+width/2;
			ty = oVector.getY()+height/2;
		}
		oContext.translate(tx, ty);
		oContext.rotate(Josie.utils.deg2rad(this.getRotation()));
		oContext.translate(-tx, -ty);
	},
	
	render: function(canvas, index) {},
	
	animate: function(canvas, callback) {
		if(jQuery.isFunction(callback)) {
			callback.call(this);
		}
		canvas.animate(jQuery.proxy(this.animate, this));

		return {
			stop: function() {},
			start: function() {}
		}
	}
});