function SearchGrid(options) {
    // Default settings
    var title = options.title ? options.title : 'Search Grid';
    var colAll = options.colAll.split(',');
    var colTitle = options.colTitle.split(',');
    var colHidden = options.colHidden ? options.colHidden.split(',') : [];
    const rowMultiSelect = options.rowMultiSelect;

    const tableHeader = `
            <th>
                ${options.rowMultiSelect ? '<input type="checkbox" id="search-grid-row-select-all">' : 'Select'}
            </th>` +
        colTitle.map(col => `<th>${col.trim()}</th>`).join('');

    const tableBody = options.data.map((row, index) => {
        const rowCheckbox = `<td><input type="checkbox" class="search-grid-row-select" data-index="${index}"></td>`;
        const rowData = colAll.map(col => {
            const hiddenClass = colHidden.includes(col.trim()) ? 'd-none' : '';
            return `<td class="${hiddenClass}">${row[col.trim()]}</td>`;
        }).join('');

        return `<tr>${rowCheckbox}${rowData}</tr>`;
    }).join('');

    // Function to create modal
    const modalHtml = `
    <div class="search-grid-overlay" id="search-grid-overlay" style="display: none;"></div>
            <div class="modal" id="search-grid-modal" style="display: none;">
                <div class="modal-header">
                    <div class="modal-title">Search result of - ${title}</div>
                    <div class="modal-close">
                        <button type="button" class="btn btn-size-m bg-crimson search-grid-modal-close-icon">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <table id="search-grid-table" class="ap-table">
                        <thead>
                            <tr>${tableHeader}</tr>
                        </thead>
                        <tbody>
                            ${tableBody}
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-size-m bg-crimson search-grid-modal-close-btn">
                        <i class="fas fa-times-circle"></i> Close
                    </button>
                    <button id="btn-search-grid-ok" type="button" class="btn btn-size-m bg-light-green">
                        <i class="fas fa-check-circle"></i> OK
                    </button>
                </div>
            </div>`;

    $('body').append(modalHtml);


    // Show modal
    $('#search-grid-overlay').fadeIn(300);
    $(`#search-grid-modal`).fadeIn(300);
    $(`#search-grid-table`).ToTable();

    // Close modal on clicking the close button
    $('.search-grid-modal-close-btn, .search-grid-modal-close-icon').on('click', function () {
        $('#search-grid-overlay').fadeOut(300); // Close overlay
        $(`#search-grid-modal`).fadeOut(300, function () {
            $(this).remove();
        });
    });

    // Enable select all functionality
    $('#search-grid-row-select-all').on('click', function () {
        if (rowMultiSelect) {
            // Select all checkboxes if rowMultiSelect is true
            $('.search-grid-row-select').prop('checked', this.checked);
        } else {
            // Show error message if rowMultiSelect is false
            alert("Multiple row selection is disabled.");
            // Optionally, uncheck the "select all" checkbox if rowMultiSelect is false
            $(this).prop('checked', false);
        }
    });


    // Enable single/multiple select options.rowMultiSelect true/false
    $('#search-grid-table').on('change', '.search-grid-row-select', function () {
        if (!rowMultiSelect) {
            // If rowMultiSelect is false, only allow one row to be selected at a time
            $('.search-grid-row-select').not(this).prop('checked', false);
        }
    });

    // Handle OK button click
    $('#btn-search-grid-ok').on('click', function () {
        var selectedRows = [];

        // Capture checked rows and push them into selectedRows
        $('.search-grid-row-select:checked').each(function () {
            var index = $(this).data('index');
            selectedRows.push(options.data[index]);
        });
        if (selectedRows.length > 0) {
            options.onSelect(selectedRows); // Trigger onSelect callback with selected rows
            $('#search-grid-overlay').fadeOut(300); // Close overlay
            $(`#search-grid-modal`).fadeOut(300, function () {
                $(this).remove();
            });
        } else {
            alert('No rows selected');
        }
    });
}