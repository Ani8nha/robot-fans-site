    const products = [
            { id: 1, name: "Kit Robot's Fans", price: 65.00, category: "Kits", image: "https://images.unsplash.com/photo-1593014603310-23a5c21f1d16?auto=format&fit=crop&q=80&w=600", description: "Kit completo com desconto: Camiseta, Bottom, Adesivo e Lápis.", tag: "Mais Vendido" },
            { id: 2, name: "Camiseta Oficial 9484", price: 50.00, category: "Vestuário", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600", description: "Malha confortável com design da temporada.", tag: "Novo" },
            { id: 3, name: "Boné District", price: 30.00, category: "Vestuário", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600", description: "Bordado de alta qualidade. Identidade visual forte." },
            { id: 4, name: "Bandana Multiuso", price: 20.00, category: "Vestuário", image: "https://images.unsplash.com/photo-1626425777709-663806a6c4b2?auto=format&fit=crop&q=80&w=600", description: "Ideal para eventos e treinos." },
            { id: 5, name: "Ecobag Robot's", price: 30.00, category: "Sustentáveis", image: "https://images.unsplash.com/photo-1597484662317-c93138801d0c?auto=format&fit=crop&q=80&w=600", description: "Algodão cru. Substitua sacolas plásticas." },
            { id: 6, name: "Garrafinha Personalizada", price: 35.00, category: "Sustentáveis", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600", description: "Material durável para o dia a dia." },
            { id: 7, name: "Lápis Semente", price: 10.00, category: "Sustentáveis", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=600", description: "Use até o fim e plante para nascer uma árvore." },
            { id: 8, name: "Chaveiro 3D", price: 15.00, category: "Colecionáveis", image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=600", description: "Impresso em PLA biodegradável." },
            { id: 9, name: "Bottom (Broche)", price: 10.00, category: "Colecionáveis", image: "https://images.unsplash.com/photo-1633535268612-92268297b4a2?auto=format&fit=crop&q=80&w=600", description: "Para personalizar sua mochila." },
            { id: 10, name: "Pack de Adesivos", price: 5.00, category: "Colecionáveis", image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=600", description: "Vinil resistente." },
            { id: 11, name: "Mousepad Gamer", price: 30.00, category: "Papelaria", image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600", description: "Superfície otimizada para precisão." },
            { id: 12, name: "Caneta Personalizada", price: 10.00, category: "Papelaria", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=600", description: "Escrita suave com a marca da equipe." }
        ];

        document.addEventListener("DOMContentLoaded", () => {
            const productGrid = document.getElementById('product-grid');
            const cartCountEl = document.getElementById('cart-count');
            const toast = document.getElementById('toast');
            let cartCount = 0;

            function renderProducts(category) {
                productGrid.innerHTML = '';
                const filtered = category === 'Todos' ? products : products.filter(p => p.category === category);

                filtered.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    
                    const tagHtml = product.tag ? `<span class="tag-overlay">${product.tag}</span>` : '';
                    
                    card.innerHTML = `
                        <div class="img-wrapper">
                            ${tagHtml}
                            <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='https://placehold.co/400x500/18181b/ffb800?text=Sem+Imagem&font=oswald'">
                            <button class="btn-quick-add" onclick="event.stopPropagation(); addToCart();">
                                <svg class="icon-svg" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            </button>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column;">
                            <div class="product-cat">${product.category}</div>
                            <h3 class="product-title">${product.name}</h3>
                            <p class="product-desc">${product.description}</p>
                            <div style="margin-top: auto; display: flex; align-items: center; gap: 0.5rem;">
                                <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                            </div>
                        </div>
                    `;
                    productGrid.appendChild(card);
                });
            }

            // Filtros
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    renderProducts(btn.dataset.category);
                });
            });

            // Carrinho Global
            window.addToCart = function() {
                cartCount++;
                cartCountEl.innerText = `(${cartCount})`;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            };

            // Mobile Menu
            const menuBtn = document.getElementById('menu-btn');
            const closeMenu = document.getElementById('close-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');

            function toggleMenu() {
                mobileMenu.classList.toggle('open');
            }

            if(menuBtn) menuBtn.addEventListener('click', toggleMenu);
            if(closeMenu) closeMenu.addEventListener('click', toggleMenu);
            mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

            // Init
            renderProducts('Todos');
        });