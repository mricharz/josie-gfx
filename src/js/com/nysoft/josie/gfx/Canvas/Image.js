Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.Image', {
	
	meta: {
		width: { type: 'number', defaultValue: 0 },
		height: { type: 'number', defaultValue: 0 },
		source: 'string'
	},
	
	render: function(canvas) {
		var oContext = this;

        if(!this._image) {
            this._image = this._openImage(this.getSource(), function () {
                oContext._render(canvas, this);
            });
        } else {
            this._render(canvas, this._image);
        }
	},

    _render: function(canvas, oImage) {
        var oContext = canvas.getContext(),
            oVector = this.getVector(),
            iWidth = this.getWidth(),
            iHeight = this.getHeight();

        oContext.save();
        oContext.beginPath();
        this.applyRotation(oContext, iWidth, iHeight);
        canvas.drawImage(oImage, oVector, iWidth, iHeight);
        oContext.closePath();
        oContext.restore();
    },

    _openImage: function(file, callback) {
        image = new Image();
        image.onload = callback;
        image.src = file;
        return image;
    }
});