Josie.require('com.nysoft.josie.gfx.Canvas.StrokeAndFillObject');

com.nysoft.josie.gfx.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.gfx.Canvas.Polygon', {
	meta: {
		numberOfSides: { type: 'number', defaultValue: 3 },
		size: { type: 'number', defaultValue: 10 }
	},
	
	render: function(canvas) {
		var oContext =  canvas.getContext(),
			oVector = this.getVector(),
            iX = oVector.getX(),
            iY = oVector.getY(),
			iSize = this.getSize(),
			iNumberOfSides = this.getNumberOfSides();

		oContext.save();
		oContext.beginPath();
		this.applyRotation(canvas, iSize, iSize);

        //go to first edge
        oContext.moveTo(iX + iSize * 1, iY + iSize * 0);

		//draw rest of the edges
		for (var i = 0; i <= iNumberOfSides; i++) {
			var preCalculation = i * 2 * Math.PI / iNumberOfSides,
                x = iX + iSize * Math.cos(preCalculation),
                y = iY + iSize * Math.sin(preCalculation);
			oContext.lineTo(x, y);
		}

		this.applyStrokeSettings(oContext);
		this.applyFillSettings(oContext);
		
		oContext.closePath();
		oContext.restore();
	}
});