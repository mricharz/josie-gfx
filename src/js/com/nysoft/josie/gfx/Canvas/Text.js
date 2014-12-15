Josie.require('com.nysoft.josie.gfx.Canvas.StrokeAndFillObject');
Josie.require('com.nysoft.josie.gfx.Canvas.Text.Style');
Josie.require('com.nysoft.josie.gfx.Canvas.Text.Baseline');

com.nysoft.josie.gfx.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.gfx.Canvas.Text', {
	meta: {
		text: { type: 'string', defaultValue: '' },
		fontFamily: { type: 'string', defaultValue: 'Arial' },
		fontSize: { type: 'number', defaultValue: 12 },
		fontStyle: { type: 'string', defaultValue: 'normal' },
		baseline: { type: 'string', defaultValue: com.nysoft.josie.gfx.Canvas.Text.Baseline.Alphabetic }
	},

	_prepareFontString: function() {
		this.font = this.getFontStyle() + ' ' + this.getFontSize() + 'px ' + this.getFontFamily();
	},

	setFontStyle: function(value) {
		if(typeof value === 'string') {
			this.setProperty('fontStyle', value);
			this._prepareFontString();
		}
	},

	setFontFamily: function(value) {
		if(typeof value === 'string') {
			this.setProperty('fontFamily', value);
			this._prepareFontString();
		}
	},

	setFontSize: function(value) {
		if(typeof value === 'number') {
			this.setProperty('fontSize', value);
			this._prepareFontString();
		}
	},

	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector(),
			sText = this.getText();
		oContext.save();
		oContext.font = this.font;
        oContext.baseline = this.getBaseline();
        var iMetric = oContext.measureText(sText);
        this.applyRotation(oContext, iMetric, this.getFontSize());

		this.applyStrokeSettings(oContext, oVector, sText);
		this.applyFillSettings(oContext, oVector, sText);

		oContext.restore();
	},

	applyStrokeSettings: function(oContext, oVector, sText) {
		if(this.isStroked()) {
			oContext.lineWidth = this.getBorderWidth();
			oContext.strokeStyle = this.getBorderColor();
			oContext.strokeText(sText, oVector.getX(), oVector.getY());
		}
	},

	applyFillSettings: function(oContext, oVector, sText) {
		if(this.isFilled()) {
			oContext.fillStyle = this.getFillColor();
			oContext.fillText(sText, oVector.getX(), oVector.getY());
		} else {
			oContext.fillStyle = null;
		}
	}
});