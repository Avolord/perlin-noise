//let noise2D = (x,y)

let p = [
  201,226,96,242,33,146,152,141,15,41,117,249,214,18,140,111,134,58,178,209,15,
  213,137,188,239,152,13,21,88,149,193,63,133,191,97,63,14,217,192,90,36,184,228,111,68,
  139,209,139,190,69,200,251,242,80,152,5,87,240,174,179,128,169,214,226,123,180,171,54,
  202,141,196,57,136,60,207,151,249,229,185,66,34,227,2,37,99,188,31,254,154,70,161,223,
  220,239,184,133,115,203,32,88,229,252,198,9,76,32,69,146,202,60,56,189,209,162,89,20,
  205,93,39,186,205,218,152,231,103,126,39,68,245,113,68,116,198,203,140,103,82,205,55,
  88,192,230,29,161,161,195,169,43,185,230,29,79,63,28,7,158,234,14,15,185,206,115,11,
  110,50,43,193,207,41,248,64,195,149,101,24,12,199,207,209,36,96,100,126,124,201,7,172,
  54,191,255,147,81,18,149,13,2,129,40,126,129,193,22,86,184,65,2,78,228,149,204,10,97,120,
  78,13,244,3,154,192,226,145,210,76,178,53,123,182,37,217,158,28,38,188,33,236,36,219,164,
  162,251,63,77,9,4,206,77,61,72,15,240,121,129,49,153,15,111
      ];
let hash_table = length => {
  let table = new Array(length).fill(0);
  return table.map(x => random(0,length));
};

let fade = t => t * t * t * (t * (t * 6 - 15) + 10);

let convert = (x, y) => {
  let x_,y_;
  switch(x%3) {
    case 0:
      x_ = -1;
    break;
    case 1:
      x_ = 0;
    break;
    case 2:
      x_ = 1;
    break;
  }
  switch(y%3) {
    case 0:
      y_ = -1;
    break;
    case 1:
      y_ = 0;
    break;
    case 2:
      y_ = 1;
    break;
  }
  return new V2D(x_,y_);
}

let noise = (x,y,repeat = 0,hash_table = p) => {
  if(repeat > 0) {
    x = x % repeat;
    y = y % repeat;
  }

  let xi = parseInt(x) & 254;
  let yi = parseInt(y) & 254;
  let dx = x - parseInt(x);
  let dy = y - parseInt(y);

  let g1 = convert(hash_table[xi],hash_table[yi]),
      g2 = convert(hash_table[xi+1],hash_table[yi]),
      g3 = convert(hash_table[xi+1],hash_table[yi+1]),
      g4 = convert(hash_table[xi],hash_table[yi+1]);

  let pos = new V2D(1/xi,1/yi);

  let dist1 = pos,
      dist2 = pos.sub(new V2D(1,0)),
      dist3 = pos.sub(new V2D(1,1)),
      dist4 = pos.sub(new V2D(0,1));

  let dp1 = dist1.dotP(g1),
      dp2 = dist2.dotP(g2),
      dp3 = dist3.dotP(g3),
      dp4 = dist4.dotP(g4);

  let int_top = dp1+(dp2-dp1)*(pos.x);
  let int_bot = dp1+(dp4-dp3)*(pos.x);
  return int_top+(int_bot-int_top)*(pos.y);
};
