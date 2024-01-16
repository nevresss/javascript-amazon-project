import {cart, removeFromCart, updateCheckout, updateQunatity, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import formatCurrenncy from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOption.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary(){

    let cartSummary = '';

    cart.forEach((cartItem)=>{

        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOptions.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );
        console.log(dateString);

        cartSummary +=
        `
        <div class="cart-item-container js-cart-item-container js-cart-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrenncy(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span> 
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="js-update-quantity update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="js-quantity-input-${matchingProduct.id} quantity-input">
                    <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
        `;
    });

    function deliveryOptionHTML(matchingProduct, cartItem){

        let html = '';

        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrenncy(deliveryOption.priceCents)} -`;
            
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
            <div class="delivery-option js-delivery-option">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
            `
        });
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummary;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            removeFromCart(productId);

            document.querySelector(`.js-cart-container-${productId}`).remove();

            renderPaymentSummary();
        });
    });

    updateCheckout();

    document.querySelectorAll('.js-update-quantity').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;

            document.querySelector(`.js-cart-container-${productId}`).classList.add('is-editing-quantity');
            document.querySelector('.js-update-quantity').classList.add('hide-update');
        });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;

            document.querySelector(`.js-cart-container-${productId}`).classList.remove('is-editing-quantity');

            const quantityFromInput = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(quantityFromInput.value);
            if (newQuantity < 0 || newQuantity >= 1000) {
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }
            updateQunatity(productId, newQuantity);
            
            const quantityLabel = document.querySelector(
                `.js-quantity-label-${productId}`
            );
            quantityLabel.innerHTML = newQuantity;
        
            
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const inputElement = element.querySelector('input');
            if (inputElement) {
                const productId = inputElement.dataset.productId;
                const deliveryOptionId = inputElement.dataset.deliveryOptionId;
                if (productId && deliveryOptionId) {
                    updateDeliveryOption(productId, deliveryOptionId);
                    renderOrderSummary();
                    renderPaymentSummary();
                } else {
                    console.error('Missing data attributes (productId or deliveryOptionId).');
                }
            } else {
                console.error('Input element not found within the delivery option.');
            }
        });
    });  
}
