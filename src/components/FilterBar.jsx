import React from 'react';
import { FiSliders, FiGrid, FiSquare, FiColumns } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const colorOptions = [
  { value: '', label: 'allColors' },
  { value: 'red', hex: '#e74c3c' },
  { value: 'orange', hex: '#e67e22' },
  { value: 'yellow', hex: '#f1c40f' },
  { value: 'green', hex: '#2ecc71' },
  { value: 'turquoise', hex: '#1abc9c' },
  { value: 'blue', hex: '#3498db' },
  { value: 'pink', hex: '#e91e8d' },
  { value: 'white', hex: '#ecf0f1' },
  { value: 'gray', hex: '#95a5a6' },
  { value: 'black', hex: '#2c3e50' },
];

const orientationOptions = [
  { value: '', label: 'allOrientations' },
  { value: 'horizontal', label: 'landscape' },
  { value: 'vertical', label: 'portrait' },
  { value: 'square', label: 'square' },
];

const sortOptions = [
  { value: 'popular', label: 'popular' },
  { value: 'latest', label: 'latest' },
];

const gridSizes = [
  { value: 'compact', icon: <FiGrid />, label: 'compact' },
  { value: 'comfortable', icon: <FiColumns />, label: 'comfortable' },
  { value: 'spacious', icon: <FiSquare />, label: 'spacious' },
];

const FilterBar = ({ filters, onFilterChange, gridSize, onGridSizeChange }) => {
  const { t } = useLang();

  return (
    <div className="filter-bar">
      <div className="filter-bar-inner">
        <div className="filter-bar-left">
          <div className="filter-bar-label">
            <FiSliders />
            <span>{t.filtersLabel}</span>
          </div>

          {/* Color Filter */}
          <div className="filter-group">
            <span className="filter-group-label">{t.colorFilter}</span>
            <div className="color-palette">
              {colorOptions.map((color) => (
                <button
                  key={color.value || 'all'}
                  className={`color-swatch ${filters.color === color.value ? 'active' : ''} ${color.value === '' ? 'all-swatch' : ''}`}
                  style={color.hex ? { '--swatch-color': color.hex } : {}}
                  onClick={() => onFilterChange('color', color.value)}
                  title={color.value ? t.colors[color.value] : t.allColors}
                >
                  {color.value === '' && <span>{t.allColors}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Orientation Filter */}
          <div className="filter-group">
            <span className="filter-group-label">{t.orientationFilter}</span>
            <div className="filter-options">
              {orientationOptions.map((opt) => (
                <button
                  key={opt.value || 'all'}
                  className={`filter-option ${filters.orientation === opt.value ? 'active' : ''}`}
                  onClick={() => onFilterChange('orientation', opt.value)}
                >
                  {t[opt.label]}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div className="filter-group">
            <span className="filter-group-label">{t.sortBy}</span>
            <div className="filter-options">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`filter-option ${filters.order === opt.value ? 'active' : ''}`}
                  onClick={() => onFilterChange('order', opt.value)}
                >
                  {t[opt.label]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Size */}
        <div className="filter-group grid-toggle-group">
          <div className="grid-toggle">
            {gridSizes.map((size) => (
              <button
                key={size.value}
                className={`grid-toggle-btn ${gridSize === size.value ? 'active' : ''}`}
                onClick={() => onGridSizeChange(size.value)}
                title={t[size.label]}
              >
                {size.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
