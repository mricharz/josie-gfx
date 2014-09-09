jQuery.require('com.nysoft.josie.core.BaseObject');
jQuery.require('com.nysoft.josie.ui.Canvas.Vector');

com.nysoft.josie.core.BaseObject.extend('com.nysoft.josie.ui.Canvas.PerspectiveContainer', {
	meta: {
		layerCount: { type: 'number', defaultValue: 10 },
		depth: { type: 'number', defaultValue: 20 }
	},
	
	init: function(options) {
		//register orientation event
		window.addEventListener('deviceorientation', jQuery.proxy(function(event) {
			this.onRotate(event, event.alpha, event.beta, event.gamma);
		}, this), false);
		this.g = 0;
		this.b = 0;
		this.objects = [];
	},
	
	addObject: function(object) {
		this.objects.push(object);
	},
	
	onRotate: function(event, a, b, g) {
		if(g)
			this.g = Math.round(g);
		if(b)
			this.b = Math.round(b);
	},
	
	render: function(canvas) {
		var layerCount = this.getLayerCount(), depth = this.getDepth(), g = this.g, b = this.b;
		for(var i = layerCount; i > 0; i--) {
			jQuery.each(this.objects, function() {
				var oVector = this.getVector(),
					baseX = oVector.getX(),
					baseY = oVector.getY();
				if(jQuery.device.mode.landscape) {
					oVector.setY(baseY+(g*(i/depth)));
					oVector.setX(baseX-(b*(i/depth)));
				} else {
					oVector.setX(baseX-(g*(i/depth)));
					oVector.setY(baseY-(b*(i/depth)));
				}
				this.render(canvas);
				//reset vector
				oVector.setX(baseX);
				oVector.setY(baseY);
			});
		}
	}
	
});