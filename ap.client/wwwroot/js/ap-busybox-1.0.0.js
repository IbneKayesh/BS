const BusyBox = {
    activeDivs: new Set(), // Track all active divs being blocked

    Show: function (divId) {
        // Get the target div
        const targetDiv = document.getElementById(divId);
        if (!targetDiv) return;

        // If already active, return
        if (this.activeDivs.has(divId)) return;

        this.activeDivs.add(divId);

        // Create overlay
        const overlay = document.createElement('div');
        overlay.classList.add('work-overlay');
        overlay.id = `overlay-${divId}`;

        // Create busy circle and message
        const busyContainer = document.createElement('div');
        busyContainer.classList.add('work-busy-container');

        const spinner = document.createElement('div');
        spinner.classList.add('work-spinner');
        spinner.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i>`; // FontAwesome spinner icon

        const message = document.createElement('div');
        message.classList.add('work-message');
        message.textContent = 'Please wait...';

        // Append spinner and message
        busyContainer.appendChild(spinner);
        busyContainer.appendChild(message);

        // Append to overlay
        overlay.appendChild(busyContainer);

        // Position overlay relative to the target div
        const targetRect = targetDiv.getBoundingClientRect();
        overlay.style.top = `${targetRect.top + window.scrollY}px`;
        overlay.style.left = `${targetRect.left + window.scrollX}px`;
        overlay.style.width = `${targetRect.width}px`;
        overlay.style.height = `${targetRect.height}px`;

        // Append overlay to the body
        document.body.appendChild(overlay);
    },

    Hide: function () {
        if (this.activeDivs.size === 0) return;

        // Remove all overlays
        this.activeDivs.forEach(divId => {
            const overlay = document.getElementById(`overlay-${divId}`);
            if (overlay) overlay.remove();
        });

        // Clear active divs
        this.activeDivs.clear();
    },
    // Handle Button Busy State
    Busy: function (button, workingText) {
        const $button = typeof button === 'string' ? $('#' + button) : $(button);
        // Preserve original text and icon in data attributes
        if (!$button.data('original-text')) {
            $button.data('original-text', $button.html());
        }

        // Update button state
        $button
            .html(`<i class="fas fa-spinner fa-spin"></i> ${workingText ? workingText : "Working" }...`) // Set the working text (can include an icon)
            .prop('disabled', true) // Disable the button
            .addClass('btn-disabled'); // Add a busy class for styling, if needed
    },

    // Reset Button State
    Reset: function (button) {
        const $button = typeof button === 'string' ? $('#' + button) : $(button);

        // Restore original text and remove busy state
        if ($button.data('original-text')) {
            $button
                .html($button.data('original-text')) // Restore the original content
                .prop('disabled', false) // Enable the button
                .removeClass('btn-disabled'); // Remove the busy class
        }
    },
};
