// possible icons : question , error, warning, success

function showSwal(title, text, icon = "success", footer = "") {
    Swal.fire({
        icon,
        title,
        text,
        footer,
    });
}

function showSwalCallback(title, timer, callback, icon = "success")
{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon,
        title
    });

    callback();
}

function showSwalTimer(title, timer, icon = "success")
{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon,
        title
    });

}
