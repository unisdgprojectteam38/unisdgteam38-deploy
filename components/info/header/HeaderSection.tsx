import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface HeaderSectionProps {
  newsTitle: string;
  newsContent: string;
  mainTitle: string;
  mainSubtitle: string;
  backgroundColor?: string;
  newsBannerColor?: string;
  illustrationComponent?: React.ReactNode;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  newsTitle,
  newsContent,
  mainTitle,
  mainSubtitle,
  backgroundColor = "bg-blue-500",
  newsBannerColor = "bg-orange-300",
  illustrationComponent,
}) => {
  return (
    <section className={`${backgroundColor} p-8`}>
      <div className={`${newsBannerColor} p-4 rounded-lg mb-8`}>
        <div className="flex items-center">
          <AlertTriangle className="text-black mr-2" />
          <h2 className="font-bold">{newsTitle}</h2>
        </div>
        <p className="text-sm mt-2">{newsContent}</p>
      </div>
      
      <div className="flex justify-between items-start">
        <div className="text-white max-w-2xl">
          <h1 className="text-6xl font-bold mb-4">{mainTitle}</h1>
          <p className="text-xl">{mainSubtitle}</p>
        </div>
        
        <div className="w-1/2">
          {illustrationComponent}
        </div>
      </div>
    </section>  
  );
};