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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
(function() {
  "use strict";
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
  class AbortError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "AbortError");
    }
  }
  function waitAbort(signal) {
    return new Promise((_, reject) => {
      if (signal.aborted) {
        reject(signal.reason);
      } else {
        signal.addEventListener("abort", () => {
          reject(signal.reason);
        });
      }
    });
  }
  const defaultImagePattern = /\.(jpe?g|png|gif|webp|svg|bmp|ico|tiff|avif|svga)$/;
  const defaultMediaPattern = /\.(3gp|aac|flac|mpe?g|mp3|mp4|m4a|m4v|m4p|oga|ogg|ogv|wav|webm|mov|m4s)$/;
  const defaultPatterns = {
    image: [defaultImagePattern],
    media: [defaultMediaPattern],
    other: []
  };
  function matchPatterns(urlObj, patterns) {
    urlObj.search = "";
    urlObj.hash = "";
    const urlWithoutQueryHash = urlObj.toString();
    return Object.values(patterns).some(
      (rs) => (rs != null ? rs : []).some((r) => r.test(urlWithoutQueryHash))
    );
  }
  function removeQueryHash(url) {
    const urlObj = new URL(url);
    urlObj.search = "";
    urlObj.hash = "";
    return urlObj.toString();
  }
  function getErrInfo(err) {
    if (err instanceof Error) {
      return { err_msg: err.name, err_desc: err.message };
    }
    return { err_msg: "Unknown", err_desc: err + "" };
  }
  function timeMinus(t1, t2) {
    if (t1 == null || t1 === -1 || t2 == null || t2 === -1)
      return -1;
    return (t1 - t2) / 1e3;
  }
  function parseHost(hostname, defaultPort = 80) {
    const [host, portStr] = hostname.split(":");
    const port = portStr ? parseInt(portStr, 10) : defaultPort;
    return [host, port];
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
  const scope$2 = self;
  const debug$9 = getDebug("utils/sw/clients");
  class SWClients {
    constructor(swScope = scope$2) {
      __publicField(this, "clientIds", []);
      __publicField(this, "removed", /* @__PURE__ */ new Set());
      __publicField(this, "emitter", new Emitter());
      this.swScope = swScope;
    }
    add(id) {
      if (this.clientIds.includes(id))
        return;
      if (this.removed.has(id))
        return;
      this.clientIds.push(id);
      debug$9("add", id, this.clientIds);
    }
    remove(id) {
      const i = this.clientIds.indexOf(id);
      if (i < 0)
        return;
      this.clientIds.splice(i, 1);
      this.removed.add(id);
      this.emitter.emit("remove", id);
      debug$9("remove", id, this.clientIds);
    }
    set(newIds) {
      const oldIds = this.clientIds;
      const kept = [];
      const removed = [];
      oldIds.forEach((o) => {
        const idxInNew = newIds.indexOf(o);
        if (idxInNew >= 0) {
          kept.push(o);
          newIds.splice(idxInNew, 1);
        } else {
          removed.push(o);
        }
      });
      this.clientIds = [...kept, ...newIds];
      removed.forEach((r) => {
        this.emitter.emit("remove", r);
      });
      if (removed.length > 0 || newIds.length > 0) {
        debug$9("set", this.clientIds);
      }
    }
    getAllIds() {
      return this.clientIds;
    }
    getAll() {
      return __async(this, null, function* () {
        const clients = (yield this.swScope.clients.matchAll({ type: "window" })).slice();
        clients.reverse();
        this.set(clients.map((c) => c.id));
        return this.clientIds.map((id) => clients.find((c) => c.id === id));
      });
    }
    get(id) {
      return __async(this, null, function* () {
        const client = yield this.swScope.clients.get(id);
        if (client != null)
          this.add(id);
        else
          this.remove(id);
        return client;
      });
    }
    onRemove(cb) {
      return this.emitter.on("remove", cb);
    }
    whenRemoved(id, cb) {
      if (!this.clientIds.includes(id))
        return;
      const unlisten = this.emitter.on("remove", (removedId) => {
        if (removedId !== id)
          return;
        unlisten();
        cb();
      });
    }
  }
  const swClients = new SWClients();
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
              reader.cancel("Cancelled by slice for target range met");
              ctrl.close();
              break;
            }
          }
          valueStart = valueEnd;
        }
      }),
      cancel: (reason) => reader.cancel(reason)
    });
    return newStream;
  }
  function withReadResult(source) {
    let size = 0;
    const transform = new TransformStream({
      transform: (chunk, ctrl) => {
        size += chunk.byteLength;
        ctrl.enqueue(chunk);
      }
    });
    const resultPromise = source.pipeTo(transform.writable).then(
      () => ({ size, success: true }),
      (e) => ({ size, success: false, error: e })
    );
    return [transform.readable, resultPromise];
  }
  function teeWithMain(source) {
    let minorCtrl;
    let minorCancelled = false;
    const minorStream = new ReadableStream({
      start: (ctrl) => {
        minorCtrl = ctrl;
      },
      cancel: () => {
        minorCancelled = true;
      }
    });
    const sourceReader = source.getReader();
    let mainCancelled = false;
    const mainStream = new ReadableStream({
      start: (ctrl) => __async(this, null, function* () {
        try {
          while (true) {
            const { value, done } = yield sourceReader.read();
            if (mainCancelled)
              return;
            if (done) {
              ctrl.close();
              if (!minorCancelled)
                minorCtrl.close();
              return;
            }
            ctrl.enqueue(value);
            if (!minorCancelled)
              minorCtrl.enqueue(value);
          }
        } catch (e) {
          ctrl.error(e);
          if (!minorCancelled)
            minorCtrl.error(e);
        }
      }),
      cancel: (reason) => __async(this, null, function* () {
        mainCancelled = true;
        yield sourceReader.cancel(reason);
        minorCtrl.error(reason);
      })
    });
    return { main: mainStream, minor: minorStream };
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getAugmentedNamespace(n) {
    var f = n.default;
    if (typeof f == "function") {
      var a = function() {
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else
      a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var uaParser$1 = { exports: {} };
  (function(module, exports) {
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
      var rgxMapper = function(ua2, arrays) {
        var i = 0, j, k, p, q, matches, match;
        while (i < arrays.length && !matches) {
          var regex = arrays[i], props = arrays[i + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            matches = regex[j++].exec(ua2);
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
      var UAParser = function(ua2, extensions) {
        if (typeof ua2 === OBJ_TYPE) {
          extensions = ua2;
          ua2 = undefined$1;
        }
        if (!(this instanceof UAParser)) {
          return new UAParser(ua2, extensions).getResult();
        }
        var _ua = ua2 || (typeof window2 !== UNDEF_TYPE && window2.navigator && window2.navigator.userAgent ? window2.navigator.userAgent : EMPTY);
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
        this.setUA = function(ua3) {
          _ua = typeof ua3 === STR_TYPE && ua3.length > UA_MAX_LENGTH ? trim(ua3, UA_MAX_LENGTH) : ua3;
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
          exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua2) {
          parser.setUA(ua2);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : commonjsGlobal);
  })(uaParser$1, uaParser$1.exports);
  const uaParser = uaParser$1.exports;
  const ua = uaParser(navigator.userAgent);
  function supportResponseWithStream() {
    var _a;
    const { browser } = ua;
    const browserVersion = parseInt((_a = browser.version) != null ? _a : "0", 10);
    if (browser.name === "Chrome" || browser.name === "Chromium" || browser.name === "Android Browser")
      return browserVersion >= 52;
    if (browser.name === "Edge")
      return browserVersion >= 79;
    return false;
  }
  class HttpRequest {
    constructor(url, { method, headers, signal, body: body2 }) {
      __publicField(this, "url");
      __publicField(this, "method");
      __publicField(this, "headers");
      __publicField(this, "body");
      __publicField(this, "signal");
      this.url = url;
      this.method = method != null ? method : "GET";
      this.headers = new Headers(headers);
      this.body = body2 != null ? body2 : null;
      this.signal = signal != null ? signal : new AbortController().signal;
    }
  }
  class HttpResponse {
    constructor(body2, { status, statusText, headers, underlayer }) {
      __publicField(this, "status");
      __publicField(this, "statusText");
      __publicField(this, "headers");
      __publicField(this, "body");
      __publicField(this, "bodyReadResult");
      __publicField(this, "underlayer");
      this.status = status != null ? status : 200;
      this.statusText = statusText != null ? statusText : "";
      this.headers = new Headers(headers);
      this.underlayer = underlayer;
      if (body2 == null || !supportResponseWithStream()) {
        this.body = body2;
        this.bodyReadResult = Promise.resolve({ success: true, size: 0 });
      } else {
        const [newBody, bodyReadResult] = withReadResult(body2);
        this.body = newBody;
        this.bodyReadResult = bodyReadResult;
      }
    }
  }
  function createResponseFromNative(nativeResponse) {
    const { status, statusText, headers, body: body2 } = nativeResponse;
    return new HttpResponse(body2, { status, statusText, headers, underlayer: nativeResponse });
  }
  class UnexpectedHttpStatusError extends Error {
    constructor(response) {
      super(`Unexpected HTTP status: ${response.status} ${response.statusText}`);
      __publicField(this, "name", "UnexpectedHttpStatusError");
      this.response = response;
    }
  }
  const messageEmitter = new Emitter();
  let scope$1;
  if (typeof self !== "undefined") {
    scope$1 = self;
    scope$1.addEventListener("message", (e) => messageEmitter.emit("message", e));
  }
  class WindowClientError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "WindowClientError");
    }
  }
  function httpGetContentLength(headers) {
    const contentSize = headers.get("Content-Length");
    if (!contentSize)
      return null;
    return parseInt(contentSize, 10);
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
    return { totalSize, start, end };
  }
  function stringifyContentRange(v) {
    const range = v.start != null && v.end != null ? `${v.start}-${v.end}` : "*";
    const size = v.totalSize == null ? "*" : v.totalSize + "";
    return `bytes ${range}/${size}`;
  }
  function atoi(v) {
    return !v ? null : Number(v);
  }
  function httpGetRange(headers) {
    const range = headers.get("Range");
    if (range == null)
      return null;
    return parseRange(range);
  }
  function parseRange(v) {
    const normalized = v.trim().toLowerCase();
    if (!normalized.startsWith("bytes=")) {
      throw new Error(`Unit must be bytes: ${v}`);
    }
    if (normalized.includes(",")) {
      throw new Error(`Multiple range: ${v}`);
    }
    const [, startStr, endStr] = /(\d*)-(\d*)/.exec(normalized) || [];
    if (!startStr && !endStr) {
      throw new Error(`Invalid range values: ${v}`);
    }
    if (!startStr) {
      throw new Error("Suffix range not supported");
    }
    const [start, end] = [startStr, endStr].map((v2) => atoi(v2));
    return { start, end };
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
    return non_ios_8859_1Code.test(value) ? "REPLACED_BY_Miku_SEE_Miku_utils_http_encodeHeaderValue" : value;
  }
  function getFileSize(response) {
    var _a;
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
    return fileSize;
  }
  const icePwd = "pR0mHGTJGIoVehu/AQCGTNeY";
  const defaultWebRTCPort = 8443;
  const useTcp = true;
  const debug$8 = getDebug("http/webrtc/how");
  class HoW {
    constructor(pcConnectTimeout = 10 * 1e3, dcOpenTimeout = 3 * 1e3) {
      __publicField(this, "pcMap", /* @__PURE__ */ new Map());
      this.pcConnectTimeout = pcConnectTimeout;
      this.dcOpenTimeout = dcOpenTimeout;
    }
    makePc(signal, target, fingerprint) {
      return __async(this, null, function* () {
        if (signal.aborted)
          throw signal.reason;
        const pc = new RTCPeerConnection();
        const channel = pc.createDataChannel("test");
        const offer = yield pc.createOffer();
        channel.close();
        if (offer.sdp == null)
          throw new Error("TODO: empty sdp");
        offer.sdp = offer.sdp.replace(/a=ice-pwd:.+/, `a=ice-pwd:${icePwd}`);
        pc.setLocalDescription(offer);
        const [targetIP, targetPort] = parseHost(target, 0);
        const webrtcPort = targetPort + defaultWebRTCPort;
        const answer = {
          type: "answer",
          sdp: makeAnswerSdp(targetIP, webrtcPort, fingerprint, useTcp)
        };
        pc.setRemoteDescription(answer);
        yield Promise.race([
          waitPCConnected(signal, pc, target),
          waitTimeout(this.pcConnectTimeout, "PeerConnection connect")
        ]).catch((e) => {
          pc.close();
          throw e;
        });
        return pc;
      });
    }
    getPc(signal, target, fingerprint) {
      return __async(this, null, function* () {
        if (this.pcMap.has(target)) {
          const pc = yield this.pcMap.get(target);
          if (pc.connectionState === "connected")
            return pc;
        }
        const promisedPc = this.makePc(signal, target, fingerprint);
        this.pcMap.set(target, promisedPc);
        promisedPc.catch((e) => {
          this.pcMap.delete(target);
        });
        return promisedPc;
      });
    }
    fetch(ctx, id, request, fingerprint) {
      return __async(this, null, function* () {
        debug$8("fetch", request.url, "with id", id);
        const target = new URL(request.url).host;
        const pc = yield this.getPc(request.signal, target, fingerprint);
        ctx.set("hoWPeerConnectionConnectAt", Date.now());
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
  function streamForDC(id, dc, signal) {
    const disposers = [
      () => {
        if (dc.readyState !== "closing" && dc.readyState !== "closed") {
          debug$8(`close DataChannel ${id} for finish`);
          dc.close();
        }
      }
    ];
    let finished = false;
    const finish = (cb) => {
      if (finished)
        return;
      finished = true;
      disposers.forEach((d) => d());
      disposers.length = 0;
      cb == null ? void 0 : cb();
    };
    return new ReadableStream({
      start: (ctrl) => {
        waitAbort(signal).catch((e) => {
          finish(() => ctrl.error(e));
        });
        disposers.push(listenDC(dc, "message", ({ data }) => {
          ctrl.enqueue(data);
        }));
        disposers.push(listenDC(dc, "error", (e) => {
          debug$8(`dc ${id} error`, e);
          finish(() => ctrl.error(e));
        }));
        disposers.push(listenDC(dc, "closing", (e) => {
          debug$8(`DataChannel ${id} closing`, e);
          finish(() => ctrl.close());
        }));
      },
      cancel: (reason) => {
        finish();
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
      this.stream = streamForDC(this.id, this.dc, request.signal);
    }
    open() {
      return __async(this, null, function* () {
        if (this.dc.readyState === "open")
          return;
        const disposers = [];
        const dispose = () => disposers.forEach((d) => d());
        const opened = new Promise((resolve, reject) => {
          disposers.push(listenDC(this.dc, "open", () => {
            debug$8(`DataChannel ${this.id} opened`);
            resolve();
          }));
          disposers.push(listenDC(this.dc, "error", () => {
            debug$8(`DataChannel ${this.id} error`);
            reject(new Error("DataChannel error"));
          }));
        });
        return Promise.race([
          opened,
          waitTimeout(this.dcOpenTimeout, `DataChannel ${this.id} open`),
          waitAbort(this.request.signal)
        ]).finally(dispose);
      });
    }
    sendRequest() {
      return __async(this, null, function* () {
        var _a;
        const request = this.request;
        if (!["GET", "HEAD"].includes(request.method))
          throw new Error(`TODO: Request with method ${request.method} is not supported`);
        const contentLength = parseInt((_a = request.headers.get("Content-Length")) != null ? _a : "0", 10);
        if (contentLength > 0)
          throw new Error("TODO: Request with body is not supported");
        const requestHead = stringifyRequestHead(request);
        debug$8(`DataChannel ${this.id} sendRequest:`, requestHead);
        this.dc.send(requestHead);
      });
    }
    receiveResponse() {
      return __async(this, null, function* () {
        var _a;
        debug$8(`DataChannel ${this.id} receiveResponse with state: ${this.dc.readyState}`);
        const request = this.request;
        const dcReader = this.stream.getReader();
        const { value, done } = yield dcReader.read();
        if (done)
          throw new UnexpectedDataChannelCloseError(`Unexpected DataChannel close, resp head expected. id: ${this.id}, url: ${this.request.url}`);
        if (typeof value !== "string")
          throw new UnexpectedDataChannel1stMessageError(`Expected first message type to be string, while got ${typeof value}`);
        const respHead = parseResponseHead(value);
        debug$8(`DataChannel ${this.id} get respHead:`, respHead);
        const status = respHead.status;
        const headers = new Headers(mapObj((_a = respHead.header) != null ? _a : {}, (hs) => encodeHeaderValue(hs[0])));
        const respInit = { status, statusText: respHead.reason, headers };
        const [hasBody, bodyLength] = getRespBodyLength(request.method, status, request.headers, headers);
        this.ctx.set("hoWStartTransferAt", Date.now());
        if (!hasBody) {
          const resp2 = new HttpResponse(null, respInit);
          debug$8("DataChannel receiveResponse done with no body");
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
            debug$8("DataChannel bodyStream cancel:", reason);
            dcReader.cancel(reason);
          }
        });
        const resp = new HttpResponse(bodyStream, respInit);
        return resp;
      });
    }
    start() {
      return __async(this, null, function* () {
        yield this.open();
        this.ctx.set("hoWDataChannelOpenAt", Date.now());
        const [, resp] = yield Promise.all([
          this.sendRequest(),
          this.receiveResponse()
        ]);
        return resp;
      });
    }
  }
  class UnexpectedDataChannelCloseError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "UnexpectedDataChannelCloseError");
    }
  }
  class UnexpectedDataChannel1stMessageError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "UnexpectedDataChannel1stMessageError");
    }
  }
  class PeerConnectionDisconnectedError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "PeerConnectionDisconnectedError");
    }
  }
  function waitPCConnected(signal, pc, desc) {
    return new Promise((resolve, reject) => {
      if (pc.connectionState === "connected") {
        resolve();
        return;
      }
      const unlisten = listenPC(pc, "connectionstatechange", () => {
        debug$8(`RTCPeerConnection ${desc} connectionstatechange`, pc.connectionState);
        if (["failed", "closed", "disconnected"].includes(pc.connectionState)) {
          reject(new PeerConnectionDisconnectedError(`${desc} ${pc.connectionState}`));
          unlisten();
          return;
        }
        if (pc.connectionState === "connected") {
          resolve();
          unlisten();
          return;
        }
      });
      waitAbort(signal).catch((e) => {
        reject(e);
        unlisten();
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
  var cryptoJs = { exports: {} };
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var core = { exports: {} };
  const __viteBrowserExternal = {};
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  var hasRequiredCore;
  function requireCore() {
    if (hasRequiredCore)
      return core.exports;
    hasRequiredCore = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory();
        }
      })(commonjsGlobal, function() {
        var CryptoJS = CryptoJS || function(Math2, undefined$1) {
          var crypto2;
          if (typeof window !== "undefined" && window.crypto) {
            crypto2 = window.crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            crypto2 = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto2 = globalThis.crypto;
          }
          if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
            crypto2 = window.msCrypto;
          }
          if (!crypto2 && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
            crypto2 = commonjsGlobal.crypto;
          }
          if (!crypto2 && typeof commonjsRequire === "function") {
            try {
              crypto2 = require$$0;
            } catch (err) {
            }
          }
          var cryptoSecureRandomInt = function() {
            if (crypto2) {
              if (typeof crypto2.getRandomValues === "function") {
                try {
                  return crypto2.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {
                }
              }
              if (typeof crypto2.randomBytes === "function") {
                try {
                  return crypto2.randomBytes(4).readInt32LE();
                } catch (err) {
                }
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || function() {
            function F() {
            }
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C2 = {};
          var C_lib = C2.lib = {};
          var Base = C_lib.Base = function() {
            return {
              extend: function(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              init: function() {
              },
              mixIn: function(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$1) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                  var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
              } else {
                for (var j = 0; j < thatSigBytes; j += 4) {
                  thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math2.ceil(sigBytes / 4);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            random: function(nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C2.enc = {};
          var Hex = C_enc.Hex = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            _append: function(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math2.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            finalize: function(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C2.algo = {};
          return C2;
        }(Math);
        return CryptoJS;
      });
    })(core);
    return core.exports;
  }
  var x64Core = { exports: {} };
  var hasRequiredX64Core;
  function requireX64Core() {
    if (hasRequiredX64Core)
      return x64Core.exports;
    hasRequiredX64Core = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(undefined$1) {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var Base = C_lib.Base;
          var X32WordArray = C_lib.WordArray;
          var C_x64 = C2.x64 = {};
          C_x64.Word = Base.extend({
            init: function(high, low) {
              this.high = high;
              this.low = low;
            }
          });
          C_x64.WordArray = Base.extend({
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$1) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 8;
              }
            },
            toX32: function() {
              var x64Words = this.words;
              var x64WordsLength = x64Words.length;
              var x32Words = [];
              for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
              }
              return X32WordArray.create(x32Words, this.sigBytes);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              var words = clone.words = this.words.slice(0);
              var wordsLength = words.length;
              for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
              }
              return clone;
            }
          });
        })();
        return CryptoJS;
      });
    })(x64Core);
    return x64Core.exports;
  }
  var libTypedarrays = { exports: {} };
  var hasRequiredLibTypedarrays;
  function requireLibTypedarrays() {
    if (hasRequiredLibTypedarrays)
      return libTypedarrays.exports;
    hasRequiredLibTypedarrays = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          if (typeof ArrayBuffer != "function") {
            return;
          }
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var superInit = WordArray.init;
          var subInit = WordArray.init = function(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
              typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
              typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
              var typedArrayByteLength = typedArray.byteLength;
              var words = [];
              for (var i = 0; i < typedArrayByteLength; i++) {
                words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
              }
              superInit.call(this, words, typedArrayByteLength);
            } else {
              superInit.apply(this, arguments);
            }
          };
          subInit.prototype = WordArray;
        })();
        return CryptoJS.lib.WordArray;
      });
    })(libTypedarrays);
    return libTypedarrays.exports;
  }
  var encUtf16 = { exports: {} };
  var hasRequiredEncUtf16;
  function requireEncUtf16() {
    if (hasRequiredEncUtf16)
      return encUtf16.exports;
    hasRequiredEncUtf16 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C2.enc;
          C_enc.Utf16 = C_enc.Utf16BE = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          C_enc.Utf16LE = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
          }
        })();
        return CryptoJS.enc.Utf16;
      });
    })(encUtf16);
    return encUtf16.exports;
  }
  var encBase64 = { exports: {} };
  var hasRequiredEncBase64;
  function requireEncBase64() {
    if (hasRequiredEncBase64)
      return encBase64.exports;
    hasRequiredEncBase64 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C2.enc;
          C_enc.Base64 = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            parse: function(base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS.enc.Base64;
      });
    })(encBase64);
    return encBase64.exports;
  }
  var encBase64url = { exports: {} };
  var hasRequiredEncBase64url;
  function requireEncBase64url() {
    if (hasRequiredEncBase64url)
      return encBase64url.exports;
    hasRequiredEncBase64url = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C2.enc;
          C_enc.Base64url = {
            stringify: function(wordArray, urlSafe = true) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = urlSafe ? this._safe_map : this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            parse: function(base64Str, urlSafe = true) {
              var base64StrLength = base64Str.length;
              var map = urlSafe ? this._safe_map : this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS.enc.Base64url;
      });
    })(encBase64url);
    return encBase64url.exports;
  }
  var md5 = { exports: {} };
  var hasRequiredMd5;
  function requireMd5() {
    if (hasRequiredMd5)
      return md5.exports;
    hasRequiredMd5 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(Math2) {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C2.algo;
          var T = [];
          (function() {
            for (var i = 0; i < 64; i++) {
              T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
            }
          })();
          var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878
              ]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var M_offset_0 = M[offset + 0];
              var M_offset_1 = M[offset + 1];
              var M_offset_2 = M[offset + 2];
              var M_offset_3 = M[offset + 3];
              var M_offset_4 = M[offset + 4];
              var M_offset_5 = M[offset + 5];
              var M_offset_6 = M[offset + 6];
              var M_offset_7 = M[offset + 7];
              var M_offset_8 = M[offset + 8];
              var M_offset_9 = M[offset + 9];
              var M_offset_10 = M[offset + 10];
              var M_offset_11 = M[offset + 11];
              var M_offset_12 = M[offset + 12];
              var M_offset_13 = M[offset + 13];
              var M_offset_14 = M[offset + 14];
              var M_offset_15 = M[offset + 15];
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              a = FF(a, b, c, d, M_offset_0, 7, T[0]);
              d = FF(d, a, b, c, M_offset_1, 12, T[1]);
              c = FF(c, d, a, b, M_offset_2, 17, T[2]);
              b = FF(b, c, d, a, M_offset_3, 22, T[3]);
              a = FF(a, b, c, d, M_offset_4, 7, T[4]);
              d = FF(d, a, b, c, M_offset_5, 12, T[5]);
              c = FF(c, d, a, b, M_offset_6, 17, T[6]);
              b = FF(b, c, d, a, M_offset_7, 22, T[7]);
              a = FF(a, b, c, d, M_offset_8, 7, T[8]);
              d = FF(d, a, b, c, M_offset_9, 12, T[9]);
              c = FF(c, d, a, b, M_offset_10, 17, T[10]);
              b = FF(b, c, d, a, M_offset_11, 22, T[11]);
              a = FF(a, b, c, d, M_offset_12, 7, T[12]);
              d = FF(d, a, b, c, M_offset_13, 12, T[13]);
              c = FF(c, d, a, b, M_offset_14, 17, T[14]);
              b = FF(b, c, d, a, M_offset_15, 22, T[15]);
              a = GG(a, b, c, d, M_offset_1, 5, T[16]);
              d = GG(d, a, b, c, M_offset_6, 9, T[17]);
              c = GG(c, d, a, b, M_offset_11, 14, T[18]);
              b = GG(b, c, d, a, M_offset_0, 20, T[19]);
              a = GG(a, b, c, d, M_offset_5, 5, T[20]);
              d = GG(d, a, b, c, M_offset_10, 9, T[21]);
              c = GG(c, d, a, b, M_offset_15, 14, T[22]);
              b = GG(b, c, d, a, M_offset_4, 20, T[23]);
              a = GG(a, b, c, d, M_offset_9, 5, T[24]);
              d = GG(d, a, b, c, M_offset_14, 9, T[25]);
              c = GG(c, d, a, b, M_offset_3, 14, T[26]);
              b = GG(b, c, d, a, M_offset_8, 20, T[27]);
              a = GG(a, b, c, d, M_offset_13, 5, T[28]);
              d = GG(d, a, b, c, M_offset_2, 9, T[29]);
              c = GG(c, d, a, b, M_offset_7, 14, T[30]);
              b = GG(b, c, d, a, M_offset_12, 20, T[31]);
              a = HH(a, b, c, d, M_offset_5, 4, T[32]);
              d = HH(d, a, b, c, M_offset_8, 11, T[33]);
              c = HH(c, d, a, b, M_offset_11, 16, T[34]);
              b = HH(b, c, d, a, M_offset_14, 23, T[35]);
              a = HH(a, b, c, d, M_offset_1, 4, T[36]);
              d = HH(d, a, b, c, M_offset_4, 11, T[37]);
              c = HH(c, d, a, b, M_offset_7, 16, T[38]);
              b = HH(b, c, d, a, M_offset_10, 23, T[39]);
              a = HH(a, b, c, d, M_offset_13, 4, T[40]);
              d = HH(d, a, b, c, M_offset_0, 11, T[41]);
              c = HH(c, d, a, b, M_offset_3, 16, T[42]);
              b = HH(b, c, d, a, M_offset_6, 23, T[43]);
              a = HH(a, b, c, d, M_offset_9, 4, T[44]);
              d = HH(d, a, b, c, M_offset_12, 11, T[45]);
              c = HH(c, d, a, b, M_offset_15, 16, T[46]);
              b = HH(b, c, d, a, M_offset_2, 23, T[47]);
              a = II(a, b, c, d, M_offset_0, 6, T[48]);
              d = II(d, a, b, c, M_offset_7, 10, T[49]);
              c = II(c, d, a, b, M_offset_14, 15, T[50]);
              b = II(b, c, d, a, M_offset_5, 21, T[51]);
              a = II(a, b, c, d, M_offset_12, 6, T[52]);
              d = II(d, a, b, c, M_offset_3, 10, T[53]);
              c = II(c, d, a, b, M_offset_10, 15, T[54]);
              b = II(b, c, d, a, M_offset_1, 21, T[55]);
              a = II(a, b, c, d, M_offset_8, 6, T[56]);
              d = II(d, a, b, c, M_offset_15, 10, T[57]);
              c = II(c, d, a, b, M_offset_6, 15, T[58]);
              b = II(b, c, d, a, M_offset_13, 21, T[59]);
              a = II(a, b, c, d, M_offset_4, 6, T[60]);
              d = II(d, a, b, c, M_offset_11, 10, T[61]);
              c = II(c, d, a, b, M_offset_2, 15, T[62]);
              b = II(b, c, d, a, M_offset_9, 21, T[63]);
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
              var nBitsTotalL = nBitsTotal;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function FF(a, b, c, d, x, s, t) {
            var n = a + (b & c | ~b & d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function GG(a, b, c, d, x, s, t) {
            var n = a + (b & d | c & ~d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          C2.MD5 = Hasher._createHelper(MD5);
          C2.HmacMD5 = Hasher._createHmacHelper(MD5);
        })(Math);
        return CryptoJS.MD5;
      });
    })(md5);
    return md5.exports;
  }
  var sha1 = { exports: {} };
  var hasRequiredSha1;
  function requireSha1() {
    if (hasRequiredSha1)
      return sha1.exports;
    hasRequiredSha1 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C2.algo;
          var W = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              var e = H[4];
              for (var i = 0; i < 80; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                  W[i] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i];
                if (i < 20) {
                  t += (b & c | ~b & d) + 1518500249;
                } else if (i < 40) {
                  t += (b ^ c ^ d) + 1859775393;
                } else if (i < 60) {
                  t += (b & c | b & d | c & d) - 1894007588;
                } else {
                  t += (b ^ c ^ d) - 899497514;
                }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
              }
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
              H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C2.SHA1 = Hasher._createHelper(SHA1);
          C2.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS.SHA1;
      });
    })(sha1);
    return sha1.exports;
  }
  var sha256 = { exports: {} };
  var hasRequiredSha256;
  function requireSha256() {
    if (hasRequiredSha256)
      return sha256.exports;
    hasRequiredSha256 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(Math2) {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C2.algo;
          var H = [];
          var K = [];
          (function() {
            function isPrime(n2) {
              var sqrtN = Math2.sqrt(n2);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n2 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n2) {
              return (n2 - (n2 | 0)) * 4294967296 | 0;
            }
            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n)) {
                if (nPrime < 8) {
                  H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
                nPrime++;
              }
              n++;
            }
          })();
          var W = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
              var H2 = this._hash.words;
              var a = H2[0];
              var b = H2[1];
              var c = H2[2];
              var d = H2[3];
              var e = H2[4];
              var f = H2[5];
              var g = H2[6];
              var h = H2[7];
              for (var i = 0; i < 64; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W[i - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = e & f ^ ~e & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              H2[0] = H2[0] + a | 0;
              H2[1] = H2[1] + b | 0;
              H2[2] = H2[2] + c | 0;
              H2[3] = H2[3] + d | 0;
              H2[4] = H2[4] + e | 0;
              H2[5] = H2[5] + f | 0;
              H2[6] = H2[6] + g | 0;
              H2[7] = H2[7] + h | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C2.SHA256 = Hasher._createHelper(SHA256);
          C2.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS.SHA256;
      });
    })(sha256);
    return sha256.exports;
  }
  var sha224 = { exports: {} };
  var hasRequiredSha224;
  function requireSha224() {
    if (hasRequiredSha224)
      return sha224.exports;
    hasRequiredSha224 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha256());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var C_algo = C2.algo;
          var SHA256 = C_algo.SHA256;
          var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                3238371032,
                914150663,
                812702999,
                4144912697,
                4290775857,
                1750603025,
                1694076839,
                3204075428
              ]);
            },
            _doFinalize: function() {
              var hash = SHA256._doFinalize.call(this);
              hash.sigBytes -= 4;
              return hash;
            }
          });
          C2.SHA224 = SHA256._createHelper(SHA224);
          C2.HmacSHA224 = SHA256._createHmacHelper(SHA224);
        })();
        return CryptoJS.SHA224;
      });
    })(sha224);
    return sha224.exports;
  }
  var sha512 = { exports: {} };
  var hasRequiredSha512;
  function requireSha512() {
    if (hasRequiredSha512)
      return sha512.exports;
    hasRequiredSha512 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var Hasher = C_lib.Hasher;
          var C_x64 = C2.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C2.algo;
          function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
          }
          var K = [
            X64Word_create(1116352408, 3609767458),
            X64Word_create(1899447441, 602891725),
            X64Word_create(3049323471, 3964484399),
            X64Word_create(3921009573, 2173295548),
            X64Word_create(961987163, 4081628472),
            X64Word_create(1508970993, 3053834265),
            X64Word_create(2453635748, 2937671579),
            X64Word_create(2870763221, 3664609560),
            X64Word_create(3624381080, 2734883394),
            X64Word_create(310598401, 1164996542),
            X64Word_create(607225278, 1323610764),
            X64Word_create(1426881987, 3590304994),
            X64Word_create(1925078388, 4068182383),
            X64Word_create(2162078206, 991336113),
            X64Word_create(2614888103, 633803317),
            X64Word_create(3248222580, 3479774868),
            X64Word_create(3835390401, 2666613458),
            X64Word_create(4022224774, 944711139),
            X64Word_create(264347078, 2341262773),
            X64Word_create(604807628, 2007800933),
            X64Word_create(770255983, 1495990901),
            X64Word_create(1249150122, 1856431235),
            X64Word_create(1555081692, 3175218132),
            X64Word_create(1996064986, 2198950837),
            X64Word_create(2554220882, 3999719339),
            X64Word_create(2821834349, 766784016),
            X64Word_create(2952996808, 2566594879),
            X64Word_create(3210313671, 3203337956),
            X64Word_create(3336571891, 1034457026),
            X64Word_create(3584528711, 2466948901),
            X64Word_create(113926993, 3758326383),
            X64Word_create(338241895, 168717936),
            X64Word_create(666307205, 1188179964),
            X64Word_create(773529912, 1546045734),
            X64Word_create(1294757372, 1522805485),
            X64Word_create(1396182291, 2643833823),
            X64Word_create(1695183700, 2343527390),
            X64Word_create(1986661051, 1014477480),
            X64Word_create(2177026350, 1206759142),
            X64Word_create(2456956037, 344077627),
            X64Word_create(2730485921, 1290863460),
            X64Word_create(2820302411, 3158454273),
            X64Word_create(3259730800, 3505952657),
            X64Word_create(3345764771, 106217008),
            X64Word_create(3516065817, 3606008344),
            X64Word_create(3600352804, 1432725776),
            X64Word_create(4094571909, 1467031594),
            X64Word_create(275423344, 851169720),
            X64Word_create(430227734, 3100823752),
            X64Word_create(506948616, 1363258195),
            X64Word_create(659060556, 3750685593),
            X64Word_create(883997877, 3785050280),
            X64Word_create(958139571, 3318307427),
            X64Word_create(1322822218, 3812723403),
            X64Word_create(1537002063, 2003034995),
            X64Word_create(1747873779, 3602036899),
            X64Word_create(1955562222, 1575990012),
            X64Word_create(2024104815, 1125592928),
            X64Word_create(2227730452, 2716904306),
            X64Word_create(2361852424, 442776044),
            X64Word_create(2428436474, 593698344),
            X64Word_create(2756734187, 3733110249),
            X64Word_create(3204031479, 2999351573),
            X64Word_create(3329325298, 3815920427),
            X64Word_create(3391569614, 3928383900),
            X64Word_create(3515267271, 566280711),
            X64Word_create(3940187606, 3454069534),
            X64Word_create(4118630271, 4000239992),
            X64Word_create(116418474, 1914138554),
            X64Word_create(174292421, 2731055270),
            X64Word_create(289380356, 3203993006),
            X64Word_create(460393269, 320620315),
            X64Word_create(685471733, 587496836),
            X64Word_create(852142971, 1086792851),
            X64Word_create(1017036298, 365543100),
            X64Word_create(1126000580, 2618297676),
            X64Word_create(1288033470, 3409855158),
            X64Word_create(1501505948, 4234509866),
            X64Word_create(1607167915, 987167468),
            X64Word_create(1816402316, 1246189591)
          ];
          var W = [];
          (function() {
            for (var i = 0; i < 80; i++) {
              W[i] = X64Word_create();
            }
          })();
          var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(1779033703, 4089235720),
                new X64Word.init(3144134277, 2227873595),
                new X64Word.init(1013904242, 4271175723),
                new X64Word.init(2773480762, 1595750129),
                new X64Word.init(1359893119, 2917565137),
                new X64Word.init(2600822924, 725511199),
                new X64Word.init(528734635, 4215389547),
                new X64Word.init(1541459225, 327033209)
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var H0 = H[0];
              var H1 = H[1];
              var H2 = H[2];
              var H3 = H[3];
              var H4 = H[4];
              var H5 = H[5];
              var H6 = H[6];
              var H7 = H[7];
              var H0h = H0.high;
              var H0l = H0.low;
              var H1h = H1.high;
              var H1l = H1.low;
              var H2h = H2.high;
              var H2l = H2.low;
              var H3h = H3.high;
              var H3l = H3.low;
              var H4h = H4.high;
              var H4l = H4.low;
              var H5h = H5.high;
              var H5l = H5.low;
              var H6h = H6.high;
              var H6l = H6.low;
              var H7h = H7.high;
              var H7l = H7.low;
              var ah = H0h;
              var al = H0l;
              var bh = H1h;
              var bl = H1l;
              var ch = H2h;
              var cl = H2l;
              var dh = H3h;
              var dl = H3l;
              var eh = H4h;
              var el = H4l;
              var fh = H5h;
              var fl = H5l;
              var gh = H6h;
              var gl = H6l;
              var hh = H7h;
              var hl = H7l;
              for (var i = 0; i < 80; i++) {
                var Wil;
                var Wih;
                var Wi = W[i];
                if (i < 16) {
                  Wih = Wi.high = M[offset + i * 2] | 0;
                  Wil = Wi.low = M[offset + i * 2 + 1] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0xh = gamma0x.high;
                  var gamma0xl = gamma0x.low;
                  var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                  var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                  var gamma1x = W[i - 2];
                  var gamma1xh = gamma1x.high;
                  var gamma1xl = gamma1x.low;
                  var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                  var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                  var Wi7 = W[i - 7];
                  var Wi7h = Wi7.high;
                  var Wi7l = Wi7.low;
                  var Wi16 = W[i - 16];
                  var Wi16h = Wi16.high;
                  var Wi16l = Wi16.low;
                  Wil = gamma0l + Wi7l;
                  Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                  Wil = Wil + gamma1l;
                  Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                  Wil = Wil + Wi16l;
                  Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                  Wi.high = Wih;
                  Wi.low = Wil;
                }
                var chh = eh & fh ^ ~eh & gh;
                var chl = el & fl ^ ~el & gl;
                var majh = ah & bh ^ ah & ch ^ bh & ch;
                var majl = al & bl ^ al & cl ^ bl & cl;
                var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                var Ki = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = dl + t1l | 0;
                eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = t1l + t2l | 0;
                ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
              }
              H0l = H0.low = H0l + al;
              H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
              H1l = H1.low = H1l + bl;
              H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
              H2l = H2.low = H2l + cl;
              H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
              H3l = H3.low = H3l + dl;
              H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
              H4l = H4.low = H4l + el;
              H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
              H5l = H5.low = H5l + fl;
              H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
              H6l = H6.low = H6l + gl;
              H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
              H7l = H7.low = H7l + hl;
              H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var hash = this._hash.toX32();
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            },
            blockSize: 1024 / 32
          });
          C2.SHA512 = Hasher._createHelper(SHA512);
          C2.HmacSHA512 = Hasher._createHmacHelper(SHA512);
        })();
        return CryptoJS.SHA512;
      });
    })(sha512);
    return sha512.exports;
  }
  var sha384 = { exports: {} };
  var hasRequiredSha384;
  function requireSha384() {
    if (hasRequiredSha384)
      return sha384.exports;
    hasRequiredSha384 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core(), requireSha512());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_x64 = C2.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C2.algo;
          var SHA512 = C_algo.SHA512;
          var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(3418070365, 3238371032),
                new X64Word.init(1654270250, 914150663),
                new X64Word.init(2438529370, 812702999),
                new X64Word.init(355462360, 4144912697),
                new X64Word.init(1731405415, 4290775857),
                new X64Word.init(2394180231, 1750603025),
                new X64Word.init(3675008525, 1694076839),
                new X64Word.init(1203062813, 3204075428)
              ]);
            },
            _doFinalize: function() {
              var hash = SHA512._doFinalize.call(this);
              hash.sigBytes -= 16;
              return hash;
            }
          });
          C2.SHA384 = SHA512._createHelper(SHA384);
          C2.HmacSHA384 = SHA512._createHmacHelper(SHA384);
        })();
        return CryptoJS.SHA384;
      });
    })(sha384);
    return sha384.exports;
  }
  var sha3 = { exports: {} };
  var hasRequiredSha3;
  function requireSha3() {
    if (hasRequiredSha3)
      return sha3.exports;
    hasRequiredSha3 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(Math2) {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_x64 = C2.x64;
          var X64Word = C_x64.Word;
          var C_algo = C2.algo;
          var RHO_OFFSETS = [];
          var PI_INDEXES = [];
          var ROUND_CONSTANTS = [];
          (function() {
            var x = 1, y = 0;
            for (var t = 0; t < 24; t++) {
              RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
              var newX = y % 5;
              var newY = (2 * x + 3 * y) % 5;
              x = newX;
              y = newY;
            }
            for (var x = 0; x < 5; x++) {
              for (var y = 0; y < 5; y++) {
                PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
              }
            }
            var LFSR = 1;
            for (var i = 0; i < 24; i++) {
              var roundConstantMsw = 0;
              var roundConstantLsw = 0;
              for (var j = 0; j < 7; j++) {
                if (LFSR & 1) {
                  var bitPosition = (1 << j) - 1;
                  if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                  } else {
                    roundConstantMsw ^= 1 << bitPosition - 32;
                  }
                }
                if (LFSR & 128) {
                  LFSR = LFSR << 1 ^ 113;
                } else {
                  LFSR <<= 1;
                }
              }
              ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
          })();
          var T = [];
          (function() {
            for (var i = 0; i < 25; i++) {
              T[i] = X64Word.create();
            }
          })();
          var SHA3 = C_algo.SHA3 = Hasher.extend({
            cfg: Hasher.cfg.extend({
              outputLength: 512
            }),
            _doReset: function() {
              var state = this._state = [];
              for (var i = 0; i < 25; i++) {
                state[i] = new X64Word.init();
              }
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M, offset) {
              var state = this._state;
              var nBlockSizeLanes = this.blockSize / 2;
              for (var i = 0; i < nBlockSizeLanes; i++) {
                var M2i = M[offset + 2 * i];
                var M2i1 = M[offset + 2 * i + 1];
                M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
                M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
                var lane = state[i];
                lane.high ^= M2i1;
                lane.low ^= M2i;
              }
              for (var round = 0; round < 24; round++) {
                for (var x = 0; x < 5; x++) {
                  var tMsw = 0, tLsw = 0;
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    tMsw ^= lane.high;
                    tLsw ^= lane.low;
                  }
                  var Tx = T[x];
                  Tx.high = tMsw;
                  Tx.low = tLsw;
                }
                for (var x = 0; x < 5; x++) {
                  var Tx4 = T[(x + 4) % 5];
                  var Tx1 = T[(x + 1) % 5];
                  var Tx1Msw = Tx1.high;
                  var Tx1Lsw = Tx1.low;
                  var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                  var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    lane.high ^= tMsw;
                    lane.low ^= tLsw;
                  }
                }
                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                  var tMsw;
                  var tLsw;
                  var lane = state[laneIndex];
                  var laneMsw = lane.high;
                  var laneLsw = lane.low;
                  var rhoOffset = RHO_OFFSETS[laneIndex];
                  if (rhoOffset < 32) {
                    tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                    tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                  } else {
                    tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                    tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                  }
                  var TPiLane = T[PI_INDEXES[laneIndex]];
                  TPiLane.high = tMsw;
                  TPiLane.low = tLsw;
                }
                var T0 = T[0];
                var state0 = state[0];
                T0.high = state0.high;
                T0.low = state0.low;
                for (var x = 0; x < 5; x++) {
                  for (var y = 0; y < 5; y++) {
                    var laneIndex = x + 5 * y;
                    var lane = state[laneIndex];
                    var TLane = T[laneIndex];
                    var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                    var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                    lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                    lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                  }
                }
                var lane = state[0];
                var roundConstant = ROUND_CONSTANTS[round];
                lane.high ^= roundConstant.high;
                lane.low ^= roundConstant.low;
              }
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              var blockSizeBits = this.blockSize * 32;
              dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
              dataWords[(Math2.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var state = this._state;
              var outputLengthBytes = this.cfg.outputLength / 8;
              var outputLengthLanes = outputLengthBytes / 8;
              var hashWords = [];
              for (var i = 0; i < outputLengthLanes; i++) {
                var lane = state[i];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
                laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
                hashWords.push(laneLsw);
                hashWords.push(laneMsw);
              }
              return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              var state = clone._state = this._state.slice(0);
              for (var i = 0; i < 25; i++) {
                state[i] = state[i].clone();
              }
              return clone;
            }
          });
          C2.SHA3 = Hasher._createHelper(SHA3);
          C2.HmacSHA3 = Hasher._createHmacHelper(SHA3);
        })(Math);
        return CryptoJS.SHA3;
      });
    })(sha3);
    return sha3.exports;
  }
  var ripemd160 = { exports: {} };
  var hasRequiredRipemd160;
  function requireRipemd160() {
    if (hasRequiredRipemd160)
      return ripemd160.exports;
    hasRequiredRipemd160 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        /** @preserve
          			(c) 2012 by Cédric Mesnil. All rights reserved.
        
          			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
        
          			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
          			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
        
          			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
          			*/
        (function(Math2) {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C2.algo;
          var _zl = WordArray.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
          ]);
          var _zr = WordArray.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
          ]);
          var _sl = WordArray.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
          ]);
          var _sr = WordArray.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
          ]);
          var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
              this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var hl = _hl.words;
              var hr = _hr.words;
              var zl = _zl.words;
              var zr = _zr.words;
              var sl = _sl.words;
              var sr = _sr.words;
              var al, bl, cl, dl, el;
              var ar, br, cr, dr, er;
              ar = al = H[0];
              br = bl = H[1];
              cr = cl = H[2];
              dr = dl = H[3];
              er = el = H[4];
              var t;
              for (var i = 0; i < 80; i += 1) {
                t = al + M[offset + zl[i]] | 0;
                if (i < 16) {
                  t += f1(bl, cl, dl) + hl[0];
                } else if (i < 32) {
                  t += f2(bl, cl, dl) + hl[1];
                } else if (i < 48) {
                  t += f3(bl, cl, dl) + hl[2];
                } else if (i < 64) {
                  t += f4(bl, cl, dl) + hl[3];
                } else {
                  t += f5(bl, cl, dl) + hl[4];
                }
                t = t | 0;
                t = rotl2(t, sl[i]);
                t = t + el | 0;
                al = el;
                el = dl;
                dl = rotl2(cl, 10);
                cl = bl;
                bl = t;
                t = ar + M[offset + zr[i]] | 0;
                if (i < 16) {
                  t += f5(br, cr, dr) + hr[0];
                } else if (i < 32) {
                  t += f4(br, cr, dr) + hr[1];
                } else if (i < 48) {
                  t += f3(br, cr, dr) + hr[2];
                } else if (i < 64) {
                  t += f2(br, cr, dr) + hr[3];
                } else {
                  t += f1(br, cr, dr) + hr[4];
                }
                t = t | 0;
                t = rotl2(t, sr[i]);
                t = t + er | 0;
                ar = er;
                er = dr;
                dr = rotl2(cr, 10);
                cr = br;
                br = t;
              }
              t = H[1] + cl + dr | 0;
              H[1] = H[2] + dl + er | 0;
              H[2] = H[3] + el + ar | 0;
              H[3] = H[4] + al + br | 0;
              H[4] = H[0] + bl + cr | 0;
              H[0] = t;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 5; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function f1(x, y, z) {
            return x ^ y ^ z;
          }
          function f2(x, y, z) {
            return x & y | ~x & z;
          }
          function f3(x, y, z) {
            return (x | ~y) ^ z;
          }
          function f4(x, y, z) {
            return x & z | y & ~z;
          }
          function f5(x, y, z) {
            return x ^ (y | ~z);
          }
          function rotl2(x, n) {
            return x << n | x >>> 32 - n;
          }
          C2.RIPEMD160 = Hasher._createHelper(RIPEMD160);
          C2.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
        })();
        return CryptoJS.RIPEMD160;
      });
    })(ripemd160);
    return ripemd160.exports;
  }
  var hmac = { exports: {} };
  var hasRequiredHmac;
  function requireHmac() {
    if (hasRequiredHmac)
      return hmac.exports;
    hasRequiredHmac = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var Base = C_lib.Base;
          var C_enc = C2.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C2.algo;
          C_algo.HMAC = Base.extend({
            init: function(hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == "string") {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 1549556828;
                iKeyWords[i] ^= 909522486;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            reset: function() {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            update: function(messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            finalize: function(messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac2 = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac2;
            }
          });
        })();
      });
    })(hmac);
    return hmac.exports;
  }
  var pbkdf2 = { exports: {} };
  var hasRequiredPbkdf2;
  function requirePbkdf2() {
    if (hasRequiredPbkdf2)
      return pbkdf2.exports;
    hasRequiredPbkdf2 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C2.algo;
          var SHA1 = C_algo.SHA1;
          var HMAC = C_algo.HMAC;
          var PBKDF2 = C_algo.PBKDF2 = Base.extend({
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: SHA1,
              iterations: 1
            }),
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            compute: function(password, salt) {
              var cfg = this.cfg;
              var hmac2 = HMAC.create(cfg.hasher, password);
              var derivedKey = WordArray.create();
              var blockIndex = WordArray.create([1]);
              var derivedKeyWords = derivedKey.words;
              var blockIndexWords = blockIndex.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                var block = hmac2.update(salt).finalize(blockIndex);
                hmac2.reset();
                var blockWords = block.words;
                var blockWordsLength = blockWords.length;
                var intermediate = block;
                for (var i = 1; i < iterations; i++) {
                  intermediate = hmac2.finalize(intermediate);
                  hmac2.reset();
                  var intermediateWords = intermediate.words;
                  for (var j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                  }
                }
                derivedKey.concat(block);
                blockIndexWords[0]++;
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C2.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS.PBKDF2;
      });
    })(pbkdf2);
    return pbkdf2.exports;
  }
  var evpkdf = { exports: {} };
  var hasRequiredEvpkdf;
  function requireEvpkdf() {
    if (hasRequiredEvpkdf)
      return evpkdf.exports;
    hasRequiredEvpkdf = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C2.algo;
          var MD5 = C_algo.MD5;
          var EvpKDF = C_algo.EvpKDF = Base.extend({
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: MD5,
              iterations: 1
            }),
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            compute: function(password, salt) {
              var block;
              var cfg = this.cfg;
              var hasher = cfg.hasher.create();
              var derivedKey = WordArray.create();
              var derivedKeyWords = derivedKey.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                if (block) {
                  hasher.update(block);
                }
                block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i = 1; i < iterations; i++) {
                  block = hasher.finalize(block);
                  hasher.reset();
                }
                derivedKey.concat(block);
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C2.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS.EvpKDF;
      });
    })(evpkdf);
    return evpkdf.exports;
  }
  var cipherCore = { exports: {} };
  var hasRequiredCipherCore;
  function requireCipherCore() {
    if (hasRequiredCipherCore)
      return cipherCore.exports;
    hasRequiredCipherCore = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEvpkdf());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.lib.Cipher || function(undefined$1) {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
          var C_enc = C2.enc;
          C_enc.Utf8;
          var Base64 = C_enc.Base64;
          var C_algo = C2.algo;
          var EvpKDF = C_algo.EvpKDF;
          var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            createEncryptor: function(key, cfg) {
              return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            createDecryptor: function(key, cfg) {
              return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            init: function(xformMode, key, cfg) {
              this.cfg = this.cfg.extend(cfg);
              this._xformMode = xformMode;
              this._key = key;
              this.reset();
            },
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            process: function(dataUpdate) {
              this._append(dataUpdate);
              return this._process();
            },
            finalize: function(dataUpdate) {
              if (dataUpdate) {
                this._append(dataUpdate);
              }
              var finalProcessedData = this._doFinalize();
              return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function() {
              function selectCipherStrategy(key) {
                if (typeof key == "string") {
                  return PasswordBasedCipher;
                } else {
                  return SerializableCipher;
                }
              }
              return function(cipher) {
                return {
                  encrypt: function(message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                  },
                  decrypt: function(ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                  }
                };
              };
            }()
          });
          C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
              var finalProcessedBlocks = this._process(true);
              return finalProcessedBlocks;
            },
            blockSize: 1
          });
          var C_mode = C2.mode = {};
          var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            createEncryptor: function(cipher, iv) {
              return this.Encryptor.create(cipher, iv);
            },
            createDecryptor: function(cipher, iv) {
              return this.Decryptor.create(cipher, iv);
            },
            init: function(cipher, iv) {
              this._cipher = cipher;
              this._iv = iv;
            }
          });
          var CBC = C_mode.CBC = function() {
            var CBC2 = BlockCipherMode.extend();
            CBC2.Encryptor = CBC2.extend({
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
              }
            });
            CBC2.Decryptor = CBC2.extend({
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
              }
            });
            function xorBlock(words, offset, blockSize) {
              var block;
              var iv = this._iv;
              if (iv) {
                block = iv;
                this._iv = undefined$1;
              } else {
                block = this._prevBlock;
              }
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
              }
            }
            return CBC2;
          }();
          var C_pad = C2.pad = {};
          var Pkcs7 = C_pad.Pkcs7 = {
            pad: function(data, blockSize) {
              var blockSizeBytes = blockSize * 4;
              var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
              var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
              var paddingWords = [];
              for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
              }
              var padding = WordArray.create(paddingWords, nPaddingBytes);
              data.concat(padding);
            },
            unpad: function(data) {
              var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
              data.sigBytes -= nPaddingBytes;
            }
          };
          C_lib.BlockCipher = Cipher.extend({
            cfg: Cipher.cfg.extend({
              mode: CBC,
              padding: Pkcs7
            }),
            reset: function() {
              var modeCreator;
              Cipher.reset.call(this);
              var cfg = this.cfg;
              var iv = cfg.iv;
              var mode = cfg.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                modeCreator = mode.createEncryptor;
              } else {
                modeCreator = mode.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
              } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
              }
            },
            _doProcessBlock: function(words, offset) {
              this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
              var finalProcessedBlocks;
              var padding = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                finalProcessedBlocks = this._process(true);
              } else {
                finalProcessedBlocks = this._process(true);
                padding.unpad(finalProcessedBlocks);
              }
              return finalProcessedBlocks;
            },
            blockSize: 128 / 32
          });
          var CipherParams = C_lib.CipherParams = Base.extend({
            init: function(cipherParams) {
              this.mixIn(cipherParams);
            },
            toString: function(formatter) {
              return (formatter || this.formatter).stringify(this);
            }
          });
          var C_format = C2.format = {};
          var OpenSSLFormatter = C_format.OpenSSL = {
            stringify: function(cipherParams) {
              var wordArray;
              var ciphertext = cipherParams.ciphertext;
              var salt = cipherParams.salt;
              if (salt) {
                wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
              } else {
                wordArray = ciphertext;
              }
              return wordArray.toString(Base64);
            },
            parse: function(openSSLStr) {
              var salt;
              var ciphertext = Base64.parse(openSSLStr);
              var ciphertextWords = ciphertext.words;
              if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
              }
              return CipherParams.create({ ciphertext, salt });
            }
          };
          var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            cfg: Base.extend({
              format: OpenSSLFormatter
            }),
            encrypt: function(cipher, message, key, cfg) {
              cfg = this.cfg.extend(cfg);
              var encryptor = cipher.createEncryptor(key, cfg);
              var ciphertext = encryptor.finalize(message);
              var cipherCfg = encryptor.cfg;
              return CipherParams.create({
                ciphertext,
                key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
              });
            },
            decrypt: function(cipher, ciphertext, key, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
              return plaintext;
            },
            _parse: function(ciphertext, format) {
              if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
              } else {
                return ciphertext;
              }
            }
          });
          var C_kdf = C2.kdf = {};
          var OpenSSLKdf = C_kdf.OpenSSL = {
            execute: function(password, keySize, ivSize, salt) {
              if (!salt) {
                salt = WordArray.random(64 / 8);
              }
              var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
              var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
              key.sigBytes = keySize * 4;
              return CipherParams.create({ key, iv, salt });
            }
          };
          var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            cfg: SerializableCipher.cfg.extend({
              kdf: OpenSSLKdf
            }),
            encrypt: function(cipher, message, password, cfg) {
              cfg = this.cfg.extend(cfg);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
              cfg.iv = derivedParams.iv;
              var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
              ciphertext.mixIn(derivedParams);
              return ciphertext;
            },
            decrypt: function(cipher, ciphertext, password, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
              cfg.iv = derivedParams.iv;
              var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
              return plaintext;
            }
          });
        }();
      });
    })(cipherCore);
    return cipherCore.exports;
  }
  var modeCfb = { exports: {} };
  var hasRequiredModeCfb;
  function requireModeCfb() {
    if (hasRequiredModeCfb)
      return modeCfb.exports;
    hasRequiredModeCfb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.mode.CFB = function() {
          var CFB = CryptoJS.lib.BlockCipherMode.extend();
          CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = thisBlock;
            }
          });
          function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var keystream;
            var iv = this._iv;
            if (iv) {
              keystream = iv.slice(0);
              this._iv = void 0;
            } else {
              keystream = this._prevBlock;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
          return CFB;
        }();
        return CryptoJS.mode.CFB;
      });
    })(modeCfb);
    return modeCfb.exports;
  }
  var modeCtr = { exports: {} };
  var hasRequiredModeCtr;
  function requireModeCtr() {
    if (hasRequiredModeCtr)
      return modeCtr.exports;
    hasRequiredModeCtr = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.mode.CTR = function() {
          var CTR = CryptoJS.lib.BlockCipherMode.extend();
          var Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTR.Decryptor = Encryptor;
          return CTR;
        }();
        return CryptoJS.mode.CTR;
      });
    })(modeCtr);
    return modeCtr.exports;
  }
  var modeCtrGladman = { exports: {} };
  var hasRequiredModeCtrGladman;
  function requireModeCtrGladman() {
    if (hasRequiredModeCtrGladman)
      return modeCtrGladman.exports;
    hasRequiredModeCtrGladman = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        /** @preserve
         * Counter block mode compatible with  Dr Brian Gladman fileenc.c
         * derived from CryptoJS.mode.CTR
         * Jan Hruby jhruby.web@gmail.com
         */
        CryptoJS.mode.CTRGladman = function() {
          var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
          function incWord(word) {
            if ((word >> 24 & 255) === 255) {
              var b1 = word >> 16 & 255;
              var b2 = word >> 8 & 255;
              var b3 = word & 255;
              if (b1 === 255) {
                b1 = 0;
                if (b2 === 255) {
                  b2 = 0;
                  if (b3 === 255) {
                    b3 = 0;
                  } else {
                    ++b3;
                  }
                } else {
                  ++b2;
                }
              } else {
                ++b1;
              }
              word = 0;
              word += b1 << 16;
              word += b2 << 8;
              word += b3;
            } else {
              word += 1 << 24;
            }
            return word;
          }
          function incCounter(counter) {
            if ((counter[0] = incWord(counter[0])) === 0) {
              counter[1] = incWord(counter[1]);
            }
            return counter;
          }
          var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              incCounter(counter);
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTRGladman.Decryptor = Encryptor;
          return CTRGladman;
        }();
        return CryptoJS.mode.CTRGladman;
      });
    })(modeCtrGladman);
    return modeCtrGladman.exports;
  }
  var modeOfb = { exports: {} };
  var hasRequiredModeOfb;
  function requireModeOfb() {
    if (hasRequiredModeOfb)
      return modeOfb.exports;
    hasRequiredModeOfb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.mode.OFB = function() {
          var OFB = CryptoJS.lib.BlockCipherMode.extend();
          var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var keystream = this._keystream;
              if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = void 0;
              }
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          OFB.Decryptor = Encryptor;
          return OFB;
        }();
        return CryptoJS.mode.OFB;
      });
    })(modeOfb);
    return modeOfb.exports;
  }
  var modeEcb = { exports: {} };
  var hasRequiredModeEcb;
  function requireModeEcb() {
    if (hasRequiredModeEcb)
      return modeEcb.exports;
    hasRequiredModeEcb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.mode.ECB = function() {
          var ECB = CryptoJS.lib.BlockCipherMode.extend();
          ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.encryptBlock(words, offset);
            }
          });
          ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.decryptBlock(words, offset);
            }
          });
          return ECB;
        }();
        return CryptoJS.mode.ECB;
      });
    })(modeEcb);
    return modeEcb.exports;
  }
  var padAnsix923 = { exports: {} };
  var hasRequiredPadAnsix923;
  function requirePadAnsix923() {
    if (hasRequiredPadAnsix923)
      return padAnsix923.exports;
    hasRequiredPadAnsix923 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.AnsiX923 = {
          pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
            data.sigBytes += nPaddingBytes;
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS.pad.Ansix923;
      });
    })(padAnsix923);
    return padAnsix923.exports;
  }
  var padIso10126 = { exports: {} };
  var hasRequiredPadIso10126;
  function requirePadIso10126() {
    if (hasRequiredPadIso10126)
      return padIso10126.exports;
    hasRequiredPadIso10126 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.Iso10126 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS.pad.Iso10126;
      });
    })(padIso10126);
    return padIso10126.exports;
  }
  var padIso97971 = { exports: {} };
  var hasRequiredPadIso97971;
  function requirePadIso97971() {
    if (hasRequiredPadIso97971)
      return padIso97971.exports;
    hasRequiredPadIso97971 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.Iso97971 = {
          pad: function(data, blockSize) {
            data.concat(CryptoJS.lib.WordArray.create([2147483648], 1));
            CryptoJS.pad.ZeroPadding.pad(data, blockSize);
          },
          unpad: function(data) {
            CryptoJS.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
          }
        };
        return CryptoJS.pad.Iso97971;
      });
    })(padIso97971);
    return padIso97971.exports;
  }
  var padZeropadding = { exports: {} };
  var hasRequiredPadZeropadding;
  function requirePadZeropadding() {
    if (hasRequiredPadZeropadding)
      return padZeropadding.exports;
    hasRequiredPadZeropadding = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.ZeroPadding = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            data.clamp();
            data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
          },
          unpad: function(data) {
            var dataWords = data.words;
            var i = data.sigBytes - 1;
            for (var i = data.sigBytes - 1; i >= 0; i--) {
              if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
                data.sigBytes = i + 1;
                break;
              }
            }
          }
        };
        return CryptoJS.pad.ZeroPadding;
      });
    })(padZeropadding);
    return padZeropadding.exports;
  }
  var padNopadding = { exports: {} };
  var hasRequiredPadNopadding;
  function requirePadNopadding() {
    if (hasRequiredPadNopadding)
      return padNopadding.exports;
    hasRequiredPadNopadding = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        CryptoJS.pad.NoPadding = {
          pad: function() {
          },
          unpad: function() {
          }
        };
        return CryptoJS.pad.NoPadding;
      });
    })(padNopadding);
    return padNopadding.exports;
  }
  var formatHex = { exports: {} };
  var hasRequiredFormatHex;
  function requireFormatHex() {
    if (hasRequiredFormatHex)
      return formatHex.exports;
    hasRequiredFormatHex = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function(undefined$1) {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var CipherParams = C_lib.CipherParams;
          var C_enc = C2.enc;
          var Hex = C_enc.Hex;
          var C_format = C2.format;
          C_format.Hex = {
            stringify: function(cipherParams) {
              return cipherParams.ciphertext.toString(Hex);
            },
            parse: function(input) {
              var ciphertext = Hex.parse(input);
              return CipherParams.create({ ciphertext });
            }
          };
        })();
        return CryptoJS.format.Hex;
      });
    })(formatHex);
    return formatHex.exports;
  }
  var aes = { exports: {} };
  var hasRequiredAes;
  function requireAes() {
    if (hasRequiredAes)
      return aes.exports;
    hasRequiredAes = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C2.algo;
          var SBOX = [];
          var INV_SBOX = [];
          var SUB_MIX_0 = [];
          var SUB_MIX_1 = [];
          var SUB_MIX_2 = [];
          var SUB_MIX_3 = [];
          var INV_SUB_MIX_0 = [];
          var INV_SUB_MIX_1 = [];
          var INV_SUB_MIX_2 = [];
          var INV_SUB_MIX_3 = [];
          (function() {
            var d = [];
            for (var i = 0; i < 256; i++) {
              if (i < 128) {
                d[i] = i << 1;
              } else {
                d[i] = i << 1 ^ 283;
              }
            }
            var x = 0;
            var xi = 0;
            for (var i = 0; i < 256; i++) {
              var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
              sx = sx >>> 8 ^ sx & 255 ^ 99;
              SBOX[x] = sx;
              INV_SBOX[sx] = x;
              var x2 = d[x];
              var x4 = d[x2];
              var x8 = d[x4];
              var t = d[sx] * 257 ^ sx * 16843008;
              SUB_MIX_0[x] = t << 24 | t >>> 8;
              SUB_MIX_1[x] = t << 16 | t >>> 16;
              SUB_MIX_2[x] = t << 8 | t >>> 24;
              SUB_MIX_3[x] = t;
              var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
              INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
              INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
              INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
              INV_SUB_MIX_3[sx] = t;
              if (!x) {
                x = xi = 1;
              } else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
              }
            }
          })();
          var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function() {
              var t;
              if (this._nRounds && this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              var nRounds = this._nRounds = keySize + 6;
              var ksRows = (nRounds + 1) * 4;
              var keySchedule = this._keySchedule = [];
              for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                  keySchedule[ksRow] = keyWords[ksRow];
                } else {
                  t = keySchedule[ksRow - 1];
                  if (!(ksRow % keySize)) {
                    t = t << 8 | t >>> 24;
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                    t ^= RCON[ksRow / keySize | 0] << 24;
                  } else if (keySize > 6 && ksRow % keySize == 4) {
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  }
                  keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
              }
              var invKeySchedule = this._invKeySchedule = [];
              for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;
                if (invKsRow % 4) {
                  var t = keySchedule[ksRow];
                } else {
                  var t = keySchedule[ksRow - 4];
                }
                if (invKsRow < 4 || ksRow <= 4) {
                  invKeySchedule[invKsRow] = t;
                } else {
                  invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
                }
              }
            },
            encryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function(M, offset) {
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
              this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
            },
            _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
              var nRounds = this._nRounds;
              var s0 = M[offset] ^ keySchedule[0];
              var s1 = M[offset + 1] ^ keySchedule[1];
              var s2 = M[offset + 2] ^ keySchedule[2];
              var s3 = M[offset + 3] ^ keySchedule[3];
              var ksRow = 4;
              for (var round = 1; round < nRounds; round++) {
                var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
              }
              var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
              var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
              var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
              var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
              M[offset] = t0;
              M[offset + 1] = t1;
              M[offset + 2] = t2;
              M[offset + 3] = t3;
            },
            keySize: 256 / 32
          });
          C2.AES = BlockCipher._createHelper(AES);
        })();
        return CryptoJS.AES;
      });
    })(aes);
    return aes.exports;
  }
  var tripledes = { exports: {} };
  var hasRequiredTripledes;
  function requireTripledes() {
    if (hasRequiredTripledes)
      return tripledes.exports;
    hasRequiredTripledes = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var WordArray = C_lib.WordArray;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C2.algo;
          var PC1 = [
            57,
            49,
            41,
            33,
            25,
            17,
            9,
            1,
            58,
            50,
            42,
            34,
            26,
            18,
            10,
            2,
            59,
            51,
            43,
            35,
            27,
            19,
            11,
            3,
            60,
            52,
            44,
            36,
            63,
            55,
            47,
            39,
            31,
            23,
            15,
            7,
            62,
            54,
            46,
            38,
            30,
            22,
            14,
            6,
            61,
            53,
            45,
            37,
            29,
            21,
            13,
            5,
            28,
            20,
            12,
            4
          ];
          var PC2 = [
            14,
            17,
            11,
            24,
            1,
            5,
            3,
            28,
            15,
            6,
            21,
            10,
            23,
            19,
            12,
            4,
            26,
            8,
            16,
            7,
            27,
            20,
            13,
            2,
            41,
            52,
            31,
            37,
            47,
            55,
            30,
            40,
            51,
            45,
            33,
            48,
            44,
            49,
            39,
            56,
            34,
            53,
            46,
            42,
            50,
            36,
            29,
            32
          ];
          var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var SBOX_P = [
            {
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378
            },
            {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672
            },
            {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792
            },
            {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464
            },
            {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040
            },
            {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656
            },
            {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577
            },
            {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848
            }
          ];
          var SBOX_MASK = [
            4160749569,
            528482304,
            33030144,
            2064384,
            129024,
            8064,
            504,
            2147483679
          ];
          var DES = C_algo.DES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keyBits = [];
              for (var i = 0; i < 56; i++) {
                var keyBitPos = PC1[i] - 1;
                keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
              }
              var subKeys = this._subKeys = [];
              for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                var subKey = subKeys[nSubKey] = [];
                var bitShift = BIT_SHIFTS[nSubKey];
                for (var i = 0; i < 24; i++) {
                  subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                  subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
                }
                subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                for (var i = 1; i < 7; i++) {
                  subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
                }
                subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
              }
              var invSubKeys = this._invSubKeys = [];
              for (var i = 0; i < 16; i++) {
                invSubKeys[i] = subKeys[15 - i];
              }
            },
            encryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._subKeys);
            },
            decryptBlock: function(M, offset) {
              this._doCryptBlock(M, offset, this._invSubKeys);
            },
            _doCryptBlock: function(M, offset, subKeys) {
              this._lBlock = M[offset];
              this._rBlock = M[offset + 1];
              exchangeLR.call(this, 4, 252645135);
              exchangeLR.call(this, 16, 65535);
              exchangeRL.call(this, 2, 858993459);
              exchangeRL.call(this, 8, 16711935);
              exchangeLR.call(this, 1, 1431655765);
              for (var round = 0; round < 16; round++) {
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;
                var f = 0;
                for (var i = 0; i < 8; i++) {
                  f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f;
              }
              var t = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = t;
              exchangeLR.call(this, 1, 1431655765);
              exchangeRL.call(this, 8, 16711935);
              exchangeRL.call(this, 2, 858993459);
              exchangeLR.call(this, 16, 65535);
              exchangeLR.call(this, 4, 252645135);
              M[offset] = this._lBlock;
              M[offset + 1] = this._rBlock;
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          function exchangeLR(offset, mask) {
            var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
            this._rBlock ^= t;
            this._lBlock ^= t << offset;
          }
          function exchangeRL(offset, mask) {
            var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
            this._lBlock ^= t;
            this._rBlock ^= t << offset;
          }
          C2.DES = BlockCipher._createHelper(DES);
          var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              }
              var key1 = keyWords.slice(0, 2);
              var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
              var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
              this._des1 = DES.createEncryptor(WordArray.create(key1));
              this._des2 = DES.createEncryptor(WordArray.create(key2));
              this._des3 = DES.createEncryptor(WordArray.create(key3));
            },
            encryptBlock: function(M, offset) {
              this._des1.encryptBlock(M, offset);
              this._des2.decryptBlock(M, offset);
              this._des3.encryptBlock(M, offset);
            },
            decryptBlock: function(M, offset) {
              this._des3.decryptBlock(M, offset);
              this._des2.encryptBlock(M, offset);
              this._des1.decryptBlock(M, offset);
            },
            keySize: 192 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          C2.TripleDES = BlockCipher._createHelper(TripleDES);
        })();
        return CryptoJS.TripleDES;
      });
    })(tripledes);
    return tripledes.exports;
  }
  var rc4 = { exports: {} };
  var hasRequiredRc4;
  function requireRc4() {
    if (hasRequiredRc4)
      return rc4.exports;
    hasRequiredRc4 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C2.algo;
          var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keySigBytes = key.sigBytes;
              var S = this._S = [];
              for (var i = 0; i < 256; i++) {
                S[i] = i;
              }
              for (var i = 0, j = 0; i < 256; i++) {
                var keyByteIndex = i % keySigBytes;
                var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                j = (j + S[i] + keyByte) % 256;
                var t = S[i];
                S[i] = S[j];
                S[j] = t;
              }
              this._i = this._j = 0;
            },
            _doProcessBlock: function(M, offset) {
              M[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 256 / 32,
            ivSize: 0
          });
          function generateKeystreamWord() {
            var S = this._S;
            var i = this._i;
            var j = this._j;
            var keystreamWord = 0;
            for (var n = 0; n < 4; n++) {
              i = (i + 1) % 256;
              j = (j + S[i]) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
              keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
            }
            this._i = i;
            this._j = j;
            return keystreamWord;
          }
          C2.RC4 = StreamCipher._createHelper(RC4);
          var RC4Drop = C_algo.RC4Drop = RC4.extend({
            cfg: RC4.cfg.extend({
              drop: 192
            }),
            _doReset: function() {
              RC4._doReset.call(this);
              for (var i = this.cfg.drop; i > 0; i--) {
                generateKeystreamWord.call(this);
              }
            }
          });
          C2.RC4Drop = StreamCipher._createHelper(RC4Drop);
        })();
        return CryptoJS.RC4;
      });
    })(rc4);
    return rc4.exports;
  }
  var rabbit = { exports: {} };
  var hasRequiredRabbit;
  function requireRabbit() {
    if (hasRequiredRabbit)
      return rabbit.exports;
    hasRequiredRabbit = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C2.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              for (var i = 0; i < 4; i++) {
                K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360;
              }
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C3 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C3[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C3[0] ^= i0;
                C3[1] ^= i1;
                C3[2] ^= i2;
                C3[3] ^= i3;
                C3[4] ^= i0;
                C3[5] ^= i1;
                C3[6] ^= i2;
                C3[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C3 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C3[i];
            }
            C3[0] = C3[0] + 1295307597 + this._b | 0;
            C3[1] = C3[1] + 3545052371 + (C3[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C3[2] = C3[2] + 886263092 + (C3[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C3[3] = C3[3] + 1295307597 + (C3[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C3[4] = C3[4] + 3545052371 + (C3[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C3[5] = C3[5] + 886263092 + (C3[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C3[6] = C3[6] + 1295307597 + (C3[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C3[7] = C3[7] + 3545052371 + (C3[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C3[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C3[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C2.Rabbit = StreamCipher._createHelper(Rabbit);
        })();
        return CryptoJS.Rabbit;
      });
    })(rabbit);
    return rabbit.exports;
  }
  var rabbitLegacy = { exports: {} };
  var hasRequiredRabbitLegacy;
  function requireRabbitLegacy() {
    if (hasRequiredRabbitLegacy)
      return rabbitLegacy.exports;
    hasRequiredRabbitLegacy = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS) {
        (function() {
          var C2 = CryptoJS;
          var C_lib = C2.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C2.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C3 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C3[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C3[0] ^= i0;
                C3[1] ^= i1;
                C3[2] ^= i2;
                C3[3] ^= i3;
                C3[4] ^= i0;
                C3[5] ^= i1;
                C3[6] ^= i2;
                C3[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C3 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C3[i];
            }
            C3[0] = C3[0] + 1295307597 + this._b | 0;
            C3[1] = C3[1] + 3545052371 + (C3[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C3[2] = C3[2] + 886263092 + (C3[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C3[3] = C3[3] + 1295307597 + (C3[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C3[4] = C3[4] + 3545052371 + (C3[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C3[5] = C3[5] + 886263092 + (C3[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C3[6] = C3[6] + 1295307597 + (C3[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C3[7] = C3[7] + 3545052371 + (C3[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C3[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C3[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C2.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
        })();
        return CryptoJS.RabbitLegacy;
      });
    })(rabbitLegacy);
    return rabbitLegacy.exports;
  }
  (function(module, exports) {
    (function(root, factory, undef) {
      {
        module.exports = factory(requireCore(), requireX64Core(), requireLibTypedarrays(), requireEncUtf16(), requireEncBase64(), requireEncBase64url(), requireMd5(), requireSha1(), requireSha256(), requireSha224(), requireSha512(), requireSha384(), requireSha3(), requireRipemd160(), requireHmac(), requirePbkdf2(), requireEvpkdf(), requireCipherCore(), requireModeCfb(), requireModeCtr(), requireModeCtrGladman(), requireModeOfb(), requireModeEcb(), requirePadAnsix923(), requirePadIso10126(), requirePadIso97971(), requirePadZeropadding(), requirePadNopadding(), requireFormatHex(), requireAes(), requireTripledes(), requireRc4(), requireRabbit(), requireRabbitLegacy());
      }
    })(commonjsGlobal, function(CryptoJS) {
      return CryptoJS;
    });
  })(cryptoJs);
  const crypto = cryptoJs.exports;
  function setSigningStr(config) {
    let signingStr = config.query ? `${config.path}?${config.query}
` : `${config.path}
`;
    config.body && (signingStr += config.body);
    return signingStr;
  }
  function getAccessToken(config) {
    let pathname;
    try {
      pathname = new URL(config.path).pathname;
    } catch (e) {
      pathname = config.path;
    }
    let str = setSigningStr(__spreadProps(__spreadValues({}, config), {
      path: pathname
    }));
    const sign = crypto.HmacSHA1(str, config.appSalt);
    const encodedSign = sign.toString(crypto.enc.Base64);
    let accessToken = `QApp ${config.appID}:${encodedSign}`;
    accessToken = accessToken.replace(/\//g, "_");
    accessToken = accessToken.replace(/\+/g, "-");
    return accessToken;
  }
  function httpResolve(ctx, domain, app) {
    return __async(this, null, function* () {
      var _a;
      const params = { name: domain, type: "A" };
      const query = queryStringify(params);
      const accessToken = getAccessToken({
        appID: app.appID,
        appSalt: app.appSalt,
        path: httpdnsResolveApi,
        query
      });
      const resp = yield fetch(`${httpdnsResolveApi}?${query}`, {
        headers: {
          "Authorization": accessToken
        }
      });
      ctx.set("dnsResolveStatus", resp.status);
      ctx.set("dnsResolveReqID", (_a = resp.headers.get("x-reqid")) != null ? _a : "");
      ctx.set("dnsResolveConnectionAt", Date.now());
      if (!resp.ok)
        throw new Error(`Call resolve API failed, status: ${resp.status} ${resp.statusText}`);
      const body2 = yield resp.json();
      return body2;
    });
  }
  class DnsLogger {
    constructor(logger2) {
      this.logger = logger2;
    }
    log(schemaName, logData) {
      return this.logger.log(schemaName, logData);
    }
  }
  const debug$7 = getDebug("dns");
  class NonECDNError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "NonECDNError");
    }
  }
  class NoAvailableECDNNodeError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "NoAvailableNodeError");
    }
  }
  class DoWithECDNNodeError extends Error {
    constructor(cause) {
      super(cause + "");
      __publicField(this, "name", "DoWithECDNNodeError");
      this.cause = cause;
    }
  }
  class Resolver {
    constructor(logger2, app, dnsResolver = httpResolve) {
      __publicField(this, "cache", /* @__PURE__ */ new Map());
      __publicField(this, "logger");
      __publicField(this, "fingerprints", /* @__PURE__ */ new Map());
      this.app = app;
      this.dnsResolver = dnsResolver;
      this.logger = new DnsLogger(logger2);
    }
    getFingerprint(ipPort) {
      const fingerprint = this.fingerprints.get(ipPort);
      if (fingerprint == null)
        throw new Error(`No fingerprint for ${ipPort}`);
      return fingerprint;
    }
    getResolveResult(ctx, domain) {
      return __async(this, null, function* () {
        var _a, _b;
        const startAt = Date.now();
        let err;
        try {
          const resolved = yield this.dnsResolver(ctx, domain, this.app);
          if (!isECDNResolveResult(resolved))
            throw new NonECDNError(`Non-ECDN domain: ${domain}`);
          if (resolved.groups.length === 0)
            throw new NoAvailableECDNNodeError(`No available group for ${domain}`);
          const toSave = __spreadProps(__spreadValues({}, resolved), {
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
          const totalTime = timeMinus(Date.now(), startAt);
          this.logger.log("DnsResolveLog", __spreadProps(__spreadValues({
            r_id: (_a = ctx.get("dnsResolveReqID")) != null ? _a : "",
            ip: "",
            domain,
            status_code: (_b = ctx.get("dnsResolveStatus")) != null ? _b : -1
          }, getErrInfo(err)), {
            t_conn: timeMinus(ctx.get("dnsResolveConnectionAt"), startAt),
            t_total: totalTime,
            type: 1
          }));
          ctx.set("dnsResolveTotalTime", totalTime);
        }
      });
    }
    resolve(ctx, domain) {
      return __async(this, null, function* () {
        const fromCache = this.cache.get(domain);
        if (fromCache != null) {
          let result;
          try {
            result = yield fromCache;
          } catch (e) {
            if (e instanceof NonECDNError || e instanceof NoAvailableECDNNodeError)
              throw e;
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
    resolveUrl(ctx, url, hostRequired = false) {
      return __async(this, null, function* () {
        let result = null;
        yield this.do(ctx, url, 1, hostRequired, (host) => {
          result = host;
        });
        return result;
      });
    }
    do(ctx, url, attempts, hostRequired, job) {
      return __async(this, null, function* () {
        const urlObj = new URL(url);
        if (urlObj.port !== "")
          throw new Error("TODO: no port");
        let err;
        let { groups } = yield this.resolve(ctx, urlObj.host);
        for (let i = 0; i < attempts; i++) {
          debug$7("Resolve for", url);
          const group = random(groups, (g) => g.weight);
          if (group == null)
            break;
          debug$7("Resolved for", url);
          try {
            debug$7("doWithGroup", i, url);
            yield doWithGroup(group, url, hostRequired, job);
            return;
          } catch (e) {
            console.warn("doWithGroup (weight:", group.weight, ") failed:", e, url);
            if (shouldDisableTarget(e)) {
              groups = groups.filter((g) => g !== group);
            }
            err = e;
          }
        }
        err = isAbortError(err) ? err : new DoWithECDNNodeError(err);
        throw err;
      });
    }
  }
  function doWithGroup(group, url, hostRequired, job) {
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
          debug$7("doWithElt", elt.id, url);
          yield doWithElt(elt, url, hostRequired, job);
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
  function doWithElt(elt, url, hostRequired, job) {
    return __async(this, null, function* () {
      let ipOrHosts = hostRequired ? elt.hosts : elt.ips;
      if (ipOrHosts.length === 0)
        throw new Error(`Empty ${hostRequired ? "host" : "IP"} list`);
      let err;
      for (let i = 0; i < 2; i++) {
        const curr = random(ipOrHosts);
        if (curr == null)
          break;
        try {
          debug$7(`do with ${hostRequired ? "host" : "IP"}`, curr, url);
          yield job(curr);
          return;
        } catch (e) {
          console.warn("do job with", curr, "failed:", e, url);
          if (shouldDisableTarget(e)) {
            ipOrHosts = ipOrHosts.filter((i2) => i2 !== curr);
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
  function isAbortError(e) {
    return e && e.name === "AbortError";
  }
  const unexpectedDataChannelCloseErrorName = new UnexpectedDataChannelCloseError().name;
  const unexpectedDataChannel1stMessageErrorName = new UnexpectedDataChannel1stMessageError().name;
  function shouldDisableTarget(e) {
    if (e && [unexpectedDataChannelCloseErrorName, unexpectedDataChannel1stMessageErrorName].includes(e.name))
      return false;
    if (isAbortError(e))
      return false;
    if (e instanceof WindowClientError)
      return false;
    return true;
  }
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
  const version = "0.9.6";
  function getEnv() {
    var _a, _b;
    const { os, device, browser } = uaParser(navigator.userAgent);
    let location;
    if (typeof window !== "undefined") {
      location = window.location;
    } else if (typeof self !== void 0) {
      location = self.location;
    }
    return {
      os: `${os.name}_${os.version}`,
      browser: `${browser.name}_${browser.version}`,
      app: (_a = location == null ? void 0 : location.host) != null ? _a : "",
      sdk: `Web SDK v${version}`,
      dev_model: (_b = device.model) != null ? _b : "",
      dev_id: ""
    };
  }
  const logNumPerCall = 200;
  const debug$6 = getDebug("log");
  class SchemaLogger {
    constructor(schemaName, fetch2, flushNum, flushWait, app) {
      __publicField(this, "env", queryStringify(getEnv()));
      __publicField(this, "flushMutex", new Mutex());
      __publicField(this, "buffer", []);
      this.schemaName = schemaName;
      this.fetch = fetch2;
      this.flushNum = flushNum;
      this.flushWait = flushWait;
      this.app = app;
    }
    callApiLog(logs) {
      return __async(this, null, function* () {
        const fetch2 = this.fetch;
        try {
          const accessToken = getAccessToken({
            appID: this.app.appID,
            appSalt: this.app.appSalt,
            path: `${logApiPrefix}/v1/log/${this.schemaName}`
          });
          const resp = yield fetch2(new Request(`${logApiPrefix}/v1/log/${this.schemaName}`, {
            method: "POST",
            headers: {
              "Authorization": accessToken,
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
            debug$6("buffer.length >= this.flushNum");
            return true;
          }
          const waited = Date.now() - buffer[0].ts;
          if (waited >= this.flushWait * 1e3) {
            debug$6("waited >= this.flushWait");
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
      debug$6("log", schemaName, logData);
      let logger2 = this.schemaLoggers.get(schemaName);
      if (logger2 == null) {
        logger2 = new SchemaLogger(schemaName, this.fetch, this.flushNum, this.flushWait, this.appInfo);
        this.schemaLoggers.set(schemaName, logger2);
      }
      logger2.log(logData);
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
  const debug$5 = getDebug("dc");
  const namespace = "miku/dc";
  const itemStoreName = "item";
  class DataCache {
    constructor(config = {}) {
      __publicField(this, "db", new DB(namespace, [itemStoreName]));
      __publicField(this, "browserCache", null);
      __publicField(this, "browserCachePromise", null);
      this.config = config;
    }
    openBrowserCache() {
      return __async(this, null, function* () {
        if (this.browserCachePromise != null)
          return this.browserCachePromise;
        this.browserCachePromise = caches.open(namespace);
        this.browserCachePromise.then((c) => {
          this.browserCache = c;
        });
        return this.browserCachePromise;
      });
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
    browserCacheMatch(request) {
      return __async(this, null, function* () {
        let browserCache = this.browserCache;
        if (browserCache == null) {
          browserCache = yield this.openBrowserCache();
        }
        return browserCache.match(request);
      });
    }
    browserCachePut(request, response) {
      return __async(this, null, function* () {
        let browserCache = this.browserCache;
        if (browserCache == null) {
          browserCache = yield this.openBrowserCache();
        }
        yield browserCache.put(request, response);
      });
    }
    getContent(key, piece) {
      return __async(this, null, function* () {
        const cached = yield this.browserCacheMatch(getBrowserCacheKey(key, piece));
        if (cached == null)
          return void 0;
        if (cached.body == null)
          throw new Error("Body expected for cached response");
        const response = createResponseFromNative(cached);
        return response;
      });
    }
    setContent(key, piece, content) {
      return __async(this, null, function* () {
        let forCache;
        if (!supportResponseWithStream()) {
          forCache = content.underlayer;
        } else {
          const { headers, body: body2 } = content;
          forCache = new Response(body2, { status: 200, statusText: "OK", headers });
        }
        yield this.browserCachePut(getBrowserCacheKey(key, piece), forCache);
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
  class Context {
    constructor(init) {
      __publicField(this, "value");
      this.value = init != null ? __spreadValues({}, init.value) : {};
    }
    set(key, value) {
      this.value[key] = value;
    }
    get(key) {
      return this.value[key];
    }
  }
  class DownloadLogger {
    constructor(logger2) {
      this.logger = logger2;
    }
    log(logData) {
      return this.logger.log("DownloadLog", logData);
    }
  }
  class DoLogger {
    constructor(logger2) {
      this.logger = logger2;
    }
    log(logData) {
      return this.logger.log("DoLog", logData);
    }
  }
  const defaultAttempts = 3;
  const debug$4 = getDebug("http");
  const defaultMediaOptimization = {
    threshold: 1024 * 1024 * 2,
    contentRangeExposed: true
  };
  class Http {
    constructor(logger2, client, patterns, mediaOptimization) {
      __publicField(this, "downloadLogger");
      __publicField(this, "doLogger");
      __publicField(this, "mediaOptimization");
      this.client = client;
      this.patterns = patterns;
      this.downloadLogger = new DownloadLogger(logger2);
      this.doLogger = new DoLogger(logger2);
      this.mediaOptimization = __spreadValues(__spreadValues({}, defaultMediaOptimization), mediaOptimization);
    }
    doWithResolved(ctx, request, resolved, currentRetryCount) {
      return __async(this, null, function* () {
        var _a;
        const domain = new URL(request.url).host;
        const startAt = Date.now();
        let err;
        let response;
        try {
          debug$4("fetch", request.url, "with resolved", resolved);
          request.headers.set("X-Miku-Agent", `web-miku/v${version}`);
          const resp = yield this.client.fetch(ctx, request, resolved);
          debug$4("fetch", request.url, "succeeded with status", resp.status);
          ctx.set("downloadStatus", resp.status);
          ctx.set("downloadReqID", (_a = resp.headers.get("x-reqid")) != null ? _a : "");
          if (resp.status === 429 || resp.status >= 500)
            throw new UnexpectedHttpStatusError(resp);
          response = resp;
          return response;
        } catch (e) {
          debug$4("fetch", request.url, "with resolved", resolved, "failed:", e);
          err = e;
          throw e;
        } finally {
          const requestRange = request.headers.get("Range");
          const range = requestRange == null ? null : parseRange(requestRange);
          const reqMessageAt = ctx.get("downloadReqMessageAt");
          const connectionAt = ctx.get("downloadConnectionAt");
          const startTransferAt = ctx.get("downloadStartTransferAt");
          const respMessageAt = ctx.get("downloadRespMessageAt");
          const doDownloadLog = (extra) => {
            var _a2, _b, _c, _d, _e, _f, _g;
            return this.downloadLogger.log(__spreadValues({
              ip: resolved.split(":")[0],
              domain,
              range_st: (_a2 = range == null ? void 0 : range.start) != null ? _a2 : -1,
              range_end: (_b = range == null ? void 0 : range.end) != null ? _b : -1,
              retry: currentRetryCount,
              ftask_id: (_c = ctx.get("downloadFileTaskID")) != null ? _c : "",
              task_id: (_d = ctx.get("taskID")) != null ? _d : "",
              d_id: (_e = ctx.get("doID")) != null ? _e : "",
              ts_st: startAt,
              r_id: (_f = ctx.get("downloadReqID")) != null ? _f : "",
              status_code: (_g = ctx.get("downloadStatus")) != null ? _g : -1,
              t_req_msg: timeMinus(reqMessageAt, startAt),
              t_conn: timeMinus(connectionAt, reqMessageAt != null ? reqMessageAt : startAt),
              t_tls: -1,
              t_st_trans: timeMinus(startTransferAt, connectionAt),
              t_resp_msg: timeMinus(respMessageAt, startTransferAt),
              err_msg: "",
              err_desc: "",
              t_content_trans: -1,
              t_total: -1,
              resp_size: -1
            }, extra));
          };
          const onDownloadError = (e) => {
            const finishAt = Date.now();
            doDownloadLog(__spreadValues({
              t_total: timeMinus(finishAt, startAt)
            }, getErrInfo(e)));
          };
          const onDownloadTransfered = (size) => {
            const finishAt = Date.now();
            doDownloadLog({
              t_content_trans: timeMinus(finishAt, respMessageAt != null ? respMessageAt : startTransferAt),
              t_total: timeMinus(finishAt, startAt),
              resp_size: size
            });
          };
          if (response == null) {
            onDownloadError(err);
          } else {
            response.bodyReadResult.then((bodyReadResult) => {
              if (bodyReadResult.success) {
                onDownloadTransfered(bodyReadResult.size);
              } else {
                onDownloadError(bodyReadResult.error);
              }
            });
          }
        }
      });
    }
    originalDo(ctx, request) {
      return __async(this, null, function* () {
        if (request.signal.aborted)
          throw request.signal.reason;
        let currentRetryCount = -1;
        let finalResp;
        yield this.client.resolve(ctx, request, defaultAttempts, (resolved) => __async(this, null, function* () {
          currentRetryCount++;
          const newCtx = new Context(ctx);
          finalResp = yield this.doWithResolved(newCtx, request, resolved, currentRetryCount);
        }));
        if (finalResp == null)
          throw new Error(`Http do failed: resolver do finished with no finalResp, url: ${request.url}`);
        return finalResp;
      });
    }
    do(ctx, request) {
      return __async(this, null, function* () {
        const startAt = Date.now();
        const id = uuid();
        ctx.set("doID", id);
        let response;
        let err = null;
        try {
          if (!supportResponseWithStream() || this.mediaOptimization.threshold <= 0) {
            response = yield this.originalDo(ctx, request);
          } else {
            response = yield withMediaOptimization(
              (...args) => this.originalDo(...args),
              nativeDo,
              this.mediaOptimization,
              this.patterns
            )(ctx, request);
          }
          return response;
        } catch (e) {
          err = e;
          throw e;
        } finally {
          const { onDoError, onDoResponsed } = this.getDoLog(ctx, id, startAt);
          response == null ? onDoError(err) : onDoResponsed(response.status);
        }
      });
    }
    getDoLog(ctx, id, startAt) {
      const doDoLog = (extra) => {
        var _a;
        return this.doLogger.log(__spreadValues({
          lookup_type: true,
          t_lookup: (_a = ctx.get("dnsResolveFromCache") === true ? 0 : ctx.get("dnsResolveTotalTime")) != null ? _a : -1,
          t_total: -1,
          ts_st: startAt,
          err_desc: "",
          err_msg: "",
          status_code: -1,
          task_id: ctx.get("taskID"),
          id
        }, extra));
      };
      const onDoError = (e) => {
        const finishAt = Date.now();
        doDoLog(__spreadValues({
          t_total: timeMinus(finishAt, startAt)
        }, getErrInfo(e)));
      };
      const onDoResponsed = (status) => {
        const finishAt = Date.now();
        doDoLog({
          t_total: timeMinus(finishAt, startAt),
          status_code: status
        });
      };
      return { onDoError, onDoResponsed };
    }
  }
  const defaultHttpsPort$1 = 443;
  function withNodeHost(request, nodeHost) {
    const { url: originalUrl, headers, method, redirect, signal } = request;
    const urlObject = new URL(originalUrl);
    const originalHost = urlObject.host;
    const [nodeHostname, nodeBasePort] = parseHost(nodeHost);
    const nodeHttpsPort = nodeBasePort + defaultHttpsPort$1;
    urlObject.protocol = "https:";
    urlObject.host = `${nodeHostname}:${nodeHttpsPort}`;
    urlObject.pathname = `/${originalHost}${urlObject.pathname}`;
    return createNativeRequest$1(urlObject.toString(), { headers, method, redirect, signal });
  }
  function withMediaOptimization(originalDo, initialDo, { threshold, contentRangeExposed }, patterns) {
    return function optimizedDo(ctx, request) {
      return __async(this, null, function* () {
        var _b, _c;
        const _a = request, { url } = _a, reqExtra = __objRest(_a, ["url"]);
        const urlWithoutQueryHash = removeQueryHash(url);
        if (request.method !== "GET" || !patterns.media.some((r) => r.test(urlWithoutQueryHash)))
          return originalDo(ctx, request);
        debug$4("doWithInitialOptimization", url);
        const initialCtx = new Context(ctx);
        const initalReq = new HttpRequest(url, reqExtra);
        const initialDoWithContentRange = (ctx2, req) => __async(this, null, function* () {
          let polyfilledContentRangePromise = null;
          if (req.headers.get("Range") && !contentRangeExposed) {
            polyfilledContentRangePromise = polyfillContentRange(url, reqExtra.headers, initialDo);
          }
          const resp = yield initialDo(ctx2, req);
          if (resp.status === 206 && !resp.headers.get("Content-Range")) {
            const polyfilledContentRange = yield polyfilledContentRangePromise;
            if (polyfilledContentRange != null)
              resp.headers.set("Content-Range", polyfilledContentRange);
          }
          return resp;
        });
        const initialResp = yield initialDoWithContentRange(initialCtx, initalReq);
        const contentLength = httpGetContentLength(initialResp.headers);
        if (contentLength != null && contentLength <= threshold)
          return initialResp;
        const followingHeaders = new Headers(reqExtra.headers);
        const followingRange = (_b = httpGetRange(followingHeaders)) != null ? _b : { start: null, end: null };
        followingRange.start = ((_c = followingRange.start) != null ? _c : 0) + threshold;
        if (followingRange.end != null && followingRange.end < followingRange.start)
          return initialResp;
        debug$4("doWithInitialOptimization followingRange", followingRange);
        followingHeaders.set("Range", stringifyRange(followingRange));
        const followingReq = new HttpRequest(url, __spreadProps(__spreadValues({}, reqExtra), {
          headers: followingHeaders
        }));
        const _d = initialResp, { body: initialBody } = _d, initialRespExtra = __objRest(_d, ["body"]);
        const stream = new TransformStream();
        if (initialBody == null)
          throw new Error(`Body expected for initial response of ${url}`);
        slice(initialBody, [0, threshold]).pipeTo(stream.writable, { preventClose: true }).then(
          () => __async(this, null, function* () {
            debug$4("doWithInitialOptimization initialBody transfered");
            const followingResp = yield originalDo(ctx, followingReq);
            if (followingResp.body == null)
              throw new Error(`Body expected for following response of ${url}`);
            const followingBody = followingResp.status === 206 ? followingResp.body : slice(followingResp.body, [followingRange.start, followingRange.end == null ? null : followingRange.end + 1]);
            followingBody.pipeTo(stream.writable).then(
              () => debug$4("doWithInitialOptimization followingBody transfered"),
              (e) => debug$4("doWithInitialOptimization followingBody transfer errored", e)
            );
          }),
          (e) => __async(this, null, function* () {
            debug$4("doWithInitialOptimization initialBody transfer errored", e);
          })
        );
        return new HttpResponse(stream.readable, initialRespExtra);
      });
    };
  }
  function createNativeRequest$1(url, init) {
    return new Request(url, __spreadValues({
      mode: "cors",
      credentials: "omit"
    }, init));
  }
  function nativeDo(ctx, request) {
    return __async(this, null, function* () {
      const _a = request, { url } = _a, others = __objRest(_a, ["url"]);
      const nativeRequest = createNativeRequest$1(url, others);
      const nativeResponse = yield fetch(nativeRequest);
      return createResponseFromNative(nativeResponse);
    });
  }
  function polyfillContentRange(reqUrl, reqHeaders, initialDo) {
    return __async(this, null, function* () {
      var _a;
      const headers = new Headers(reqHeaders);
      headers.delete("Range");
      const resp = yield initialDo(new Context(), new HttpRequest(reqUrl, {
        method: "HEAD",
        headers
      }));
      const range = httpGetRange(reqHeaders);
      const totalSize = httpGetContentLength(resp.headers);
      if (range == null || totalSize == null)
        return null;
      return stringifyContentRange({
        start: range.start,
        end: (_a = range.end) != null ? _a : totalSize - 1,
        totalSize
      });
    });
  }
  class Task {
    constructor(url, range, expiry, startByClient) {
      __publicField(this, "id", uuid());
      __publicField(this, "priority", 0);
      __publicField(this, "abortCtrl", new AbortController());
      __publicField(this, "started", false);
      this.url = url;
      this.range = range;
      this.expiry = expiry;
      this.startByClient = startByClient;
    }
    get signal() {
      return this.abortCtrl.signal;
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
        return this.startByClient(this);
      });
    }
    cancel(reason) {
      this.abortCtrl.abort(reason);
    }
  }
  class Result {
    constructor(stream, size, fileSize, contentType, underlayer) {
      this.stream = stream;
      this.size = size;
      this.fileSize = fileSize;
      this.contentType = contentType;
      this.underlayer = underlayer;
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
  class TaskLogger {
    constructor(logger2) {
      this.logger = logger2;
    }
    log(logData) {
      return this.logger.log("TaskLog", logData);
    }
  }
  const debug$3 = getDebug("ftask");
  class FileTask {
    constructor(cache, http, key, url, logger2) {
      __publicField(this, "id", uuid());
      __publicField(this, "inited");
      __publicField(this, "cachePieces", []);
      __publicField(this, "taskLogger");
      __publicField(this, "meta", null);
      this.cache = cache;
      this.http = http;
      this.key = key;
      this.url = url;
      this.taskLogger = new TaskLogger(logger2);
      this.inited = this.resume();
    }
    startTask(task) {
      return __async(this, null, function* () {
        const startAt = Date.now();
        const ctx = new Context();
        ctx.set("taskID", task.id);
        let result;
        let err = null;
        try {
          result = yield this._startTask(ctx, task);
          return result;
        } catch (e) {
          err = e;
          throw e;
        } finally {
          const { logOnTaskError, logOnTaskTransfered } = this.logTask(ctx, task, startAt);
          if (result == null) {
            logOnTaskError(err);
          } else {
            result.underlayer.bodyReadResult.then((readResult) => {
              if (readResult.success) {
                logOnTaskTransfered();
              } else {
                logOnTaskError(readResult.error);
              }
            });
          }
        }
      });
    }
    logTask(ctx, task, startAt) {
      const cacheMatchAt = ctx.get("taskCacheMatchAt");
      const httpDoAt = ctx.get("task1stHttpDoAt");
      const resultStreamAt = ctx.get("taskResultStreamAt");
      const resultAt = Date.now();
      const doTaskLog = (extra) => {
        var _a, _b, _c, _d;
        return this.taskLogger.log(__spreadValues({
          id: task.id,
          url: task.url,
          err_msg: "",
          err_desc: "",
          range_st: (_b = (_a = task.range) == null ? void 0 : _a.start) != null ? _b : -1,
          range_end: (_d = (_c = task.range) == null ? void 0 : _c.end) != null ? _d : -1,
          ts_st: startAt,
          t_cc_match: timeMinus(cacheMatchAt, startAt),
          t_http_do: timeMinus(httpDoAt, cacheMatchAt),
          t_res_stream: timeMinus(resultStreamAt, cacheMatchAt),
          t_res: timeMinus(resultAt, resultStreamAt),
          t_trans: -1,
          t_total: -1
        }, extra));
      };
      const logOnTaskError = (e) => {
        const finishAt = Date.now();
        doTaskLog(__spreadValues({
          t_total: timeMinus(finishAt, startAt)
        }, getErrInfo(e)));
      };
      const logOnTaskTransfered = () => {
        const finishAt = Date.now();
        doTaskLog({
          t_trans: timeMinus(finishAt, resultAt),
          t_total: timeMinus(finishAt, startAt)
        });
      };
      return { logOnTaskError, logOnTaskTransfered };
    }
    _startTask(ctx, task) {
      return __async(this, null, function* () {
        var _a;
        debug$3("_startTask", task.url);
        let response;
        const range = task.range != null ? [task.range.start, task.range.end] : [0, null];
        if (!supportResponseWithStream()) {
          debug$3("supportResponseWithStream: false", task.url, task.id);
          const piece = [(_a = range[0]) != null ? _a : 0, range[1]];
          const cachedResponse = yield this.cache.getContent(this.key, piece);
          ctx.set("taskCacheMatchAt", Date.now());
          if (cachedResponse != null) {
            debug$3("use cache", task.url, task.id);
            response = cachedResponse;
          } else {
            debug$3("doRequestAndSaveCache", task.url, task.id);
            response = yield this.doRequestAndSaveCache(ctx, task, range);
          }
          ctx.set("taskResultStreamAt", Date.now());
        } else {
          response = yield this.readRangeByPieces(ctx, task, range);
        }
        yield this.inited;
        const meta = this.meta;
        if (meta == null)
          throw new Error("Missing meta in fileTask");
        debug$3("_startTask resolved", task.url, task.id);
        const size = getRangeSize(meta.fsize, range);
        return new Result(response.body, size, meta.fsize, meta.contentType, response);
      });
    }
    readRangeByPieces(ctx, task, range) {
      return __async(this, null, function* () {
        var _a, _b, _c, _d;
        yield this.inited;
        const pieces = applyRange(range, (_b = (_a = this.meta) == null ? void 0 : _a.fsize) != null ? _b : null, this.cachePieces);
        debug$3("applyRange", range, (_d = (_c = this.meta) == null ? void 0 : _c.fsize) != null ? _d : null, this.cachePieces, pieces);
        ctx.set("taskCacheMatchAt", Date.now());
        const stream = new TransformStream(void 0);
        const firstResp = yield new Promise((resolve, reject) => __async(this, null, function* () {
          try {
            for (let i = 0; i < pieces.length; i++) {
              const { cached, range: range2 } = pieces[i];
              const pieceResp = yield cached ? this.readPieceFromLocal(ctx, task, range2) : this.readPieceFromRemote(ctx, task, range2);
              const isFirst = i === 0;
              if (isFirst)
                resolve(pieceResp);
              const isLast = i === pieces.length - 1;
              yield pieceResp.body.pipeTo(stream.writable, {
                preventClose: !isLast
              });
            }
          } catch (e) {
            console.warn("readRange stream error for", this.url, e);
            stream.writable.abort(e);
            reject(e);
          }
        }));
        ctx.set("taskResultStreamAt", Date.now());
        return new HttpResponse(stream.readable, firstResp);
      });
    }
    readPieceFromLocal(ctx, task, range) {
      return __async(this, null, function* () {
        debug$3("readPieceFromLocal", task.url, range);
        const { piece, start, end } = findPiece(this.cachePieces, range);
        const pieceResponse = yield this.cache.getContent(this.key, piece);
        if (pieceResponse == null) {
          console.warn(`Missing cache item: ${this.key} [${piece})`);
          return this.readPieceFromRemote(ctx, task, range);
        }
        return new HttpResponse(slice(pieceResponse.body, [start, end]), pieceResponse);
      });
    }
    fileSize() {
      var _a, _b;
      return (_b = (_a = this.meta) == null ? void 0 : _a.fsize) != null ? _b : null;
    }
    readPieceFromRemote(ctx, task, range) {
      return __async(this, null, function* () {
        debug$3("readPieceFromRemote", task.url, range);
        const response = yield this.doRequestAndSaveCache(ctx, task, range);
        if (!isFull(this.fileSize(), range) && response.status === 200) {
          console.warn("Range request not supported for", this.url);
          return new HttpResponse(slice(response.body, range), response);
        } else {
          return response;
        }
      });
    }
    doRequest(_ctx, task, range) {
      return __async(this, null, function* () {
        const ctx = new Context(_ctx);
        ctx.set("downloadFileTaskID", this.id);
        const headers = {
          "Accept-Encoding": "identity;q=1, *;q=0"
        };
        if (range != null) {
          const uselessRange = task.range == null && isFull(this.fileSize(), range);
          if (!uselessRange) {
            headers["Range"] = stringifyRange({ start: range[0], end: range[1] == null ? null : range[1] - 1 });
          }
        }
        const request = new HttpRequest(this.url, { method: "GET", headers, signal: task.signal });
        const response = yield this.http.do(ctx, request);
        if (response.body == null)
          throw new Error("Body expected");
        if (response.status !== 200 && response.status !== 206)
          throw new UnexpectedHttpStatusError(response);
        this.saveMeta(response);
        response.bodyReadResult.then((bodyReadResult) => {
          debug$3(`bodyReadResult for ${this.url}:`, bodyReadResult);
        });
        return response;
      });
    }
    doRequestAndSaveCache(ctx, task, range) {
      return __async(this, null, function* () {
        if (ctx.get("task1stHttpDoAt") == null) {
          ctx.set("task1stHttpDoAt", Date.now());
        }
        const response = yield this.doRequest(ctx, task, range);
        const responseForUse = this.saveCachePiece(task, range, response);
        return responseForUse;
      });
    }
    saveCachePiece(task, range, response) {
      return __async(this, null, function* () {
        var _a, _b;
        let forUse = response;
        let forCache;
        if (supportResponseWithStream()) {
          const { main: bodyForUse, minor: bodyForCache } = teeWithMain(response.body);
          forUse = new HttpResponse(bodyForUse, response);
          forCache = new HttpResponse(bodyForCache, response);
        } else if (!task.range) {
          const nativeResponseForCache = response.underlayer.clone();
          forCache = createResponseFromNative(nativeResponseForCache);
        }
        if (forCache != null) {
          const piece = [(_a = range == null ? void 0 : range[0]) != null ? _a : 0, (_b = range == null ? void 0 : range[1]) != null ? _b : null];
          debug$3("saveCachePiece", this.url, piece);
          this.cache.setContent(this.key, piece, forCache).then(() => {
            this.cachePieces = addPiece(this.cachePieces, piece);
            return this.save();
          }).then(
            () => debug$3("saveCachePiece finish", this.url, piece),
            (e) => debug$3("saveCachePiece failed", this.url, e)
          );
        }
        return forUse;
      });
    }
    saveMeta(response) {
      return __async(this, null, function* () {
        this.meta = {
          contentType: response.headers.get("Content-Type"),
          fsize: getFileSize(response)
        };
        yield this.save();
      });
    }
    resume() {
      return __async(this, null, function* () {
        const item = yield this.cache.getItem(this.key);
        if (item == null || item.meta == null)
          return;
        this.meta = item.meta;
        this.cachePieces = item.pieces;
      });
    }
    save() {
      return __async(this, null, function* () {
        const item = {
          meta: this.meta,
          pieces: this.cachePieces
        };
        yield this.cache.setItem(this.key, item);
      });
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
        } finally {
          debug$2("end task", task.name);
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
  const defaultWorkersCount = 10;
  class HowHttpClientBase {
    constructor(resolver, workersCount) {
      __publicField(this, "taskq");
      this.resolver = resolver;
      this.taskq = new TaskQueue(workersCount != null ? workersCount : defaultWorkersCount);
    }
    getFingerprint(ipPort) {
      return this.resolver.getFingerprint(ipPort);
    }
    resolve(ctx, request, attempts, job) {
      return this.resolver.do(ctx, request.url, attempts, false, job);
    }
    fetch(ctx, request, resolvedIP) {
      return __async(this, null, function* () {
        return new Promise((resolve) => this.taskq.add({
          name: request.url,
          priority: 0,
          run: () => __async(this, null, function* () {
            const newRequest = withNodeIP(request, resolvedIP);
            const res = this._fetch(ctx, newRequest);
            resolve(res);
            const resp = yield res;
            yield resp.bodyReadResult;
          })
        }));
      });
    }
  }
  function withNodeIP(originalReq, nodeIP) {
    const { url: originalUrl, method, headers: originalHeaders, signal, body: body2 } = originalReq;
    const urlObject = new URL(originalUrl);
    const originalHost = urlObject.host;
    urlObject.host = nodeIP;
    const headers = new Headers(originalHeaders);
    headers.set("Host", originalHost);
    return new HttpRequest(urlObject.toString(), { method, headers, signal, body: body2 });
  }
  class HoWHttpClientForWindow extends HowHttpClientBase {
    constructor(resolver, pcConnectTimeout, dcOpenTimeout, workersCount = defaultWorkersCount) {
      super(resolver, workersCount);
      __publicField(this, "hoW");
      if (isInServiceWorker())
        throw new Error("HoWHttpClientForWindow should not be used in Service Worker");
      this.hoW = new HoW(pcConnectTimeout, dcOpenTimeout);
    }
    _fetch(ctx, request) {
      return __async(this, null, function* () {
        var _a, _b;
        const id = uuid();
        const fingerprint = this.getFingerprint(new URL(request.url).host);
        const resp = yield this.hoW.fetch(ctx, id, request, fingerprint);
        ctx.set("downloadConnectionAt", (_a = ctx.get("hoWDataChannelOpenAt")) != null ? _a : -1);
        ctx.set("downloadStartTransferAt", (_b = ctx.get("hoWStartTransferAt")) != null ? _b : -1);
        return resp;
      });
    }
    dispose() {
      this.hoW.dispose();
    }
  }
  function isInServiceWorker() {
    const scope2 = self;
    return !!(scope2.clients && scope2.registration);
  }
  class Client {
    constructor(appInfo, config) {
      __publicField(this, "fileTasks", /* @__PURE__ */ new Map());
      __publicField(this, "cache");
      __publicField(this, "cacheUrlFn");
      __publicField(this, "resolver");
      __publicField(this, "http");
      __publicField(this, "logger");
      var _a, _b, _c;
      if (config == null ? void 0 : config.debug)
        enableDebug();
      this.cache = new DataCache(config == null ? void 0 : config.cache);
      this.cacheUrlFn = (_a = config == null ? void 0 : config.cacheUrl) != null ? _a : defaultHash;
      this.logger = (_b = config == null ? void 0 : config.logger) != null ? _b : new Logger(appInfo);
      this.resolver = new Resolver(this.logger, appInfo, config == null ? void 0 : config.dnsResolver);
      const httpClient = (_c = config == null ? void 0 : config.httpClient) != null ? _c : new HoWHttpClientForWindow(this.resolver);
      const patterns = __spreadValues(__spreadValues({}, defaultPatterns), config == null ? void 0 : config.patterns);
      this.http = new Http(this.logger, httpClient, patterns, config == null ? void 0 : config.mediaOptimization);
    }
    createTask(url, range) {
      const hashIdx = url.indexOf("#");
      if (hashIdx >= 0) {
        url = url.slice(0, hashIdx);
      }
      return new Task(url, range != null ? range : null, Number.POSITIVE_INFINITY, (t) => {
        return this.startTask(t);
      });
    }
    fileTaskFor(task) {
      const key = this.cacheUrlFn(task.url);
      let fileTask = this.fileTasks.get(key);
      if (fileTask == null) {
        fileTask = new FileTask(this.cache, this.http, key, task.url, this.logger);
        this.fileTasks.set(key, fileTask);
      }
      return fileTask;
    }
    startTask(task) {
      const fileTask = this.fileTaskFor(task);
      const result = fileTask.startTask(task);
      return result;
    }
    dispose() {
      this.cache.dispose();
    }
  }
  function defaultHash(url) {
    return url;
  }
  const defaultHttpsPort = 443;
  class DipHttpClient {
    constructor(resolver) {
      this.resolver = resolver;
    }
    resolve(ctx, request, attempts, job) {
      return __async(this, null, function* () {
        return this.resolver.do(ctx, request.url, attempts, true, job);
      });
    }
    fetch(ctx, request, resolvedHost) {
      return __async(this, null, function* () {
        const nativeRequest = transformRequest(request, resolvedHost);
        const nativeResponse = yield fetch(nativeRequest);
        const now = Date.now();
        ctx.set("downloadConnectionAt", now);
        ctx.set("downloadStartTransferAt", now);
        const resp = createResponseFromNative(nativeResponse);
        return resp;
      });
    }
    dispose() {
    }
  }
  function createNativeRequest(url, init) {
    return new Request(url, __spreadValues({
      mode: "cors",
      credentials: "omit"
    }, init));
  }
  function transformRequest(request, resolvedHost) {
    const { url: originalUrl, headers: originalHeaders, method, signal } = request;
    const urlObject = new URL(originalUrl);
    const originalHost = urlObject.host;
    const headers = new Headers(originalHeaders);
    const [nodeHostname, nodeBasePort] = parseHost(resolvedHost);
    const nodeHttpsPort = nodeBasePort + defaultHttpsPort;
    urlObject.protocol = "https:";
    urlObject.host = `${nodeHostname}:${nodeHttpsPort}`;
    urlObject.pathname = `/${originalHost}${urlObject.pathname}`;
    let url = urlObject.toString();
    if (headers.has("X-Miku-Agent")) {
      const mikuAgent = headers.get("X-Miku-Agent");
      headers.delete("X-Miku-Agent");
      const sep = url.includes("?") ? "&" : "?";
      const extra = ["X-Miku-Agent", mikuAgent].map(encodeURIComponent).join("=");
      url = url + sep + extra;
    }
    return createNativeRequest(url, {
      headers,
      method,
      signal,
      keepalive: true
    });
  }
  function isProxyMessage(message) {
    return message && message.mikuProxy === true;
  }
  const debug$1 = getDebug("proxy/common");
  function proxyRequest(client, request) {
    return __async(this, null, function* () {
      var _a, _b;
      const { browser } = uaParser(navigator.userAgent);
      if (browser.name === "Firefox" && request.headers.get("Range")) {
        debug$1("Short circuit for Firefox:", request.url);
        const nodeHost = yield client["resolver"].resolveUrl(new Context(), request.url, true);
        const newRequest = withNodeHost(request, nodeHost);
        const response2 = Response.redirect(newRequest.url);
        return response2;
      }
      const httpRange = httpGetRange(request.headers);
      const range = httpRange == null ? void 0 : {
        start: httpRange.start,
        end: httpRange.end == null ? null : httpRange.end + 1
      };
      const task = client.createTask(request.url, range != null ? range : void 0);
      waitAbort(request.signal).catch((e) => {
        task.cancel(e);
      });
      let result;
      try {
        result = yield task.start();
      } catch (e) {
        if (e instanceof UnexpectedHttpStatusError) {
          const { status, statusText, headers: headers2, body: body2, underlayer: response2 } = e.response;
          return response2 != null ? response2 : new Response(body2, { status, statusText, headers: headers2 });
        }
        throw e;
      }
      let { stream, contentType, size, fileSize, underlayer: response } = result;
      if (!supportResponseWithStream())
        return response.underlayer;
      let headers = new Headers(response == null ? void 0 : response.headers);
      headers.set("Accept-Ranges", "bytes");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Content-Type", contentType != null ? contentType : "");
      headers.set("Content-Length", (size != null ? size : "") + "");
      headers.set("Content-Transfer-Encoding", "binary");
      if (range != null) {
        headers.set("Content-Range", stringifyContentRange({
          start: (_a = range.start) != null ? _a : 0,
          end: (_b = range.end) != null ? _b : fileSize != null ? fileSize - 1 : null,
          totalSize: fileSize
        }));
      }
      const finalResp = new Response(stream, {
        status: range == null ? 200 : 206,
        statusText: range == null ? "OK" : "Partial Content",
        headers
      });
      return finalResp;
    });
  }
  const configQueryName = "MIKU_PROXY_CONFIG";
  function getProxyConfig(scriptUrl) {
    const search = scriptUrl.split("?")[1];
    if (!search)
      throw new Error("Invalid script url");
    const params = new URLSearchParams(search);
    const configText = params.get(configQueryName);
    if (configText == null)
      throw new Error("Invalid script url: no config info");
    const config = JSON.parse(configText);
    const makeREs = (rs) => rs == null ? void 0 : rs.map(({ source, flags }) => new RegExp(source, flags));
    return __spreadProps(__spreadValues({}, config), {
      patterns: config.patterns == null ? void 0 : {
        image: makeREs(config.patterns.image),
        media: makeREs(config.patterns.media),
        other: makeREs(config.patterns.other)
      }
    });
  }
  function matchDomains(urlObj, domains) {
    const hostname = urlObj.hostname;
    return domains.includes("*") || domains.includes(hostname);
  }
  function shouldUseCDN(request, { domains, patterns: patternsFromConfig }) {
    if (request.method !== "GET")
      return false;
    const reqUrlObj = new URL(request.url);
    if (!matchDomains(reqUrlObj, domains))
      return false;
    const patterns = __spreadValues(__spreadValues({}, defaultPatterns), patternsFromConfig);
    return matchPatterns(reqUrlObj, patterns);
  }
  class Statistics {
    constructor() {
      __publicField(this, "windowFetchItemsMap", /* @__PURE__ */ new Map());
    }
    onFetchItem(windowId, url, response, ecdn, fallback) {
      const item = {
        url,
        ecdn,
        fallback: fallback != null ? fallback : false,
        size: httpGetContentLength(response.headers)
      };
      let fetchItems = this.windowFetchItemsMap.get(windowId);
      if (fetchItems == null) {
        fetchItems = [];
        this.windowFetchItemsMap.set(windowId, fetchItems);
      }
      fetchItems.push(item);
    }
    onWindowClose(windowId) {
      this.windowFetchItemsMap.delete(windowId);
    }
    getFetchItems(windowId) {
      return this.windowFetchItemsMap.get(windowId) || [];
    }
  }
  function adaptRequest(_0) {
    return __async(this, arguments, function* (request, extra = {}) {
      const { url, headers, method, redirect, signal } = request;
      const pageHost = self.location.host;
      const reqHost = new URL(url).host;
      if (pageHost === reqHost)
        return request;
      const requestWithCORS = new Request(url, __spreadValues({ mode: "cors", credentials: "omit", headers, method, redirect, signal }, extra));
      try {
        const ctrl = new AbortController();
        yield fetch(requestWithCORS, { signal: ctrl.signal });
        ctrl.abort();
        return requestWithCORS;
      } catch (e) {
        return request;
      }
    });
  }
  class SatusLogger {
    constructor(logger2) {
      this.logger = logger2;
    }
    log(logData) {
      return this.logger.log("PageStatusLog", logData);
    }
  }
  const debug = getDebug("proxy/service-worker");
  const perfIdMap = /* @__PURE__ */ new Map();
  const scope = self;
  const proxyConfig = getProxyConfig(scope.location.href);
  const mikuClient = createClientForSW(proxyConfig);
  const statistics = new Statistics();
  const logger = new Logger(proxyConfig.app, void 0, void 0, 3);
  const statusLogger = new SatusLogger(logger);
  scope.addEventListener("activate", (event) => {
    event.waitUntil(scope.clients.claim());
    swClients.onRemove((id) => {
      statistics.onWindowClose(id);
    });
  });
  scope.addEventListener("fetch", (event) => __async(this, null, function* () {
    if (event.clientId !== "") {
      swClients.add(event.clientId);
    }
    const request = event.request;
    const abortCtrl = new AbortController();
    Object.defineProperty(request, "signal", { value: abortCtrl.signal });
    swClients.whenRemoved(event.clientId, () => abortCtrl.abort(new AbortError(`Source client ${event.clientId} closed`)));
    if (shouldUseCDN(request, proxyConfig)) {
      debug("use cdn", request.url);
      event.respondWith(proxyRequest(mikuClient, request).then(
        (resp) => {
          var _a;
          if (proxyConfig.statistics) {
            statistics.onFetchItem(event.clientId, request.url, resp, true, false);
            statusLogger.log({
              r_id: (_a = perfIdMap.get(event.clientId)) != null ? _a : "",
              text: resp.statusText,
              code: resp.status,
              url: request.url
            });
          }
          return resp;
        },
        (e) => __async(this, null, function* () {
          var _a, _b, _c;
          if (e instanceof NonECDNError || e instanceof NoAvailableECDNNodeError || e instanceof DoWithECDNNodeError) {
            debug("Use fallback fetch for request", request.url, `, error:`, e);
            if (proxyConfig.statistics) {
              const adaptedRequest = yield adaptRequest(request);
              try {
                const resp = yield fetch(adaptedRequest, { signal: abortCtrl.signal });
                statistics.onFetchItem(event.clientId, request.url, resp, true, true);
                statusLogger.log({
                  r_id: (_a = perfIdMap.get(event.clientId)) != null ? _a : "",
                  text: resp.statusText,
                  code: resp.status,
                  url: request.url
                });
                return resp;
              } catch (e2) {
                statusLogger.log({
                  r_id: (_b = perfIdMap.get(event.clientId)) != null ? _b : "",
                  text: e2 instanceof Error ? e2.message : "",
                  code: -1,
                  url: request.url
                });
                throw e2;
              }
            } else {
              return fetch(request, { signal: abortCtrl.signal });
            }
          }
          if (proxyConfig.statistics) {
            statusLogger.log({
              r_id: (_c = perfIdMap.get(event.clientId)) != null ? _c : "",
              text: e instanceof Error ? e.message : "",
              code: -1,
              url: request.url
            });
          }
          throw e;
        })
      ));
      return;
    }
    if (request.method === "GET" && proxyConfig.statistics) {
      event.respondWith(adaptRequest(request).then(
        (adaptedRequest) => fetch(adaptedRequest)
      ).then((resp) => {
        var _a;
        statistics.onFetchItem(event.clientId, request.url, resp, false);
        statusLogger.log({
          r_id: (_a = perfIdMap.get(event.clientId)) != null ? _a : "",
          text: resp.statusText,
          code: resp.status,
          url: request.url
        });
        return resp;
      }).catch((e) => {
        var _a;
        statusLogger.log({
          r_id: (_a = perfIdMap.get(event.clientId)) != null ? _a : "",
          text: e instanceof Error ? e.message : "",
          code: -1,
          url: request.url
        });
        return e;
      }));
    }
  }));
  scope.addEventListener("message", (e) => __async(this, null, function* () {
    if (!(e.source instanceof WindowClient))
      return;
    if (!isProxyMessage(e.data))
      return;
    debug("got proxy message", e.data, "from", e.source.id);
    switch (e.data.type) {
      case "window-available":
        swClients.add(e.source.id);
        break;
      case "window-unavailable":
        swClients.remove(e.source.id);
        perfIdMap.delete(e.source.id);
        break;
      case "get-window-fetch-items":
        const clientID = e.source.id;
        const fetchItems = statistics.getFetchItems(clientID);
        const windowClient = yield swClients.get(clientID);
        if (windowClient == null)
          throw new Error(`Invalid window client ID: ${clientID}`);
        const message = {
          mikuProxy: true,
          type: "window-fetch-items",
          items: fetchItems
        };
        windowClient.postMessage(message);
        break;
      case "get-perf-rid":
        perfIdMap.set(e.source.id, e.data.rid);
    }
  }));
  function createClientForSW(proxyConfig2) {
    const clientConfig = __spreadValues({
      debug: proxyConfig2.debug,
      patterns: proxyConfig2.patterns
    }, proxyConfig2.client);
    const logger2 = new Logger(proxyConfig2.app, void 0, void 0, 3);
    const resolver = new Resolver(logger2, proxyConfig2.app);
    const httpClient = new DipHttpClient(resolver);
    return new Client(proxyConfig2.app, __spreadProps(__spreadValues({}, clientConfig), { logger: logger2, httpClient }));
  }
})();
