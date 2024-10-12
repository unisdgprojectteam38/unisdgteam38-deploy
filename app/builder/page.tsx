'use client';

import React, { useState } from 'react';
import InlineHeaderEditor from '@/components/builder/InlineHeaderEditor';
import { HeaderData } from '@/types/infographics';
import { Button } from '@/components/ui/Button';

const AdminHeaderCustomizationPage: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData>({
    newsTitle: 'Default News Title',
    newsContent: 'Default news content goes here.',
    mainTitle: 'DEFAULT MAIN TITLE',
    mainSubtitle: 'Default main subtitle text.',
    backgroundColor: 'bg-blue-500',
    newsBannerColor: 'bg-orange-300',
  });

  const handleHeaderUpdate = (newData: HeaderData) => {
    setHeaderData(newData);
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving header data:', headerData);
    // TODO: Implement actual save functionality
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Header Customization</h1>
      
      <div className="mb-4">
        <InlineHeaderEditor initialData={headerData} onUpdate={handleHeaderUpdate} />
      </div>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
};

export default AdminHeaderCustomizationPage;