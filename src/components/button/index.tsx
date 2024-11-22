import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title = 'click me!', ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}