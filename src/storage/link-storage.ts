import AsyncStorage from '@react-native-async-storage/async-storage';

const LINKS_STORAGE_KEY = 'linkManager@links';

export interface LinkStorage {
  id: string;
  name: string;
  url: string;
  category: string;
}

async function getLinks(): Promise<LinkStorage[]> {
  const links = await AsyncStorage.getItem(LINKS_STORAGE_KEY);
  return links ? JSON.parse(links) : [];
}

async function addLink(newLink: LinkStorage): Promise<void> {
  const links = await getLinks();
  links.push(newLink);
  await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(links));
}

async function removeLink(id: string) {
  const links = await getLinks();
  const newLinks = links.filter((link) => link.id !== id);
  await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(newLinks));
}

export const LinkStorage = {
  getLinks,
  addLink,
  removeLink
};