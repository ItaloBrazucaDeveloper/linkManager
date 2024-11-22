import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';

import { colors } from '@/styles/colors';
import { styles } from './styles';

import { Categories } from '@/components/categories';
import { Link } from '@/components/link';
import { Option } from '@/components/option';

import { categories } from '@/utils/categories';
import { LinkStorage } from '@/storage/link-storage';

export default function Index() {
  const [category, setCategory] = useState<string>(categories[0].name);
  const [links, setLinks] = useState<LinkStorage[]>([] as LinkStorage[]);
  const [selectedLink, setSelectedLink] = useState<LinkStorage>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function handleDetails(selected: LinkStorage) {
    setModalOpen(!modalOpen);
    setSelectedLink(selected);
  }

  async function getLinks() {
    const links = await LinkStorage.getLinks();
    const linksFiltered = links?.filter((link) => link.category === category) ?? [];
    return linksFiltered;
  }

  async function linkRemove() {
    try {
      await LinkStorage.removeLink(selectedLink!.id);
      setModalOpen(false);
      getLinks().then(() => setLinks(links));
    } catch(error) {
      Alert.alert('Erro', 'Não foi possível excluir');
    }
  }

  function handleRemove() {
    Alert.alert('Excluir', 'Deseja realmente excluir?', [
      { style: 'cancel', text: 'Não' },
      { text: 'Sim', onPress: linkRemove }
    ])
  }

  async function handleOpenLink() {
    try {
      const canOpen = await Linking.canOpenURL(selectedLink!.url);
      if (canOpen) {
        await Linking.openURL(selectedLink!.url);
        setModalOpen(false);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o link');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o link');
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLinks().then((link) => {
        setLinks(link);
      });
    }, [category])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => router.navigate('/add')}>
          <MaterialIcons
            name="add"
            size={32}
            color={colors.green[300]}
          />
        </TouchableOpacity>
      </View>
      
      <Categories onChange={setCategory} selected={category} />
      
      <FlatList
        style={styles.links}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentLinks}
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item: link }) =>
          <Link
            name={link.name}
            url={link.url}
            onDetails={() => handleDetails(link)}
          />
        }
      />

      <Modal transparent visible={modalOpen} animationType='slide'>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>
                {selectedLink?.category}
              </Text>
              <TouchableOpacity>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                  onPress={() => setModalOpen(!modalOpen)}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>
              {selectedLink?.name}
            </Text>
            <Text style={styles.modalLinkUrl}>
              {selectedLink?.url}
            </Text>

            <View style={styles.modalFooter}>
              <Option
                name='Excluir'
                icon='delete'
                variant='secondary'
                onPress={handleRemove}
              />
              <Option
                name='Abrir'
                icon='language'
                onPress={handleOpenLink}
              />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}