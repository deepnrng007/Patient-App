import { View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import AppButton from "../appButton";
import AppText from "../appText";
// import { ArrowDownIcon } from "../../../utils/imagePaths";
import { FlatList } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import Underline from "../underline";
import { themes } from "../../../enums";
import { ArrowDownIcon } from "../../../utils/imagePaths";

type props = {
  onSelect: any;
  styleContainer?: ViewStyle;
  listStyle?: ViewStyle;
  value?: string;
  enabled?: boolean;
};

const contryCodes = ["+1", "+2", "+91"];

const CountryCodeSelector = ({
  onSelect,
  styleContainer,
  listStyle,
  value,
  enabled,
}: props) => {
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(
    value ? value : contryCodes[0]
  );

  const openMenu = () => setVisible(!visible);

  useEffect(() => onSelect(selectedItem), []);

  const onSelectItem = (item: string) => {
    setVisible(false);
    onSelect(item);
    setSelectedItem(item);
  };

  const renderItems = ({ item }: any) => {
    return (
      <AppButton
        onPress={() => onSelectItem(item)}
        style={[styles.item, listStyle] as ViewStyle}
      >
        <AppText style={styles.itemLabel}>{item}</AppText>
      </AppButton>
    );
  };

  return (
    <View>
      <View>
        <AppButton
          onPress={enabled ? openMenu : () => {}}
          style={
            [
              styles.countryCode,
              styleContainer,
              !enabled && { backgroundColor: themes.LightGray8 },
            ] as ViewStyle
          }
        >
          <AppText
            style={[styles.codeLabel, !enabled && { color: themes.LightGray9 }]}
          >
            {selectedItem}
          </AppText>
          <ArrowDownIcon stroke={!enabled ? themes.LightGray9 : themes.Black} />
        </AppButton>
      </View>
      {visible && (
        <View style={styles.flatListContainer}>
          <FlatList
            bounces={false}
            contentContainerStyle={{
              borderRadius: 10,
              backgroundColor: themes.White,
            }}
            ItemSeparatorComponent={() => <Underline />}
            data={contryCodes}
            renderItem={renderItems}
          />
        </View>
      )}
    </View>
  );
};

export default CountryCodeSelector;
