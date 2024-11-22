import { StyleSheet } from 'react-native';

import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 24,
    color: colors.gray[200],
  },
  label: {
    color: colors.gray[400],
    fontSize: 14,
    marginHorizontal: 24,
  },
  form: {
    padding: 24,
    gap: 16,
  }
});