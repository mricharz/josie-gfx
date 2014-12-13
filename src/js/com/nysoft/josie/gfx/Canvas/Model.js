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
                visible: false,
                autoResize: false
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

    invalidate: function() {
        //set preRenderedCanvas to null to force a rerender
        this._preRenderedCanvas = null;
    },

	render: function(canvas) {
		if(this.getPreRender()) {
            var oPreRenderCanvas = this.getPreRenderCanvas();

            if(!this._preRenderedCanvas) {
                this.bindEvent('onPreRenderDone', jQuery.proxy(function () {
                    this._renderPrerenderedImage(canvas);
                }, this));
                oPreRenderCanvas.setContent(this.getContent());
                oPreRenderCanvas.rerender();
            } else {
                this._renderPrerenderedImage(canvas);
            }
		} else {
			this._super('render', canvas);
		}
	},

    _renderPrerenderedImage: function(canvas) {
        if(this._preRenderedCanvas) {
            var oContext = canvas.getContext(),
                oVector = this.getVector(),
                iWidth = this.getWidth(),
                iHeight = this.getHeight();
            oContext.save();
            this.applyRotation(canvas, iWidth, iHeight);
            //draw prerendered image
            oContext.drawImage(this._preRenderedCanvas, oVector.getX(), oVector.getY(), iWidth, iHeight);
            oContext.restore();
            this.unbindEvent('onPreRenderDone');
        }
    }
});