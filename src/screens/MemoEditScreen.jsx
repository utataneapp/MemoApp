import { string, shape } from 'prop-types';
import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Alert,
} from 'react-native';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyBoardSafeView';
import { translateErrors } from '../utils';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  function handlePress() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      ref.set({
        bodyText: body,
        updatedAt: new Date(),
      }, { merge: true })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          const errorMsg = translateErrors(error.code);
          Alert.alert(errorMsg.title, errorMsg.description);
        });
    }
  }
  return (
    <KeyboardSafeView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBody(text); }}
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardSafeView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },

  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 27,
  },
});
