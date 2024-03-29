# TODO

## TODO (MVP)

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
    -   [x] ~~Esbuild hot-reload of index.css (someday)~~
        - Use [watch](https://www.npmjs.com/package/watch) to handle hot-reloads
-   [x] Better CSS
-   [x] Docs
    -   [x] Mermaid
    -   [ ] ~~Gif showing features (not yet)~~
-   [x] favicon

## TODO (easy to use)

-   [ ] undo and redo functionality
-   [x] Be able to add text annotations to nodes and groups
    - [x] Text annotations for groups only.
-   [ ] Supabase setup.
    -   [x] Optional login and save
    -   [x] fix delete diagrams
    -   [x] names for diagrams should be unique to a user, not globally
    -   [ ] ~~Show loading on sign out~~
    -   [x] Validate name unique in real-time before allowing user to save
    -   [ ] be able to live-edit the same diagram
-   [x] better ui
-   [x] cleaner CSS
-   [ ] Self-host
    -   [ ] Static website (with password?)
    -   [ ] AWS architecture diagram to host.
    -   [ ] Terraform to create infrastructure on AWS.
    -   [ ] Terraform for gcp architecture.
-   [x] Nicer README
-   [ ] Generators
    -   [ ] Word break AWS services
    -   [ ] Sizes of GamePlanIcons should be editable
-   [ ] Detailed docs
-   [ ] Husky hooks behaving weirdly?
