# AWS Game Plan

A free and simple diagramming tool for AWS that doesn't suck.

## Getting started

1.  `npm run husky init`
2.  `npm run generate`
3.  `npm start`

## Architecture

```mermaid
flowchart TD
    title[<u>Icons to Components</u>]
    A(Download AWS Icons) -->|pipeline/awsIcons.sh| B(assets/awsIcons)
    B --> |generators| C(React Components)
```

## TODO

### TODO (MVP)

-   [x] Saving and reloading flows.
    -   [x] Query params
-   [x] Bugfixes
    -   [x] Can't delete node if it's not selectable
        -   ~~`onDragStart -> select node, onDragEnd -> de-select node??`~~
        -   Just add a delete button
    -   [x] Overlapping groups
-   [x] Housekeeping
    -   [x] Formatting (Husky)
    -   [x] Fix small scroll
    -   [ ] ~~Move all css to index.css~~
    -   [ ] Esbuild hot-reload of index.css (someday)
-   [x] Better CSS
-   [x] Docs
    -   [x] Mermaid
    -   [ ] Gif showing features (not yet)
-   [x] favicon


### TODO (easy to use)
-   [ ] PWA (mobile friendly)
-   [ ] Supabase setup.
    -   [ ] Optional login and save
    -   [ ] Undo & redo buttons with history saved
-   [ ] Walkthrough
-   [ ] Self-host
    -   [ ] GraphQL & REST API via Docker.
    -   [ ] AWS architecture diagram to host.
    -   [ ] Terraform to create infrastructure on AWS.
