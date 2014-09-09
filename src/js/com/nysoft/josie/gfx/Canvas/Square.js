jQuery.require('com.nysoft.josie.ui.Canvas.StrokeAndFillObject');

com.nysoft.josie.ui.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.ui.Canvas.Square', {
	meta: {
		width: { type: 'number', defaultValue: 10 }
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector();
		
		oContext.save();
		oContext.beginPath();
		this.applyRotation(canvas, this.getWidth(), this.getWidth());
		oContext.rect(oVector.getX(), oVector.getY(), this.getWidth(), this.getWidth());
		
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