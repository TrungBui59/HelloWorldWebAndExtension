console.log("in background script")

let defaultDuration = 0.0;

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log(alarm)
    chrome.notifications.create("my notification", {
        type: "basic",
        iconUrl: "./icon48.png",
        title: "Check Your Posture",
        "message": "Check out our website for more!",
    }, function (notificationID){
        console.log("displayed the notification")
    })
});

function audioNotification(){
    var sound = new Audio('short_tone.mp3');
    sound.play();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Event received in background page");
        defaultDuration = request.minutes * 1.0;
        createAlarm()
        audioNotification()
        sendResponse({success: true});
    }
)

function createAlarm(){
    chrome.alarms.create("check posture", {delayInMinutes : defaultDuration});
}

createAlarm()
audioNotification()