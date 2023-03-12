import * as bootstrap from 'bootstrap';

$('body').click('#liveToastBtn', function () {
    showFloatingMessage();
});

function showFloatingMessage() {
    $('body').prepend(
    `<div aria-live="polite" aria-atomic="true" class="custom-toast position-relative">
        <div class="toast-container top-0 end-0 p-3">
            <div class="toast align-items-center fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        Hello, world! This is a toast message.
                    </div>
                </div>
            </div>
        </div>
    </div>`
    );

    setTimeout(function () {
        $('.custom-toast').remove();
    }, 2000);
}

export default {
    hello: function () {
        console.log('Hello World!');
    },
};
