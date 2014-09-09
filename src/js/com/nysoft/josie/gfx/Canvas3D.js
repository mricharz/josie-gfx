jQuery.require('com.nysoft.josie.ui.Canvas');

com.nysoft.josie.ui.Canvas.extend('com.nysoft.josie.ui.Canvas3D', {
	meta: {
		context: 'object',
	},
	
	init: function(canvas) {
		this._super('init', canvas);
		if(this.getCanvas()) {
			//get 3d context out of canvas
			this.setContext(this.getCanvas().getContext('3d'));
		}
	}
});