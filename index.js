var inspect = require('obj-inspector')
module.exports = function (ast, rework) {
    // inspect(ast)

    var newSels = [];
    var allSels = [];

    ast.rules.forEach(function visit(rule) {
        rule.selectors.forEach(function (allSel) {
            if (allSel.match(/^\(.+?\)/)) {
                allSel = allSel.slice(1, -1);
            }
            if (allSel.match(/^\%.+?/)) {
                //allSel = allSel.slice(1);
            }
            Array.prototype.push.apply(allSels, [allSel]);
        });
    });

    ast.rules.forEach(function visit(rule) {
        if (rule.rules)  {
            rule.rules.forEach(visit);
        }

        if (!rule.selectors) return;

        rule.selectors.forEach(function (sel, index, arr) {
            if (sel.match(/^\%/)) {
                //var s = sel.slice(1);
                var s = sel
                Array.prototype.push.apply(newSels, [s]);
                if (check(s)) {
                    arr[index] = s;
                } else {
                    var err = new Error('rework-rule-binding: placeholder selector must not cascade');
                    err.position = rule.declarations.position;
                    throw err;
                }
            }
            if (sel.match(/^\(.+?\)/)) {
                var s = sel.slice(1, -1);
                Array.prototype.push.apply(newSels, [s]);
                if (check(s)) {
                    arr[index] = s;
                } else {
                    var err =  new Error('rework-rule-binding: binding-selector must not cascade');
                    err.position = rule.declarations.position;
                    throw err;
                }
            }
        });
    });

    function check(sel) {
        var counter = 0;
        if (allSels.length > 0) {
            for (var i = 0; i < allSels.length; i++) {
                if (allSels[i] == sel) {
                    counter++;
                }
            }
            if (counter > 1) {
                return false;
            } else {
                return true;
            }
        }
    }
};
