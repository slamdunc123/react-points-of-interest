/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Map } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MapUpdateFormInputValues = {
    name?: string;
    description?: string;
    zoom?: number;
    adminGroup?: string;
};
export declare type MapUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    zoom?: ValidationFunction<number>;
    adminGroup?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MapUpdateFormOverridesProps = {
    MapUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    zoom?: PrimitiveOverrideProps<TextFieldProps>;
    adminGroup?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MapUpdateFormProps = React.PropsWithChildren<{
    overrides?: MapUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    map?: Map;
    onSubmit?: (fields: MapUpdateFormInputValues) => MapUpdateFormInputValues;
    onSuccess?: (fields: MapUpdateFormInputValues) => void;
    onError?: (fields: MapUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MapUpdateFormInputValues) => MapUpdateFormInputValues;
    onValidate?: MapUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MapUpdateForm(props: MapUpdateFormProps): React.ReactElement;
