import { PaymentRepository } from "./payment-repository";
import { Payment } from "@/domain/model/payment";
import { CreatePaymentDto, PaymentResponse, UpdatePaymentDto } from "@/domain/Dto/payment";
import sequelizeConnection  from "@/infra/database/config/database";
import { Order } from "@/domain/model/order";

export class SequelizePaymentRepository implements PaymentRepository {

    async createPayment(data: CreatePaymentDto) {
        const transaction = await sequelizeConnection.transaction();

        try{
            const order = await Order.findByPk(data.orderId);

            const payment = await Payment.create({
                transactionDate: new Date(),
                amount: order?.totalAmount || 0,
                ...data
            }, {
            transaction
            });

        await transaction.commit();

        return payment as PaymentResponse;
        }catch(error: any){
            console.log("Erro ao criar pagamento:", error);

            await transaction.rollback();

            throw error;
        }
    }

    async getAllPayments(){

        const payments = await Payment.findAll();

        if(!payments || payments.length === 0){
            return null;
        }

        return payments as PaymentResponse[]; 
    }

    async getPaymentById(id: string) {
        const payment = await Payment.findByPk(id);

        if(!payment){
            return null;
        }

        return payment as PaymentResponse;
    } 

    async updatePayment(id: string, data: UpdatePaymentDto){
        const transaction = await sequelizeConnection.transaction();

        try{
            const [updated] = await Payment.update(data, {
                where: {
                    id: id
                },
                transaction
            });

            if(updated === 0){
                await transaction.rollback();

                throw new Error("Pagamento nao encontrado");
            }

            const payment = await Payment.findByPk(id)

            await transaction.commit();

            return payment as PaymentResponse;
        }catch(error: any){
            console.log("Erro ao atualizar pagamento:", error);

            await transaction.rollback();

            throw error;
        }
    }

    async deletePayment(id: string): Promise<void> {
        const transaction = await sequelizeConnection.transaction();

        try {
            
            await Payment.destroy({
                where: {
                    id: id
                },
                transaction
            })

            await transaction.commit();
        } catch (error: any) {
            console.log("Erro ao deletar pagamento:", error);

            await transaction.rollback();

            throw error;
        }
    }


}
