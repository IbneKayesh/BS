(function ($) {
    $.fn.searchGrid = function (options) {
        // Default settings
        const settings = $.extend({
            title: 'Search Grid',
            colAll: '',  // All columns
            colTitle: '', // Columns to display
            colHidden: '', // Columns to hide
            rowMultiSelect: true, // Enable multiple row selection
            data: [],     // Data array
            onSelect: function (selectedRows) { } // Callback for selected rows
        }, options);

        // Function to generate the table HTML
        function generateTable() {
            const colAll = settings.colAll.split(',');
            const colTitles = settings.colTitle.split(',');
            const colHidden = settings.colHidden ? settings.colHidden.split(',') : [];

            // Generate table header
            const tableHeader = `
                <th>
                    <input type="checkbox" class="select-all">
                </th>` +
                colTitles.map(col => `<th>${col.trim()}</th>`).join('');

            // Generate table body
            const tableBody = settings.data.map((row, index) => {
                const rowCheckbox = `<td><input type="checkbox" class="row-select" data-index="${index}"></td>`;
                const rowData = colAll.map(col => {
                    const hiddenClass = colHidden.includes(col.trim()) ? 'd-none' : '';
                    return `<td class="${hiddenClass}">${row[col.trim()] || ''}</td>`;
                }).join('');
                return `<tr>${rowCheckbox}${rowData}</tr>`;
            }).join('');

            // Return the full table HTML
            return `
                <table class="ap-table">
                    <thead>
                        <tr>${tableHeader}</tr>
                    </thead>
                    <tbody>
                        ${tableBody}
                    </tbody>
                </table>`;
        }

        // Function to create modal
        function createModal() {
            const modalHtml = `
                <div class="modal" id="search-grid-modal" style="display: none;">
                    <div class="modal-header">
                        <div class="modal-title">Search result of - ${settings.title}</div>
                        <div class="modal-close">
                            <button type="button" class="btn btn-size-m bg-crimson" data-modal-id="search-grid-modal">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="modal-body">
                        ${generateTable()}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-size-m bg-crimson" data-modal-id="search-grid-modal">
                            <i class="fas fa-times-circle"></i> Close
                        </button>
                        <button id="btn-search-grid-ok" type="button" class="btn btn-size-m bg-light-green">
                            <i class="fas fa-check-circle"></i> OK
                        </button>
                    </div>
                </div>`;
            $('body').append(modalHtml);
        }

        // Show modal
        function showModal() {
            $(`#search-grid-modal`).fadeIn(300);
        }

        // Hide and remove modal
        function closeModal() {
            $(`#search-grid-modal`).fadeOut(300, function () {
                $(this).remove();
            });
        }

        // Initialize modal
        createModal();


        // Show modal
        showModal();

        // Event listeners for row selection
        $('body').on('change', '.select-all', function () {
            if (settings.rowMultiSelect) {
                const isChecked = $(this).is(':checked');
                $('.row-select').prop('checked', isChecked);
            } else {
                $(this).prop('checked', false); // Disable "Select All" functionality
                alert('Multi-row selection is disabled.');
            }
        });

        $('body').on('change', '.row-select', function () {
            if (!settings.rowMultiSelect) {
                $('.row-select').not(this).prop('checked', false);
            } else {
                const allChecked = $('.row-select').length === $('.row-select:checked').length;
                $('.select-all').prop('checked', allChecked);
            }
        });

        // Event listeners for modal close buttons
        $('body').on('click', `[data-modal-id="search-grid-modal"]`, function () {
            closeModal();
        });

        // Event listener for the OK button
        $('body').on('click', '#btn-search-grid-ok', function () {
            var selectedRows = [];

            //capture checked rows
            //and push them into selectedRows

            settings.onSelect(selectedRows); // Trigger onSelect callback with selected rows
            closeModal();
        });


        return this;
    };
})(jQuery);
