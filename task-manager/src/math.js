const calculateTip = (total, tipPercent) => {
    const tip = total * tipPercent + total;
    return total + tip;
};

module.exports = {
    calculateTip
};