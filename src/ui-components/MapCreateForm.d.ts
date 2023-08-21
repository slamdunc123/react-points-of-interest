/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MapCreateFormInputValues = {
    name?: string;
    description?: string;
    zoom?: number;
};
export declare type MapCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    zoom?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MapCreateFormOverridesProps = {
    MapCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    zoom?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MapCreateFormProps = React.PropsWithChildren<{
    overrides?: MapCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MapCreateFormInputValues) => MapCreateFormInputValues;
    onSuccess?: (fields: MapCreateFormInputValues) => void;
    onError?: (fields: MapCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MapCreateFormInputValues) => MapCreateFormInputValues;
    onValidate?: MapCreateFormValidationValues;
} & React.CSSProperties>;
export default function MapCreateForm(props: MapCreateFormProps): React.ReactElement;