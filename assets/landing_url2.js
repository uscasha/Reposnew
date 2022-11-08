window.addEventListener('DOMContentLoaded', function () {
    const address = window.location.origin + window.location.pathname;
    const lUrl = document.getElementById('lUrl');

    lUrl.value = `${address}`;
    // console.log(address);
})