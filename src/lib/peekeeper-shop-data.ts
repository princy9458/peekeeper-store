export type Variant = {
  id: string;
  size: string;
  color: string;
  colorLabel: string;
  hex: string;
  image: string;
  stock: number;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  rowSpan?: number;
};

export type Review = {
  id: string;
  name: string;
  date: string;
  title: string;
  text: string;
  stars: number;
  image?: string;
  helpful: number;
  notHelpful: number;
  verified?: boolean;
  withImages?: boolean;
  reply?: string;
};

export type PeekeeperProduct = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  mainImage: string;
  thumbnails: string[];
  description: string;
  sizeOptions: { value: string; label: string; note: string; stock: number }[];
  colorOptions: { value: string; label: string; hex: string; image: string; stock: number }[];
  variants: Variant[];
  inventory: number;
  payPalText: string;
  rating: number;
  reviewCount: number;
  reviewSummary: {
    average: number;
    total: number;
    distribution: { stars: number; count: number }[];
  };
  netBag: {
    title: string;
    price: number;
    description: string;
    image: string;
  };
  sizeGuide: {
    intro: string;
    image: string;
    table: Array<[string, string, string, string]>;
  };
  cards: Array<{
    title: string;
    text: string;
  }>;
  gallery: GalleryImage[];
  reviews: Review[];
};

