//let noise2D = (x,y)

let standart_table = [
  201,226,96,242,33,146,152,141,15,41,117,249,214,18,140,111,134,58,178,209,15,
  213,137,188,239,152,13,21,88,149,193,63,133,191,97,63,14,217,192,90,36,184,228,111,68,
  139,209,139,190,69,200,251,242,80,152,5,87,240,174,179,128,169,214,226,123,180,171,54,
  202,141,196,57,136,60,27,151,249,229,185,66,34,227,2,37,99,188,31,254,154,70,161,223,
  220,239,184,133,115,203,32,88,229,252,198,9,76,32,69,146,202,60,56,189,209,162,89,20,
  205,93,39,186,205,218,152,231,103,126,39,68,245,113,68,116,198,203,140,103,82,205,55,
  88,192,230,29,161,161,195,169,43,185,230,29,79,63,28,7,158,234,14,15,185,206,115,11,
  110,50,43,193,207,41,248,64,195,149,101,24,192,199,207,209,36,96,100,126,124,201,7,172,
  54,191,255,147,81,18,149,13,2,129,40,126,129,193,22,86,184,65,2,78,228,149,204,10,97,120,
  78,13,244,3,154,192,226,145,210,76,178,53,123,182,37,217,158,28,38,188,33,236,36,219,164,
  162,251,63,77,9,4,206,77,61,72,15,240,121,129,49,153,15,111
      ];

let hash_table = length => {
  let table = new Array(length).fill(0);
  return table.map(x => random(0,length-1));
};

let fade = t => t * t * t * (t * (t * 6 - 15) + 10);

let perm = new Array(512);

function initPerlinNoise(hash_table = standart_table)
{
   for (let i = 0; i < 256; i++) {
      perm[256 + i] = perm[i] = hash_table[i];
   }
}

   let lerp = (t,a,b) =>
   {
      return a + t * (b - a);
   }

   let cerp = (t,a,b) => {
   let t2 = (1-Math.cos(t*Math.PI))/2;
   return (a*(1-t2)+b*t2);
}

   let grad = (hash,x,y) => {
     switch(hash & 0x4)
       {
        case 0x0: return  x + y;
        case 0x1: return  x - y;
        case 0x2: return -x - y;
        case 0x3: return -x + y;
        case 0x4: return  Math.SQRT2*x;
        case 0x5: return -Math.SQRT2*x;
        case 0x6: return  Math.SQRT2*y;
        case 0x7: return -Math.SQRT2*y;
        default: return 0; // never happens
       }
   }

   let noise2D = (x,y) => {
      let ix,iy,gx,gy;
      let a0,b0,aa,ab,ba,bb;

      let aa0,ab0,ba0,bb0;
      let a1,a2,a3,a4;
      let u,v;

      ix = parseInt(x);
      x-=ix;
      iy = parseInt(y);
      y-=iy;

      gx = ix & 0xFF;
      gy = iy & 0xFF;

      a0 = gy+perm[gx]; //utulizing both values [0;511] to pick a value of the hash array
      b0 = gy+perm[gx + 1]; //more variability + new Intervall [1;512]
      aa = perm[a0]; //picking 4 indexes for the standart 256Array [0;256]
      ab = perm[a0 + 1];
      ba = perm[b0];
      bb = perm[b0 + 1];

      aa0 = perm[aa]; //picking 4 hashes
      ab0 = perm[ab];
      ba0 = perm[ba];
      bb0 = perm[bb];

      a1 = grad(bb0, x  , y  );
      a2 = grad(ab0, x-1, y  );
      a3 = grad(ba0, x-1, y-1);
      a4 = grad(aa0, x  , y-1);

      u = fade(x); //smoothes out the values
      v = fade(y);

      return cerp(v, cerp(u, a1, a2), cerp(u, a4, a3));
   }
