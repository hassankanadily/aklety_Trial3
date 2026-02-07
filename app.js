const navList = document.querySelectorAll(".nav-item-box");
const navTitle = document.querySelectorAll(".nav-item-box p");
const sectionList = document.querySelectorAll("section");
const home = document.getElementById("home");
const orders=document.getElementById("orders");
const cart = document.getElementById("cart");
const profile =document.getElementById("profile");
const cartTop = document.getElementById("cart-top");
const profileTop =document.getElementById("profile-top");
const numberOfPoints = document.querySelector(".points-amount");
let points = 0;
const savedNavList = JSON.parse(localStorage.getItem("newNavList")) || [];

home.addEventListener('click',()=>{
  showPage("home-sec","Home","#homePage");
});
orders.addEventListener('click',()=>{
  showPage("orders-sec","Order History","#ordersPage");
});
cart.addEventListener('click',()=>{
  showPage("cart-sec","Cart","#cartPage");
});
profile.addEventListener('click',()=>{
  showPage("profile-sec","Profile","#profilePage");
});
cartTop.addEventListener('click',()=>{
  showPage("cart-sec","Cart","#cartPage");
});
profileTop.addEventListener('click',()=>{
  showPage("profile-sec","Profile","#profilePage");
});
const addTotalToCheckout = document.querySelector(".add-total");
function showPage(id, title, url){
  sectionList.forEach(section => {
    section.hidden = true;
  });
  document.getElementById(id).hidden = false;
  window.scrollTo(0,0);
  document.title = title;
  window.history.pushState({}, "", url);
}
home.querySelector("p").classList.remove("unclicked-nav");
home.querySelector("p").classList.add("clicked-nav");
navList.forEach(nav => {
  nav.addEventListener('click',() => {
    navList.forEach(unclicked =>{
      unclicked.querySelector("p").classList.remove("clicked-nav");
      unclicked.querySelector("p").classList.add("unclicked-nav");
    });
    nav.querySelector("p").classList.remove("unclicked-nav");
    nav.querySelector("p").classList.add("clicked-nav");

  });
});

