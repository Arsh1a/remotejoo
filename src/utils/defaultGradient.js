let gradients = [["#E7664B", "#FE7E47", "#3C626E", "#559C84"]];

export function getRandomGradient() {
  return gradients[Math.floor(Math.random() * gradients.length)];
}
