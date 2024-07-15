import { createPipeline } from '@/libs/pipeline';

import type { NavigationPipelineCtx } from './type';

const pipelines = {
  before: createPipeline<NavigationPipelineCtx>(),
  after: createPipeline<NavigationPipelineCtx>(),
};

export function addBeforeNavigationHandler(fn: Parameters<typeof pipelines.before.chain.add>[0]) {
  pipelines.before.chain.add(fn);
};

export function addAfterNavigationHandler(fn: Parameters<typeof pipelines.after.chain.add>[0]) {
  pipelines.after.chain.add(fn);
};

export function dispatchNavigation(
  ctx: NavigationPipelineCtx,
  navigate: (context: NavigationPipelineCtx) => Promise<void>,
) {
  return pipelines.before.execute(ctx)
    .then(navigate)
    .then(() => {
      pipelines.after.execute(ctx);
    });
}
