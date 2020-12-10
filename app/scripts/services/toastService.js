export default function toastService($timeout, TOAST_CONSTANTS) {
    let toast = {
        isActive: false,
        title: '',
        class: '',
    }

    toast.setToast = function(type, title, timer = 8000) {
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
