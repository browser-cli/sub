import type { TaskConfig } from '@browserclijs/browser-cli'

/**
 * Demo scheduled task: runs hn/top every morning and notifies on changes to
 * the #1 story. Users copy this into their own ~/.browser-cli/tasks/ with
 *   browser-cli sub copy sub/hn-daily
 * then enable it with:
 *   browser-cli task enable hn-daily
 */
export const config: TaskConfig = {
  workflow: 'sub/hn/top',
  args: { limit: 10 },
  schedule: '0 9 * * *',
  notify: {
    onChangeTemplate:
      'HN #1 changed!\n{{ before.stories.0.title }} → {{ after.stories.0.title }}',
  },
}
