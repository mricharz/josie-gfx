jQuery.require('com.nysoft.josie.ui.Canvas.CanvasObject');

com.nysoft.josie.ui.Canvas.CanvasObject.extend('com.nysoft.josie.ui.Canvas.Line', {
	meta: {
		length: { type: 'number', defaultValue: 0 },
		lineWidth: { type: 'number', defaultValue: 1 },
		color: { type: 'string', defaultValue: '#000000' }
	},
	
	calculateTargetVector: function() {
		var targetVector = new com.nysoft.josie.ui.Canvas.Vector(this.getVector().getX()+this.getLength(), this.getVector().getY());
		return targetVector.rotate(this.getVector(), this.getRotation());
	},
	
	render: function(canvas) {
		//there is no need to render if invisible!!!
		if(this.getColor() == 'none' || this.getLength() == 0) {
			return;
		}
		
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