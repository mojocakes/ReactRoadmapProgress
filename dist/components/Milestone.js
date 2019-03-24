"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// > packages
var React = __importStar(require("react"));
// > components
var TimelineBar_1 = __importDefault(require("./TimelineBar"));
/**
 * Renders a milestone block in the progress bar
 */
var Milestone = /** @class */ (function (_super) {
    __extends(Milestone, _super);
    function Milestone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Milestone.prototype.render = function () {
        var _a = this.props, milestone = _a.milestone, timelineBarProps = _a.timelineBarProps;
        var containerClassNames = [
            'milestone',
            milestone.complete && (milestone.complete === true || milestone.complete >= 100) ? 'milestone--complete' : '',
        ];
        return (React.createElement("div", { id: milestone.version, className: containerClassNames.join(' ') },
            React.createElement("div", { className: "milestone__timeline" },
                React.createElement(TimelineBar_1.default, __assign({}, timelineBarProps))),
            React.createElement("div", { className: "milestone__timeline-point" }),
            React.createElement("div", { className: "milestone__content" },
                milestone.version ? React.createElement("span", { className: "milestone__version" }, milestone.version) : null,
                React.createElement("h2", { className: "milestone__title" }, milestone.title),
                milestone.description ? React.createElement("div", { className: "milestone__description" }, milestone.description) : null)));
    };
    return Milestone;
}(React.Component));
exports.Milestone = Milestone;
exports.default = Milestone;
//# sourceMappingURL=Milestone.js.map