document.addEventListener("DOMContentLoaded", () => {
    
    // --- Observer pour les animations au défilement ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // --- FETCH (Avec option cache "no-store") ---
    fetch('data.json', { cache: "no-store" })
        .then(response => {
            if (!response.ok) throw new Error("Erreur de chargement du JSON");
            return response.json();
        })
        .then(data => {
            // NAVBAR & HERO
            document.getElementById('nav-brand').textContent = data.brandName;
            document.getElementById('hero-headline').textContent = data.hero.headline;
            document.getElementById('hero-subheadline').textContent = data.hero.subheadline;
            document.getElementById('hero-cta').textContent = data.hero.ctaText;

            const carouselInner = document.getElementById('hero-carousel-inner');
            data.hero.backgroundImages.forEach((imgSrc, index) => {
                const item = document.createElement('div');
                item.className = `carousel-item h-100 ${index === 0 ? 'active' : ''}`;
                item.innerHTML = `<img src="${imgSrc}" class="d-block w-100 h-100" style="object-fit: cover;" alt="Background ${index}">`;
                carouselInner.appendChild(item);
            });

            // AVANTAGES
            document.getElementById('adv-title').textContent = data.advantages.sectionTitle;
            const advContainer = document.getElementById('adv-container');
            data.advantages.items.forEach(adv => {
                advContainer.innerHTML += `
                    <div class="col-12 col-md-4">
                        <div class="p-4 bg-light rounded-4 h-100 transition-hover border-0 shadow-sm">
                            <div class="display-3 mb-3">${adv.icon}</div>
                            <h4 class="fw-bold">${adv.title}</h4>
                            <p class="text-muted mb-0">${adv.description}</p>
                        </div>
                    </div>
                `;
            });

            // PROCESSUS
            document.getElementById('process-title').textContent = data.process.sectionTitle;
            const processContainer = document.getElementById('process-container');
            data.process.steps.forEach((step) => {
                processContainer.innerHTML += `
                    <div class="col-12 col-md-4">
                        <div class="process-card p-4 h-100">
                            <div class="process-icon bg-warning text-dark mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle display-4 shadow" style="width: 100px; height: 100px;">
                                ${step.icon}
                            </div>
                            <h4 class="fw-bold">${step.title}</h4>
                            <p class="text-muted">${step.description}</p>
                        </div>
                    </div>
                `;
            });

            // TERROIR
            document.getElementById('terroir-title').textContent = data.terroir.sectionTitle;
            document.getElementById('terroir-lead').textContent = data.terroir.leadText;
            document.getElementById('terroir-image').src = data.terroir.image;
            const terroirPoints = document.getElementById('terroir-points-container');
            data.terroir.points.forEach(point => {
                terroirPoints.innerHTML += `
                    <div class="mb-3">
                        <h5 class="fw-bold text-dark"><i class="text-warning me-2">📍</i>${point.title}</h5>
                        <p class="text-muted">${point.description}</p>
                    </div>
                `;
            });

            // PRODUITS
            document.getElementById('drinks-title').textContent = data.drinks.sectionTitle;
            const drinksContainer = document.getElementById('drinks-container');
            data.drinks.items.forEach(drink => {
                drinksContainer.innerHTML += `
                    <div class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                        <div class="card w-100 shadow-sm border-0 h-100 transition-hover rounded-4 overflow-hidden">
                            <img src="${drink.image}" class="card-img-top" alt="${drink.title}" style="height: 250px; object-fit: contain; background-color: #f8f9fa;">
                            <div class="card-body d-flex flex-column p-4">
                                <h5 class="card-title fw-bold fs-4">${drink.title}</h5>
                                <h6 class="card-subtitle mb-3 text-warning fw-bold fs-4">${drink.price}</h6>
                                <p class="card-text text-muted flex-grow-1">${drink.description}</p>
                                <button class="btn btn-outline-dark rounded-pill w-100 mt-auto fw-bold py-2" data-bs-toggle="modal" data-bs-target="#orderModal">Commander</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // TEMOIGNAGES
            document.getElementById('testi-title').textContent = data.testimonials.sectionTitle;
            const testiContainer = document.getElementById('testi-container');
            data.testimonials.reviews.forEach(review => {
                testiContainer.innerHTML += `
                    <div class="col-12 col-md-4">
                        <div class="card h-100 border-0 shadow-sm bg-light rounded-4 p-4">
                            <div class="card-body">
                                <div class="mb-3 fs-5">${review.rating}</div>
                                <p class="card-text fst-italic mb-4">"${review.text}"</p>
                                <h6 class="fw-bold mb-0 text-warning">- ${review.name}</h6>
                            </div>
                        </div>
                    </div>
                `;
            });

            // FAQ
            document.getElementById('faq-title').textContent = data.faq.sectionTitle;
            const faqAccordion = document.getElementById('faq-accordion');
            data.faq.questions.forEach((q, index) => {
                const headingId = `heading${index}`;
                const collapseId = `collapse${index}`;
                faqAccordion.innerHTML += `
                    <div class="accordion-item border-0 mb-3 shadow-sm rounded-4 overflow-hidden">
                        <h2 class="accordion-header" id="${headingId}">
                            <button class="accordion-button collapsed fw-bold fs-5 bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
                                ${q.q}
                            </button>
                        </h2>
                        <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                            <div class="accordion-body text-muted bg-white">
                                ${q.a}
                            </div>
                        </div>
                    </div>
                `;
            });

            // MODAL DE COMMANDE
            if(data.orderOptions) {
                document.getElementById('modal-title').textContent = data.orderOptions.modalTitle;
                document.getElementById('modal-subtitle').textContent = data.orderOptions.modalSubtitle;

                // Construction de la boîte d'alerte avec vos 2 points d'information
                if(data.orderOptions.paymentNotice) {
                    let numMvola = data.orderOptions.numero_de_telephone_mvola_du_vendeur_direct_pour_effectuer_le_paiement || "";
                    let nomMvola = data.orderOptions.nom_du_proprietaire_du_compte_mvola_correspondant_au_numero_de_telephone_mvola_du_vendeur_direct_pour_effectuer_le_paiement || "";

                    document.getElementById('modal-notice').innerHTML = `
                        <div class="alert alert-warning border-start border-warning border-4 shadow-sm mb-4 text-start" role="alert">
                            <div class="d-flex mb-3">
                                <div class="fs-2 me-3 align-self-center">⚠️</div>
                                <div class="text-dark" style="font-size: 0.95rem;">
                                    1) ${data.orderOptions.paymentNotice}
                                </div>
                            </div>
                            <hr class="border-warning opacity-50">
                            <div class="text-dark" style="font-size: 0.95rem;">
                                2) Pour effectuer le <span style="text-decoration: underline;"><b>Paiement</b> avec <span style="font-weight: bold;">MVOLA</span></span>, voici le <u><i><b>Numéro de Téléphone</b> du <b>Vendeur</b></i></u> direct :
                                <br><br>
                                <span><span style="font-size:larger; color:blue;">${numMvola}</span> au nom de <span style="font-size:larger; color:blue;">${nomMvola}</span></span>
                            </div>
                        </div>
                    `;
                }

                document.getElementById('direct-title').textContent = data.orderOptions.directOptions.title;
                const directContainer = document.getElementById('direct-buttons-container');
                const directOps = data.orderOptions.directOptions;
                
                Object.keys(directOps).forEach(key => {
                    if(key !== 'title') {
                        const btnData = directOps[key];
                        directContainer.innerHTML += `
                            <a href="${btnData.url}" target="_blank" class="btn btn-outline-${btnData.color} btn-lg fw-bold w-100 shadow-sm transition-hover">
                                Contacter via ${btnData.label}
                            </a>
                        `;
                    }
                });
            }

            // A PROPOS & FOOTER
            document.getElementById('about-title').textContent = data.about.title;
            document.getElementById('about-desc').textContent = data.about.description;
            document.getElementById('about-address').textContent = data.about.contact.address;
            document.getElementById('about-phone').textContent = data.about.contact.phone;
            document.getElementById('about-email').textContent = data.about.contact.email;
            
            const socialsContainer = document.getElementById('about-socials');
            data.about.socialLinks.forEach(link => {
                socialsContainer.innerHTML += `<a href="${link.url}" class="btn btn-outline-${link.color} rounded-circle fw-bold shadow-sm">${link.platform.substring(0,2)}</a>`;
            });

            document.getElementById('footer-copyright').textContent = data.footer.copyright;

            // Déclencher les animations au scroll
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        })
        .catch(error => console.error("Erreur Fetch :", error));
});