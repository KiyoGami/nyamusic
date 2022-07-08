# kawaii api
The [kawaii api](https://kawaii.red/) from Error44 as [npm package](https://www.npmjs.com/package/kawaii-api)

# Download
```sh
# npm
npm i kawaii-api

# yarn
yarn add kawaii-api
```

# Examples

```js
const { Kawaii } = require("kawaii-api"); // or import { Kawaii } from 'kawaii-api';

const api = new Kawaii("anonymous"); // you can't use stats with this token

api.endpoints("gif").then(res => {
    console.log(res);
});

api.get("gif", "kiss").then(res => {
    console.log(res)
})

api.random("gif").then(res => {
    console.log(res)
})

api.gif("kiss").then(res => {
    console.log(res)
})

api.stats().then(res => {
    const stats = res
})

// or async/await

const example = async() => {

    await api.endpoints("gif")

    await api.get("gif", "kiss")

    await api.random("gif")

    await api.gif("kiss")

    const stats = await api.stats()
}
```

# All Stats

```javascript
stats.endpoints
stats.all
stats.failed
stats.history
stats.most_endpoint
stats.most_endpoints
stats.most_type
stats.most_types
```
