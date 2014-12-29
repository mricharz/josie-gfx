Josie.require('com.nysoft.josie.core.BaseObject');
Josie.require('com.nysoft.josie.gfx.Canvas.Vector');

com.nysoft.josie.core.EventStack.bind('com.nysoft.josie.gfx.Canvas.CanvasObject', 'onAfterRendering', function(e, oData) {
    if(e[0] && e[0].canvas) {
        var oControlObject = this,
            oCanvas = e[0].canvas;
        if(oControlObject._hitTests && oControlObject._hitTests.length) {
            while(oControlObject._hitTests.length) {
                var oHitTest = oControlObject._hitTests.pop();
                if(jQuery.isFunction(oHitTest.callback)) {
                    var bIsPointInPath = oCanvas.getContext().isPointInPath(oHitTest.x, oHitTest.y);
                    oHitTest.callback.call(oControlObject, bIsPointInPath, oControlObject, oCanvas);
                }
            }
        }
    }
});

com.nysoft.josie.core.ManagedObject.extend('com.nysoft.josie.gfx.Canvas.CanvasObject', {
	meta: {
		id: 'string',
        x: 'number',
        y: 'number',
		rotation: { type: 'number', defaultValue: 0 },
		rotationPoint: { type: 'com.nysoft.josie.gfx.Canvas.Vector', defaultValue: null },
        collidableWith: {type: 'string[]', defaultValue: [] },
        speed: { type:'number', defaultValue: 0 }
	},

    init: function() {
        this._super('init');
        this.isColliding = false;
        this._hitTests = [];
        this.update();
    },

    setX: function(value) {
        if(typeof value === 'number') {
            this.setProperty('x', value);
            this.update();
        }
    },

    setY: function(value) {
        if(typeof value === 'number') {
            this.setProperty('y', value);
            this.update();
        }
    },

    getVector: function() {
        return new com.nysoft.josie.gfx.Canvas.Vector(this.getX(), this.getY());
    },

    setVector: function(value) {
        if(value instanceof com.nysoft.josie.gfx.Canvas.Vector) {
            this.setProperty('x', value.getX());
            this.setProperty('y', value.getY());
        }
    },

	addRotation: function(value) {
		if(typeof value == 'number') {
			this.setProperty('rotation', this.getProperty('rotation') + value);
		}
	},

	substractRotation: function(value) {
		if(typeof value == 'number') {
			this.setProperty('rotation', this.getProperty('rotation') - value);
		}
	},
	
	applyRotation: function(oContext, width, height) {
		var oRotationPoint = this.getRotationPoint(),
			tx = 0,
			ty = 0;
		
		if(oRotationPoint) {
			tx = oRotationPoint.getX();
			ty = oRotationPoint.getY();
		} else {
			tx = this.getX()+width/2;
			ty = this.getY()+height/2;
		}
		oContext.translate(tx, ty);
		oContext.rotate(Josie.utils.deg2rad(this.getRotation()));
		oContext.translate(-tx, -ty);
	},

    update: function() {
        if(this.__prepared !== false) {
            this.__prepared = false;
            setTimeout(jQuery.proxy(function() {
                this.__prepared = true;
                this.prepare();
            }, this), 0);
        }
    },

    prepare: function() {},
	
	render: function(canvas, index) {},
	
	animate: function(canvas, fnCallback) {
        return canvas.animate(this, fnCallback);
	},

    isCollidableWith: function(value) {
        var result = false;
        if(typeof value === 'string') {
            var aCollidableWith = this.getCollidableWith();
            Josie.utils.each(aCollidableWith, function(sType) {
                if(sType == value) {
                    result = true;
                    return false;
                }
            })
        }
        return result;
    },

    isPointInPath: function(iX, iY, fCallback) {
        this._hitTests.push({
            x: iX,
            y: iY,
            callback: fCallback
        });
    }

});