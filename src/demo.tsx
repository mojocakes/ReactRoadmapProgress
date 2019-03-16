// > packages
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// > components
import RoadmapProgress from '@/components/RoadmapProgress';
import Milestone from '@/components/Milestone';

function bootstrap() {
    const $root = document.getElementById('app-root');
    ReactDOM.render(
        <>
            <RoadmapProgress />
            <br /><br /><br />
            <Milestone
                milestone={{
                    title: 'Milestone 3',
                    version: '0.3.0',
                    complete: false,
                }}
                timelineBarProps={{
                    backgroundRoundedStart: true,
                }}
            />
            <Milestone
                milestone={{
                    title: 'Milestone 2',
                    version: '0.2.0',
                    complete: false,
                }}
                timelineBarProps={{
                    barType: 'pending',
                    barRoundedStart: true,
                }}
            />
            <Milestone
                milestone={{
                    title: 'Publish Roadmap',
                    version: '0.1.0',
                    description: <p>Here it is! If you like this layout I've released it as an open source React component.</p>,
                    complete: true,
                }}
                timelineBarProps={{
                    backgroundType: 'pending',
                    barType: 'complete',
                    barRoundedStart: true,
                    backgroundRoundedEnd: true,
                    barRoundedEnd: true,
                }}
            />
        </>
    , $root);
}

bootstrap();
