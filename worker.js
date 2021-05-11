var count = 0
var appChan = new BroadcastChannel("mos")
var buffer = []

function nameToIdx(s) {
    if (s == "Main") return 1
    return parseInt(s.replace("Extend-", "")) + 1
}
appChan.onmessage = function(d) {
    if (d.data.code == "bye") {
        var k = nameToIdx(d.data.id)
        if (k == count) {
            count -= 1
        } else {
            buffer.push(k)
        }
    }
}
/*
importScripts("./nb-dispatch.min.js")
// Organize Worker Session Variables
var chan = nb.dispatch("udpate","brush")
chan.connect(
    function(d){
        appChan.postMessage(d)
    }
)
chan.on("update", function(d){
    appChan.postMessage(d)
})
*/
// TODO When chan01 onmessage 
// on connect .... 
// sort by the time initialized   ...
//      set main app when first open
//      connect main app only
//      if close main app , close all other windows  ....
//
//
//
//  set the first window main window
//  other as extend work Space
//  if main window close 
//  set set message to close all windows ... 
onconnect = function(e) {
    var port = e.ports[0];
    appChan.postMessage("worker postmessage from mos channel")
    port.onmessage = function(e) {
        console.log("in worker",e)
        if (e.data.code == "get") {
            if (buffer.length == 0) {
                count += 1
                port.postMessage(count);
            } else {
                var k = buffer.pop()
                port.postMessage(k);
            }
        } else {
            port.postMessage("other")
        }
    }

}
