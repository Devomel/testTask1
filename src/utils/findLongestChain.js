export function findLongestChain(fragments) {
   const firstTwoDigits = prepareMap(fragments);
   let { maxLength, bestResult } = findBestChain(fragments, firstTwoDigits);
   return formatResult(bestResult);
}



function prepareMap(fragments) {
   const map = new Map();
   fragments.forEach(num => {
      const str = num.toString();
      const first2 = str.slice(0, 2);
      if (!map.has(first2)) {
         map.set(first2, []);
      }
      map.get(first2).push(num);
   });
   return map;
}

function findBestChain(fragments, firstTwoDigits) {
   let maxLength = 0;
   let bestResult = [];

   fragments.forEach(start => {
      const { chain, length } = buildChain(start, firstTwoDigits);
      if (length > maxLength) {
         maxLength = length;
         bestResult = chain;
      }
   });

   return { maxLength, bestResult };
}

function buildChain(start, firstTwoDigits) {
   let current = start;
   let chain = [current];
   let used = new Set([current]);

   while (true) {
      const last2 = current.toString().slice(-2);
      const candidates = firstTwoDigits.get(last2) || [];
      const bestNext = findNext(candidates, used);

      if (!bestNext) break;

      current = bestNext;
      chain.push(current);
      used.add(current);
   }

   return { chain, length: chain.length };
}

function findNext(candidates, used) {
   for (const next of candidates) {
      if (!used.has(next)) {
         return next;
      }
   }
   return null;
}

function formatResult(chain) {
   return chain
      .map((item, index) => (index === 0 ? item.toString().slice(0, item.toString().length - 2) : item.toString().slice(2)))
      .join("");
}
