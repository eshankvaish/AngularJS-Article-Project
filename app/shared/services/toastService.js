/**
 * @param {Function} $timeout AngularJS built-in timeout function
 * @param {Object} TOAST_CONSTANTS Object of Toast Constants
 * @return {Object} toast An object with setToast function to add a toast
 */
export default function toastService($timeout, TOAST_CONSTANTS) {
    let toast = {
        isActive: false,
        title: '',
        class: '',
    }

    toast.setToast = function(type, title, timer = TOAST_CONSTANTS.DEFAULT_TOAST_TIMER) {
        switch (type) {
            case TOAST_CONSTANTS.SUCCESS:
                toast.class = TOAST_CONSTANTS.SUCCESS;
                break;
            case TOAST_CONSTANTS.ERROR:
                toast.class = TOAST_CONSTANTS.ERROR;
                break;
            default:
                toast.class = TOAST_CONSTANTS.INFO;
        };
        toast.title = title;
        toast.isActive = true;
        $timeout(function() {
            toast.isActive = false;
        }, timer);
    }

    return toast;
}
