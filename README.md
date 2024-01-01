# AWS Game Plan

A visual diagram tool for AWS with support for terraform output.


## TODO
- [x] Saving and reloading flows.
    - [x] Query params
- [x] Bugfixes
    - [x] Can't delete node if it's not selectable
        - ~~`onDragStart -> select node, onDragEnd -> de-select node??`~~
        - Just add a delete button
- [ ] Housekeeping
    - [ ] Formatting (Husky)
    - [x] Fix small scroll
- [ ] Better CSS
- [ ] Docs
  - [ ] Mermaid
  - [ ] Gif showing features
<!--Completes MVP-->
- [ ] PWA (mobile friendly)
- [ ] Supabase setup.
    - [ ] Optional login and save
    - [ ] Undo & redo buttons with history saved
- [ ] Self-host
    - [ ] GraphQL & REST API via Docker.
    - [ ] AWS architecture diagram to host.
    - [ ] Terraform to create infrastructure on AWS.


## Thoughts