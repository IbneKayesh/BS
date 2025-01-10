function PageGoNext(action, dataid) {
    switch (action) {
        case 'interface-business':
            window.location.href = '/Company/Business'
            break;
        case 'interface-branch':
            window.location.href = '/Company/Branch'
            break;
        case 'page-button':
            window.location.href = '/Home/Buttons'
            break;
        case 'page-input':
            window.location.href = '/Home/Inputs'
            break;
        case 'page-table':
            window.location.href = '/Home/Tables'
            break;
        case 'page-modal':
            window.location.href = '/Home/Modal'
            break;
        case 'page-busybox':
            window.location.href = '/Home/BusyBox'
            break;
        case 'page-tab':
            window.location.href = '/Home/TabbedPage'
            break;

        default:
            alert('Invalid action called');
            break;
    }
}