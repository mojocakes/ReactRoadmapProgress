// react/enzyme support
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './requestAnimationFramePolyfill';

configure({
    adapter: new Adapter(),
});
