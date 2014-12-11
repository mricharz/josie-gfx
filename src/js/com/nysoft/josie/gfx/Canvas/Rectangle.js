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
		oContext.beginPath();
		this.applyRotation(canvas, iWidth, iHeight);
		oContext.rect(oVector.getX(), oVector.getY(), iWidth, iHeight);
		
		this.applyStrokeSettings(canvas);
		if(this.isStroked()) {
			oContext.stroke();
		}
		
		this.applyFillSettings(canvas);
		if(this.isFilled()) {
			oContext.fill();
		}
		
		oContext.closePath();
		oContext.restore();
	}
});