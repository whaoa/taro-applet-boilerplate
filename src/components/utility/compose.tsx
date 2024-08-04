import { cloneElement, createElement } from 'react';

import type { ComponentType, ReactElement, ReactNode } from 'react';

export function withComposer(...wrappers: Array<ComponentType | ReactElement>) {
  return function Composer() {
    return wrappers.reduceRight(
      (children, current) => {
        if (typeof current === 'function') {
          return createElement(current, null, children);
        }
        // eslint-disable-next-line react/no-clone-element
        return cloneElement(current, undefined, children);
      },
      null as ReactNode,
    );
  };
}
