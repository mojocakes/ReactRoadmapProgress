// > packages
import * as React from 'react';
// > interfaces
import iMilestone from '@/interfaces/iMilestone';
// > components
import TimelineBar, { iProps as iTimelineBarProps } from './TimelineBar';

export interface iProps {
    milestone: iMilestone;
    timelineBarProps?: iTimelineBarProps;
}

/**
 * Renders a milestone block in the progress bar
 */
export class Milestone extends React.Component<iProps> {
    render() {
        const { milestone, timelineBarProps } = this.props;
        const containerClassNames = [
            'milestone',
            milestone.complete ? 'milestone--complete' : '',
        ];

        return (
            <div id={milestone.version} className={containerClassNames.join(' ')}>
                <div className="milestone__timeline">
                    <TimelineBar {...timelineBarProps} />
                </div>
                <div className="milestone__timeline-point" />
                <div className="milestone__content">
                    <h2 className="milestone__title">{milestone.title}</h2>
                    {milestone.version ? <span className="milestone__version">{milestone.version}</span> : null}
                    {milestone.description ? <div className="milestone__description">{milestone.description}</div> : null}
                </div>
            </div>
        );
    }
}

export default Milestone;
