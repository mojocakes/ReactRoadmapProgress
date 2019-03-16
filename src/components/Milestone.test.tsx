// > packages
import * as React from 'react';
import { shallow } from 'enzyme';
// > components
import { Milestone, iProps } from './Milestone';
import TimleineBar, { iProps as iTimelineBarProps } from './TimelineBar';

//----- mocks
const defaultProps: iProps = {
    milestone: {
        title: 'Milestone 1',
        complete: false,
    },
};

//----- testables
const component = shallow<Milestone>(<Milestone {...defaultProps} />);

//----- tests
describe('components/<Milestone>', () => {
    it('renders the title', () => {
        const $title = component.find('.milestone__title');
        expect($title.exists()).toBeTruthy();
        expect($title.prop('children')).toBe('Milestone 1');
    });

    it('renders the version, if provided', () => {
        let $version = component.find('.milestone__version');
        expect($version.exists()).toBeFalsy();
        
        component.setProps({
            milestone: {
                ...defaultProps.milestone,
                version: '0.0.1',
            },
        });
        $version = component.find('.milestone__version');
        expect($version.exists()).toBeTruthy();
        expect($version.prop('children')).toBe('0.0.1');
    });

    it('renders the description, if provided', () => {
        let $description = component.find('.milestone__description');
        expect($description.exists()).toBeFalsy();
        
        const description = 'This is the description for this milestone';
        component.setProps({
            milestone: {
                ...defaultProps.milestone,
                description,
            },
        });
        $description = component.find('.milestone__description');
        expect($description.exists()).toBeTruthy();
        expect($description.prop('children')).toBe(description);
    });

    it('renders <TimelineBar>', () => {
        const $TimelineBar = component.find(TimleineBar);
        expect($TimelineBar.exists()).toBeTruthy();
    });

    it('passes "timelineBarProps" prop to <TimelineBar>', () => {
        const timelineBarProps: iTimelineBarProps = {
            barType: 'complete',
            barRoundedStart: true,
        };
        component.setProps({ timelineBarProps });
        const $TimelineBar = component.find(TimleineBar);
        expect($TimelineBar.props()).toEqual(timelineBarProps);
    });
});
