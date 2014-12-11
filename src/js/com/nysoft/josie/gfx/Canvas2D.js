Josie.require('com.nysoft.josie.gfx.Canvas');

com.nysoft.josie.gfx.Canvas.extend('com.nysoft.josie.gfx.Canvas2D', {
	meta: {
		context: 'object',
		measureCallback: 'function',
		measurement: 'boolean'
	},
	
	_renderControl: function() {
		//init loops
		this.loops = {};
		//start animationLooping
		this._animationLoop();

        if(this.getMeasurement()) {
            //init for performance measurement
            this.fps = 0;
            this.now = null;
            this.lastUpdate = (new Date) * 1 - 1;
            this.fpsFilter = 50; //highcap
        }

        this._super('_renderControl', arguments);
	},

    getContext: function() {
        var oContext = this.getProperty('context');
        if(!oContext && this.getDom().length) {
            oContext = this.getDom().get(0).getContext('2d');
            this.setProperty('context', oContext);
        }
        return oContext;
    },
	
	getObject: function(iIndex) {
		var aObjects = this.getContent();
		return aObjects[iIndex] || null;
	},
	
	addObject: function(object) {
		return this.getContent().push(object)-1;
	},
	
	addObjects: function(aObjects) {
		var aIds = [];
		if(aObjects && aObjects.length) {
			jQuery.each(aObjects, jQuery.proxy(function(index, oObject){
				aIds.push(this.addObject(oObject));
			}, this));
		}
		return aIds;
	},
	
	clearCanvas: function() {
		// Store the current transformation matrix
		this.getContext().save();

		// Use the identity matrix while clearing the canvas
		this.getContext().setTransform(1, 0, 0, 1, 0, 0);
		this.getContext().clearRect(0, 0, this.getDom().get(0).width, this.getDom().get(0).height);

		// Restore the transform
		this.getContext().restore();
	},
	
	renderObjects: function() {
		var aObjects = this.getContent();
		if(aObjects && aObjects.length) {
			Josie.utils.each(aObjects, jQuery.proxy(function(oObject, index) {
				this._renderContentItem(oObject, index);
			}, this));
		}
	},
	
	_renderContent: function() {
		this.renderObjects();
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
	
	drawImage: function(oImage, vector, height, width) {
        if(oImage instanceof Image) {
            this.getContext().drawImage(oImage, vector.getX(), vector.getY(), width, height);
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
		if(this.loops) {
			var bHaveToRerender = false;
			//execute loops
			Josie.utils.each(this.loops, jQuery.proxy(function(key, fnAnimation) {
				Josie.log.trace('Running canvas-Loop: '+key);
				fnAnimation.call(this, key);
				bHaveToRerender = true;
			}, this));
			//rerender canvas (only if needed)
			(bHaveToRerender) && this.rerender();
		}
		//continue the main-loop
		return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		        function(callback) {
		          window.setTimeout(callback, 1000 / 60);
		        })(jQuery.proxy(this._animationLoop, this));
	}
	
});