const menuItems = document.querySelectorAll(".big-menu-items");
const foodImgBox = document.querySelector(".clicked-item-pic-box");
const clickedItemSection = document.getElementById("clicked-menu-item-sec");
const itemName = document.querySelector(".clicked-item-name");
const itemDescription = document.querySelector(".clicked-item-description");
const itemPrice = document.querySelector(".clicked-item-price");
const itemRating = document.querySelector(".clicked-item-rating");
const itemDetails = document.querySelector(".elements-added");
const currentCost = document.querySelector(".current-cost");
const plusButton = document.getElementById("plus-btn");
const minusButton = document.getElementById("minus-btn");
const quantityCount = document.getElementById("quantity-count");
const addToCart = document.querySelector(".cart-and-add");
const emptyCart = document.querySelector(".empty-cart");
const checkoutSection = document.getElementById("checkout-sec");
const ordersSection = document.getElementById("orders-sec");
let selectedItem = null;
menuItems.forEach(item => {
  item.addEventListener('click',() => {
    showPage("clicked-menu-item-sec","Item Details","#itemDetails")
    selectedItem = item;
    const foodImgSrc = item.querySelector(".big-food-img").src;
    const foodImg = document.createElement("img");
    foodImg.src = foodImgSrc;
    foodImg.className = "food-img";
    foodImgBox.appendChild(foodImg);

    const smallNameText = item.querySelector(".menu-item-name").textContent;
    const smallName = document.createElement("p");
    smallName.className = "small-name";
    smallName.textContent = smallNameText;
    itemDetails.appendChild(smallName);

    const smallDescText = item.querySelector(".item-description").textContent;
    const smallDesc = document.createElement("p");
    smallDesc.className = "small-desc";
    smallDesc.textContent = smallDescText;
    itemDetails.appendChild(smallDesc);

    const smallPriceText = item.querySelector(".trending-cost").textContent;
    const smallTotal = document.createElement("p");
    smallTotal.className = "small-total";
    smallTotal.textContent = smallPriceText;
    const smallPrice = document.createElement("p");
    smallPrice.className = "small-price";
    smallPrice.textContent = smallPriceText;
    itemDetails.appendChild(smallPrice);
    currentCost.appendChild(smallTotal);

    const smallRatingDiv = item.querySelector(".right-section-cost");
    const ratingWord = document.createElement("p");
    ratingWord.textContent = "Rating: ";
    ratingWord.className = "rating-word";
    const ratingCopy = smallRatingDiv.cloneNode(true);
    const ratingBigDiv = document.createElement("div");
    ratingBigDiv.className = "rating-box";
    ratingCopy.className = "star-and-number";
    ratingBigDiv.appendChild(ratingWord);
    ratingBigDiv.appendChild(ratingCopy);
    itemDetails.appendChild(ratingBigDiv);

    let quantity = 1; 
    let removeCount = 0;
    navList.forEach(nav =>{
      nav.addEventListener('click',() => {
        if (removeCount===0)
        {
          foodImg.remove();
          itemDetails.removeChild(smallName);
          itemDetails.removeChild(smallDesc);
          itemDetails.removeChild(smallPrice);
          itemDetails.removeChild(ratingBigDiv);
          currentCost.removeChild(smallTotal);
          removeCount++;
          console.log(removeCount);
        }
      });
      removeCount = 0;
    });
    let totalCost = 0;
    let oldCost = 0;
    function addQuantity(){
      quantity++;
      quantityCount.textContent = quantity;
      if (totalCost===0)
      {
        oldCostText = smallTotal.textContent;
      }
      oldCost = parseFloat(oldCostText.replace("$",""));
      totalCost = oldCost * quantity;
      smallTotal.textContent = "$"+totalCost.toFixed(2);
    }
    function minusQuantity(){
      if(quantity > 1){
        quantity--;
        quantityCount.textContent = quantity;
      }
      if (totalCost===0)
      {
        oldCostText = smallTotal.textContent;
      }
      oldCost = parseFloat(oldCostText.replace("$",""));
      totalCost = oldCost * quantity;
      smallTotal.textContent = "$"+totalCost.toFixed(2);
    }
    plusButton.addEventListener('click',() => {
      addQuantity();
    });
    minusButton.addEventListener('click',() => {
      minusQuantity();
    });
    
  });
});
let subtotalAmount = 0;
let totalAmount = 0;
let totalNum = 0;
const arithemticBtns = document.querySelector(".quantity-number-div");
const cartSection = document.getElementById("cart-sec");
let cartItemsCount = 0;
const cartCountDiv = document.createElement("p");
//ADD TO CART BUTTON
addToCart.addEventListener('click',() => {
      let currentQuantityCount = quantityCount.textContent;
      cartItemsCount++;
      console.log(cartItemsCount);
      cartCountDiv.className = "cart-items-count";
      cart.appendChild(cartCountDiv);
      console.log("works");
      if (cartItemsCount === 1) {
        if (emptyCart.parentElement) emptyCart.remove();
      }
    
    let previousCartCount = cartItemsCount;
    const itemsAddedAgain = selectedItem.querySelector(".menu-item-name").textContent;
    const addedItemsList = document.querySelectorAll(".added-item");
    let exist = 0;
    addedItemsList.forEach(itemAdded => {
      if (itemAdded.querySelector(".cart-name").textContent === itemsAddedAgain){
        cartItemsCount-=1;
        exist+=1;
        displayAlreadyAdded();
      }
    });
    cartCountDiv.textContent = cartItemsCount;
    if(exist === 1){
      exist = 0;
      return;
    }
    const subTotal = document.createElement("p");
    const nameOfAddedItem = document.createElement("p");
    nameOfAddedItem.className = "name-of-added-item";
    subTotal.className = "subtotal-amount";
    const subtotalName = selectedItem.querySelector(".menu-item-name").textContent;
    const TOTAL = document.createElement("p");
    TOTAL.className = "total-amount";
    subtotalAmount = parseFloat(selectedItem.querySelector(".trending-cost").textContent.replace("$",""),10)*parseFloat(currentQuantityCount);
    console.log(subtotalAmount);
    nameOfAddedItem.textContent = subtotalName;
    subTotal.textContent = "$"+subtotalAmount.toFixed(2);
    totalAmount+=subtotalAmount;
    console.log(totalAmount);
    const biggerSubtotal = document.querySelector(".subtotal-bigger-box");
    const subtotalBox = document.createElement("div");
    subtotalBox.className = "subtotal-box";
    const totalBox = document.querySelector(".total-box");
    
    const bigTotalBox = document.querySelector(".big-total-box");
    subtotalBox.appendChild(nameOfAddedItem);
    subtotalBox.appendChild(subTotal);
    biggerSubtotal.appendChild(subtotalBox);
    document.querySelector(".bagarab").textContent = "$"+totalAmount.toFixed(2);
    const proceedCheckout = document.createElement("p");
    if (bigTotalBox.hidden === true)
    {
      bigTotalBox.hidden = false;
      bigTotalBox.style.display = "flex";
      totalBox.hidden = false;
      document.querySelector(".word-total2").hidden = false;
      document.querySelector(".bagarab").hidden=false;
      proceedCheckout.textContent = "Proceed to Checkout";
      proceedCheckout.className = "proceed-checkout";
      cartSec.appendChild(proceedCheckout);

      //CHECKOUT SECTION PART
      proceedCheckout.addEventListener('click',() => {
        showPage("checkout-sec","Checkout","#checkoutPage")
        const totalBoxCopy = bigTotalBox.cloneNode(true);
        addTotalToCheckout.appendChild(totalBoxCopy);
        let countClick = 0;
        countClick = 0;
        navList.forEach(nav => {
          nav.addEventListener('click', () => {
            if(checkoutSection.contains(totalBoxCopy)){
            totalBoxCopy.remove();
          }
          });
        }); 
        confirmOrderBtn.addEventListener('click',() => {
          showPage("orders-sec","Orders","#ordersHistory");
          if(checkoutSection.contains(totalBoxCopy)){
            totalBoxCopy.remove();
          }
          const id = Math.floor(100000 + Math.random() * 900000);
          const newOrderBox = document.createElement("div");
          newOrderBox.className = "new-order-box";
          const orderIDBox = document.createElement("div");
          orderIDBox.className = "order-id-box";
          const upperBox = document.createElement("div");
          upperBox.className = "upper-box";
          const status = document.createElement("p");
          status.className = "status";
          setTimeout(()=> {
            status.textContent = "Processing";
            status.style.color = "rgb(240, 69, 69)";
            status.style.fontWeight = "bold";
            setTimeout(()=> {
            status.textContent = "Delivered";
            status.style.color = "green";
            status.style.fontWeight = "bold";
          },15000);
          },1);
          const orderID = document.createElement("p");
          orderID.className = "order-id";
          orderID.textContent = "Order "+"#"+id;
          const date = document.createElement("p");
          date.className = "date";
          const day = Math.floor(Math.random() * 30) + 1;
          const month = Math.floor(Math.random() * 12) + 1;
          date.textContent = "Date: "+ "2026-"+month+"-"+day;
          const cartItemsNumber = document.createElement("p");
          cartItemsNumber.className = "cart-items-number";
          cartItemsNumber.textContent = cartItemsCount + " items";
          const lowerBox = document.createElement("div");
          lowerBox.className = "lower-box";
          const totalWord = document.createElement("p");
          totalWord.className = "total-word-order";
          totalWord.textContent = "Total";
          const totalOrder = document.createElement("p");
          totalOrder.textContent = "$"+totalAmount.toFixed(2);
          points = parseInt(numberOfPoints.textContent,10);
          points+=Math.floor(totalAmount);
          numberOfPoints.textContent = points;
          totalOrder.className = "total-order";
          orderIDBox.appendChild(orderID);
          orderIDBox.appendChild(status);
          upperBox.appendChild(orderIDBox);
          upperBox.appendChild(date);
          upperBox.appendChild(cartItemsNumber);
          lowerBox.appendChild(totalWord);
          lowerBox.appendChild(totalOrder);
          newOrderBox.appendChild(upperBox);
          newOrderBox.appendChild(lowerBox);
          ordersSection.appendChild(newOrderBox);
          cartItemsCount = 0;
          if(totalAmount === 0){
            ordersSection.removeChild(newOrderBox);
          }
          if (cartItemsCount===0)
          {
          if (cart.contains(cartCountDiv)) {
            cart.removeChild(cartCountDiv);
          } 
          const addedItemsList = document.querySelectorAll(".added-item");
          addedItemsList.forEach(item => {
            item.remove();
          });
          bigTotalBox.hidden = true;
          bigTotalBox.style.display = "none";
          totalBox.hidden = true;
          document.querySelector(".word-total2").hidden = true;
          document.querySelector(".bagarab").hidden=true;
          totalAmount = 0;
          const subtotalList = document.querySelectorAll(".subtotal-box");
          subtotalList.forEach(item => {
            
            item.remove();
          });
          //subtotalBox.removeChild(nameOfAddedItem);
          //subtotalBox.removeChild(subTotal);
          //subtotalBox.remove();
          if(cartSec.contains(proceedCheckout)){
            cartSec.removeChild(proceedCheckout);
            cartSec.appendChild(emptyCart);
          }
          }
        });
    });
    }
    displaySuccessfullyAdded();
      const addedItem = document.createElement("div");
      const leftAddedItem = document.createElement("div");
      leftAddedItem.className = "left-added-item";
      const rightAddedItem = document.createElement("div");
      rightAddedItem.className = "right-added-item";

      const cartName = document.createElement("p");
      cartName.textContent = selectedItem.querySelector(".menu-item-name").textContent;
      cartName.className = "cart-name";
      leftAddedItem.appendChild(cartName);

      const cartPrice1 = document.createElement("p");
      cartPrice1.textContent = selectedItem.querySelector(".trending-cost").textContent;
      cartPrice1.className = "cart-price1";
      leftAddedItem.appendChild(cartPrice1);

      const arithmeticCopy = arithemticBtns.cloneNode(true);
      leftAddedItem.appendChild(arithmeticCopy);

      const cartBinBox = document.createElement("div");
      const cartBinImg = document.createElement("img");
      cartBinImg.src = "pictures/delete.png";
      cartBinBox.className = "cart-bin-box";
      cartBinImg.className = "cart-bin-img";
      cartBinBox.appendChild(cartBinImg);
      rightAddedItem.appendChild(cartBinBox);
      let amount = currentQuantityCount;
      let currentQuantityCost = 0;
      let selectedItemPrice =selectedItem.querySelector(".trending-cost").textContent;
      currentQuantityCost = parseFloat(selectedItemPrice.replace("$",""))*parseFloat(currentQuantityCount.replace("$",""));
      const cartPrice2 = document.createElement("p");
      cartPrice2.textContent = "$"+ currentQuantityCost.toFixed(2);
      cartPrice2.className = "cart-price2";
    let itemCartCost = 0;
    let price2 = 0;
    let price2Text = "";
    const p = arithmeticCopy.querySelector(".plus-button");
    const v = arithmeticCopy.querySelector("#quantity-count");
    p.addEventListener('click',() => {
      amount++;
      v.textContent = amount;
      if (itemCartCost === 0)
      {
         price2Text = cartPrice2.textContent;
      }
      price2 = parseFloat(price2Text.replace("$",""));
      itemCartCost = (price2/parseFloat(currentQuantityCount.replace("$",""))) * amount;
      cartPrice2.textContent = "$"+itemCartCost.toFixed(2);
      totalAmount=totalAmount + itemCartCost-(parseFloat(cartPrice1.textContent.replace("$",""))*(amount-1));
      console.log(parseFloat(cartPrice1.textContent.replace("$","")));
      console.log(totalAmount);
      //console.log(itemCartCost);
      document.querySelector(".bagarab").textContent = "$"+totalAmount.toFixed(2);
      subtotalAmount = itemCartCost;
      subTotal.textContent = "$"+subtotalAmount.toFixed(2);
    });
    const m = arithmeticCopy.querySelector(".minus-button");
    m.addEventListener('click',() => {
      if (amount > 1)
      {
        amount--;
        v.textContent = amount;
        if (itemCartCost === 0)
      {
         price2Text = cartPrice2.textContent;
      }
      price2 = parseFloat(price2Text.replace("$",""));
      itemCartCost = (price2/parseFloat(currentQuantityCount.replace("$",""))) * amount;
      totalAmount=totalAmount - parseFloat(cartPrice1.textContent.replace("$",""));
      cartPrice2.textContent = "$"+itemCartCost.toFixed(2);
      document.querySelector(".bagarab").textContent = "$"+totalAmount.toFixed(2);
      subtotalAmount = itemCartCost;
      subTotal.textContent = "$"+subtotalAmount.toFixed(2);
      }

    });

      rightAddedItem.appendChild(cartPrice2);
      addedItem.appendChild(leftAddedItem);
      addedItem.appendChild(rightAddedItem);
      //cartSection.appendChild(addedItem);
      addedItem.className = "added-item";
      document.querySelector(".items-first").appendChild(addedItem);
      cartBinBox.addEventListener('click',() => {
        totalAmount-=parseFloat(addedItem.querySelector(".cart-price1").textContent.replace("$",""))*amount;
        addedItem.remove();
        cartItemsCount--;
        cartCountDiv.textContent = cartItemsCount;
        cartCountDiv.className = "cart-items-count";
        cart.appendChild(cartCountDiv);
        subtotalBox.removeChild(nameOfAddedItem);
        subtotalBox.removeChild(subTotal);
        subtotalBox.remove();

        document.querySelector(".bagarab").textContent = "$"+totalAmount.toFixed(2);
        if(cartItemsCount<=0)
        {
          cart.removeChild(cartCountDiv);
          cartSec.appendChild(emptyCart);
          bigTotalBox.hidden = true;
          totalBox.hidden = true;
          document.querySelector(".word-total2").hidden = true;
          document.querySelector(".bagarab").hidden=true;
          totalAmount = 0;
          cartSec.removeChild(proceedCheckout);
        }
      });
});
const cartSec = document.getElementById("cart-sec");
const addedItemsList = document.querySelectorAll(".added-item");
const arrow = document.querySelectorAll(".left-arrow-box");
arrow.forEach(arr => {
  arr.addEventListener('click', () => {
    showPage("home-sec","Home","#homePage");
    navList.forEach(unclicked =>{
      unclicked.querySelector("p").classList.remove("clicked-nav");
      unclicked.querySelector("p").classList.add("unclicked-nav");
    });
    home.querySelector("p").classList.remove("unclicked-nav");
    home.querySelector("p").classList.add("clicked-nav");
});
});
const startOrderingButton = document.querySelector(".start-ordering-button");
startOrderingButton.addEventListener('click', () => {
    showPage("home-sec","Home","#homePage");
    navList.forEach(unclicked =>{
      unclicked.querySelector("p").classList.remove("clicked-nav");
      unclicked.querySelector("p").classList.add("unclicked-nav");
    });
    home.querySelector("p").classList.remove("unclicked-nav");
    home.querySelector("p").classList.add("clicked-nav");
});
const likeButton = document.querySelectorAll(".like-img-box");

