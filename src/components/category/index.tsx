import { Text, Pressable, PressableProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '@/styles/colors';
import { styles } from './styles';

interface CategoryProps extends PressableProps {
  name: string;
  isSelected?: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export function Category({
  name,
  icon,
  isSelected = false,
  ...rest
}: CategoryProps) {
  const color = isSelected ? colors.green[300] : colors.gray[400];
  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons
        size={16}
        name={icon}
        color={color} 
      />
      <Text style={{...styles.name, color }}>
        {name}
      </Text>
    </Pressable>
  );
}