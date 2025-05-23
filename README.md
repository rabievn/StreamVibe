# StreamVibe
StreamVibe is a modern streaming platform for watching movies and TV shows online, inspired by services like Netflix. It features a sleek UI, responsive design, and smooth video playback.

Feature-Sliced Design (FSD) used for architecture of this project. 

src/
│
├── app/                             # Инициализация приложения
│   ├── App.tsx                      # Основной компонент
│   ├── Login.tsx                    # Точка входа
│   ├── router/
│   │   └── routes.tsx              # Маршруты страниц
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   ├── AuthProvider.tsx
│   └── config/
│       ├── env.ts                  # Константы, переменные окружения
│       ├── i18n.ts                 # Локализация, если нужно
│
├── pages/                           # Страницы (роуты)
│   ├── HomePage/
│   │   └── Login.tsx
│   ├── MoviePage/
│   │   └── Login.tsx
│   ├── WatchPage/
│   │   └── Login.tsx
│   ├── FavoritesPage/
│   │   └── Login.tsx
│   └── NotFoundPage/
│       └── Login.tsx
│
├── widgets/                         # Крупные UI-блоки
│   ├── Header/
│   │   ├── ui/Header.tsx
│   │   └── Header.module.scss
│   ├── Sidebar/
│   │   ├── ui/Sidebar.tsx
│   │   └── Sidebar.module.scss
│   ├── VideoPlayer/
│   │   ├── ui/Player.tsx
│   │   ├── model/useVideoProgress.ts
│   │   └── Player.module.scss
│   ├── SearchBar/
│   │   └── ui/SearchBar.tsx
│   └── MovieList/
│       ├── ui/MovieList.tsx
│       └── MovieList.module.scss
│
├── features/                        # Отдельные фичи
│   ├── auth/
│   │   ├── ui/LoginForm.tsx
│   │   ├── model/useLogin.ts
│   │   └── LoginForm.module.scss
│   ├── addToFavorites/
│   │   ├── ui/AddToFavoritesButton.tsx
│   │   └── model/useAddToFavorites.ts
│   ├── switchTheme/
│   │   └── ui/ThemeToggle.tsx
│   └── playbackControls/
│       ├── ui/Controls.tsx
│       └── model/usePlayback.ts
│
├── entities/                        # Сущности (ядро бизнес-логики)
│   ├── movie/
│   │   ├── model/useMovie.ts
│   │   ├── types.ts
│   │   └── ui/MovieCard.tsx
│   ├── user/
│   │   ├── model/useUser.ts
│   │   └── ui/UserAvatar.tsx
│   ├── playlist/
│   │   ├── model/usePlaylist.ts
│   │   └── ui/PlaylistItem.tsx
│   └── genre/
│       └── ui/GenreLabel.tsx
│
├── shared/                          # Переиспользуемое
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.scss
│   │   ├── Icon/
│   │   │   └── Icon.tsx
│   │   └── Modal/
│   │       └── Modal.tsx
│   ├── hooks/                       # 🔽 Хуки (подробнее ниже)
│   │   ├── useToggle.ts
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useOutsideClick.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── usePrefetchImage.ts
│   │   ├── useScrollToTop.ts
│   │   └── useLocalStorage.ts
│   ├── utils/
│   │   ├── formatTime.ts
│   │   └── classNames.ts
│   └── api/
│       └── axiosInstance.ts
│
├── styles/                          # SCSS структура
│   ├── abstracts/
│   │   ├── _variables.scss          # Цвета, отступы, размеры и пр.
│   │   ├── _mixins.scss             # Миксины
│   │   ├── _functions.scss          # Функции SCSS
│   ├── base/
│   │   ├── _reset.scss              # Reset или Normalize
│   │   └── _typography.scss         # Базовая типографика
│   ├── layout/
│   │   ├── _header.scss
│   │   └── _footer.scss
│   ├── themes/
│   │   ├── _light.scss
│   │   └── _dark.scss
│   ├── components/                  # Стили компонентов
│   │   └── _button.scss
│   └── main.scss                    # Главный импорт всех стилей
│
└── assets/
├── icons/
├── images/
└── fonts/
