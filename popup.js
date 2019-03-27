'use strict';

const securityIndex = 0;
const urlIndex = 1;
const parameterIndex = 2;

chrome.tabs.getSelected(null, function(tab) {
    myFunction(tab.url);
});

function myFunction(tablinkTest) {
    tablink = 'https://hq.dev.geniuscentral.com/search?s=mocha';
    const groups = tablink
        .split('/')
        .filter(group => !!group);
    populateUrl(groups[urlIndex]);
    alert(groups[securityIndex]);
    alert(groups[securityIndex].includes("s"));
    const isSecure = groups[securityIndex].includes("s");
    displaySecureIcons(isSecure);
}

function populateUrl(urlLabel) {
    var url_name = document.getElementById("url_name")
    url_name.innerText = urlLabel;
}

function displaySecureIcons(isSecure) {
    var isSecureIcon = document.getElementById("isSecure");
    var isNotSecureIcon = document.getElementById("isNotSecure");
    if (isSecure) {
        isNotSecureIcon.display = "none";
    } else {
        isSecureIcon.display = "none";
    }
}