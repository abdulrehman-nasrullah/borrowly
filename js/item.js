/* ==========================================================================
   Item Detail & Request Calculation - Borrowly
   Live rental cost calculation and borrow request validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var requestForm = document.getElementById('rentalRequestForm');
  if (!requestForm) return;

  var startDateInput = document.getElementById('reqStartDate');
  var endDateInput = document.getElementById('reqEndDate');
  var messageInput = document.getElementById('reqMessage');
  var charCounter = document.getElementById('messageCharCounter');
  var dailyPriceElem = document.getElementById('itemDailyPrice');
  var calcDaysElem = document.getElementById('calcDays');
  var calcTotalElem = document.getElementById('calcTotal');
  var alertContainer = document.getElementById('requestAlertContainer');

  var dailyRate = parseInt(requestForm.dataset.dailyPrice, 10) || 500;

  // Set min date to today for date pickers
  var todayStr = new Date().toISOString().split('T')[0];
  if (startDateInput) startDateInput.min = todayStr;
  if (endDateInput) endDateInput.min = todayStr;

  // Setup live character counter for message
  if (messageInput && charCounter) {
    setupCharCounter(messageInput, charCounter, 500);
  }

  // Bind auto-clear on input
  bindAutoClear(requestForm);

  // Calculate duration and total cost
  function recalculateCost() {
    if (!startDateInput || !endDateInput) return;

    var startVal = startDateInput.value;
    var endVal = endDateInput.value;

    if (!startVal || !endVal) {
      if (calcDaysElem) calcDaysElem.textContent = '0 days';
      if (calcTotalElem) calcTotalElem.textContent = 'Rs. 0';
      return;
    }

    var start = new Date(startVal + 'T00:00:00');
    var end = new Date(endVal + 'T00:00:00');

    if (end < start) {
      if (calcDaysElem) calcDaysElem.textContent = 'Invalid dates';
      if (calcTotalElem) calcTotalElem.textContent = 'Rs. 0';
      return;
    }

    // Difference in days inclusive (same day = 1 day)
    var diffMs = end.getTime() - start.getTime();
    var days = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;

    var totalCost = days * dailyRate;

    if (calcDaysElem) {
      calcDaysElem.textContent = days + (days === 1 ? ' day' : ' days');
    }
    if (calcTotalElem) {
      calcTotalElem.textContent = 'Rs. ' + totalCost.toLocaleString();
    }
  }

  if (startDateInput) {
    startDateInput.addEventListener('change', function () {
      if (endDateInput && !endDateInput.value) {
        endDateInput.value = startDateInput.value;
      }
      recalculateCost();
    });
  }

  if (endDateInput) {
    endDateInput.addEventListener('change', recalculateCost);
  }

  // Handle Form Submission
  requestForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var isDatesValid = validateDateRange(startDateInput, endDateInput);
    var isMessageValid = validateMaxLength(messageInput, 500, 'Request message');

    if (!isDatesValid || !isMessageValid) {
      return;
    }

    // Success
    showSuccessAlert(
      alertContainer,
      'Your borrow request has been sent to the owner! You will be notified in your Dashboard once they accept or reject. Settle payment directly upon acceptance.'
    );

    // Disable button to prevent double submission
    var submitBtn = requestForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Request Sent';
      submitBtn.classList.remove('btn--primary');
      submitBtn.classList.add('btn--outline');
    }
  });
});
