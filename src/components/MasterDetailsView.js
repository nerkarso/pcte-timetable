import MasterDetailsProvider from 'hooks/MasterDetailsContext';
import React from 'react';
import 'styles/MasterDetailsView.scss';

export default function MasterDetailsView({ masterView, detailsView }) {
  return (
    <div className="master-details-view">
      <MasterDetailsProvider>
        <div className="master-view">{masterView}</div>
        <div className="details-view">{detailsView}</div>
      </MasterDetailsProvider>
    </div>
  );
}
