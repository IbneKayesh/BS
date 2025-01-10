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
    $('#page-button').append(`<button type="button" class="btn btn-size-m bg-darkseagreen"><i class="fas fa-cog"></i></button>`);
    InterfaceBuilder.Table("page-list-business", "tbl_business", "/Areas/Company/Business.json");
    InterfaceBuilder.Form("page-entry-business", "frm_business", "/Areas/Company/Business.json");
});

//function: 1
function PageGoClear(action, sender) {
    switch (action) {
        case 'page-entry-business':
            $('#Id').val('0');
            $('#BusinessLogo').val('');
            $('#BusinessName').val('');
            $('#ShortName').val('');
            $('#OfficeAddress').val('');
            $('#ContactName').val('');
            $('#ContactNo').val('');
            $('#EmailAddress').val('');
            $('#BIN').val('');
            $('#TaxVATNo').val('');
            $('#CountryId').val('-');
            $('#CurrencyId').val('-');
            $('#MaxEmployee').val(1);
            $('#MaxSalary').val(1);
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
            var Id = $('#Id').val().trim();
            if (Id === '') {
                Popup.Show("warning", "Business Id is required, Please reload this page and try again");
                isValid = false;
            }
            var BusinessLogo = $('#BusinessLogo').val().trim();
            var BusinessName = $('#BusinessName').val().trim();
            if (BusinessName === '') {
                Popup.Show("warning", "Business name is required");
                isValid = false;
            }
            var ShortName = $('#ShortName').val().trim();
            var OfficeAddress = $('#OfficeAddress').val().trim();
            var ContactName = $('#ContactName').val().trim();
            var ContactNo = $('#ContactNo').val().trim();
            var EmailAddress = $('#EmailAddress').val().trim();
            var BIN = $('#BIN').val().trim();
            var TaxVATNo = $('#TaxVATNo').val().trim();
            var CountryId = $('#CountryId').val();
            if (CountryId === '' || CountryId === '-' || CountryId === null) {
                Popup.Show("warning", "Country is required");
                isValid = false;
            }
            var CurrencyId = $('#CurrencyId').val();
            if (CurrencyId === '' || CurrencyId === '-' || CurrencyId === null) {
                Popup.Show("warning", "Currency is required");
                isValid = false;
            }

            var MaxEmployee = $('#MaxEmployee').val();
            if (MaxEmployee === '' || parseInt(MaxEmployee) < 1) {
                Popup.Show("warning", "Max Salary is required");
                isValid = false;
            }
            var MaxSalary = $('#MaxSalary').val();
            if (MaxSalary === '' || parseInt(MaxSalary) < 1) {
                Popup.Show("warning", "Max Employee is required");
                isValid = false;
            }
            var IsActive = $('#IsActive').is(':checked');

            newDataCollection = {
                Id: Id,
                BusinessLogo: BusinessLogo,
                BusinessName: BusinessName,
                ShortName: ShortName,
                OfficeAddress: OfficeAddress,
                ContactName: ContactName,
                ContactNo: ContactNo,
                EmailAddress: EmailAddress,
                BIN: BIN,
                TaxVATNo: TaxVATNo,
                CountryId: CountryId,
                CurrencyId: CurrencyId,
                MaxEmployee: MaxEmployee,
                MaxSalary: MaxSalary,
                IsActive: IsActive ? "1" : "0"
            };
            newDataCollection = BindApiBodyInput('Setup.business', Id === '0' ? 'INSERT' : 'UPDATE', newDataCollection);
            break;
        case 'page-list-business':
            newDataCollection = BindApiBodyInput('Setup.business', 'GETALL', newDataCollection);
            break;
        case 'delete-tbl_business':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('Setup.business', 'DELETE', newDataCollection);
            break;
        case 'edit-tbl_business':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('Setup.business', 'GETBYID', newDataCollection);
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
            $('#tbl_business tbody').empty();
            if (dynData[0].ROWS > 0) {
                dynData[0].DynamicData.forEach(function (item) {
                    var row = $('<tr></tr>');
                    row.append('<td>' + item.Id + '</td>');
                    row.append('<td>' + item.BusinessLogo + '</td>');
                    row.append('<td>' + item.BusinessName + '</td>');
                    row.append('<td>' + item.ShortName + '</td>');
                    row.append('<td>' + item.OfficeAddress + '</td>');
                    row.append('<td>' + item.ContactName + '</td>');
                    row.append('<td>' + item.ContactNo + '</td>');
                    row.append('<td>' + item.EmailAddress + '</td>');
                    row.append('<td>' + item.BIN + '</td>');
                    row.append('<td>' + item.TaxVATNo + '</td>');
                    row.append('<td>' + item.CountryId + '</td>');
                    row.append('<td>' + item.CurrencyId + '</td>');
                    row.append('<td>' + item.MaxEmployee + '</td>');
                    row.append('<td>' + item.MaxSalary + '</td>');
                    row.append(`<td>${item.IsActive ? '<i class="fas fa-circle-check text-green"></i>' : '<i class="fas fa-circle-xmark text-red"></i>'}</td>`);
                    row.append(`<td><button type="button" class="btn btn-size-sm bg-blue mr-2" data-id='${item.Id}' onclick='PageGoActionEvent("page-edit-business",this);'><i class="fas fa-edit text-white"></i></button><button type="button" class="btn btn-size-sm bg-red mr-2" data-id="${item.Id}" onclick='PageGoShowModal("delete-business",this);'><i class="fas fa-trash"></i></button></td>`);
                    $('#tbl_business tbody').append(row);
                });
            }

            $('#tbl_business').ToTable();
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
                            Popup.Show("success", "Request submitted successfully");
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
                                InterfaceBuilder.TableFill('tbl_business', parsedData.EQResult[0].DynamicData);
                                $('#tbl_business').ToTable();
                                list_business = parsedData.EQResult[0].DynamicData;
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
        case 'delete-tbl_business':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                BusyBox.Busy(sender, '');
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS) {
                            InterfaceBuilder.TableRowRemove('tbl_business', $(sender).data('id'));
                            Popup.Show("success", "Request submitted successfully");
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
        case 'edit-tbl_business':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS) {
                            InterfaceBuilder.FormFill('page-entry-business', parsedData.EQResult[0].DynamicData[0]);
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
        case 'delete-tbl_business':
            Popup.Confirm('Are you sure?', () => PageGoActionEvent(action, sender), () => { });
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}