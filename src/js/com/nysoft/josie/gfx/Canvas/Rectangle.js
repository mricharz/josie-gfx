Josie.require('com.nysoft.josie.gfx.Canvas.Square');

com.nysoft.josie.gfx.Canvas.Square.extend('com.nysoft.josie.gfx.Canvas.Rectangle', {
	meta: {
		height: { type: 'number', defaultValue: 10 }
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector(),
            iWidth = this.getWidth(),
            iHeight = this.getHeight();
		
		oContext.save();
		this.applyRotation(oContext, iWidth, iHeight);
		oContext.beginPath();
		oContext.rect(oVector.getX(), oVector.getY(), iWidth, iHeight);
		oContext.closePath();

		this.applyStrokeSettings(oContext);
		this.applyFillSettings(oContext);
		
		oContext.restore();
	}
});