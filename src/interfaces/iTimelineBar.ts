export default interface iTimelineBar {
    backgroundType?: 'complete' | 'pending' | 'none';
    backgroundRoundedStart?: boolean;
    backgroundRoundedEnd?: boolean;
    barRoundedStart?: boolean;
    barRoundedEnd?: boolean;
    barType?: 'complete' | 'pending' | 'none';
}