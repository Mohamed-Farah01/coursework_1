var app = new Vue({
  el: "#app",
  data: {
    sitename: "courseapp",
    cart: [],
    showLessons: true,
    lessons: lessons,
    search: "",
    sortBy: "subject",
    sortOrderAsc: true,
    user: { name: "", phone: "", isNameValid: false, isPhoneValid: false },
    rating: 0
    
  },
  computed: {
    // Search Functionality
    filteredLessons() {
      const query = this.search.toLowerCase();
      return this.lessons.filter(
        (lesson) =>
          lesson.subject.toLowerCase().includes(query) ||
          lesson.location.toLowerCase().includes(query)
      );
    },

    // Sort Functionality
    sortedLessons() {
      const attribute = this.sortBy;
      const order = this.sortOrderAsc ? 1 : -1;

      function compare(a, b) {
        if (a[attribute] < b[attribute]) return -1 * order;
        if (a[attribute] > b[attribute]) return 1 * order;
        return 0;
      }
      return this.filteredLessons.sort(compare);
    },

    // Shopping Cart Functionality 1
    cartDetails() {
      const uniqueLessonIds = Array.from(new Set(this.cart));
      return uniqueLessonIds.map((lessonId) => {
        const lesson = this.lessons.find((lesson) => lesson.id === lessonId);
        const quantity = this.cartItemCount(lessonId);
        return {
          ...lesson,
          quantity,
          total: quantity * lesson.price,
        };
      });
    },

    cartTotal() {
      return this.cartDetails.reduce((sum, lesson) => sum + lesson.total, 0);
    },
    // End of Shopping Cart Functionality 1
  },
  methods: {
    submitOrder() {
      // Logic to submit the order
      if (this.user.isNameValid && this.user.isPhoneValid) {
          // Order submitted successfully
          console.log("Order submitted successfully!");
          // Here, you can perform additional actions such as sending the order to a server
          // or displaying a success message.
      } else {
          // Order submission failed
          console.log("Order submission failed!");
          // Here, you can display an error message to the user.
      }
      // Reset form fields if needed
      this.user.name = '';
      this.user.phone = '';
  },
    proceedToCheckout() {
      // Add your logic here to handle the checkout process
      // For example, you can navigate to the checkout page
      // or show a modal for confirming the checkout.
      console.log("Proceeding to checkout...");
      // Example: Redirecting to the checkout page
      window.location.href = "/checkout";
  },
    // Function to change sort order - ASC or DESC
    toggleSortOrder() {
      this.sortOrderAsc = !this.sortOrderAsc;
    },

    // Add to Cart Functionality
    addToCart(lesson) {
      if (this.canAddToCart(lesson)) {
        this.cart.push(lesson.id);
      }
    },

    removeFromCart(lesson) {
      const index = this.cart.lastIndexOf(lesson.id);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },

    cartItemCount(lessonId) {
      return this.cart.filter((id) => id === lessonId).length;
    },

    canAddToCart(lesson) {
      return lesson.spaces > this.cartItemCount(lesson.id);
    },

    canRemoveFromCart(lesson) {
      return this.cartItemCount(lesson.id) > 0;
    },
    // End of Add to Cart Functionality

    // Shopping Cart Functionality 2
    showCheckout() {
      this.showLessons = this.showLessons ? false : true;
      window.scrollTo(0, 0);
    },

    // Checkout Functionality
    validateUserName() {
      this.user.isNameValid = /^[a-zA-Z]+$/.test(this.user.name);
    },

    validateUserPhone() {
      this.user.isPhoneValid = /^\d+$/.test(this.user.phone);
    },

    completeCheckout() {
      if (this.user.isNameValid && this.user.isPhoneValid) {
        this.lessons = this.lessons.map((lesson) => ({
          ...lesson,
          spaces: lesson.spaces - this.cartItemCount(lesson.id),
        }));
        this.cart = [];
        this.showLessons = true;
      }
    },
  },
}); 