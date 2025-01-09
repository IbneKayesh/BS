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
    $('#page-footer').text('Business');
    //InterfaceBuilder.Table("page-list-business", "tbl_business", "/Areas/Company/Business.json");
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
            Popap.Show('info', 'Page cleared');
            break;

        default:
            Popap.Show('error', 'Invalid action called');
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
                Popap.Show("warning", "Business Id is required, Please reload this page and try again");
                isValid = false;
            }
            var BusinessLogo = $('#BusinessLogo').val().trim();
            var BusinessName = $('#BusinessName').val().trim();
            if (BusinessName === '') {
                Popap.Show("warning", "Business name is required");
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
                Popap.Show("warning", "Country is required");
                isValid = false;
            }
            var CurrencyId = $('#CurrencyId').val();
            if (CurrencyId === '' || CurrencyId === '-' || CurrencyId === null) {
                Popap.Show("warning", "Currency is required");
                isValid = false;
            }

            var MaxEmployee = $('#MaxEmployee').val();
            if (MaxEmployee === '' || parseInt(MaxEmployee) < 1) {
                Popap.Show("warning", "Max Salary is required");
                isValid = false;
            }
            var MaxSalary = $('#MaxSalary').val();
            if (MaxSalary === '' || parseInt(MaxSalary) < 1) {
                Popap.Show("warning", "Max Employee is required");
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
                IsActive: IsActive || false
            };

            break;

        default:
            Popap.Show('error', 'Invalid action called');
            break;
    }
    return { isValid, newDataCollection };
}

//function: 3
function PageGoFillInput(action, dynData, sender) {
    switch (action) {
        case 'home-page':

            break;

        default:
            Popap.Show('error', 'Invalid action called');
            break;
    }
}

//function: 4
function GenerateTableHTML(action, dynData, sender) {
    switch (action) {
        case 'home-page':

            break;

        default:
            Popap.Show('error', 'Invalid action called');
            break;
    }
}

//function: 5
function PageGoNext(action, sender) {
    switch (action) {
        case 'page-index':
            window.location.href = '/Home/Index';
            break;

        default:
            Popap.Show('error', 'Invalid action called');
            break;
    }
}

//function: 6
function PageGoActionEvent(action, sender) {
    switch (action) {
        case 'page-entry-business':
            BusyBox.Busy("btn-search", 'Searching');
            setTimeout(() => {
                // Reset button state
                BusyBox.Reset(sender);
                BusyBox.Reset("btn-search");
            }, 9000);

            var validationSummary = PageGoValidateInput("page-entry-business");
            if (validationSummary.isValid) {
                //BusyBox.Show('page-entry-business');
                //BusyBox.Show('page-actions');
                $.ajax({
                    url: 'CreateUpdate',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS) {
                            //PageGoClear('div-page-entry-business');
                            //PageGoActionEvent('div-page-list-business', '0');
                            Popap.Show("success", "Request submitted successfully");
                        } else {
                            Popap.Show("error", parsedData.MESSAGE);
                        }
                    },
                    error: function (xhr) {
                        Popap.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
                    },
                    complete: function (xhr, status) {
                        BusyBox.Hide();


                    }
                });
            } else {
                Popap.Show("error", "Request submission is failed, Fix errors and try again!");
            }


            break;

        default:
    }
}

//function: 7
function PageGoShowModal(action, sender) {
    switch (action) {
        case 'home-page':
            //InterfaceBuilder.ConfigRead("page-config", "tbl_business", "/Areas/Company/Business.json");

            //Popap.Show('success', 'This is a success message!');
            //Popap.Show('warning', 'This is a warning message!');
            //
            //Popap.Show('danger', 'This is a danger message!');

            Popap.Confirm('Are you sure?', yesFunction, () => { });
            break;

        default:
            Popap.Show('error', 'Invalid action called');
            break;
    }
}
// Example Usage:
function yesFunction() {
    Popap.Show('success', 'This is a success message!');
}

function noFunction() {
    Popap.Show('danger', 'This is a danger message!');
}