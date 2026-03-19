const translations = {
  en: {
    // Header
    logoText: 'ImageFinder',
    logoBadge: 'Pro',

    // Search
    heroTitle: 'Discover Stunning Images',
    heroSubtitle: 'Search millions of free, high-quality photos from multiple sources',
    searchPlaceholder: 'Search for images... (Press "/" to focus)',
    searchBtn: 'Search',

    // Trending
    trendingLabel: 'Trending:',
    trendingTags: ['Nature', 'Ocean', 'Mountains', 'City', 'Food', 'Animals', 'Architecture', 'Travel', 'Flowers', 'Space', 'Abstract', 'Technology'],

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

    // Image card
    viewFullSize: 'View full size',
    download: 'Download',
    viewOnSource: 'View on source',

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

    // Load more
    loadMore: 'Load More Images',
    loading: 'Loading...',

    // Footer
    madeWith: 'Made with',
    by: 'by ImageFinder Pro',
    poweredBy: (sources) => `Powered by ${sources}`,
    disclaimer: 'All images are provided by their respective sources and are subject to their licenses.',

    // Toasts
    noImagesFound: 'No images found. Try different keywords.',
    errorFetching: 'Error fetching images. Please try again.',
    errorLoadMore: 'Error loading more images.',
    downloadSuccess: 'Image downloaded successfully!',
    downloadFallback: 'Opening image in new tab for download.',
    searchAcross: 'Searching across image sources...',

    // Theme
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
  },

  az: {
    // Header
    logoText: 'ImageFinder',
    logoBadge: 'Pro',

    // Search
    heroTitle: 'Möhtəşəm Şəkillər Kəşf Edin',
    heroSubtitle: 'Bir neçə mənbədən milyonlarla pulsuz, yüksək keyfiyyətli şəkil axtarın',
    searchPlaceholder: 'Şəkil axtar... ("/" düyməsi ilə fokusla)',
    searchBtn: 'Axtar',

    // Trending
    trendingLabel: 'Populyar:',
    trendingTags: ['Təbiət', 'Okean', 'Dağlar', 'Şəhər', 'Yemək', 'Heyvanlar', 'Memarlıq', 'Səyahət', 'Güllər', 'Kosmos', 'Abstrakt', 'Texnologiya'],

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

    // Image card
    viewFullSize: 'Tam ölçüdə bax',
    download: 'Yüklə',
    viewOnSource: 'Mənbədə bax',

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

    // Theme
    switchToLight: 'Açıq rejimə keç',
    switchToDark: 'Qaranlıq rejimə keç',
  },
};

export default translations;
