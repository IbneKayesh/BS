function BindApiBodyInput(resource, action, dynData) {
    let newDataCollection = [];
    let jsonItem = {};
    jsonItem.RESOURCE = resource;
    jsonItem.PARAMS = [];
    jsonItem.PARAMS.push({
        "PARAM": "Action",
        "VALUE": action
    });
    for (let key in dynData) {
        if (dynData.hasOwnProperty(key)) {
            jsonItem.PARAMS.push({
                "PARAM": key,
                "VALUE": dynData[key]
            });
        }
    }
    //default value
    jsonItem.PARAMS.push({
        "PARAM": "UserId",
        "VALUE": APState.GlobalGetValue(AP_STATE_USER_ID)
    });
    newDataCollection.push(jsonItem);
    return newDataCollection;
}
function AjaxRequestJson(options) {
    const defaultHeaders = {
        'app-token': APState.GlobalGetValue(AP_STATE_API_AUTH_TOKEN)  // Example auth token
    };
    const defaultOptions = {
        type: 'POST', // Default HTTP method
        contentType: 'application/json', // Default content type
        url: APState.GlobalGetValue(AP_STATE_API_BASE_URL), // Must be provided in the options
        data: null, // Default data (can be null)
        headers: defaultHeaders, // Include default headers
        success: function (data) {
            // Default success handler
            console.log('Success:', data);
        },
        error: function (xhr) {
            // Default error handler
            console.log('Error:', xhr);
        }
    };

    const mergedOptions = $.extend(true, defaultOptions, options);

    if (!mergedOptions.url) {
        console.error("URL is required for AjaxRequestJson");
        return;
    }
    // Directly call $.ajax with merged options
    $.ajax(mergedOptions);
}
