window.addEventListener("load", function () {
  const commentInput = document.querySelector(".comment-input");
  const reviewList = document.querySelector(".reviews-list");
  const addCommentBtn = document.getElementById("addCommentBtn");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  //categories for stars
  const categories = [
    { label: "Excellent", stars: 5 },
    { label: "Good", stars: 4 },
    { label: "Average", stars: 3 },
    { label: "Below Average", stars: 2 },
    { label: "Poor", stars: 1 },
  ];
  //get star form
  const form = document.getElementById("starsInputForm");
  // get number of stars every change
  let numberOfStars;

  renderReviews();

  form.addEventListener("change", () => {
    const selectedStar = form.querySelector("input[name='star']:checked");

    if (selectedStar) {
      numberOfStars = +selectedStar.value; // هنا بيتخزن عدد النجوم
    }
  });

  addCommentBtn.addEventListener("click", () => {
    if (!currentUser) {
      window.location.href = "../../pages/auth/login.html";
      return;
    }

    const commentText = commentInput.value.trim();

    if (commentText === "") {
      showToast("Please write a comment first.", "warning");
      return;
    }

    if (!numberOfStars) {
      showToast("Please select a rating first.", "warning");
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const currentProductId = new URLSearchParams(window.location.search).get(
      "id"
    );

    const review = {
      id: Date.now(),
      userEmail: currentUser.email,
      userName: currentUser.name,
      userAvatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=56&h=56",
      date: formattedDate,
      stars: numberOfStars || 0,
      text: commentText,
    };

    const product = products.find((p) => p.id == currentProductId);
    if (product) {
      if (!product.reviews) product.reviews = [];

      product.reviews.push(review);
    }

    const user = users.find((u) => u.email === currentUser.email);
    if (user) {
      if (!user.reviews) user.reviews = [];
      user.reviews.push({
        productId: currentProductId,
        ...review,
      });
    }

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("users", JSON.stringify(users));
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");

    reviewItem.innerHTML = `
      <img
        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=56&h=56"
        alt="${currentUser.name}'s photo"
        class="reviewer-avatar"
      />
      <div class="review-content">
        <div class="review-header">
          <span class="reviewer-name">${currentUser.name}</span>
          <span class="review-date">${formattedDate}</span>
        </div>
        <div class="review-stars">
          ${renderStars(review.stars)}
        </div>
        <p class="review-text">${commentText}</p>
          <div class="text-end">
          <button class="btn btn-sm btn-outline-primary edit-review-btn me-2">Edit</button>
      <button class="btn btn-sm btn-outline-danger delete-review-btn">Delete</button>
    </div>
        
      </div>
    `;
    renderReviews();

    const editBtn = reviewItem.querySelector(".edit-review-btn");
    editBtn.addEventListener("click", () => {
      selectedReviewItem = reviewItem;
      selectedReview = review;
      editReview();
    });

    const deleteBtn = reviewItem.querySelector(".delete-review-btn");
    deleteBtn.addEventListener("click", () => {
      console.log("deleted");

      // remove from product reviews
      product.reviews = product.reviews.filter((r) => r.id !== review.id);

      // remove from user's own reviews

      user.reviews = user.reviews.filter(
        (r) => !(r.productId == currentProductId && r.text === review.text)
      );

      // save changes
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("users", JSON.stringify(users));

      // remove from UI
      reviewItem.remove();
      showToast("Review deleted successfully!", "success");
      renderReviews();
    });

    reviewList.prepend(reviewItem);
    commentInput.value = "";
    form.reset();
    numberOfStars = undefined;
    renderReviews();
    showToast("Review added successfully!", "success");
  });

  function renderReviews() {
    reviewList.innerHTML = "";
    const currentProductId = new URLSearchParams(window.location.search).get(
      "id"
    );
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const product = products.find((p) => p.id == currentProductId);
    if (!product?.reviews) {
      reviewList.innerHTML = `<div class="text-center py-4 text-muted">
    <i class="bi bi-chat-left-text fs-1 d-block mb-2"></i>
    <p class="h5 fw-light">No reviews yet</p>
    <small class="text-secondary">Be the first to share your experience!</small>
  </div>`;
      return;
    }
    renderTotalReviews(product.reviews);
    product.reviews.forEach((review, index) => {
      // check if this review belongs to current user
      const isCurrentUserReview = review.userEmail === currentUser?.email;

      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review-item");
      reviewItem.innerHTML = `
      <img src="/assets/images/image.png" alt="${
        review.userName
      }'s avatar" class="reviewer-avatar" />
      <div class="review-content">
        <div class="review-header">
          <span class="reviewer-name">${review.userName}</span>
          <span class="review-date">${review.date}</span>
        </div>
        <div class="review-stars">
          ${renderStars(review.stars)}
        </div>
        <p class="review-text">${review.text}</p>
        ${
          isCurrentUserReview
            ? `<div class="text-end">
            <button class="btn btn-sm btn-outline-primary edit-review-btn me-2 p-2" style="min-width:0"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="btn btn-sm btn-outline-danger delete-review-btn p-2" style="min-width:0"><i class="fa-solid fa-trash-can"></i></button>
    </div>`
            : ""
        }
      </div>
    `;

      if (isCurrentUserReview) {
        const editBtn = reviewItem.querySelector(".edit-review-btn");
        editBtn.addEventListener("click", () => {
          selectedReviewItem = reviewItem;
          selectedReview = review;
          editReview();
        });

        const deleteBtn = reviewItem.querySelector(".delete-review-btn");

        deleteBtn.addEventListener("click", () => {
          // remove from product reviews
          product.reviews.splice(index, 1);

          // remove from user's own reviews
          const user = users.find((u) => u.email === currentUser.email);
          if (user?.reviews) {
            user.reviews = user.reviews.filter(
              (r) => !(r.productId == currentProductId && r.id === review.id)
            );
          }

          // save changes
          localStorage.setItem("products", JSON.stringify(products));
          localStorage.setItem("users", JSON.stringify(users));

          // remove from UI
          reviewItem.remove();
          renderReviews();
        });
      }

      reviewList.prepend(reviewItem);
    });
  }

  function renderStars(starsCount) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      starsHTML += `<span class="star ${
        i <= starsCount ? "filled" : ""
      }">★</span>`;
    }
    return starsHTML;
  }

  function showToast(message, type = "danger") {
    let toastEl = document.getElementById("toastMessage");

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;

    toastEl.querySelector(".toast-body").textContent = message;

    let toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  let selectedReviewItem = null;
  let selectedReview = null;

  //   function editReview() {
  //     commentInput.value = selectedReview.text;
  //     commentInput.focus();

  //     addCommentBtn.style.display = "none";

  //     let saveBtn = document.getElementById("saveEditBtn");
  //     if (!saveBtn) {
  //       saveBtn = document.createElement("button");
  //       saveBtn.id = "saveEditBtn";
  //       saveBtn.className = "btn btn-sm btn-success mt-2"; // زرار صغير وأخضر
  //       saveBtn.textContent = "Save Edit";

  //       // نحطه تحت الـ textarea مباشرة
  //       commentInput.insertAdjacentElement("afterend", saveBtn);
  //     }

  //     saveBtn.onclick = () => {
  //       const newText = commentInput.value.trim();
  //       if (!newText) {
  //         alert("Comment can't be empty.");
  //         return;
  //       }

  //       const productReview = product.reviews.find(
  //         (r) =>
  //           r.text === selectedReview.text &&
  //           r.userName === selectedReview.userName
  //       );
  //       if (productReview) productReview.text = newText;

  //       const userReview = user.reviews.find(
  //         (r) => r.productId == currentProductId && r.text === selectedReview.text
  //       );
  //       if (userReview) userReview.text = newText;

  //       localStorage.setItem("products", JSON.stringify(products));
  //       localStorage.setItem("users", JSON.stringify(users));

  //       selectedReviewItem.querySelector(".review-text").textContent = newText;

  //       saveBtn.remove();
  //       addCommentBtn.style.display = "inline-block";
  //       commentInput.value = "";

  //       selectedReviewItem = null;
  //       selectedReview = null;
  //     };
  //   }

  function editReview() {
    commentInput.value = selectedReview.text;
    console.log(selectedReview);

    const starToCheck = form.querySelector(
      `input[name='star'][value='${selectedReview.stars}']`
    );
    if (starToCheck) {
      starToCheck.checked = true;
    }
    numberOfStars = selectedReview.stars;
    commentInput.focus();

    addCommentBtn.style.display = "none";

    let saveBtn = document.getElementById("saveEditBtn");
    if (!saveBtn) {
      saveBtn = document.createElement("button");
      saveBtn.id = "saveEditBtn";
      saveBtn.className = "btn btn-sm btn-success mt-2 mb-5";
      saveBtn.textContent = "💾 Save Edit";
      commentInput.insertAdjacentElement("afterend", saveBtn);
    }

    saveBtn.onclick = () => {
      const newText = commentInput.value.trim();
      if (!newText) {
        alert("Comment can't be empty.");
        return;
      }

      const currentProductId = new URLSearchParams(window.location.search).get(
        "id"
      );
      let products = JSON.parse(localStorage.getItem("products")) || [];
      let users = JSON.parse(localStorage.getItem("users")) || [];

      let product = products.find((p) => p.id == currentProductId);
      let user = users.find((u) => u.email === currentUser.email);

      const today = new Date();
      const newFormattedDate = today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (product?.reviews) {
        const productReview = product.reviews.find(
          (r) => r.id === selectedReview.id
        );
        if (productReview) {
          productReview.text = newText;
          productReview.date = newFormattedDate;
          productReview.stars = numberOfStars;
        }
      }

      if (user?.reviews) {
        const userReview = user.reviews.find(
          (r) => r.id === selectedReview.id && r.productId == currentProductId
        );
        if (userReview) {
          userReview.text = newText;
          userReview.date = newFormattedDate;
          user.stars = numberOfStars;
        }
      }

      document.querySelector(".review-date").textContent = newFormattedDate;
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("users", JSON.stringify(users));

      selectedReviewItem.querySelector(".review-text").textContent = newText;

      saveBtn.remove();
      addCommentBtn.style.display = "inline-block";
      commentInput.value = "";
      form.reset();
      numberOfStars = undefined;
      selectedReviewItem = null;
      selectedReview = null;

      showToast("Review updated successfully!", "success");
      renderReviews();
    };
  }

  //event listner for stars change
  form.addEventListener("change", () => {
    const selectedStar = form.querySelector("input[name='star']:checked");

    if (selectedStar) {
      numberOfStars = +selectedStar.value;
    }
  });

  //render total reviews
  function renderTotalReviews(reviews) {
    if (!reviews.length) return;

    // Calculate average rating
    const totalStars = reviews.reduce((sum, r) => sum + r.stars, 0);
    const avgRating = (totalStars / reviews.length).toFixed(1);

    // Update summary
    document.getElementById("overallRating").textContent = avgRating;
    document.getElementById(
      "reviewCount"
    ).textContent = `of ${reviews.length} reviews`;

    // Render stars for average rating
    const starsContainer = document.getElementById("starsContainer");
    starsContainer.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const span = document.createElement("span");
      span.classList.add("star");
      span.textContent = "★";
      if (i <= Math.round(avgRating)) span.classList.add("filled");
      starsContainer.appendChild(span);
    }

    // Breakdown counts
    const breakdown = categories.map((c) => {
      const count = reviews.filter((r) => r.stars === c.stars).length;
      return { ...c, count };
    });

    // Render breakdown
    const ratingBreakdown = document.getElementById("ratingBreakdown");
    ratingBreakdown.innerHTML = "";
    breakdown.forEach((b) => {
      const percentage = ((b.count / reviews.length) * 100).toFixed(1);

      ratingBreakdown.innerHTML += `
        <div class="rating-row">
          <span class="rating-label">${b.label}</span>
          <div class="rating-bar">
            <div class="rating-fill" style="width: ${percentage}%"></div>
          </div>
          <span class="rating-count">${b.count}</span>
        </div>
      `;
    });
  }
});
