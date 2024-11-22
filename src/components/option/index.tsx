import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { colors } from '@/styles/colors';
import { MaterialIcons } from '@expo/vector-icons';

interface OptionProps extends TouchableOpacityProps {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  variant?: 'primary' | 'secondary';
}

export function Option({
  name,
  icon,
  variant = 'primary',
  ...rest
}: OptionProps) {
  const isVariantPrimary = variant === 'primary';
  const colorIcon = isVariantPrimary ? colors.green[300] : colors.gray[400];
  const styleText = isVariantPrimary ? styles.primaryTitle : styles.secondaryTitle;
  
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <MaterialIcons
        size={20}
        name={icon}
        color={colorIcon}
      />
      <Text style={styleText}>{name}</Text>
    </TouchableOpacity>
  );
}