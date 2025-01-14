/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inspired from Bootstrap, Tailwind CSS and jQuery
 ***/
//function: 0
$(document).ready(function () {
    $('#page-title').text('Contacts');
    $('#table-list-contacts').ToTable();
});

//function: 1
function PageGoClear(action, sender) {
    switch (action) {
        case 'page-entry-contacts':
            $('#Id').val('0');
            $('#ContactType').val('-');
            $('#CategoryId').val('-');
            $('#ContactName').val('');
            $('#ContactPerson').val('-');
            $('#ContactNo').val('-');
            $('#EmailAddress').val('-');
            $('#OfficeAddress').val('-');
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
        case 'page-entry-contacts':
            isValid &= ValidateInputField('#Id', value => value === '', "Id is required, Please reload this page and try again");
            isValid &= ValidateInputField('#ContactType', value => value === '' || value === '-' || value === null, "Contact Type is required");
            isValid &= ValidateInputField('#CategoryId', value => value === '' || value === '-' || value === null, "Category is required");
            isValid &= ValidateInputField('#ContactName', value => value === '', "Contact Name is required");
            isValid &= ValidateInputField('#ContactPerson', value => value === '', "Contact Person is required");
            isValid &= ValidateInputField('#ContactNo', value => value === '', "Contact No is required");
            isValid &= ValidateInputField('#EmailAddress', value => value === '', "Email Address is required");
            isValid &= ValidateInputField('#OfficeAddress', value => value === '', "Office Address is required");
            newDataCollection = {
                Id: $('#Id').val().trim(),
                ContactType: $('#ContactType').val(),
                CategoryId: $('#CategoryId').val(),
                ContactName: $('#ContactName').val(),
                ContactPerson: $('#ContactPerson').val(),
                ContactNo: $('#ContactNo').val(),
                EmailAddress: $('#EmailAddress').val(),
                OfficeAddress: $('#OfficeAddress').val(),
                IsActive: $('#IsActive').is(':checked') ? "1" : "0"
            };
            newDataCollection = BindApiBodyInput('crm.contacts', $('#Id').val().trim() === '0' ? 'INSERT' : 'UPDATE', newDataCollection);
            break;
        case 'page-list-contacts':
            newDataCollection = BindApiBodyInput('crm.contacts', 'GETALL', newDataCollection);
            break;
        case 'delete-contacts':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('crm.contacts', 'DELETE', newDataCollection);
            break;
        case 'edit-contacts':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('crm.contacts', 'GETBYID', newDataCollection);
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
        case 'page-list-contacts':
            $('#table-list-contacts tbody').empty();
            dynData.forEach(function (item) {
                var row = $('<tr></tr>');
                row.append('<td>' + item.ContactType + '</td>');
                row.append('<td>' + item.CategoryId + '</td>');
                row.append('<td>' + item.ContactName + '</td>');
                row.append('<td>' + item.ContactPerson + '</td>');
                row.append('<td>' + item.ContactNo + '</td>');
                row.append('<td>' + item.EmailAddress + '</td>');
                row.append('<td>' + item.OfficeAddress + '</td>');
                row.append(`<td>${item.IsActive ? '<i class="fas fa-circle-check text-green"></i>' : '<i class="fas fa-circle-xmark text-red"></i>'}</td>`);
                row.append(`<td><button type="button" class="btn btn-size-sm bg-blue mr-2" data-id='${item.Id}' onclick='PageGoActionEvent("edit-contacts",this);'><i class="fas fa-edit text-white"></i></button><button type="button" class="btn btn-size-sm bg-red mr-2" data-id="${item.Id}" onclick='PageGoShowModal("delete-contacts",this);'><i class="fas fa-trash"></i></button></td>`);
                $('#table-list-contacts tbody').append(row);
            });

            $('#table-list-contacts').ToTable();
            break;
        case 'edit-contacts':
            $('#Id').val(dynData.Id);
            $('#ContactType').val(dynData.ContactType);
            $('#CategoryId').val(dynData.CategoryId);
            $('#ContactName').val(dynData.ContactName);
            $('#ContactPerson').val(dynData.ContactPerson);
            $('#ContactNo').val(dynData.ContactNo);
            $('#EmailAddress').val(dynData.EmailAddress);
            $('#OfficeAddress').val(dynData.OfficeAddress);
            $('#IsActive').prop('checked', dynData.IsActive);
            break;
        case 'delete-contacts':
            $(`#table-list-contacts tbody tr`).filter(function () {
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
        case 'page-entry-contacts':
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
        case 'page-list-contacts':
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
                        $('#page-list-contacts').fadeIn(180);
                    }
                });
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }
            break;
        case 'delete-contacts':
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
        case 'edit-contacts':
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
        case 'delete-contacts':
            Popup.Confirm('Are you sure?', () => PageGoActionEvent(action, sender), () => { });
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}