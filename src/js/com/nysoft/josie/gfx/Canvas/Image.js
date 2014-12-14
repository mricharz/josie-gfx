Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.Image', {
	
	meta: {
		width: { type: 'number', defaultValue: 0 },
		height: { type: 'number', defaultValue: 0 },
		source: 'string'
	},
	
	render: function(canvas) {
		var oContext = canvas.getContext(),
			oVector = this.getVector(),
            iWidth = this.getWidth(),
            iHeight = this.getHeight();

        if(!this._image) {
            this._image = this._openImage(this.getSource(), function () {
                iHeight = iHeight || this.height;
                iWidth = iWidth || this.width;
                canvas.drawImage(this, oVector, iWidth, iHeight);
            });
        } else {
            canvas.drawImage(this._image, oVector, iWidth, iHeight);
        }
	},

    _openImage: function(file, callback) {
        image = new Image();
        image.onload = callback;
        image.src = file;
        return image;
    }
});