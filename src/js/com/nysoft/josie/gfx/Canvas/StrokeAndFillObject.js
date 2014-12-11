Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');
Josie.require('com.nysoft.josie.gfx.Canvas.Type');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.StrokeAndFillObject', {
	meta: {
		borderColor: { type: 'string', defaultValue: '#000000' },
		borderWidth: { type: 'number', defaultValue: 1 },
		fillColor: { type: 'string', defaultValue: '#ffffff' },
		type: { type: 'string', defaultValue: com.nysoft.josie.gfx.Canvas.Type.Fill }
	},
	
	applyStrokeSettings: function(canvas) {
		if(this.isStroked()) {
			var oContext = canvas.getContext();
			oContext.lineWidth = this.getBorderWidth();
			oContext.strokeStyle = this.getBorderColor();
		}
	},
	
	applyFillSettings: function(canvas) {
		if(this.isFilled()) {
            canvas.getContext().fillStyle = this.getFillColor();
		} else {
			canvas.getContext().fillStyle = null;
		}
	},
	
	isStroked: function() {
		return (this.getType().indexOf('stroke')>=0);
	},
	
	isFilled: function() {
		return (this.getType().indexOf('fill')>=0);
	}
});