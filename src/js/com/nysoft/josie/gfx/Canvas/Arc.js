Josie.require('com.nysoft.josie.gfx.Canvas.Circle');

com.nysoft.josie.gfx.Canvas.Circle.extend('com.nysoft.josie.gfx.Canvas.Arc', {
	meta: {
		beginDegrees: { type: 'number', defaultValue: 0 },
		endDegrees: { type: 'number', defaultValue: 0 }
	},

	setBeginDegrees: function(value) {
		if(typeof value === 'number') {
			this.setProperty('beginDegrees', Josie.utils.deg2rad(value));
		}
	},

	setEndDegrees: function(value) {
		if(typeof value === 'number') {
			this.setProperty('endDegrees', Josie.utils.deg2rad(value));
		}
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
            iWidth = this.getWidth();

		oContext.save();
		this.applyRotation(oContext, iWidth, iWidth);
		oContext.beginPath();
		oContext.arc(this.getX(), this.getY(), iWidth, this.getBeginDegrees(), this.getEndDegrees(), false);
		oContext.closePath();

		this.applyStrokeSettings(oContext);
		this.applyFillSettings(oContext);
		
		oContext.restore();
        this.trigger('onAfterRendering', {canvas: canvas});
	}
});