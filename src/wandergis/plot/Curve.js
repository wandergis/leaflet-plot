
P.Plot.Curve = function(points){
    goog.base(this, []);
    this.type = P.PlotTypes.CURVE;
    this.t = 0.3;
    this.setPoints(points);
};

goog.inherits(P.Plot.Curve, L.Polyline );
goog.mixin(P.Plot.Curve.prototype, P.Plot.prototype);

P.Plot.Curve.prototype.generate = function(){
    if(this.getPointCount()==2)
        this.setCoordinates(this.points);
    else
        this.setCoordinates(P.PlotUtils.getCurvePoints(this.t, this.points));
};