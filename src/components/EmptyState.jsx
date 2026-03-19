import React from 'react';
import { FiCamera, FiSearch, FiAlertCircle } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const EmptyState = ({ type = 'initial', query = '' }) => {
  const { t } = useLang();

  const states = {
    initial: {
      icon: <FiCamera />,
      title: t.initialTitle,
      description: t.initialDesc,
    },
    noResults: {
      icon: <FiSearch />,
      title: t.noResultsTitle,
      description: t.noResultsDesc(query),
    },
    error: {
      icon: <FiAlertCircle />,
      title: t.errorTitle,
      description: t.errorDesc,
    },
  };

  const state = states[type];

  return (
    <div className="empty-state">
      <div className="empty-icon">{state.icon}</div>
      <h2 className="empty-title">{state.title}</h2>
      <p className="empty-description">{state.description}</p>
    </div>
  );
};

export default EmptyState;
