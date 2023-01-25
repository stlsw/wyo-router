import { Router } from "./lib/Route";

const SMS_API_HOST = "https://message-dev.wyocrm.com/";
const WHATSAPP_API_HOST = "http://whatsapp-dev.wyocrm.com/";

const router = new Router();
router.debug();

router.use(({ res, next }) => {
  res.headers.set("X-Global-Middlewares", "true");
  next();
});

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
    receiver: req.body.receiver,
    message: req.body.message,
  });

  let response;
  if (channel === "sms") {
    response = await sendSMS(
      req.params.accountGuid,
      JSON.stringify({
        to: req.body.receiver,
        message: req.body.message,
      }),
      headers
    );
    res.status = response.status;
  } else if (channel === "whatsapp") {
    response = await sendWhatsapp(req.params.accountGuid, body, headers);
    res.status = response.status;
  } else if (channel === "hybrid") {
    response = await sendWhatsapp(req.params.accountGuid, body, headers);
    if (response) {
      response = await sendSMS(
        req.params.accountGuid,
        JSON.stringify({
          to: req.body.receiver,
          message: req.body.message,
        }),
        headers
      );
    }

    res.status = response.status;
  } else {
    res.body = { error: "Channel cannot be empty." };
    res.status = 500;
  }

  // res.status = 204;
  // res.body = "send successful";
});

addEventListener("fetch", (event) => {
  return event.respondWith(router.handle({}, event.request));
});
