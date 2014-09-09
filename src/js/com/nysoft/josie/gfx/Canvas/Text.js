jQuery.require('com.nysoft.josie.ui.Canvas.StrokeAndFillObject');
jQuery.require('com.nysoft.josie.ui.Canvas.Text.Style');
jQuery.require('com.nysoft.josie.ui.Canvas.Text.Baseline');

com.nysoft.josie.ui.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.ui.Canvas.Text', {
	meta: {
		text: { type: 'string', defaultValue: '' },
		fontFamily: { type: 'string', defaultValue: 'Open Sans' },
		fontSize: { type: 'number', defaultValue: 12 },
		fontStyle: { type: 'string', defaultValue: 'normal' },
		baseline: { type: 'string', defaultValue: com.nysoft.josie.ui.Canvas.Text.Baseline.Alphabetic }
	},
	
	_prepareFontString: function() {
		return this.getFontStyle() + ' ' + this.getFontSize() + 'px ' + this.getFontFamily();
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector(),
			sText = this.getText();
		oContext.save();
		var iMetric = oContext.measureText(sText);
		this.applyRotation(canvas, iMetric, this.getFontSize());
		oContext.font = this._prepareFontString();
		oContext.baseline = this.getBaseline();
		
		this.applyStrokeSettings(canvas);
		if(this.isStroked()) {
			oContext.strokeText(sText, oVector.getX(), oVector.getY());
		}
		
		this.applyFillSettings(canvas);
		if(this.isFilled()) {
			oContext.fillText(sText, oVector.getX(), oVector.getY());			
		}
		
		oContext.restore();
	}
});