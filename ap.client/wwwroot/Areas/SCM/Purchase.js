/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inspired from Bootstrap, Tailwind CSS and jQuery
 ***/

//function: 0
$(document).ready(function () {
    $('#page-title').text('Purchase');
    $('#TrnDate').val(FormatStringToDateOnly(new Date()));
    PageGoActionEvent('BranchId', this);
});

//function: 1
function PageGoClear(action, sender) {
    switch (action) {
        case 'page-entry-purchase':
            $('#BranchId').val('-');
            $('#ContactId').val('');
            $('#ContactName').val('');
            $('#TrnType').val('-');
            $('#TrnNo').val('');
            $('#TrnDate').val(FormatStringToDateOnly(new Date()));
            $('#RefTrn').val('');
            $('#PoNote').val('');
            $('#IsActive').prop('checked', false);
            break;
        case 'search-purchase-item':
            $('#ProductId').val('');
            $('#ProductName').val('');
            $('#ProductQty').val('1');
            $('#ProductRate').val('');
            $('#ProductAmount').val('0');
            $('#ProductNote').val('');
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
        case 'search-purchase-item':
            isValid &= ValidateInputField('#BranchId', value => value === '' || value === '-' || value === null, "Branch is required");
            isValid &= ValidateInputField('#ProductName', value => value === '', "Product Name is required");
            newDataCollection = {
                BranchId: $('#BranchId').val(),
                ProductId: $('#ProductName').val().trim(),
            };
            newDataCollection = BindApiBodyInput('inventory.branch-products', 'GETPURCHASEPRODUCTS', newDataCollection);
            break;
        case 'add-to-cart':
            isValid &= ValidateInputField('#ProductId', value => value === '', "Product is required");
            isValid &= ValidateInputField('#ProductName', value => value === '', "Product Name is required");
            isValid &= ValidateInputField('#ProductQty', value => value === '' || parseInt(value) <= 0, "Qty is required");
            isValid &= ValidateInputField('#ProductRate', value => value === '' || parseInt(value) < 0, "Rate is required");
            isValid &= ValidateInputField('#ProductAmount', value => value === '' || parseInt(value) < 0, "Amount is required");
            newDataCollection = {
                ProductId: $('#ProductId').val().trim(),
                ProductName: $('#ProductName').val().trim(),
                ProductQty: $('#ProductQty').val().trim(),
                ProductRate: $('#ProductRate').val().trim(),
                ProductAmount: $('#ProductAmount').val().trim(),
                ProductNote: $('#ProductNote').val().trim(),
            };
            break;
        case 'table-list-product-duplicate':
            let isUniqueItem = true;
            var ProductId = $('#ProductId').val().trim();
            $(`#table-list-product tbody tr`).each(function () {
                const cellText = $(this).find('td:eq(0)').text().trim();
                if (cellText === ProductId) {
                    isUniqueItem = false;
                    return false; // Break out of the loop
                }
            });
            isValid = isUniqueItem;
            break
        case 'page-entry-product':
            isValid &= ValidateInputField('#BranchId', value => value === '' || value === '-' || value === null, "Branch is required");
            isValid &= ValidateInputField('#ContactId', value => value === '' || value === '-' || value === null, "Supplier Contact is required");
            isValid &= ValidateInputField('#TrnType', value => value === '' || value === '-' || value === null, "Transaction Type is required");
            isValid &= ValidateInputField('#TrnDate', value => value === '', "Date is required");
            var poStatus = $('#IsActive').is(':checked') ? "Posted" : "Not Posted";
            var poMaster = $("#TrnType option:selected").text() + " - " + $('#ContactName').val() + " (" + poStatus + ")";
            newDataCollection = {
                POMaster: poMaster
            }
            break;
        case 'ContactName':
            isValid &= ValidateInputField('#ContactName', value => value === '', "Supplier Contact is required");
            newDataCollection = {
                ContactName: $(sender).val()
            }
            newDataCollection = BindApiBodyInput('crm.contacts', 'GETSUPPLIERBYNAME', newDataCollection);
            break;
        case 'BranchId':
            newDataCollection = BindApiBodyInput('company.branch', 'GETALL', newDataCollection);
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
        case 'add-to-cart':
            var validationSummary = PageGoValidateInput('table-list-product-duplicate', sender);
            if (validationSummary.isValid) {
                addProductToTable();
            } else {
                Popup.Confirm('Product is already added, Do you want to add duplicate?', () => {
                    addProductToTable();
                },
                    () => {
                        return;
                    });
            }

            // Function to add the product row to the table
            function addProductToTable() {
                var row = $('<tr></tr>');
                row.append('<td class="d-none">' + dynData.ProductId + '</td>');
                row.append('<td>' + dynData.ProductName + '</td>');
                row.append('<td class="text-right">' + dynData.ProductQty + '</td>');
                row.append('<td class="text-right">' + dynData.ProductRate + '</td>');
                row.append('<td class="text-right">' + dynData.ProductAmount + '</td>');
                row.append('<td>' + dynData.ProductNote + '</td>');
                row.append(
                    `<td><button type="button" class="btn btn-size-sm bg-crimson" onclick="PageGoShowModal('table-list-product-row-remove', this);"><i class="fas fa-trash"></i></button></td>`
                );

                $('#table-list-product tbody').append(row);
                PageGoBindHTML('table-list-product-row-sum', '', sender);
                PageGoClear('search-purchase-item', sender);
                $('#ProductName')[0].focus();
            }

            break;
        case 'table-list-product-row-remove':
            $(sender).parents("tr").remove();
            PageGoBindHTML('table-list-product-row-sum', '', sender);
            break;
        case 'table-list-product-row-sum':
            var totalQty = 0;
            var totalAmt = 0;
            $('#table-list-product tbody tr').each(function () {
                var qty = parseFloat($(this).find('td:eq(2)').text()) || 0;
                var amt = parseFloat($(this).find('td:eq(4)').text()) || 0;
                totalQty += qty;
                totalAmt += amt;
            });
            $('.table-footer-qty').text(totalQty.toFixed(2));
            $('.table-footer-amt').text(totalAmt.toFixed(2));
            PageGoNext('page-payment', sender);
            $('#TotalAmount').val(totalAmt.toFixed(2));
            $('#PayAmount').val(totalAmt.toFixed(2));
            break;
        case 'page-cart-checkout':
            $('#table-cart-checkout tbody').empty();
            var tableBody = "";
            tableBody += "<tr><th colspan='2'><h5>" + $("#BranchId option:selected").text() + "</h5></th></tr>";
            tableBody += "<tr><th colspan='2'><h3>" + $("#ContactName").val() + "</h3></th></tr>";
            tableBody += "<tr><th colspan='2'><h6>" + FormatStringToDateOnly($('#TrnDate').val()) + "</h6></th></tr>";
            tableBody += `<tr><th colspan='2'><h5>${$("#TrnType option:selected").text()} ${$('#IsActive').is(':checked') ? "<span class='text-green'>(Posted)</span>" : "<span class='text-crimson'>(Not Posted)</span>"}</h5></th></tr>`
            tableBody += `<tr><td colspan="2"></td></tr>`;
            $('#table-list-product tbody tr').each(function () {
                var itemName = $(this).find('td:eq(1)').text();
                var itemQty = parseFloat($(this).find('td:eq(2)').text()).toFixed(2);
                var itemRate = parseFloat($(this).find('td:eq(3)').text()).toFixed(2);
                var itemAmount = parseFloat($(this).find('td:eq(3)').text()).toFixed(2);
                tableBody += `<tr><td class="text-right w-50">${itemName} ${itemQty} x ${itemRate}</td><td class="text-strong">= ${itemAmount}/-</td></tr>`;
            });
            tableBody += `<tr><td colspan="2"></td></tr>`;
            tableBody += `<tr><td class="text-right w-50">Total </td><td class="text-strong">= ${$('#TotalAmount').val()}/- (BDT)</td></tr>`;

            tableBody += `<tr><td class="text-right w-50">Payment </td><td class="text-strong">= ${$('#PayAmount').val()}/- by ${$("#PaymentType option:selected").text()}</td></tr>`;

            var isPaid = $('#IsPaid').is(':checked');
            if (!isPaid) {
                tableBody += `<tr><td class="text-right w-50">Due </td><td class="text-strong">= ${$('#DueAmount').val()}/- <span class="text-crimson">(Unpaid)</span></td></tr>`;
            } else {
                tableBody += `<tr><td class="text-right w-50">Due </td><td class="text-strong">= <span class="text-green">Paid</span></td></tr>`;
            }
            var costAmount = $('#CostAmount').val();
            if (parseFloat(costAmount) > 0) {
                tableBody += `<tr><td class="text-right w-50">Additional Cost </td><td class="text-strong">= <span class="text-crimson">${parseFloat(costAmount).toFixed(2)}</span></td></tr>`;
            }
            tableBody += `<tr><td colspan="2" class="text-center"><button type="button" class="btn btn-size-sm bg-blue mr-2" onclick="PageGoNext('page-po-master',this);"><i class="fas fa-circle-chevron-left"></i> Back to Entry</button><button type="button" class="btn btn-size-xl bg-green" onclick="PageGoActionEvent('page-entry-purchase',this);"><i class="fas fa-circle-check"></i> Submit</button></td></tr>`;
            $('#table-cart-checkout tbody').append(tableBody);
            break;
        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}

//function: 4
function PageGoNext(action, sender) {
    switch (action) {
        case 'page-payment':
            if ($('#table-list-product tbody tr').length > 0) {
                $('#page-payment').removeClass('d-none');
                $('#page-list-product').removeClass("d-none");
            } else {
                $('#page-payment').addClass('d-none');
                $('#page-list-product').addClass("d-none");
            }
            break;
        case 'page-entry-product':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                $('#page-entry-purchase').fadeOut(150);
                $('#page-entry-purchase-short').fadeIn(150);
                $('#page-entry-purchase-short').html(validationSummary.newDataCollection.POMaster);
                $('#page-actions').fadeOut(150);
                //for only once
                $('#page-entry-product').removeClass("d-none");
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }
            break;
        case 'page-entry-purchase':
            $('#page-entry-purchase').fadeIn(100);
            $('#page-entry-purchase-short').fadeOut(100);
            $('#page-entry-purchase-short').html('');
            $('#page-actions').fadeIn(100);
            break;
        case 'page-cart-checkout':
            var DueAmount = parseFloat($('#DueAmount').val()) || 0;
            var isPaid = $('#IsPaid').is(':checked');
            if (!isPaid && DueAmount === 0) {
                Popup.Show('warn', 'Enter Payment Amount');
            } else {
                $('#page-cart-checkout').removeClass("d-none");
                $('#page-po-master').addClass("d-none");
                PageGoBindHTML(action, '', sender);            }
            break;
        case 'page-po-master':
            $('#page-cart-checkout').addClass("d-none");
            $('#page-po-master').removeClass("d-none");
            break;
        case 'page-new':
            location.reload();
            break;
        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}

//function: 5
function PageGoActionEvent(action, sender) {
    switch (action) {
        case 'search-purchase-item':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        //reset
                        PageGoClear('search-purchase-item', sender);
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS && parsedData.TABLES > 0) {
                            if (parsedData.EQResult[0].ROWS == 1) {
                                $('#ProductId').val(parsedData.EQResult[0].DynamicData[0].Id);
                                $('#ProductName').val(`${parsedData.EQResult[0].DynamicData[0].ProductName} (${parsedData.EQResult[0].DynamicData[0].UnitName})`);
                                $('#ProductQty').val('1');
                                $('#ProductRate').val(parsedData.EQResult[0].DynamicData[0].SalesPrice);
                                $('#ProductQty')[0].focus();
                                //line calculate
                                PageGoActionEvent('product-amount', sender);
                            } else {
                                new SearchGrid({
                                    title: 'Purchase Products',
                                    colAll: 'Id,BarCode,ProductName,UnitName,CategoryName,BrandName,SalesPrice,StockQty,ReorderLevel',
                                    colTitle: 'BarCode,Product Name,Unit,Category,Brand,Sales Price,Stock,Reorder Level',
                                    colHidden: 'Id',
                                    rowMultiSelect: false,
                                    data: parsedData.EQResult[0].DynamicData,
                                    onSelect: function (selectedRows) {
                                        var singleItem = selectedRows[0];
                                        $('#ProductId').val(singleItem.Id);
                                        $('#ProductName').val(`${singleItem.ProductName} (${singleItem.UnitName})`);
                                        $('#ProductQty').val('1');
                                        $('#ProductRate').val(singleItem.SalesPrice);
                                        $('#ProductQty')[0].focus();
                                        //line calculate
                                        PageGoActionEvent('product-amount', sender);
                                    }
                                });
                            }
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
        case 'product-amount':
            var ProductQty = parseFloat($('#ProductQty').val()) || 0;
            var ProductRate = parseFloat($('#ProductRate').val()) || 0;
            $('#ProductAmount').val((ProductQty * ProductRate).toFixed(2));
            break;
        case 'add-to-cart':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                PageGoBindHTML(action, validationSummary.newDataCollection, sender);
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }
            break;
        case 'BranchId':
            const BranchIdDdl = $('#BranchId');
            BranchIdDdl.empty();
            BranchIdDdl.append($('<option>', {
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
                                BranchIdDdl.append($('<option>', {
                                    value: item.Id,
                                    text: item.BranchName
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
        case 'ContactName':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS && parsedData.TABLES > 0) {
                            if (parsedData.EQResult[0].ROWS == 1) {
                                $('#ContactId').val(parsedData.EQResult[0].DynamicData[0].Id);
                                $('#ContactName').val(`${parsedData.EQResult[0].DynamicData[0].ContactName}`);
                            } else {
                                new SearchGrid({
                                    title: 'Supplier Contacts',
                                    colAll: 'Id,ContactName,ContactPerson,ContactNo',
                                    colTitle: 'Contact Name,Contact Person,Contact No',
                                    colHidden: 'Id',
                                    rowMultiSelect: false,
                                    data: parsedData.EQResult[0].DynamicData,
                                    onSelect: function (selectedRows) {
                                        var singleItem = selectedRows[0];
                                        $('#ContactId').val(singleItem.Id);
                                        $('#ContactName').val(singleItem.ContactName);
                                    }
                                });
                            }
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
        case 'payment-amount':
            var TotalAmount = parseFloat($('#TotalAmount').val()) || 0;
            var PayAmount = parseFloat($('#PayAmount').val()) || 0;
            var DueAmount = TotalAmount - PayAmount;
            $('#DueAmount').val((DueAmount).toFixed(2));
            if (DueAmount <= 0) {
                $('#IsPaid').prop('checked', true);
            } else {
                $('#IsPaid').prop('checked', false);
            }
            break;
        case 'page-entry-purchase':
            $('#table-cart-checkout tbody').empty();
            var tableBody = "";
            tableBody += "<tr><th colspan='2'><h3>PO-JAN25-0001 (PO created)</h3></th></tr>";
            tableBody += `<tr><td colspan="2" class="text-center"><button type="button" class="btn btn-size-m bg-blue mr-2" onclick="PageGoNext('page-new',this);"><i class="fas fa-plus"></i> Create a new Purchase</button></td></tr>`;
            $('#table-cart-checkout tbody').append(tableBody);
            Popup.Show("ok", "Transaction saved successfully");
            break;
        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}

//function: 6
function PageGoShowModal(action, sender) {
    switch (action) {
        case 'table-list-product-row-remove':
            Popup.Confirm('Are you sure?', () => PageGoBindHTML(action, '', sender), () => { });
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}

function PageGoCustomEvent(event, action, inputElement) {
    if (event.which === 13) { // Check if Enter key (key code 13) is pressed
        event.preventDefault();
        PageGoActionEvent(action, inputElement)//add-to-cart
    }
}