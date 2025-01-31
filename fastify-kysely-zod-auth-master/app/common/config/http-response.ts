import { HandlingErrorType } from "../enum/error-types";

export interface IHandlingResponseError {
    property?: string;
    type?: HandlingErrorType;
    message?: string;
}
export { HandlingErrorType };
