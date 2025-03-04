/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getMap } from "../graphql/queries";
import { updateMap } from "../graphql/mutations";
export default function MapUpdateForm(props) {
  const {
    id: idProp,
    map: mapModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    description: "",
    zoom: "",
    adminGroup: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [zoom, setZoom] = React.useState(initialValues.zoom);
  const [adminGroup, setAdminGroup] = React.useState(initialValues.adminGroup);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = mapRecord
      ? { ...initialValues, ...mapRecord }
      : initialValues;
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setZoom(cleanValues.zoom);
    setAdminGroup(cleanValues.adminGroup);
    setErrors({});
  };
  const [mapRecord, setMapRecord] = React.useState(mapModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getMap.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMap
        : mapModelProp;
      setMapRecord(record);
    };
    queryData();
  }, [idProp, mapModelProp]);
  React.useEffect(resetStateValues, [mapRecord]);
  const validations = {
    name: [{ type: "Required" }],
    description: [],
    zoom: [{ type: "Required" }],
    adminGroup: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          description: description ?? null,
          zoom,
          adminGroup,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateMap.replaceAll("__typename", ""),
            variables: {
              input: {
                id: mapRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MapUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              description,
              zoom,
              adminGroup,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description: value,
              zoom,
              adminGroup,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Zoom"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={zoom}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              zoom: value,
              adminGroup,
            };
            const result = onChange(modelFields);
            value = result?.zoom ?? value;
          }
          if (errors.zoom?.hasError) {
            runValidationTasks("zoom", value);
          }
          setZoom(value);
        }}
        onBlur={() => runValidationTasks("zoom", zoom)}
        errorMessage={errors.zoom?.errorMessage}
        hasError={errors.zoom?.hasError}
        {...getOverrideProps(overrides, "zoom")}
      ></TextField>
      <TextField
        label="Admin group"
        isRequired={true}
        isReadOnly={false}
        value={adminGroup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              zoom,
              adminGroup: value,
            };
            const result = onChange(modelFields);
            value = result?.adminGroup ?? value;
          }
          if (errors.adminGroup?.hasError) {
            runValidationTasks("adminGroup", value);
          }
          setAdminGroup(value);
        }}
        onBlur={() => runValidationTasks("adminGroup", adminGroup)}
        errorMessage={errors.adminGroup?.errorMessage}
        hasError={errors.adminGroup?.hasError}
        {...getOverrideProps(overrides, "adminGroup")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || mapModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || mapModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
