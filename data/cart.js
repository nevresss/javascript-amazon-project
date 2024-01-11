export const cart = [];

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
            quantity
        });
    }
}