# React Roadmap Progress
Displays your roadmap progress in a timeline format. Built in ReactJS.

![Screenshot of <ReactRoadmapProgress> component](https://raw.githubusercontent.com/mojocakes/ReactRoadmapProgress/master/images/demo-screenshot.png)

## Installing
`npm i react-roadmap-progress --save`

## Usage
Make sure the “version” property belonging to each milestone is a valid [semver](https://semver.org) version number, as this library doesn’t validate them.

### Example

```
import RoadmapProgress from ‘react-roadmap-progress’;

const milestones = [
    {
        title: 'Milestone 1',
        version: '0.0.1',
        description: 'Just getting started...',
        complete: true,
    },
    {
        title: 'Milestone 2',
        version: '1.0.0',
        description: (
            <div>
                <h2>Launch!</h2>
                <p>Woohoo!</p>
            </div>
        ),
        complete: true,
    },
];

<RoadmapProgress milestones={milestones} />
```
