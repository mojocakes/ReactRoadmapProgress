// > packages
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// > components
import RoadmapProgress from '@/components/RoadmapProgress';

/**
 * Renders demo app to the DOM
 * 
 * @returns {void}
 */
function bootstrap(): void {
    const milestones = [
        {
            title: 'Launch Company',
            version: '0.0.1',
            // description: <p>Easy, right 🤷‍♂️</p>,
            description: (
                <ul>
                    <li>Item one</li>
                    <li>Item two</li>
                    <li>Item three</li>
                </ul>
            ),
            complete: true,
        },
        {
            title: 'Publish Roadmap',
            version: '0.2.0',
            description: <p>Dream big 💡</p>,
            complete: true,
        },
        {
            title: 'Design Product',
            version: '0.3.0',
            description: <p>Doin some sketches</p>,
            complete: false,
        },
        {
            title: 'Development',
            version: '0.4.0',
            description: <p>Clone Uber, add sandwiches</p>,
            complete: 60,
        },
        {
            title: 'Beta Launch',
            version: '0.9.0',
            description: <p>Invitation only 🎟</p>,
            complete: false,
        },
        {
            title: '$$Profit??',
            version: '1.0.0',
            description: <p>🎉</p>,
            complete: false,
        },
    ];

    const $root = document.getElementById('app-root');
    ReactDOM.render(<RoadmapProgress milestones={milestones} />, $root);
}

bootstrap();
