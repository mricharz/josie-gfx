jQuery.require('com.nysoft.josie.ui.Canvas.Square');

com.nysoft.josie.ui.Canvas.Square.extend('com.nysoft.josie.ui.Canvas.Rectangle', {
	meta: {
		height: { type: 'number', defaultValue: 10 }
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector();
		
		oContext.save();
		oContext.beginPath();
		this.applyRotation(canvas, this.getWidth(), this.getHeight());
		oContext.rect(oVector.getX(), oVector.getY(), this.getWidth(), this.getHeight());
		
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