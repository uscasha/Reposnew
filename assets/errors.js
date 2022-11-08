document.addEventListener("DOMContentLoaded", () => {



  const getParams = () => {
    const url = decodeURIComponent(window.location.search)
    const urlParams = new URLSearchParams(url);
    const params = urlParams.entries();

    let entries = [];

    for (const [key, value] of params) {
      const name = key.replace("errors[", "").replace("][0]", "");
      entries.push({name, value})
    }
    return entries;
  }

  const params = getParams();
  params.forEach(err=>{

    if(
        err.name === 'last_name' ||
        err.name === 'first_name' ||
        err.name === 'email' ||
        err.name === 'phone' ||
        err.name === 'error_code'
    ){
      // $('.test-step').css("display","none")
      // $('.quiz-container_has_results').css("display","block");
      // $('.quiz-container_has_results').css("opacity","1");
    }
  })

  function createMess(err) {
    for (let i of err) {
      const containers = document.querySelectorAll(`input[name="${i.name}"]`)
      for (let container of containers) {
        const x = container.getAttribute('type')
        if (x !== 'hidden'){
          const errMess = document.createElement('div');
          errMess.classList.add('error-message')
          errMess.textContent = i.value;
          if (container) {
            container.classList.add('is-error')
            container.after(errMess)
          }
        }
      }
      const form = document.querySelector('.signup_form')
      const errorCode = document.createElement('div')
      errorCode.classList.add('error-code')
      if (i.name === 'error_code' && i.value !== '409') {
        errorCode.classList.add('error-code')
        errorCode.textContent = 'Server error, please try to send a request later'
        form.appendChild(errorCode)
      }
      if (i.value === '409') {
        errorCode.classList.add('error-code')
        errorCode.textContent = 'You already have an account'
        form.appendChild(errorCode)
      }
      setTimeout(() => {
        errorCode.style.display = 'none'
      }, 10000)

    }
  }

  createMess(params)

  function formListener(formClass){
    document.querySelectorAll(formClass).forEach((form, i)=>{
      form.setAttribute('id', `form${i}`);
      const x = form.getAttribute('id');
      formHandle(`#${x}`);
    })
  }
  formListener('.signup_form');
  function formHandle(selector) {
    let iti = null;
    let hiddenInput = document.querySelector(selector).querySelector('input[name="phone"]');
    const intlTelInputInit = (input) => {
      iti = intlTelInput(input, {
        initialCountry: 'auto',
        autoHideDialCode: false,
        autoPlaceholder: 'aggressive',
        separateDialCode: true,
        nationalMode: false,
        placeholderNumberType: "MOBILE",
        customContainer: 'uk-width-expand',
        preferredCountries: ['us', 'gb', 'ru', 'ua'],
        geoIpLookup: function(callback) {
          fetch('https://ipinfo.io/json', {
            cache: 'reload'
          }).then(response => {
            if ( response.ok ) {
              return response.json()
            }
            throw new Error('Failed: ' + response.status)
          }).then(ipjson => {
            callback(ipjson.country)
          }).catch(e => {
            callback('us')
          })
        },
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js'
      });

      input.addEventListener("keypress", (e) => {
        allowNumbersOnly(e)
      }, false);

      input.addEventListener("input", () => {
        hiddenInput.setAttribute('value', iti.getNumber());
      });
    };
    function allowNumbersOnly(e) {
      var code = (e.which) ? e.which : e.keyCode;
      if (code > 31 && (code < 48 || code > 57)) {
        e.preventDefault();
      }
    }
    document.querySelectorAll(`${selector} [name="phone_raw"]`).forEach(elem => intlTelInputInit(elem));
  }

})
