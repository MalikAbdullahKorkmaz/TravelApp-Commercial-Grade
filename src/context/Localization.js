
// src/context/Localization.js
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  en: {
    home: "Home",
    explore: "Explore",
    favorites: "Favorites",
    profile: "Profile",
    popular: "Popular Destinations",
    seeAll: "See All",
    price: "Price",
    rating: "Rating",
    country: "Country",
    description: "Description",
    changeLanguage: "Change Language",
    selectLanguage: "Select Language",
  },
  tr: {
    home: "Ana Sayfa",
    explore: "Keşfet",
    favorites: "Favoriler",
    profile: "Profil",
    popular: "Popüler Destinasyonlar",
    seeAll: "Hepsini Gör",
    price: "Fiyat",
    rating: "Puan",
    country: "Ülke",
    description: "Açıklama",
    changeLanguage: "Dil Değiştir",
    selectLanguage: "Dil Seç",
  },
  es: {
    home: "Inicio",
    explore: "Explorar",
    favorites: "Favoritos",
    profile: "Perfil",
    popular: "Destinos Populares",
    seeAll: "Ver Todo",
    price: "Precio",
    rating: "Calificación",
    country: "País",
    description: "Descripción",
    changeLanguage: "Cambiar Idioma",
    selectLanguage: "Seleccionar Idioma",
  },
  id: {
    home: "Beranda",
    explore: "Jelajah",
    favorites: "Favorit",
    profile: "Profil",
    popular: "Destinasi Populer",
    seeAll: "Lihat Semua",
    price: "Harga",
    rating: "Rating",
    country: "Negara",
    description: "Deskripsi",
    changeLanguage: "Ganti Bahasa",
    selectLanguage: "Pilih Bahasa",
  },
  zh: {
    home: "首页",
    explore: "探索",
    favorites: "收藏",
    profile: "我的",
    popular: "热门目的地",
    seeAll: "查看全部",
    price: "价格",
    rating: "评分",
    country: "国家",
    description: "描述",
    changeLanguage: "切换语言",
    selectLanguage: "选择语言",
  },
};

const LanguageContext = createContext({ lang: "en", setLang: () => {}, t: (k)=>k });

export const LocalizationProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("@lang");
      if (saved) setLang(saved);
    })();
  }, []);

  const update = async (l) => {
    setLang(l);
    await AsyncStorage.setItem("@lang", l);
  };

  const t = (key) => translations[lang]?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang: update, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useI18n = () => useContext(LanguageContext);
