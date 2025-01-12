/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inspired from Bootstrap, Tailwind CSS and jQuery
 ***/
//function: 0
$(document).ready(function () {
    $('#page-title').text('Products');
    $('#table-list-product').ToTable();
});

//function: 1
function PageGoClear(action, sender) {
    switch (action) {
        case 'page-entry-product':
            $('#Id').val('0');
            $('#ProductName').val('');
            $('#IsActive').prop('checked', false);
            Popup.Show('info', 'Page cleared');
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}

//function: 2
function PageGoValidateInput(action, sender) {
    let isValid = true;
    let newDataCollection = {};
    switch (action) {
        case 'page-entry-product':
            isValid &= ValidateInputField('#Id', value => value === '', "Id is required, Please reload this page and try again");
            isValid &= ValidateInputField('#ProductName', value => value === '', "Product Name is required");
            newDataCollection = {
                Id: $('#Id').val().trim(),
                ProductName: $('#ProductName').val().trim(),
                IsActive: $('#IsActive').is(':checked') ? "1" : "0"
            };
            newDataCollection = BindApiBodyInput('inventory.products', $('#Id').val().trim() === '0' ? 'INSERT' : 'UPDATE', newDataCollection);
            break;
        case 'page-list-product':
            newDataCollection = BindApiBodyInput('inventory.products', 'GETALL', newDataCollection);
            break;
        case 'delete-product':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('inventory.products', 'DELETE', newDataCollection);
            break;
        case 'edit-product':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('inventory.products', 'GETBYID', newDataCollection);
            break;
        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
    return { isValid, newDataCollection };
}

//function: 3
function PageGoBindHTML(action, dynData, sender) {
    switch (action) {
        case 'page-list-product':
            $('#table-list-product tbody').empty();
            dynData.forEach(function (item) {
                var row = $('<tr></tr>');
                row.append('<td>' + item.ProductName + '</td>');
                row.append(`<td>${item.IsActive ? '<i class="fas fa-circle-check text-green"></i>' : '<i class="fas fa-circle-xmark text-red"></i>'}</td>`);
                row.append(`<td><button type="button" class="btn btn-size-sm bg-blue mr-2" data-id='${item.Id}' onclick='PageGoActionEvent("edit-product",this);'><i class="fas fa-edit text-white"></i></button><button type="button" class="btn btn-size-sm bg-red mr-2" data-id="${item.Id}" onclick='PageGoShowModal("delete-product",this);'><i class="fas fa-trash"></i></button></td>`);
                $('#table-list-product tbody').append(row);
            });

            $('#table-list-product').ToTable();
            break;
        case 'edit-product':
            $('#Id').val(dynData.Id);
            $('#ProductName').val(dynData.ProductName);
            $('#IsActive').prop('checked', dynData.IsActive);
            break;
        case 'delete-product':
            $(`#table-list-product tbody tr`).filter(function () {
                return $(this).find('[data-id="' + dynData + '"]').length > 0;
            }).remove();
            break;
        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}

//function: 4
function PageGoNext(action, sender) {
    switch (action) {
        case 'page-index':
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}

//function: 5
function PageGoActionEvent(action, sender) {
    switch (action) {
        case 'page-entry-product':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                BusyBox.Busy(sender, '');
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS) {
                            Popup.Show("ok", "Request submitted successfully");
                        } else {
                            Popup.Show("error", parsedData.MESSAGE);
                        }
                    },
                    error: function (xhr) {
                        Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText + ', ' + xhr.responseText);
                    },
                    complete: function () {
                        BusyBox.Reset(sender);
                    }
                });
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }

            break;
        case 'page-list-product':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                BusyBox.Busy(sender, '');
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS && parsedData.TABLES > 0) {
                            if (parsedData.EQResult[0].ROWS > 0) {
                                PageGoBindHTML(action, parsedData.EQResult[0].DynamicData, sender);
                            }
                        } else {
                            Popup.Show("error", parsedData.MESSAGE);
                        }
                    },
                    error: function (xhr) {
                        Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText + ', ' + xhr.responseText);
                    },
                    complete: function () {
                        BusyBox.Reset(sender);
                        $('#page-list-product').fadeIn(180);
                    }
                });
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }
            break;
        case 'delete-product':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                BusyBox.Busy(sender, '');
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS) {
                            PageGoBindHTML(action, $(sender).data('id'), sender);
                            Popup.Show("ok", "Request submitted successfully");
                        } else {
                            Popup.Show("error", parsedData.MESSAGE);
                        }
                    },
                    error: function (xhr) {
                        Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText + ', ' + xhr.responseText);
                    },
                    complete: function () {
                        BusyBox.Reset(sender);
                    }
                });
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }

            break;
        case 'edit-product':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS) {
                            PageGoBindHTML(action, parsedData.EQResult[0].DynamicData[0]);
                        } else {
                            Popup.Show("error", parsedData.MESSAGE);
                        }
                    },
                    error: function (xhr) {
                        Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText + ', ' + xhr.responseText);
                    },
                    complete: function () {
                    }
                });
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }

            break;
        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}

//function: 6
function PageGoShowModal(action, sender) {
    switch (action) {
        case 'delete-product':
            Popup.Confirm('Are you sure?', () => PageGoActionEvent(action, sender), () => { });
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}