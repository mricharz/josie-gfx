Josie.require('com.nysoft.josie.gfx.Canvas.StrokeAndFillObject');

com.nysoft.josie.gfx.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.gfx.Canvas.Circle', {
	meta: {
		width: { type: 'number', defaultValue: 10 }
	},

	render: function(canvas) {
		var oContext = canvas.getContext(),
            iWidth = this.getWidth();

		oContext.save();
		this.applyRotation(oContext, iWidth, iWidth);
		oContext.beginPath();
        // 6.283185307179586 = 2 * Math.PI
		oContext.arc(this.getX(), this.getY(), iWidth, 0, 6.283185307179586, false);
		oContext.closePath();

		this.applyStrokeSettings(oContext);
		this.applyFillSettings(oContext);
		
		oContext.restore();
        this.trigger('onAfterRendering', {canvas: canvas});
    }
});
