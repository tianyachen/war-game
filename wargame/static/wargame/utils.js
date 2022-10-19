
function updateError(xhr){
    if (xhr.status == 0) {
        displayError("Cannot connect to server")
        return
    }

    if (!xhr.getResponseHeader('content-type') == 'application/json') {
        displayError("Received status=" + xhr.status)
        return
    }

    let response = JSON.parse(xhr.responseText)
    if (response.hasOwnProperty('error')) {
        displayError(response.error)
        return
    }

    displayError(response)
}

function displayError(message) {
    $("#error").html(message);
}

function formatDate(isoString) {
    date = new Date(isoString)
    dateString = date.toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric'})
    timeString = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    return dateString + ' ' + timeString
}

function getCSRFToken() {
    let cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim()
        if (c.startsWith("csrftoken=")) {
            return c.substring("csrftoken=".length, c.length)
        }
    }
    return "unknown";
}