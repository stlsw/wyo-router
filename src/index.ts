// import { Router } from "@tsndr/cloudflare-worker-router";

// export interface Env {
//   // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
//   // MY_KV_NAMESPACE: KVNamespace;
//   //
//   // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
//   // MY_DURABLE_OBJECT: DurableObjectNamespace;
//   //
//   // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
//   // MY_BUCKET: R2Bucket;
// }

// const router = new Router<Env>();

// // router.use(({ req, res, next }) => {
// //   res.headers.set("X-Global-Middlewares", "true");
// //   next();
// // });

// router.get("/", ({ req, res }) => {
//   console.log(req.headers);
//   res.body = "hello world";
// });

// router.post("/api/v1/accounts/:accountGuid/chat", ({ req, res }) => {
//   console.log(
//     req.headers.get("x-api-key"),
//     req.headers.get("x-session-guid"),
//     req.headers.get("x-channel"),
//     req.params.accountGuid
//   );

//   //   res.status = 204;
//   res.body = "send successful";
// });

// addEventListener("fetch", ((event: FetchEvent) => {
//   event.respondWith(router.handle({}, event.request));
// }) as EventListener);
