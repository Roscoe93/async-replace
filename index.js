const replaceAsync = (str, regExp, replacer) => {
  return new Promise((resolve, reject) => {
    if (Object.prototype.toString.call(regExp) !== "[object RegExp]") {
      throw new Error('regExp is expected to be regExp instance!');
    }
    if (typeof str !== 'string') {
      throw new Error('str is expected to be string!');
    }
    let strIdx = 0;
    let replacements = [];
    let otherParts = [];
    let ret = '';
    if (!regExp.global) {
      let match = str.match(regExp);
      replacer.call(str, match).then(res => {
        return resolve(str.replace(regExp, res));
      });
    }
    else {
      while (res = regExp.exec(str)) {
        replacements.push(replacer.call(str, res));
        otherParts.push(str.slice(strIdx, res.index));
        strIdx = res.index + res[0].length;
      }
      Promise.all(replacements)
        .then(replaceRes => {
          for (let i = 0; i < replaceRes.length; i++) {
            ret += otherParts[i]
            ret += replaceRes[i]
          }
          resolve(ret);
        })
        .catch(e => {
          return reject(e);
        });
    }
  });
};

module.exports = replaceAsync;