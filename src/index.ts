import { Router } from "./lib/Route";

const SMS_API_HOST = "https://message-dev.wyocrm.com/";
const WHATSAPP_API_HOST = "https://whatsapp-dev.wyocrm.com/";

const router = new Router();
router.debug();

// router.use(async ({ res, next }) => {
//   res.headers.set("X-Global-Middlewares", "true");
//   await next();
// });

router.get("/api/", ({ res }) => {
  res.body = "hello world" + new Date().getTime();
});

const sendSMS = async (
  accountGuid: string,
  body: string,
  headers: { [key: string]: string }
) => {
  return fetch(SMS_API_HOST + `api/accounts/${accountGuid}/chat`, {
    method: "POST",
    body,
    headers,
  });
};

const sendWhatsapp = async (
  accountGuid: string,
  body: string,
  headers: { [key: string]: string }
) => {
  return fetch(WHATSAPP_API_HOST + `api/accounts/${accountGuid}/chat`, {
    method: "POST",
    body,
    headers,
  });
};

router.post("/api/v1/accounts/:accountGuid/chat/", async ({ req, res }) => {
  const channel = req.headers.get("x-channel");
  const apiKey = req.headers.get("x-api-key") || "";
  const sguid = req.headers.get("x-session-guid") || "";
  const headers = {
    "x-api-key": apiKey,
    "x-session-guid": sguid,
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    to: req.body.to,
    message: req.body.message,
  });

  let response;
  console.log("1");
  response = await sendWhatsapp(req.params.accountGuid, body, headers);
  console.log("2");
  const content = await response.text();
  console.log("3");
  res.body = content;
  res.status = response.status;
  return;
  if (channel === "sms") {
    response = await sendSMS(
      req.params.accountGuid,
      JSON.stringify({
        to: req.body.to,
        message: req.body.message,
      }),
      headers
    );

    res.status = response.status;
  } else if (channel === "whatsapp") {
    console.log("2");
    response = await sendWhatsapp(req.params.accountGuid, body, headers);

    const content = await response.text();
    console.log("3");
    res.body = content;
    res.status = response.status;
  } else if (channel === "hybrid") {
    response = await sendWhatsapp(req.params.accountGuid, body, headers);
    if (response.status === 200) {
      let content = (await response.json()) as {
        error: string;
        [key: string]: any;
      };
      if (content.error !== "") {
        response = await sendSMS(
          req.params.accountGuid,
          JSON.stringify({
            to: req.body.to,
            message: req.body.message,
          }),
          headers
        );
        res.body = content;
        let text = await response.text();
        res.body = text;
      } else {
        res.body = JSON.stringify(content);
      }
    }

    res.status = response.status;
  } else {
    res.body = { error: "Channel cannot be empty." };
    res.status = 500;
  }
  console.log("4");
});

addEventListener("fetch", (event) => {
  return event.respondWith(router.handle({}, event.request));
});
