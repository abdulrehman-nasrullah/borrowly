/* ==========================================================================
   Dashboard Tabs & Request Interactions - Borrowly
   Tab switching, Accept/Reject requests, and listing status toggles
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  setupDashboardTabs();
  setupRequestActions();
  setupListingToggle();
});

// Tab switching between My Listings, Borrow Requests, and My Rentals
function setupDashboardTabs() {
  var tabButtons = document.querySelectorAll('.dashboard-page .tab-btn');
  var tabPanels = document.querySelectorAll('.dashboard-page .tab-panel');

  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var targetTabId = button.dataset.tab;

      // Update button states
      tabButtons.forEach(function (btn) {
        btn.classList.remove('is-active');
      });
      button.classList.add('is-active');

      // Update panel visibility
      tabPanels.forEach(function (panel) {
        if (panel.id === targetTabId) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });
    });
  });
}

// Accept and Reject actions for received borrow requests
function setupRequestActions() {
  var requestCards = document.querySelectorAll('.request-card');

  requestCards.forEach(function (card) {
    var acceptBtn = card.querySelector('.btn-accept');
    var rejectBtn = card.querySelector('.btn-reject');
    var badgeElem = card.querySelector('.request-status-badge');
    var settlementBox = card.querySelector('.settlement-details');
    var actionButtonsWrap = card.querySelector('.request-actions');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        // Change badge to Accepted
        if (badgeElem) {
          badgeElem.className = 'badge badge--accepted request-status-badge';
          badgeElem.textContent = 'Accepted';
        }

        // Show settlement box containing the borrower's email
        if (settlementBox) {
          settlementBox.classList.remove('settlement-details--hidden');
        }

        // Hide action buttons
        if (actionButtonsWrap) {
          actionButtonsWrap.classList.add('is-hidden');
        }
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        // Change badge to Rejected
        if (badgeElem) {
          badgeElem.className = 'badge badge--rejected request-status-badge';
          badgeElem.textContent = 'Rejected';
        }

        // Ensure settlement box is hidden
        if (settlementBox) {
          settlementBox.classList.add('settlement-details--hidden');
        }

        // Hide action buttons
        if (actionButtonsWrap) {
          actionButtonsWrap.classList.add('is-hidden');
        }
      });
    }
  });
}

// Listing Active/Inactive toggle
function setupListingToggle() {
  var toggleBtns = document.querySelectorAll('.btn-toggle-status');

  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var itemCard = btn.closest('.dashboard-item-card');
      var badge = itemCard ? itemCard.querySelector('.listing-status-badge') : null;

      if (!badge) return;

      if (badge.classList.contains('badge--active')) {
        badge.classList.remove('badge--active');
        badge.classList.add('badge--inactive');
        badge.textContent = 'Inactive';
        btn.textContent = 'Activate';
      } else {
        badge.classList.remove('badge--inactive');
        badge.classList.add('badge--active');
        badge.textContent = 'Active';
        btn.textContent = 'Deactivate';
      }
    });
  });
}
