document.addEventListener("DOMContentLoaded", function () {
  handleHomeSearch("homeSearchForm", "productSearch", "pages/products/product page.html"); //handle search
});
function handleHomeSearch(formId, inputId, targetPage) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById(inputId)?.value.trim();
    if (query) {
      window.location.href = `${targetPage}?search=${encodeURIComponent(query)}`;
    } else {
      window.location.href = targetPage;
    }
  });
}