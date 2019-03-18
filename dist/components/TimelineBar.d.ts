import * as React from 'react';
import iTimelineBar from '@/interfaces/iTimelineBar';
export interface iProps extends iTimelineBar {
}
/**
 * Renders a timeline bar (intended to build a bigger bar when places together)
 */
export declare const TimelineBar: React.SFC<iProps>;
export default TimelineBar;
