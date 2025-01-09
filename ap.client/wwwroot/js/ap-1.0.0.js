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