
const input = [
  ["a", "b", "c"],
  ["1", "2", "3"],
  ["A", "B", "C"],
  // ["a", "b", "c"],
  // ["1", "2", "3"],
  // ["A", "B", "C"],
];


const permutate = (arr) => {
  let res = arr[0];

  arr.forEach((_items, i) => {
    if (i === 0) return;

    const pre = res;
    res = [];
    pre.forEach((_item1) => {
      _items.forEach((_item2) => {
        if (_item1 instanceof Array) {
          res.push(_item1.concat(_item2));
        } else {
          res.push([_item1].concat(_item2));
        }
      });
    });
  })

  // for (let i = 1; i < arr.length; i++) {
  //   const pre = res;
  //   res = [];
  //   pre.forEach((item) => {
  //     arr[i].forEach((item2) => {
  //       if (item instanceof Array) {
  //         res.push(item.concat(item2));
  //       } else {
  //         res.push([item].concat(item2));
  //       }
  //     });
  //   });
  // }

  return res;
};



console.log(permutate(input));

