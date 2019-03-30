'use strict';

chrome.tabs.getSelected(null, function (tab) {
    myFunction(tab.url);
});

function myFunction(tablink) {
    const groups = tablink
        .split('/')
        .filter(group => !!group);

    const numberOfGroups = groups.length;
    const securityIndex = 0;
    const urlIndex = 1;
    const parameterIndex = numberOfGroups - 1;

    populateUrl(groups[urlIndex]);

    const isSecure = groups[securityIndex].includes("s");
    displaySecureIcons(isSecure);

    populateQueryParameters(groups[parameterIndex]);

}

function populateUrl(urlLabel) {
    if (urlLabel) {
        var url_name = document.getElementById("url_name");
        url_name.innerText = urlLabel;
    }
}

function displaySecureIcons(isSecure) {
    if (isSecure) {
        var isSecureIcon = document.getElementById("isSecure");
        var isNotSecureIcon = document.getElementById("isNotSecure");
        if (isSecure) {
            isNotSecureIcon.style.display = "none";
        } else {
            isSecureIcon.style.display = "none";
        }
    }
}

function populateQueryParameters(queryParameters) {
    if (queryParameters) {
        var queryParametersList = queryParameters.split('?');
        const workingParameters = queryParametersList[queryParameters.split('?') < 1 ? 0 : 1];
        var workingParametersList = workingParameters.split('&');

        workingParametersList.forEach(parameter => {
            buildRow(parameter);
        });
    }
}

function buildRow(parameterText) {
    var parameterValues = parameterText.split("=");

    var areaWell = buildAreaWell();
    var parameter = buildParameter();
    var detailSection = buildDetailSection();

    var parameterName = buildParameterName(parameterValues[0]);
    detailSection.appendChild(parameterName);

    var parameterValue = buildParameterValue(parameterValues[1]);
    detailSection.appendChild(parameterValue);

    parameter.appendChild(detailSection);

    var button = buildButton(areaWell, parameter);
    var icon = buildIcon();

    button.appendChild(icon);
    parameter.appendChild(button);
    areaWell.appendChild(parameter);
}

function buildAreaWell() {
    var areaWell = document.getElementById("container");

    return areaWell;
}

function buildDetailSection() {
    var detailSection = document.createElement('div');

    return detailSection;
}

function buildParameterName(name) {
    var parameterName = document.createElement('strong');
    parameterName.innerHTML = name + ": ";

    return parameterName;
}

function buildParameterValue(value) {
    var parameterValue = document.createTextNode(value);

    return parameterValue;
}

function buildParameter() {
    var parameter = document.createElement('div');
    parameter.classList.add('well');
    parameter.classList.add('query');

    return parameter;
}


function buildButton(areaWell, parameter) {
    var button = document.createElement('button');
    button.type = "button";
    button.classList.add('btn');
    button.classList.add('btn-danger');

    button.addEventListener("click", function () {
        onRemove(areaWell, parameter);
    });

    return button;
}

function buildIcon() {
    var icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add('fa-trash');

    return icon;
}

function onRemove(areaWell, parameter) {
    areaWell.removeChild(parameter);
}