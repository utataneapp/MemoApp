import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { string } from 'prop-types';

export default function HelloHello(props) {
  const { children, label } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>
        {`${label}${children}`}
      </Text>
    </View>
  );
}

HelloHello.propTypes = {
  children: string,
  label: string.isRequired,
};

HelloHello.defaultProps = {
  children: null,
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'blue',
    flex: 1,

  },

  helloText: {
    fontSize: 28,
    marginVertical: 56,
    marginHorizontal: 56,
    backgroundColor: 'gray',
    lineHeight: 128,
  },
});
