import * as React from 'react';
import iMilestone from '@/interfaces/iMilestone';
import { iProps as iTimelineBarProps } from './TimelineBar';
export interface iProps {
    milestone: iMilestone;
    timelineBarProps?: iTimelineBarProps;
}
/**
 * Renders a milestone block in the progress bar
 */
export declare class Milestone extends React.Component<iProps> {
    render(): JSX.Element;
}
export default Milestone;
