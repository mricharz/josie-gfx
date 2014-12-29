Josie.require('com.nysoft.josie.gfx.Canvas.Square');

com.nysoft.josie.gfx.Canvas.Square.extend('com.nysoft.josie.gfx.Canvas.Rectangle', {
	meta: {
		height: { type: 'number', defaultValue: 10 }
	},

	render: function(canvas) {
		var oContext = canvas.getContext(),
            iWidth = this.getWidth(),
            iHeight = this.getHeight();
		
		oContext.save();
		this.applyRotation(oContext, iWidth, iHeight);
		oContext.beginPath();
		oContext.rect(this.getX(), this.getY(), iWidth, iHeight);
		oContext.closePath();

		this.applyStrokeSettings(oContext);
		this.applyFillSettings(oContext);

		oContext.restore();
        this.trigger('onAfterRendering', {canvas: canvas});
	}
});