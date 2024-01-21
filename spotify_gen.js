"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fastify_1 = require("fastify");
var buffer_1 = require("buffer");
var crypto = require("crypto");
var querystring = require("querystring");
var url_1 = require("url");
var fastify = (0, fastify_1.default)({
    logger: false,
});
var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var redirect_uri = "http://localhost:3124/callback";
if (!client_id || !client_secret) {
    throw new Error("Please set your spotify client id and secret in your environment");
}
//
// Declare a route
fastify.get("/callback", function (req, reply) {
    return __awaiter(this, void 0, void 0, function () {
        var code, state, authOptions, response, res_data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = req.query.code || null;
                    state = req.query.state || null;
                    if (!(state === null)) return [3 /*break*/, 1];
                    reply.redirect("/#" +
                        querystring.stringify({
                            error: "state_mismatch",
                        }));
                    return [3 /*break*/, 4];
                case 1:
                    authOptions = {
                        url: "https://accounts.spotify.com/api/token",
                        form: {
                            code: code,
                            redirect_uri: redirect_uri,
                            grant_type: "authorization_code",
                        },
                        headers: {
                            "content-type": "application/x-www-form-urlencoded",
                            Authorization: "Basic " +
                                buffer_1.Buffer.from(client_id + ":" + client_secret).toString("base64"),
                        },
                        json: true,
                    };
                    return [4 /*yield*/, fetch(authOptions.url, {
                            method: "post",
                            body: new url_1.URLSearchParams(authOptions.form),
                            headers: authOptions.headers,
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    res_data = _a.sent();
                    console.log(res_data.refresh_token);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
fastify.get("/login", function (_req, reply) {
    var state = crypto.randomBytes(16).toString("hex");
    var scope = "user-read-currently-playing user-read-playback-state";
    reply.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        }));
});
fastify.listen({ port: 3124 }, function (err) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
(0, child_process_1.spawn)("open", ["http://localhost:3124/login"]);
