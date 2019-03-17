// > packages
import * as React from 'react';

export default interface iMilestone {
    title: string;
    version: string;
    description?: React.ReactNode;
    complete?: boolean;
}
