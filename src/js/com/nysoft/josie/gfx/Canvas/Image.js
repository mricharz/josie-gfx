Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.Image', {
	
	meta: {
		width: { type: 'number', defaultValue: 0 },
		height: { type: 'number', defaultValue: 0 },
		source: 'string'
	},

    init: function() {
        this._super('init', arguments);
        this.image = new Image();
        this.image.onload = jQuery.proxy(function(){
            console.log('Image loaded');
            this.loaded = true;
            this._render();
        }, this);
        this.image.src = this.getSource();
    },

    setSource: function(value) {
        if(typeof value === 'string') {
            this.setProperty('source', value);
            if(this.image) {
                this.image.src = value;
            }
            this.loaded = false;
        }
    },

    getImage: function() {
        return this.image;
    },
	
	render: function(canvas) {
        this.canvas = canvas;
        if(this.loaded) {
            this._render();
        }
	},

    _render: function() {
        if(this.canvas) {
            var oContext = this.canvas.getContext(),
                iWidth = this.getWidth(),
                iHeight = this.getHeight();

            oContext.save();
            oContext.beginPath();
            this.applyRotation(oContext, iWidth, iHeight);
            this.canvas.drawImage(this.image, this.getX(), this.getY(), iWidth, iHeight);
            oContext.closePath();
            oContext.restore();
            this.trigger('onAfterRendering', {canvas: this.canvas});
        }
    }
});