// > packages
import * as React from 'react';

export default interface iMilestone {
    title: string;
    version: string;
    description?: React.ReactNode;
    /**
     * Percent complete, or true for 100%
     */
    complete?: boolean | number;
}
