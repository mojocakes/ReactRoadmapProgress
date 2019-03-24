// > packages
import * as React from 'react';
import semverSort from 'semver-sort';
// > interfaces
import iMilestone from '@/interfaces/iMilestone';
import iTimelineBar from '@/interfaces/iTimelineBar';
// > components
import Milestone, { iProps as iMilestoneProps } from './Milestone';

export interface iProps {
    milestones: iMilestone[];
}
export interface iState {
    milestones: iMilestone[];
}

/**
 * Renders a list of milestones
 */
export class RoadmapProgress extends React.Component<iProps, iState> {
    state = {
        milestones: [],
    };

    constructor(props) {
        super(props);

        // bind methods
        this.orderMilestonesByVersion = this.orderMilestonesByVersion.bind(this);
        this.buildTimelineBarProps = this.buildTimelineBarProps.bind(this);
        this.renderMilestone = this.renderMilestone.bind(this);
    }

    componentDidMount() {
        this.setState({ milestones: this.orderMilestonesByVersion(this.props.milestones) });
    }

    componentWillReceiveProps(nextProps: iProps) {
        this.setState({ milestones: this.orderMilestonesByVersion(nextProps.milestones) })
    }

    /**
     * Orders an array of milestones by their semantic "version"
     * (descending order)
     * 
     * @param {iMilestone[]} milestones 
     * @returns {iMilestone[]}
     */
    public orderMilestonesByVersion(milestones: iMilestone[]): iMilestone[] {
        // todo: this works but it's not very efficient. Does a lot of lookups.
        return semverSort
            .desc(milestones.map(milestone => milestone.version))
            .map(version => milestones.filter(milestone => milestone.version === version)[0]);
    }

    /**
     * Builds the props required to render a single <Milestone> component,
     * considering the context of where a single milestone is in the roadmap.
     * 
     * @param {iMilestones} milestones 
     * @param {number} index 
     * @returns {iMilestoneProps}
     */
    public buildTimelineBarProps(milestones: iMilestone[], index: number): iTimelineBar {
        const previous = milestones[index - 1];
        const current = milestones[index];
        const next = milestones[index + 1];
        const props: iTimelineBar = {};

        // something went wrong if the milestone can't be accessed
        if (!current) { return props; }

        // determines whether a milestone is 100% complete or not
        const completePercent = (complete: number | boolean): number => {
            if (!complete) { return 0; }
            if (complete === true) { return 100; }
            return complete;
        };
        const isComplete = (milestone: iMilestone): boolean => completePercent(milestone.complete) >= 100;

        // whether current milestone, and all previous ones, are complete
        const generationallyCompleteReducer = (prev, current) => prev && isComplete(current);
        const isGenerationallyComplete: boolean = (isComplete(current) && milestones.slice(index).reduce(generationallyCompleteReducer, true));

        // @see test for more verbosity
        if (!previous) { props.backgroundRoundedStart = true; }
        if (!next) { props.backgroundRoundedEnd = true; }
        if (completePercent(current.complete) > 0) {
            props.barHeightPercent = completePercent(current.complete);

            if (isGenerationallyComplete) {
                props.barType = 'complete';
            } else {
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
    }

    /**
     * Renders a single milestone
     * 
     * @param milestone 
     */
    protected renderMilestone(milestone: iMilestone): React.ReactNode {
        const { milestones } = this.state;
        const index = milestones.indexOf(milestone);

        // something went wrong if index is -1!
        if (index < 0) { return null; }

        const timelineBarProps = this.buildTimelineBarProps(milestones, index);
        return (
            <Milestone
                key={index}
                milestone={milestone}
                timelineBarProps={timelineBarProps}
            />
        );
    }

    render() {
        const { milestones } = this.state;
        if (!milestones) { return null; }

        return (
            <div className="roadmap-progress">
                {milestones.map(this.renderMilestone)}
            </div>
        );
    }
}

export default RoadmapProgress;
