__report = {"info":{"file":"src/topics/sorted.js","fileShort":"src/topics/sorted.js","fileSafe":"src_topics_sorted_js","link":"files/src_topics_sorted_js/index.html"},"complexity":{"methodAggregate":{"cyclomatic":58,"cyclomaticDensity":29.744,"halstead":{"bugs":3.79,"difficulty":49.813,"effort":566301.629,"length":1466,"time":31461.202,"vocabulary":216,"volume":11368.665,"operands":{"distinct":192,"total":797,"identifiers":["__stripped__"]},"operators":{"distinct":24,"total":669,"identifiers":["__stripped__"]}},"params":55,"sloc":{"logical":195,"physical":295}},"settings":{"commonjs":true,"forin":false,"logicalor":true,"switchcase":true,"trycatch":false,"newmi":true},"classes":[],"dependencies":[{"line":3,"path":"lodash","type":"cjs"},{"line":5,"path":"../database","type":"cjs"},{"line":6,"path":"../privileges","type":"cjs"},{"line":7,"path":"../user","type":"cjs"},{"line":8,"path":"../categories","type":"cjs"},{"line":9,"path":"../meta","type":"cjs"},{"line":10,"path":"../plugins","type":"cjs"}],"errors":[],"lineEnd":295,"lineStart":1,"maintainability":69.43,"methods":[{"cyclomatic":4,"cyclomaticDensity":15.385,"halstead":{"bugs":0.338,"difficulty":16.429,"effort":16673.733,"length":174,"time":926.318,"vocabulary":57,"volume":1014.923,"operands":{"distinct":42,"total":92,"identifiers":["__stripped__"]},"operators":{"distinct":15,"total":82,"identifiers":["__stripped__"]}},"params":3,"sloc":{"logical":26,"physical":43},"errors":[],"lineEnd":55,"lineStart":13,"name":"filterTids"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.002,"difficulty":0.75,"effort":4.755,"length":4,"time":0.264,"vocabulary":3,"volume":6.34,"operands":{"distinct":2,"total":3,"identifiers":["__stripped__"]},"operators":{"distinct":1,"total":1,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":27,"lineStart":27,"name":"<anonymous>"},{"cyclomatic":4,"cyclomaticDensity":133.333,"halstead":{"bugs":0.032,"difficulty":3.5,"effort":335.679,"length":23,"time":18.649,"vocabulary":18,"volume":95.908,"operands":{"distinct":11,"total":11,"identifiers":["__stripped__"]},"operators":{"distinct":7,"total":12,"identifiers":["__stripped__"]}},"params":0,"sloc":{"logical":3,"physical":6},"errors":[],"lineEnd":34,"lineStart":29,"name":"getIgnoredCids"},{"cyclomatic":7,"cyclomaticDensity":0,"halstead":{"bugs":0.048,"difficulty":5.667,"effort":819.145,"length":37,"time":45.508,"vocabulary":15,"volume":144.555,"operands":{"distinct":9,"total":17,"identifiers":["__stripped__"]},"operators":{"distinct":6,"total":20,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":7},"errors":[],"lineEnd":51,"lineStart":45,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.007,"difficulty":1.5,"effort":33.688,"length":8,"time":1.872,"vocabulary":7,"volume":22.459,"operands":{"distinct":4,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":4,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":50,"lineStart":50,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.005,"difficulty":1.333,"effort":18.575,"length":6,"time":1.032,"vocabulary":5,"volume":13.932,"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":2,"total":2,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":50,"lineStart":50,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.002,"difficulty":0.75,"effort":4.755,"length":4,"time":0.264,"vocabulary":3,"volume":6.34,"operands":{"distinct":2,"total":3,"identifiers":["__stripped__"]},"operators":{"distinct":1,"total":1,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":51,"lineStart":51,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":5.882,"halstead":{"bugs":0.064,"difficulty":1.737,"effort":333.049,"length":43,"time":18.503,"vocabulary":22,"volume":191.756,"operands":{"distinct":19,"total":22,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":21,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":17,"physical":239},"errors":[],"lineEnd":295,"lineStart":57,"name":"<anonymous>"},{"cyclomatic":10,"cyclomaticDensity":52.632,"halstead":{"bugs":0.298,"difficulty":18.85,"effort":16877.04,"length":165,"time":937.613,"vocabulary":43,"volume":895.334,"operands":{"distinct":30,"total":87,"identifiers":["__stripped__"]},"operators":{"distinct":13,"total":78,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":19,"physical":25},"errors":[],"lineEnd":82,"lineStart":58,"name":"<anonymous>"},{"cyclomatic":9,"cyclomaticDensity":34.615,"halstead":{"bugs":0.298,"difficulty":17.73,"effort":15842.499,"length":156,"time":880.139,"vocabulary":53,"volume":893.556,"operands":{"distinct":37,"total":82,"identifiers":["__stripped__"]},"operators":{"distinct":16,"total":74,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":26,"physical":31},"errors":[],"lineEnd":114,"lineStart":84,"name":"getTids"},{"cyclomatic":2,"cyclomaticDensity":20,"halstead":{"bugs":0.052,"difficulty":5.714,"effort":891.886,"length":35,"time":49.549,"vocabulary":22,"volume":156.08,"operands":{"distinct":14,"total":20,"identifiers":["__stripped__"]},"operators":{"distinct":8,"total":15,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":10,"physical":14},"errors":[],"lineEnd":129,"lineStart":116,"name":"sortToSet"},{"cyclomatic":2,"cyclomaticDensity":22.222,"halstead":{"bugs":0.164,"difficulty":8.433,"effort":4156.746,"length":92,"time":230.93,"vocabulary":41,"volume":492.895,"operands":{"distinct":30,"total":46,"identifiers":["__stripped__"]},"operators":{"distinct":11,"total":46,"identifiers":["__stripped__"]}},"params":3,"sloc":{"logical":9,"physical":24},"errors":[],"lineEnd":154,"lineStart":131,"name":"getTidsWithMostPostsInTerm"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.002,"difficulty":0,"effort":0,"length":4,"time":0,"vocabulary":3,"volume":6.34,"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":0,"total":0,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":139,"lineStart":139,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.001,"difficulty":0,"effort":0,"length":3,"time":0,"vocabulary":2,"volume":3,"operands":{"distinct":2,"total":3,"identifiers":["__stripped__"]},"operators":{"distinct":0,"total":0,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":145,"lineStart":145,"name":"<anonymous>"},{"cyclomatic":2,"cyclomaticDensity":100,"halstead":{"bugs":0.022,"difficulty":4.8,"effort":319.528,"length":21,"time":17.752,"vocabulary":9,"volume":66.568,"operands":{"distinct":5,"total":12,"identifiers":["__stripped__"]},"operators":{"distinct":4,"total":9,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":2,"physical":4},"errors":[],"lineEnd":150,"lineStart":147,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.005,"difficulty":1.333,"effort":18.575,"length":6,"time":1.032,"vocabulary":5,"volume":13.932,"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":2,"total":2,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":152,"lineStart":152,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.007,"difficulty":2,"effort":41.795,"length":9,"time":2.322,"vocabulary":5,"volume":20.897,"operands":{"distinct":3,"total":6,"identifiers":["__stripped__"]},"operators":{"distinct":2,"total":3,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":153,"lineStart":153,"name":"<anonymous>"},{"cyclomatic":3,"cyclomaticDensity":37.5,"halstead":{"bugs":0.106,"difficulty":8.021,"effort":2550.75,"length":62,"time":141.708,"vocabulary":35,"volume":318.016,"operands":{"distinct":24,"total":35,"identifiers":["__stripped__"]},"operators":{"distinct":11,"total":27,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":8,"physical":10},"errors":[],"lineEnd":165,"lineStart":156,"name":"getWatchedTopics"},{"cyclomatic":2,"cyclomaticDensity":28.571,"halstead":{"bugs":0.095,"difficulty":9.579,"effort":2730,"length":57,"time":151.667,"vocabulary":32,"volume":285,"operands":{"distinct":19,"total":28,"identifiers":["__stripped__"]},"operators":{"distinct":13,"total":29,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":7,"physical":15},"errors":[],"lineEnd":181,"lineStart":167,"name":"getTagTids"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.002,"difficulty":0,"effort":0,"length":4,"time":0,"vocabulary":3,"volume":6.34,"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":0,"total":0,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":170,"lineStart":170,"name":"<anonymous>"},{"cyclomatic":2,"cyclomaticDensity":0,"halstead":{"bugs":0.005,"difficulty":0.625,"effort":8.707,"length":6,"time":0.484,"vocabulary":5,"volume":13.932,"operands":{"distinct":4,"total":5,"identifiers":["__stripped__"]},"operators":{"distinct":1,"total":1,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":179,"lineStart":179,"name":"<anonymous>"},{"cyclomatic":3,"cyclomaticDensity":30,"halstead":{"bugs":0.167,"difficulty":10.5,"effort":5273.811,"length":92,"time":292.989,"vocabulary":44,"volume":502.268,"operands":{"distinct":30,"total":45,"identifiers":["__stripped__"]},"operators":{"distinct":14,"total":47,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":10,"physical":26},"errors":[],"lineEnd":208,"lineStart":183,"name":"getCidTids"},{"cyclomatic":1,"cyclomaticDensity":50,"halstead":{"bugs":0.027,"difficulty":3.889,"effort":311.111,"length":20,"time":17.284,"vocabulary":16,"volume":80,"operands":{"distinct":9,"total":10,"identifiers":["__stripped__"]},"operators":{"distinct":7,"total":10,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":2,"physical":4},"errors":[],"lineEnd":188,"lineStart":185,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.005,"difficulty":0,"effort":0,"length":6,"time":0,"vocabulary":5,"volume":13.932,"operands":{"distinct":5,"total":6,"identifiers":["__stripped__"]},"operators":{"distinct":0,"total":0,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":186,"lineStart":186,"name":"<anonymous>"},{"cyclomatic":4,"cyclomaticDensity":80,"halstead":{"bugs":0.063,"difficulty":7.538,"effort":1433.55,"length":44,"time":79.642,"vocabulary":20,"volume":190.165,"operands":{"distinct":13,"total":28,"identifiers":["__stripped__"]},"operators":{"distinct":7,"total":16,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":5,"physical":8},"errors":[],"lineEnd":200,"lineStart":193,"name":"<anonymous>"},{"cyclomatic":11,"cyclomaticDensity":47.826,"halstead":{"bugs":0.288,"difficulty":15.07,"effort":13031.559,"length":147,"time":723.976,"vocabulary":59,"volume":864.749,"operands":{"distinct":43,"total":81,"identifiers":["__stripped__"]},"operators":{"distinct":16,"total":66,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":23,"physical":36},"errors":[],"lineEnd":245,"lineStart":210,"name":"sortTids"},{"cyclomatic":2,"cyclomaticDensity":0,"halstead":{"bugs":0.004,"difficulty":2,"effort":24,"length":6,"time":1.333,"vocabulary":4,"volume":12,"operands":{"distinct":2,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":2,"total":2,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":244,"lineStart":244,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":100,"halstead":{"bugs":0.006,"difficulty":2,"effort":36.189,"length":7,"time":2.011,"vocabulary":6,"volume":18.095,"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":3,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":1,"physical":3},"errors":[],"lineEnd":249,"lineStart":247,"name":"floatPinned"},{"cyclomatic":2,"cyclomaticDensity":0,"halstead":{"bugs":0.022,"difficulty":8.125,"effort":540.868,"length":21,"time":30.048,"vocabulary":9,"volume":66.568,"operands":{"distinct":4,"total":13,"identifiers":["__stripped__"]},"operators":{"distinct":5,"total":8,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":248,"lineStart":248,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":100,"halstead":{"bugs":0.009,"difficulty":3,"effort":77.549,"length":10,"time":4.308,"vocabulary":6,"volume":25.85,"operands":{"distinct":3,"total":6,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":4,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":1,"physical":3},"errors":[],"lineEnd":253,"lineStart":251,"name":"sortRecent"},{"cyclomatic":1,"cyclomaticDensity":100,"halstead":{"bugs":0.009,"difficulty":3,"effort":77.549,"length":10,"time":4.308,"vocabulary":6,"volume":25.85,"operands":{"distinct":3,"total":6,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":4,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":1,"physical":3},"errors":[],"lineEnd":257,"lineStart":255,"name":"sortOld"},{"cyclomatic":1,"cyclomaticDensity":100,"halstead":{"bugs":0.009,"difficulty":3,"effort":77.549,"length":10,"time":4.308,"vocabulary":6,"volume":25.85,"operands":{"distinct":3,"total":6,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":4,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":1,"physical":3},"errors":[],"lineEnd":261,"lineStart":259,"name":"sortCreate"},{"cyclomatic":2,"cyclomaticDensity":66.667,"halstead":{"bugs":0.027,"difficulty":8.75,"effort":721.158,"length":26,"time":40.064,"vocabulary":9,"volume":82.418,"operands":{"distinct":4,"total":14,"identifiers":["__stripped__"]},"operators":{"distinct":5,"total":12,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":3,"physical":6},"errors":[],"lineEnd":268,"lineStart":263,"name":"sortVotes"},{"cyclomatic":2,"cyclomaticDensity":66.667,"halstead":{"bugs":0.027,"difficulty":8.75,"effort":721.158,"length":26,"time":40.064,"vocabulary":9,"volume":82.418,"operands":{"distinct":4,"total":14,"identifiers":["__stripped__"]},"operators":{"distinct":5,"total":12,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":3,"physical":6},"errors":[],"lineEnd":275,"lineStart":270,"name":"sortPopular"},{"cyclomatic":1,"cyclomaticDensity":100,"halstead":{"bugs":0.009,"difficulty":3,"effort":77.549,"length":10,"time":4.308,"vocabulary":6,"volume":25.85,"operands":{"distinct":3,"total":6,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":4,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":1,"physical":3},"errors":[],"lineEnd":279,"lineStart":277,"name":"sortViews"},{"cyclomatic":2,"cyclomaticDensity":50,"halstead":{"bugs":0.062,"difficulty":10.227,"effort":1900.666,"length":43,"time":105.593,"vocabulary":20,"volume":185.843,"operands":{"distinct":11,"total":25,"identifiers":["__stripped__"]},"operators":{"distinct":9,"total":18,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":4,"physical":6},"errors":[],"lineEnd":286,"lineStart":281,"name":"getTopics"},{"cyclomatic":1,"cyclomaticDensity":100,"halstead":{"bugs":0.006,"difficulty":2,"effort":36.189,"length":7,"time":2.011,"vocabulary":6,"volume":18.095,"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":3,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":1,"physical":7},"errors":[],"lineEnd":294,"lineStart":288,"name":"<anonymous>"},{"cyclomatic":2,"cyclomaticDensity":100,"halstead":{"bugs":0.01,"difficulty":4.667,"effort":144.111,"length":11,"time":8.006,"vocabulary":7,"volume":30.881,"operands":{"distinct":3,"total":7,"identifiers":["__stripped__"]},"operators":{"distinct":4,"total":4,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":2,"physical":5},"errors":[],"lineEnd":293,"lineStart":289,"name":"<anonymous>"}],"methodAverage":{"cyclomatic":2.5,"cyclomaticDensity":40.561,"halstead":{"bugs":0.061,"difficulty":5.375,"effort":2266.986,"length":37.237,"time":125.944,"vocabulary":16.474,"volume":182.077,"operands":{"distinct":10.921,"total":20.289},"operators":{"distinct":5.553,"total":16.947}},"params":1.447,"sloc":{"logical":4.868,"physical":14.474}},"module":"src/topics/sorted.js"},"jshint":{"messages":[{"severity":"error","line":1,"column":1,"message":"Use the function form of \"use strict\".","source":"Use the function form of \"use strict\"."},{"severity":"error","line":3,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":5,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":6,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":7,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":8,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":9,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":10,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":13,"column":1,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":13,"column":6,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":14,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":14,"column":5,"message":"'destructuring binding' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":15,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":15,"column":5,"message":"'destructuring binding' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":18,"column":21,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":20,"column":21,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":22,"column":21,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":25,"column":17,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":26,"column":5,"message":"'let' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":26,"column":26,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":27,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":27,"column":50,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":29,"column":5,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":29,"column":10,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":33,"column":21,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":35,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":35,"column":5,"message":"'destructuring binding' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":35,"column":42,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":40,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":43,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":44,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":44,"column":5,"message":"'destructuring binding' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":45,"column":31,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":50,"column":41,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":50,"column":65,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":51,"column":14,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":53,"column":5,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":53,"column":25,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":58,"column":35,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":58,"column":45,"message":"Missing name in function declaration.","source":"Missing name in function declaration."},{"severity":"error","line":59,"column":9,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":75,"column":26,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":76,"column":26,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":77,"column":26,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":79,"column":28,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":82,"column":6,"message":"Unnecessary semicolon.","source":"Unnecessary semicolon."},{"severity":"error","line":84,"column":5,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":84,"column":10,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":86,"column":13,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":86,"column":33,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":86,"column":33,"message":"Too many errors. (29% scanned).","source":"Too many errors."}]}}