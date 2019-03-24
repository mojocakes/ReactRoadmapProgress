"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// > packages
var React = __importStar(require("react"));
;
/**
 * Renders a timeline bar (intended to build a bigger bar when places together)
 */
exports.TimelineBar = function (props) {
    var backgroundType = props.backgroundType, backgroundRoundedStart = props.backgroundRoundedStart, backgroundRoundedEnd = props.backgroundRoundedEnd, barRoundedStart = props.barRoundedStart, barRoundedEnd = props.barRoundedEnd, barType = props.barType, _a = props.barHeightPercent, barHeightPercent = _a === void 0 ? 100 : _a, peakHighlight = props.peakHighlight;
    var classNames = [
        'timeline-bar',
        backgroundType && backgroundType !== 'none' ? "timeline-bar--background-" + backgroundType : '',
        backgroundRoundedStart ? 'timeline-bar--background-rounded-start' : '',
        backgroundRoundedEnd ? 'timeline-bar--background-rounded-end' : '',
        barRoundedStart ? 'timeline-bar--bar-rounded-start' : '',
        barRoundedEnd ? 'timeline-bar--bar-rounded-end' : '',
        barType && barType !== 'none' ? "timeline-bar--bar-" + barType : '',
        peakHighlight ? 'timeline-bar--bar-peak-highlight' : '',
    ];
    return (React.createElement("div", { className: classNames.join(' ') },
        React.createElement("div", { className: "timeline-bar__content", style: { height: barHeightPercent + "%" } })));
};
exports.default = exports.TimelineBar;
//# sourceMappingURL=TimelineBar.js.map