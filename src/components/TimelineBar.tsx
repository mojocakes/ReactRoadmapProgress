// > packages
import * as React from 'react';
// > interfaces
import iTimelineBar from '@/interfaces/iTimelineBar';

export interface iProps extends iTimelineBar {};

/**
 * Renders a timeline bar (intended to build a bigger bar when places together)
 */
export const TimelineBar: React.SFC<iProps> = (props: iProps) => {
    const {
        backgroundType,
        backgroundRoundedStart,
        backgroundRoundedEnd,
        barRoundedStart,
        barRoundedEnd,
        barType,
        barHeightPercent = 100,
        peakHighlight,
    } = props;
    
    const classNames = [
        'timeline-bar',
        backgroundType && backgroundType !== 'none' ? `timeline-bar--background-${backgroundType}` : '',
        backgroundRoundedStart ? 'timeline-bar--background-rounded-start' : '',
        backgroundRoundedEnd ? 'timeline-bar--background-rounded-end' : '',
        barRoundedStart ? 'timeline-bar--bar-rounded-start' : '',
        barRoundedEnd ? 'timeline-bar--bar-rounded-end' : '',
        barType && barType !== 'none' ? `timeline-bar--bar-${barType}` : '',
        peakHighlight ? 'timeline-bar--bar-peak-highlight' : '',
    ];

    return (
        <div className={classNames.join(' ')}>
            <div className="timeline-bar__content" style={{ height: `${barHeightPercent}%` }} />
        </div>
    );
};

export default TimelineBar;
