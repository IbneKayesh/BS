const InterfaceBuilder = {
    // Function to process the JSON and create the table
    Table: function (containerId, tableId, configPath) {
        $.getJSON(configPath, function (data) {

            const tableConfig = data.Tables.find(table => table.Id === tableId); // Find the table configuration by Id
            if (!tableConfig) {
                console.error("Table configuration not found for Id:", tableId);
                return;
            }
            const setup = tableConfig.Setup; // Get the table setup
            // Create the table structure
            const $table = $("<table>").attr("id", tableConfig.Id).addClass("ap-table");
            const $thead = $("<thead>");
            const $tr = $("<tr>");
            // Populate the header row
            setup.forEach(column => {
                const $th = $("<th>")
                    .addClass(column.Field) // Set the class
                    .text(column.Name) // Set the text
                    .css("display", column.Show ? "" : "none"); // Conditionally hide column
                $tr.append($th);
            });

            $thead.append($tr);
            $table.append($thead);

            // Append the table to the container
            $("#" + containerId).append($table);
        });
    },
    // Function to process the JSON and create the table
    Form: function (containerId, formId, configPath) {
        $.getJSON(configPath, function (data) {

            const formConfig = data.Forms.find(form => form.Id === formId); // Find the table configuration by Id
            if (!formConfig) {
                console.error("Form configuration not found for Id:", formId);
                return;
            }
            const setup = formConfig.Setup; // Get the form setup
            // Create the form structure
            setup.forEach(field => {
                const $input = $("#" + containerId).find(`#${field.Field}`); // Select the input by ID3

                // Skip if the input does not exist
                if ($input.length === 0) {
                    console.warn(`Input field with ID '${field.Field}' not found in the form.`);
                    return;
                }

                // Update attributes
                $input.prop("required", field.Required); // Set 'required'
                if (!field.Show) {
                    $input.closest(".form-group").parent().addClass("d-none"); // Hide input's 2 parent divs
                } else {
                    $input.closest(".form-group").parent().removeClass("d-none"); // Show input's 2 parent divs
                }
                $input.val(field.Default); // Set the input value
                $input.prop("readonly", field.Readonly); // Set 'readonly'

                //$input.prop("disabled", !field.Edit); // Set 'disabled' based on Edit                
                //$input.prop("required", field.Required); // Set 'required'
                //$input.css("display", field.Show ? "" : "none"); // Conditionally hide the input
                //if (field.Field === "BusinessLogo") {
                //    $input.attr("type", "file"); // Example: Change type for 'BusinessLogo'
                //} else {
                //    $input.attr("type", "text"); // Default type
                //}
            });
        });
    },
    // Function to read the JSON file
    ConfigRead: function (containerId, tableId, configPath) {
        $.getJSON(configPath, function (data) {

            // Iterate through Tables to generate the forms
            data.Tables.forEach(function (table) {
                let tableForm = `<h3>Table: ${table.Id}</h3><table id="form-${table.Id}" class="ap-table">`;
                tableForm += `<thead><th>Field</th><th>Name</th><th>Edit</th><th>Show</th></thead><tbody>`;

                table.Setup.forEach(function (field) {
                    tableForm += generateTableField(field);
                });

                tableForm += `<tr><td colspan="4"><button type="button" class="btn btn-size-m btn-primary" onclick="SaveConfig('form-${table.Id}')">Save Config</button></td></tr></tbody></table>`;
                $('#' + containerId).append(tableForm);
            });

        });

        // Function to generate the form fields dynamically
        function generateTableField(field) {
            let fieldHTML = `<tr>
            <td>${field.Field}</td>
            <td>${field.Name}<input type="hidden" id="${field.Field}" name="${field.Field}" data-edit="${field.Edit}" data-show="${field.Show}"></td>
            <td><input type="checkbox" class="edit-checkbox" ${field.Edit ? 'checked' : ''} data-field="${field.Field}" disabled></td>
            <td><input type="checkbox" class="show-checkbox" ${field.Show ? 'checked' : ''} data-field="${field.Field}"></td>
            </tr>`;

            return fieldHTML;
        }

    }
}

function SaveConfig(action) {
    let formId = action;
    let formData = {};
    // Collect data from each form field
    $('#' + formId).find('tbody tr').each(function () {
        let fieldId = $(this).find('input').attr('id');
        let edit = $(this).find('.edit-checkbox').is(':checked');
        let show = $(this).find('.show-checkbox').is(':checked');
        let required = $(this).find('.required-checkbox').is(':checked');
        let readonly = $(this).find('.readonly-checkbox').is(':checked');
        let defaultValue = $(this).find('.default-text').val();

        formData[fieldId] = {
            Edit: edit,
            Show: show,
            Required: required,
            Readonly: readonly,
            Default: defaultValue
        };
    });

    console.log(`Form Data for ${formId}:`, formData);
    // Here, you can process the form data, e.g., sending it to a server
};