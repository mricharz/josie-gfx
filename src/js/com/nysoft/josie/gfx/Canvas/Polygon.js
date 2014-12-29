Josie.require('com.nysoft.josie.gfx.Canvas.StrokeAndFillObject');

com.nysoft.josie.gfx.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.gfx.Canvas.Polygon', {
	meta: {
		numberOfSides: { type: 'number', defaultValue: 3 },
		size: { type: 'number', defaultValue: 10 }
	},
	
	render: function(canvas) {
		var oContext =  canvas.getContext(),
            iX = this.getX(),
            iY = this.getY(),
			iSize = this.getSize(),
			iNumberOfSides = this.getNumberOfSides();

		oContext.save();
        this.applyRotation(oContext, iSize, iSize);
		oContext.beginPath();

        //go to first edge
        oContext.moveTo(iX + iSize * 1, iY + iSize * 0);

		//draw rest of the edges
		for (var i = 0; i <= iNumberOfSides; i++) {
            //6.283185307179586 = 2 * Math.PI
			var preCalculation = i * 6.283185307179586 / iNumberOfSides,
                x = iX + iSize * Math.cos(preCalculation),
                y = iY + iSize * Math.sin(preCalculation);
			oContext.lineTo(x, y);
		}
        oContext.closePath();

		this.applyStrokeSettings(oContext);
		this.applyFillSettings(oContext);

		oContext.restore();
        this.trigger('onAfterRendering', {canvas: canvas});
	}
});