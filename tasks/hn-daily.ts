import type { TaskConfig } from '@browserclijs/browser-cli'

/**
 * Demo scheduled task: runs sub/hn/top every morning.
 *
 * Users copy this into their own ~/.browser-cli/tasks/ and enable it:
 *   browser-cli sub copy sub/hn-daily
 *   browser-cli task enable hn-daily
 *
 * To get notifications on changes to #1, add a `notify` block with your
 * channel name (see `browser-cli notify channel list` for yours), e.g.:
 *   notify: {
 *     channels: ['bark-personal'],
 *     onChangeTemplate:
 *       'HN #1 changed!\n{{ before.stories.0.title }}\n→ {{ after.stories.0.title }}',
 *   }
 */
export const config: TaskConfig = {
  workflow: 'sub/hn/top',
  args: { limit: 10 },
  schedule: '0 9 * * *',
}
