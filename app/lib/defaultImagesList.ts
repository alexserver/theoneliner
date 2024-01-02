export const images = [
  "https://source.unsplash.com/black-and-gray-microphone-on-black-stand-QrqeusbpFMM",
  "https://source.unsplash.com/man-in-red-knit-cap-and-yellow-and-black-plaid-dress-shirt-holding-microphone-9ujdLC6sOaM",
  "https://source.unsplash.com/person-standing-on-stage-ub77xN37pNs",
  "https://source.unsplash.com/man-in-black-shirt-singing-on-stage-NBRNK4XC1k8",
  "https://source.unsplash.com/laugh-neon-signage-imlD5dbcLM4",
  "https://source.unsplash.com/man-in-red-and-white-plaid-button-up-shirt-holding-microphone-9gvDZCiA6Dk",
  "https://source.unsplash.com/white-and-black-i-love-you-print-on-gray-concrete-wall-q73jLftKN-A",
  "https://source.unsplash.com/a-person-sitting-on-a-couch-with-a-laptop-X1GZqv-F7Tw",
  "https://source.unsplash.com/a-couple-of-women-sitting-next-to-each-other-eating-a-slice-of-pizza-DTL4gISnmkM",
  "https://source.unsplash.com/smiling-woman-wearing-pink-sweater-ZiBSfB6KEFA",
  "https://source.unsplash.com/three-people-sitting-in-front-of-table-laughing-together-g1Kr4Ozfoac",
  "https://source.unsplash.com/a-group-of-people-standing-next-to-each-other-d0JuQdnRW7Y",
  "https://source.unsplash.com/attractive-young-woman-with-curly-hair-using-her-touch-screen-mobile-cell-phone-by-the-fountain-e2kKxF0LE8A",
  "https://source.unsplash.com/man-sitting-beside-two-woman-on-gray-surface-rwF_pJRWhAI",
];

export default function defaultRandomImage() {
  return images.at(Math.floor(Math.random() * images.length));
}
