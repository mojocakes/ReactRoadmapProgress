// > packages
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
// > components
import { TimelineBar, iProps } from './TimelineBar';

//----- mocks
const defaultProps: iProps = {};

//----- testables
const component = shallow(<TimelineBar {...defaultProps} />);

//----- helpers
const getContainer = (props: any = {}): ShallowWrapper => {
    component.setProps(props);
    component.update();
    const $el = component.find('.timeline-bar');
    return $el;
};
const getContent = (props: any = {}): ShallowWrapper => {
    component.setProps(props);
    component.update();
    const $el = component.find('.timeline-bar__content');
    return $el;
};

//----- tests

describe('components/<TimelineBar>', () => {
    describe('container', () => {
        it('should exist', () => {
            expect(getContainer().exists()).toBeTruthy();
        });
    
        it('should add a class when "backgroundType" prop is provided', () => {
            expect(getContainer({ backgroundType: 'complete' })
                .hasClass('timeline-bar--background-complete')).toBeTruthy();
            
            expect(getContainer({ backgroundType: 'pending' })
                .hasClass('timeline-bar--background-pending')).toBeTruthy();
        });
        
        it('should NOT add a class when "backgroundType" prop is "none"', () => {
            expect(getContainer({ backgroundType: 'none' })
                .hasClass('timeline-bar--background-none')).toBeFalsy();
        });
    
        it('should add a class when "backgroundRoundedStart" prop is provided', () => {
            expect(getContainer({ backgroundRoundedStart: true })
                .hasClass('timeline-bar--background-rounded-start')).toBeTruthy();
        });
    
        it('should add a class when "backgroundRoundedEnd" prop is provided', () => {
            expect(getContainer({ backgroundRoundedEnd: true })
                .hasClass('timeline-bar--background-rounded-end')).toBeTruthy();
        });
    
        it('should add a class when "barRoundedStart" prop is provided', () => {
            expect(getContainer({ barRoundedStart: true })
                .hasClass('timeline-bar--bar-rounded-start')).toBeTruthy();
        });
    
        it('should add a class when "barRoundedEnd" prop is provided', () => {
            expect(getContainer({ barRoundedEnd: true })
                .hasClass('timeline-bar--bar-rounded-end')).toBeTruthy();
        });
    
        it('should add a class when "barType" prop is provided', () => {
            expect(getContainer({ barType: 'complete' })
                .hasClass('timeline-bar--bar-complete')).toBeTruthy();
    
            expect(getContainer({ barType: 'pending' })
                .hasClass('timeline-bar--bar-pending')).toBeTruthy();
        });
    
        it('should NOT add a class when "barType" prop is "none"', () => {
            expect(getContainer({ barType: 'none' })
                .hasClass('timeline-bar--bar-none')).toBeFalsy();
            });
            
        it('should add a class when "peakHighlight" is "true"', () => {
            expect(getContainer({ peakHighlight: true, })
                .hasClass('timeline-bar--bar-peak-highlight')).toBeTruthy();
        });
    });

    describe('content', () => {
        it('should exist', () => {
            expect(getContent().exists()).toBeTruthy();
        });

        it('should have a "height" style property', () => {
            expect((getContent({ barHeightPercent: 23 }).prop('style') as any).height).toBe('23%');
        });

        it('"height" style property should be 100 if undefined', () => {
            expect((getContent({ barHeightPercent: undefined }).prop('style') as any).height).toBe('100%');
        });
    });
});