likeButton.forEach(like => {
  const newLike = document.createElement("img");
  newLike.className = "like-img2";
  newLike.src = "pictures/redheart.png";
  like.addEventListener('click',(e)=>{
  e.stopPropagation();
  const oldLike = like.querySelector(".like-img");
  oldLike.classList.toggle("like-clicked");
  like.appendChild(newLike);
  newLike.classList.toggle("like-clicked");
  });
});
function displayAlreadyAdded()
{
  const messageDiv = document.createElement("div");
  messageDiv.className = "already-added-box";
  const x = document.createElement("p");
  x.className = "x-div";
  x.textContent = "X";
  const message = document.createElement("p");
  message.className = "already-added-message";
  message.textContent = "Item already in cart!!";
  messageDiv.appendChild(x);
  messageDiv.appendChild(message);
  document.body.appendChild(messageDiv);
  messageDiv.classList.add("show");
  setTimeout(() => {
    messageDiv.classList.remove("show");
  },500);
}
function displaySuccessfullyAdded(){
  const messageDiv = document.createElement("div");
  messageDiv.className = "added-to-cart-message-box";
  const x = document.createElement("div");
  x.className = "check-img-box";
  const checkImg = document.createElement("img");
  checkImg.src = "pictures/check.png";
  checkImg.className = "check-img";
  x.appendChild(checkImg);
  const message = document.createElement("p");
  message.className = "added-to-cart-message";
  message.textContent = "Item Successfully Added!";
  messageDiv.appendChild(x);
  messageDiv.appendChild(message);
  document.body.appendChild(messageDiv);
  messageDiv.classList.add("show-message");
  setTimeout(() => {
    messageDiv.classList.remove("show-message");
  },1000);
}
const input = document.querySelector(".search-input");
const listOfItems = document.querySelectorAll(".big-menu-items");
const nameListWords = document.querySelectorAll(".menu-item-name");
let nameList = [];
nameListWords.forEach(item => {
  nameList.push(item.textContent);
});
console.log(listOfItems.length);
console.log(nameList.length);

