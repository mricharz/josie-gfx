jQuery.require('com.nysoft.josie.ui.Canvas.StrokeAndFillObject');

com.nysoft.josie.ui.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.ui.Canvas.Polygon', {
	meta: {
		numberOfSides: { type: 'number', defaultValue: 3 },
		size: { type: 'number', defaultValue: 10 }
	},
	
	render: function(canvas) {
		var oContext =  canvas.getContext(),
			oVector = this.getVector(),
			iSize = this.getSize(),
			iNumberOfSides = this.getNumberOfSides(),
			sinZero = 0,
			cosZero = 0;
			
		oContext.save();
		oContext.beginPath();
		this.applyRotation(canvas, iSize, iSize);
		
		//go to first edge
		oContext.moveTo(oVector.getX() + iSize * cosZero, oVector.getY() + iSize * sinZero);          

		//draw rest of the edges
		for (var i = 1; i <= iNumberOfSides; i++) {
			var preCalculation = i * 2 * Math.PI / iNumberOfSides;
			oContext.lineTo(oVector.getX() + iSize * Math.cos(preCalculation), oVector.getY() + iSize * Math.sin(preCalculation));
		}
		
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