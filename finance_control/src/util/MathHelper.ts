export class MathHelper {

    static paymentModeRatio : {[key: number]:number} = {
        0: 1, //mensal
        1: 4, //semanal
        2: 30, //diario
        3: 1/3, //trimestral
        4: 1/6, //semestral
        5: 1/12, //anual


    }

    static multiplyByPaymentMode(value: number, resultPaymentMode: number, originPaymentMode: number) {
        let ratio =  MathHelper.paymentModeRatio[originPaymentMode] / MathHelper.paymentModeRatio[resultPaymentMode];

        return value * ratio;
        
    }


}