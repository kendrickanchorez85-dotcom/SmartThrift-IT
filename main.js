// --- 1. DATABASE & STATE ---
const productDescriptions = {
    "Knitted 1/4 Zip Sweater": "A classic 90s style denim jacket. Perfectly faded, durable denim that adds an effortless cool edge to any outfit.",
    "Forever 21 Men Baggy Jeans": "Comfortable and retro high-waisted denim jeans. Tailored beautifully to hug the waist while staying relaxed through the legs.",
    "Lacoste Women Top": "Charming and lightweight summer wrap dress featuring a vibrant floral pattern. Perfect for sunny casual dates.",
    "Fit Denim Women Jeans": "Edgy black leather ankle boots with sturdy heels. Adds instant attitude and vintage grit to your wardrobe.",
    "Harley Davidson T-Shirt": "Authentic feel vintage band tee. Soft, breathable cotton with iconic front graphics.",
    "90's Baggy Jeans": "Power dressing at its finest. Structured shoulders and premium fabric for that ultimate retro boss-look.",
    "H&M Loose Fit Jagger": "Sleek, stylish, and perfect for retro-themed night outs.",
    "Nike Track Pants": "Retro quad roller skates in pristine condition. Fun, active, and perfectly nostalgic.",
    "White Stag Tank Top": "Comfortable and stylish vintage tank top.",
    "Denim Womens Jacket": "Classic denim jacket for women.",
    "Worthington Button Down Shirt": "Professional yet vintage style button-down.",
    "Tropical Beige Shorts Women": "Perfect for summer or beach trips.",
    "Women's Trousers": "Classic streetwear trousers for women.",
    "Universal Thread Short": "Simple and durable shorts for daily use."
};

let myCart = [];
let previousPage = 'home';

// --- 2. NAVIGATION LOGIC ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // I-update ang nav link highlighting
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('data-page') === pageId) link.classList.add('active');
        });
    }
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-page');
        showPage(target);
    });
});

// --- 3. PRODUCT VIEW & MODAL LOGIC ---
document.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', () => {
        const activePage = document.querySelector('.page.active');
        if (activePage && activePage.id !== 'product-view') previousPage = activePage.id;

        const itemName = card.querySelector('.item-name').innerText;
        const itemPrice = card.querySelector('.item-price').innerText;
        const itemImgSrc = card.querySelector('.item-image img').src;

        document.getElementById('detail-name').innerText = itemName;
        document.getElementById('detail-price').innerText = itemPrice;
        document.getElementById('detail-image').src = itemImgSrc;
        document.getElementById('detail-desc').innerText = productDescriptions[itemName] || "Exclusive pre-loved item.";
        document.getElementById('detail-qty').value = 1;

        showPage('product-view');
    });
});

function goBackToPreviousPage() {
    showPage(previousPage);
}

// --- 4. FILTERING LOGIC (SEARCH, SIZE, CATEGORY, PRICE) ---
function filterProducts() {
    const searchTerm = document.querySelector('.search-box').value.toLowerCase();
    const activeSizes = Array.from(document.querySelectorAll('.filter-group-size .filter-checkbox:checked')).map(cb => cb.id.replace('size-', ''));
    const activeCategories = Array.from(document.querySelectorAll('.filter-group-cate .filter-checkbox:checked')).map(cb => cb.id);
    
    const isBelow100Checked = document.getElementById('min-price').checked;
    const isAbove100Checked = document.getElementById('max-price').checked;

    document.querySelectorAll('.item-card').forEach(card => {
        const name = card.querySelector('.item-name').innerText.toLowerCase();
        const price = parseFloat(card.getAttribute('data-price')) || 0;
        const itemSizes = card.getAttribute('data-size') ? card.getAttribute('data-size').split(' ') : [];
        const itemCategories = card.getAttribute('data-category') ? card.getAttribute('data-category').split(' ') : [];

        const matchesSearch = name.includes(searchTerm);
        const matchesSize = activeSizes.length === 0 || activeSizes.some(s => itemSizes.includes(s));
        const matchesCategory = activeCategories.length === 0 || activeCategories.some(c => itemCategories.includes(c));
        
        // Price Filter Logic
        let matchesPrice = true;
        if (isBelow100Checked && !isAbove100Checked) matchesPrice = price < 100;
        else if (!isBelow100Checked && isAbove100Checked) matchesPrice = price >= 100;
        else if (isBelow100Checked && isAbove100Checked) matchesPrice = true; // Parehong naka-check, ipakita lahat

        card.style.display = (matchesSearch && matchesSize && matchesCategory && matchesPrice) ? "block" : "none";
    });
}

// Event Listeners for Filters
document.querySelector('.search-box').addEventListener('input', filterProducts);
document.querySelectorAll('.filter-checkbox').forEach(cb => cb.addEventListener('change', filterProducts));

// --- 5. CART & CHECKOUT LOGIC ---
document.getElementById('add-to-cart-action').addEventListener('click', () => {
    const name = document.getElementById('detail-name').innerText;
    const price = parseInt(document.getElementById('detail-price').innerText.replace("PHP ", ""));
    const qty = parseInt(document.getElementById('detail-qty').value);

    myCart.push({ itemName: name, itemPrice: price, itemQty: qty });
    document.getElementById('cart-count').innerText = myCart.length;
    alert("ITEM ADDED TO INVENTORY! 🎒");
    showPage('gallery');
});

function showCheckout() {
    const listahan = document.getElementById('cart-list');
    const totalDisplay = document.getElementById('display-total');
    const addrDisplay = document.getElementById('display-address');

    addrDisplay.innerText = localStorage.getItem("userAddress") || "PLEASE SET ADDRESS IN PROFILE";
    listahan.innerHTML = "";
    let subtotal = 0;

    myCart.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.innerHTML = `
            <span>${item.itemQty}x ${item.itemName}</span>
            <span>PHP ${item.itemPrice * item.itemQty}</span>
        `;
        listahan.appendChild(row);
        subtotal += (item.itemPrice * item.itemQty);
    });

    const finalTotal = subtotal > 0 ? subtotal + 50 : 0;
    totalDisplay.innerText = "TOTAL: PHP " + finalTotal;
    showPage('checkout');
}

function confirmOrder() {
    if (myCart.length === 0) return alert("Your bag is empty!");
    alert("🚀 THANK YOU FOR BUYING! Your items are being prepared.");
    myCart = [];
    document.getElementById('cart-count').innerText = "0";
    showPage('home');
}

// --- 6. ADDRESS STORAGE ---
function saveAddress() {
    const addr = document.getElementById('addressInput').value;
    if (!addr.trim()) return alert("Pakisulat ang address!");
    
    localStorage.setItem("userAddress", addr);
    document.getElementById('saveStatus').style.display = "block";
    setTimeout(() => document.getElementById('saveStatus').style.display = "none", 3000);
}

window.addEventListener('load', () => {
    const saved = localStorage.getItem("userAddress");
    if (saved) document.getElementById('addressInput').value = saved;
}); 