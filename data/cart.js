export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart){
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    //shortcut
    //const {productId} = button.dataset;
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
      
    const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`);
    
    const quantity = Number(quantitySelect.value);

    if(matchingItem){
        matchingItem.quantity += quantity;
    }else{
        cart.push({
            productId,
            quantity,
            deliveryOption: '1'
        });
    }
    saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();   
    updateCheckout();
}

export function updateCheckout(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-item-number').innerHTML = `${cartQuantity} items`;
}

export function updateQunatity(productId, newQuantity){
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    matchingItem.quantity = newQuantity;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    console.log('productId:', productId);
    console.log('deliveryOptionId:', deliveryOptionId);

    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
    } else {
        console.error(`Product with ID ${productId} not found in the cart.`);
    }
}

