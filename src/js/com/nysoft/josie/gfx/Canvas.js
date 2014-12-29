Josie.require('com.nysoft.josie.core.Control');

com.nysoft.josie.core.Control.extend('com.nysoft.josie.gfx.Canvas', {
	meta: {
		content: 'com.nysoft.josie.gfx.Canvas.CanvasObject[]',
		width: 'number',
		height: 'number',
        autoResize: { type: 'boolean', defaultValue: true }
	},

    init: function() {
        //update size of canvas
        if(this.getAutoResize() && this.getVisible()) {
            window.addEventListener("orientationchange", jQuery.proxy(this._updateSize, this));
            window.addEventListener("resize", jQuery.proxy(this._updateSize, this));
        }
    },

    _renderControl: function() {
        if(this.getDom()) {
            var sContent = '<canvas';
            sContent += this.writeCssClasses();
            sContent += this.writeCssStyles();
            sContent += '></canvas>';

            this.replaceDom(sContent);
            this._updateSize();
        }
        this._super('_renderControl', arguments);
    },

    _renderContentItem: function(oItem, index) {
        if(oItem instanceof com.nysoft.josie.gfx.Canvas.CanvasObject) {
            oItem.render(this, index);
        }
    },
	
	_updateSize: function() {
		var jqDom = this.getDom(),
            jqParent = jqDom.parent() || jQuery(window),
		    iHeight = jqParent.height(),
		    iWidth = jqParent.width();

        Josie.log.trace('Canvas::_updateSize', jqParent, iHeight, iWidth);

        jqDom.get(0).width = this.width = (!this.getWidth()) ? iWidth : this.getWidth();
        jqDom.get(0).height = this.height = (!this.getHeight()) ? iHeight : this.getHeight();
    }
	
});