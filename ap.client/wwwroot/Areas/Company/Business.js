/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inspired from Bootstrap, Tailwind CSS and jQuery
 ***/
//function: 0
$(document).ready(function () {
    $('#page-title').text('Business');
    $('#page-button').append(`<button type="button" class="btn btn-size-m bg-darkseagreen"><i class="fas fa-cog"></i> Business</button>`);
    $('#table-list-business').ToTable();
});

//function: 1
function PageGoClear(action, sender) {
    switch (action) {
        case 'page-entry-business':
            $('#Id').val('0');
            $('#BusinessName').val('');
            $('#OfficeAddress').val('');
            $('#ContactName').val('');
            $('#ContactNo').val('');
            $('#EmailAddress').val('');
            $('#BIN').val('');
            $('#CurrencyId').val('-');
            $('#StartDate').val('');
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
        case 'page-entry-business':
            isValid &= ValidateInputField('#Id', value => value === '', "Id is required, Please reload this page and try again");
            isValid &= ValidateInputField('#BusinessName', value => value === '', "Business Name is required");
            isValid &= ValidateInputField('#CurrencyId', value => value === '' || value === '-' || value === null, "Currency is required");
            newDataCollection = {
                Id: $('#Id').val().trim(),
                BusinessName: $('#BusinessName').val().trim(),
                OfficeAddress: $('#OfficeAddress').val().trim(),
                ContactName: $('#ContactName').val().trim(),
                ContactNo: $('#ContactNo').val().trim(),
                EmailAddress: $('#EmailAddress').val().trim(),
                BIN: $('#BIN').val().trim(),
                CurrencyId: $('#CurrencyId').val(),
                StartDate: $('#StartDate').val() || new Date(),
                IsActive: $('#IsActive').is(':checked') ? "1" : "0"
            };
            newDataCollection = BindApiBodyInput('company.business', $('#Id').val().trim() === '0' ? 'INSERT' : 'UPDATE', newDataCollection);
            break;
        case 'page-list-business':
            newDataCollection = BindApiBodyInput('company.business', 'GETALL', newDataCollection);
            break;
        case 'delete-business':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('company.business', 'DELETE', newDataCollection);
            break;
        case 'edit-business':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('company.business', 'GETBYID', newDataCollection);
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
        case 'page-list-business':
            $('#table-list-business tbody').empty();
            dynData.forEach(function (item) {
                var row = $('<tr></tr>');
                row.append('<td>' + item.BusinessName + '</td>');
                row.append('<td>' + item.OfficeAddress + '</td>');
                row.append('<td>' + item.ContactName + '</td>');
                row.append('<td>' + item.ContactNo + '</td>');
                row.append('<td>' + item.EmailAddress + '</td>');
                row.append('<td>' + item.BIN + '</td>');
                row.append('<td>' + item.CurrencyId + '</td>');
                row.append('<td>' + FormatStringToDateOnly(item.StartDate) + '</td>');
                row.append(`<td>${item.IsActive ? '<i class="fas fa-circle-check text-green"></i>' : '<i class="fas fa-circle-xmark text-red"></i>'}</td>`);
                row.append(`<td><button type="button" class="btn btn-size-sm bg-blue mr-2" data-id='${item.Id}' onclick='PageGoActionEvent("edit-business",this);'><i class="fas fa-edit text-white"></i></button><button type="button" class="btn btn-size-sm bg-red mr-2" data-id="${item.Id}" onclick='PageGoShowModal("delete-business",this);'><i class="fas fa-trash"></i></button></td>`);
                $('#table-list-business tbody').append(row);
            });

            $('#table-list-business').ToTable();
            break;
        case 'edit-business':
            $('#Id').val(dynData.Id);
            $('#BusinessName').val(dynData.BusinessName);
            $('#OfficeAddress').val(dynData.OfficeAddress);
            $('#ContactName').val(dynData.ContactName);
            $('#ContactNo').val(dynData.ContactNo);
            $('#EmailAddress').val(dynData.EmailAddress);
            $('#BIN').val(dynData.BIN);
            $('#CurrencyId').val(dynData.CurrencyId);
            $('#StartDate').val(FormatStringToDateOnly(dynData.StartDate)); //for date only
            $('#IsActive').prop('checked', dynData.IsActive);
            break;
        case 'delete-business':
            $(`#table-list-business tbody tr`).filter(function () {
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
        case 'page-entry-business':
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
        case 'page-list-business':
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
                        $('#page-list-business').fadeIn(180);
                    }
                });
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }
            break;
        case 'delete-business':
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
        case 'edit-business':
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
        case 'delete-business':
            Popup.Confirm('Are you sure?', () => PageGoActionEvent(action, sender), () => { });
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}