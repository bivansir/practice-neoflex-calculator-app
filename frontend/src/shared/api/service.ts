import { type LoanOfferDTO, type LoanStatementRequestDTO } from "./dto";
import { httpClient } from "./apiClient";
import { DEAL } from "./endpoints";


export const dealService = {
    statement: async (request: LoanStatementRequestDTO): Promise<Array<LoanOfferDTO>> => {
        const { data } = await httpClient.post<Array<LoanOfferDTO>>(DEAL.STATEMENT, request);
        return data
    },

    select: async (request: LoanOfferDTO): Promise<void> => {
        await httpClient.post<LoanOfferDTO>(DEAL.SELECT, request);
    }
}