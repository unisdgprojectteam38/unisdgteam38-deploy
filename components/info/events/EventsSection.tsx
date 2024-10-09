import React from 'react';
import EventsCard from './EventsCard';
import { title } from 'process';

interface EventsSectionProps {
  title: string;
  description: string;
  events: Event[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  title,
  description,
  events
}) => {
  return (
    <section className='py-20 px-16 flex flex-col justify-items-center gap-20'>
      {/* Heading + Subheading Section */}
        <div className="h-[84px] flex-col gap-6 inline-flex">
            <div className="self-stretch text-center text-black text-[35px] font-semibold font-['Poppins'] leading-10">{title}</div>
            <div className="self-stretch text-center text-black text-base font-normal font-['Poppins'] leading-tight">{description}</div>
        </div>
      {/* Event Card Container  */}
      <div className="justify-center items-center gap-8 inline-flex">
        <EventsCard 
              imgSrc = "/worldwaterday-graphic.png"
              title = "World Water Day"
              date = "22 March 2025"
              href = "https://www.un.org/en/observances/water-day"
        />
        <EventsCard 
              imgSrc = "/worldoceanday-graphic.png"
              title = "World Ocean Day"
              date = "8 June 2025"
              href = "https://worldoceanday.org/"
        />
      </div>
    </section>  
  );
};

export default EventsSection;