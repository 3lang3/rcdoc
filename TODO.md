
Parse \*.md file and get `pre` block runtime code.

- process md file to html
- add slug
- add gfm rules
- process `pre` and `code` tag content
  - get code string
    - get pre block content
    - get code tag content
    - get formatter content
  - transform code string to ast use babel
    - get dependencies from content
      - local pkg
      - third party pkg
      - peerDeps
    - get import files
      - *.ts, *.js, *.jsx, *.tsx should continue to collect deps for dep
      - style file (.css, .less, .scss, .stylu)
  - makeup `Previewer` component
    - add `language`, `code`, `deps` and formatter props
  - replace `pre` and `code` tag with `Previewer` tag

- transform html to JSX
  - replace `class` to `className`
  - add JSX wrapper
  - inject plugin option custom method


    
