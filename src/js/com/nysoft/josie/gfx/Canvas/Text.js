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

	prepare: function() {
		this.font = this.getFontStyle() + ' ' + this.getFontSize() + 'px ' + this.getFontFamily();
	},

	setFontStyle: function(value) {
		if(typeof value === 'string') {
			this.setProperty('fontStyle', value);
			this.update();
		}
	},

	setFontFamily: function(value) {
		if(typeof value === 'string') {
			this.setProperty('fontFamily', value);
			this.update();
		}
	},

	setFontSize: function(value) {
		if(typeof value === 'number') {
			this.setProperty('fontSize', value);
			this.update();
		}
	},

	render: function(canvas) {
		var oContext = canvas.getContext(),
			sText = this.getText(),
            sBaseline = this.getBaseline();
		oContext.save();
        if(oContext.font != this.font || oContext.baseline != sBaseline || !this.metric) {
            oContext.font = this.font;
            oContext.baseline = sBaseline;
            this.metric = oContext.measureText(sText);
        }
        this.applyRotation(oContext, this.metric, this.getFontSize());

		this.applyStrokeSettings(oContext, sText);
		this.applyFillSettings(oContext, sText);

		oContext.restore();
        this.trigger('onAfterRendering', {canvas: canvas});
	},

	applyStrokeSettings: function(oContext, sText) {
		if(this.isStroked()) {
			oContext.lineWidth = this.getStrokeWidth();
			oContext.strokeStyle = this.getStrokeColor();
			oContext.strokeText(sText, this.getX(), this.getY());
		}
	},

	applyFillSettings: function(oContext, sText) {
		if(this.isFilled()) {
			oContext.fillStyle = this.getFillColor();
			oContext.fillText(sText, this.getX(), this.getY());
		} else {
			oContext.fillStyle = null;
		}
	}
});