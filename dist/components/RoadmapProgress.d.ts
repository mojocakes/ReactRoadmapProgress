import * as React from 'react';
import iMilestone from '@/interfaces/iMilestone';
import iTimelineBar from '@/interfaces/iTimelineBar';
export interface iProps {
    milestones: iMilestone[];
}
export interface iState {
    milestones: iMilestone[];
}
/**
 * Renders a list of milestones
 */
export declare class RoadmapProgress extends React.Component<iProps, iState> {
    state: {
        milestones: any[];
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: iProps): void;
    /**
     * Orders an array of milestones by their semantic "version"
     * (descending order)
     *
     * @param {iMilestone[]} milestones
     * @returns {iMilestone[]}
     */
    orderMilestonesByVersion(milestones: iMilestone[]): iMilestone[];
    /**
     * Builds the props required to render a single <Milestone> component,
     * considering the context of where a single milestone is in the roadmap.
     *
     * @param {iMilestones} milestones
     * @param {number} index
     * @returns {iMilestoneProps}
     */
    buildTimelineBarProps(milestones: iMilestone[], index: number): iTimelineBar;
    /**
     * Renders a single milestone
     *
     * @param milestone
     */
    protected renderMilestone(milestone: iMilestone): React.ReactNode;
    render(): JSX.Element;
}
export default RoadmapProgress;
