var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var netr = function(exports) {
  "use strict";
  class Mutex {
    constructor() {
      __publicField(this, "locked", false);
      __publicField(this, "waitings", []);
      this.unlock = this.unlock.bind(this);
    }
    lock() {
      return __async(this, null, function* () {
        if (!this.locked) {
          this.locked = true;
          return this.unlock;
        }
        yield new Promise((resolve) => {
          this.waitings.push(resolve);
        });
        return this.unlock;
      });
    }
    unlock() {
      if (this.waitings.length === 0) {
        this.locked = false;
        return;
      }
      const waiting = this.waitings.shift();
      waiting();
    }
    runExclusive(job) {
      return __async(this, null, function* () {
        const unlock = yield this.lock();
        try {
          return yield job();
        } catch (e) {
          throw e;
        } finally {
          unlock();
        }
      });
    }
  }
  function appendQuery(url, params) {
    const querystring = new URLSearchParams(params).toString();
    const sep = url.includes("?") ? "&" : "?";
    return url + sep + querystring;
  }
  function uuid() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    const charNum = chars.length;
    let text = "";
    for (let i = 0; i < 20; i++) {
      text += chars[Math.floor(Math.random() * charNum)];
    }
    return text;
  }
  function mapObj(obj, mapper) {
    const o = {};
    Object.keys(obj).forEach((k) => {
      o[k] = mapper(obj[k]);
    });
    return o;
  }
  function createDefered() {
    const defered = {
      resolve: void 0,
      reject: void 0,
      promise: void 0,
      value: null
    };
    defered.promise = new Promise((res, rej) => {
      defered.resolve = res;
      defered.reject = rej;
    });
    defered.promise.then((v) => {
      defered.value = v;
    });
    return defered;
  }
  class TimeoutError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "TimeoutError");
    }
  }
  function waitTimeout(timeout, msg) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new TimeoutError(msg + " timeout")), timeout);
    });
  }
  class HttpRequest {
    constructor(url, { method, headers, body: body2 }) {
      __publicField(this, "url");
      __publicField(this, "method");
      __publicField(this, "headers");
      __publicField(this, "body");
      this.url = url;
      this.method = method != null ? method : "GET";
      this.headers = new Headers(headers);
      this.body = body2 != null ? body2 : null;
    }
  }
  class HttpResponse {
    constructor(body2, { status, statusText, headers }) {
      __publicField(this, "status");
      __publicField(this, "statusText");
      __publicField(this, "headers");
      __publicField(this, "body");
      this.status = status != null ? status : 200;
      this.statusText = statusText != null ? statusText : "";
      this.headers = new Headers(headers);
      this.body = body2;
    }
  }
  function httpGetContentRange(headers) {
    const contentRange = headers.get("Content-Range");
    if (contentRange == null)
      return null;
    return parseContentRange(contentRange);
  }
  function parseContentRange(v) {
    const normalized = v.trim().toLowerCase();
    const [unit, rest] = normalized.split(/\s+/);
    if (unit !== "bytes") {
      throw new Error(`Unit must be bytes: ${v}`);
    }
    const [range, totalSizeStr] = rest.split("/");
    const totalSize = totalSizeStr === "*" ? null : atoi(totalSizeStr);
    const [start, end] = (range.includes("-") ? range.split("-") : [null, null]).map((v2) => atoi(v2));
    const rangeSize = start != null && end != null ? end - start + 1 : null;
    return { totalSize, rangeSize, start, end };
  }
  function atoi(v) {
    return !v ? null : Number(v);
  }
  function stringifyRange(range) {
    var _a, _b;
    return `bytes=${(_a = range.start) != null ? _a : 0}-${(_b = range.end) != null ? _b : ""}`;
  }
  function queryStringify(params) {
    return Object.keys(params).map(
      (k) => [k, params[k]]
    ).filter(
      ([k, v]) => v !== void 0
    ).map(
      ([k, v]) => v === null ? k : [k, v].map(encodeURIComponent).join("=")
    ).join("&");
  }
  function getRespBodyLength(method, status, reqHeaders, respHeaders) {
    if (method === "HEAD")
      return [false];
    if (status >= 100 && status < 200)
      return [false];
    if (status === 204 || status === 304)
      return [false];
    if (method === "CONNECT" && status >= 200 && status < 300)
      return [false];
    const transferEncodingVal = reqHeaders.get("Transfer-Encoding");
    if (transferEncodingVal != null && transferEncodingVal.length > 0)
      return [true, null];
    const contentLengthVal = respHeaders.get("Content-Length");
    if (contentLengthVal != null) {
      const contentLength = parseInt(contentLengthVal, 10);
      if (!Number.isNaN(contentLength)) {
        if (contentLength === 0)
          return [false];
        return [true, contentLength];
      }
    }
    return [true, null];
  }
  const non_ios_8859_1Code = /[^\u0000-\u00ff]/;
  function encodeHeaderValue(value) {
    return non_ios_8859_1Code.test(value) ? "REPLACED_BY_netr_SEE_netr_utils_http_encodeHeaderValue" : value;
  }
  let enabled = false;
  function getDebug(namespace2) {
    return (...args) => {
      if (enabled)
        console.debug(`[${namespace2}] [${(Date.now() / 1e3).toFixed(3)}]`, ...args);
    };
  }
  function enableDebug() {
    enabled = true;
  }
  const icePwd = "pR0mHGTJGIoVehu/AQCGTNeY";
  const defaultWebRTCPort = 8443;
  const useTcp = true;
  const debug$7 = getDebug("cdnr/http/webrtc/how");
  class HoW {
    constructor(pcConnectTimeout = 10 * 1e3, dcOpenTimeout = 3 * 1e3) {
      __publicField(this, "pcMap", /* @__PURE__ */ new Map());
      __publicField(this, "pcMutex", new Mutex());
      __publicField(this, "offer");
      this.pcConnectTimeout = pcConnectTimeout;
      this.dcOpenTimeout = dcOpenTimeout;
    }
    makePc(target, fingerprint) {
      return __async(this, null, function* () {
        const pc = new RTCPeerConnection();
        const channel = pc.createDataChannel("test");
        const offer = yield pc.createOffer();
        channel.close();
        if (offer.sdp == null)
          throw new Error("TODO: empty sdp");
        offer.sdp = offer.sdp.replace(/a=ice-pwd:.+/, `a=ice-pwd:${icePwd}`);
        pc.setLocalDescription(offer);
        const [targetIP, targetPort] = parseIPPort(target, 0);
        const webrtcPort = targetPort + defaultWebRTCPort;
        const answer = {
          type: "answer",
          sdp: makeAnswerSdp(targetIP, webrtcPort, fingerprint, useTcp)
        };
        pc.setRemoteDescription(answer);
        yield Promise.race([
          waitPCConnected(pc),
          waitTimeout(this.pcConnectTimeout, "PeerConnection connect")
        ]);
        return pc;
      });
    }
    getPc(ctx, target, fingerprint) {
      return __async(this, null, function* () {
        if (this.pcMap.has(target)) {
          return this.pcMap.get(target);
        }
        const promisedPc = this.makePc(target, fingerprint);
        this.pcMap.set(target, promisedPc);
        promisedPc.catch((e) => {
          this.pcMap.delete(target);
        });
        return promisedPc;
      });
    }
    fetch(ctx, id, request, fingerprint) {
      return __async(this, null, function* () {
        debug$7("fetch", request.url, "with id", id);
        const target = new URL(request.url).host;
        const pc = yield this.getPc(ctx, target, fingerprint);
        const processor = new HoWRequest(pc, ctx, id, request, this.dcOpenTimeout);
        const resp = yield processor.start();
        return resp;
      });
    }
    dispose() {
      this.pcMap.forEach((promisedPc) => promisedPc.then((pc) => pc.close()));
      this.pcMap.clear();
    }
  }
  function makeAnswerSdp(targetIP, targetPort, fingerprint, tcp = false) {
    const candidateLine = tcp ? `a=candidate:2932249642 1 tcp 2130706431 ${targetIP} ${targetPort} typ host tcptype passive` : `a=candidate:2932249642 1 udp 2130706431 ${targetIP} ${targetPort} typ host`;
    const ufrag = uuid();
    return `v=0
o=- 4679586637491621141 1661250920 IN IP4 0.0.0.0
s=-
t=0 0
a=fingerprint:sha-256 ${fingerprint}
a=ice-lite
a=extmap-allow-mixed
a=group:BUNDLE 0
m=application 9 UDP/DTLS/SCTP webrtc-datachannel
c=IN IP4 0.0.0.0
a=setup:active
a=mid:0
a=sendrecv
a=sctp-port:5000
a=ice-ufrag:${ufrag}
a=ice-pwd:uNjBwWiGCWkRpkmkjPtjAgqrUTpVqWaM
${candidateLine}
a=end-of-candidates
`;
  }
  function parseIPPort(ipPort, defaultPort = 80) {
    const [ip, portStr] = ipPort.split(":");
    const port = portStr ? parseInt(portStr, 10) : defaultPort;
    return [ip, port];
  }
  function stringifyRequestHead(request) {
    const urlObj = new URL(request.url);
    const header = {};
    request.headers.forEach((v, k) => {
      header[k] = [v];
    });
    const requestHead = {
      method: request.method,
      target: urlObj.pathname + urlObj.search,
      version: "HTTP/1.1",
      header
    };
    return JSON.stringify(requestHead);
  }
  function parseResponseHead(data) {
    try {
      const parsed = JSON.parse(data);
      if (!parsed.header && parsed.Header) {
        parsed.header = parsed.Header;
      }
      return parsed;
    } catch (e) {
      throw new Error("Invalid Response head");
    }
  }
  function listenDC(dc, type, listener) {
    dc.addEventListener(type, listener);
    return () => dc.removeEventListener(type, listener);
  }
  function streamForDC(id, dc, closeOn = "close") {
    const disposers = [
      () => {
        if (dc.readyState !== "closing" && dc.readyState !== "closed") {
          dc.close();
        }
      }
    ];
    const dispose = () => disposers.forEach((d) => d());
    return new ReadableStream({
      start: (ctrl) => {
        disposers.push(listenDC(dc, "message", ({ data }) => {
          ctrl.enqueue(data);
        }));
        disposers.push(listenDC(dc, "error", (e) => {
          debug$7(`dc ${id} error`, e);
          dispose();
          ctrl.error(e);
        }));
        disposers.push(listenDC(dc, "closing", (e) => {
          debug$7(`DataChannel ${id} closing`, e);
          if (closeOn === "closing") {
            dispose();
            ctrl.close();
          }
        }));
        disposers.push(listenDC(dc, "close", (e) => {
          debug$7(`DataChannel ${id} close`, e);
          if (closeOn === "close") {
            dispose();
            ctrl.close();
          }
        }));
      },
      cancel: (reason) => {
        dispose();
      }
    });
  }
  class HoWRequest {
    constructor(pc, ctx, id, request, dcOpenTimeout) {
      __publicField(this, "dc");
      __publicField(this, "stream");
      this.ctx = ctx;
      this.id = id;
      this.request = request;
      this.dcOpenTimeout = dcOpenTimeout;
      this.dc = pc.createDataChannel(`http|${id}`);
      this.stream = streamForDC(this.id, this.dc, "closing");
    }
    open() {
      return __async(this, null, function* () {
        if (this.dc.readyState === "open")
          return;
        const disposers = [];
        const dispose = () => disposers.forEach((d) => d());
        const opened = new Promise((resolve, reject) => {
          disposers.push(listenDC(this.dc, "open", () => {
            debug$7(`DataChannel ${this.id} opened`);
            resolve();
          }));
          disposers.push(listenDC(this.dc, "error", () => {
            debug$7(`DataChannel ${this.id} error`);
            reject(new Error("DataChannel error"));
          }));
        });
        return Promise.race([
          opened,
          waitTimeout(this.dcOpenTimeout, `DataChannel ${this.id} open`)
        ]).finally(dispose);
      });
    }
    sendRequest() {
      return __async(this, null, function* () {
        var _a;
        const request = this.request;
        if (request.method !== "GET")
          throw new Error(`TODO: Request with method ${request.method} is not supported`);
        const contentLength = parseInt((_a = request.headers.get("Content-Length")) != null ? _a : "0", 10);
        if (contentLength > 0)
          throw new Error("TODO: Request with body is not supported");
        const requestHead = stringifyRequestHead(request);
        debug$7(`DataChannel ${this.id} sendRequest:`, requestHead);
        this.dc.send(requestHead);
      });
    }
    receiveResponse() {
      return __async(this, null, function* () {
        var _a;
        const startAt = Date.now();
        debug$7(`DataChannel ${this.id} receiveResponse with state: ${this.dc.readyState}`);
        const request = this.request;
        const dcReader = this.stream.getReader();
        const { value, done } = yield dcReader.read();
        if (done)
          throw new UnexpectedDataChannelCloseError(`Unexpected DataChannel close, resp head expected. id: ${this.id}, url: ${this.request.url}`);
        if (typeof value !== "string")
          throw new Error(`Expected first message type to be string, while got ${typeof value}`);
        const respHead = parseResponseHead(value);
        debug$7(`DataChannel ${this.id} get respHead:`, respHead);
        const status = respHead.status;
        const headers = new Headers(mapObj((_a = respHead.header) != null ? _a : {}, (hs) => encodeHeaderValue(hs[0])));
        const respInit = { status, statusText: respHead.reason, headers };
        const [hasBody, bodyLength] = getRespBodyLength(request.method, status, request.headers, headers);
        const startTransferTime = (Date.now() - startAt) / 1e3;
        this.ctx.set("hoWStartTransferTime", startTransferTime);
        if (!hasBody) {
          const resp2 = new HttpResponse(null, respInit);
          debug$7("DataChannel receiveResponse done with no body");
          return resp2;
        }
        let received = 0;
        const bodyStream = new ReadableStream({
          start: (ctrl) => {
            (() => __async(this, null, function* () {
              while (true) {
                const { value: value2, done: done2 } = yield dcReader.read();
                if (done2) {
                  ctrl.close();
                  return;
                }
                if (!(value2 instanceof ArrayBuffer))
                  throw new Error(`Unexpected message type: ${typeof value2} / ${value2 == null ? void 0 : value2.constructor.name}`);
                if (value2.byteLength === 0) {
                  dcReader.cancel("Empty message indicates resp end");
                  ctrl.close();
                  return;
                }
                ctrl.enqueue(new Uint8Array(value2));
                received += value2.byteLength;
                if (bodyLength != null && received >= bodyLength) {
                  dcReader.cancel(`Body length (${bodyLength}) reached`);
                  ctrl.close();
                }
              }
            }))().catch((e) => {
              ctrl.error(e);
            });
          },
          cancel(reason) {
            debug$7("DataChannel bodyStream cancel:", reason);
            dcReader.cancel(reason);
          }
        });
        const resp = new HttpResponse(bodyStream, respInit);
        return resp;
      });
    }
    start() {
      return __async(this, null, function* () {
        return new Promise((resolve, reject) => __async(this, null, function* () {
          try {
            const startAt = Date.now();
            yield this.open();
            const dataChannelOpenTime = (Date.now() - startAt) / 1e3;
            this.ctx.set("hoWDataChannelOpenTime", dataChannelOpenTime);
            const [, resp] = yield Promise.all([
              this.sendRequest(),
              this.receiveResponse()
            ]);
            resolve(resp);
          } catch (e) {
            reject(e);
          }
        }));
      });
    }
  }
  class UnexpectedDataChannelCloseError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "UnexpectedDataChannelCloseError");
    }
  }
  class PeerConnectionDisconnectedError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "PeerConnectionDisconnectedError");
    }
  }
  function waitPCConnected(pc, desc) {
    return new Promise((resolve, reject) => {
      if (pc.connectionState === "connected") {
        resolve();
      }
      let unlisten = listenPC(pc, "connectionstatechange", () => {
        debug$7(`RTCPeerConnection ${desc} connectionstatechange`, pc.connectionState);
        if (["failed", "closed", "disconnected"].includes(pc.connectionState)) {
          reject(new PeerConnectionDisconnectedError(desc));
          unlisten();
          return;
        }
        if (pc.connectionState === "connected") {
          resolve();
          unlisten();
          return;
        }
      });
    });
  }
  function listenPC(dc, type, listener) {
    dc.addEventListener(type, listener);
    return () => dc.removeEventListener(type, listener);
  }
  function encodeUtf8(input) {
    const result = [];
    const size = input.length;
    for (let index = 0; index < size; index++) {
      let point = input.charCodeAt(index);
      if (point >= 55296 && point <= 56319 && size > index + 1) {
        const second = input.charCodeAt(index + 1);
        if (second >= 56320 && second <= 57343) {
          point = (point - 55296) * 1024 + second - 56320 + 65536;
          index += 1;
        }
      }
      if (point < 128) {
        result.push(point);
        continue;
      }
      if (point < 2048) {
        result.push(point >> 6 | 192);
        result.push(point & 63 | 128);
        continue;
      }
      if (point < 55296 || point >= 57344 && point < 65536) {
        result.push(point >> 12 | 224);
        result.push(point >> 6 & 63 | 128);
        result.push(point & 63 | 128);
        continue;
      }
      if (point >= 65536 && point <= 1114111) {
        result.push(point >> 18 | 240);
        result.push(point >> 12 & 63 | 128);
        result.push(point >> 6 & 63 | 128);
        result.push(point & 63 | 128);
        continue;
      }
      result.push(239, 191, 189);
    }
    return new Uint8Array(result).buffer;
  }
  function fmix(input) {
    input ^= input >>> 16;
    input = Math.imul(input, 2246822507);
    input ^= input >>> 13;
    input = Math.imul(input, 3266489909);
    input ^= input >>> 16;
    return input >>> 0;
  }
  const C = new Uint32Array([
    3432918353,
    461845907
  ]);
  function rotl(m, n) {
    return m << n | m >>> 32 - n;
  }
  function body(key, hash) {
    const blocks = key.byteLength / 4 | 0;
    const view32 = new Uint32Array(key, 0, blocks);
    for (let i = 0; i < blocks; i++) {
      view32[i] = Math.imul(view32[i], C[0]);
      view32[i] = rotl(view32[i], 15);
      view32[i] = Math.imul(view32[i], C[1]);
      hash[0] = hash[0] ^ view32[i];
      hash[0] = rotl(hash[0], 13);
      hash[0] = Math.imul(hash[0], 5) + 3864292196;
    }
  }
  function tail(key, hash) {
    const blocks = key.byteLength / 4 | 0;
    const reminder = key.byteLength % 4;
    let k = 0;
    const tail2 = new Uint8Array(key, blocks * 4, reminder);
    switch (reminder) {
      case 3:
        k = k ^ tail2[2] << 16;
      case 2:
        k = k ^ tail2[1] << 8;
      case 1:
        k = k ^ tail2[0] << 0;
        k = Math.imul(k, C[0]);
        k = rotl(k, 15);
        k = Math.imul(k, C[1]);
        hash[0] = hash[0] ^ k;
    }
  }
  function finalize(key, hash) {
    hash[0] = hash[0] ^ key.byteLength;
    hash[0] = fmix(hash[0]);
  }
  function murmur(key, seed) {
    seed = seed ? seed | 0 : 0;
    if (typeof key === "string") {
      key = encodeUtf8(key);
    }
    if (!(key instanceof ArrayBuffer)) {
      throw new TypeError("Expected key to be ArrayBuffer or string");
    }
    const hash = new Uint32Array([seed]);
    body(key, hash);
    tail(key, hash);
    finalize(key, hash);
    return hash.buffer;
  }
  class ConsistentHash {
    constructor(hasher = defaultHash$1) {
      __publicField(this, "circle", /* @__PURE__ */ new Map());
      __publicField(this, "members", /* @__PURE__ */ new Set());
      __publicField(this, "membersReplicas", /* @__PURE__ */ new Map());
      __publicField(this, "sortedHashes", []);
      this.hasher = hasher;
    }
    updateSortedHashes() {
      this.sortedHashes = [...this.circle.keys()].sort(
        (v1, v2) => v1 - v2
      );
    }
    _add({ key, replicas }) {
      for (let i = 0; i < replicas; i++) {
        const hash = this.hasher(getKey(key, i));
        this.circle.set(hash, key);
      }
      this.members.add(key);
      this.membersReplicas.set(key, replicas);
    }
    _remove({ key, replicas }) {
      for (let i = 0; i < replicas; i++) {
        const hash = this.hasher(getKey(key, i));
        this.circle.delete(hash);
      }
      this.members.delete(key);
      this.membersReplicas.delete(key);
    }
    get(key) {
      var _a;
      if (this.circle.size === 0)
        return null;
      const hash = this.hasher(key);
      const resultHash = (_a = this.sortedHashes.find((h) => h > hash)) != null ? _a : this.sortedHashes[0];
      return this.circle.get(resultHash);
    }
    add(key, replicas) {
      if (this.members.has(key))
        return false;
      this._add({ key, replicas });
      this.updateSortedHashes();
      return true;
    }
    remove(key) {
      if (!this.members.has(key))
        return false;
      const replicas = this.membersReplicas.get(key);
      this._remove({ key, replicas });
      this.updateSortedHashes();
      return true;
    }
    set(members) {
      this.circle.clear();
      this.members.clear();
      this.membersReplicas.clear();
      members.forEach((member) => {
        this._add(member);
      });
      this.updateSortedHashes();
    }
  }
  function getKey(memberKey, index) {
    return index + memberKey;
  }
  const defaultHash$1 = murmur3Hash32;
  function murmur3Hash32(key) {
    const ab = murmur(key);
    return new Uint32Array(ab)[0];
  }
  const httpdnsResolveApi = "https://api.qiniudns.com/v1/resolve";
  const logApiPrefix = "https://log.qiniuapi.com";
  function httpResolve(ctx, domain) {
    return __async(this, null, function* () {
      var _a;
      const params = { name: domain, type: "A" };
      const startAt = Date.now();
      const resp = yield fetch(`${httpdnsResolveApi}?${queryStringify(params)}`);
      ctx.set("dnsResolveStatus", resp.status);
      ctx.set("dnsResolveReqID", (_a = resp.headers.get("x-reqid")) != null ? _a : "");
      ctx.set("dnsResolveConnectionTime", (Date.now() - startAt) / 1e3);
      if (!resp.ok)
        throw new Error(`Call resolve API failed, status: ${resp.status} ${resp.statusText}`);
      const body2 = yield resp.json();
      return body2;
    });
  }
  class DnsrLogger {
    constructor(logger) {
      this.logger = logger;
    }
    log(schemaName, logData) {
      return this.logger.log(schemaName, logData);
    }
  }
  function getErrorMsg(err) {
    return err instanceof Error ? err.name : "Unknown";
  }
  function getErrorDesc(err) {
    return err instanceof Error ? err.name : "Unknown";
  }
  const defaultDuration = 1e3;
  const debug$6 = getDebug("dnsr");
  class NonECDNError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "NonECDNError");
    }
  }
  class Resolver {
    constructor(logger, dnsResolver = httpResolve, initialDuration = defaultDuration) {
      __publicField(this, "cache", /* @__PURE__ */ new Map());
      __publicField(this, "logger");
      __publicField(this, "fingerprints", /* @__PURE__ */ new Map());
      this.dnsResolver = dnsResolver;
      this.initialDuration = initialDuration;
      this.logger = new DnsrLogger(logger);
    }
    getFingerprint(ipPort) {
      const fingerprint = this.fingerprints.get(ipPort);
      if (fingerprint == null)
        throw new Error(`No fingerprint for ${ipPort}`);
      return fingerprint;
    }
    getResolveResult(ctx, domain) {
      return __async(this, null, function* () {
        var _a, _b, _c;
        const startAt = Date.now();
        let err;
        try {
          const resolved = yield this.dnsResolver(ctx, domain);
          if (!isECDNResolveResult(resolved)) {
            throw new NonECDNError(`Non-ECDN domain: ${domain}`);
          }
          const toSave = __spreadProps(__spreadValues({}, resolved), {
            groups: resolved.groups.map((g) => __spreadProps(__spreadValues({}, g), {
              duration: this.initialDuration,
              after: 0
            })),
            expireAt: Date.now() + resolved.ttl * 1e3
          });
          toSave.groups.forEach((g) => {
            g.elts.forEach((e) => {
              e.ips.forEach((ipPort) => {
                this.fingerprints.set(ipPort, e.fingerprint);
              });
            });
          });
          return toSave;
        } catch (e) {
          err = e;
          throw e;
        } finally {
          const totalTime = (Date.now() - startAt) / 1e3;
          this.logger.log("DnsResolveLog", {
            r_id: (_a = ctx.get("dnsResolveReqID")) != null ? _a : "",
            ip: "",
            domain,
            status_code: (_b = ctx.get("dnsResolveStatus")) != null ? _b : -1,
            err_msg: err != null ? getErrorMsg(err) : "",
            err_desc: err != null ? getErrorDesc(err) : "",
            t_conn: (_c = ctx.get("dnsResolveConnectionTime")) != null ? _c : -1,
            t_total: totalTime,
            type: 1
          });
          ctx.set("dnsResolveTotalTime", totalTime);
        }
      });
    }
    getResolveResultWithCache(ctx, domain) {
      return __async(this, null, function* () {
        const fromCache = this.cache.get(domain);
        if (fromCache != null) {
          let result;
          try {
            result = yield fromCache;
          } catch (e) {
            if (e instanceof NonECDNError) {
              throw new NonECDNError(`Non-ECDN domain: ${domain}`);
            }
          }
          if (result != null && result.expireAt > Date.now()) {
            ctx.set("dnsResolveFromCache", true);
            return fromCache;
          } else {
            this.cache.delete(domain);
          }
        }
        const promise = this.getResolveResult(ctx, domain);
        this.cache.set(domain, promise);
        return promise;
      });
    }
    resolve(ctx, domain) {
      return __async(this, null, function* () {
        const now = Date.now();
        const resolved = yield this.getResolveResultWithCache(ctx, domain);
        if (resolved.groups.length === 0)
          throw new Error("Empty group list");
        const availableGroups = resolved.groups.filter((g) => g.after < now);
        const group = random(availableGroups, (g) => g.weight);
        return group;
      });
    }
    do(ctx, url, attempts, job) {
      return __async(this, null, function* () {
        const urlObj = new URL(url);
        if (urlObj.port !== "")
          throw new Error("TODO: no port");
        let err;
        for (let i = 0; i < attempts; i++) {
          debug$6("Resolve for", url);
          const group = yield this.resolve(ctx, urlObj.host);
          if (group == null)
            throw new Error(`No available group for ${url}`);
          debug$6("Resolved for", url);
          try {
            debug$6("doWithGroup", i, url);
            yield doWithGroup(group, url, job);
            group.duration = this.initialDuration;
            return;
          } catch (e) {
            console.warn("doWithGroup (weight:", group.weight, ") failed:", e, url);
            if (shouldDisableTarget(e)) {
              group.after = Date.now() + group.duration;
              group.duration *= 2;
            }
            err = e;
          }
        }
        throw err;
      });
    }
  }
  function doWithGroup(group, url, job) {
    return __async(this, null, function* () {
      const elts = group.elts;
      if (elts.length === 0)
        throw new Error("Empty elt list");
      const ch = new ConsistentHash();
      ch.set(elts.map((e) => ({ key: e.id, replicas: e.replicas })));
      let err;
      for (let i = 0; i < 2; i++) {
        const eltId = ch.get(url);
        if (eltId == null)
          break;
        const elt = elts.find((e) => e.id === eltId);
        if (elt == null)
          throw new Error("No available elt");
        try {
          debug$6("doWithElt", elt.id, url);
          yield doWithElt(elt, url, job);
          return;
        } catch (e) {
          console.warn("doWithElt", elt.id, "failed:", e, url);
          if (shouldDisableTarget(e)) {
            ch.remove(eltId);
          }
          err = e;
        }
      }
      throw err;
    });
  }
  function doWithElt(elt, url, job) {
    return __async(this, null, function* () {
      let ips = elt.ips;
      if (ips.length === 0)
        throw new Error("Empty IP list");
      let err;
      for (let i = 0; i < 2; i++) {
        const ip = random(ips);
        if (ip == null)
          break;
        try {
          debug$6("doWithIP", ip, url);
          yield job(ip);
          return;
        } catch (e) {
          console.warn("do job with ip", ip, "failed:", e, url);
          if (shouldDisableTarget(e)) {
            ips = ips.filter((i2) => i2 !== ip);
          }
          err = e;
        }
      }
      throw err;
    });
  }
  function random(items, getWeight = () => 1) {
    if (items.length === 0)
      return null;
    const weights = items.map(getWeight);
    const sum = weights.reduce((s, w) => s + w, 0);
    let val = Math.random() * sum;
    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i];
      if (val < weight)
        return items[i];
      val -= weight;
    }
    return items[0];
  }
  function isECDNResolveResult(result) {
    return result.groups != null;
  }
  const unexpectedDataChannelCloseErrorName = new UnexpectedDataChannelCloseError().name;
  function shouldDisableTarget(e) {
    if (e && e.name === unexpectedDataChannelCloseErrorName)
      return false;
    return true;
  }
  class DB {
    constructor(dbName, storeNames) {
      __publicField(this, "db");
      this.dbName = dbName;
      this.storeNames = storeNames;
    }
    getDB() {
      return __async(this, null, function* () {
        if (this.db != null)
          return this.db;
        return new Promise((resolve) => {
          const request = indexedDB.open(this.dbName);
          request.addEventListener("upgradeneeded", () => {
            this.storeNames.forEach((storeName) => {
              request.result.createObjectStore(storeName);
            });
          });
          resolve(promisifyRequest(request));
        });
      });
    }
    get(storeName, key) {
      return __async(this, null, function* () {
        const db = yield this.getDB();
        const request = db.transaction(storeName, "readonly").objectStore(storeName).get(key);
        return promisifyRequest(request);
      });
    }
    getAll(storeName) {
      return __async(this, null, function* () {
        const db = yield this.getDB();
        const request = db.transaction(storeName, "readonly").objectStore(storeName).getAll();
        return promisifyRequest(request);
      });
    }
    count(storeName) {
      return __async(this, null, function* () {
        const db = yield this.getDB();
        const request = db.transaction(storeName, "readonly").objectStore(storeName).count();
        return promisifyRequest(request);
      });
    }
    set(storeName, key, value) {
      return __async(this, null, function* () {
        const db = yield this.getDB();
        const transaction = db.transaction(storeName, "readwrite");
        transaction.objectStore(storeName).put(value, key);
        return promisifyTransaction(transaction);
      });
    }
    remove(storeName, key) {
      return __async(this, null, function* () {
        const db = yield this.getDB();
        const transaction = db.transaction(storeName, "readwrite");
        transaction.objectStore(storeName).delete(key);
        return promisifyTransaction(transaction);
      });
    }
    clear() {
      return __async(this, null, function* () {
        const db = yield this.getDB();
        yield Promise.all(this.storeNames.map((storeName) => {
          const transaction = db.transaction(storeName, "readwrite");
          transaction.objectStore(storeName).clear();
          return promisifyTransaction(transaction);
        }));
      });
    }
    dispose() {
      var _a;
      (_a = this.db) == null ? void 0 : _a.close();
    }
  }
  function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
      request.addEventListener("success", () => resolve(request.result));
      request.addEventListener("error", () => reject(request.error));
    });
  }
  function promisifyTransaction(transaction) {
    return new Promise((resolve, reject) => {
      transaction.addEventListener("complete", () => resolve());
      transaction.addEventListener("error", () => reject(transaction.error));
      transaction.addEventListener("abort", () => reject(transaction.error));
    });
  }
  const debug$5 = getDebug("dcr");
  const namespace = "cdnr/dcr/v2";
  const itemStoreName = "item";
  class Cache {
    constructor(config = {}) {
      __publicField(this, "db", new DB(namespace, [itemStoreName]));
      this.config = config;
    }
    getBrowserCache() {
      return caches.open(namespace);
    }
    getItem(key) {
      return __async(this, null, function* () {
        return this.db.get(itemStoreName, key);
      });
    }
    setItem(key, item) {
      return __async(this, null, function* () {
        debug$5("setItem", key, item);
        yield this.db.set(itemStoreName, key, item);
      });
    }
    getContent(key, piece) {
      return __async(this, null, function* () {
        const browserCache = yield this.getBrowserCache();
        const cachedResponse = yield browserCache.match(getBrowserCacheKey(key, piece));
        if (cachedResponse == null)
          return void 0;
        if (cachedResponse.body == null)
          throw new Error("Body expected for cached response");
        return cachedResponse.body;
      });
    }
    setContent(key, piece, content) {
      return __async(this, null, function* () {
        const browserCache = yield this.getBrowserCache();
        yield browserCache.put(getBrowserCacheKey(key, piece), new Response(content));
      });
    }
    dispose() {
      this.db.dispose();
    }
  }
  function getBrowserCacheKey(key, piece) {
    var _a;
    return `${key}_with_range_${piece[0]}_${(_a = piece[1]) != null ? _a : ""}`;
  }
  class CdnrLogger {
    constructor(logger) {
      this.logger = logger;
    }
    log(schemaName, logData) {
      return this.logger.log(schemaName, logData);
    }
  }
  const defaultAttempts = 3;
  const debug$4 = getDebug("cdnr/http");
  class Http {
    constructor(logger, resolver, client) {
      __publicField(this, "logger");
      this.resolver = resolver;
      this.client = client;
      this.logger = new CdnrLogger(logger);
    }
    doWithIp(ctx, request, ip, currentRetryCount) {
      return __async(this, null, function* () {
        var _a;
        const domain = new URL(request.url).host;
        const startAt = Date.now();
        let err;
        try {
          debug$4("do request", request.url, "with ip", ip);
          const req = withNode(request, ip);
          const resp = yield this.client.fetch(ctx, req);
          debug$4("do request", request.url, "with ip succeeded with status", resp.status);
          ctx.set("downloadStatus", resp.status);
          ctx.set("downloadReqID", (_a = resp.headers.get("x-reqid")) != null ? _a : "");
          if (resp.status >= 500)
            throw new Error(`TODO: HTTP Status error: ${resp.status}`);
          return resp;
        } catch (e) {
          debug$4("do request", request.url, "with ip", ip, "failed:", e);
          err = e;
          throw e;
        } finally {
          const range = ctx.get("downloadRange");
          const retry = currentRetryCount;
          const doDownloadLog = (extra) => {
            var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
            return this.logger.log("DownloadLog", __spreadValues({
              ip,
              domain,
              range_st: (_a2 = range == null ? void 0 : range.start) != null ? _a2 : -1,
              range_end: (_b = range == null ? void 0 : range.end) != null ? _b : -1,
              retry,
              ftask_id: (_c = ctx.get("downloadFileTaskID")) != null ? _c : "",
              lookup_type: true,
              t_lookup: (_d = ctx.get("dnsResolveFromCache") === true ? 0 : ctx.get("dnsResolveTotalTime")) != null ? _d : -1,
              r_id: (_e = ctx.get("downloadReqID")) != null ? _e : "",
              status_code: (_f = ctx.get("downloadStatus")) != null ? _f : -1,
              t_conn: (_g = ctx.get("downloadConnectionTime")) != null ? _g : -1,
              t_tls: (_h = ctx.get("downloadTlsConnectionTime")) != null ? _h : -1,
              t_st_trans: (_i = ctx.get("downloadStartTransferTime")) != null ? _i : -1,
              err_msg: "",
              err_desc: "",
              t_content_trans: -1,
              t_total: -1,
              resp_size: -1
            }, extra));
          };
          const onDownloadError = (e) => doDownloadLog({
            t_total: (Date.now() - startAt) / 1e3,
            err_msg: err instanceof Error ? err.name : "Unknown",
            err_desc: err instanceof Error ? err.message : err + ""
          });
          const onDownloadTransfered = (size, time) => doDownloadLog({
            t_content_trans: time,
            t_total: (Date.now() - startAt) / 1e3,
            resp_size: size
          });
          if (err != null) {
            onDownloadError();
          } else {
            ctx.set("downloadOnError", onDownloadError);
            ctx.set("downloadOnTransfered", onDownloadTransfered);
          }
        }
      });
    }
    do(ctx, request) {
      return __async(this, null, function* () {
        let currentRetryCount = -1;
        let finalResp = null;
        yield this.resolver.do(ctx, request.url, defaultAttempts, (ip) => __async(this, null, function* () {
          currentRetryCount++;
          finalResp = yield this.doWithIp(ctx, request, ip, currentRetryCount);
        }));
        if (finalResp == null)
          throw new Error(`Http do failed: resolver do finished with no finalResp, url: ${request.url}`);
        return finalResp;
      });
    }
  }
  function withNode(originalReq, nodeIP) {
    const { url: originalUrl, method, headers: originalHeaders, body: body2 } = originalReq;
    const urlObject = new URL(originalUrl);
    const originalHost = urlObject.host;
    urlObject.host = nodeIP;
    const headers = new Headers(originalHeaders);
    headers.set("Host", originalHost);
    return new HttpRequest(urlObject.toString(), { method, headers, body: body2 });
  }
  class Task {
    constructor(client, url, range, expiry) {
      __publicField(this, "priority", 0);
      __publicField(this, "started", false);
      this.client = client;
      this.url = url;
      this.range = range;
      this.expiry = expiry;
    }
    setPriority(priority) {
      this.priority = priority;
    }
    start() {
      return __async(this, null, function* () {
        if (this.started) {
          throw new Error("Task already started");
        }
        this.started = true;
        return this.client.startTask(this);
      });
    }
  }
  function slice(stream, range) {
    var _a;
    const reader = stream.getReader();
    const resultStart = (_a = range[0]) != null ? _a : 0;
    const resultEnd = range[1];
    const newStream = new ReadableStream({
      start: (ctrl) => __async(this, null, function* () {
        let valueStart = 0;
        while (true) {
          const { done, value } = yield reader.read();
          if (done) {
            ctrl.close();
            break;
          }
          const valueEnd = valueStart + value.byteLength;
          if (valueEnd > resultStart) {
            let resultValue = value;
            const sliceStart = resultStart > valueStart ? resultStart - valueStart : 0;
            const sliceEnd = resultEnd != null && resultEnd < valueEnd ? resultEnd - valueStart : void 0;
            if (sliceStart !== 0 || sliceEnd !== void 0) {
              resultValue = value.slice(sliceStart, sliceEnd);
            }
            ctrl.enqueue(resultValue);
            if (resultEnd != null && valueEnd >= resultEnd) {
              ctrl.close();
              break;
            }
          }
          valueStart = valueEnd;
        }
      }),
      cancel: (reason) => {
        reader.releaseLock();
        stream.cancel(reason);
      }
    });
    return newStream;
  }
  class Context {
    constructor() {
      __publicField(this, "value", {});
    }
    set(key, value) {
      this.value[key] = value;
    }
    get(key) {
      return this.value[key];
    }
  }
  class Result {
    constructor(stream, size, fileMeta) {
      __publicField(this, "fileSize");
      __publicField(this, "contentType");
      var _a;
      this.stream = stream;
      this.size = size;
      this.fileSize = fileMeta.fsize;
      this.contentType = (_a = fileMeta.contentType) != null ? _a : "";
    }
    blob() {
      return __async(this, null, function* () {
        const stream = this.stream;
        const reader = stream.getReader();
        const parts = [];
        while (true) {
          const { done, value } = yield reader.read();
          if (done)
            break;
          const arrayBuffer = value;
          parts.push(arrayBuffer);
        }
        return new Blob(parts);
      });
    }
  }
  function makeRange(totalSize, start, end) {
    if (totalSize != null && end != null) {
      if (end >= totalSize)
        end = null;
    }
    if (start == null || start < 0)
      start = 0;
    return [start, end];
  }
  function isFull(totalSize, range) {
    var _a;
    const startFull = ((_a = range[0]) != null ? _a : 0) === 0;
    const endFull = range[1] == null || totalSize != null && range[1] === totalSize;
    return startFull && endFull;
  }
  function getRangeSize(totalSize, range) {
    var _a, _b;
    const start = (_a = range[0]) != null ? _a : 0;
    const end = (_b = range[1]) != null ? _b : totalSize;
    return end == null ? null : end - start;
  }
  function applyRange(range, fsize, pieces) {
    var _a, _b;
    if (fsize === 0)
      return [];
    const endGt = (num1, num2) => {
      return gt(num1, num2, fsize != null ? fsize : Number.POSITIVE_INFINITY);
    };
    const start = (_a = range == null ? void 0 : range[0]) != null ? _a : 0;
    const end = (_b = range == null ? void 0 : range[1]) != null ? _b : fsize;
    const result = [];
    let applyFrom = start;
    for (const p of pieces) {
      if (applyFrom == null)
        break;
      if (fsize != null && p[1] != null && p[1] > fsize)
        break;
      if (p[1] != null && applyFrom >= p[1])
        continue;
      if (end == null || end > p[0]) {
        if (p[0] > applyFrom) {
          result.push({
            cached: false,
            range: makeRange(fsize, applyFrom, p[0])
          });
        }
        const cacheStart = endGt(p[0], applyFrom) ? p[0] : applyFrom;
        const cacheEnd = endGt(p[1], end) ? end : p[1];
        if (endGt(cacheEnd, cacheStart)) {
          result.push({
            cached: true,
            range: makeRange(fsize, cacheStart, cacheEnd)
          });
          applyFrom = cacheEnd;
        }
        continue;
      }
      break;
    }
    if (endGt(end, applyFrom)) {
      result.push({
        cached: false,
        range: makeRange(fsize, applyFrom, end)
      });
    }
    return result;
  }
  function findPiece(pieces, range) {
    var _a;
    const rangeStart = (_a = range[0]) != null ? _a : 0;
    const rangeEnd = range[1];
    for (const piece of pieces) {
      if (piece[1] != null && piece[1] <= rangeStart)
        continue;
      if (piece[0] > rangeStart)
        break;
      const start = rangeStart - piece[0];
      const end = minus(rangeEnd != null ? rangeEnd : piece[1], piece[0]);
      return { piece, start, end };
    }
    throw new Error("Piece not found");
  }
  function addPiece(pieces, piece) {
    return [...pieces, piece].sort(
      (piece1, piece2) => piece1[0] - piece2[0]
    );
  }
  function gt(num1, num2, nullAs) {
    const val1 = num1 != null ? num1 : nullAs;
    const val2 = num2 != null ? num2 : nullAs;
    return val1 > val2;
  }
  function minus(num1, num2) {
    return num1 == null || num2 == null ? null : num1 - num2;
  }
  const debug$3 = getDebug("cdnr/ftask");
  class FileTask {
    constructor(taskq, cache, http, key, url) {
      __publicField(this, "id", uuid());
      __publicField(this, "inited");
      __publicField(this, "cachePieces", []);
      __publicField(this, "meta", createDefered());
      this.taskq = taskq;
      this.cache = cache;
      this.http = http;
      this.key = key;
      this.url = url;
      this.inited = this.resume();
    }
    startTask(task) {
      return __async(this, null, function* () {
        if (task.range != null) {
          debug$3("startTask", task.url);
          yield this.inited;
          debug$3("startTask inited", task.url);
          return this.startTaskWithRange(task);
        } else {
          return this.startTaskWithoutRange(task);
        }
      });
    }
    startTaskWithRange(task) {
      return __async(this, null, function* () {
        debug$3("startTaskWithRange", task.url);
        const range = task.range != null ? [task.range.start, task.range.end] : [0, null];
        const [stream, meta] = yield Promise.all([
          this.readRange(task, range),
          this.meta.promise
        ]);
        const size = getRangeSize(meta.fsize, range);
        return new Result(stream, size, meta);
      });
    }
    startTaskWithoutRange(task) {
      return __async(this, null, function* () {
        debug$3("startTaskWithoutRange", task.url);
        const streamPromise = new Promise((resolve, reject) => {
          this.taskq.add({
            name: `startTaskWithoutRange: ${this.url}`,
            priority: task.priority,
            run: () => __async(this, null, function* () {
              const cachedContent = yield this.cache.getContent(this.key, [0, null]);
              if (cachedContent === void 0) {
                try {
                  const { body: body2 } = yield this.doRequest(null);
                  const [stream1, stream2] = body2.tee();
                  resolve(stream1);
                  this.saveCachePiece([0, null], stream2);
                } catch (e) {
                  reject(e);
                }
              } else {
                debug$3("use cache", task.url);
                resolve(cachedContent);
              }
            })
          });
        });
        const [stream, meta] = yield Promise.all([
          streamPromise,
          this.meta.promise
        ]);
        return new Result(stream, meta.fsize, meta);
      });
    }
    readRange(task, range) {
      return __async(this, null, function* () {
        var _a, _b, _c, _d;
        const pieces = applyRange(range, (_b = (_a = this.meta.value) == null ? void 0 : _a.fsize) != null ? _b : null, this.cachePieces);
        debug$3("applyRange", range, (_d = (_c = this.meta.value) == null ? void 0 : _c.fsize) != null ? _d : null, this.cachePieces, pieces);
        const stream = new TransformStream();
        const abortCtrl = new AbortController();
        (() => __async(this, null, function* () {
          for (let i = 0; i < pieces.length; i++) {
            const { cached, range: range2 } = pieces[i];
            let pieceStream;
            try {
              pieceStream = yield cached ? this.readPieceFromLocal(task, range2) : this.readPieceFromRemote(task, range2);
            } catch (e) {
              console.warn("readPiece failed for", this.url, e);
              if (i === 0) {
                stream.writable.abort(e);
              } else {
                abortCtrl.abort(e);
              }
              return;
            }
            const isLast = i === pieces.length - 1;
            try {
              yield pieceStream.pipeTo(stream.writable, {
                preventClose: !isLast,
                signal: abortCtrl.signal
              });
            } catch (e) {
              debug$3("readRange cancelled for", this.url, e);
              return;
            }
          }
        }))();
        return stream.readable;
      });
    }
    readPieceFromLocal(task, range) {
      return __async(this, null, function* () {
        debug$3("readPieceFromLocal", task.url, range);
        const { piece, start, end } = findPiece(this.cachePieces, range);
        const pieceContent = yield this.cache.getContent(this.key, piece);
        if (pieceContent == null) {
          console.warn(`Missing cache item: ${this.key} [${piece})`);
          return this.readPieceFromRemote(task, range);
        }
        return slice(pieceContent, [start, end]);
      });
    }
    fileSize() {
      var _a, _b;
      return (_b = (_a = this.meta.value) == null ? void 0 : _a.fsize) != null ? _b : null;
    }
    readPieceFromRemote(task, range) {
      return __async(this, null, function* () {
        debug$3("readPieceFromRemote", task.url, range);
        return new Promise((resolve, reject) => {
          this.taskq.add({
            name: `readPieceFromRemote: ${this.url}, [${range[0], range[1]})]`,
            priority: task.priority,
            run: () => __async(this, null, function* () {
              var _a;
              try {
                const { response, body: body2 } = yield this.doRequest(range);
                const [bodyForResolve, bodyForCache] = body2.tee();
                if (!isFull(this.fileSize(), range) && response.status === 200) {
                  resolve(slice(bodyForResolve, range));
                } else {
                  resolve(bodyForResolve);
                }
                const piece = [(_a = range[0]) != null ? _a : 0, range[1]];
                this.saveCachePiece(piece, bodyForCache);
              } catch (e) {
                reject(e);
              }
            })
          });
        });
      });
    }
    doRequest(range) {
      return __async(this, null, function* () {
        try {
          const ctx = new Context();
          ctx.set("downloadFileTaskID", this.id);
          const headers = {
            "Accept-Encoding": "identity;q=1, *;q=0"
          };
          if (range != null && !isFull(this.fileSize(), range)) {
            const httpRange = { start: range[0], end: range[1] == null ? null : range[1] - 1 };
            ctx.set("downloadRange", httpRange);
            headers["Range"] = stringifyRange(httpRange);
          }
          const request = new HttpRequest(this.url, { headers });
          const response = yield this.http.do(ctx, request);
          if (response.body == null) {
            throw new Error("Body expected");
          }
          if (response.status !== 200 && response.status !== 206) {
            throw new Error(`Invalid response, status: ${response.status}`);
          }
          this.saveMeta(response);
          return { response, body: response.body };
        } catch (e) {
          this.meta.reject(e);
          throw e;
        }
      });
    }
    saveCachePiece(piece, content) {
      return __async(this, null, function* () {
        debug$3("saveCachePiece", this.url, piece);
        yield this.cache.setContent(this.key, piece, content);
        this.cachePieces = addPiece(this.cachePieces, piece);
        yield this.save();
        debug$3("saveCachePiece finish", this.url, piece);
      });
    }
    saveMeta(response) {
      return __async(this, null, function* () {
        var _a;
        if (this.meta.value != null) {
          this.meta = createDefered();
        }
        let fileSize = null;
        if (response.status === 200) {
          const contentLengthStr = response.headers.get("Content-Length");
          const contentLength = contentLengthStr != null ? parseInt(contentLengthStr, 10) : null;
          fileSize = contentLength;
        }
        if (response.status === 206) {
          const contentRange = httpGetContentRange(response.headers);
          fileSize = (_a = contentRange == null ? void 0 : contentRange.totalSize) != null ? _a : null;
        }
        this.meta.resolve({
          contentType: response.headers.get("Content-Type"),
          fsize: fileSize
        });
        yield this.meta.promise;
        yield this.save();
      });
    }
    resume() {
      return __async(this, null, function* () {
        const item = yield this.cache.getItem(this.key);
        if (item == null || item.meta == null)
          return;
        this.meta.resolve(item.meta);
        this.cachePieces = item.pieces;
      });
    }
    save() {
      return __async(this, null, function* () {
        const item = {
          meta: this.meta.value,
          pieces: this.cachePieces
        };
        yield this.cache.setItem(this.key, item);
      });
    }
  }
  class Emitter {
    constructor() {
      __publicField(this, "map", /* @__PURE__ */ new Map());
    }
    on(type, handler) {
      var _a;
      const handlers = (_a = this.map.get(type)) != null ? _a : [];
      const newHandlers = [...handlers, handler];
      this.map.set(type, newHandlers);
      return () => this.off(type, handler);
    }
    once(type, handler) {
      const off = this.on(type, (e) => {
        off();
        handler(e);
      });
      return off;
    }
    off(type, handler) {
      var _a;
      const handlers = (_a = this.map.get(type)) != null ? _a : [];
      const newHandlers = handlers.filter((h) => h !== handler);
      this.map.set(type, newHandlers);
    }
    emit(...args) {
      var _a;
      const [type, event] = args;
      const handlers = (_a = this.map.get(type)) != null ? _a : [];
      handlers.forEach((handler) => {
        handler(event);
      });
    }
    dispose() {
      this.map.clear();
    }
  }
  const debug$2 = getDebug("utils/taskq");
  class TaskQueue {
    constructor(jobs) {
      __publicField(this, "tasks", []);
      __publicField(this, "emitter", new Emitter());
      __publicField(this, "running", true);
      for (let i = 0; i < jobs; i++) {
        this.comsumeLoop();
      }
    }
    add(task) {
      let i = 0;
      for (; i < this.tasks.length; i++) {
        if (this.tasks[i].priority >= task.priority) {
          break;
        }
      }
      this.tasks.splice(i, 0, task);
      this.emitter.emit("task");
    }
    pop() {
      return __async(this, null, function* () {
        const task = this.tasks.pop();
        if (task != null)
          return task;
        return new Promise((resolve) => {
          const off = this.emitter.on("task", () => {
            const task2 = this.tasks.pop();
            if (task2 != null) {
              resolve(task2);
              off();
            }
          });
        });
      });
    }
    consumeTask() {
      return __async(this, null, function* () {
        if (!this.running)
          return;
        const task = yield this.pop();
        debug$2("run task", task.name, ", with priority:", task.priority);
        try {
          yield task == null ? void 0 : task.run();
        } catch (e) {
          console.warn("Task run failed:", e);
        }
      });
    }
    comsumeLoop() {
      return __async(this, null, function* () {
        while (this.running) {
          yield this.consumeTask();
        }
      });
    }
    dispose() {
      this.emitter.dispose();
      this.running = false;
    }
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var uaParser$1 = { exports: {} };
  (function(module, exports2) {
    (function(window2, undefined$1) {
      var LIBVERSION = "1.0.2", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 255;
      var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook";
      var extend = function(regexes2, extensions) {
        var mergedRegexes = {};
        for (var i in regexes2) {
          if (extensions[i] && extensions[i].length % 2 === 0) {
            mergedRegexes[i] = extensions[i].concat(regexes2[i]);
          } else {
            mergedRegexes[i] = regexes2[i];
          }
        }
        return mergedRegexes;
      }, enumerize = function(arr) {
        var enums = {};
        for (var i = 0; i < arr.length; i++) {
          enums[arr[i].toUpperCase()] = arr[i];
        }
        return enums;
      }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
      }, lowerize = function(str) {
        return str.toLowerCase();
      }, majorize = function(version2) {
        return typeof version2 === STR_TYPE ? version2.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined$1;
      }, trim = function(str, len) {
        if (typeof str === STR_TYPE) {
          str = str.replace(/^\s\s*/, EMPTY).replace(/\s\s*$/, EMPTY);
          return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
      };
      var rgxMapper = function(ua, arrays) {
        var i = 0, j, k, p, q, matches, match;
        while (i < arrays.length && !matches) {
          var regex = arrays[i], props = arrays[i + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            matches = regex[j++].exec(ua);
            if (!!matches) {
              for (p = 0; p < props.length; p++) {
                match = matches[++k];
                q = props[p];
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length === 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      this[q[0]] = q[1];
                    }
                  } else if (q.length === 3) {
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                    } else {
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                    }
                  } else if (q.length === 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                  }
                } else {
                  this[q] = match ? match : undefined$1;
                }
              }
            }
          }
          i += 2;
        }
      }, strMapper = function(str, map) {
        for (var i in map) {
          if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
            for (var j = 0; j < map[i].length; j++) {
              if (has(map[i][j], str)) {
                return i === UNKNOWN ? undefined$1 : i;
              }
            }
          } else if (has(map[i], str)) {
            return i === UNKNOWN ? undefined$1 : i;
          }
        }
        return str;
      };
      var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
      }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": ["NT 5.1", "NT 5.2"],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": ["NT 6.4", "NT 10.0"],
        "RT": "ARM"
      };
      var regexes = {
        browser: [
          [
            /\b(?:crmo|crios)\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Chrome"]],
          [
            /edg(?:e|ios|a)?\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Edge"]],
          [
            /(opera mini)\/([-\w\.]+)/i,
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /opios[\/ ]+([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Mini"]],
          [
            /\bopr\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA]],
          [
            /(kindle)\/([\w\.]+)/i,
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
            /(?:ms|\()(ie) ([\w\.]+)/i,
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,
            /(weibo)__([\d\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
          ],
          [VERSION, [NAME, "UC" + BROWSER]],
          [
            /\bqbcore\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "WeChat(Win) Desktop"]],
          [
            /micromessenger\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "WeChat"]],
          [
            /konqueror\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Konqueror"]],
          [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
          ],
          [VERSION, [NAME, "IE"]],
          [
            /yabrowser\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Yandex"]],
          [
            /(avast|avg)\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
          [
            /\bfocus\/([\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX + " Focus"]],
          [
            /\bopt\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Touch"]],
          [
            /coc_coc\w+\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Coc Coc"]],
          [
            /dolfin\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Dolphin"]],
          [
            /coast\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Coast"]],
          [
            /miuibrowser\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "MIUI " + BROWSER]],
          [
            /fxios\/([-\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX]],
          [
            /\bqihu|(qi?ho?o?|360)browser/i
          ],
          [[NAME, "360 " + BROWSER]],
          [
            /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1 " + BROWSER], VERSION],
          [
            /(comodo_dragon)\/([\w\.]+)/i
          ],
          [[NAME, /_/g, " "], VERSION],
          [
            /(electron)\/([\w\.]+) safari/i,
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(metasr)[\/ ]?([\w\.]+)/i,
            /(lbbrowser)/i
          ],
          [NAME],
          [
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
          ],
          [[NAME, FACEBOOK], VERSION],
          [
            /safari (line)\/([\w\.]+)/i,
            /\b(line)\/([\w\.]+)\/iab/i,
            /(chromium|instagram)[\/ ]([-\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /\bgsa\/([\w\.]+) .*safari\//i
          ],
          [VERSION, [NAME, "GSA"]],
          [
            /headlesschrome(?:\/([\w\.]+)| )/i
          ],
          [VERSION, [NAME, CHROME + " Headless"]],
          [
            / wv\).+(chrome)\/([\w\.]+)/i
          ],
          [[NAME, CHROME + " WebView"], VERSION],
          [
            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
          ],
          [VERSION, [NAME, "Android " + BROWSER]],
          [
            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /version\/([\w\.]+) .*mobile\/\w+ (safari)/i
          ],
          [VERSION, [NAME, "Mobile Safari"]],
          [
            /version\/([\w\.]+) .*(mobile ?safari|safari)/i
          ],
          [VERSION, NAME],
          [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
          ],
          [NAME, [VERSION, strMapper, oldSafariMap]],
          [
            /(webkit|khtml)\/([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(navigator|netscape\d?)\/([-\w\.]+)/i
          ],
          [[NAME, "Netscape"], VERSION],
          [
            /mobile vr; rv:([\w\.]+)\).+firefox/i
          ],
          [VERSION, [NAME, FIREFOX + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            /(swiftfox)/i,
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            /(firefox)\/([\w\.]+)/i,
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            /(links) \(([\w\.]+)/i
          ],
          [NAME, VERSION]
        ],
        cpu: [
          [
            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
          ],
          [[ARCHITECTURE, "amd64"]],
          [
            /(ia32(?=;))/i
          ],
          [[ARCHITECTURE, lowerize]],
          [
            /((?:i[346]|x)86)[;\)]/i
          ],
          [[ARCHITECTURE, "ia32"]],
          [
            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
          ],
          [[ARCHITECTURE, "arm64"]],
          [
            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
          ],
          [[ARCHITECTURE, "armhf"]],
          [
            /windows (ce|mobile); ppc;/i
          ],
          [[ARCHITECTURE, "arm"]],
          [
            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
          ],
          [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
          [
            /(sun4\w)[;\)]/i
          ],
          [[ARCHITECTURE, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
          ],
          [[ARCHITECTURE, lowerize]]
        ],
        device: [
          [
            /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
          [
            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
          [
            /\((ip(?:hone|od)[\w ]*);/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
          [
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
          [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
          [
            /\b(poco[\w ]+)(?: bui|\))/i,
            /\b; (\w+) build\/hm\1/i,
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
          [
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
          [
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
          ],
          [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
          [
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
          ],
          [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
          [
            /\b(rmx[12]\d{3})(?: bui|;|\))/i
          ],
          [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
          [
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
          [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
          [
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, TABLET]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
          [
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
          ],
          [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
          [
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
          [
            /(pixel c)\b/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
          [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
          [
            /droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
          [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
          ],
          [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
          [
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
          [
            /(alexa)webm/i,
            /(kf[a-z]{2}wi)( bui|\))/i,
            /(kf[a-z]+)( bui|\)).+silk\//i
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
          [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
          ],
          [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
          [
            /(playbook);[-\w\),; ]+(rim)/i
          ],
          [MODEL, VENDOR, [TYPE, TABLET]],
          [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i
          ],
          [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
          [
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
          [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
          [
            /(nexus 9)/i
          ],
          [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i
          ],
          [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
          [
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
          ],
          [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
          [
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
          ],
          [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
          [
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
          ],
          [MODEL, [VENDOR, "Sharp"], [TYPE, MOBILE]],
          [
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
            /(hp) ([\w ]+\w)/i,
            /(asus)-?(\w+)/i,
            /(microsoft); (lumia[\w ]+)/i,
            /(lenovo)[-_ ]?([-\w]+)/i,
            /(jolla)/i,
            /(oppo) ?([\w ]+) bui/i
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(archos) (gamepad2?)/i,
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            /(kindle)\/([\w\.]+)/i,
            /(nook)[\w ]+build\/(\w+)/i,
            /(dell) (strea[kpr\d ]*[\dko])/i,
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            /(trinity)[- ]*(t\d{3}) bui/i,
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            /(vodafone) ([\w ]+)(?:\)| bui)/i
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(surface duo)/i
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
          [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
          [
            /(u304aa)/i
          ],
          [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
          [
            /\bsie-(\w*)/i
          ],
          [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
          [
            /\b(rct\w+) b/i
          ],
          [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
          [
            /\b(venue[\d ]{2,7}) b/i
          ],
          [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
          [
            /\b(q(?:mv|ta)\w+) b/i
          ],
          [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
          [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
          ],
          [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
          [
            /\b(tm\d{3}\w+) b/i
          ],
          [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
          [
            /\b(k88) b/i
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
          [
            /\b(nx\d{3}j) b/i
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
          [
            /\b(gen\d{3}) b.+49h/i
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
          [
            /\b(zur\d{3}) b/i
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
          [
            /\b((zeki)?tb.*\b) b/i
          ],
          [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
          [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
          ],
          [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
          [
            /\b(ns-?\w{0,9}) b/i
          ],
          [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
          [
            /\b((nxa|next)-?\w{0,9}) b/i
          ],
          [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
          [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
          ],
          [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
          [
            /\b(lvtel\-)?(v1[12]) b/i
          ],
          [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
          [
            /\b(ph-1) /i
          ],
          [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
          [
            /\b(v(100md|700na|7011|917g).*\b) b/i
          ],
          [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
          [
            /\b(trio[-\w\. ]+) b/i
          ],
          [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
          [
            /\btu_(1491) b/i
          ],
          [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
          [
            /(shield[\w ]+) b/i
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
          [
            /(sprint) (\w+)/i
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kin\.[onetw]{3})/i
          ],
          [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
          [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
          [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
          [
            /(ouya)/i,
            /(nintendo) ([wids3utch]+)/i
          ],
          [VENDOR, MODEL, [TYPE, CONSOLE]],
          [
            /droid.+; (shield) bui/i
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
          [
            /(playstation [345portablevi]+)/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
          [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
          [
            /smart-tv.+(samsung)/i
          ],
          [VENDOR, [TYPE, SMARTTV]],
          [
            /hbbtv.+maple;(\d+)/i
          ],
          [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
          [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
          ],
          [[VENDOR, LG], [TYPE, SMARTTV]],
          [
            /(apple) ?tv/i
          ],
          [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
          [
            /crkey/i
          ],
          [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
          [
            /droid.+aft(\w)( bui|\))/i
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
          [
            /\(dtv[\);].+(aquos)/i
          ],
          [MODEL, [VENDOR, "Sharp"], [TYPE, SMARTTV]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i
          ],
          [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
          [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
          ],
          [[TYPE, SMARTTV]],
          [
            /((pebble))app/i
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /droid.+; (glass) \d/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
          [
            /droid.+; (wt63?0{2,3})\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
          [
            /(quest( 2)?)/i
          ],
          [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
          [
            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
          ],
          [VENDOR, [TYPE, EMBEDDED]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
          ],
          [MODEL, [TYPE, MOBILE]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
          ],
          [MODEL, [TYPE, TABLET]],
          [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
          ],
          [[TYPE, TABLET]],
          [
            /(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i
          ],
          [[TYPE, MOBILE]],
          [
            /(android[-\w\. ]{0,9});.+buil/i
          ],
          [MODEL, [VENDOR, "Generic"]]
        ],
        engine: [
          [
            /windows.+ edge\/([\w\.]+)/i
          ],
          [VERSION, [NAME, EDGE + "HTML"]],
          [
            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
          ],
          [VERSION, [NAME, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
            /ekioh(flow)\/([\w\.]+)/i,
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            /(icab)[\/ ]([23]\.[\d\.]+)/i
          ],
          [NAME, VERSION],
          [
            /rv\:([\w\.]{1,9})\b.+(gecko)/i
          ],
          [VERSION, NAME]
        ],
        os: [
          [
            /microsoft (windows) (vista|xp)/i
          ],
          [NAME, VERSION],
          [
            /(windows) nt 6\.2; (arm)/i,
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
          ],
          [NAME, [VERSION, strMapper, windowsVersionMap]],
          [
            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
          ],
          [[NAME, "Windows"], [VERSION, strMapper, windowsVersionMap]],
          [
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
            /cfnetwork\/.+darwin/i
          ],
          [[VERSION, /_/g, "."], [NAME, "iOS"]],
          [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
          ],
          [[NAME, "Mac OS"], [VERSION, /_/g, "."]],
          [
            /droid ([\w\.]+)\b.+(android[- ]x86)/i
          ],
          [VERSION, NAME],
          [
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,
            /(tizen|kaios)[\/ ]([\w\.]+)/i,
            /\((series40);/i
          ],
          [NAME, VERSION],
          [
            /\(bb(10);/i
          ],
          [VERSION, [NAME, BLACKBERRY]],
          [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
          ],
          [VERSION, [NAME, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX + " OS"]],
          [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "webOS"]],
          [
            /crkey\/([\d\.]+)/i
          ],
          [VERSION, [NAME, CHROME + "cast"]],
          [
            /(cros) [\w]+ ([\w\.]+\w)/i
          ],
          [[NAME, "Chromium OS"], VERSION],
          [
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            /(xbox); +xbox ([^\);]+)/i,
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            /(mint)[\/\(\) ]?(\w*)/i,
            /(mageia|vectorlinux)[; ]/i,
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            /(hurd|linux) ?([\w\.]*)/i,
            /(gnu) ?([\w\.]*)/i,
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            /(haiku) (\w+)/i
          ],
          [NAME, VERSION],
          [
            /(sunos) ?([\w\.\d]*)/i
          ],
          [[NAME, "Solaris"], VERSION],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
            /(unix) ?([\w\.]*)/i
          ],
          [NAME, VERSION]
        ]
      };
      var UAParser = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
          extensions = ua;
          ua = undefined$1;
        }
        if (!(this instanceof UAParser)) {
          return new UAParser(ua, extensions).getResult();
        }
        var _ua = ua || (typeof window2 !== UNDEF_TYPE && window2.navigator && window2.navigator.userAgent ? window2.navigator.userAgent : EMPTY);
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        this.getBrowser = function() {
          var _browser = {};
          _browser[NAME] = undefined$1;
          _browser[VERSION] = undefined$1;
          rgxMapper.call(_browser, _ua, _rgxmap.browser);
          _browser.major = majorize(_browser.version);
          return _browser;
        };
        this.getCPU = function() {
          var _cpu = {};
          _cpu[ARCHITECTURE] = undefined$1;
          rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
          return _cpu;
        };
        this.getDevice = function() {
          var _device = {};
          _device[VENDOR] = undefined$1;
          _device[MODEL] = undefined$1;
          _device[TYPE] = undefined$1;
          rgxMapper.call(_device, _ua, _rgxmap.device);
          return _device;
        };
        this.getEngine = function() {
          var _engine = {};
          _engine[NAME] = undefined$1;
          _engine[VERSION] = undefined$1;
          rgxMapper.call(_engine, _ua, _rgxmap.engine);
          return _engine;
        };
        this.getOS = function() {
          var _os = {};
          _os[NAME] = undefined$1;
          _os[VERSION] = undefined$1;
          rgxMapper.call(_os, _ua, _rgxmap.os);
          return _os;
        };
        this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function() {
          return _ua;
        };
        this.setUA = function(ua2) {
          _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
          return this;
        };
        this.setUA(_ua);
        return this;
      };
      UAParser.VERSION = LIBVERSION;
      UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR]);
      UAParser.CPU = enumerize([ARCHITECTURE]);
      UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
      UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);
      {
        if (module.exports) {
          exports2 = module.exports = UAParser;
        }
        exports2.UAParser = UAParser;
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua) {
          parser.setUA(ua);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : commonjsGlobal);
  })(uaParser$1, uaParser$1.exports);
  const uaParser = uaParser$1.exports;
  const version = "0.0.1-alpha.28";
  function getEnv() {
    var _a, _b;
    const { os, device } = uaParser(navigator.userAgent);
    let location;
    if (typeof window !== "undefined") {
      location = window.location;
    } else if (typeof self !== void 0) {
      location = self.location;
    }
    return {
      os: `${os.name}_${os.version}`,
      app: (_a = location == null ? void 0 : location.host) != null ? _a : "",
      sdk: `Web SDK v${version}`,
      dev_model: (_b = device.model) != null ? _b : "",
      dev_id: ""
    };
  }
  const logNumPerCall = 200;
  const debug$1 = getDebug("logr");
  class SchemaLogger {
    constructor(schemaName, fetch2, flushNum, flushWait) {
      __publicField(this, "env", queryStringify(getEnv()));
      __publicField(this, "flushMutex", new Mutex());
      __publicField(this, "buffer", []);
      this.schemaName = schemaName;
      this.fetch = fetch2;
      this.flushNum = flushNum;
      this.flushWait = flushWait;
    }
    callApiLog(logs) {
      return __async(this, null, function* () {
        const fetch2 = this.fetch;
        try {
          const resp = yield fetch2(new Request(`${logApiPrefix}/v1/log/${this.schemaName}`, {
            method: "POST",
            headers: {
              "Content-Type": "text/csv",
              "X-Env": this.env
            },
            body: getLogBody(logs)
          }));
          if (!resp.ok)
            throw new Error(`Unexpected response status: ${resp.status} ${resp.statusText}`);
        } catch (e) {
          console.warn("Call log API failed:", e);
        }
      });
    }
    flush() {
      return __async(this, null, function* () {
        return this.flushMutex.runExclusive(() => __async(this, null, function* () {
          const logs = this.buffer.splice(0);
          if (logs.length === 0)
            return;
          const callNum = Math.ceil(logs.length / logNumPerCall);
          return Promise.all(Array.from({ length: callNum }).map((_, i) => this.callApiLog(logs.slice(i * logNumPerCall, (i + 1) * logNumPerCall))));
        }));
      });
    }
    tryFlush() {
      return __async(this, null, function* () {
        const flushOrRetry = yield this.flushMutex.runExclusive(() => {
          const buffer = this.buffer;
          if (buffer.length === 0)
            return false;
          if (buffer.length >= this.flushNum) {
            debug$1("buffer.length >= this.flushNum");
            return true;
          }
          const waited = Date.now() - buffer[0].ts;
          if (waited >= this.flushWait * 1e3) {
            debug$1("waited >= this.flushWait");
            return true;
          }
          return this.flushWait * 1e3 - waited;
        });
        if (flushOrRetry === true)
          return this.flush();
        if (typeof flushOrRetry === "number") {
          setTimeout(() => this.tryFlush(), flushOrRetry);
        }
      });
    }
    log(logData) {
      this.buffer.push(__spreadValues({ ts: Date.now() }, logData));
      this.tryFlush();
    }
  }
  class Logger {
    constructor(appInfo, fetch2 = self.fetch, flushNum = 100, flushWait = 30) {
      __publicField(this, "schemaLoggers", /* @__PURE__ */ new Map());
      this.appInfo = appInfo;
      this.fetch = fetch2;
      this.flushNum = flushNum;
      this.flushWait = flushWait;
    }
    log(schemaName, logData) {
      let logger = this.schemaLoggers.get(schemaName);
      if (logger == null) {
        logger = new SchemaLogger(schemaName, this.fetch, this.flushNum, this.flushWait);
        this.schemaLoggers.set(schemaName, logger);
      }
      logger.log(logData);
    }
  }
  function getLogBody(logs) {
    const fields = Object.keys(logs[0]);
    const sortedFields = ["ts", ...fields.filter((f) => f !== "ts")];
    const headLine = sortedFields.map(processCSVValue).join(",");
    const bodyLines = logs.map(
      (log) => sortedFields.map(
        (k) => log[k]
      ).map(
        (v) => v != null ? v + "" : ""
      ).map(processCSVValue).join(",")
    );
    return [headLine, ...bodyLines].join("\n");
  }
  function processCSVValue(value) {
    let str = value.replace(/"/g, '""');
    if (/("|,|\n)/.test(str)) {
      str = '"' + str + '"';
    }
    return str;
  }
  function isRequestMessage(message) {
    return message && message.hoW === true && ["req-head", "req-body-chunk"].includes(message.type);
  }
  function dehydrateHeaders(headers) {
    const res = {};
    headers.forEach((v, k) => {
      res[k] = v;
    });
    return res;
  }
  function isInServiceWorker() {
    const scope2 = self;
    return !!(scope2.clients && scope2.registration);
  }
  const messageEmitter = new Emitter();
  let scope;
  if (typeof self !== "undefined") {
    scope = self;
    scope.addEventListener("message", (e) => messageEmitter.emit("message", e));
  }
  const debug = getDebug("cdnr/http/webrtc/service");
  class HoWService {
    constructor(pcConnectTimeout, dcOpenTimeout) {
      __publicField(this, "workerContainer", navigator.serviceWorker);
      __publicField(this, "hoW");
      __publicField(this, "disposers", []);
      this.hoW = new HoW(pcConnectTimeout, dcOpenTimeout);
      this.disposers.push(() => this.hoW.dispose());
    }
    get worker() {
      if (this.workerContainer.controller == null)
        throw new Error("No available service worker");
      return this.workerContainer.controller;
    }
    sendBody(id, body2) {
      return __async(this, null, function* () {
        const reader = body2.getReader();
        while (true) {
          const { value, done } = yield reader.read();
          if (done) {
            const message2 = { hoW: true, type: "resp-body-chunk", id, payload: null };
            this.worker.postMessage(message2);
            return;
          }
          const message = { hoW: true, type: "resp-body-chunk", id, payload: value.buffer };
          this.worker.postMessage(message, [value.buffer]);
        }
      });
    }
    sendResponse(ctx, id, response) {
      return __async(this, null, function* () {
        var _a, _b;
        debug("sendResponse in MainPage", id, response);
        const { status, statusText, headers, body: body2 } = response;
        const message = {
          hoW: true,
          type: "resp-head",
          id,
          status,
          statusText,
          headers: dehydrateHeaders(headers),
          hasBody: body2 != null,
          dataChannelOpenTime: (_a = ctx.get("hoWDataChannelOpenTime")) != null ? _a : -1,
          startTransferTime: (_b = ctx.get("hoWStartTransferTime")) != null ? _b : -1
        };
        this.worker.postMessage(message);
        if (body2 != null) {
          yield this.sendBody(id, body2);
        }
      });
    }
    sendResponseError(id, err) {
      const message = {
        hoW: true,
        type: "resp-error",
        id,
        name: err instanceof Error ? err.name : "UnknownError",
        message: err instanceof Error ? err.message : err + ""
      };
      this.worker.postMessage(message);
    }
    receiveRequestBody(id) {
      let streamCtrl;
      const stream = new ReadableStream({
        start: (ctrl) => streamCtrl = ctrl
      });
      const unlisten = listen(this.workerContainer, "message", ({ data }) => {
        if (!isRequestMessage(data))
          return;
        if (data.id !== id)
          return;
        if (data.type !== "req-body-chunk")
          return;
        if (streamCtrl == null)
          throw new Error("Stream Controller should be ready");
        if (data.payload == null) {
          streamCtrl.close();
          unlisten();
          return;
        }
        streamCtrl.enqueue(new Uint8Array(data.payload));
      });
      return stream;
    }
    getRequest({ id, url, method, headers, hasBody }) {
      if (!hasBody)
        return new HttpRequest(url, { method, headers });
      const body2 = this.receiveRequestBody(id);
      return new HttpRequest(url, { method, headers, body: body2 });
    }
    run() {
      this.disposers.push(listen(this.workerContainer, "message", (_0) => __async(this, [_0], function* ({ data }) {
        debug("Got message in MainPage", data);
        if (!isRequestMessage(data))
          return;
        if (data.type !== "req-head")
          return;
        const { id, fingerprint } = data;
        const request = this.getRequest(data);
        const ctx = new Context();
        try {
          const response = yield this.hoW.fetch(ctx, id, request, fingerprint);
          yield this.sendResponse(ctx, id, response);
        } catch (e) {
          this.sendResponseError(id, e);
        }
      })));
    }
    dispose() {
      this.disposers.forEach((d) => d());
    }
  }
  function listen(target, type, listener) {
    target.addEventListener(type, listener);
    return () => target.removeEventListener(type, listener);
  }
  class HoWHttpClientForMP {
    constructor(getFingerprint, pcConnectTimeout, dcOpenTimeout) {
      __publicField(this, "hoW");
      this.getFingerprint = getFingerprint;
      if (isInServiceWorker())
        throw new Error("HoWHttpClientMainPage should not be used in Service Worker");
      this.hoW = new HoW(pcConnectTimeout, dcOpenTimeout);
    }
    fetch(ctx, request) {
      return __async(this, null, function* () {
        var _a, _b;
        const id = uuid();
        const fingerprint = this.getFingerprint(new URL(request.url).host);
        const resp = yield this.hoW.fetch(ctx, id, request, fingerprint);
        ctx.set("downloadConnectionTime", (_a = ctx.get("hoWPeerConnectionConnectTime")) != null ? _a : -1);
        ctx.set("downloadStartTransferTime", (_b = ctx.get("hoWStartTransferTime")) != null ? _b : -1);
        return resp;
      });
    }
    dispose() {
      this.hoW.dispose();
    }
  }
  const defaultWorkersCount = 10;
  function createHoWHttpForMP(logger, config) {
    const resolver = new Resolver(logger, config == null ? void 0 : config.dnsResolver);
    const httpClient = new HoWHttpClientForMP((ipPort) => resolver.getFingerprint(ipPort));
    return new Http(logger, resolver, httpClient);
  }
  class Client {
    constructor(appInfo, config) {
      __publicField(this, "fileTasks", /* @__PURE__ */ new Map());
      __publicField(this, "taskq");
      __publicField(this, "cache");
      __publicField(this, "hasher");
      __publicField(this, "http");
      var _a, _b, _c, _d;
      this.appInfo = appInfo;
      if (config == null ? void 0 : config.debug)
        enableDebug();
      this.cache = new Cache(config == null ? void 0 : config.cache);
      this.hasher = (_a = config == null ? void 0 : config.hasher) != null ? _a : defaultHash;
      const logger = (_b = config == null ? void 0 : config.logger) != null ? _b : new Logger(appInfo);
      this.http = (_c = config == null ? void 0 : config.http) != null ? _c : createHoWHttpForMP(logger, config);
      this.taskq = new TaskQueue((_d = config == null ? void 0 : config.workersCount) != null ? _d : defaultWorkersCount);
    }
    createTask(url, range) {
      const hashIdx = url.indexOf("#");
      if (hashIdx >= 0) {
        url = url.slice(0, hashIdx);
      }
      return new Task(this, url, range != null ? range : null, Number.POSITIVE_INFINITY);
    }
    startTask(task) {
      const key = this.hasher(task.url);
      let fileTask = this.fileTasks.get(key);
      if (fileTask == null) {
        fileTask = new FileTask(this.taskq, this.cache, this.http, key, task.url);
        this.fileTasks.set(key, fileTask);
      }
      const result = fileTask.startTask(task);
      return result;
    }
    dispose() {
      this.taskq.dispose();
      this.cache.dispose();
    }
  }
  function defaultHash(url) {
    return url;
  }
  const configQueryName = "CDNR_PROXY_CONFIG";
  function getScriptUrl(scriptUrl, config) {
    var _a;
    const serializableConfig = __spreadProps(__spreadValues({}, config), {
      patterns: (_a = config.patterns) == null ? void 0 : _a.map((re) => ({ source: re.source, flags: re.flags }))
    });
    return appendQuery(scriptUrl, { [configQueryName]: JSON.stringify(serializableConfig) });
  }
  function register(scriptUrl, config, options) {
    return __async(this, null, function* () {
      const reason = checkAbility();
      if (reason != null) {
        console.warn("Ability not OK for netr SDK:", reason);
        return;
      }
      if (config.debug)
        enableDebug();
      scriptUrl = getScriptUrl(scriptUrl, config);
      yield navigator.serviceWorker.register(scriptUrl, options);
    });
  }
  function initProxy() {
    return __async(this, null, function* () {
      const reason = checkAbility();
      if (reason != null) {
        console.warn("Ability not OK for netr SDK:", reason);
        return;
      }
      const hoWService = new HoWService();
      hoWService.run();
    });
  }
  function checkAbility() {
    var _a, _b, _c, _d;
    if (!("serviceWorker" in navigator))
      return "navigator.serviceWorker not available";
    const { engine, browser, device } = uaParser(navigator.userAgent);
    if (engine.name !== "Blink")
      return "Response() constructor does not accept ReadableByteStream as body";
    if (browser.name === "Chrome" || browser.name === "Chromium") {
      if (parseInt((_a = browser.version) != null ? _a : "0", 10) < 56)
        return "WebRTC not fully supported";
    }
    if (browser.name === "Edge") {
      if (parseInt((_b = browser.version) != null ? _b : "0", 10) < 79)
        return "WebRTC not fully supported";
    }
    if (browser.name === "Safari") {
      if (parseInt((_c = browser.version) != null ? _c : "0", 10) < 11)
        return "WebRTC not fully supported";
    }
    if (browser.name === "Firefox") {
      if (parseInt((_d = browser.version) != null ? _d : "0", 10) < 44)
        return "WebRTC not fully supported";
    }
    if (device.type === "mobile")
      return "Mobile device";
    return null;
  }
  exports.Client = Client;
  exports.initProxy = initProxy;
  exports.register = register;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({});
