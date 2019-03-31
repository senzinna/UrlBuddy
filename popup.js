'use strict';
const securityIndex = 0;
const urlIndex = 1;

let url;

chrome.tabs.getSelected(null, function (tab) {
    url = tab.url;

    const groups = url
        .split('/')
        .filter(group => !!group);
    const numberOfGroups = groups.length;

    populateUrl(groups[urlIndex]);

    const isSecure = groups[securityIndex].includes("s");
    displaySecureIcons(isSecure);

    if (numberOfGroups > 2) {
        const lastGroup = groups[numberOfGroups - 1];
        populateQueryParameters(lastGroup);
    }
});

function onRemove(areaWell, parameter, parameterText) {
    areaWell.removeChild(parameter);
    removeParameterTextFromUrl(parameterText);
    chrome.tabs.update({
        url: url
    });
}

function onRemoveAll(queryParameters) {
    clearOptionList();
    removeParameterTextFromUrl(queryParameters);
    chrome.tabs.update({
        url: url
    });
    window.close();
}

/*
    These helper function are to display the different section on the UI
*/

function populateUrl(urlLabel) {
    if (urlLabel) {
        const url_name = document.getElementById("url_name");
        url_name.innerText = urlLabel;
    }
}

function displaySecureIcons(isSecure) {
    const isSecureIcon = document.getElementById("isSecure");
    const isNotSecureIcon = document.getElementById("isNotSecure");
    if (isSecure) {
        isNotSecureIcon.style.display = "none";
    } else {
        isSecureIcon.style.display = "none";
    }
}

function populateQueryParameters(queryParameters) {
    const queryParametersList = queryParameters.split('?');

    buildRemoveAll(queryParameters);

    if (queryParametersList.length > 1) {
        const workingParameters = queryParametersList[queryParameters.split('?') < 1 ? 0 : 1];
        const workingParametersList = workingParameters.split('&');

        workingParametersList.forEach(parameter => {
            buildRow(parameter);
        });
    }
}


/*
    These helper function are to build the HTML elements
*/

function buildRemoveAll(queryParameters) {
    const clearAllButton = document.getElementById("clear_all");
    clearAllButton.focus();
    clearAllButton.addEventListener("click", function () {
        onRemoveAll(queryParameters);
    });
}

function buildRow(parameterText) {
    const parameterValues = parameterText.split("=");

    const areaWell = buildAreaWell();
    const parameter = buildParameter();
    const detailSection = buildDetailSection();

    const parameterName = buildParameterName(parameterValues[0]);
    detailSection.appendChild(parameterName);

    const parameterValue = buildParameterValue(parameterValues[1]);
    detailSection.appendChild(parameterValue);

    parameter.appendChild(detailSection);

    const button = buildButton(areaWell, parameter, parameterText);
    const icon = buildIcon();

    button.appendChild(icon);
    parameter.appendChild(button);
    areaWell.appendChild(parameter);
}

function buildAreaWell() {
    const areaWell = document.getElementById("container");

    return areaWell;
}

function buildDetailSection() {
    const detailSection = document.createElement('div');

    return detailSection;
}

function buildParameterName(name) {
    const parameterName = document.createElement('strong');
    parameterName.innerHTML = name + ": ";

    return parameterName;
}

function buildParameterValue(value) {
    const parameterValue = document.createTextNode(value);

    return parameterValue;
}

function buildParameter() {
    const parameter = document.createElement('div');
    parameter.classList.add('well');
    parameter.classList.add('query');

    return parameter;
}

function buildButton(areaWell, parameter, parameterText) {
    const button = document.createElement('button');
    button.type = "button";
    button.classList.add('btn');
    button.classList.add('btn-danger');

    button.addEventListener("click", function () {
        onRemove(areaWell, parameter, parameterText);
    });

    return button;
}

function buildIcon() {
    const icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add('fa-trash');

    return icon;
}

function clearOptionList() {
    const container = document.getElementById("container");
    container.innerHTML = '';
}

/*
    These helper function are to handle the delete actions
*/

function removeParameterTextFromUrl(parameterText) {
    url = url.replace(parameterText, '');

    if (hasTrailingAmpersand()) {
        removeTrailingAmpersand();
    }
}

function hasTrailingAmpersand() {
    return url[url.length - 1] === '&';
}

function removeTrailingAmpersand() {
    url = url.substring(0, url.length - 1);
}