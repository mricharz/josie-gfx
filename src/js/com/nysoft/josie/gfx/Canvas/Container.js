Josie.require('com.nysoft.josie.gfx.Canvas.CanvasObject');
Josie.require('com.nysoft.josie.gfx.Canvas.Vector');

com.nysoft.josie.gfx.Canvas.CanvasObject.extend('com.nysoft.josie.gfx.Canvas.Container', {

	meta: {
		content: { type: 'com.nysoft.josie.gfx.Canvas.CanvasObject[]', defaultValue: [] }
	},

	addObjects: function(oObject) {
		return this.getContent().push(oObject) - 1;
	},

	size: function() {
		return this.getContent().length;
	},

	render: function(canvas) {
		var iRotation = Josie.utils.deg2rad(this.getRotation()),
            oContext = canvas.getContext(),
            iX = this.getX(),
            iY = this.getY();
        oContext.save();
        this.applyRotation(oContext);
        oContext.translate(iX, iY);
		Josie.utils.each(this.getContent(), function(oObject) {
			//render
			oObject.render(canvas);
		});
        oContext.translate(-iX, -iY);
        oContext.restore();
        this.trigger('onAfterRendering', {canvas: canvas});
	},

    destroy: function() {
        var aContent = this.getContent();
        if(aContent && aContent.length) {
            Josie.utils.each(this.getContent(), function (oObject) {
                oObject.destroy();
            });
        }
        this._super('destroy');
    }

});