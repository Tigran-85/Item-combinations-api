const generateCombinations = (items, length) => {
    const result = [];
    const helper = (start, currentCombination) => {
        if (currentCombination.length === length) {
            result.push([...currentCombination]);
            return;
        }
        for (let i = start; i < items.length; i++) {
            const prefixChar = items[i][0];
            if (currentCombination.some(item => item[0] === prefixChar)) continue;
            helper(i + 1, [...currentCombination, items[i]]);
        }
    };
    helper(0, []);
    return result;
};


module.exports = generateCombinations;