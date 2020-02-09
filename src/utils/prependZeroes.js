/**
 *  Prepends numbers with zero (i.e 001, 020)
 *  @param Number integer
 *  @return String
 */
const prependZeroes = function(integer) {
    if (integer <= 9) {
        integer = `00${integer}`;
    } else if (integer >= 10 && integer <= 99) {
        integer = `0${integer}`;
    } else {
        integer = integer.toString();
    }

    return integer;
};

export default prependZeroes;
