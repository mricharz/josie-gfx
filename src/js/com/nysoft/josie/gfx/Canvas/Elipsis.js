Josie.require('com.nysoft.josie.gfx.Canvas.Circle');

com.nysoft.josie.gfx.Canvas.Circle.extend('com.nysoft.josie.gfx.Canvas.Elipsis', {
    meta: {
        height: { type: 'number', defaultValue: 10 }
    },

    setWidth: function(value) {
        if(typeof value === 'number') {
            this.setProperty('width', value);
            this.update();
        }
    },

    setHeight: function(value) {
        if(typeof value === 'number') {
            this.setProperty('height', value);
            this.update();
        }
    },

    prepare: function() {
        var iX = this.getX(),
            iY = this.getY(),
            iWidth = this.getWidth(),
            iHalfWidth = iWidth/ 2,
            iHeight = this.getHeight(),
            iHalfHeight = iHeight/2;
        this.a1b = iY - iHalfHeight;
        this.c1a = iX + iHalfWidth;
        this.c1b = iY - iHalfHeight;
        this.c2a = iX + iHalfWidth;
        this.c2b = iY + iHalfHeight;
        this.a2b = iY + iHalfHeight;
        this.c3a = iX - iHalfWidth;
        this.c3b = iY + iHalfHeight;
        this.c4a = iX - iHalfWidth;
        this.c4b = iY - iHalfHeight;
    },

    render: function(canvas) {
        var oContext = canvas.getContext(),
            iX = this.getX(),
            iWidth = this.getWidth(),
            iHeight = this.getHeight();

        oContext.save();
        this.applyRotation(oContext, iWidth, iHeight);
        oContext.beginPath();
        /*oContext.translate(oVector.getX()-iWidth, oVector.getY()-iHeight);
        oContext.scale(iWidth, iHeight);
        // 6.283185307179586 = 2 * Math.PI
        oContext.arc(1, 1, 1, 0, 6.283185307179586, false);*/

        oContext.moveTo(iX, this.a1b); // A1

        oContext.bezierCurveTo(
            this.c1a, this.c1b, // C1
            this.c2a, this.c2b, // C2
            iX, this.a2b); // A2

        oContext.bezierCurveTo(
            this.c3a, this.c3b, // C3
            this.c4a, this.c4b, // C4
            iX, this.a1b); // A1

        oContext.closePath();
        this.applyStrokeSettings(oContext);
        this.applyFillSettings(oContext);
        oContext.restore(); // restore to original state
        this.trigger('onAfterRendering', {canvas: canvas});
    }
});