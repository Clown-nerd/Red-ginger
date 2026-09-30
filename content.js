/* Edit this single file to update restaurant details, menu items and links. */
window.RG = {
  name: "Red Ginger Eatery",
  tagline: "Escape the ordinary. Embrace tranquility.",
  address: "2nd Parklands Avenue, Parklands, Nairobi",
  phones: ["+254 758 344 444", "+254 758 044 444", "+254 768 744 444"],
  whatsapp: "+254758344444",
  instagram: "https://www.instagram.com/redgingerke/",
  orderUrl: "https://bit.ly/redgingertap2order",
  menuPdf: "", // Add the full menu PDF URL when available.
  hours: "Hours to be confirmed", // Placeholder: replace when the restaurant confirms hours.
  reservationEndpoint: "", // Add your booking API URL to POST confirmed reservations.
  mapUrl: "https://maps.google.com/?q=Red+Ginger+Eatery+2nd+Parklands+Avenue+Nairobi",
  /* Add dishes like {name, description, price, tags: ["Vegetarian", "Spicy"]} to each category. */
  menu: { "Mithai": [], "Koroga": [], "Dessert": [], "Oriental": [], "Indian": [], "Drinks": [] },
  experiences: [
    {title:"Koroga", image:"assets/koroga.webp", copy:"A Kenyan outdoor-cooking experience, shared at an unhurried pace."},
    {title:"The Bar", image:"assets/interior.webp", copy:"A warm corner to settle into and stay a little longer."},
    {title:"Party Hall & Events", image:"assets/interior.webp", copy:"Gather your people. Ask us about hosting your next occasion."},
    {title:"Catering", image:"assets/braised.webp", copy:"Bring a little Red Ginger warmth to your next gathering."},
    {title:"Ice Cream Parlour", image:"assets/oriental.webp", copy:"A sweet pause, whenever the moment calls for one."}
  ]
};
