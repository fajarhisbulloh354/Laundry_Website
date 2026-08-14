/* =====================================================
   SETUP DASAR
===================================================== */

document.documentElement.style.setProperty(
    "--primary",
    laundryConfig.warnaUtama
);

document.documentElement.style.setProperty(
    "--secondary",
    laundryConfig.warnaSekunder
);



/* =====================================================
   IDENTITAS WEBSITE
===================================================== */

document.title =
    laundryConfig.nama +
    " — Laundry Profesional";


document
    .getElementById("metaDescription")
    .setAttribute(
        "content",
        laundryConfig.deskripsi
    );


document.getElementById(
    "logo"
).textContent =
    laundryConfig.nama;


document.getElementById(
    "footerName"
).textContent =
    laundryConfig.nama;


document.getElementById(
    "copyright"
).textContent =
    laundryConfig.nama;


document.getElementById(
    "heroBadge"
).textContent =
    laundryConfig.nama;


document.getElementById(
    "heroDescription"
).textContent =
    laundryConfig.deskripsi;


document.getElementById(
    "footerDescription"
).textContent =
    laundryConfig.slogan;



/* =====================================================
   KONTAK
===================================================== */

document.getElementById(
    "locationName"
).textContent =
    laundryConfig.nama;


document.getElementById(
    "address"
).textContent =
    laundryConfig.alamat;


document.getElementById(
    "openingHours"
).textContent =
    laundryConfig.jamBuka;


document.getElementById(
    "footerAddress"
).textContent =
    laundryConfig.alamat;


document.getElementById(
    "footerPhone"
).textContent =
    formatPhone(
        laundryConfig.whatsapp
    );


/* Google Maps */

document.getElementById(
    "mapsButton"
).href =
    laundryConfig.mapsUrl;


document.getElementById(
    "mapsFrame"
).src =
    laundryConfig.mapsEmbed;



/* =====================================================
   WHATSAPP FLOATING
===================================================== */

document.getElementById(
    "floatingWhatsapp"
).href =
    "https://wa.me/" +
    laundryConfig.whatsapp;



/* =====================================================
   LAYANAN
===================================================== */

const serviceContainer =
    document.getElementById(
        "serviceContainer"
    );


const priceContainer =
    document.getElementById(
        "priceContainer"
    );


const serviceSelect =
    document.getElementById(
        "serviceSelect"
    );


laundryConfig.layanan.forEach(
    function(service, index) {


        /* SERVICE CARD */

        const serviceCard =
            document.createElement(
                "div"
            );


        serviceCard.className =
            "service-card";


        serviceCard.innerHTML = `

            <div class="service-icon">
                ${service.icon}
            </div>

            <h3>
                ${service.nama}
            </h3>

            <p>
                ${service.deskripsi}
            </p>

        `;


        serviceContainer.appendChild(
            serviceCard
        );



        /* PRICE CARD */

        const priceCard =
            document.createElement(
                "div"
            );


        priceCard.className =
            "price-card";


        priceCard.innerHTML = `

            <div class="service-icon">
                ${service.icon}
            </div>

            <h3>
                ${service.nama}
            </h3>

            <div class="price">
                ${rupiah(service.harga)}
                <small>
                    / ${service.satuan}
                </small>
            </div>

            <p>
                ${service.deskripsi}
            </p>

        `;


        priceContainer.appendChild(
            priceCard
        );



        /* SELECT */

        const option =
            document.createElement(
                "option"
            );


        option.value =
            service.harga;


        option.dataset.service =
            service.nama;


        option.dataset.satuan =
            service.satuan;


        option.textContent =
            service.nama +
            " — " +
            rupiah(service.harga) +
            "/" +
            service.satuan;


        serviceSelect.appendChild(
            option
        );

    }
);



/* =====================================================
   KEUNGGULAN
===================================================== */

const whyContainer =
    document.getElementById(
        "whyContainer"
    );