const product: PeekeeperProduct = {
  id: 'peekeeper-unisex',
  slug: 'peekeeper',
  title: 'Peekeeper',
  subtitle: '(Unisex Design)',
  price: 46.99,
  mainImage: '/images/premium-puppy-diapers/dachshund-walnut-front.webp.png',
  thumbnails: [
    '/images/premium-puppy-diapers/dachshund-walnut-front.webp.png',
    '/images/premium-puppy-diapers/shih-tzu-pink-begonia-front.webp.png',
    '/images/premium-puppy-diapers/dachshund-peri-blue-front.webp.png',
    '/images/premium-puppy-diapers/yorkie-denim-front.webp.png',
    '/images/premium-puppy-diapers/maltese-peri-blue-front.webp.png',
    '/images/premium-puppy-diapers/pekingese-hot-pink-front.webp.png',
    '/images/premium-puppy-diapers/dachshund-fire-red-front.webp.png',
    '/images/premium-puppy-diapers/dachshund-walnut-front.webp.png',
  ],
  description:
    'See below for "SIZE GUIDE" on how to measure your dog for the best dog diaper fit.',
  sizeOptions: [
    { value: 'xs', label: '(XS 10") Waist 9"-12", Length 10"', note: 'Extra Small', stock: 18 },
    { value: 'sm', label: '(SM 12") Waist 13"-16", Length 12"', note: 'Small', stock: 13 },
    { value: 'med', label: '(MED 14") Waist 17"-21", Length 14"', note: 'Medium', stock: 9 },
  ],
  colorOptions: [
    {
      value: 'denim',
      label: 'DENIM 100% COTTON',
      hex: '#4E79B5',
      image: '/images/premium-puppy-diapers/yorkie-denim-front.webp.png',
      stock: 8,
    },
    {
      value: 'walnut',
      label: 'WALNUT',
      hex: '#8B6914',
      image: '/images/premium-puppy-diapers/dachshund-walnut-front.webp.png',
      stock: 7,
    },
    {
      value: 'pink',
      label: 'PINK BEGONIA',
      hex: '#F0A0B8',
      image: '/images/premium-puppy-diapers/shih-tzu-pink-begonia-front.webp.png',
      stock: 5,
    },
  ],
  variants: [
    { id: 'xs-denim', size: 'XS', color: 'Denim', colorLabel: 'DENIM 100% COTTON', hex: '#4E79B5', image: '/images/premium-puppy-diapers/yorkie-denim-front.webp.png', stock: 8 },
    { id: 'xs-walnut', size: 'XS', color: 'Walnut', colorLabel: 'WALNUT', hex: '#8B6914', image: '/images/premium-puppy-diapers/dachshund-walnut-front.webp.png', stock: 5 },
    { id: 'sm-pink', size: 'SM', color: 'Pink Begonia', colorLabel: 'PINK BEGONIA', hex: '#F0A0B8', image: '/images/premium-puppy-diapers/shih-tzu-pink-begonia-front.webp.png', stock: 4 },
    { id: 'med-denim', size: 'MED', color: 'Denim', colorLabel: 'DENIM 100% COTTON', hex: '#4E79B5', image: '/images/premium-puppy-diapers/yorkie-denim-front.webp.png', stock: 3 },
  ],
  inventory: 27,
  payPalText: 'Pay in 4 interest-free payments of $14.68 with PayPal. Learn more',
  rating: 5,
  reviewCount: 125,
  reviewSummary: {
    average: 4.86,
    total: 113,
    distribution: [
      { stars: 5, count: 107 },
      { stars: 4, count: 2 },
      { stars: 3, count: 1 },
      { stars: 2, count: 0 },
      { stars: 1, count: 3 },
    ],
  },
  netBag: {
    title: 'Net Bag',
    price: 4.9,
    description:
      'The net bag will help protect the PeeKeeper straps from getting tangled and pulled during washes.',
    image: '/images/premium-puppy-diapers/shih-tzu-pink-front.webp.png',
  },
  sizeGuide: {
    intro:
      'In order to get the best fit, please follow the instructions for measuring your dog carefully. Your measurements will determine how well the PeeKeeper dog diaper will fit. The weight is provided only as a guideline.',
    image: 'https://peekeeper.com/wp-content/uploads/2022/04/dog2-1_new.jpg',
    table: [
      ['Extra Small', '9" to 12"', 'from 10" to 12"', 'no less than 5 lbs'],
      ['Small', '13" to 16"', 'from 12" to 16"', 'varies'],
      ['Medium', '17" to 21"', 'from 14" to 18"', 'no more than 40 lbs'],
    ],
  },
  cards: [
    {
      title: 'Measure with a flexible tape',
      text:
        'If you do not have a flexible tape, measure your dog with a string or shoelace and then lay the string or shoelace flat on a table and measure it. Metal tapes will not give an accurate measurement.',
    },
    {
      title: 'First Measure Waist',
      text:
        'Measure one inch in front of your dog\'s hind legs, not around the chest. The waist measurement determines the size you select. Extra-Small, Small or Medium size.',
    },
    {
      title: 'Second Measure Length',
      text:
        'After you determine Extra-Small, Small or Medium size select the length. Measure from the base of the neck at collar to the tail. Be sure to have dog\'s head held up, not down sniffing the ground.',
    },
  ],
  gallery: [
    { id: 'g1', src: '/images/premium-puppy-diapers/dachshund-walnut-front.webp.png', alt: 'PeeKeeper dog diaper - Walnut', width: 720, height: 620, rowSpan: 2 },
    { id: 'g2', src: '/images/premium-puppy-diapers/shih-tzu-pink-begonia-front.webp.png', alt: 'PeeKeeper dog diaper - Pink Begonia', width: 720, height: 520 },
    { id: 'g3', src: '/images/premium-puppy-diapers/yorkie-denim-front.webp.png', alt: 'PeeKeeper dog diaper - Denim', width: 720, height: 540, rowSpan: 2 },
    { id: 'g4', src: '/images/premium-puppy-diapers/dachshund-fire-red-front.webp.png', alt: 'PeeKeeper dog diaper - Fire Red', width: 720, height: 480 },
    { id: 'g5', src: '/images/premium-puppy-diapers/pekingese-hot-pink-front.webp.png', alt: 'PeeKeeper dog diaper - Hot Pink', width: 720, height: 620, rowSpan: 2 },
    { id: 'g6', src: '/images/premium-puppy-diapers/dachshund-peri-blue-front.webp.png', alt: 'PeeKeeper dog diaper - Peri Blue', width: 720, height: 500 },
  ],
  reviews: [
    {
      id: 'r1',
      name: 'S**** G*****',
      date: 'March 26, 2025',
      title: 'We are back for Pandi',
      text:
        'You all have helped us and several small seniors we\'ve rescued over the years. Now it\'s time for your great product! They hold up so well, thank you!',
      stars: 5,
      image: '/images/premium-puppy-diapers/dog-fancy-1.jpg',
      helpful: 0,
      notHelpful: 1,
      verified: true,
      withImages: true,
    },
    {
      id: 'r2',
      name: 'S****** L******',
      date: 'March 26, 2024',
      title: 'Our Sweetie Wheatie',
      text:
        'This is truly a life changing product for both our dog and ourselves. After adopting our dog at 8 weeks old, we later learned after many issues with potty training that the PeeKeeper solved everything.',
      stars: 5,
      image: '/images/premium-puppy-diapers/yorkie-denim-front.webp.png',
      helpful: 1,
      notHelpful: 0,
      verified: true,
      withImages: true,
    },
    {
      id: 'r3',
      name: 'C******',
      date: 'October 25, 2023',
      title: 'Old Male Mini Doxie',
      text:
        'This is an AMAZING PRODUCT. 5 years of daily use so far. My 14 year old mini doxie has been bad in the house for years. But, I love him and that means keeping him comfortable.',
      stars: 5,
      image: '/images/premium-puppy-diapers/dachshund-fire-red-front.webp.png',
      helpful: 9,
      notHelpful: 1,
      verified: true,
      withImages: true,
    },
    {
      id: 'r4',
      name: 'E******',
      date: 'September 8, 2023',
      title: 'A fit that works',
      text:
        'The Medium size fits perfectly on our Winston. We inserted a long Poise pad which also fits perfectly. A great product and very comfortable for him.',
      stars: 5,
      helpful: 7,
      notHelpful: 1,
      verified: true,
    },
    {
      id: 'r5',
      name: 'M***',
      date: 'July 27, 2023',
      title: 'Jamlo11@yahoo.com',
      text:
        'Sadly I\'m back to buy my third one. Our little guy is getting old and he can\'t hold his pee. The PeeKeeper is the only dog diaper I\'ll ever buy.',
      stars: 5,
      helpful: 2,
      notHelpful: 1,
      verified: false,
    },
    {
      id: 'r6',
      name: 'E******',
      date: 'April 18, 2023',
      title: 'I LOVE your Pee Keepers!',
      text:
        'They made my life worth living because one of my other Jack Russell Terriers had CUSHINGS - and I was cleaning up pee-pee all over the place 24/7!!!!',
      stars: 5,
      helpful: 8,
      notHelpful: 1,
      verified: true,
    },
    {
      id: 'r7',
      name: 'J*** J* B*****',
      date: 'March 28, 2023',
      title: 'Sizes',
      text:
        'This looks like a great product but not big enough for my dog who has a 24" waist. I\'d buy a couple for sure if you have one size larger.',
      stars: 5,
      helpful: 5,
      notHelpful: 2,
      verified: false,
    },
    {
      id: 'r8',
      name: 'V********',
      date: 'March 9, 2023',
      title: 'Nothing for Daniff\'s',
      text:
        'Why is there nothing for XXXL dogs? I have a mastiff / Great Dane. She does not fit in any size offered. How sad that she is left out of other items.',
      stars: 1,
      helpful: 14,
      notHelpful: 6,
      verified: false,
    },
    {
      id: 'r9',
      name: 'A*** W*****',
      date: 'April 1, 2023',
      title: 'Happy Customer',
      text:
        'I had heard about this product from my cousin who also has a Yorkie. My precious Rex was marking everything and I had tried the wrap around diapers. Happy customer here.',
      stars: 5,
      helpful: 9,
      notHelpful: 3,
      verified: true,
    },
    {
      id: 'r10',
      name: 'L*** B',
      date: 'March 14, 2023',
      title: 'Perfect',
      text:
        'I just wanted to reach out and thank you for making the Peekeeper. I have a 17 year old dachshund with leaking issues and have tried a lot of different options.',
      stars: 5,
      helpful: 15,
      notHelpful: 3,
      verified: true,
      image: '/images/premium-puppy-diapers/dachshund-walnut-front.webp.png',
      withImages: true,
    },
    {
      id: 'r11',
      name: 'N***',
      date: 'March 8, 2023',
      title: 'Great fit',
      text:
        'The fit is really good and the quality feels strong. We ordered another for a friend after trying the first one.',
      stars: 5,
      helpful: 4,
      notHelpful: 1,
      verified: true,
    },
    {
      id: 'r12',
      name: 'M*****',
      date: 'February 19, 2023',
      title: 'Helpful for seniors',
      text:
        'We have a senior dog and this has made daily care much easier. Thank you for making a reliable product that actually works.',
      stars: 5,
      helpful: 3,
      notHelpful: 0,
      verified: true,
    },
  ],
};

