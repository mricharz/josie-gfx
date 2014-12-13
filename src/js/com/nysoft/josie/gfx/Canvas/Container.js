Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');
Josie.require('com.nysoft.josie.gfx.Canvas.Vector');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.Container', {
	
	meta: {
		content: { type: 'com.nysoft.josie.gfx.Canvas.CanvasObject[]', defaultValue: [] }
	},
	
	addObjects: function(oObject) {
		return this.getContent().push(oObject) - 1;
	},
	
	removeObjectByIndex: function(iIndex) {
		this.setContent(this.getContent().splice(iIndex, 1));
	},
	
	size: function() {
		return this.getContent().length;
	},
	
	render: function(canvas) {
		var oVector = this.getVector(),
			oRotation = this.getRotation();
		Josie.utils.each(this.getContent(), function(oObject) {
            oObject.setVector(oObject.getVector().add(oVector));
			//apply rotation
			var saveRotation = oObject.getRotation();
            oObject.addRotation(oRotation);
			//render
            oObject.render(canvas);
			//reset rotation
            oObject.setRotation(saveRotation);
			//reset vector
			oObject.setVector(oObject.getVector().substract(oVector));
		});
	}
	
});