// > packages
import * as React from 'react';
import { shallow } from 'enzyme';
// > interfaces
import iMilestone from '@/interfaces/iMilestone';
// > components
import { RoadmapProgress, iProps } from './RoadmapProgress';

//----- mocks
const milestonesOrdered: iMilestone[] = [
    {
        version: '1.1.0',
        title: 'Milestone 1',
        complete: true,
    },
    {
        version: '1.0.0',
        title: 'Milestone 1',
        complete: true,
    },
    {
        version: '0.9.0',
        title: 'Milestone 1',
        complete: true,
    },
    {
        version: '0.0.1',
        title: 'Milestone 1',
        complete: true,
    },
];
const roadmapUnordered: iMilestone[] = [
    milestonesOrdered[2],
    milestonesOrdered[0],
    milestonesOrdered[1],
    milestonesOrdered[3],
];
const defaultProps: iProps = {
    milestones: roadmapUnordered,
};

//----- testables
const component = shallow<RoadmapProgress>(<RoadmapProgress {...defaultProps} />);

//----- tests
describe('components/<RoadmapProgress>', () => {
    it('renders a container', () => {
        expect(component.find('.roadmap-progress').exists()).toBeTruthy();
    });

    it('orders milestones prop by version, and saves to state', () => {
        // default props
        component.instance().componentDidMount();
        expect(component.state('milestones')).toEqual(milestonesOrdered);
        
        // updated props
        component.setState({ milestones: [] });
        component.setProps(defaultProps);
        expect(component.state('milestones')).toEqual(milestonesOrdered);
    });

    describe('timelineBarProps() method', () => {
        beforeAll(() => {
            this.func = component.instance().buildTimelineBarProps;
        });

        it('sets "backgroundRoundedStart" to "true" if the milestone is first in the roadmap', () => {
            const milestone: iMilestone = {
                version: '0.0.1',
                title: 'test milestone',
            };
            expect(this.func([milestone, milestone], 0).backgroundRoundedStart).toBe(true);
        });

        it('sets "backgroundRoundedEnd" to "true" if the milestone is last in the roadmap', () => {
            const milestone: iMilestone = {
                version: '0.0.1',
                title: 'test milestone',
            };
            expect(this.func([milestone, milestone], 1).backgroundRoundedEnd).toBe(true);
        });

        it('sets "barRoundedStart" to "true" if the milestone is complete, and previous is not', () => {
            const milestoneComplete: iMilestone = {
                version: '0.0.1',
                title: 'test milestone',
                complete: true,
            };
            const milestoneIncomplete: iMilestone = {
                version: '0.0.2',
                title: 'test milestone',
            };
            expect(this.func([milestoneIncomplete, milestoneComplete, milestoneIncomplete], 1).barRoundedStart).toBe(true);
        });


        it('sets "barRoundedEnd" to "true" if the milestone is complete, and the previous milestone is not', () => {
            const milestoneComplete: iMilestone = {
                version: '0.0.1',
                title: 'test milestone',
                complete: true,
            };
            const milestoneIncomplete: iMilestone = {
                version: '0.0.2',
                title: 'test milestone',
            };
            expect(this.func([milestoneIncomplete, milestoneComplete], 1).barRoundedEnd).toBe(true);
        });

        it('does NOT set "barRoundedEnd" if the next milestone is complete', () => {
            const milestoneComplete: iMilestone = {
                version: '0.0.1',
                title: 'test milestone',
                complete: true,
            };

            expect(this.func([milestoneComplete, milestoneComplete], 0).barRoundedEnd).toBeFalsy();
        });

        it('sets "barType" to "complete" if the milestone is first and complete', () => {
            const milestoneComplete: iMilestone = {
                version: '0.0.1',
                title: 'test milestone',
                complete: true,
            };
            expect(this.func([milestoneComplete], 0).barType).toBe('complete');
        });

        it('sets "barType" to "pending" if the milestone is complete, but next is not', () => {
            const milestoneIncomplete: iMilestone = {
                version: '0.0.2',
                title: 'test milestone',
            };
            const milestoneComplete: iMilestone = {
                version: '0.0.1',
                title: 'test milestone',
                complete: true,
            };
            expect(this.func([milestoneComplete, milestoneIncomplete], 0).barType).toBe('pending');
        });

        it('sets "peakHighlight" to "true" if the milestone is the last complete, and all previous milestones are complete', () => {
            const milestoneComplete: iMilestone = {
                version: '0.0.19',
                title: 'test milestone',
                complete: true,
            };
            const milestoneIncomplete: iMilestone = {
                version: '0.0.2',
                title: 'test milestone',
            };
            expect(this.func([milestoneIncomplete, milestoneComplete, milestoneComplete, milestoneComplete], 1).peakHighlight).toBe(true);
        });
    });
});
