import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { styles } from './styles';
import { colors } from '@/styles/colors';

import { LinkStorage } from '@/storage/link-storage';

import { Categories } from '@/components/categories';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { useState } from 'react';

export default function Add() {
  const [category, setCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  
  function handleNameChange(name: string) {
    let firstLetterUppercase = name.charAt(0).toUpperCase();
    let restOfWordLowerCase = name.slice(1).toLowerCase();
    setName(`${firstLetterUppercase}${restOfWordLowerCase}`);
  }

  function handleUrlChange(url: string) {
    setUrl(url);
  }

  async function handleAdd() {
    if (!category) {
      return Alert.alert('Categoria', 'Selecione a categoria');
    }

    if (!name.trim()) {
      return Alert.alert('Nome', 'Informe um nome');
    }

    if (!url.trim()) {
      return Alert.alert('Nome', 'Informe um nome');
    }

    try {
      await LinkStorage.addLink({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      });

      await LinkStorage.getLinks();
      Alert.alert('Sucesso', 'Novo link adicionado', [
        { text: 'Ok', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o link');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back"
            size={32}
            color={colors.gray[200]}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>
        Selecione uma cartegoria
      </Text>

      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input
          placeholder='Nome'
          autoCorrect={false}
          onChangeText={handleNameChange}
        />
        <Input
          placeholder='Url'
          autoCapitalize='none'
          onChangeText={handleUrlChange}
        />
        <Button title='Adicionar' onPress={handleAdd} />
      </View>
    </View>
  )
}