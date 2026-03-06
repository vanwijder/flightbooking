// jest.polyfills.js — React 19 ต้องการ API เหล่านี้ ซึ่ง jest-environment-jsdom ไม่มีให้
// ใช้ .js เพื่อให้ require ทำงานก่อน import hoisting

const { TextEncoder, TextDecoder } = require("util");
const { MessageChannel, MessagePort } = require("worker_threads");

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}
if (!global.MessageChannel) {
  global.MessageChannel = MessageChannel;
}
if (!global.MessagePort) {
  global.MessagePort = MessagePort;
}

// React 19 uses structuredClone internally
if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}

// React 19 may need requestAnimationFrame / cancelAnimationFrame
if (typeof global.requestAnimationFrame === "undefined") {
  global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
}
if (typeof global.cancelAnimationFrame === "undefined") {
  global.cancelAnimationFrame = (id) => clearTimeout(id);
}

// React 19 / fetch-related APIs that jsdom may not provide
if (typeof global.Request === "undefined") {
  global.Request = class Request {
    constructor(url, init) {
      this.url = url;
      Object.assign(this, init);
    }
  };
}
if (typeof global.Response === "undefined") {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body;
      Object.assign(this, init);
    }
  };
}
if (typeof global.Headers === "undefined") {
  global.Headers = class Headers {
    constructor(init) {
      this._headers = {};
      if (init) Object.assign(this._headers, init);
    }
    get(name) { return this._headers[name.toLowerCase()]; }
    set(name, value) { this._headers[name.toLowerCase()] = value; }
  };
}
if (typeof global.fetch === "undefined") {
  global.fetch = () => Promise.reject(new Error("fetch is not implemented in jest polyfills"));
}

