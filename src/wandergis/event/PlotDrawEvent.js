P.Event.PlotDrawEvent = function(type, feature) {
    goog.base(this, type);
    this.feature = feature;
};


goog.inherits(P.Event.PlotDrawEvent, L.Mixin.Events);

P.Event.PlotDrawEvent.DRAW_START = "draw_start";
P.Event.PlotDrawEvent.DRAW_END = "draw_end";
