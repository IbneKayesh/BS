AP_STATE_API_LINK ="API"
if (AP_STATE_API_LINK) {
    $('#master-api-signal-status').addClass('bg-light-green').html('<i class="fa-solid fa-wifi"></i>').prop("title", "Connected");
} else {
    $('#master-api-signal-status').addClass('bg-crimson').html('<i class="fa-solid fa-ban"></i>').prop("title", "Not Connected");
}

$('#master-date-time').text(new Date());