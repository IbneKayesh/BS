/***
    Author : Md. Ibne Kayesh
    License: MIT
    Version : 1.0.0
    Date: Oct - 2024
    Inspired from Bootstrap, Tailwind CSS and jQuery
 ***/
//function: 0
$(document).ready(function () {
    $('#page-title').text('Unit');
    $('#table-list-unit').ToTable();
    PageGoActionEvent('UnitId', '');
});

//function: 1
function PageGoClear(action, sender) {
    switch (action) {
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
            isValid &= ValidateInputField('#ProductId', value => value === '', "Product Name is required");
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
        case 'delete-unit':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('inventory.unit', 'DELETE', newDataCollection);
            break;
        case 'edit-unit':
            newDataCollection = {
                Id: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('inventory.unit', 'GETBYID', newDataCollection);
            break;
        case 'UnitId':
            newDataCollection = BindApiBodyInput('inventory.unit', 'GETALLPARENT', newDataCollection);
            break;
        case 'add-to-cart1':
            newDataCollection = BindApiBodyInput('inventory.unit', 'GETALL', newDataCollection);
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
            var row = $('<tr></tr>');
            row.append('<td class="d-none">' + dynData.ProductId + '</td>');
            row.append('<td>' + dynData.ProductName + '</td>');
            row.append('<td class="text-right">' + dynData.ProductQty + '</td>');
            row.append('<td class="text-right">' + dynData.ProductRate + '</td>');
            row.append('<td class="text-right">' + dynData.ProductAmount + '</td>');
            row.append('<td>' + dynData.ProductNote + '</td>');
            row.append(`<td><button type="button" class="btn btn-size-sm bg-crimson" onclick="PageGoShowModal('table-list-product-row-remove',this);"><i class="fas fa-trash"></i></button></td>`);
            $('#table-list-product tbody').append(row);
            PageGoBindHTML('table-list-product-row-sum', '', sender);
            PageGoClear('search-purchase-item', sender);
            $('#ProductName')[0].focus();
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
            } else {
                $('#page-payment').addClass('d-none');
            }
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
        case 'delete-unit':
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
        case 'edit-unit':
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
        case 'UnitId':
            const UnitIdDdl = $('#UnitId');
            UnitIdDdl.empty();
            UnitIdDdl.append($('<option>', {
                value: '-',
                text: "-Select-"
            }));
            UnitIdDdl.append($('<option>', {
                value: '0',
                text: "No Parent"
            }));
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        if (parsedData.SUCCESS) {
                            parsedData.EQResult[0].DynamicData.forEach(function (item) {
                                UnitIdDdl.append($('<option>', {
                                    value: item.Id,
                                    text: item.UnitName
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