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

        // whether current milestone, and all previous ones, are complete
        const generationallyCompleteReducer = (prev, current) => prev && current.complete;
        const isGenerationallyComplete: boolean = (current.complete && milestones.slice(index).reduce(generationallyCompleteReducer, true));

        // @see test for more verbosity
        if (!previous) { props.backgroundRoundedStart = true; }
        if (!next) { props.backgroundRoundedEnd = true; }
        if (current.complete) {
            if (isGenerationallyComplete) {
                props.barType = 'complete';
            } else {
                props.barType = 'pending';
            }

            if (!previous || (previous && !previous.complete)) {
                props.barRoundedStart = true;
            }
            if (!next || (next && !next.complete)) {
                props.barRoundedEnd = true;
            }
        }
        if (isGenerationallyComplete && (!previous || !previous.complete)) {
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
