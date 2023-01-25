# wyo-router

## Deploy

```bash
npm run build
```

## development

`lib\route.ts` 实际可以参考[cloudflare-worker-router](https://github.com/tsndr/cloudflare-worker-router)，打包实际是 route.js，顾修改也应该修改 `route.js`

##

`@tsndr/cloudflare-worker-router` 中中间件 next 务必需要`await`，否则会导致响应时序不对
