
// Based on https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Intercept_HTTP_requests

var pattern = "https://www.google.com/url*";

function getQueryString(url) {
  return url.split("?").slice(1).join("?");
}

function getQParam(queryString) {
  return new URLSearchParams(queryString).get("q");
}

function redirect(requestDetails) {
  var url = getQParam(getQueryString(requestDetails.url))
  console.log("Redirecting to " + url)
  return {
    redirectUrl: url
  };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:[pattern]},
  ["blocking"]
);

console.log("Watching for requests");
