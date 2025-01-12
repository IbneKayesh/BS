//function: 0
$(document).ready(function () {
    $('#page-title').text('Branch');
    $('#page-button').append(`<button type="button" class="btn btn-size-m bg-darkseagreen"><i class="fas fa-cog"></i> Branch</button>`);
    $('#table-list-branch').ToTable();
    PageGoActionEvent('BusinessId','');
});

//function: 1
function PageGoClear(action, sender) {
    switch (action) {
        case 'page-entry-branch':
            $('#Id').val('0');
            $('#BusinessId').val('-');
            $('#BranchName').val('');
            $('#OfficeAddress').val('');
            $('#ContactName').val('');
            $('#ContactNo').val('');
            $('#EmailAddress').val('');
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
        case 'page-entry-branch':
            isValid &= ValidateInputField('#Id', value => value === '', "Id is required, Please reload this page and try again");
            isValid &= ValidateInputField('#BusinessId', value => value === '' || value === '-' || value === null, "Business is required");
            isValid &= ValidateInputField('#BranchName', value => value === '', "Branch Name is required");
            
            newDataCollection = {
                Id: $('#Id').val().trim(),
                BusinessId: $('#BusinessId').val(),
                BranchName: $('#BranchName').val().trim(),
                OfficeAddress: $('#OfficeAddress').val().trim(),
                ContactName: $('#ContactName').val().trim(),
                ContactNo: $('#ContactNo').val().trim(),
                EmailAddress: $('#EmailAddress').val().trim(),
                StartDate: $('#StartDate').val() || new Date(),
                IsActive: $('#IsActive').is(':checked') ? "1" : "0"
            };
            newDataCollection = BindApiBodyInput('company.branch', $('#Id').val().trim() === '0' ? 'INSERT' : 'UPDATE', newDataCollection);
            break;
        case 'page-list-branch':
            newDataCollection = BindApiBodyInput('company.branch', 'GETALL', newDataCollection);
            break;
        case 'delete-branch':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('company.branch', 'DELETE', newDataCollection);
            break;
        case 'edit-branch':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('company.branch', 'GETBYID', newDataCollection);
            break;
        case 'BusinessId':
            newDataCollection = BindApiBodyInput('company.business', 'GETALL', newDataCollection);
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
        case 'page-list-branch':
            $('#table-list-branch tbody').empty();
            dynData.forEach(function (item) {
                var row = $('<tr></tr>');
                row.append('<td>' + item.BusinessName + '</td>');
                row.append('<td>' + item.BranchName + '</td>');
                row.append('<td>' + item.OfficeAddress + '</td>');
                row.append('<td>' + item.ContactName + '</td>');
                row.append('<td>' + item.ContactNo + '</td>');
                row.append('<td>' + item.EmailAddress + '</td>');
                row.append('<td>' + FormatStringToDateOnly(item.StartDate) + '</td>');
                row.append(`<td>${item.IsActive ? '<i class="fas fa-circle-check text-green"></i>' : '<i class="fas fa-circle-xmark text-red"></i>'}</td>`);
                row.append(`<td><button type="button" class="btn btn-size-sm bg-blue mr-2" data-id='${item.Id}' onclick='PageGoActionEvent("edit-branch",this);'><i class="fas fa-edit text-white"></i></button><button type="button" class="btn btn-size-sm bg-red mr-2" data-id="${item.Id}" onclick='PageGoShowModal("delete-branch",this);'><i class="fas fa-trash"></i></button></td>`);
                $('#table-list-branch tbody').append(row);
            });
            break;
        case 'edit-branch':
            $('#Id').val(dynData.Id);
            $('#BusinessId').val(dynData.BusinessId);
            $('#BranchName').val(dynData.BranchName);
            $('#OfficeAddress').val(dynData.OfficeAddress);
            $('#ContactName').val(dynData.ContactName);
            $('#ContactNo').val(dynData.ContactNo);
            $('#EmailAddress').val(dynData.EmailAddress);
            $('#StartDate').val(FormatStringToDateOnly(dynData.StartDate)); //for date only
            $('#IsActive').prop('checked', dynData.IsActive);
            break;
        case 'delete-branch':
            $(`#table-list-branch tbody tr`).filter(function () {
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
        case 'page-entry-branch':
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
        case 'page-list-branch':
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
                        $('#page-list-branch').fadeIn(180);
                    }
                });
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }
            break;
        case 'delete-branch':
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
        case 'edit-branch':
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
        case 'BusinessId':
            const BusinessIdDdl = $('#BusinessId');
            BusinessIdDdl.empty();
            BusinessIdDdl.append($('<option>', {
                value: '-',
                text: "-Select-"
            }));
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS) {
                            parsedData.EQResult[0].DynamicData.forEach(function (item) {
                                BusinessIdDdl.append($('<option>', {
                                    value: item.Id,
                                    text: item.BusinessName
                                }));
                            });

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
        case 'delete-branch':
            Popup.Confirm('Are you sure?', () => PageGoActionEvent(action, sender), () => { });
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}