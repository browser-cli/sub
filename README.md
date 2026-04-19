# browser-cli/sub — demo subscription repo

This is a **reference layout** for a [browser-cli](https://github.com/browser-cli/browser-cli) subscription repo. Fork or copy this structure when you want to share workflows/tasks across machines or teammates via a git repo.

## What lives here

```
workflows/           # shared browser workflows (TypeScript, same shape as ~/.browser-cli/workflows/)
  hn/
    top.ts           # fetch top N stories from Hacker News

tasks/               # shared scheduled-task configs (read-only hints — users sub copy to enable)
  hn-daily.ts        # runs `sub/hn/top` at 09:00 daily and notifies on #1 change
```

A subscription repo is a plain git repo with two conventional directories:

- `workflows/` — every `.ts` file here is importable as `<sub-name>/<path-without-ts>`
- `tasks/` — every `.ts` file here is listed by `browser-cli task list` with a `sub copy` hint; the daemon never schedules a task from a sub

Nested dirs under `workflows/` and `tasks/` are fine — `workflows/hn/top.ts` is reachable as `sub/hn/top` (assuming the sub was added with the default name `sub`).

## Subscribing to this repo

```bash
browser-cli sub add git@github.com:browser-cli/sub.git
# or
browser-cli sub add https://github.com/browser-cli/sub.git
```

The clone lands in `~/.browser-cli-subs/sub/` and the subscription is recorded in `~/.browser-cli/subs.json`.

## Using the workflow

```bash
browser-cli list                            # your workflows + subs
browser-cli describe sub/hn/top             # view schema + signature
browser-cli run sub/hn/top                  # run with defaults (limit=10)
browser-cli run sub/hn/top --args '{"limit": 5}'
```

Output is a JSON object with the top stories:

```json
{
  "count": 10,
  "stories": [
    { "rank": "1", "title": "…", "url": "…", "score": "312 points", "user": "pg", "comments": "128 comments" },
    …
  ]
}
```

## Scheduling the daily task

Subscribed tasks are read-only. Copy `hn-daily` into your own `tasks/` first, then enable it:

```bash
browser-cli sub copy sub/hn-daily           # → ~/.browser-cli/tasks/hn-daily.ts
browser-cli task enable hn-daily            # schedule picks it up immediately
```

Edit the copy to tweak the schedule, notification channels, or args.

## Pulling updates

```bash
browser-cli sub update                      # update every sub
browser-cli sub update sub                  # just this one
```

If you've edited files inside `~/.browser-cli-subs/sub/` directly, `sub update` warns before discarding them. **Don't edit sub files in place** — `sub copy` them first.

## Removing the subscription

```bash
browser-cli sub remove sub
```

Clones + registry entry are deleted. Files already `sub copy`-ed into your own dirs are untouched.

## Creating your own subscription repo

1. Init an empty git repo.
2. Create `workflows/` and/or `tasks/` directories.
3. Add `.ts` files following the same conventions as files under `~/.browser-cli/`.
4. Push to any git host reachable via HTTPS or SSH.
5. Share the clone URL — others run `browser-cli sub add <url>`.

No `package.json` is needed in the sub repo — `browser-cli` provides the runtime, and the CLI symlinks its own `node_modules` into each sub clone so imports like `zod` and `@browserbasehq/stagehand` resolve automatically.

## License

[MIT](./LICENSE)
