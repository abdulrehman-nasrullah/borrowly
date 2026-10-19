/* ==========================================================================
   Form Handlers & Page Validation - Borrowly
   Validation and submission handlers for Login, Register, Add/Edit Item, Profile
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  setupLoginForm();
  setupRegisterForm();
  setupItemForm();
  setupProfileForm();
});

// Login Form Handling
function setupLoginForm() {
  var form = document.getElementById('loginForm');
  if (!form) return;

  var emailInput = document.getElementById('loginEmail');
  var passwordInput = document.getElementById('loginPassword');
  var alertContainer = document.getElementById('loginAlertContainer');

  bindAutoClear(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var isEmailValid = validateEmail(emailInput);
    var isPasswordValid = validatePassword(passwordInput);

    if (isEmailValid && isPasswordValid) {
      showSuccessAlert(alertContainer, 'Login successful! Redirecting to your dashboard...');
      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 1000);
    }
  });
}

// Register Form Handling
function setupRegisterForm() {
  var form = document.getElementById('registerForm');
  if (!form) return;

  var nameInput = document.getElementById('registerName');
  var locationInput = document.getElementById('registerLocation');
  var emailInput = document.getElementById('registerEmail');
  var passwordInput = document.getElementById('registerPassword');
  var confirmInput = document.getElementById('registerConfirmPassword');
  var alertContainer = document.getElementById('registerAlertContainer');

  bindAutoClear(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var isNameValid = validateRequired(nameInput, 'Full name');
    var isLocValid = validateRequired(locationInput, 'Location') && validateMaxLength(locationInput, 150, 'Location');
    var isEmailValid = validateEmail(emailInput);
    var isPasswordValid = validatePassword(passwordInput);
    var isConfirmValid = validatePasswordMatch(passwordInput, confirmInput);

    if (isNameValid && isLocValid && isEmailValid && isPasswordValid && isConfirmValid) {
      showSuccessAlert(
        alertContainer,
        'Account created successfully! Welcome to Borrowly. Redirecting to dashboard...'
      );
      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 1200);
    }
  });
}

// Add Item & Edit Item Forms Handling
function setupItemForm() {
  var form = document.getElementById('itemForm');
  if (!form) return;

  var titleInput = document.getElementById('itemTitle');
  var titleCounter = document.getElementById('titleCharCounter');
  var categorySelect = document.getElementById('itemCategory');
  var conditionSelect = document.getElementById('itemCondition');
  var priceInput = document.getElementById('itemPrice');
  var locationInput = document.getElementById('itemLocation');
  var fromDateInput = document.getElementById('itemFromDate');
  var untilDateInput = document.getElementById('itemUntilDate');
  var descInput = document.getElementById('itemDescription');
  var descCounter = document.getElementById('descCharCounter');
  var alertContainer = document.getElementById('itemAlertContainer');

  // Set min dates to today
  var todayStr = new Date().toISOString().split('T')[0];
  if (fromDateInput && !fromDateInput.value) fromDateInput.min = todayStr;
  if (untilDateInput && !untilDateInput.value) untilDateInput.min = todayStr;

  // Setup character counters
  if (titleInput && titleCounter) {
    setupCharCounter(titleInput, titleCounter, 150);
  }
  if (descInput && descCounter) {
    setupCharCounter(descInput, descCounter, 500);
  }

  bindAutoClear(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var isTitleValid = validateRequired(titleInput, 'Item title') && validateMaxLength(titleInput, 150, 'Item title');
    var isCategoryValid = validateRequired(categorySelect, 'Category');
    var isConditionValid = validateRequired(conditionSelect, 'Condition');
    var isPriceValid = validateDailyPrice(priceInput);
    var isLocValid = validateRequired(locationInput, 'Location') && validateMaxLength(locationInput, 150, 'Location');
    var isDateValid = validateDateRange(fromDateInput, untilDateInput);
    var isDescValid = descInput ? validateMaxLength(descInput, 500, 'Description') : true;

    if (isTitleValid && isCategoryValid && isConditionValid && isPriceValid && isLocValid && isDateValid && isDescValid) {
      var isEdit = form.dataset.mode === 'edit';
      var message = isEdit
        ? 'Listing updated successfully! Your changes are now saved.'
        : 'Item listed successfully! Your item is now available for peer-to-peer rental.';

      showSuccessAlert(alertContainer, message);

      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 1500);
    }
  });
}

// Profile Form Handling
function setupProfileForm() {
  var form = document.getElementById('profileForm');
  if (!form) return;

  var nameInput = document.getElementById('profileName');
  var emailInput = document.getElementById('profileEmail');
  var locationInput = document.getElementById('profileLocation');
  var alertContainer = document.getElementById('profileAlertContainer');

  bindAutoClear(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var isNameValid = validateRequired(nameInput, 'Full name');
    var isEmailValid = validateEmail(emailInput);
    var isLocValid = validateRequired(locationInput, 'Location') && validateMaxLength(locationInput, 150, 'Location');

    if (isNameValid && isEmailValid && isLocValid) {
      showSuccessAlert(alertContainer, 'Profile changes saved successfully!');
    }
  });
}
