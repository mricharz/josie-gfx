Josie.require('com.nysoft.josie.gfx.Canvas.Circle');

com.nysoft.josie.gfx.Canvas.Circle.extend('com.nysoft.josie.gfx.Canvas.Arc', {
	meta: {
		beginDegrees: { type: 'number', defaultValue: 0 },
		endDegrees: { type: 'number', defaultValue: 0 }
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector(),
            iWidth = this.getWidth();

		oContext.save();
		oContext.beginPath();
		this.applyRotation(canvas, iWidth, iWidth);
		oContext.arc(oVector.getX(), oVector.getY(), iWidth, Josie.utils.deg2rad(this.getBeginDegrees()), Josie.utils.deg2rad(this.getEndDegrees()), false);
		
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