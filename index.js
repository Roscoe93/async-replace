const replaceAsync = (str, regExp, replacer) => {
  if (Object.prototype.toString.call(regExp) !== "[object RegExp]") {
    throw new Error("regExp is expected to be regExp instance!");
  }
  if (typeof str !== "string") {
    throw new Error("str is expected to be string!");
  }
  let strIdx = 0;
  let replacements = [];
  let otherParts = [];
  let ret = "";
  if (!regExp.global) {
    let match = str.match(regExp);
    replacer
      .call(str, match)
      .then(res => {
        return Promise.resolve(str.replace(regExp, res));
      })
      .catch(e => {
        throw e;
      });
  } else {
    let res;
    while ((res = regExp.exec(str))) {
      replacements.push(replacer.call(str, res));
      otherParts.push(str.slice(strIdx, res.index));
      strIdx = res.index + res[0].length;
    }
    otherParts.push(str.slice(strIdx, str.length));
    let i = 0;
    return Promise.all(replacements).then(replaceRes => {
      for (; i < replaceRes.length; i++) {
        ret += otherParts[i];
        ret += replaceRes[i];
      }
      ret += otherParts[i++];
      return ret;
    });
  }
};

module.exports = replaceAsync;