function readInput(){
    console.log("typing...");
    const inputValue = input.value.toLowerCase();

    listOfItems.forEach((item, index) => {
        const name = nameList[index].toLowerCase();

        if(name.includes(inputValue)){
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}
input.addEventListener('input',() =>{
  readInput();
})
const deliveryEditBtn = document.querySelector(".checkout-edit-button");
const actualLocation = document.querySelector(".actual-location");
const newLocationBox = document.querySelector(".new-location-box");
const confirmLocationBtn = document.querySelector(".confirm-btn");
newLocationBox.style.display= "none";

deliveryEditBtn.addEventListener('click',() =>{
  newLocationBox.style.display = "flex";
  const newLocation = document.querySelector(".new-location");
  confirmLocationBtn.addEventListener('click',() => {
    if(newLocation.value !== "")
    {
      actualLocation.textContent = newLocation.value;
    }
    newLocationBox.style.display = "none";
    newLocation.value = "";
  });
});

const paymentEditBtn = document.querySelector(".payment-edit-button");
const paymentOptionsBox = document.querySelector(".payment-options-box");
const paymentOptions = document.querySelectorAll(".payment-options-box p");
const visaNumber = document.querySelector(".visa-number");
const paymentImg = document.querySelector(".visa-img");
const numberBox = document.querySelector(".number-box");
const numberInput = document.querySelector(".new-number");
const confirmPaymentBtn = document.querySelector(".confirm-btn2");
paymentOptionsBox.style.display= "none";
numberBox.style.display = "none";

paymentEditBtn.addEventListener('click',() => {
  numberBox.style.display = "none";
  paymentOptionsBox.style.display = "flex";
  paymentOptions.forEach((option,index) => {
    option.addEventListener('click',() => {
      numberBox.style.display = "none";
      if(option.textContent === "Visa"){
        if(isNaN(visaNumber.textContent)){
          visaNumber.textContent = "Please enter a number";
        }
        paymentImg.src = "pictures/credit-card.png";
        numberBox.style.display = "flex";
        confirmPaymentBtn.addEventListener('click',() => {
          console.log(90);
          if(numberInput.value!= ""){
            visaNumber.textContent = numberInput.value;
          }
          numberBox.style.display = "none";
          numberInput.value = "";
        });
      }
      if(option.textContent === "Apple Pay"){
        if(isNaN(visaNumber.textContent)){
          visaNumber.textContent = "Please enter a number";
        }
        paymentImg.src = "pictures/apple-pay.png";
        numberBox.style.display = "flex";
        confirmPaymentBtn.addEventListener('click',() => {
          console.log(90);
          if(numberInput.value!= ""){
            visaNumber.textContent = numberInput.value;
          }
          numberBox.style.display = "none";
          numberInput.value = "";
        });
      }
      if(option.textContent === "Cash"){
        paymentImg.src = "pictures/dollar.png";
        visaNumber.textContent = "Please make sure amount is ready"
      }
      paymentOptionsBox.style.display= "none";
    });
  });
}); 
const newOrder = document.querySelector(".previous-order");
const profileName = document.querySelector(".profile-name");
const profileEmail = document.querySelector(".profile-email");
const confirmOrderBtn = document.querySelector(".confirm-order-button");
const profileInputs = document.querySelector(".profile-inputs");
const confirmName = document.querySelector(".confirm-name");
const confirmEmail = document.querySelector(".confirm-email");
profileInputs.style.display = "none";
const editProfile = document.querySelector(".edit-profile-button");
const eachInput1 = document.querySelector(".each-input-box1");
const eachInput2 = document.querySelector(".each-input-box2");
const nameAndEmail1 = document.querySelector(".name-and-email1");
const nameAndEmail2 = document.querySelector(".name-and-email2");

editProfile.addEventListener('click',() => {
  const nameInput = document.querySelector(".name-input");
  const emailInput = document.querySelector(".email-input");
  profileInputs.style.display = "flex";
  eachInput1.style.display = "flex";
  nameAndEmail1.style.display = "flex";
  confirmName.addEventListener('click',() => {
    if(nameInput.value!== ""){
    profileName.textContent = nameInput.value;
    }
    eachInput1.style.display = "none";
    nameAndEmail1.style.display = "none";
    nameInput.value = "";
  });
  eachInput2.style.display = "flex";
  nameAndEmail2.style.display = "flex";
  confirmEmail.addEventListener('click',() => {
    if(emailInput.value!== ""){
    profileEmail.textContent = emailInput.value;
    }
    eachInput2.style.display = "none";
    nameAndEmail2.style.display = "none";
    emailInput.value = "";
  });
});
const logoutBtn = document.querySelector(".logout-button");
const signInBtn = document.querySelector('.sign-in-button');
const alreadyExistsMessage = document.querySelector(".account-exists-message");
const emailRequired = document.querySelector(".email-required");
const passRequired = document.querySelector(".password-required");
const bottomNav = document.querySelector('.bottom-nav-bar');
alreadyExistsMessage.style.display = "none";
emailRequired.style.display = "none";
passRequired.style.display = "none";
const accountsList = [];
const account = [];
logoutBtn.addEventListener('click',() => {
  showPage("login-sec","Login","#loginPage");
  bottomNav.style.display = "none";
});
signInBtn.addEventListener('click',()=> {
    
    const emailInput = document.querySelector('.login-email');
    const email = emailInput.value;
    const passInput = document.querySelector('.login-password');
    const password = passInput.value;
    const newAccount = [];
    if(email === "" && password === ""){
      emailRequired.style.display = "block";
      setTimeout(()=>{
        emailRequired.style.display = "none";
      },2000);
      passRequired.style.display = "block";
      setTimeout(()=>{
        passRequired.style.display = "none";
      },2000);
      return;
    }
    if(email===""){
      emailRequired.style.display = "block";
      setTimeout(()=>{
        emailRequired.style.display = "none";
      },2000);
      return;
    }
    if(password===""){
      passRequired.style.display = "block";
      setTimeout(()=>{
        passRequired.style.display = "none";
      },2000);
      return;
    }
    if(accountsList.length!==0){
          let exists = 0;
          for(let i = 0; i<accountsList.length;i++){  
            if(accountsList[i][0]===email){
              if(accountsList[i][1]===password){
                showPage("verification-sec","Verification","#verificationPage");
                return;
              }
              else{
                exists = 1;
              }
            }
          }
          if(exists===1){
            alreadyExistsMessage.style.display = "block";
            setTimeout(()=>{
              alreadyExistsMessage.style.display = "none";
            },2000);
            return;
          }
          else{
            newAccount.push(email);
            newAccount.push(password);
            accountsList.push(newAccount);
            profileEmail.textContent = email;
        }
    }
    else{
      newAccount.push(email);
      newAccount.push(password);
      accountsList.push(newAccount);
      profileEmail.textContent = email;
    }
    showPage("verification-sec","Verification","#verificationPage");

  })
const verifyButton = document.querySelector(".verify-button");
const enterValid = document.querySelector(".please-valid-text");
const invalidCode = document.querySelector(".invalid-text");
const codeNumber = document.querySelector(".code-number");
const successfullyLoggedIn = document.querySelector(".logged-in-message");

let code = Math.floor(1000 + Math.random() * 9000);
codeNumber.textContent = code;
enterValid.style.display = "none";
invalidCode.style.display = "none";

verifyButton.addEventListener('click',()=>{
  let checkInputs = 0;
  const codeInputs = document.querySelectorAll(".verification-inputs");
  codeInputs.forEach(input => {
    if(input.value === "" || isNaN(input.value)){
      checkInputs = 1;
      console.log("yes");
    } 
  });
  if(checkInputs === 1){
    enterValid.style.display = "flex";
      setTimeout(()=>{
        enterValid.style.display = "none";
      },2000);
      return;
  }
  checkInputs=0;
  let codeList = code.toString();
  let checkCode = 0;
  for(let i = 0; i<codeList.length;i++){
    if(codeList[i]!==codeInputs[i].value){
      checkCode=1;
      
    }
  }
  if(checkCode===1){
      invalidCode.style.display = "flex";
      setTimeout(()=>{
        invalidCode.style.display = "none";
      },2000);
      return;
    }
    else{
      showPage("home-sec","Home","#homePage");
      successfullyLoggedIn.style.opacity = "1";
      successfullyLoggedIn.style.transform = "translateY(-400%)";
      setTimeout(()=>{
        successfullyLoggedIn.style.opacity = "0";
        successfullyLoggedIn.style.transform = "translateY(-480%)";
      },3000);
      codeInputs.forEach(input => {
        input.value = "";
      });
      const newCode = Math.floor(1000 + Math.random() * 9000);
      code = newCode;
      codeNumber.textContent = code;
      home.querySelector("p").classList.remove("unclicked-nav");
      home.querySelector("p").classList.add("clicked-nav");
      profile.querySelector("p").classList.remove("clicked-nav");
      bottomNav.style.display = "flex";
    }
});
const resendBtn = document.querySelector(".resend-button");
resendBtn.addEventListener('click',()=>{
  let newCode = Math.floor(1000 + Math.random() * 9000);
  code = newCode;
  codeNumber.textContent = code;
});
const arrowVerifyBtn = document.querySelector(".back-arrow-verify-box");
arrowVerifyBtn.addEventListener('click',()=>{
  showPage("login-sec","Login","#loginPage");
});
const customItems = document.querySelectorAll(".each-food");
const progress = document.querySelector(".progress");
const score = document.querySelector(".score");
let scoreTotal = 0;
let customTotalCost = 0;
const startBuildingBtn = document.querySelector(".start-box");
const proceedCustomBtn = document.querySelector(".custom-proceed-box");
const totalCustomAmount = document.querySelector(".total-custom-amount");
const totalCustomBox = document.querySelector(".total-custom-checkout-box");
const customItemSubtotal = document.querySelector(".custom-item-box");
const totalCustomCost = document.querySelector(".total-custom-cost");
let customList = null;
proceedCustomBtn.style.display = "none";
startBuildingBtn.addEventListener('click',()=>{
  showPage("custom-builder-sec","Custom Builder","#customPage");
});

customItems.forEach(item => {
  const plus = item.querySelector(".plus-food");
  const minus = item.querySelector(".minus-food");
  const amount = item.querySelector(".food-amount");
  const cost = item.querySelector(".food-cost");
  const costNumber = parseFloat(cost.textContent.replace("$",""));
  const itemPoints = parseInt(item.querySelector(".points-and-img p").textContent.replace("pts",""),10);
  const notEnoughMessage = document.querySelector(".not-enough-message");
  let number = parseInt(amount.textContent);
  let test = null;
  plus.addEventListener('click',()=>{
    number = parseInt(amount.textContent);
    if(scoreTotal<=10){
      console.log(number);
      number++;
      amount.textContent = number;
      scoreTotal+=itemPoints;
      proceedCustomBtn.style.display = "flex";
      customTotalCost+=costNumber;
      totalCustomAmount.textContent = "$"+customTotalCost.toFixed(2);
      totalCustomCost.textContent = totalCustomAmount.textContent;
      const newItem = document.createElement("div");
      newItem.className = "new-item";
      const newItemName = document.createElement("p");
      newItemName.className = "new-item-name";
      const newItemCost = document.createElement("p");
      newItemCost.className = "new-item-cost";
      newItemName.textContent = item.querySelector(".food-name").textContent;
      newItemCost.textContent = "$"+(costNumber*number).toFixed(2);
      const allNewItems = document.querySelectorAll(".new-item");
      customList = allNewItems;
      let checker = 0;
      allNewItems.forEach(items =>{
        if(items.querySelector(".new-item-name").textContent===newItemName.textContent){
          test = items;
          checker = 1;
          items.querySelector(".new-item-cost").textContent = "$"+(costNumber*number).toFixed(2);
          if(scoreTotal>10){
            number--;
            items.querySelector(".new-item-cost").textContent = "$"+(costNumber*number).toFixed(2);
            number++;
          }
        }
      })
      if(checker!==1 && scoreTotal<=10){
        console.log(123);
        newItem.appendChild(newItemName);
        newItem.appendChild(newItemCost);
        customItemSubtotal.appendChild(newItem);
        //newItemCost.textContent = "$"+(costNumber*number).toFixed(2);
      }
      
    } 
    if(scoreTotal>10)
    {
      if(customTotalCost>=0){
        customTotalCost-=costNumber;
      }
      totalCustomAmount.textContent = "$"+customTotalCost.toFixed(2);
      totalCustomCost.textContent = totalCustomAmount.textContent;
      scoreTotal-=itemPoints;
      number--;
      amount.textContent = number;
      notEnoughMessage.style.opacity = "1";
      notEnoughMessage.style.transform = "translateY(0)";
      setTimeout(()=>{
        notEnoughMessage.style.opacity = "0";
        notEnoughMessage.style.transform = "translateY(-300px)";
      },2000);

    }
    score.textContent = scoreTotal;
    progress.value = scoreTotal;
  });
  minus.addEventListener('click',()=>{
    if(number>0){
      number--;
      amount.textContent = number;
      scoreTotal-=itemPoints;
      score.textContent = scoreTotal;
      progress.value = scoreTotal;
      if(customTotalCost>=0){
        customTotalCost-=costNumber;
      }
      else{
        customTotalCost = 0;
      }
      totalCustomAmount.textContent = "$"+customTotalCost.toFixed(2);
      totalCustomCost.textContent = totalCustomAmount.textContent;
      if(customItemSubtotal.contains(test)){
        if(test.contains(test.querySelector(".new-item-cost"))){
        test.querySelector(".new-item-cost").textContent = "$"+(costNumber*number).toFixed(2);
        }
      }
      
    }
    
    if(number === 0){
      const foodName = item.querySelector(".food-name").textContent;
      const allNewItems = document.querySelectorAll(".new-item");
      allNewItems.forEach(newItem => {
        const newItemName = newItem.querySelector(".new-item-name").textContent;
        if(newItemName === foodName){
          newItem.remove();
        }
      });

    }

    if(scoreTotal===0){
    proceedCustomBtn.style.display = "none";
    }
  });
});
const amountList = document.querySelectorAll(".food-amount");
totalCustomBox.style.display = "none";
proceedCustomBtn.addEventListener('click',()=>{
  showPage("checkout-sec","Checkout","#checkoutPage");
  totalCustomBox.style.display = "flex";
  //checkoutSection.appendChild(totalCustomBox);
  //totalCustomBox.appendChild(customItemSubtotal);
});
const confirmCustomOrder = document.querySelector(".confirm-order-button");
  confirmCustomOrder.addEventListener('click',()=>{
    let itemsCount = 0;
    document.querySelectorAll(".new-item").forEach(item => {
      itemsCount++;
    });
    console.log(456);
    let oldCount = 0;
    showPage("orders-sec","Orders","#ordersPage");
    const cartItemsNumber = document.createElement("p");
    cartItemsNumber.className = "cart-items-number";
    if(totalCustomBox.style.display === "flex")
    {
      const id = Math.floor(100000 + Math.random() * 900000);
      const newOrderBox = document.createElement("div");
      newOrderBox.className = "new-order-box";
      const orderIDBox = document.createElement("div");
      orderIDBox.className = "order-id-box";
      const upperBox = document.createElement("div");
      upperBox.className = "upper-box";
      const status = document.createElement("p");
      status.className = "status";
    setTimeout(()=> {
      status.textContent = "Processing";
      status.style.color = "rgb(240, 69, 69)";
      status.style.fontWeight = "bold";
    setTimeout(()=> {
        status.textContent = "Delivered";
        status.style.color = "green";
        status.style.fontWeight = "bold";
      },15000);
    },1);
    const orderID = document.createElement("p");
    orderID.className = "order-id";
    orderID.textContent = "Order "+"#"+id;
    const date = document.createElement("p");
    date.className = "date";
    const day = Math.floor(Math.random() * 30) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    date.textContent = "Date: "+ "2026-"+month+"-"+day;
    cartItemsNumber.textContent = itemsCount + " items";
    const lowerBox = document.createElement("div");
    lowerBox.className = "lower-box";
    const totalWord = document.createElement("p");
    totalWord.className = "total-word-order";
    totalWord.textContent = "Total";
    const totalOrder = document.createElement("p");
    totalOrder.textContent =totalCustomCost.textContent;
    points = parseInt(numberOfPoints.textContent,10);
    points+=Math.floor(totalAmount);
    numberOfPoints.textContent = points;
    totalOrder.className = "total-order";
    orderIDBox.appendChild(orderID);
    orderIDBox.appendChild(status);
    upperBox.appendChild(orderIDBox);
    upperBox.appendChild(date);
    upperBox.appendChild(cartItemsNumber);
    lowerBox.appendChild(totalWord);
    lowerBox.appendChild(totalOrder);
    newOrderBox.appendChild(upperBox);
    newOrderBox.appendChild(lowerBox);
    ordersSection.appendChild(newOrderBox);
    } 
    else if(document.querySelector(".subtotal-box")){
      console.log("ok");
      document.querySelectorAll(".subtotal-box").forEach(() => {
        oldCount++;
      });
      cartItemsNumber.textContent = oldCount + " items";
    }
    
    customTotalCost = 0;
    totalCustomAmount.textContent = "$"+customTotalCost.toFixed(2);
    proceedCustomBtn.style.display = "none";
    progress.value = 0;
    scoreTotal = 0;
    score.textContent = scoreTotal;
    totalCustomBox.style.display = "none";
    amountList.forEach(amount => {
      amount.textContent = 0;
    });

    document.querySelectorAll(".new-item").forEach(item =>{
      item.remove();
      
    });
  });
  const backCustom = document.querySelector(".arrow-builder");
  backCustom.addEventListener('click',()=>{
    showPage("home-sec","Home","#homePage");
  });
  const requestButton = document.querySelector(".add-img-box");
  requestButton.addEventListener('click',()=>{
    showPage("request-sec","Request","#requestPage");
  });
  const requestBack = document.querySelector(".request-arrow");
  requestBack.addEventListener('click',()=>{
    showPage("home-sec","Home","#homePage");
  });
  const selectCategory = document.querySelector(".select-category-text");
  const categoryList = document.querySelector(".category-box");
  const categories = document.querySelectorAll(".category-option");
  selectCategory.addEventListener('click',()=>{
    if(categoryList.style.opacity === "0")
    {
      categoryList.style.maxHeight = "300px";
      categoryList.style.opacity = "1";
    }
    else{
      categoryList.style.maxHeight = "0";
      categoryList.style.opacity = "0";
    }

  });
  categories.forEach(category => {
    category.addEventListener("click",()=>{
      selectCategory.textContent = category.textContent;
      categoryList.style.maxHeight = "0";
      categoryList.style.opacity = "0";
    });
  });
  const proposalButton = document.querySelector(".proposal-button");
  const successSection = document.querySelector(".success-section");
  const successSection2 = document.querySelector(".success-section2");
  const dishRequired = document.querySelector(".dish-name-required");
  const descriptionRequired = document.querySelector(".description-required");
  const ingredientsRequired = document.querySelector(".ingredients-required");
  const dishInput = document.querySelector(".dish-name-input");
  const descriptionInput = document.querySelector(".big-text-box");
  const ingredientsInput = document.querySelector(".ingredients-text-box");
  dishRequired.style.display = "none";
  descriptionRequired.style.display = "none";
  ingredientsRequired.style.display = "none";

  proposalButton.addEventListener('click',()=>{
    if(dishInput.value === "" && descriptionInput.value === "" && ingredientsInput.value === ""){
  dishRequired.style.display = "flex";
  descriptionRequired.style.display = "flex";
  ingredientsRequired.style.display = "flex";
  setTimeout(() => {
    dishRequired.style.display = "none";
    descriptionRequired.style.display = "none";
    ingredientsRequired.style.display = "none";
  }, 2000);
    }
    else if(dishInput.value === "" && descriptionInput.value === ""){
      dishRequired.style.display = "flex";
      descriptionRequired.style.display = "flex";
      setTimeout(() => {
        dishRequired.style.display = "none";
        descriptionRequired.style.display = "none";
      }, 2000);
    }
    else if(dishInput.value === "" && ingredientsInput.value === ""){
      dishRequired.style.display = "flex";
      ingredientsRequired.style.display = "flex";
      setTimeout(() => {
        dishRequired.style.display = "none";
        ingredientsRequired.style.display = "none";
      }, 2000);
    }
    else if(descriptionInput.value === "" && ingredientsInput.value === ""){
      descriptionRequired.style.display = "flex";
      ingredientsRequired.style.display = "flex";
      setTimeout(() => {
        descriptionRequired.style.display = "none";
        ingredientsRequired.style.display = "none";
      }, 2000);
    }
    else if(dishInput.value === ""){
      dishRequired.style.display = "flex";
      setTimeout(() => {
        dishRequired.style.display = "none";
      }, 2000);
    }
    else if(descriptionInput.value === ""){
      descriptionRequired.style.display = "flex";
      setTimeout(() => {
        descriptionRequired.style.display = "none";
      }, 2000);
    }
    else if(ingredientsInput.value === ""){
      ingredientsRequired.style.display = "flex";
      setTimeout(() => {
        ingredientsRequired.style.display = "none";
      }, 2000);
    }
    else {
      successSection.style.transform = "scale(1)";
      successSection.style.opacity = "1";
      setTimeout(() => {
        successSection.style.transform = "scale(0)";
        successSection.style.opacity = "0";
      }, 2000);

      successSection2.style.transform = "scale(1)";
      successSection2.style.opacity = "1";
      setTimeout(() => {
        successSection2.style.transform = "scale(0)";
        successSection2.style.opacity = "0";
      }, 4000);

      setTimeout(() => {
        showPage("home-sec", "Home", "#homePage");
      }, 2000);
    }

  });