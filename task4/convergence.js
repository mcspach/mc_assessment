function convergence(n) {
  let seriesX = [1];
  let seriesY = [n];
  let match = 0;

  // until a match is found, iterate through both arrays and add the correct amount
  while ((seriesX.includes(seriesY[seriesY.length - 1]) == false) && (seriesY.includes(seriesX[seriesX.length - 1]) == false)) {
    nextNum(seriesY);
    nextNum(seriesX);
  }

  function nextNum(series) {
    let n = series[series.length - 1];
    // single digits
    if (n > 0 && n < 10) {
      n += n;
      series.push(n);
    } else {
      // not single digits
      let numberToAdd = 1;
      let numberArray = n.toString().split("").filter(i => i != '0');
      for (var i = 0; i < numberArray.length; i++) {
        numberToAdd *= numberArray[i];
      }
      n += numberToAdd;
      series.push(n);
    }

    //before returning to while loop, save the number if a match is found
    if (seriesX.includes(seriesY[seriesY.length - 1]) || seriesY.includes(seriesX[seriesX.length - 1])) {
      match = n;
    }
  }
  // return the index of the suitable array
  if (seriesX.includes(seriesY[seriesY.length - 1])) {
    return seriesX.indexOf(match);
  } else {
    return seriesY.indexOf(match);
  }
}

// Solution on CodeWars:
// https://www.codewars.com/kata/reviews/59a7ea7b50d3fe85510013ac/groups/642b6bcf62f2cb00014dc03b
