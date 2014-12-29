Josie.require('com.nysoft.josie.gfx.Canvas');

com.nysoft.josie.core.ManagedObject.extend('com.nysoft.josie.gfx.Canvas.Quadrants', {
	meta: {
        content: 'com.nysoft.josie.gfx.Canvas.CanvasObject[]',
		nodes: { type: 'Array', defaultValue: [] },
        maxObjects: { type: 'number', defaultValue: 10 },
        maxLevels: { type: 'number', defaultValue: 5 },
        level: { type: 'number', defaultValue: 0 },
        width: { type: 'number', defaultValue: 10 },
        height: { type: 'number', defaultValue: 10 },
        x: { type: 'number', defaultValue: 0 },
        y: { type: 'number', defaultValue: 0 }
	},

    clear: function() {
        var aNodes = this.getNodes();
        this.objects = [];
        for (var i = 0; i < aNodes.length; i++) {
            aNodes[i].clear();
        }
        this.setNodes([]);
    },

    getAllQuadrantObjects: function(aReturnedObjects) {
        var aNodes = this.getNodes(),
            aObjects = this.getContent();
        for (var i = 0; i < aNodes.length; i++) {
            aNodes[i].getAllQuadrantObjects(aReturnedObjects);
        }
        for (var i = 0, len = aObjects.length; i < len; i++) {
            aReturnedObjects.push(aObjects[i]);
        }
        return aReturnedObjects;
    },

    findObjects: function(aReturnedObjects, oObj) {
        if (typeof oObj === "undefined") {
            Josie.log.warn("UNDEFINED OBJECT");
            return;
        }
        var aNodes = this.getNodes(),
            aObjects = this.getContent(),
            iIndex = this.getIndex(oObj);
        if (iIndex != -1 && aNodes.length) {
            aNodes[iIndex].findObjects(aReturnedObjects, oObj);
        }
        for (var i = 0, len = aObjects.length; i < len; i++) {
            aReturnedObjects.push(aObjects[i]);
        }
        return aReturnedObjects;
    },

    getIndex: function(oObj) {
        var iIndex = -1,
            iVerticalMidpoint = this.getY() + this.getWidth() / 2,
            iHorizontalMidpoint = this.getY() + this.getHeight() / 2,
            iObjectHeight = oObj.getHeight() || oObj.getWidth(),
            iObjectWidth = oObj.getWidth() || oObj.getHeight(),
        // Object can fit completely within the top quadrant
            iTopQuadrant = (oObj.getY() < iHorizontalMidpoint && oObj.getY() + iObjectHeight < iHorizontalMidpoint),
        // Object can fit completely within the bottom quandrant
            iBottomQuadrant = (oObj.getY() > iHorizontalMidpoint);
        // Object can fit completely within the left quadrants
        if (oObj.getX() < iVerticalMidpoint &&
            oObj.getX() + iObjectWidth < iVerticalMidpoint) {
            if (iTopQuadrant) {
                iIndex = 1;
            }
            else if (iBottomQuadrant) {
                iIndex = 2;
            }
        }
        // Object can fix completely within the right quandrants
        else if (oObj.getX() > iVerticalMidpoint) {
            if (iTopQuadrant) {
                iIndex = 0;
            }
            else if (iBottomQuadrant) {
                iIndex = 3;
            }
        }
        return iIndex;
    },

    insert: function(oObj) {
        if (typeof oObj === "undefined") {
            return;
        }
        if (oObj instanceof Array) {
            for (var i = 0, len = oObj.length; i < len; i++) {
                this.insert(oObj[i]);
            }
            return;
        }
        var aNodes = this.getNodes(),
            aObjects = this.getContent();
        if (aNodes.length) {
            var iIndex = this.getIndex(oObj);
            // Only add the object to a subnode if it can fit completely
            // within one
            if (iIndex != -1) {
                aNodes[iIndex].insert(oObj);
                return;
            }
        }
        aObjects.push(oObj);
        // Prevent infinite splitting
        if (aObjects.length > this.getMaxObjects() && this.getLevel() < this.getMaxLevels()) {
            if (aNodes[0] == null) {
                this.split();
            }
            var i = 0;
            while (i < aObjects.length) {
                var iIndex = this.getIndex(aObjects[i]);
                if (iIndex != -1) {
                    aNodes[iIndex].insert((aObjects.splice(i,1))[0]);
                }
                else {
                    i++;
                }
            }
        }
    },

    split: function() {
        var aNodes = this.getNodes(),
            iX = this.getX(),
            iY = this.getY(),
            iSubWidth = (this.getWidth() / 2) | 0,
            iSubHeight = (this.getHeight() / 2) | 0,
            iNextLevel = this.getLevel()+1;
        aNodes[0] = new this(null, {
            x: iX + iSubWidth,
            y: iY,
            width: iSubWidth,
            height: iSubHeight,
            level: iNextLevel
        });
        aNodes[1] = new this(null, {
            x: iX,
            y: iY,
            width: iSubWidth,
            height: iSubHeight,
            level: iNextLevel
        });
        aNodes[2] = new this(null, {
            x: iX,
            y: iY + iSubHeight,
            width: iSubWidth,
            height: iSubHeight,
            level: iNextLevel
        });
        aNodes[3] = new this(null, {
            x: iX + iSubWidth,
            y: iY + iSubHeight,
            width: iSubWidth,
            height: iSubHeight,
            level: iNextLevel
        });
    }
});