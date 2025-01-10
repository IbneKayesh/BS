APState.GlobalSet(AP_STATE_USER_ID, "KAYESH")
APState.GlobalSet(AP_STATE_API_AUTH_TOKEN, "a10")
APState.GlobalSet(AP_STATE_API_BASE_URL, "http://localhost:5117/api/Xecute/v1/Perform");


if (APState.GlobalGet(AP_STATE_API_BASE_URL)) {
    $('#master-api-signal-status').addClass('bg-light-green').html('<i class="fa-solid fa-wifi"></i>').prop("title", "Connected");
} else {
    $('#master-api-signal-status').addClass('bg-crimson').html('<i class="fa-solid fa-ban"></i>').prop("title", "Not Connected");
}
$('#master-date-time').text(new Date());


function PageGoHome(action, sender) {
    switch (action) {
        case 'page-index':
            window.location.href = '/Home/Index';
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}