import { View, Modal } from "react-native";
import React from "react";
import styles from "./styles";

type props = {
  visible: boolean;
  children: any;
  onClose: any;
};

const CustomModal = ({ visible, children, onClose }: props) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.box}>{children}</View>
      </View>
    </Modal>
  );
};

export default CustomModal;
