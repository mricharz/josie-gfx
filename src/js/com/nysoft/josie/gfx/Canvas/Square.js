Josie.require('com.nysoft.josie.gfx.Canvas.StrokeAndFillObject');

com.nysoft.josie.gfx.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.gfx.Canvas.Square', {
	meta: {
		width: { type: 'number', defaultValue: 10 }
	},

	render: function(canvas) {
		var oContext = canvas.getContext(),
            iWidth = this.getWidth();

		oContext.save();

		this.applyRotation(oContext, iWidth, iWidth);
		oContext.beginPath();
		oContext.rect(this.getX(), this.getY(), iWidth, iWidth);
		oContext.closePath();

		this.applyStrokeSettings(oContext);
		this.applyFillSettings(oContext);

		oContext.restore();
        this.trigger('onAfterRendering', {canvas: canvas});
	}
});