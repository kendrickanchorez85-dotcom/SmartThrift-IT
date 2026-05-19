// Navigation functionality
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links and pages
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Show corresponding page
                const targetPage = link.getAttribute('data-page');
                document.getElementById(targetPage).classList.add('active');
            });
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✨ Thanks for reaching out! We\'ll get back to you soon! ✨');
            e.target.reset();
        });

        // Search functionality (basic)
        document.querySelector('.search-box').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Searching for:', searchTerm);
            
        });

        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                console.log(`${e.target.id} is now ${e.target.checked ? 'checked' : 'unchecked'}`);
            });
        });


        

        //user first destination
        let previousPage = 'home';

        //Datebase: description 
        const productDescriptions = {
            "Vintage Denim Jacket": "A classic 90s style denim jacket. Perfectly faded, durable denim that adds an effortless cool edge to any outfit.",
            "High Waist Mom Jeans": "Comfortable and retro high-waisted denim jeans. Tailored beautifully to hug the waist while staying relaxed through the legs.",
            "Floral Wrap Dress": "Charming and lightweight summer wrap dress featuring a vibrant floral pattern. Perfect for sunny casual dates.",
            "Leather Ankle Boots": "Edgy black leather ankle boots with sturdy heels. Adds instant attitude and vintage grit to your wardrobe.",
            "90s Oversized Blazer": "Power dressing at its finest. Structured shoulders and premium fabric for that ultimate retro boss-look.",
            "Band Tee Classic": "Authentic feel vintage band tee. Soft, breathable cotton with iconic front graphics.",
            "Velvet Mini Dress": "Luxurious soft velvet dress. Sleek, stylish, and perfect for retro-themed night outs.",
            "Crossbody Bag": "Compact yet spacious vintage leather crossbody bag to secure all your daily essentials.",
            "Platform Boots": "Take your style to new heights. Chunky platforms that deliver maximum comfort and 90s alternative vibe.",
            "Roller Skates": "Retro quad roller skates in pristine condition. Fun, active, and perfectly nostalgic."
        };

        // Bagong Click Event para sa lahat ng Item Cards (sa Home at Gallery)
        document.querySelectorAll('.item-card').forEach(card => {
            card.style.cursor = 'pointer'; // Ginawang pointer para alam ng user na iki-click
            
            card.addEventListener('click', () => {
                // 1. Alamin kung anong page ang kasalukuyang bukas bago lumipat (Home o Gallery)
                const activePageSection = document.querySelector('.page.active');
                if (activePageSection && activePageSection.id !== 'product-view') {
                    previousPage = activePageSection.id;
                }

                // 2. Kunin ang detalye mula sa card na pinindot
                const itemName = card.querySelector('.item-name').innerText;
                const itemPrice = card.querySelector('.item-price').innerText;
                const itemImgSrc = card.querySelector('.item-image img').src;

                // 3. I-pasa ang detalye sa ating Product View Section sa HTML
                document.getElementById('detail-name').innerText = itemName;
                document.getElementById('detail-price').innerText = itemPrice;
                document.getElementById('detail-image').src = itemImgSrc;
                
                
                const description = productDescriptions[itemName] || "Exclusive pre-loved item. Limited edition for your sustainable style collection.";
                document.getElementById('detail-desc').innerText = description;
                
                
                document.getElementById('detail-qty').value = 1;

                    
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById('product-view').classList.add('active');
                
                
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            });
        });

        
        function goBackToPreviousPage() {
            
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            
            
            document.getElementById(previousPage).classList.add('active');
            
            
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('data-page') === previousPage) {
                    link.classList.add('active');
                }
            });
        }

        // Logic para sa Add to Cart button sa loob ng product view
        document.getElementById('add-to-cart-action').addEventListener('click', (e) => {
            e.preventDefault();
            const qty = document.getElementById('detail-qty').value;
            const name = document.getElementById('detail-name').innerText;
            
            alert(`🛍️ Success! Added ${qty}x [${name}] to your cart!`);
            
            // I-update ang cart count badge sa navigation niyo sa tabi
            const cartCountSpan = document.getElementById('cart-count');
            if (cartCountSpan) {
                let currentCount = parseInt(cartCountSpan.innerText) || 0;
                cartCountSpan.innerText = currentCount + parseInt(qty);
            }
            
            
            goBackToPreviousPage();
        });




        // 1. Function para i-save ang Address
        function saveAddress() {
            // Kunin ang value mula sa textarea gamit ang ID nito
            const addressField = document.getElementById('addressInput');
            const addressValue = addressField.value;

            // Check kung walang laman ang input
            if (addressValue.trim() === "") {
                alert("Oops! Pakisulat ang iyong address bago i-save.  thrift it!  thrift it! 👕");
                return;
            }

            // I-save sa LocalStorage para kahit i-refresh ang page, nandoon pa rin
            localStorage.setItem("userAddress", addressValue);

            // Ipakita ang success message (yung green text)
            const statusMsg = document.getElementById('saveStatus');
            statusMsg.style.display = "block";

            // Mawawala ang message pagkatapos ng 3 segundo
            setTimeout(() => {
                statusMsg.style.display = "none";
            }, 3000);

            // Optional: Maglagay ng alert para sure na alam ng user
            alert("Address Saved! 🏠");
        }

        // 2. Function para i-load ang address tuwing bubuksan ang page
        // Mahalaga ito para hindi magmukhang nawala ang sinulat nila
        window.addEventListener('load', () => {
            const savedAddress = localStorage.getItem("userAddress");
            const addressField = document.getElementById('addressInput');

            if (savedAddress && addressField) {
                addressField.value = savedAddress;
            }
        });