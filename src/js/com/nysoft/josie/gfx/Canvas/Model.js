jQuery.require('com.nysoft.josie.core.BaseObject');
jQuery.require('com.nysoft.josie.ui.Canvas.Container');

com.nysoft.josie.ui.Canvas.Container.extend('com.nysoft.josie.ui.Canvas.Model', {
	meta: {
		preRender: { type: 'boolean', defaultValue: true },
		width: 'number',
		height: 'number'
	},
	
	hasToPreRender: function() {
		return this.getPreRender();
	},
	
	_preRender: function() {
		if(!this._bPreRendered) {
			jQuery.log.trace('PreRendering Model: '+this.getId());
			var preRenderCanvas = this.getPreRenderCanvas();
			jQuery.each(this.getObjects(), function() {
				this.render(preRenderCanvas);
			});
			this._bPreRendered = true;
		}
	},
	
	getAsImage: function() {
		if(!this.image) {
			this._preRender();
			this.image = new Image();
			this.image.id = this.getId()+'-image';
			this.image.src = this.getPreRenderCanvas().getCanvas().get(0).toDataURL();
		}
		return this.image;
	},
	
	getPreRenderCanvas: function(canvas) {
		if(!this._preRenderCanvas) {
			this._preRenderCanvas = new com.nysoft.josie.ui.Canvas2D(null, {
				width: this.getWidth(),
				height: this.getHeight()
			});
		}
		return this._preRenderCanvas;
	},
	
	render: function(canvas) {
		if(this.hasToPreRender()) {
			this._preRender();
			var oContext = canvas.getContext(),
				oVector = this.getVector();
			oContext.save();
			this.applyRotation(canvas, this.getWidth(), this.getHeight());
			//draw prerendered image
			oContext.drawImage(this.getPreRenderCanvas().getCanvas().get(0), oVector.getX(), oVector.getY());
			oContext.restore();
		} else {
			this._super('render', canvas);
		}
	}
});