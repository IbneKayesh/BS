$(document).on('click', '.ap-visble-row', function () {
    var className = $(this).data('class'); // Get the unique class name
    // Toggle visibility of related rows
    $('.' + className).fadeToggle('fast');
    // Toggle arrow icon
    $(this).find('.ap-arrow i').toggleClass('fa-chevron-down fa-chevron-up');
});





$.fn.ToTable = function (rowsPerPage = 10) {
    // Get the table and thead elements
    var table = $(this);
    var thead = table.find('thead');
    var tbody = table.find('tbody');
    $(thead).find('tr.th-tools-row').remove();
    // Create a new row in the thead to hold the search input
    var toolsRow = $('<tr class="th-tools-row"></tr>');
    // Get the number of columns in the table (count th elements)
    var columnCount = thead.find('th').length;
    var leftColSpan = Math.round(columnCount / 2);
    var rowCount = tbody.find('tr').length;
    // Add a search box that spans all columns
    var searchInput = $(`<td colspan="${leftColSpan}"><input type="text" placeholder="Search ... ${rowCount} records"> </td>`);
    toolsRow.append(searchInput);
    // Append the search row to the thead
    thead.append(toolsRow);

    // Handle the keyup event to filter the rows
    searchInput.find('input').on('keyup', function () {
        var searchText = $(this).val().toLowerCase();
        if (searchText === '') {
            renderTableRows(currentPage); // Reset table to show all rows for the current page
            $(".btn-prev").addClass('bg-blue').removeClass('btn-disabled').prop('disabled', false);
            $(".btn-next").addClass('bg-blue').removeClass('btn-disabled').prop('disabled', false);
            return;
        }
        $(".btn-prev").addClass('btn-disabled').removeClass('bg-blue').prop('disabled', true);
        $(".btn-next").addClass('btn-disabled').removeClass('bg-blue').prop('disabled', true);
        // Filter rows based on the search text
        tbody.find('tr').each(function () {
            var row = $(this);
            var showRow = false;

            // Loop through each cell in the row (excluding cells with class d-none)
            row.find('td').each(function () {
                var cellText = $(this).text().toLowerCase();
                if (cellText.indexOf(searchText) !== -1 && !$(this).hasClass('d-none')) {
                    showRow = true;
                    return false;  // If one match is found, break out of the loop
                }
            });

            // Show or hide the row based on whether a match was found
            if (showRow) {
                renderTableRows(currentPage);
                row.show();
            } else {
                row.hide();
            }
        });
    });

    var rightColSpan = columnCount - leftColSpan;
    var paginationControls = $(`<td colspan="${rightColSpan}" style="text-align:center"></td>`);

    let currentPage = 1;

    // Calculate the total number of rows in the tbody
    const totalRows = tbody.find('tr').length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Render the table rows based on the current page
    function renderTableRows(page) {
        // Show and hide rows based on the current page
        tbody.find('tr').each(function (index) {
            // Calculate the start and end index for rows on this page
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;

            // Check if the row has the "ap-hidden-row" class
            const isHiddenRow = $(this).hasClass('ap-hidden-row');

            // Hide rows that are not part of the current page
            if (index >= start && index < end && !isHiddenRow) {
                $(this).show();  // Show this row
            } else {
                $(this).hide();  // Hide this row
            }
        });
    }

    // Render pagination controls
    function renderPagination() {
        paginationControls.empty();
        const prevButton = $('<button class="btn btn-size-sm bg-blue btn-prev">Prev</button>');
        const nextButton = $('<button class="btn btn-size-sm bg-blue btn-next">Next</button>');

        // Disable previous button if on the first page
        if (currentPage === 1) {
            prevButton.addClass('btn-disabled').removeClass('bg-blue').prop('disabled', true);
        }

        // Disable next button if on the last page
        if (currentPage === totalPages) {
            nextButton.addClass('btn-disabled').removeClass('bg-blue').prop('disabled', true);
        }

        prevButton.on('click', () => changePage(currentPage - 1));
        nextButton.on('click', () => changePage(currentPage + 1));

        paginationControls.append(prevButton);
        paginationControls.append(` Page ${currentPage} of ${totalPages} `);
        paginationControls.append(nextButton);

        toolsRow.append(paginationControls);
    }

    // Change the page
    function changePage(page) {
        if (page < 1 || page > totalPages) return; // Prevent going beyond page bounds
        currentPage = page;
        renderTableRows(currentPage);
        renderPagination();
    }

    // Initial render
    renderTableRows(currentPage);
    renderPagination();
};