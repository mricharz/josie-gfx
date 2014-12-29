Josie.require('com.nysoft.josie.gfx.Canvas');

com.nysoft.josie.gfx.Canvas.extend('com.nysoft.josie.gfx.Canvas2D', {
	meta: {
		context: 'object',
		measureCallback: 'function',
		measurement: { type: 'boolean', defaultValue: false }
	},

	init: function() {
		this._super('init', arguments);

		//init loops
		this.loops = {};
        this.animations = [];
		//start animationLooping
		this._animationLoop();
	},

	setMeasurement: function(value) {
		if(typeof value === 'boolean') {
			this.setProperty('measurement', value);
			//init for performance measurement
			this.fps = 0;
			this.now = null;
			this.lastUpdate = (new Date) * 1 - 1;
			this.fpsFilter = 50; //highcap
		}
	},

	_updateSize: function() {
		this._super('_updateSize', arguments);
		this.invalidate();
	},
	
    getContext: function() {
        var oContext = this.getProperty('context');
        if(!oContext && this.getDom().length) {
			oContext = this.getDom().get(0).getContext('2d');
            this.setContext(oContext);
        }
        return oContext;
    },
	
	getContent: function(iIndex) {
		var aContent = this._super('getContent');
		if(iIndex !== null && iIndex !== undefined) {
			return aContent[iIndex] || null;
		}
		return aContent;
	},
	
	clearCanvas: function() {
		var oContext = this.getContext();
		// Store the current transformation matrix
		oContext.save();

		// Use the identity matrix while clearing the canvas
		oContext.setTransform(1, 0, 0, 1, 0, 0);
		oContext.clearRect(0, 0, this.width, this.height);

		// Restore the transform
		oContext.restore();
	},
	
	_renderContent: function() {
		var aObjects = this.getContent();
		if(aObjects && aObjects.length) {
			Josie.utils.each(aObjects, jQuery.proxy(function(oObject, index) {
				this._renderContentItem(oObject, index);
			}, this));
		}
		if(this.getMeasurement()) {
            this._measureFrame();
        }
	},

	rerender: function() {
        this.trigger('onBeforeRenderer');
		this.clearCanvas();
		this._renderContent();
        this.trigger('onAfterRenderer');
	},
	
	drawImage: function(oImage, x, y, height, width) {
        if(oImage instanceof Image) {
            this.getContext().drawImage(oImage, x, y, width, height);
        }
	},
	
	_measureFrame: function() {
	  var thisFrameFPS = 1000 / ((this.now=new Date) - this.lastUpdate);
	  this.fps += (thisFrameFPS - this.fps) / this.fpsFilter;
	  this.lastUpdate = this.now * 1 - 1;
	  
	  if(this.getMeasureCallback()) {
		  this.getMeasureCallback().call(this, this.fps);
	  }
	},

    animate: function(oObject, fnCallback) {
        if(jQuery.isFunction(fnCallback)) {
            var iAnimationIndex = this.animations.push({
                object: oObject,
                callback: fnCallback,
                active: true
            })-1;
            var oAnimation = this.animations[iAnimationIndex];
            oAnimation.start = function() {
                oAnimation.active = true;
            };
            oAnimation.stop = function() {
                oAnimation.active = false;
            };
            oAnimation.remove = jQuery.proxy(function() {
                this.animations.splice(iAnimationIndex, 1);
            }, this);
            return oAnimation;
        }
    },
	
	addLoop: function(key, fnAnimation) {
		this.loops[key] = fnAnimation;
	},
	
	removeLoop: function(key) {
		delete this.loops[key];
	},
	
	getLoop: function(key) {
		return this.loops[key];
	},
	
	getLoops: function() {
		return this.loops;
	},
	
	_animationLoop: function() {
		if(this.animations) {
			var bHaveToRerender = false;
			//execute loops
			Josie.utils.each(this.animations, jQuery.proxy(function(oAnimation) {
                if(oAnimation.active) {
                    oAnimation.callback.call(oAnimation.object, this);
                    bHaveToRerender = true;
                }
            }, this));
			//rerender canvas (only if needed)
			(bHaveToRerender) && this.rerender();
		}
		//continue the main-loop
		return requestAnimFrame(jQuery.proxy(this._animationLoop, this));
	}
	
});