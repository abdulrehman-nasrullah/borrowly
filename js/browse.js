/* ==========================================================================
   Browse & Filter Logic - Borrowly
   Filter item cards by category and search keyword on the Home/Browse page
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('browseSearchInput');
  var categoryPills = document.querySelectorAll('.filter-pill');
  var itemCards = document.querySelectorAll('.items-grid .card');
  var resultsCount = document.getElementById('resultsCount');
  var emptyState = document.getElementById('browseEmptyState');

  var currentCategory = 'all';
  var currentQuery = '';

  // Filter function
  function applyFilters() {
    var visibleCount = 0;

    itemCards.forEach(function (card) {
      var cardCategory = (card.dataset.category || '').toLowerCase();
      var cardTitle = (card.dataset.title || '').toLowerCase();
      var cardLocation = (card.dataset.location || '').toLowerCase();

      var matchesCategory = currentCategory === 'all' || cardCategory === currentCategory.toLowerCase();
      var matchesQuery = currentQuery === '' ||
        cardTitle.indexOf(currentQuery) !== -1 ||
        cardLocation.indexOf(currentQuery) !== -1 ||
        cardCategory.indexOf(currentQuery) !== -1;

      if (matchesCategory && matchesQuery) {
        card.classList.remove('is-hidden');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
      }
    });

    // Update count display
    if (resultsCount) {
      resultsCount.textContent = 'Showing ' + visibleCount + ' ' + (visibleCount === 1 ? 'item' : 'items');
    }

    // Toggle empty state
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove('is-hidden');
      } else {
        emptyState.classList.add('is-hidden');
      }
    }
  }

  // Handle Search Input
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      currentQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Handle Category Pills
  categoryPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      categoryPills.forEach(function (p) {
        p.classList.remove('is-active');
      });
      pill.classList.add('is-active');
      currentCategory = pill.dataset.category || 'all';
      applyFilters();
    });
  });
});
