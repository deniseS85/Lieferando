let menus = [
    {
        'titles': 'Flammkuchen', 
        'foods': [
            {
                'title': 'Flammkuchen Speck',
                'description' : 'Knuspriger dünner Teigboden belegt mit Speck, Zwiebeln und Mozzarella.',
                'price': 15.5,
                'image': 'img/fk_speck.jpg'
            },
            {
                'title': 'Flammkuchen Mozzarella',
                'description': 'Knuspriger dünner Teigboden belegt mit Tomaten, Basilikum und Mozzarella.',
                'price': 15.5,
                'image': 'img/fk_mozz.jpeg'
            },
            {
                'title': 'Flammkuchen Vegetarisch',
                'description': 'Knuspriger dünner Teigboden belegt mit Gemüse, Feta und Mozzarella.',
                'price': 15.5,
                'image': 'img/fk_veggie.jpeg'
            }
        ]
    },
    {
        'titles': 'Salate',
        'foods': [
            {
                'title': 'Salat mit Ziegenkäse',
                'description' : 'Frischer Salat mit überbackenem Ziegenkäse.',
                'price': 14.4,
                'image': 'img/salatziege.jpeg'
            },
            {
                'title': 'Salat mit Gambas',
                'description' : 'Frischer Salat mit Gambas in Cocktailsauce',
                'price': 14.4,
                'image': 'img/salatcocktail.jpeg'
            }
        ]
    },
    {
        'titles': 'Pasta',
        'foods': [
            {
                'title': 'Pasta mit Gambas',
                'description' : 'Tallarine mit frischen Gambas und einer delikaten Sauce.',
                'price': 12.9,
                'image': 'img/pastagambas.jpeg'
            },
            {
                'title': 'Pasta Bolognese',
                'description' : 'Tallarine mit einer leckeren Hackfleisch-Sauce.',
                'price': 10.9,
                'image': 'img/pastabolo.jpg'
            }
        ]
    }, 
    {
        'titles': 'Wok',
        'foods': [
            {
                'title': 'Wok Gambas',
                'description' : 'Knackiges Gemüse angebraten im Wok mit frischen Gambas. Dazu wird Reis serviert.',
                'price': 12.9,
                'image': 'img/wokgambas.jpeg'
            },
            {
                'title': 'Wok mit Huhn',
                'description' : 'Knackiges Gemüse angebraten im Wok mit Hühnchen. Dazu wird Reis serviert.',
                'price': 11.9,
                'image': 'img/wokhuhn.jpeg'
            }
        ]
    }, 
    {
        'titles': 'Fleisch',
        'foods': [
            {
                'title': 'Hamburger',
                'description' : 'Waggyu Fleisch mit Salat, Tomate und Zwiebelringe mit Pommes Frites',
                'price': 14.9,
                'image': 'img/hamburger.jpeg'
            },
            {
                'title': 'Schnitzel',
                'description' : 'Schnitzel Wiener Art mit Pommes Frites',
                'price': 14.9,
                'image': 'img/schnitzel.jpeg'
            },{
                'title': 'Spareribs',
                'description' : 'Saftige Spareribs mariniert in einer Barbecue-Sauce mit Ofenkartoffel',
                'price': 14.9,
                'image': 'img/spareribs.jpeg'
            }
        ]
    },
    {
        'titles': 'Fisch',
        'foods': [
            {
                'title': 'Dorade',
                'description' : 'Frische Dorade im Ganzen mit Gemüse a la plancha.',
                'price': 20.5,
                'image': 'img/dorade.jpeg'
            },
            {
                'title': 'Lachs',
                'description' : 'Frisches Lachsfilet mit Gemüse a la plancha.',
                'price': 20.5,
                'image': 'img/lachs.jpeg'
            }
        ]
    }
];

let basketFood = [];
let basketPrice = [];
let amounts = [];
let deliverCost = 1.5;

function render() {
    let foodNav = document.getElementById('foodNav');
    let foodSection = document.getElementById('foodSection');
    let orderView = document.getElementById('orderView');

    foodNav.innerHTML = '';
    foodSection.innerHTML = '';
    orderView.innerHTML = '';
    orderView.innerHTML += getBasket();

   for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        let title = menu['titles'];
        let food = menu['foods'];

        foodNav.innerHTML += getFoodNav(title, i);
        foodSection.innerHTML +=  /*html*/ `<h2 class="anchor" id="${title}">${title}</h2>`;
       
        loadOrder();

        for (let j = 0; j < food.length; j++) {
            let foodTitle = food[j]['title'];
            let foodDescription = food[j]['description'];
            let foodPrice = food[j]['price'];
            let formatedPrice = foodPrice.toFixed(2).replace('.', ',');
            let foodImage = food[j]['image'];
            
            foodSection.innerHTML += getFoodSection(foodTitle, foodDescription, foodPrice, formatedPrice, foodImage);
        }
        showBasket();
       
   } 
   linksColor();
}

