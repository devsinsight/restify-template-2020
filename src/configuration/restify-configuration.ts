import * as restify from "restify";
import * as corsMiddleware from "restify-cors-middleware";

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["*", "*"],
  allowHeaders: ["API-Token"],
  exposeHeaders: ["API-Token-Expiry"]
});

export function RestifyApiConfig(api: restify.Server) {
  api.pre(cors.preflight);
  api.pre(restify.pre.sanitizePath());
  api.use(cors.actual);
  api.use(restify.plugins.acceptParser(api.acceptable));
  api.use(restify.plugins.bodyParser());
  api.use(restify.plugins.queryParser());
  api.use(restify.plugins.authorizationParser());
  api.use(restify.plugins.fullResponse());
}
