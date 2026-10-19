/* ==========================================================================
   Shared Form Validation Helpers - Borrowly
   Beginner-friendly validation utilities with inline error rendering
   ========================================================================== */

// Helper: Show error on an input field
function showError(inputElement, message) {
  if (!inputElement) return;
  inputElement.classList.add('input-error');
  var errorElem = inputElement.parentElement.querySelector('.form-error');
  if (errorElem) {
    errorElem.textContent = message;
    errorElem.classList.add('is-visible');
  }
}

// Helper: Clear error on an input field
function clearError(inputElement) {
  if (!inputElement) return;
  inputElement.classList.remove('input-error');
  var errorElem = inputElement.parentElement.querySelector('.form-error');
  if (errorElem) {
    errorElem.textContent = '';
    errorElem.classList.remove('is-visible');
  }
}

// Attach auto-clear on input or change
function bindAutoClear(form) {
  if (!form) return;
  var fields = form.querySelectorAll('input, select, textarea');
  fields.forEach(function (field) {
    field.addEventListener('input', function () {
      clearError(field);
    });
    field.addEventListener('change', function () {
      clearError(field);
    });
  });
}

// Validate required text field
function validateRequired(field, fieldName) {
  if (!field) return true;
  var val = field.value.trim();
  if (val === '') {
    showError(field, fieldName + ' is required.');
    return false;
  }
  clearError(field);
  return true;
}

// Validate email format
function validateEmail(field) {
  if (!field) return true;
  var email = field.value.trim();
  if (email === '') {
    showError(field, 'Email is required.');
    return false;
  }
  // Standard simple regex for email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError(field, 'Please enter a valid email address.');
    return false;
  }
  clearError(field);
  return true;
}

// Validate password (min 8 characters)
function validatePassword(field) {
  if (!field) return true;
  var pwd = field.value;
  if (pwd.length === 0) {
    showError(field, 'Password is required.');
    return false;
  }
  if (pwd.length < 8) {
    showError(field, 'Password must be at least 8 characters long.');
    return false;
  }
  clearError(field);
  return true;
}

// Validate password confirmation match
function validatePasswordMatch(pwdField, confirmField) {
  if (!confirmField) return true;
  if (confirmField.value !== pwdField.value) {
    showError(confirmField, 'Passwords do not match.');
    return false;
  }
  clearError(confirmField);
  return true;
}

// Validate daily price (> 0 in PKR)
function validateDailyPrice(field) {
  if (!field) return true;
  var val = parseFloat(field.value);
  if (isNaN(val) || val <= 0) {
    showError(field, 'Daily price must be a valid number greater than 0 PKR.');
    return false;
  }
  clearError(field);
  return true;
}

// Validate max length
function validateMaxLength(field, max, fieldName) {
  if (!field) return true;
  if (field.value.trim().length > max) {
    showError(field, fieldName + ' must be ' + max + ' characters or fewer.');
    return false;
  }
  clearError(field);
  return true;
}

// Validate date range: start not in past (today allowed), end not before start
function validateDateRange(startField, endField) {
  var isValid = true;
  if (!startField || !endField) return true;

  var startVal = startField.value;
  var endVal = endField.value;

  if (!startVal) {
    showError(startField, 'Start date is required.');
    isValid = false;
  } else {
    // Check start date is not earlier than today (midnight comparison)
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var startDate = new Date(startVal + 'T00:00:00');
    if (startDate < today) {
      showError(startField, 'Start date cannot be in the past.');
      isValid = false;
    } else {
      clearError(startField);
    }
  }

  if (!endVal) {
    showError(endField, 'End date is required.');
    isValid = false;
  } else if (startVal) {
    var startDate = new Date(startVal + 'T00:00:00');
    var endDate = new Date(endVal + 'T00:00:00');

    if (endDate < startDate) {
      showError(endField, 'End date cannot be earlier than start date.');
      isValid = false;
    } else {
      clearError(endField);
    }
  }

  return isValid;
}

// Setup live character counter for a textarea/input
function setupCharCounter(inputField, counterElem, max) {
  if (!inputField || !counterElem) return;

  function update() {
    var len = inputField.value.length;
    counterElem.textContent = len + ' / ' + max + ' characters';
    if (len >= max) {
      counterElem.classList.add('is-limit');
    } else {
      counterElem.classList.remove('is-limit');
    }
  }

  inputField.addEventListener('input', update);
  update();
}

// Show green success alert at top of form container
function showSuccessAlert(container, message) {
  if (!container) return;
  // Remove existing alert if present
  var existing = container.querySelector('.alert--success');
  if (existing) existing.remove();

  var alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert--success';
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <div>${message}</div>
  `;

  container.prepend(alertDiv);
  alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
