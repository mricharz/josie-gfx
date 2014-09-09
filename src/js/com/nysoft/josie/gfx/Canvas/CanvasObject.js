jQuery.require('com.nysoft.josie.core.BaseObject');
jQuery.require('com.nysoft.josie.ui.Canvas.Vector');

com.nysoft.josie.core.BaseObject.extend('com.nysoft.josie.ui.Canvas.CanvasObject', {
	meta: {
		id: 'string',
		vector: { type: 'object', defaultValue: new com.nysoft.josie.ui.Canvas.Vector(0, 0) },
		rotation: { type: 'number', defaultValue: 0 },
		rotationPoint: { type: 'object', defaultValue: null }
	},
	
	init: function(options) {
		this.setProperties(options);
	},
	
	addRotation: function(value) {
		if(typeof value == 'number') {
			this.setProperty('rotation', this.getProperty('rotation') + value);
		}
	},
	
	moveToVector: function(canvas) {
		var oVector = this.getVector();
		canvas.getContext().moveTo(oVector.getX(), oVector.getY());
	},
	
	applyRotation: function(canvas, width, height) {
		var oContext = canvas.getContext(),
			oRotationPoint = this.getRotationPoint(),
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
		oContext.rotate(jQuery.utils.deg2rad(this.getRotation()));
		oContext.translate(-tx, -ty);
	},
	
	render: function() {},
	
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