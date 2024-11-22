import { FlatList } from "react-native";

import { styles } from './styles';

import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

interface CategoriesProps {
  selected: string;
  onChange: (category: string) => void;
}

export function Categories({ selected, onChange }: CategoriesProps) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          onPress={() => onChange(item.name)}
          isSelected={item.name === selected}
          {...item}
        />
      )}
    />
  );
}