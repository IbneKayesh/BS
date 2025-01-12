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
    PageGoActionEvent('UnitId', '');
    PageGoActionEvent('CategoryId', '');
    PageGoActionEvent('BrandId', '');
});

//function: 1
function PageGoClear(action, sender) {
    switch (action) {
        case 'page-entry-products':
            $('#Id').val('0');
            $('#BarCode').val('');
            $('#ProductName').val('');
            $('#UnitId').val('-');
            $('#CategoryId').val('-');
            $('#BrandId').val('-');
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
        case 'page-entry-products':
            isValid &= ValidateInputField('#Id', value => value === '', "Id is required, Please reload this page and try again");
            isValid &= ValidateInputField('#BarCode', value => value === '', "Bar Code is required");
            isValid &= ValidateInputField('#ProductName', value => value === '', "Product Name is required");
            isValid &= ValidateInputField('#UnitId', value => value === '' || value === '-' || value === null, "Unit is required");
            isValid &= ValidateInputField('#CategoryId', value => value === '' || value === '-' || value === null, "Category is required");
            isValid &= ValidateInputField('#BrandId', value => value === '' || value === '-' || value === null, "Brand is required");

            newDataCollection = {
                Id: $('#Id').val().trim(),
                BarCode: $('#BarCode').val().trim(),
                ProductName: $('#ProductName').val().trim(),
                UnitId: $('#UnitId').val(),
                CategoryId: $('#CategoryId').val(),
                BrandId: $('#BrandId').val(),
                IsActive: $('#IsActive').is(':checked') ? "1" : "0"
            };
            newDataCollection = BindApiBodyInput('inventory.products', $('#Id').val().trim() === '0' ? 'INSERT' : 'UPDATE', newDataCollection);
            break;
        case 'page-list-products':
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
        case 'UnitId':
            newDataCollection = BindApiBodyInput('inventory.unit', 'GETALLCHILD', newDataCollection);
            break;
        case 'CategoryId':
            newDataCollection = BindApiBodyInput('inventory.category', 'GETALL', newDataCollection);
            break;
        case 'BrandId':
            newDataCollection = BindApiBodyInput('inventory.brand', 'GETALL', newDataCollection);
            break;
        case 'branch-products':
            newDataCollection = {
                ProductId: $(sender).data('id')
            }
            newDataCollection = BindApiBodyInput('inventory.branch-products', 'GETBYPRODUCTID', newDataCollection);
            break;

        case 'table-branch-products':
            var newDataCollection_bulk = [];
            $('#table-branch-products tbody tr').each(function () {
                //creat single array item
                var rowData = {
                    BranchId: $(this).find('td').eq(0).text(),
                    ProductId: $(this).find('td').eq(1).text(), //2 branch name
                    UnitPrice: $(this).find('td').eq(3).find('input[type="text"]').val(), //4 stock
                    ReorderLevel: $(this).find('td').eq(5).find('input[type="text"]').val(), //6 status
                    IsActive: $(this).find('td').eq(7).find('input[type="checkbox"]').is(':checked') ? '0': '1'
                }
                var rowDataArray = BindApiBodyInput('inventory.branch-products', 'INSERTALL', rowData);//default return array, api body resource
                newDataCollection_bulk.push(rowDataArray[0]); //from single array pop 1 item and push to bul
            });
            newDataCollection = newDataCollection_bulk; // set bulk as single item
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
        case 'page-list-products':
            $('#table-list-products tbody').empty();
            dynData.forEach(function (item) {
                var row = $('<tr></tr>');
                row.append('<td>' + item.BarCode + '</td>');
                row.append('<td>' + item.ProductName + '</td>');
                row.append('<td>' + item.UnitName + '</td>');
                row.append('<td>' + item.CategoryName + '</td>');
                row.append('<td>' + item.BrandName + '</td>');
                row.append('<td>' + item.BranchCount + '</td>');
                row.append(`<td>${item.IsActive ? '<i class="fas fa-circle-check text-green"></i>' : '<i class="fas fa-circle-xmark text-red"></i>'}</td>`);
                row.append(`<td><button type="button" class="btn btn-size-sm bg-blue mr-2" data-id='${item.Id}' onclick='PageGoActionEvent("edit-product",this);'><i class="fas fa-edit text-white"></i></button><button type="button" class="btn btn-size-sm bg-red mr-2" data-id="${item.Id}" onclick='PageGoShowModal("delete-product",this);'><i class="fas fa-trash"></i></button><button type="button" class="btn btn-size-sm bg-blue mr-2" data-id="${item.Id}" onclick='PageGoShowModal("branch-products",this);'><i class="fas fa-list"></i></button></td>`);
                $('#table-list-products tbody').append(row);
            });
            $('#table-list-products').ToTable();
            break;
        case 'edit-product':
            $('#Id').val(dynData.Id);
            $('#BarCode').val(dynData.BarCode);
            $('#ProductName').val(dynData.ProductName);
            $('#UnitId').val(dynData.UnitId);
            $('#CategoryId').val(dynData.CategoryId);
            $('#BrandId').val(dynData.BrandId);
            $('#IsActive').prop('checked', dynData.IsActive);
            break;
        case 'delete-product':
            $(`#table-list-products tbody tr`).filter(function () {
                return $(this).find('[data-id="' + dynData + '"]').length > 0;
            }).remove();
            break;
        case 'branch-products':
            $('#table-branch-products tbody').empty();
            dynData.forEach(function (item) {
                var row = $('<tr></tr>');
                row.append('<td class="d-none">' + item.BranchId + '</td>');
                row.append('<td class="d-none">' + item.ProductId + '</td>');
                row.append('<td>' + item.BranchName + '</td>');
                row.append(`<td><input type="text" value='${item.UnitPrice}' /></td>`);
                row.append('<td>' + item.StockQty + '</td>');
                row.append(`<td><input type="text" value='${item.ReorderLevel}' /></td>`);
                row.append(`<td>${item.IsActive ? '<i class="fas fa-circle-check text-green"></i>' : '<i class="fas fa-circle-xmark text-red"></i>'}</td>`);
                row.append(`<td><input type="checkbox" ${item.IsActive ? '' : 'checked'} /></td>`);
                $('#table-branch-products tbody').append(row);
            });
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
        case 'page-entry-products':
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
        case 'page-list-products':
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
                        $('#page-list-products').fadeIn(180);
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
        case 'UnitId':
            const UnitIdDdl = $('#UnitId');
            UnitIdDdl.empty();
            UnitIdDdl.append($('<option>', {
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
        case 'CategoryId':
            const CategoryIdDdl = $('#CategoryId');
            CategoryIdDdl.empty();
            CategoryIdDdl.append($('<option>', {
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
                                CategoryIdDdl.append($('<option>', {
                                    value: item.Id,
                                    text: item.CategoryName
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
        case 'BrandId':
            const BrandIdDdl = $('#BrandId');
            BrandIdDdl.empty();
            BrandIdDdl.append($('<option>', {
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
                                BrandIdDdl.append($('<option>', {
                                    value: item.Id,
                                    text: item.BrandName
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
        case 'branch-products':
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
                        $('#page-list-products').fadeIn(180);
                    }
                });
            } else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }
            break;
        case 'table-branch-products':
            var validationSummary = PageGoValidateInput(action, sender);
            if (validationSummary.isValid) {
                BusyBox.Busy(sender, '');
                console.log(validationSummary);
                AjaxRequestJson({
                    data: JSON.stringify(validationSummary.newDataCollection),
                    success: function (data, status, xhr) {
                        var parsedData = JSON.parse(data);
                        console.log(parsedData);
                    },
                    error: function (xhr) {
                        Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText + ', ' + xhr.responseText);
                    },
                    complete: function () {
                        BusyBox.Reset(sender);
                        $('#page-list-products').fadeIn(180);
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

        case 'branch-products':
            $(sender).removeClass("bg-blue").addClass("bg-dimgrey");
            $(`#branch-products`).fadeIn(300);
            $('#branch-products .modal-title').text('Product Branch');
            PageGoActionEvent(action, sender);
            break;

        default:
            Popup.Show('error', 'Invalid action called');
            break;
    }
}