laundryConfig.keunggulan.forEach(
    function(item) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "why-card";


        card.innerHTML = `

            <div class="icon">
                ${item.icon}
            </div>

            <h3>
                ${item.judul}
            </h3>

            <p>
                ${item.deskripsi}
            </p>

        `;


        whyContainer.appendChild(
            card
        );

    }
);



/* =====================================================
   TESTIMONI
===================================================== */

const testimonialContainer =
    document.getElementById(
        "testimonialContainer"
    );


laundryConfig.testimoni.forEach(
    function(item) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "testimonial";


        let stars = "";

        for (
            let i = 0;
            i < item.rating;
            i++
        ) {

            stars += "★";

        }


        card.innerHTML = `

            <div class="stars">
                ${stars}
            </div>

            <p>
                "${item.komentar}"
            </p>

            <strong>
                — ${item.nama}
            </strong>

        `;


        testimonialContainer.appendChild(
            card
        );

    }
);



/* =====================================================
   KALKULATOR
===================================================== */

const weight =
    document.getElementById(
        "weight"
    );


const estimate =
    document.getElementById(
        "estimate"
    );


function calculatePrice() {

    const selected =
        serviceSelect.options[
            serviceSelect.selectedIndex
        ];


    const price =
        Number(
            selected.value
        );


    const berat =
        Number(
            weight.value
        ) || 0;


    const total =
        price * berat;


    estimate.textContent =
        rupiah(total);

}


serviceSelect.addEventListener(
    "change",
    calculatePrice
);


weight.addEventListener(
    "input",
    calculatePrice
);



/* =====================================================
   WHATSAPP ORDER
===================================================== */

document
    .getElementById("sendOrder")
    .addEventListener(
        "click",
        function() {


            const name =
                document
                    .getElementById(
                        "customerName"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "customerPhone"
                    )
                    .value
                    .trim();


            const address =
                document
                    .getElementById(
                        "customerAddress"
                    )
                    .value
                    .trim();


            const selected =
                serviceSelect.options[
                    serviceSelect.selectedIndex
                ];


            const service =
                selected.dataset.service;


            const satuan =
                selected.dataset.satuan;


            const berat =
                weight.value;


            const total =
                estimate.textContent;



            if (!name) {

                alert(
                    "Silakan isi nama."
                );

                return;

            }


            if (!phone) {

                alert(
                    "Silakan isi nomor WhatsApp."
                );

                return;

            }


            if (!berat || berat <= 0) {

                alert(
                    "Masukkan berat laundry."
                );

                return;

            }


            if (!address) {

                alert(
                    "Silakan isi alamat."
                );

                return;

            }



            const text =

                `Halo ${laundryConfig.nama},

Saya ingin memesan laundry.

Nama: ${name}
No. WhatsApp: ${phone}

Layanan: ${service}
Berat: ${berat} ${satuan}

Estimasi: ${total}

Alamat:
${address}

Mohon informasi selanjutnya.

Terima kasih.`;


            const url =
                "https://wa.me/" +
                laundryConfig.whatsapp +
                "?text=" +
                encodeURIComponent(
                    text
                );


            window.open(
                url,
                "_blank"
            );

        }
    );



/* =====================================================
   FORMAT RUPIAH
===================================================== */

function rupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}



function formatPhone(number) {

    if (
        number.startsWith("62")
    ) {

        return "0" +
            number.substring(2);

    }

    return number;

}



/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const navMenu =
    document.getElementById(
        "navMenu"
    );


menuButton.addEventListener(
    "click",
    function() {

        navMenu.classList.toggle(
            "active"
        );

    }
);


navMenu
    .querySelectorAll("a")
    .forEach(
        function(link) {

            link.addEventListener(
                "click",
                function() {

                    navMenu.classList.remove(
                        "active"
                    );

                }
            );

        }
    );



/* =====================================================
   JALANKAN KALKULATOR PERTAMA KALI
===================================================== */

calculatePrice();