function getFoodNav(title) {
    return /*html*/ `
        <a class="links" href="#${title}">${title}</a>`; 
}

function linksColor() {
    let nav = document.getElementById('foodNav');
    let links = nav.getElementsByClassName('links');
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function() {

        let current = document.getElementsByClassName("active");
            if (current.length > 0) { 
                current[0].className = current[0].className.replace(" active", "");
            }
                this.className += " active";
        });
    } 
}

function getFoodSection(foodTitle, foodDescription, foodPrice, formatedPrice, foodImage) {
    return /*html*/ `
        <div id="foodInfo">
            <div class="foodInfoContent">
                <div class="foodInfoLeft">
                    <div class="foodInfoTitle">${foodTitle}</div>
                    <div class="foodInfoDescription">${foodDescription}</div>
                    <div class="foodInfoPrice">${formatedPrice} €</div>
                </div>
                <div class="foodInfoImage">
                    <img src="${foodImage}">
                    <div onclick="addOrder(this, '${foodTitle}', ${foodPrice})" class="addOrder" style="border: none">&#5161;</div>
                </div>
            </div>
        </div>`         
}

function getBasket() {
    return /*html*/ `
        <img class="iconShopping" src="img/shoppingCart.png">
        <h2>Fülle deinen Warenkorb</h2>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>`;
}

function openRezensions() {
   let overlayReview = document.getElementById('overlayReview');
   let overlayRezensions = document.getElementById('overlayRezensions');
   let infoRating = document.getElementById('infoRating');
   let overlayInfos = document.getElementById('overlayInfos');
   let ratingText = document.getElementById('ratingText');
   let overlayText = document.getElementById('overlayText');

   document.body.style.overflowY = 'hidden';
   overlayReview.style.display = 'flex';
   infoRating.style.display = 'flex';
   overlayRezensions.style.display = 'flex';
   overlayInfos.style.display = 'none';
   ratingText.style.borderBottom = '4px solid rgb(243,104,3)';
   overlayText.style.border = 'none';
}

function openInfos() {
    let overlayReview = document.getElementById('overlayReview');
    let infoRating = document.getElementById('infoRating');
    let overlayInfos = document.getElementById('overlayInfos');
    let overlayRezensions = document.getElementById('overlayRezensions');
    let ratingText = document.getElementById('ratingText');
    let overlayText = document.getElementById('overlayText');
   
    document.body.style.overflowY = 'hidden';
    overlayReview.style.display = 'flex';
    infoRating.style.display = 'none';
    overlayRezensions.style.display = 'none';
    overlayInfos.style.display = 'flex';
    overlayText.style.borderBottom = '4px solid rgb(243,104,3)';
    ratingText.style.border = 'none';
}

function closeRezensions() {
    let overlayReview = document.getElementById('overlayReview');
    let ratingText = document.getElementById('ratingText');

    overlayReview.style.display = 'none';
    document.body.style.overflowY = '';
    ratingText.style.borderBottom = 'none';
}

function changeHeartIcon(el) {
    let heart = document.getElementById('heart');

    if (el.src.match('img/heart.png')) {
        el.src = 'img/heartActive.png';
    } else {
        heart.src = 'img/heart.png';
    }
}

function addOrder(el, foodTitle, foodPrice) {
    addBorderAddIcon(el);
    let index = basketFood.indexOf(foodTitle);
    if(index == -1) {
        basketFood.push(foodTitle);
        basketPrice.push(foodPrice);
        amounts.push(index+2);
    } else {
        amounts[index]++;
    }
    saveOrder();
    showBasket();
    loadOrder();
}

function saveOrder() {
    localStorage.setItem('foods', JSON.stringify(basketFood));
    localStorage.setItem('prices', JSON.stringify(basketPrice)); 
    localStorage.setItem('amountNum', JSON.stringify(amounts));
}

function loadOrder() {
    let food = localStorage.getItem('foods');
    let price = localStorage.getItem('prices');
    let amount = localStorage.getItem('amountNum');

    if (food && price && amount) {
        basketFood = JSON.parse(food);
        basketPrice = JSON.parse(price);
        amounts = JSON.parse(amount);
    }
}

