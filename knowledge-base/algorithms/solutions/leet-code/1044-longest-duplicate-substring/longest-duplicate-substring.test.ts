import {
  resetEnvValues,
  hash,
  primePower,
  rollHash,
  runtimeParams,
  longestDupSubstring,
} from "./program";

beforeEach(() => {
  resetEnvValues();
  runtimeParams.performanceProfiling = true;
  runtimeParams.logging = false;
});

test(`validate the optimized power calculation function (${runtimeParams.hashingPrime}^2)`, () => {
  const expoent = 2;
  expect(primePower(expoent).value).toBe(
    Math.pow(runtimeParams.hashingPrime, expoent)
  );
});

test(`validate the optimized power calculation function (${runtimeParams.hashingPrime}^3)`, () => {
  const expoent = 3;
  expect(primePower(expoent).value).toBe(
    Math.pow(runtimeParams.hashingPrime, expoent)
  );
});

test(`validate the optimized power calculation function (${runtimeParams.hashingPrime}^6)`, () => {
  const expoent = 6;
  expect(primePower(expoent).value).toBe(
    Math.pow(runtimeParams.hashingPrime, expoent)
  );
});

test("validate performance optimization for subsequent expoents calculation", () => {
  expect(primePower(2).value).toBe(Math.pow(runtimeParams.hashingPrime, 2));
  expect(primePower(3).value).toBe(Math.pow(runtimeParams.hashingPrime, 3));
  expect(primePower(4).value).toBe(Math.pow(runtimeParams.hashingPrime, 4));
  expect(primePower(5).value).toBe(Math.pow(runtimeParams.hashingPrime, 5));

  const lastOperation = primePower(6);
  expect(lastOperation.value).toBe(Math.pow(runtimeParams.hashingPrime, 6));
  expect(lastOperation.calculations).toBe(1);
});

test("validate performance optimization for subsequent expoents calculation", () => {
  expect(primePower(2).value).toBe(Math.pow(runtimeParams.hashingPrime, 2));
  expect(primePower(3).value).toBe(Math.pow(runtimeParams.hashingPrime, 3));

  const lastOperation = primePower(6);
  expect(lastOperation.value).toBe(Math.pow(runtimeParams.hashingPrime, 6));
  expect(lastOperation.calculations).toBe(3);
});

test.each([
  ["a", 1],
  ["b", 2],
  ["c", 3],
  ["d", 4],
  ["abc", 731],
  ["bc", 55],
  ["bcd", 1434],
  [
    "abcd",
    1 * Math.pow(runtimeParams.hashingPrime, 3) +
      2 * Math.pow(runtimeParams.hashingPrime, 2) +
      3 * Math.pow(runtimeParams.hashingPrime, 1) +
      4 * Math.pow(runtimeParams.hashingPrime, 0),
  ],
])("hash number for %s should be %d", (s, hashValue) => {
  expect(hash(s)).toBe(hashValue);
});

test.each([
  ["a", 2, 676],
  ["b", 2, 2 * Math.pow(runtimeParams.hashingPrime, 2)],
  ["b", 3, 2 * Math.pow(runtimeParams.hashingPrime, 3)],
])("hash number for %s shifted by %d should be %d", (s, shift, hashValue) => {
  expect(hash(s, shift)).toBe(hashValue);
});

test.each([
  ["a", 1],
  ["b", 2],
  ["c", 3],
  ["d", 4],
  ["abc", 731],
  ["bc", 55],
  ["bcd", 1434 % 997],
  [
    "abcd",
    (1 * Math.pow(runtimeParams.hashingPrime, 3) +
      2 * Math.pow(runtimeParams.hashingPrime, 2) +
      3 * Math.pow(runtimeParams.hashingPrime, 1) +
      4 * Math.pow(runtimeParams.hashingPrime, 0)) %
      997,
  ],
])(
  "hash number for %s should be %d when limited by modulus of 997",
  (s, hashValue) => {
    runtimeParams.largerPrime = 997;
    expect(hash(s)).toBe(hashValue);
  }
);

test.each([
  ["abcd", "e"],
  ["abcd", "f"],
  ["abcd", "g"],
  ["abcd", "h"],
])("validate rolling hash function", (s, newLetter) => {
  const oldFirstLetter = s[0];
  const newString = s.substring(1) + newLetter;

  const rolledHash = rollHash(hash(s), oldFirstLetter, s.length, newLetter);
  const confirmationHash = hash(newString);

  expect(rolledHash).toBe(confirmationHash);
});

