Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.Line', {
	meta: {
		length: { type: 'number', defaultValue: 0 },
		lineWidth: { type: 'number', defaultValue: 1 },
		color: { type: 'string', defaultValue: '#000000' }
	},

	init: function() {
		this.targetVector = new com.nysoft.josie.gfx.Canvas.Vector();
	},
	
	calculateTargetVector: function() {
		var oVector = this.getVector();
		this.targetVector.setX(oVector.getX()+this.getLength());
		this.targetVector.setY(oVector.getY());
		return this.targetVector.rotate(oVector, this.getRotation());
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oTargetVector = this.calculateTargetVector();
		
		oContext.save();
		oContext.beginPath();
		this.moveToVector(canvas);
		
	    oContext.lineTo(oTargetVector.getX(), oTargetVector.getY());
	    
	    oContext.lineWidth = this.getLineWidth();
	    oContext.strokeStyle = this.getColor();
	    oContext.stroke();
	    
	    oContext.closePath();
	    oContext.restore();
	}
});