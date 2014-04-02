# rework-rule-binding

A [Rework](https://github.com/reworkcss/rework) plugin to not cascade the rules.

# Use
As a Rework plugin:

```javascript
// dependencies
var fs = require('fs');
var rework = require('rework');
var bind = require('rework-rule-binding');

// css to be processed
var css = fs.readFileSync('build/build.css', 'utf8').toString();

// process css using rework-vars
var out = rework(css).use(bind).toString();
```

# What to expect
Selectors enclosed in parenthesis is not cascading.

```
(.hoge) {
  color: red;
}

.piyo {
  color: blue;
}

.hoge {
  font-size: 18px;
}
```
runs **error**.