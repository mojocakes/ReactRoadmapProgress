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
var semver_sort_1 = __importDefault(require("semver-sort"));
// > components
var Milestone_1 = __importDefault(require("./Milestone"));
/**
 * Renders a list of milestones
 */
var RoadmapProgress = /** @class */ (function (_super) {
    __extends(RoadmapProgress, _super);
    function RoadmapProgress(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            milestones: [],
        };
        // bind methods
        _this.orderMilestonesByVersion = _this.orderMilestonesByVersion.bind(_this);
        _this.buildTimelineBarProps = _this.buildTimelineBarProps.bind(_this);
        _this.renderMilestone = _this.renderMilestone.bind(_this);
        return _this;
    }
    RoadmapProgress.prototype.componentDidMount = function () {
        this.setState({ milestones: this.orderMilestonesByVersion(this.props.milestones) });
    };
    RoadmapProgress.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ milestones: this.orderMilestonesByVersion(nextProps.milestones) });
    };
    /**
     * Orders an array of milestones by their semantic "version"
     * (descending order)
     *
     * @param {iMilestone[]} milestones
     * @returns {iMilestone[]}
     */
    RoadmapProgress.prototype.orderMilestonesByVersion = function (milestones) {
        // todo: this works but it's not very efficient. Does a lot of lookups.
        return semver_sort_1.default
            .desc(milestones.map(function (milestone) { return milestone.version; }))
            .map(function (version) { return milestones.filter(function (milestone) { return milestone.version === version; })[0]; });
    };
    /**
     * Builds the props required to render a single <Milestone> component,
     * considering the context of where a single milestone is in the roadmap.
     *
     * @param {iMilestones} milestones
     * @param {number} index
     * @returns {iMilestoneProps}
     */
    RoadmapProgress.prototype.buildTimelineBarProps = function (milestones, index) {
        var previous = milestones[index - 1];
        var current = milestones[index];
        var next = milestones[index + 1];
        var props = {};
        // something went wrong if the milestone can't be accessed
        if (!current) {
            return props;
        }
        // determines whether a milestone is 100% complete or not
        var completePercent = function (complete) {
            if (!complete) {
                return 0;
            }
            if (complete === true) {
                return 100;
            }
            return complete;
        };
        var isComplete = function (milestone) { return completePercent(milestone.complete) >= 100; };
        // whether current milestone, and all previous ones, are complete
        var generationallyCompleteReducer = function (prev, current) { return prev && isComplete(current); };
        var isGenerationallyComplete = (isComplete(current) && milestones.slice(index).reduce(generationallyCompleteReducer, true));
        // @see test for more verbosity
        if (!previous) {
            props.backgroundRoundedStart = true;
        }
        if (!next) {
            props.backgroundRoundedEnd = true;
        }
        if (completePercent(current.complete) > 0) {
            props.barHeightPercent = completePercent(current.complete);
            if (isGenerationallyComplete) {
                props.barType = 'complete';
            }
            else {
                props.barType = 'pending';
            }
            if (!previous || (completePercent(current.complete) < 100) || (previous && completePercent(previous.complete) < 1)) {
                // if (!previous || (previous && !isComplete(previous))) {
                props.barRoundedStart = true;
            }
            if (!next || (next && !isComplete(next))) {
                props.barRoundedEnd = true;
            }
        }
        if (isGenerationallyComplete && (!previous || !isComplete(previous))) {
            props.peakHighlight = true;
        }
        return props;
    };
    /**
     * Renders a single milestone
     *
     * @param milestone
     */
    RoadmapProgress.prototype.renderMilestone = function (milestone) {
        var milestones = this.state.milestones;
        var index = milestones.indexOf(milestone);
        // something went wrong if index is -1!
        if (index < 0) {
            return null;
        }
        var timelineBarProps = this.buildTimelineBarProps(milestones, index);
        return (React.createElement(Milestone_1.default, { key: index, milestone: milestone, timelineBarProps: timelineBarProps }));
    };
    RoadmapProgress.prototype.render = function () {
        var milestones = this.state.milestones;
        if (!milestones) {
            return null;
        }
        return (React.createElement("div", { className: "roadmap-progress" }, milestones.map(this.renderMilestone)));
    };
    return RoadmapProgress;
}(React.Component));
exports.RoadmapProgress = RoadmapProgress;
exports.default = RoadmapProgress;
//# sourceMappingURL=RoadmapProgress.js.map