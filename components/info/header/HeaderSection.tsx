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
  definitionTitle: string;
  definitionPara: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  newsTitle,
  newsContent,
  mainTitle,
  mainSubtitle,
  backgroundColor = "bg-blue-500",
  newsBannerColor = "bg-orange-300",
  illustrationComponent,
  definitionTitle,
  definitionPara,
}) => {
  return (
    <section className={`${backgroundColor} p-8`}>
      {/* News Alert Bar */}
      <div className={`${newsBannerColor} flex flex-row p-4 rounded-lg mb-8`}>
        <div className="h-[87px] flex items-start">
          <AlertTriangle className="text-black mr-2" />
        </div>
        <div className="h-[87px] flex-col justify-start items-start gap-3 inline-flex">
          <h2 className="text-[#172b4d] text-2xl font-medium font-['Poppins'] leading-7">{newsTitle}</h2>
          <p className="h-[47px] text-[#172b4d] text-base font-normal font-['Poppins'] leading-tight">{newsContent}</p>
        </div>
        
      </div>
      {/* Hero Section */}
      <div className="flex justify-between items-start pb-8">
        <div className="h-72 flex-col justify-center items-start gap-8 inline-flex">
          <h1 className="text-white text-[64px] font-semibold font-['Poppins'] leading-[80px]">{mainTitle}</h1>
          <p className="w-[425px] text-white text-[29px] font-medium font-['Poppins'] leading-8">{mainSubtitle}</p>
        </div>
        
        <div className="w-1/2">
          {illustrationComponent}
        </div>
      </div>
      {/* Definition Section */}
      <div className={"flex-col w-full justify-start items-center gap-6 inline-flex bg-white py-16 rounded-lg"}>
        <h2 className="text-center text-black text-[29px] font-medium font-['Poppins'] leading-loose">{definitionTitle}</h2>
        <p className="w-[900px] text-center text-black text-base font-normal font-['Poppins'] leading-tight">{definitionPara}</p>
      </div>
    </section>  
  );
};