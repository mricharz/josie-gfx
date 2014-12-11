Josie.require('com.nysoft.josie.gfx.Canvas.Circle');

com.nysoft.josie.gfx.Canvas.Circle.extend('com.nysoft.josie.gfx.Canvas.Elipsis', {
    meta: {
        height: { type: 'number', defaultValue: 10 }
    },

    render: function(canvas) {
        var oContext = canvas.getContext(),
            oVector = this.getVector(),
            iWidth = this.getWidth(),
            iHeight = this.getHeight();

        oContext.save();
        oContext.beginPath();
        this.applyRotation(canvas, iWidth, iWidth);
        oContext.translate(oVector.getX()-iWidth, oVector.getY()-iHeight);
        oContext.scale(iWidth, iHeight);
        oContext.arc(1, 1, 1, 0, 2 * Math.PI, false);
        oContext.restore(); // restore to original state
        oContext.save();

        this.applyStrokeSettings(canvas);
        if(this.isStroked()) {
            oContext.stroke();
        }

        this.applyFillSettings(canvas);
        if(this.isFilled()) {
            oContext.fill();
        }

        oContext.closePath();
        oContext.restore();
    }
});