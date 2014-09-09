jQuery.require('com.nysoft.josie.ui.Canvas.CanvasObject');

//TODO
//see: http://www.html5canvastutorials.com/tutorials/html5-canvas-paths/

com.nysoft.josie.ui.Canvas.StrokeAndFillObject.extend('com.nysoft.josie.ui.Canvas.Path', {
	
	meta: {
		nodes: { type: 'object', defaultValue: [] },
		autoClose: { type: 'boolean', defaultValue: true }
	},
	
	addNode: function(oVector) {
		return this.getNodes().push(oVector)-1;
	},
	
	removeNode: function(index) {
		return this.getNodes().splice(index, 1);
	},
	
	getNode: function(index) {
		return this.getNodes()[index];
	},
	
	getWidth: function() {
		var farestDiff = 0;
		jQuery.each(this.getNodes(), jQuery.proxy(function(index, oVector){
			var iDiff = oVector.getX() - this.getVector().getX();
			if(iDiff >= farestDiff) {
				farestDiff = iDiff;
			}
		}, this));
		return iDiff;
	},
	
	getHeight: function() {
		var farestDiff = 0;
		jQuery.each(this.getNodes(), jQuery.proxy(function(index, oVector){
			var iDiff = oVector.getY() - this.getVector().getY();
			if(iDiff >= farestDiff) {
				farestDiff = iDiff;
			}
		}, this));
		return iDiff;
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			iNodes = this.getNodes(),
			iSize = this.getSize();
		
		oContext.save();
		oContext.beginPath();
		this.applyRotation(canvas, iSize, iSize);
		
		//go to first vector
		var startVector = this.getNode(0);
		oContext.moveTo(startVector.getX(), startVector.getY());      

		//draw rest of the edges
		for (var i = 1; i <= iNodes.length; i++) {
			var oVector = this.getNode(i);
			oContext.lineTo(oVector.getX(), oVector.getY());
		}
		
		//close path if autoClose = true
		if(this.getAutoClose()) {
			oContext.lineTo(startVector.getX(), startVector.getY());
		}
		
		this.applyStrokeSettings(canvas);
		if(this.isStroked()) {
			oContext.stroke();
		}
		
		this.applyFillSettings(canvas);
		if(this.isFilled()) {
			oContext.fill();
		}
		
		oContext.closePath();
		oContext.restore();
	}
	
});