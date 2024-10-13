import React from 'react';
import EventsCard from './EventsCard';
import { Event } from '@/types/infographics';
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
        {events.map((event)=>(
          <div key={event.title} className="justify-center items-center gap-8 inline-flex">
            <EventsCard 
              imgSrc = {event.imgSrc}
              title= {event.title}
              date = {event.date}
              href= {event.href}
            />
          </div>
        ))}
      </div>
    </section>  
  );
};

export default EventsSection;