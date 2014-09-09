jQuery.require('com.nysoft.josie.ui.Canvas.Circle');

com.nysoft.josie.ui.Canvas.Circle.extend('com.nysoft.josie.ui.Canvas.Arc', {
	meta: {
		beginDegrees: { type: 'number', defaultValue: 0 },
		endDegrees: { type: 'number', defaultValue: 0 }
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector();
		oContext.save();
		oContext.beginPath();
		this.applyRotation(canvas, this.getWidth(), this.getWidth());
		oContext.arc(oVector.getX(), oVector.getY(), this.getWidth(), jQuery.utils.deg2rad(this.getBeginDegrees()), jQuery.utils.deg2rad(this.getEndDegrees()), false);
		
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