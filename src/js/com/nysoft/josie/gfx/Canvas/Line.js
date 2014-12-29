Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.Line', {
	meta: {
		length: { type: 'number', defaultValue: 0 },
		lineWidth: { type: 'number', defaultValue: 1 },
		color: { type: 'string', defaultValue: '#000000' }
	},

	init: function() {
		this.targetVector = new com.nysoft.josie.gfx.Canvas.Vector(this.getX()+this.getLength(), this.getY());
        this._super('init');
	},

    prepare: function() {
        this.targetVector.setX(this.getX() + this.getLength());
        this.targetVector.setY(this.getY());
        this.targetVector.rotate(this.getVector(), this.getRotation());
    },

    setLength: function(value) {
        if(typeof value === 'number') {
            this.setProperty('length', value);
            this.update();
        }
    },

    setRotation: function(value) {
        if(typeof value == 'number') {
            this.setProperty('rotation', value);
            this.update();
        }
    },

    addRotation: function(value) {
        if(typeof value == 'number') {
            this.setProperty('rotation', this.getProperty('rotation') + value);
            this.update();
        }
    },

    substractRotation: function(value) {
        if(typeof value == 'number') {
            this.setProperty('rotation', this.getProperty('rotation') - value);
            this.update();
        }
    },
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
            iWidth = this.getLineWidth();
		
		oContext.save();
		oContext.beginPath();

        this.applyRotation(oContext, iWidth, 0);

		oContext.moveTo(this.getX(), this.getY())
	    oContext.lineTo(this.targetVector.getX(), this.targetVector.getY());
	    
	    oContext.lineWidth = iWidth;
	    oContext.strokeStyle = this.getColor();
	    oContext.stroke();
	    
	    oContext.closePath();
	    oContext.restore();
        this.trigger('onAfterRendering', {canvas: canvas});
	}
});