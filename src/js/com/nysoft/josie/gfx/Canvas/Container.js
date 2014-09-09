jQuery.require('com.nysoft.josie.core.BaseObject');
jQuery.require('com.nysoft.josie.ui.Canvas.Vector');

com.nysoft.josie.ui.Canvas.CanvasObject.extend('com.nysoft.josie.ui.Canvas.Container', {
	
	meta: {
		objects: { type: 'object', defaultValue: [] }
	},
	
	addObjects: function(oObject) {
		return this.getObjects().push(oObject) - 1;
	},
	
	removeObjectByIndex: function(iIndex) {
		this.setObjects(this.getObjects().splice(iIndex, 1));
	},
	
	size: function() {
		return this.getObjects().length;
	},
	
	render: function(canvas) {
		var oVector = this.getVector(),
			containerVector = oVector.toPlainObject(),
			containerRotation = this.getProperty('rotation');
		jQuery.each(this.getObjects(), function() {
			var saveVector = oVector.toPlainObject();
			//apply vector
			oVector.setX(saveVector.x+containerVector.x);
			oVector.setY(saveVector.y+containerVector.y);
			//apply rotation
			var saveRotation = this.getProperty('rotation');
			this.addRotation(containerRotation);
			//render
			this.render(canvas);
			//reset rotation
			this.setProperty('rotation', saveRotation);
			//reset vector
			oVector.setX(saveVector.x);
			oVector.setY(saveVector.y);
		});
	}
	
});