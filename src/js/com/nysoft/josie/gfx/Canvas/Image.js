jQuery.require('com.nysoft.josie.ui.Canvas.CanvasObject');

com.nysoft.josie.ui.Canvas.CanvasObject.extend('com.nysoft.josie.ui.Canvas.Image', {
	
	meta: {
		width: { type: 'number', defaultValue: 0 },
		height: { type: 'number', defaultValue: 0 },
		source: 'string'
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector(),
			sSource = this.getSource();
		oContext.save();
		this.applyRotation(canvas, this.getWidth(), this.getHeight());
		jQuery.log.trace(this.getSource());
		oContext.drawImage(this.getSource(), oVector.getX(), oVector.getY(), this.getWidth(), this.getHeight());
		oContext.restore();
		
		jQuery.log.trace(sSource.width);
		//if image is not ready, yet
		if(!sSource.width) {
			jQuery.log.trace('Trigger rerender of canvas because image is not ready, yet. ('+sSource.src+')');
			//trigger canvas to rerender if image is ready
			sSource.onload = jQuery.proxy(function() {
				(!this.getWidth()) && this.setWidth(sSource.width);
				(!this.getHeight()) && this.setHeight(sSource.height);
				jQuery.log.trace('Rerender canvas because image is now ready.');
				canvas.rerender();
			}, this);
		}
	}
});