
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Button from './Button';

interface UserInputProps {
  onSubmit: (userId: string) => void;
  loading?: boolean;
}

export default function UserInput({ onSubmit, loading }: UserInputProps) {
  const [userId, setUserId] = useState('');

  const handleSubmit = () => {
    console.log('Submitting user ID:', userId);
    if (userId.trim()) {
      onSubmit(userId.trim());
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[commonStyles.input, styles.input]}
        placeholder="Enter Discord User ID or Username"
        placeholderTextColor={colors.grey}
        value={userId}
        onChangeText={setUserId}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button
        text={loading ? "Checking..." : "Check Status"}
        onPress={handleSubmit}
        style={[
          styles.button,
          loading && styles.buttonDisabled
        ]}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    backgroundColor: colors.primary,
    marginTop: 0,
  },
  buttonDisabled: {
    backgroundColor: colors.grey,
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
