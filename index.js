module.exports = function (ast, rework) {
  ast.rules.forEach(function visit(rule) {
    if (rule.rules)  {
      rule.rules.forEach(visit);
    }

    if (!rule.selectors) return;

    var newSels = [];

    rule.selectors.forEach(function (sel) {
      if (sel.match(/^\(.+?\)/)) {
        var arr = sel.slice(1, -1);
        sel = [arr];
        Array.prototype.push.apply(newSels, sel);
      }
    });
    rule.selectors = newSels;
  });
};
