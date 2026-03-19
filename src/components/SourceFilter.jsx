import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const sourceColors = {
  Free: '#2ecc71',
  Unsplash: '#e74c3c',
  Pexels: '#3498db',
};

const SourceFilter = ({ availableSources, activeSources, onToggleSource, totalResults }) => {
  const { t } = useLang();

  if (availableSources.length <= 1) return null;

  return (
    <div className="source-filter">
      <div className="source-filter-inner">
        <span className="filter-label">{t.sourcesLabel}</span>
        <div className="filter-chips">
          {availableSources.map((source) => {
            const isActive = activeSources.includes(source);
            return (
              <button
                key={source}
                className={`filter-chip ${isActive ? 'active' : ''}`}
                onClick={() => onToggleSource(source)}
                style={{ '--chip-color': sourceColors[source] }}
              >
                {isActive && <FiCheck className="chip-check" />}
                <span>{source}</span>
              </button>
            );
          })}
        </div>
        {totalResults > 0 && (
          <span className="results-count">{t.resultsCount(totalResults)}</span>
        )}
      </div>
    </div>
  );
};

export default SourceFilter;
