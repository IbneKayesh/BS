const Popup = {
    // Function to show the notification
    Show: function (type, message) {
        // Create notification container if it doesn't exist
        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.classList.add('notification-container');
            document.body.appendChild(notificationContainer);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);

        // Add icon and message
        let icon;
        switch (type) {
            case 'ok':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'warn':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'info':
                icon = '<i class="fas fa-info-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-times-circle"></i>';
                break;
            default:
                icon = '';
                break;
        }

        notification.innerHTML = `${icon} ${message}`;

        // Append notification to the container
        notificationContainer.appendChild(notification);

        // Show the notification with smooth transition
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove notification after a delay (e.g., 5 seconds)
        setTimeout(() => {
            notification.classList.add('hide');
            // After the hide animation, remove the element
            setTimeout(() => {
                notification.remove();
            }, 1000); // Allow some time for the hide animation to complete
        }, 5000); // 5 seconds
    },
    Confirm: function (message, yesCallback, noCallback) {
        // Create overlay and modal elements
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const modal = document.createElement('div');
        modal.classList.add('confirm-modal');

        // Create the message element
        const messageEl = document.createElement('div');
        messageEl.classList.add('confirm-message');
        messageEl.innerHTML = message;

        // Create buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('confirm-buttons');

        const noButton = document.createElement('button');
        noButton.classList.add('btn', 'btn-size-m', 'bg-crimson');
        noButton.innerHTML = '<i class="fas fa-times-circle"></i>No';
        noButton.onclick = function () {
            // Fade out effect before removing
            overlay.classList.remove('fade-in');
            overlay.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(overlay);
                noCallback();
                document.removeEventListener('keydown', handleF10Key); // Remove F10 listener when modal is closed
            }, 400); // Wait for fade-out animation to complete
        };

        const yesButton = document.createElement('button');
        yesButton.classList.add('btn', 'btn-size-m', 'bg-green');
        yesButton.innerHTML = '<i class="fas fa-check-circle"></i>Yes (F2)';
        yesButton.onclick = function () {
            // Fade out effect before removing
            overlay.classList.remove('fade-in');
            overlay.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(overlay);
                yesCallback();
                document.removeEventListener('keydown', handleF10Key); // Remove F10 listener when modal is closed
            }, 400); // Wait for fade-out animation to complete
        };

        // Append buttons to the container
        buttonContainer.appendChild(noButton);
        buttonContainer.appendChild(yesButton);

        // Append all elements to modal and overlay
        modal.appendChild(messageEl);
        modal.appendChild(buttonContainer);
        overlay.appendChild(modal);

        // Append overlay to body
        document.body.appendChild(overlay);

        // Add fade-in effect
        requestAnimationFrame(() => {
            overlay.classList.add('fade-in');
        });

        // Function to handle F10 key press
        function handleF10Key(event) {
            if (event.key === 'F2') {
                yesButton.click(); // Trigger Yes button click
            }
        }
        // Add functionality for F10 key to trigger Yes button
        document.addEventListener('keydown', handleF10Key);
    }
}