Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');
Josie.require('com.nysoft.josie.gfx.Canvas.Vector');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.Container', {

	meta: {
		content: { type: 'com.nysoft.josie.gfx.Canvas.CanvasObject[]', defaultValue: [] }
	},

	addObjects: function(oObject) {
		return this.getContent().push(oObject) - 1;
	},

	size: function() {
		return this.getContent().length;
	},

	render: function(canvas) {
		var oVector = this.getVector(),
			iRotation = this.getRotation();
		Josie.utils.each(this.getContent(), function(oObject) {
			oObject.getVector().add(oVector);
			//apply rotation
			oObject.addRotation(iRotation);
			//render
			oObject.render(canvas);
			//reset rotation
			oObject.substractRotation(iRotation);
			//reset vector
			oObject.getVector().substract(oVector);
		});
	}

});