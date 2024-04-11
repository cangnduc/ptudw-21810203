let renderStar = function (stars) {
  let fullstar = Math.floor(stars);
  let halfstar = stars - fullstar;
  let i;
  let result = "";
  for (i = 0; i < fullstar; i++) {
    result += `<i class="fa fa-star"></i>`;
  }
  if (halfstar > 0) {
    result += `<i class="fa fa-star-half"></i>`;
    i++;
  }
  for (; i < 5; i++) {
    result += `<i class="fa fa-star-o"></i>`;
  }
  return result;
};
module.exports = renderStar;
