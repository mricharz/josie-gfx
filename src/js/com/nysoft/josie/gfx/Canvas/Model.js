Josie.require('com.nysoft.josie.core.BaseObject');
Josie.require('com.nysoft.josie.gfx.Canvas2D');
Josie.require('com.nysoft.josie.gfx.Canvas.Container');

com.nysoft.josie.gfx.Canvas.Container.extend('com.nysoft.josie.gfx.Canvas.Model', {
	meta: {
		preRender: { type: 'boolean', defaultValue: true },
		width: 'number',
		height: 'number'
	},

    init: function() {
        if(this.getPreRender()) {
            this.jqPreRenderCanvas = jQuery('<div />');
            jQuery('body').append(this.jqPreRenderCanvas);
            //create the prerender canvas
            this._preRenderCanvas = new com.nysoft.josie.gfx.Canvas2D(this.jqPreRenderCanvas, {
                width: this.getWidth(),
                height: this.getHeight(),
                content: this.getContent(),
                visible: false
            });
            this._preRenderedCanvas = null;
            //if preRender is done
            this._preRenderCanvas.bindEvent('onAfterRenderer', function(e, oData) {
                oData.model._preRenderedCanvas = oData.model.getPreRenderCanvas().getDom().get(0);
                oData.model.trigger('onPreRenderDone');
            }, { model: this });
        }
    },

    getPreRenderCanvas: function() {
        return this._preRenderCanvas;
    },

	render: function(canvas) {
		if(this.getPreRender()) {
            Josie.log.info('Render Model with prerender');
            var oPreRenderCanvas = this.getPreRenderCanvas(),
                oContext = canvas.getContext(),
                oVector = this.getVector(),
                iWidth = this.getWidth(),
                iHeight = this.getHeight();

            this.unbindEvent('onPreRenderDone');
            this.bindEvent('onPreRenderDone', jQuery.proxy(function() {
                if(this._preRenderedCanvas) {
                    Josie.log.info('Prerender is done!');
                    oContext.save();
                    this.applyRotation(canvas, iWidth, iHeight);
                    //draw prerendered image
                    oContext.drawImage(this._preRenderedCanvas, oVector.getX(), oVector.getY(), iWidth, iHeight);
                    oContext.restore();
                }
            }, this));
            oPreRenderCanvas.setContent(this.getContent());
            oPreRenderCanvas.rerender();
		} else {
            Josie.log.info('Render Model without prerender');
			this._super('render', canvas);
		}
	}
});