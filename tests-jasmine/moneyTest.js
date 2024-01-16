import formatCurrenncy from "../scripts/utils/money.js";

describe('test suite: formatCurrency', ()=>{
    it('converts cents into a dollar', ()=>{
        expect(formatCurrenncy(2095)).toEqual('20.95');
    });

    it('works with zero', ()=>{
        expect(formatCurrenncy(0)).toEqual('0.00');
    });

    it('Round up to the nearest cent', ()=>{
        expect(formatCurrenncy(2000.5)).toEqual('20.01');
    });

    it('Round up to the lowest cent', ()=>{
        expect(formatCurrenncy(2000.4)).toEqual('20.00');
    });
});



