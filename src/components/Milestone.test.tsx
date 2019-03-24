// > packages
import * as React from 'react';
import { shallow } from 'enzyme';
// > components
import { Milestone, iProps } from './Milestone';
import TimleineBar, { iProps as iTimelineBarProps } from './TimelineBar';

//----- mocks
const defaultProps: iProps = {
    milestone: {
        version: '0.0.1',
        title: 'Milestone 1',
        complete: false,
    },
};

//----- testables
const component = shallow<Milestone>(<Milestone {...defaultProps} />);

//----- tests
describe('components/<Milestone>', () => {
    it('renders a container', () => {
        expect(component.find('.milestone').exists()).toBeTruthy();
    });
    
    it('adds a class to the container if the milestone is complete', () => {
        expect(component.find('.milestone').hasClass('milestone--complete')).toBeFalsy();
        
        component.setProps({
            milestone: {
                ...defaultProps.milestone,
                complete: 30,  
            },
        });
        expect(component.find('.milestone').hasClass('milestone--complete')).toBeFalsy();

        component.setProps({
            milestone: {
                ...defaultProps.milestone,
                complete: true,  
            },
        });
        expect(component.find('.milestone').hasClass('milestone--complete')).toBeTruthy();

        component.setProps({
            milestone: {
                ...defaultProps.milestone,
                complete: 100,  
            },
        });
        expect(component.find('.milestone').hasClass('milestone--complete')).toBeTruthy();
    });

    it('adds a version anchor to the container', () => {
        expect(component.find('.milestone').prop('id')).toBe(defaultProps.milestone.version);
    });

    it('renders the title', () => {
        const $title = component.find('.milestone__title');
        expect($title.exists()).toBeTruthy();
        expect($title.prop('children')).toBe('Milestone 1');
    });

    it('renders the version', () => {
        const $version = component.find('.milestone__version');
        expect($version.exists()).toBeTruthy();
        expect($version.prop('children')).toBe(defaultProps.milestone.version);
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
