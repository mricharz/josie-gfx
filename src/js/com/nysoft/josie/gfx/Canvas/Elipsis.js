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
        this.applyRotation(oContext, iWidth, iWidth);
        oContext.translate(oVector.getX()-iWidth, oVector.getY()-iHeight);
        oContext.scale(iWidth, iHeight);
        // 6.283185307179586 = 2 * Math.PI
        oContext.arc(1, 1, 1, 0, 6.283185307179586, false);
        oContext.closePath();
        oContext.restore(); // restore to original state
        oContext.save();

        this.applyStrokeSettings(oContext);
        this.applyFillSettings(oContext);
        oContext.restore();
    }
});