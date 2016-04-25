//设置默认不允许拖出设置的bounds
L.Map.mergeOptions({
    dragInBounds: true
});
//重写拖动事件
L.Draggable.include({
    _onMove: function (e) {
        if (e.touches && e.touches.length > 1) {
            this._moved = true;
            return;
        }
        if(map.options.dragInBounds&&map.options.maxBounds){
            var viewBounds=map.getBounds();
            var maxBounds=map.options.maxBounds;
            var maxBoundsNorthWest=map.latLngToLayerPoint(maxBounds.getNorthWest());
            var maxBoundsSouthEast=map.latLngToLayerPoint(maxBounds.getSouthEast());
            var viewBoundsNorthWest=map.latLngToLayerPoint(viewBounds.getNorthWest());
            var viewBoundsSouthEast=map.latLngToLayerPoint(viewBounds.getSouthEast());
            if(viewBoundsNorthWest.x<maxBoundsNorthWest.x||viewBoundsNorthWest.y<maxBoundsNorthWest.y||viewBoundsSouthEast.x>(maxBoundsSouthEast.x+1)||viewBoundsSouthEast.y>(maxBoundsSouthEast.y+1))
                return;
        }
        var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
            newPoint = new L.Point(first.clientX, first.clientY),
            offset = newPoint.subtract(this._startPoint);

        if (!offset.x && !offset.y) { return; }
        if (L.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) { return; }

            
        L.DomEvent.preventDefault(e);
        if (!this._moved) {
            this.fire('dragstart');

            this._moved = true;
            this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

            L.DomUtil.addClass(document.body, 'leaflet-dragging');
            this._lastTarget = e.target || e.srcElement;
            L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
        }

        this._newPos = this._startPos.add(offset);
        this._moving = true;

        L.Util.cancelAnimFrame(this._animRequest);
        this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
    }
}
)

//设置地图默认缓冲的瓦片数
L.Map.mergeOptions({
    titleBufferSize: 2
});
L.TileLayer.include({
    _update: function () {
        if (!this._map) { return; }
        var map = this._map,
            bounds = map.getPixelBounds(),
            zoom = map.getZoom(),
            tileSize = this._getTileSize();

        if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
            return;
        }

        var tileBounds = L.bounds(
                bounds.min.divideBy(tileSize)._floor(),
                bounds.max.divideBy(tileSize)._floor());
        //放大加载瓦片的范围
        var titleBufferSize=map.options.titleBufferSize;
        if(titleBufferSize)
            tileBounds=L.bounds([[tileBounds.min.x-titleBufferSize, tileBounds.min.y-titleBufferSize], [tileBounds.max.x+titleBufferSize, tileBounds.max.y+titleBufferSize]]);          
        //
        this._addTilesFromCenterOut(tileBounds);

        if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
            this._removeOtherTiles(tileBounds);
        }
    }
})
