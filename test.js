const asyncReplace = require('./index');

const testStr = 'Lorem {asyncStr1} dolor {asyncStr2} amet {asyncStr3}.';

// will replace string
asyncReplace(testStr, /\{asyncStr(\d+)\}/g, (match) => {
  let num = match[1];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`replace${num}`);
    }, Math.random() * 200);
  });
})
  .then(res => console.log(res))
  .catch(e => console.log(e));

// will throw if any error occured
asyncReplace(testStr, /\{asyncStr(\d+)\}/g, (match) => {
  let num = match[1];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num !== '2')
        return resolve(`replace${num}`);
      reject('2 is elligal');
    }, Math.random() * 200);
  });
})
  .then(res => console.log(res))
  .catch(e => console.log(`error! ${e}`));