function showBasket() {
    let basketView = document.getElementById('basketView');
    let orderView = document.getElementById('orderView');
    let calculation = document.getElementById('calculation');
    let calcBtn = document.getElementById('calcButton');
    let respBtn = document.getElementById('respBtn');
    
    basketView.innerHTML = '';
    calculation.innerHTML = '';
    calcBtn.innerHTML = '';
    respBtn.innerHTML = '';
   
    for (let i = 0; i < basketFood.length; i++) {
        let food = basketFood[i];
        let price = basketPrice[i];
        let amount = amounts[i];
       
        basketView.innerHTML += shoppingCard(food, price, amount, i);

        orderView.style.display = 'none';
        calculation.innerHTML = calculationOrder();
        calcBtn.innerHTML = `<button>Bezahlen ${total.toFixed(2).replace('.',',')} €</button>`;
        respBtn.innerHTML = `<button onclick="showBasketResponsiv()" class="basketResponsiv">Warenkorb (${total.toFixed(2).replace('.',',')} €)</button>`;
    }   
}   

function shoppingCard(food, price, amount, i) {
    return /*html*/ `
        <div class="basketItems"> 
            <div class="amount">${amount}</div>
            <div class="food">${food}</div>
            <div class="price">${price.toFixed(2).replace('.', ',')} €</div>
        </div>
        <div class="changeOrder">
            <div class="plusMinus">
                <div onclick="reduceAmount('${i}')" class="minus">-</div>
                <div onclick="addAmount('${i}')" class="addOrder">&#5161;</div>
            </div>
            <div>
                <img onclick="deleteProduct('${i}')" class="delete" src="img/delete.png">
            </div>
        </div>`;
}

function deleteProduct(i) {
    basketFood.splice(i, 1);
    basketPrice.splice(i, 1);
    amounts.splice(i, 1);
    showBasket();
    saveOrder();
    render();
}

function calculationOrder() {
    return /*html*/ `
        <div class="calcDescription">
            <div>Zwischensumme</div>
            <div>Lieferkosten</div>
            <b><div>Gesamt</div></b>
        </div>
        <div class="calcNum">
            <div>${subTotal().toFixed(2).replace('.',',')} €</div>
            <div>&ensp;${deliverCost.toFixed(2).replace('.', ',')} €</div>
            <div>${total.toFixed(2).replace('.', ',')} €</div>
        </div>`;
}

function subTotal() {
    let sum = 0;

    for (let i = 0; i < basketPrice.length; i++) {
        sum += amounts[i] * basketPrice[i];
    
        if (sum < 20) {
            deliverCost = 1.5;
        } else {
            deliverCost = 0;
        } 
    total = sum + deliverCost;
    }
   return sum;
}

function reduceAmount(i) {
    if (amounts[i] > 1) {
        amounts[i]--;
    } else {
        basketFood.splice(i, 1);
        basketPrice.splice(i, 1);
        amounts.splice(i, 1);
    }
    showBasket();
    saveOrder();  
    render();
}

function addAmount(i) {
    amounts[i]++;
    saveOrder();
    showBasket();
}

function addBorderAddIcon(el) {
    let addIcon = el.closest('.foodInfoContent').querySelector('.addOrder');
   
    if (addIcon.style.border === 'none') {
        removeBorderAddIcon();
        addIcon.style.border = '1px solid black';
        addIcon.style.marginLeft = '18px';
    } 
}

function removeBorderAddIcon() {
    let addIcon = document.querySelectorAll('.addOrder');

    for (let i = 0; i < addIcon.length; i++) {
        addIcon[i].style.border = 'none'; 
        addIcon[i].style.marginLeft = '20px';
    }  
}

function doNotClose(event) {
    event.stopPropagation();
}

function showBasketResponsiv() {
    let cartResponsiv = document.getElementById('shoppingCart');
    let isHidden = cartResponsiv.classList.contains("d-none");
    let btn = document.getElementsByClassName('basketResponsiv');
 
    if (isHidden) {
        cartResponsiv.classList.remove("d-none");
        cartResponsiv.classList.remove("shoppingCartSection");
        cartResponsiv.classList.add("responsiv");
        document.body.style.overflowY = 'hidden';
    } else {
        cartResponsiv.classList.add("d-none");
        cartResponsiv.classList.add("shoppingCartSection")
        cartResponsiv.classList.remove("responsiv");
        document.body.style.overflowY = '';
        btn.classList.remove('basketResponsiv');
    }
}