test.each([
  ["abcd", "e"],
  ["abcd", "f"],
  ["abcd", "g"],
  ["abcd", "h"],
])(
  "validate rolling hash sliding %s to %s when limited by modulus of 997",
  (s, newLetter) => {
    runtimeParams.largerPrime = 997;
    const oldFirstLetter = s[0];
    const newString = s.substring(1) + newLetter;

    const rolledHash = rollHash(hash(s), oldFirstLetter, s.length, newLetter);
    const confirmationHash = hash(newString);

    expect(rolledHash).toBe(confirmationHash);
  }
);

test.each([
  ["abcd", ""],
  ["banana", "ana"],
  ["abacateacate", "acate"],
  [
    "pmyiaxmicpmvqywlkisfzzutlxxjipitwcfxgqqfnxizowkqfmzsvkxryknasyvthozahbmapwqocupxcktmmtddxgatzftamrsvtddjpbnrojcqonmzxmknashplmykdbadiiccdkbyyzifqxvqfwgwihxgnrhqlmqprnjawuzcotutbkgnykuuwtzzzppmoyfmplhpznpnlwwbndekakpsmehzmbcfoyudgwsvehzgsfwqdkihiiwxfskicrbmoevxvpmmymihlkmgnuyohcofzfkehccwxezxypnnvqzrilr",
    "knas",
  ],
  [
    "okmzpmxzwjbfssktjtebhhxfphcxefhonkncnrumgduoaeltjvwqwydpdsrbxsgmcdxrthilniqxkqzuuqzqhlccmqcmccfqddncchadnthtxjruvwsmazlzhijygmtabbzelslebyrfpyyvcwnaiqkkzlyillxmkfggyfwgzhhvyzfvnltjfxskdarvugagmnrzomkhldgqtqnghsddgrjmuhpgkfcjkkkaywkzsikptkrvbnvuyamegwempuwfpaypmuhhpuqrufsgpiojhblbihbrpwxdxzolgqmzoyeblpvvrnbnsdnonhpmbrqissifpdavvscezqzclvukfgmrmbmmwvzfpxcgecyxneipexrzqgfwzdqeeqrugeiupukpveufmnceetilfsqjprcygitjefwgcvqlsxrasvxkifeasofcdvhvrpmxvjevupqtgqfgkqjmhtkyfsjkrdczmnettzdxcqexenpxbsharuapjmdvmfygeytyqfcqigrovhzbxqxidjzxfbrlpjxibtbndgubwgihdzwoywqxegvxvdgaoarlauurxpwmxqjkidwmfuuhcqtljsvruinflvkyiiuwiiveplnxlviszwkjrvyxijqrulchzkerbdyrdhecyhscuojbecgokythwwdulgnfwvdptzdvgamoublzxdxsogqpunbtoixfnkgbdrgknvcydmphuaxqpsofmylyijpzhbqsxryqusjnqfikvoikwthrmdwrwqzrdmlugfglmlngjhpspvnfddqsvrajvielokmzpmxzwjbfssktjtebhhxfphcxefhonkncnrumgduoaeltjvwqwydpdsrbxsgmcdxrthilniqxkqzuuqzqhlccmqcmccfqddncchadnthtxjruvwsmazlzhijygmtabbzelslebyrfpyyvcwnaiqkkzlyillxmkfggyfwgzhhvyzfvnltjfxskdarvugagmnrzomkhldgqtqnghsddgrjmuhpgkfcjkkkaywkzsikptkrvbnvuyamegwempuwfpaypmuhhpuqrufsgpiojhblbihbrpwxdxzolgqmzoyeblpvvrnbnsdnonhpmbrqissifpdavvscezqzclvukfgmrmbmmwvzfpxcgecyxneipexrzqgfwzdqeeqrugeiupukpveufmnceetilfsqjprcygitjefwgcvqlsxrasvxkifeasofcdvhvrpmxvjevupqtgqfgkqjmhtkyfsjkrdczmnettzdxcqexenpxbsharuapjmdvmfygeytyqfcqigrovhzbxqxidjzxfbrlpjxibtbndgubwgihdzwoywqxegvxvdgaoarlauurxpwmxqjkidwmfuuhcqtljsvruinflvkyiiuwiiveplnxlviszwkjrvyxijqrulchzkerbdyrdhecyhscuojbecgokythwwdulgnfwvdptzdvgamoublzxdxsogqpunbtoixfnkgbdrgknvcydmphuaxqpsofmylyijpzhbqsxryqusjnqfikvoikwthrmdwrwqzrdmlugfglmlngjhpspvnfddqsvrajviel",
    "okmzpmxzwjbfssktjtebhhxfphcxefhonkncnrumgduoaeltjvwqwydpdsrbxsgmcdxrthilniqxkqzuuqzqhlccmqcmccfqddncchadnthtxjruvwsmazlzhijygmtabbzelslebyrfpyyvcwnaiqkkzlyillxmkfggyfwgzhhvyzfvnltjfxskdarvugagmnrzomkhldgqtqnghsddgrjmuhpgkfcjkkkaywkzsikptkrvbnvuyamegwempuwfpaypmuhhpuqrufsgpiojhblbihbrpwxdxzolgqmzoyeblpvvrnbnsdnonhpmbrqissifpdavvscezqzclvukfgmrmbmmwvzfpxcgecyxneipexrzqgfwzdqeeqrugeiupukpveufmnceetilfsqjprcygitjefwgcvqlsxrasvxkifeasofcdvhvrpmxvjevupqtgqfgkqjmhtkyfsjkrdczmnettzdxcqexenpxbsharuapjmdvmfygeytyqfcqigrovhzbxqxidjzxfbrlpjxibtbndgubwgihdzwoywqxegvxvdgaoarlauurxpwmxqjkidwmfuuhcqtljsvruinflvkyiiuwiiveplnxlviszwkjrvyxijqrulchzkerbdyrdhecyhscuojbecgokythwwdulgnfwvdptzdvgamoublzxdxsogqpunbtoixfnkgbdrgknvcydmphuaxqpsofmylyijpzhbqsxryqusjnqfikvoikwthrmdwrwqzrdmlugfglmlngjhpspvnfddqsvrajviel",
  ],
  [
    "ababdaebdabedeabbdddbcebaccececbccccebbcaaabaadcadccddaedaacaeddddeceedeaabbbbcbacdaeeebaabdabdbaebadcbdebaaeddcadebedeabbbcbeadbaacdebceebceeccddbeacdcecbcdbceedaeebdaeeabccccbcccbceabedaedaacdbbdbadcdbdddddcdebbcdbcabbebbeabbdccccbaaccbbcecacaebebecdcdcecdeaccccccdbbdebaaaaaaeaaeecdecedcbabedbabdedbaebeedcecebabedbceecacbdecabcebdcbecedccaeaaadbababdccedebeccecaddeabaebbeeccabeddedbeaadbcdceddceccecddbdbeeddabeddadaaaadbeedbeeeaaaeaadaebdacbdcaaabbacacccddbeaacebeeaabaadcabdbaadeaccaecbeaaabccddabbeacdecadebaecccbabeaceccaaeddedcaecddaacebcaecebebebadaceadcaccdeebbcdebcedaeaedacbeecceeebbdbdbaadeeecabdebbaaebdddeeddabcbaaebeabbbcaaeecddecbbbebecdbbbaecceeaabeeedcdecdcaeacabdcbcedcbbcaeeebaabdbaadcebbccbedbabeaddaecdbdbdccceeccaccbdcdadcccceebdabccaebcddaeeecddddacdbdbeebdabecdaeaadbadbebecbcacbbceeabbceecaabdcabebbcdecedbacbcccddcecccecbacddbeddbbbadcbdadbecceebddeacbeeabcdbbaabeabdbbbcaeeadddaeccbcdabceeabaacbeacdcbdceebeaebcceeebdcdcbeaaeeeadabbecdbadbebbecdceaeeecaaaedeceaddedbedbedbddbcbabeadddeccdaadaaeaeeadebbeabcabbdebabeedeeeccadcddaebbedadcdaebabbecedebadbdeacecdcaebcbdababcecaecbcbcdadacaebdedecaadbaaeeebcbeeedaaebbabbeeadadbacdedcbabdaabddccedbeacbecbcccdeaeeabcaeccdaaaddcdecadddabcaedccbdbbccecacbcdecbdcdcbabbeaacddaeeaabccebaaaebacebdcdcbbbdabadeebbdccabcacaacccccbadbdebecdaccabbecdabdbdaebeeadaeecbadedaebcaedeedcaacabaccbbdaccedaedddacbbbdbcaeedbcbecccdbdeddcdadacccdbcdccebdebeaeacecaaadccbbaaddbeebcbadceaebeccecabdadccddbbcbaebeaeadacaebcbbbdbcdaeadbcbdcedebabbaababaacedcbcbceaaabadbdcddadecdcebeeabaadceecaeccdeeabdbabebdcedceaeddaecedcdbccbbedbeecabaecdbba",
    "aeeebaabd",
  ],
])("longest duplicate substring for %s should be %s", (s, result) => {
  expect(longestDupSubstring(s)).toBe(result);
});
