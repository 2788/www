(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.netrPerformance = factory());
})(this, function() {
  "use strict";
  const index2 = (type) => {
    const logHeadLine = "ts,url,tag,t_page_load,t_full_load";
    if ("PerformanceObserver" in window && PerformanceObserver.supportedEntryTypes.includes("paint")) {
      let logBody = [];
      let observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            // first-paint 与 DOMContentLoaded 故主动采用 navigation
            performance.getEntriesByType("navigation").forEach(item => {
              logBody[3] = parseFloat((item.domContentLoadedEventEnd / 1e3).toFixed(4))
            })
            logBody[0] = Date.now();
            logBody[1] = window.location.href;
            logBody[2] = type;
            logBody[4] = parseFloat(
              (entry.startTime / 1e3).toFixed(4)
            );
            const subData = [logHeadLine, logBody.join(",")].join("\n");
            fetch(
              new Request(
                "https://log.qiniuapi.com/v1/log/QiniuPageLoadLog",
                {
                  method: "post",
                  body: subData,
                  headers: {
                    "Content-Type": "text/multi-csv"
                  }
                }
              )
            ).catch(() => {})
          }
        });
      });
      observer.observe({ entryTypes: ["paint"] });
    }
  };
  return index2;
});

if ('serviceWorker' in navigator && 'indexedDB' in window) {
  navigator.serviceWorker.getRegistrations().then(async function(registrations) {
    const list = await indexedDB.databases()
    const hasCDNR = list.findIndex(item => item.name === 'cdnr/dcr') > -1
    if (hasCDNR) {
      const request = indexedDB.open('cdnr/dcr')
      request.addEventListener('success', (event) => {
        const db = event.target.result
        if (db.objectStoreNames.contains('item')) {
          const transaction = db.transaction('item', 'readonly')
          const getRequset = transaction.objectStore('item').getAll()
          getRequset.addEventListener('success', () => {
            if (!getRequset.result.length && registrations.length) {
              // 有 serviceworker 但是没有 item 数据
              netrPerformance("nocache")
            } else if (!registrations.length) {
              // 没有 serviceworker
              netrPerformance("direct")
            } else {
              // 有 serviceworker 有 item 数据
              netrPerformance("cache")
            }
          })
        } else {
          // 不存在 cdnr/dcr item
          netrPerformance("direct")
        }
      })
    } else {
      // 不存在 cdnr/dcr database
      netrPerformance("direct")
    }
  })
} else {
  // 不支持 serviceWorker 与 indexedDB
  netrPerformance("direct")
}