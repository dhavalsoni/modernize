const inputname = document.getElementById('name');
  const form = document.getElementById('contactForm');
  const phoneInput = document.getElementById('phone');
  const submitBtn = document.getElementById('submitBtn');
  let submitted = false;


  // Name Validation - Min 2 charcter + only character allowed
  inputname.addEventListener('keypress', function (e) {
    if (!/[A-Za-z]/.test(e.key)) {
      e.preventDefault();
    }
  });
  function isNameValid(value) {
    return value.trim().length >= 2;
  }

  // Phone mask
  phoneInput.addEventListener('keypress', function (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });

  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '').substring(0, 10);
    const area = value.substring(0, 3);
    const middle = value.substring(3, 6);
    const last = value.substring(6, 10);

    if (value.length > 6) {
      e.target.value = `(${area}) ${middle}-${last}`;
    } else if (value.length > 3) {
      e.target.value = `(${area}) ${middle}`;
    } else if (value.length > 0) {
      e.target.value = `(${area}`;
    }
  });  

 

  function isPhoneValid(value) {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
  }

  function isEmailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateField(input, validatorFn) {
    const valid = validatorFn(input.value);
    input.classList.toggle('error', !valid);
    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitted) return;

    const name = document.getElementById('name');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');

    const valid =
      validateField(name, isNameValid) &
      validateField(phone, isPhoneValid) &
      validateField(email, isEmailValid);

    if (!valid) return;

    const formData = {
      name: name.value,
      city: city.value,
      state: state.value,
      phone: phone.value,
      email: email.value,
    };

    function validateField(input, validatorFn) {
      const valid = validatorFn(input.value);
      input.classList.toggle('error', !valid);
      return valid;
    }

    console.log("Form data:", formData);

    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Submit via AJAX
    fetch('https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),      
    }).finally(() => {
      submitBtn.textContent = 'Submitted';
    submitted = true;    
    });
  });