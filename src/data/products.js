export const products = [
  {
    id: 1,
    name: "Linen Oversized Blazer",
    category: "Women",
    subCategory: "Tops",
    price: 176,
    originalPrice: 220,
    badges: ["Sale", "Bestseller"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sand", code: "#E5DEC9" },
      { name: "Black", code: "#1A1A1A" },
      { name: "Bone", code: "#F0ECE1" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { "XS": 12, "S": 3, "M": 15, "L": 0, "XL": 8 }, // S has low stock
    description: "An oversized tailoring staple crafted from premium lightweight Belgian linen. Designed with structured shoulders, a clean double-breasted closure, and classic flap pockets. A perfect transition piece that pairs effortlessly with tailored trousers or denim.",
    details: [
      "Oversized fit, designed for a relaxed silhouette",
      "Double-breasted horn button closure",
      "Fully lined with 100% organic cotton",
      "Functional welt chest pocket and flap side pockets",
      "Back vent for ease of movement"
    ],
    fabric: "100% Belgian Linen. Lining: 100% Organic Cotton. Dry clean only. Iron on medium heat if required.",
    shipping: "Complimentary standard delivery on orders over $150. Easy returns within 30 days of delivery.",
    rating: 4.8,
    reviews: [
      { id: 1, author: "Genevieve L.", rating: 5, date: "2026-05-12", title: "Impeccable cut", content: "The linen drape is stunning. It falls perfectly without looking sloppy. Sized down for a slightly more fitted look but still kept that editorial structure." },
      { id: 2, author: "Sophia M.", rating: 4, date: "2026-04-29", title: "Beautiful color, size runs large", content: "I ordered the Sand in my usual size M. It is very oversized, so be prepared! Beautiful premium quality linen. Received multiple compliments." }
    ]
  },
  {
    id: 2,
    name: "Silk Slip Midi Dress",
    category: "Women",
    subCategory: "Dresses",
    price: 190,
    originalPrice: null,
    badges: ["New"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Champagne", code: "#E6DBC9" },
      { name: "Midnight Black", code: "#0B0C10" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: { "XS": 5, "S": 10, "M": 2, "L": 6 }, // M has low stock
    description: "Cut from heavy-weight sandwashed Mulberry silk that flows beautifully along the body. This elegant slip dress features a refined V-neckline, adjustable delicate spaghetti straps, and a bias-cut hem for an effortless liquid-like drape.",
    details: [
      "Bias-cut for a figure-skimming fit",
      "V-neck front and back details",
      "Adjustable shoulder straps",
      "Midi length, falls mid-calf",
      "French seams for high-end finish"
    ],
    fabric: "100% Mulberry Silk. Hand wash cold or dry clean. Lay flat to dry. Do not tumble dry.",
    shipping: "Complimentary standard delivery on orders over $150. Easy returns within 30 days of delivery.",
    rating: 4.9,
    reviews: [
      { id: 1, author: "Victoria P.", rating: 5, date: "2026-06-01", title: "Like liquid gold", content: "The Mulberry silk feels luxurious. It has a beautiful weight that prevents it from showing underwear lines. Absolutely stunning." }
    ]
  },
  {
    id: 3,
    name: "Cashmere Knit Crewneck",
    category: "Women",
    subCategory: "Tops",
    price: 260,
    originalPrice: null,
    badges: ["Low Stock"],
    images: [
      "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Oatmeal", code: "#E3DFD5" },
      { name: "Charcoal", code: "#3A3B3C" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { "XS": 2, "S": 1, "M": 0, "L": 2, "XL": 1 }, // Low stock everywhere
    description: "Woven from 100% grade-A Mongolian cashmere. This essential knit features a relaxed silhouette, dropped shoulders, and ribbed trims at the neck, cuffs, and hem. Exceptionally soft, lightweight, and warm.",
    details: [
      "Relaxed fit with ribbed crewneck",
      "Dropped shoulders",
      "Fully fashioned armholes",
      "Medium weight 12-gauge knit",
      "Responsibly sourced cashmere fibers"
    ],
    fabric: "100% Grade-A Mongolian Cashmere. Dry clean or hand wash cold with wool detergent. Dry flat.",
    shipping: "Complimentary standard delivery on orders over $150. Easy returns within 30 days of delivery.",
    rating: 4.7,
    reviews: [
      { id: 1, author: "Isabella K.", rating: 5, date: "2026-05-18", title: "Worth every penny", content: "Unbelievably soft and doesn't pill as much as other brands. Warm yet light. I purchased the Oatmeal and it's the perfect neutral." }
    ]
  },
  {
    id: 4,
    name: "Tailored Wool Trousers",
    category: "Women",
    subCategory: "Bottoms",
    price: 180,
    originalPrice: null,
    badges: [],
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Slate Grey", code: "#5A6065" },
      { name: "Black", code: "#1A1A1A" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { "XS": 10, "S": 12, "M": 8, "L": 14, "XL": 5 },
    description: "Refined high-rise trousers crafted from pure Italian virgin wool. Features sharp front creases, structured belt loops, slip side pockets, and a wide-leg profile that creates a long, elegant line.",
    details: [
      "High-rise with a wide-leg cut",
      "Hook-and-bar closure with zip fly",
      "Front pleats and pressed creases",
      "Two side pockets, two rear welt pockets",
      "Unfinished hems for custom tailoring"
    ],
    fabric: "100% Virgin Wool. Pocket lining: 100% Viscose. Dry clean only.",
    shipping: "Complimentary standard delivery on orders over $150. Easy returns within 30 days of delivery.",
    rating: 4.6,
    reviews: [
      { id: 1, author: "Claire D.", rating: 4, date: "2026-05-30", title: "Very elegant", content: "The wool fabric is high-grade. They drape beautifully. I had to hem them slightly because I am 5'4, but they are absolutely gorgeous." }
    ]
  },
  {
    id: 5,
    name: "Ribbed Knit Silk Tank",
    category: "Women",
    subCategory: "Tops",
    price: 45,
    originalPrice: 60,
    badges: ["Sale"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Off-White", code: "#FAF9F6" },
      { name: "Black", code: "#1A1A1A" },
      { name: "Sage", code: "#9CAE9C" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { "XS": 18, "S": 20, "M": 14, "L": 16, "XL": 9 },
    description: "A premium everyday layering essential crafted from a breathable silk and organic cotton rib blend. Features a flattering scoop neckline, wide straps to conceal undergarments, and a neat fitted shape.",
    details: [
      "Fitted silhouette",
      "Flattering scoop neck",
      "Wide comfortable shoulder straps",
      "Ribbed knit texture",
      "Longer hemline for easy tucking"
    ],
    fabric: "55% Silk, 45% Organic Cotton. Hand wash cold or dry clean. Reshape while damp.",
    shipping: "Standard delivery $10, free on orders over $150. Easy returns within 30 days.",
    rating: 4.5,
    reviews: [
      { id: 1, author: "Meredith S.", rating: 5, date: "2026-06-05", title: "Best tank top", content: "The silk blend elevates this from a normal cotton tank. It has a slight sheen and feels incredibly soft. Bought in all three colors." }
    ]
  },
  {
    id: 6,
    name: "Classic Denim Jacket",
    category: "Men",
    subCategory: "Outerwear",
    price: 150,
    originalPrice: null,
    badges: [],
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Indigo Wash", code: "#3E577A" },
      { name: "Vintage Black", code: "#2E2F33" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: { "S": 4, "M": 1, "L": 8, "XL": 11, "XXL": 2 },
    description: "A timeless outerwear piece constructed from heavy 13oz Japanese selvedge denim. This jacket is unwashed to allow for custom creasing and natural fading over time. Finished with matte silver hardware and classic double-needle stitching.",
    details: [
      "Straight, regular fit",
      "Selvedge detail on inside placket",
      "Two chest button-flap pockets, two side pockets",
      "Adjustable button tabs at waist",
      "Matte silver metal shank buttons"
    ],
    fabric: "100% Organic Cotton Japanese Selvedge Denim. Wash cold inside out, hang to dry. Wear frequently before washing.",
    shipping: "Complimentary standard delivery on orders over $150. Easy returns within 30 days of delivery.",
    rating: 4.8,
    reviews: [
      { id: 1, author: "Marc T.", rating: 5, date: "2026-05-24", title: "Exceptional denim", content: "Top notch selvedge. The indigo color is rich, and you can tell the denim will break in beautifully. Fits true to size." }
    ]
  },
  {
    id: 7,
    name: "Pima Cotton Mockneck Tee",
    category: "Men",
    subCategory: "Tops",
    price: 65,
    originalPrice: null,
    badges: ["Bestseller"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Chalk White", code: "#F5F5F0" },
      { name: "Ink Black", code: "#1C1D21" },
      { name: "Taupe", code: "#B0A595" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: { "S": 15, "M": 22, "L": 19, "XL": 3, "XXL": 8 },
    description: "Crafted from long-staple Peruvian Pima cotton, which is exceptionally strong and soft. Designed with a structured mock neckline that elevates it from a standard tee, rendering it perfect under blazers or worn solo.",
    details: [
      "Regular fit, structured silhouette",
      "1.5-inch mockneck rib collar",
      "Heavyweight 220 GSM single jersey",
      "Clean, blind-stitched hems",
      "Pre-shrunk fabric"
    ],
    fabric: "100% Peruvian Pima Cotton. Machine wash cold with similar colors. Tumble dry low.",
    shipping: "Standard delivery $10, free on orders over $150. Easy returns within 30 days.",
    rating: 4.6,
    reviews: [
      { id: 1, author: "David E.", rating: 5, date: "2026-05-15", title: "Premium look and feel", content: "The mockneck is perfect. Doesn't sag or lose shape. The Pima cotton is thick and feels expensive. Sizing is perfect." }
    ]
  },
  {
    id: 8,
    name: "Structured Chino Pants",
    category: "Men",
    subCategory: "Bottoms",
    price: 120,
    originalPrice: null,
    badges: [],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Khaki", code: "#C5B294" },
      { name: "Navy Blue", code: "#1F2937" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: { "S": 8, "M": 14, "L": 12, "XL": 0 },
    description: "Organic cotton twill chino trousers with comfortable stretch. Features a direct straight-leg cut, refined waist tab closures, and minimalist welt pockets.",
    details: [
      "Straight-leg, mid-rise fit",
      "Concealed hook and zip closure",
      "Two side pockets, two back button pockets",
      "Reinforced waistband stitching",
      "Premium cotton twill construction"
    ],
    fabric: "98% Organic Cotton, 2% Elastane. Machine wash warm. Tumble dry medium.",
    shipping: "Standard delivery $10, free on orders over $150. Easy returns within 30 days.",
    rating: 4.4,
    reviews: [
      { id: 1, author: "James R.", rating: 4, date: "2026-04-10", title: "Great work pants", content: "Super clean chinos. They look professional enough for the office, but the elastane makes them comfortable. Fits slightly slim, so size up if in between." }
    ]
  },
  {
    id: 9,
    name: "Minimalist Leather Sneakers",
    category: "Accessories",
    subCategory: "Shoes",
    price: 240,
    originalPrice: null,
    badges: ["Bestseller"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "White Leather", code: "#FAF9F6" },
      { name: "Black Leather", code: "#1D1E20" }
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    stock: { "38": 2, "39": 4, "40": 9, "41": 0, "42": 15, "43": 1, "44": 5 },
    description: "A refined court sneaker crafted by hand in Italy from full-grain calfskin leather. Features a margom rubber cupsole, full leather lining, waxed cotton laces, and a subtle gold serial stamp on the heel.",
    details: [
      "Handcrafted in Italy",
      "Full-grain calfskin leather upper and lining",
      "Durable Margom rubber cupsole",
      "Gold-embossed model number on outer heel",
      "Reinforced padded collar"
    ],
    fabric: "100% Italian Calfskin Leather. Margom Rubber Sole. Clean with damp cloth and leather conditioner.",
    shipping: "Complimentary standard delivery. Return within 30 days in original packaging with dust bag.",
    rating: 4.9,
    reviews: [
      { id: 1, author: "Arthur H.", rating: 5, date: "2026-06-10", title: "Incredibly high quality", content: "Easily rivals sneakers that cost twice as much. The leather is buttery soft and the Margom sole wears beautifully. Sized down one full size as recommended by other sites." }
    ]
  },
  {
    id: 10,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    subCategory: "Bags",
    price: 320,
    originalPrice: null,
    badges: [],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Cognac Tan", code: "#8E5E38" },
      { name: "Nero Black", code: "#1C1C1C" }
    ],
    sizes: ["O/S"],
    stock: { "O/S": 4 },
    description: "A sleek boxy crossbody bag designed for everyday efficiency. Handmade from vegetable-tanned Italian leather that ages to a beautiful, unique patina. Completed with solid brass hardware and an adjustable strap.",
    details: [
      "Vegetable-tanned calfskin leather",
      "Suede-lined interior with card pocket",
      "Adjustable leather shoulder strap (21-24\" drop)",
      "Solid brass zipper closure",
      "Embossed logo at front"
    ],
    fabric: "100% Italian Vegetable-Tanned Leather. Brass Hardware. Store in dust bag.",
    shipping: "Complimentary standard delivery. Returns within 30 days.",
    rating: 4.7,
    reviews: [
      { id: 1, author: "Elena V.", rating: 5, date: "2026-05-04", title: "Beautiful construction", content: "The leather smells amazing. It is very structured and fits phone, keys, lipstick, and card holder comfortably. Classic piece." }
    ]
  },
  {
    id: 11,
    name: "Classic Trench Coat",
    category: "Women",
    subCategory: "Outerwear",
    price: 350,
    originalPrice: null,
    badges: ["Bestseller"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Honey", code: "#CBB691" },
      { name: "Black", code: "#1A1A1A" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { "XS": 8, "S": 11, "M": 14, "L": 6, "XL": 10 },
    description: "A double-breasted trench coat in structured cotton gabardine. Designed in a timeless regular silhouette with raglan sleeves, traditional storm flaps, a waist-cinching belt, and polished tortoiseshell buttons.",
    details: [
      "Double-breasted front with horn-effect buttons",
      "Adjustable buckle belt at waist and cuffs",
      "Traditional gun flap and back storm shield",
      "Deep buttoned welt side pockets",
      "Water-resistant cotton gabardine blend"
    ],
    fabric: "65% Cotton, 35% Polyester. Lining: 100% Viscose. Dry clean only.",
    shipping: "Complimentary standard shipping and returns.",
    rating: 4.8,
    reviews: [
      { id: 1, author: "Rachel W.", rating: 5, date: "2026-04-15", title: "A timeless masterpiece", content: "The structure of this trench is incredible. The gabardine fabric is high density and water runs right off. Looks extremely chic belted or left open." }
    ]
  },
  {
    id: 12,
    name: "Relaxed Linen Shirt",
    category: "Men",
    subCategory: "Tops",
    price: 95,
    originalPrice: null,
    badges: [],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sky Blue", code: "#A7C7E7" },
      { name: "White", code: "#FFFFFF" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: { "S": 20, "M": 15, "L": 30, "XL": 25, "XXL": 12 },
    description: "Made from premium breathable French flax, this relaxed shirt features a button-down collar, curved hem, and a washed finish for extra softness. Perfect for warm-weather styling.",
    details: [
      "Relaxed fit with a slightly longer back hem",
      "Classic button-down front with pearl buttons",
      "Single patch chest pocket",
      "Hanger loop at back pleat",
      "Pre-washed for superior comfort"
    ],
    fabric: "100% French Linen. Machine wash warm. Iron on high while slightly damp.",
    shipping: "Standard delivery $10, free over $150. Returns accepted within 30 days.",
    rating: 4.5,
    reviews: [
      { id: 1, author: "Nathan G.", rating: 5, date: "2026-05-11", title: "Incredibly breathable", content: "Best linen shirt I own. It has a beautiful weave and the Sky Blue shade is perfect for summer. Fit is casual and relaxed." }
    ]
  },
  {
    id: 13,
    name: "Cropped Bouclé Jacket",
    category: "Women",
    subCategory: "Outerwear",
    price: 232,
    originalPrice: 290,
    badges: ["Sale", "New"],
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Cream Tweed", code: "#ECE8DF" },
      { name: "Noir Black", code: "#1A1A1A" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: { "XS": 10, "S": 4, "M": 3, "L": 0 },
    description: "A textured cropped jacket crafted from structured wool-blend bouclé. Detailed with decorative gold dome buttons, round collarless neckline, and fringe edges. Pairs perfectly with high-waisted denim.",
    details: [
      "Cropped, structured fit",
      "Round collarless neck",
      "Ornate gold-toned front buttons",
      "Fringe trim on cuffs and collar",
      "Fully lined in soft satin"
    ],
    fabric: "70% Wool, 30% Viscose. Lining: 100% Polyester. Dry clean only.",
    shipping: "Complimentary standard delivery. Returns within 30 days.",
    rating: 4.9,
    reviews: [
      { id: 1, author: "Chloe H.", rating: 5, date: "2026-06-02", title: "Chanel-like elegance", content: "Absolutely stunning bouclé jacket. The cropped cut is perfect for high-waisted jeans or skirts. The gold buttons are nice and heavy." }
    ]
  },
  {
    id: 14,
    name: "Leather Chelsea Boots",
    category: "Accessories",
    subCategory: "Shoes",
    price: 280,
    originalPrice: null,
    badges: ["New"],
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f6893b4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Chestnut Brown", code: "#5A3A22" },
      { name: "Black Polish", code: "#111111" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    stock: { "39": 5, "40": 8, "41": 12, "42": 15, "43": 18, "44": 4 },
    description: "A modern interpretation of the classic Chelsea boot, featuring an elongated toe, stacked wood heel, and elastic side panels. Handmade in Portugal using water-resistant Italian calf suede.",
    details: [
      "Handcrafted in Portugal",
      "Premium Italian calf suede upper",
      "Elastic side panels and rear pull tabs",
      "Leather lining and cushioned footbed",
      "Durable Goodyear-welted rubber-injected sole"
    ],
    fabric: "100% Italian Calf Suede upper. 100% Leather lining. Sole: Wood + Rubber. Protect with suede spray.",
    shipping: "Complimentary standard shipping and returns. Dust bag included.",
    rating: 4.7,
    reviews: [
      { id: 1, author: "Marcus D.", rating: 5, date: "2026-05-19", title: "Supremely comfortable", content: "Wore these for a full day of walking in NYC right out of the box. Zero blisters. The suede is very high grade and the shape is slim and elegant." }
    ]
  },
  {
    id: 15,
    name: "Wool Fedora Hat",
    category: "Accessories",
    subCategory: "Bags",
    price: 85,
    originalPrice: null,
    badges: [],
    images: [
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572307480813-ceb0e59d85f1?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Charcoal", code: "#4A4A4A" },
      { name: "Camel", code: "#C19A6B" }
    ],
    sizes: ["S", "M", "L"],
    stock: { "S": 10, "M": 15, "L": 9 },
    description: "A structural wide-brim fedora hat crafted from 100% Australian wool felt. Detailed with an adjustable inner band for a customized fit, and finished with a tonal leather band.",
    details: [
      "100% Australian wool felt construction",
      "Wide structured brim (3.25 inches)",
      "Adjustable inner drawcord strap",
      "100% genuine leather accent band",
      "Classic tear-drop crown shape"
    ],
    fabric: "100% Australian Wool. Clean with soft brush or lint roller.",
    shipping: "Standard delivery $10, free over $150. Return in original box to maintain shape.",
    rating: 4.4,
    reviews: [
      { id: 1, author: "Harriet W.", rating: 4, date: "2026-05-08", title: "Perfect fedora", content: "Exactly what I was looking for. Fits securely thanks to the inner drawcord. Solid weight wool that holds its shape." }
    ]
  },
  {
    id: 16,
    name: "Silk Square Scarf",
    category: "Accessories",
    subCategory: "Bags",
    price: 75,
    originalPrice: null,
    badges: [],
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Monochrome Grid", code: "#D8D2C4" },
      { name: "Ochre Abstract", code: "#B38F4D" }
    ],
    sizes: ["O/S"],
    stock: { "O/S": 40 },
    description: "A luxurious square scarf made from high-density silk twill. Features hand-rolled edges and a custom-designed geometric abstract print, adding an instant layer of refinement to any coat or bag strap.",
    details: [
      "Premium silk twill weave",
      "Dimensions: 36 x 36 inches (90 x 90 cm)",
      "Traditional hand-rolled, hand-stitched borders",
      "Double-sided ink saturation",
      "Includes premium presentation box"
    ],
    fabric: "100% Mulberry Silk Twill. Dry clean only. Iron low, reverse side.",
    shipping: "Standard delivery $10, free over $150.",
    rating: 4.9,
    reviews: [
      { id: 1, author: "Amanda K.", rating: 5, date: "2026-06-03", title: "A masterwork", content: "The colors are deep and luxurious. The hand-rolled hem looks highly premium. Extremely soft and ties beautifully." }
    ]
  }
];