declare global {
  // eslint-disable-next-line no-var
  var __peekeeperLegacyStore: {
    product: PeekeeperProduct;
    galleryCursor: number;
    reviewCursor: number;
    submittedReviews: Review[];
  } | undefined;
}

const store =
  globalThis.__peekeeperLegacyStore ||
  (globalThis.__peekeeperLegacyStore = {
    product,
    galleryCursor: 0,
    reviewCursor: 0,
    submittedReviews: [],
  });

export function getPeekeeperProduct() {
  return store.product;
}

export function getPeekeeperGallery(limit = 3, offset = 0) {
  return store.product.gallery.slice(offset, offset + limit);
}

export function getPeekeeperReviews(limit = 4, offset = 0, filter?: string) {
  const source = [...store.submittedReviews, ...store.product.reviews];
  const filtered = filter === 'with-images'
    ? source.filter((review) => review.withImages || review.image)
    : filter === 'verified'
      ? source.filter((review) => review.verified)
      : filter === 'all-stars'
        ? source.filter((review) => review.stars === 5)
        : source;

  return {
    items: filtered.slice(offset, offset + limit),
    total: filtered.length,
    nextOffset: Math.min(offset + limit, filtered.length),
    hasMore: offset + limit < filtered.length,
  };
}

export function addPeekeeperReview(review: Omit<Review, 'id'>) {
  const next: Review = {
    ...review,
    id: `submitted-${Date.now()}`,
  };
  store.submittedReviews.unshift(next);
  return next;
}

export function getVariantBySelection(size: string, color: string) {
  return store.product.variants.find(
    (variant) => variant.size.toLowerCase() === size.toLowerCase() && variant.color.toLowerCase() === color.toLowerCase(),
  ) || null;
}

