// Modal Event handlers for close and ok buttons
$(document).on('click', '.modal-close-btn, .modal-ok-btn, .modal-close-btn-icon', function () {
    const modalId = $(this).data('modal-id');
    $(`#${modalId}`).fadeOut(300);
});

$(document).ready(function () {
    let tabCount = 1;

    // Function to add a new tab
    function addTab() {
        tabCount++;
        const tabId = `tab${tabCount}`;

        // Add new tab header
        $(".tabs-list").append(`
            <li class="tab-item" data-tab-id="${tabId}">
                Tab ${tabCount} <span class="fas fa-times-circle close-tab"></span>
            </li>
        `);

        // Add new tab body
        $(".tabs-content").append(`
            <div class="tab-body" data-tab-id="${tabId}">
                <p>Content for Tab ${tabCount}</p>
            </div>
        `);
    }

    // Handle tab switching
    $(document).on("click", ".tab-item", function () {
        const tabId = $(this).data("tab-id");

        // Update active tab
        $(".tab-item").removeClass("active");
        $(this).addClass("active");

        // Show the corresponding tab body
        $(".tab-body").removeClass("active");
        $(`.tab-body[data-tab-id="${tabId}"]`).addClass("active");
    });

    // Handle tab closing
    $(document).on("click", ".close-tab", function (e) {
        e.stopPropagation();

        // Check if it's the last tab
        if ($(".tab-item").length <= 1) {
            alert("You cannot close the last tab.");
            return;
        }

        const parentTab = $(this).closest(".tab-item");
        const tabId = parentTab.data("tab-id");

        // Remove tab header and body
        parentTab.remove();
        $(`.tab-body[data-tab-id="${tabId}"]`).remove();

        // Ensure at least one tab remains open
        if ($(".tab-item").length === 0) {
            addTab();
        }

        // Set the first tab as active if the closed tab was active
        if (parentTab.hasClass("active")) {
            $(".tab-item").first().addClass("active");
            $(".tab-body").first().addClass("active");
        }
    });

    // Handle add tab button
    $(".add-tab").click(function () {
        addTab();
    });

    // Initialize the first tab
    //addTab();
});


// Utility function to validate fields
function ValidateInputField(fieldSelector, condition, errorMessage) {
    var field = $(fieldSelector);
    var value;
    if (!field.is('select')) {
        //for select option
        value = field.val().trim();
    } else {
        value = field.val();
    }
    // Remove previous error class
    field.removeClass('input-error');

    if (condition(value)) {
        field.addClass('input-error');
        Popup.Show("warn", errorMessage);
        return false;
    }
    return true;
}

function ClearInputFieldError(divSelector) {
    $('#' + divSelector).find('input, select, textarea').each(function () {
        $(this).removeClass('input-error');
    });
}



//for chrome web browser
function FormatStringToDateOnly(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    var day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function FormatStringToDateTime(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = date.getHours();
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}

//Generate key like Guid
function GenerateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


// get query parameters
function GetQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
