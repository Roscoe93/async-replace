# async-replace
## Usage
```javascript
const asyncReplace = require('async-replace');

asyncReplace(string,/regExp/,(match)=>{
  return new Promise((resolve,reject)=>{ // must return Promise<String> in callback
    setTimeout(()=>{ // simulate async operate
      let res = doSthWithMatch(match);
      resolve(res);
    });
  });
})
  .then(res=>{})
  .catch(e=>{});
```