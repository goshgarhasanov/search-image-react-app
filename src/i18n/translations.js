const translations = {
  en: {
    // Header
    logoText: 'FotoRoom',
    logoBadge: '.Az',
    favorites: 'Favorites',
    favoritesCount: (n) => `${n}`,

    // Search
    heroTitle: 'Discover Stunning Images',
    heroSubtitle: 'Search millions of free, high-quality photos from multiple sources',
    searchPlaceholder: 'Search for images... (Press "/" to focus)',
    searchBtn: 'Search',

    // Search History
    recentSearches: 'Recent Searches',
    clearHistory: 'Clear',

    // Trending
    trendingLabel: 'Trending:',
    trendingTags: ['Nature', 'Ocean', 'Mountains', 'City', 'Food', 'Animals', 'Architecture', 'Travel', 'Flowers', 'Space', 'Abstract', 'Technology'],

    // Filters
    filtersLabel: 'Filters',
    colorFilter: 'Color',
    orientationFilter: 'Orientation',
    sortBy: 'Sort by',
    allColors: 'All',
    allOrientations: 'All',
    landscape: 'Landscape',
    portrait: 'Portrait',
    square: 'Square',
    popular: 'Popular',
    latest: 'Latest',
    gridSize: 'Grid size',
    compact: 'Compact',
    comfortable: 'Comfortable',
    spacious: 'Spacious',

    // Color names
    colors: {
      red: 'Red',
      orange: 'Orange',
      yellow: 'Yellow',
      green: 'Green',
      turquoise: 'Turquoise',
      blue: 'Blue',
      pink: 'Pink',
      white: 'White',
      gray: 'Gray',
      black: 'Black',
    },

    // Source filter
    sourcesLabel: 'Sources:',
    resultsCount: (n) => `${n.toLocaleString()} results`,

    // Empty states
    initialTitle: 'Start Your Search',
    initialDesc: 'Type something in the search bar to discover amazing images from multiple sources.',
    noResultsTitle: 'No Results Found',
    noResultsDesc: (q) => `We couldn't find any images matching "${q}". Try different keywords or check your spelling.`,
    errorTitle: 'Something Went Wrong',
    errorDesc: 'We had trouble fetching images. Please check your connection and try again.',
    favoritesEmptyTitle: 'No Favorites Yet',
    favoritesEmptyDesc: 'Click the heart icon on any image to save it to your favorites.',

    // Image card
    viewFullSize: 'View full size',
    download: 'Download',
    viewOnSource: 'View on source',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    copyLink: 'Copy link',

    // Modal
    likes: 'Likes',
    views: 'Views',
    downloads: 'Downloads',
    resolution: 'Resolution',
    tagsLabel: 'Tags:',
    downloadTitle: 'Download',
    medium: 'Medium',
    mediumDesc: 'Web optimized',
    large: 'Large',
    largeDesc: 'High quality',
    original: 'Original',
    originalDesc: 'Full resolution',
    downloading: 'Downloading...',
    viewOn: (source) => `View on ${source}`,
    share: 'Share',

    // Load more
    loadMore: 'Load More Images',
    loading: 'Loading...',

    // Footer
    madeWith: 'Made with',
    by: 'by FotoRoom.Az',
    poweredBy: (sources) => `Powered by ${sources}`,
    disclaimer: 'All images are provided by their respective sources and are subject to their licenses.',

    // Toasts
    noImagesFound: 'No images found. Try different keywords.',
    errorFetching: 'Error fetching images. Please try again.',
    errorLoadMore: 'Error loading more images.',
    downloadSuccess: 'Image downloaded successfully!',
    downloadFallback: 'Opening image in new tab for download.',
    searchAcross: 'Searching across image sources...',
    copiedToClipboard: 'Link copied to clipboard!',
    addedToFavorites: 'Added to favorites!',
    removedFromFavorites: 'Removed from favorites.',

    // Theme
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',

    // Favorites view
    backToSearch: 'Back to Search',
    yourFavorites: 'Your Favorites',
    favoritesSubtitle: (n) => `${n} saved image${n !== 1 ? 's' : ''}`,
  },

  az: {
    // Header
    logoText: 'FotoRoom',
    logoBadge: '.Az',
    favorites: 'Sevimlilər',
    favoritesCount: (n) => `${n}`,

    // Search
    heroTitle: 'Möhtəşəm Şəkillər Kəşf Edin',
    heroSubtitle: 'Bir neçə mənbədən milyonlarla pulsuz, yüksək keyfiyyətli şəkil axtarın',
    searchPlaceholder: 'Şəkil axtar... ("/" düyməsi ilə fokusla)',
    searchBtn: 'Axtar',

    // Search History
    recentSearches: 'Son Axtarışlar',
    clearHistory: 'Təmizlə',

    // Trending
    trendingLabel: 'Populyar:',
    trendingTags: ['Təbiət', 'Okean', 'Dağlar', 'Şəhər', 'Yemək', 'Heyvanlar', 'Memarlıq', 'Səyahət', 'Güllər', 'Kosmos', 'Abstrakt', 'Texnologiya'],

    // Filters
    filtersLabel: 'Filtrlər',
    colorFilter: 'Rəng',
    orientationFilter: 'İstiqamət',
    sortBy: 'Sırala',
    allColors: 'Hamısı',
    allOrientations: 'Hamısı',
    landscape: 'Landşaft',
    portrait: 'Portret',
    square: 'Kvadrat',
    popular: 'Populyar',
    latest: 'Ən yeni',
    gridSize: 'Şəbəkə ölçüsü',
    compact: 'Sıx',
    comfortable: 'Rahat',
    spacious: 'Geniş',

    // Color names
    colors: {
      red: 'Qırmızı',
      orange: 'Narıncı',
      yellow: 'Sarı',
      green: 'Yaşıl',
      turquoise: 'Firuzəyi',
      blue: 'Mavi',
      pink: 'Çəhrayı',
      white: 'Ağ',
      gray: 'Boz',
      black: 'Qara',
    },

    // Source filter
    sourcesLabel: 'Mənbələr:',
    resultsCount: (n) => `${n.toLocaleString()} nəticə`,

    // Empty states
    initialTitle: 'Axtarışa Başlayın',
    initialDesc: 'Bir neçə mənbədən möhtəşəm şəkillər tapmaq üçün axtarış çubuğuna nəsə yazın.',
    noResultsTitle: 'Nəticə Tapılmadı',
    noResultsDesc: (q) => `"${q}" ilə uyğun şəkil tapılmadı. Fərqli açar sözlər sınayın.`,
    errorTitle: 'Xəta Baş Verdi',
    errorDesc: 'Şəkilləri yükləyərkən problem yarandı. İnternet bağlantınızı yoxlayıb yenidən cəhd edin.',
    favoritesEmptyTitle: 'Hələ Sevimli Yoxdur',
    favoritesEmptyDesc: 'Sevimlilərə əlavə etmək üçün istənilən şəklin üzərindəki ürək ikonuna klikləyin.',

    // Image card
    viewFullSize: 'Tam ölçüdə bax',
    download: 'Yüklə',
    viewOnSource: 'Mənbədə bax',
    addToFavorites: 'Sevimlilərə əlavə et',
    removeFromFavorites: 'Sevimlilərdən çıxar',
    copyLink: 'Linki kopyala',

    // Modal
    likes: 'Bəyənmə',
    views: 'Baxış',
    downloads: 'Yükləmə',
    resolution: 'Ölçü',
    tagsLabel: 'Etiketlər:',
    downloadTitle: 'Yüklə',
    medium: 'Orta',
    mediumDesc: 'Veb üçün optimallaşdırılmış',
    large: 'Böyük',
    largeDesc: 'Yüksək keyfiyyət',
    original: 'Orijinal',
    originalDesc: 'Tam ölçü',
    downloading: 'Yüklənir...',
    viewOn: (source) => `${source}-da bax`,
    share: 'Paylaş',

    // Load more
    loadMore: 'Daha Çox Şəkil Yüklə',
    loading: 'Yüklənir...',

    // Footer
    madeWith: 'Sevgi ilə hazırlandı',
    by: 'ImageFinder Pro',
    poweredBy: (sources) => `${sources} tərəfindən dəstəklənir`,
    disclaimer: 'Bütün şəkillər müvafiq mənbələr tərəfindən təqdim edilir və onların lisenziyalarına tabedir.',

    // Toasts
    noImagesFound: 'Şəkil tapılmadı. Fərqli açar sözlər sınayın.',
    errorFetching: 'Şəkilləri yükləyərkən xəta. Yenidən cəhd edin.',
    errorLoadMore: 'Daha çox şəkil yükləyərkən xəta.',
    downloadSuccess: 'Şəkil uğurla yükləndi!',
    downloadFallback: 'Yükləmək üçün yeni tabda açılır.',
    searchAcross: 'Şəkil mənbələrində axtarılır...',
    copiedToClipboard: 'Link buferə kopyalandı!',
    addedToFavorites: 'Sevimlilərə əlavə edildi!',
    removedFromFavorites: 'Sevimlilərdən çıxarıldı.',

    // Theme
    switchToLight: 'Açıq rejimə keç',
    switchToDark: 'Qaranlıq rejimə keç',

    // Favorites view
    backToSearch: 'Axtarışa Qayıt',
    yourFavorites: 'Sevimliləriniz',
    favoritesSubtitle: (n) => `${n} saxlanmış şəkil`,
  },
};

export default translations;
