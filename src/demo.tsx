// > packages
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// > components
import RoadmapProgress from '@/components/RoadmapProgress';

function bootstrap() {
    const $root = document.getElementById('#app-root');
    ReactDOM.render(<RoadmapProgress />, $root);
}

bootstrap();
