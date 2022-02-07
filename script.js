'use strict';
//VARIABLES AND CONSTANTS
let arrCart = [];
let arrWishCart = [];
const domProducts = document.querySelector(".products");
const domCartItems =document.querySelector(".cartItems");
const domSubTotal = document.querySelector(".subTotal");
const domWishlistItems = document.querySelector(".wishCart");
const domtotalItemsInCart = document.querySelector(".totalItemsInCart");
const domClearCartBtn = document.querySelector("#clearAllBtn");

//FUNKTIONS
//--------Render Products Fnc---------------
function renderProductsFnc() {
    products.forEach((product) => {
        domProducts.innerHTML += `
    <div class="item">
        <div class="itemWrapper">
            <div class="itemImg">
                <img src="${product.imgSrc}" alt="${product.name}">
            </div>

            <div class="itemAddToWishlist">
                <i id ="checkHeart${product.id}" class="far fa-heart fa-2x" onClick="addToWishListFnc(${product.id},this)" ></i>
            </div>

            <div class="itemAddToCart" onClick="addToCartFnc(${product.id})">
                 <img src="Icons/bagPlus.png" alt="add to cart">
            </div>

            <div class="itemDescription">
                <h2>${product.name}</h2>
                <p>"${product.description}" </p>
            </div>

            <div class="itemPrice">
                <h3>${product.price}$</h3>
            </div>

        </div>
    </div>`;
    });
}
renderProductsFnc();

//--------add to cart Fnc---------------
function addToCartFnc(id) {
    const giftitem=(giftItem) => giftItem.id === id;
    if (arrCart.some(giftitem)) {
        //console.log("already exist");
        changeUnitFnc(id,"plus");
    } else {
        //console.log(id);
        const domItem = products.find((product) => product.id === id);
        //console.log(domItem);
        arrCart.push({ ...domItem, noOfUnits: 1, });
        //console.log(arrCart);
    }
    updateCartItemsFunc();
}


//--------render cart items Fnc---------------
function renderCartItemsFnc(){
    domCartItems.innerHTML="";
    arrCart.forEach((giftItem)=>{
    domCartItems.innerHTML +=`
    <div class="cartItem">
            <div class="itemInfo">
                <img src="${giftItem.imgSrc}" alt="${giftItem.name}">
                <h3>${giftItem.name}</h3>
                <i class="far fa-trash-alt fa-2x deleteIcn" onClick="removeItemFnc(${giftItem.id})"></i>
                
            </div>
            <div class="unitPrice">
                <small>$</small>${giftItem.price}
            </div>
            <div class="units">
                <div class="btn minus" onClick="changeUnitFnc(${giftItem.id}, 'minus')">-</div>
                <div class="unitsNumber">${giftItem.noOfUnits}</div>
                <div class="btn plus"  onClick="changeUnitFnc(${giftItem.id}, 'plus')">+</div>           
            </div>
        </div>
        <hr>`;

    });
}

//--------update cart Fnc---------------
function updateCartItemsFunc(){
    renderCartItemsFnc();
    renderTotalFnc();
    localStorage.setItem("cartKey",JSON.stringify(arrCart));
}
    arrCart =JSON.parse( localStorage.getItem("cartKey") ) || [];
    updateCartItemsFunc();

//------change unit fnc---------
function changeUnitFnc(id,action){
    arrCart = arrCart.map((item)=>{
        let domNoOfUnits = item.noOfUnits;
        if (item.id === id){
            
             if (action === "plus" && domNoOfUnits < item.instock)
            {
                domNoOfUnits++;
            }
            else if (action === "minus" &&  domNoOfUnits > 1)
            {
                domNoOfUnits--;
            }
                else if( action === "plus" &&  domNoOfUnits == item.instock){
                alert(`Attention,From Gift ${item.id+1}, only : ${item.instock} available in stock `);
            }
           
        }
        
        return {...item,noOfUnits : domNoOfUnits,};
    });
    updateCartItemsFunc();
} 
//-----------renderTotalFnc------
function renderTotalFnc(){
    let totalPrice = 0 ;
    let noOfItems =0;

    arrCart.forEach((el)=>{
        totalPrice += el.price * el.noOfUnits;
        noOfItems += el.noOfUnits;
    });
    domSubTotal.innerHTML=` Subtotal (${noOfItems} items): ${totalPrice.toFixed(2)}$`;
    //totalItemsInCart icon in nav update
    domtotalItemsInCart.innerHTML = noOfItems;
}

//----clear all in cart----*/
function clearCartFnc(){
    domCartItems.innerHTML ="";
    arrCart= [];
    updateCartItemsFunc();
}
//----remove one item in cart----*/
function removeItemFnc(id)
{   
   // arrCart = arrCart.splice(id,1);
    arrCart = arrCart.filter((item) => item.id !== id);
    updateCartItemsFunc();
}

//---renderWishlistItems----*/
function renderWishlistItems() {
    domWishlistItems.innerHTML = "";
    arrWishCart.forEach((giftItem) => {
        domWishlistItems.innerHTML += `
            <div class="wishItems">
                <div class="cartItem">
                    <div class="itemInfo">
                        <img id="${giftItem.id}" src="${giftItem.imgSrc}" alt="${giftItem.name}"> 
                        <h3>"${giftItem.name}"</h3>
                    </div>
                    <div class="unitPrice">
                        <small>$</small>${giftItem.price}
                    </div>
                </div>  
            </div>          
        <hr>`
    });
}
renderWishlistItems();

//---addToWishListFnc----*/
function addToWishListFnc(id, item) {
    if (arrWishCart.some((Item) => Item.id === id)) {
        alert("already saved in wish list!");
    }
    else {
        item.classList.toggle("fas");
        const domwishItem = products.find((product) => product.id === id);
        arrWishCart.push({ ...domwishItem });
    }

    updateWishCartfnc();
}

//----update wishcart fnc---*/
function updateWishCartfnc() {
    renderWishlistItems();
}
   
//----clearWishFnc ---*/
function clearWishFnc() {
    arrWishCart.forEach((wishproduct) => {
        //console.log(wishproduct.id);
        //const  wishicon = document.getElementById("checkHeart"+wishproduct.id);
        const wishicon = document.getElementById(`checkHeart${wishproduct.id}`);
        wishicon.classList.toggle("fas");
    });
    domWishlistItems.innerHTML = "";
    arrWishCart = [];
    updateWishCartfnc();
}
clearWishFnc();

const init = () => {
console.log("Welcome to our gift shop");
}
document.addEventListener("DOMContentLoaded", init);
//------------------------------------------------