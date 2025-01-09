//function: 0
$(document).ready(function () {
    $('#page-title').text('Busy Box');
    $('#page-footer').text('Busy Box');
})

function simulateAjaxCall(divId) {
    BusyBox.Show(divId);

    // Simulate an AJAX call (5 seconds delay)
    setTimeout(() => {
        BusyBox.Hide();
    }, 9000);
}
