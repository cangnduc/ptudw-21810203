(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 768) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Home page slider
  $(".main-slider").slick({
    autoplay: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
  });

  // Product Slider 4 Column
  $(".product-slider-4").slick({
    autoplay: true,
    infinite: true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // Product Slider 3 Column
  $(".product-slider-3").slick({
    autoplay: true,
    infinite: true,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // Single Product Slider
  $(".product-slider-single").slick({
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  // Brand Slider
  $(".brand-slider").slick({
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1000,
    infinite: true,
    arrows: false,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // Quantity
  $(".qty button").on("click", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass("btn-plus")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 1) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 1;
      }
    }
    $button.parent().find("input").val(newVal);
  });

  // Shipping address show hide
  $(".checkout #shipto").change(function () {
    if ($(this).is(":checked")) {
      $(".checkout .shipping-address").slideDown();
    } else {
      $(".checkout .shipping-address").slideUp();
    }
  });

  // Payment methods show hide
  $(".checkout .payment-method .custom-control-input").change(function () {
    if ($(this).prop("checked")) {
      var checkbox_id = $(this).attr("id");
      $(".checkout .payment-method .payment-content").slideUp();
      $("#" + checkbox_id + "-show").slideDown();
    }
  });
})(jQuery);

async function addCart(id, quantity, event) {
  event.preventDefault();
  let res = await fetch("/products/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ id, quantity }),
  });
  let data = await res.json();
  document.getElementById("cart-quantity").innerText = data.quantity;
  //console.log(data);
  //prevent the scroll to top
}

async function updateCart(id, quantity) {
  if (quantity > 0) {
    let res = await fetch("/products/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id, quantity }),
    });
    if (res.status == 200) {
      let data = await res.json();
      document.getElementById("cart-quantity").innerText = data.quantity;
      document.getElementById("subtotal").innerText = data.subtotal;
      document.getElementById("grandtotal").innerText = data.total;
      document.getElementById(`product-${id}`).innerText = data.item.total;
    } else {
      console.log("Error updating cart");
    }
  } else {
    removeCart(id);
  }
}
async function removeCart(id) {
  if (confirm("Are you sure you want to remove this item?")) {
    let res = await fetch("/products/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.status == 200) {
      let data = await res.json();
      document.getElementById("cart-quantity").innerText = data.quantity;
      if (data.quantity > 0) {
        document.getElementById("subtotal").innerText = data.subtotal;
        document.getElementById("grandtotal").innerText = data.total;
        document.getElementById(`product_${id}`).remove();
      } else {
        //rerender the cart page
        location.reload();
      }
    } else {
      console.log("Error removing cart");
    }
  }
}
async function clearCart() {
  let res = await fetch("/products/cart/clear", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (res.status == 200) {
    document.getElementById("cart-quantity").innerText = 0;
    window.scrollTo(0, 0);
    location.reload();
    //go back top page
  } else {
    console.log("Error clearing cart");
  }
}
function placeOrder(e){
    e.preventDefault();
    const addressId = document.querySelector('input[name="address"]:checked').value;
    if(!addressId || addressId ==0) {
        if(!e.target.checkValidity()){
           return e.target.reportValidity();
        }
    }
    e.target.submit();
}