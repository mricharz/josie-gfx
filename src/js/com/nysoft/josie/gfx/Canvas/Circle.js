jQuery.require('com.nysoft.josie.ui.Canvas.StrokeAndFillObject');

com.nysoft.josie.ui.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.ui.Canvas.Circle', {
	meta: {
		width: { type: 'number', defaultValue: 10 }
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector();
		oContext.save();
		oContext.beginPath();
		this.applyRotation(canvas, this.getWidth(), this.getWidth());
		oContext.arc(oVector.getX(), oVector.getY(), this.getWidth(), 0, 2 * Math.PI, false);
		
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
