import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { themes } from "../../../enums";
import { constants } from "../../../enums/constants";

import {
  PasswordInSecureIcon,
  PasswordSecureIcon,
} from "../../../utils/imagePaths";
import logger from "../../../utils/logger";
import { getDateDiff, getDateDiffFromToday } from "../../../utils/utils";
import { isValidEmail } from "../../../utils/validations";
import { styles } from "./styles";
import { TextFieldProps } from "./types";

const TextField = ({
  title,
  hintText,
  onChange,
  keyboardType = "default",
  value,
  isPassword = false,
  showTooltip,
  editable = true,
  Icon,
  style,
}: TextFieldProps) => {
  const [obj, setobj] = useState({ hasError: false, errorText: "" });

  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkError = (value: string, title: string) => {
    logger.log(title);
    logger.log(value.length);
    if (value === null) {
      return;
    }
    if (title === constants.DOB) {
      if (
        parseInt(value.substring(0, 2)) > 12 ||
        parseInt(value.substring(3, 5)) > 31 ||
        getDateDiffFromToday(value) < 0 ||
        value.length < 10
      ) {
        return setobj({
          hasError: true,
          errorText: `Please enter a valid date`,
        });
      }
    } else if (title === constants.EMAIL && !isValidEmail(value)) {
      return setobj({ hasError: true, errorText: `Enter valid Email` });
    } else if (title === constants.MOBILE && value.length < 12) {
      return setobj({ hasError: true, errorText: `Enter Valid Phone No.` });
    } else if (
      (title === constants.FIRSTNAME || title === constants.LASTNAME) &&
      value.length == 0
    ) {
      return setobj({ hasError: true, errorText: `${title} is Mandatory` });
    } else if (title === constants.PASSWORD && value.length < 8) {
      return setobj({ hasError: true, errorText: `Enter valid Password` });
    }

    return setobj({ hasError: false, errorText: "" });
  };

  return (
    <View style={[{ marginTop: 16 }, style]}>
      <View style={styles.titleView}>
        {title !== constants.MOBILE && (
          <Text style={styles.titleStyle}>{title}</Text>
        )}
      </View>
      {keyboardType === "number-pad" || keyboardType === "phone-pad" ? (
        <TextInputMask
          editable={editable}
          placeholder={hintText}
          style={[
            styles.textfieldView,
            !editable && {
              color: themes.LightGray9,
              backgroundColor: themes.LightGray8,
            },
          ]}
          type={keyboardType === "number-pad" ? "datetime" : "custom"}
          options={
            keyboardType === "number-pad"
              ? { format: "MM/DD/YYYY" }
              : {
                  mask: "999 999 9999",
                }
          }
          value={value}
          onChangeText={(newText) => {
            return onChange(newText);
          }}
          onFocus={() => {
            showTooltip();
          }}
          onEndEditing={() => {
            checkError(value, title);
          }}
          onPressOut={() => {}}
          keyboardType={keyboardType}
        />
      ) : (
        <View
          style={[
            styles.textfieldView,
            !editable && {
              backgroundColor: themes.LightGray8,
            },
          ]}
        >
          {Icon && (
            <View style={styles.keyIcon}>
              <Icon />
            </View>
          )}
          <TextInput
            editable={editable}
            style={[styles.input, !editable && { color: themes.LightGray9 }]}
            numberOfLines={1}
            placeholder={hintText}
            value={value}
            onChangeText={(newText) => {
              return onChange(newText);
            }}
            keyboardType={keyboardType}
            secureTextEntry={isPassword && !showPassword}
            onFocus={() => {
              if (showTooltip != null) showTooltip();
            }}
            onEndEditing={() => {
              checkError(value, title);
            }}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={onShowPassword}
              style={{ justifyContent: "center" }}
            >
              {showPassword ? <PasswordInSecureIcon /> : <PasswordSecureIcon />}
            </TouchableOpacity>
          )}
        </View>
      )}
      {obj.hasError ? <Text style={styles.error}>{obj.errorText}</Text> : null}
    </View>
  );
};

export default TextField;
