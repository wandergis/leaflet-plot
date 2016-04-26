P.Event.PlotEditEvent = function(type, feature) {
    goog.base(this, type);
    this.feature = feature;
};

goog.inherits(P.Event.PlotEditEvent, L.Evented);

P.Event.PlotEditEvent.EDIT_START = "edit_start";
P.Event.PlotEditEvent.EDIT_END = "edit_end";
