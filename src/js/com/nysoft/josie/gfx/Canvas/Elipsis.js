Josie.require('com.nysoft.josie.gfx.Canvas.Circle');

com.nysoft.josie.gfx.Canvas.Circle.extend('com.nysoft.josie.gfx.Canvas.Elipsis', {
    meta: {
        height: { type: 'number', defaultValue: 10 }
    },

    render: function(canvas) {
        var oContext = canvas.getContext(),
            oVector = this.getVector(),
            iX = oVector.getX(),
            iY = oVector.getY(),
            iWidth = this.getWidth(),
            iHalfWidth = iWidth/ 2,
            iHeight = this.getHeight(),
            iHalfHeight = iHeight/2;

        oContext.save();
        this.applyRotation(oContext, iWidth, iWidth);
        oContext.beginPath();
        /*oContext.translate(oVector.getX()-iWidth, oVector.getY()-iHeight);
        oContext.scale(iWidth, iHeight);
        // 6.283185307179586 = 2 * Math.PI
        oContext.arc(1, 1, 1, 0, 6.283185307179586, false);*/

        oContext.moveTo(iX, iY - iHalfHeight); // A1

        oContext.bezierCurveTo(
            iX + iHalfWidth, iY - iHalfHeight, // C1
            iX + iHalfWidth, iY + iHalfHeight, // C2
            iX, iY + iHalfHeight); // A2

        oContext.bezierCurveTo(
            iX - iHalfWidth, iY + iHalfHeight, // C3
            iX - iHalfWidth, iY - iHalfHeight, // C4
            iX, iY - iHalfHeight); // A1

        oContext.closePath();
        this.applyStrokeSettings(oContext);
        this.applyFillSettings(oContext);
        oContext.restore(); // restore to original state
    }
});