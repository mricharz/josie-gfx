Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');
Josie.require('com.nysoft.josie.gfx.Canvas.Type');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.StrokeAndFillObject', {
	meta: {
		strokeColor: { type: 'string', defaultValue: '#000000' },
		strokeWidth: { type: 'number', defaultValue: 1 },
		fillColor: { type: 'string', defaultValue: '#ffffff' },
		type: { type: 'string', defaultValue: com.nysoft.josie.gfx.Canvas.Type.Fill }
	},
	
	applyStrokeSettings: function(oContext) {
		if(this.isStroked()) {
			oContext.lineWidth = this.getStrokeWidth();
			oContext.strokeStyle = this.getStrokeColor();
            oContext.stroke();
		}
	},
	
	applyFillSettings: function(oContext) {
		if(this.isFilled()) {
			oContext.fillStyle = this.getFillColor();
            oContext.fill();
		} else {
			oContext.fillStyle = null;
		}
	},
	
	isStroked: function() {
		return /(stroke)/i.test(this.getType());
	},
	
	isFilled: function() {
		return /(fill)/i.test(this.getType());
	}
});